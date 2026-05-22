# pyrefly: ignore [missing-import]
from fastapi import FastAPI, File, UploadFile, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import Optional
# pyrefly: ignore [missing-import]
import torch
# pyrefly: ignore [missing-import]
import joblib
import datetime
import io
# pyrefly: ignore [missing-import]
from PIL import Image
# pyrefly: ignore [missing-import]
import torchvision.transforms as transforms
import pandas as pd

app = FastAPI(title="CDSS Multi-Modal API (In-Memory)")
# Model updated on user request

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- IN-MEMORY DB ---
patients_db = [
    {
        "id": 101,
        "full_name": "Ahmet Yilmaz",
        "age": 45,
        "gender": "Erkek",
        "chronic_conditions": "Hipertansiyon"
    }
]
reports_db = []

# --- AI MODELS (Global Memory) ---
ai_models = {
    "blood_rf_model": None,
    "xray_effnet_model": None
}

@app.on_event("startup")
async def modelleri_yukle():
    """Modeller server baslarken ram'e alinir."""
    try:
        ai_models["blood_rf_model"] = joblib.load("modeller/covid_tahlil_modeli.pkl")
        print("Blood model loaded successfully.")
    except Exception as e:
        print(f"Uyari: Kan tahlili modeli yuklenemedi: {e}")
        
    try:
        model = torch.jit.load("modeller/covid_image_scripted.pt", map_location=torch.device('cpu'))
        model.eval()
        ai_models["xray_effnet_model"] = model
        print("X-Ray model loaded successfully.")
    except Exception as e:
        print(f"Uyari: Rontgen modeli yuklenemedi: {e}")

# --- PYDANTIC SCHEMAS ---
class HastaKayitGirdisi(BaseModel):
    full_name: str
    age: int
    gender: str
    chronic_conditions: str

class KanTahlilGirdisi(BaseModel):
    yas: float
    wbc: float
    platelets: float
    monocytes: float
    crp: float
    eosinophils: float

class RaporUretGirdisi(BaseModel):
    patient_id: int
    speech_summary: str
    symptoms: list
    blood_test_data: dict
    blood_test_risk_score: float
    blood_test_status: str
    xray_score: Optional[float] = None
    xray_status: Optional[str] = None
    consolidated_report: str

# --- ENDPOINTS ---
@app.post("/api/patients")
def hasta_olustur(patient: HastaKayitGirdisi):
    new_patient = {
        "id": len(patients_db) + 102,
        **patient.dict(),
        "created_at": datetime.datetime.now().isoformat()
    }
    patients_db.append(new_patient)
    return {"status": "success", "data": new_patient}

@app.get("/api/patients")
def hastalari_getir():
    return patients_db

import re

def turkce_anamnez_cozumle(text: str):
    symptoms_list = []
    
    # Genişletilmiş Türkçe klinik anahtar kelimeler ve tıbbi eşanlamlıları
    symptom_keywords = {
        "Öksürük": ["öksürük", "öksürme", "oksuruk", "oksurme", "kuru öksürük"],
        "Ateş": ["ateş", "ates", "sıcaklık", "sicaklik", "hararet"],
        "Nefes Darlığı": [
            "nefes darlığı", "nefes darligi", "solunum güçlüğü", 
            "solunum guclugu", "nefes alamama", "nefes alırken de zorlanmaya", 
            "nefes alırken zor", "nefes nefese", "soluk alırken", "göğsüm sıkışıyor", "gogsum sikisiyor"
        ],
        "Baş Ağrısı": ["baş ağrısı", "bas agrisi", "başağrısı", "başım ağrıyor"],
        "Halsizlik": ["halsizlik", "yorgunluk", "bitkinlik", "halsiz", "yorgun", "kırılıyorum", "kiriliyorum", "kalkacak halim yok"],
        "Kas Ağrısı": ["kas ağrısı", "kas agrisi", "eklem ağrısı", "vücut ağrısı", "vücudum ağrıyor", "eklemlerimde", "eklemlerim", "eklem ağrısı"],
        "Tat/Koku Kaybı": ["tat kaybı", "koku kaybı", "tat kaybi", "koku kaybi", "tadını alamıyorum", "kokusunu alamıyorum", "koku alamıyorum", "tad alamıyorum", "tadını", "tadı", "kokusunu", "kokusu"],
        "Boğaz Ağrısı": ["boğaz ağrısı", "bogaz agrisi", "boğazımda yanma", "boğazımda kuruluk", "boğaz kuruluğu", "boğazım kuru", "boğazımda feci bir kuruluk"]
    }
    
    text_lower = text.lower()
    for symptom_name, synonyms in symptom_keywords.items():
        found = False
        matched_syn = ""
        for syn in synonyms:
            if syn in text_lower:
                found = True
                matched_syn = syn
                break
        
        if found:
            # Eşleşen kelimenin etrafındaki 60 karakterlik yerel pencereyi (window) çıkarıyoruz
            pos = text_lower.find(matched_syn)
            window_start = max(0, pos - 60)
            window_end = min(len(text_lower), pos + len(matched_syn) + 60)
            window = text_lower[window_start:window_end]
            
            # Şiddet Derecesi Çıkarımı (Yerel Pencereye Göre)
            severity = "Hafif/Orta"
            severities = {
                "Şiddetli": ["şiddetli", "siddetli", "yüksek", "yuksek", "aşırı", "asiri", "çok", "cok", "feci", "kuru", "bana mısın demiyor", "hiç", "hic", "kalkacak halim yok"],
                "Hafif": ["hafif", "az", "biraz"],
                "Orta": ["orta", "belirgin"]
            }
            
            for sev_name, sev_syns in severities.items():
                if any(sev_syn in window for sev_syn in sev_syns):
                    severity = sev_name
                    break
            
            # Süre / Gün Çıkarımı (Yerel Pencereye Göre Akıllı Regex Süzgeci)
            duration = "Belirtilmemiş"
            if "dünden beri" in window or "dunden beri" in window:
                duration = "Dünden beri"
            else:
                # Sayısal Süre Arama (örn: "4-5 gün", "2 gündür")
                duration_match = re.search(r"(\d+(?:-\d+)?)\s*(gün|hafta|ay|gun|gündür|gundur)", window)
                if duration_match:
                    val = duration_match.group(1)
                    unit = duration_match.group(2)
                    clean_unit = "gün" if "gün" in unit or "gun" in unit else ("hafta" if "hafta" in unit else ("ay" if "ay" in unit else unit))
                    duration = f"{val} {clean_unit}"
                else:
                    # Türkçe Yazıyla Süre Arama (örn: "iki gündür")
                    words_match = re.search(r"\b(bir|iki|üç|uc|dört|dort|beş|bes)\s*(gün|hafta|ay|gun|gündür|gundur)", window)
                    if words_match:
                        num_map = {"bir": "1", "iki": "2", "üç": "3", "uc": "3", "dört": "4", "dort": "4", "beş": "5", "bes": "5"}
                        val = num_map.get(words_match.group(1), words_match.group(1))
                        unit = words_match.group(2)
                        clean_unit = "gün" if "gün" in unit or "gun" in unit else ("hafta" if "hafta" in unit else ("ay" if "ay" in unit else unit))
                        duration = f"{val} {clean_unit}"
            
            # Pencerede süre bulunamadıysa genel metin içinde ara
            if duration == "Belirtilmemiş":
                if "dünden beri" in text_lower or "dunden beri" in text_lower:
                    duration = "Dünden beri"
                else:
                    global_match = re.search(r"(\d+(?:-\d+)?)\s*(gün|hafta|ay|gun|gündür|gundur)", text_lower)
                    if global_match:
                        val = global_match.group(1)
                        unit = global_match.group(2)
                        clean_unit = "gün" if "gün" in unit or "gun" in unit else ("hafta" if "hafta" in unit else ("ay" if "ay" in unit else unit))
                        duration = f"{val} {clean_unit}"
                    else:
                        global_word_match = re.search(r"\b(bir|iki|üç|uc|dört|dort|beş|bes)\s*(gün|hafta|ay|gun|gündür|gundur)", text_lower)
                        if global_word_match:
                            num_map = {"bir": "1", "iki": "2", "üç": "3", "uc": "3", "dört": "4", "dort": "4", "beş": "5", "bes": "5"}
                            val = num_map.get(global_word_match.group(1), global_word_match.group(1))
                            unit = global_word_match.group(2)
                            clean_unit = "gün" if "gün" in unit or "gun" in unit else ("hafta" if "hafta" in unit else ("ay" if "ay" in unit else unit))
                            duration = f"{val} {clean_unit}"
            
            symptoms_list.append({
                "semptom": symptom_name,
                "derece": severity,
                "sure": duration
            })
            
    if not symptoms_list:
        symptoms_list.append({
            "semptom": "Genel Semptomlar",
            "derece": "Belirtilmemiş",
            "sure": "Belirtilmemiş"
        })
        
    summary = text if len(text.strip()) > 0 else "Klinik anamnez notu girilmemiştir."
    return {
        "speech_summary": summary,
        "symptoms": symptoms_list
    }

class AnamnezGirdisi(BaseModel):
    text: str

@app.post("/api/analyze/anamnez")
def anamnez_analiz_et(data: AnamnezGirdisi):
    try:
        parsed = turkce_anamnez_cozumle(data.text)
        return parsed
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze/speech")
async def ses_analiz_et(audio_file: UploadFile = File(...)):
    # Mock fallback
    return {
        "speech_summary": "Hasta 4 gundur siddetli oksuruk ve ates sikayeti bildirmektedir.",
        "symptoms": [{"semptom": "Oksuruk", "derece": "Siddetli", "sure": "4 gun"}]
    }

@app.post("/api/analyze/blood")
def kan_analiz_et(data: KanTahlilGirdisi):
    try:
        if not ai_models["blood_rf_model"]:
            risk_score = 0.82 if data.crp > 50 else 0.15 
        else:
            model_obj = ai_models["blood_rf_model"]
            if isinstance(model_obj, dict):
                # 1. Sözlük formatındaki yeni model + scaler paketi uyumluluğu (Mükemmel Normalizasyon)
                clf_model = model_obj['model']
                clf_scaler = model_obj['scaler']
                
                input_df = pd.DataFrame([{
                    'Hastalık_Derecesi_Yas': min(19, int(data.yas * 0.2)),
                    'Leukocytes (Lökosit)': data.wbc,
                    'Platelets (Trombosit)': data.platelets,
                    'Monocytes (Monosit)': data.monocytes,
                    'CRP (C-Reaktif Protein)': data.crp,
                    'Eosinophils (Eozinofil)': data.eosinophils
                }])
                
                input_scaled = clf_scaler.transform(input_df)
                risk_score = clf_model.predict_proba(input_scaled)[0][1]
            else:
                # 2. Ham RandomForestClassifier nesnesi uyumluluğu (Geriye Dönük Uyumluluk)
                z_wbc = (data.wbc - 7.5) / 3.0
                z_plat = (data.platelets - 250.0) / 70.0
                z_mono = (data.monocytes - 0.5) / 0.2
                z_crp = (data.crp - 5.0) / 15.0
                z_eos = (data.eosinophils - 0.2) / 0.2
                age_quantile = min(19, int(data.yas * 0.2))
                
                input_data = pd.DataFrame([{
                    'Hastalık_Derecesi_Yas': age_quantile,
                    'Leukocytes (Lökosit)': z_wbc,
                    'Platelets (Trombosit)': z_plat,
                    'Monocytes (Monosit)': z_mono,
                    'CRP (C-Reaktif Protein)': z_crp,
                    'Eosinophils (Eozinofil)': z_eos
                }])
                risk_score = model_obj.predict_proba(input_data.values)[0][1]
            
        if risk_score >= 0.50:
            status = "Yüksek Risk"
        elif risk_score >= 0.20:
            status = "Orta Risk"
        else:
            status = "Düşük Risk"
            
        return {"risk_score": float(risk_score), "status": status}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")

@app.post("/api/analyze/radyoloji")
async def radyoloji_analiz_et(image_file: UploadFile = File(...)):
    if not ai_models["xray_effnet_model"]:
        raise HTTPException(status_code=500, detail="X-Ray Modeli aktif degil.")
        
    image_bytes = await image_file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    input_tensor = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        output = ai_models["xray_effnet_model"](input_tensor)
        probabilities = torch.nn.functional.softmax(output[0][:2], dim=0)
        score = probabilities[0].item() # 0 class (COVID) prob
        
    status = "Düşük Risk (Normal)"
    if score >= 0.65:
        status = "Yüksek Risk (Pozitif)"
    elif score >= 0.35:
        status = "Orta Risk"
        
    return {"score": round(score, 4), "status": status}

@app.post("/api/reports/generate")
def rapor_uret(data: RaporUretGirdisi):
    report_id = len(reports_db) + 1
    new_report = {
        "id": report_id,
        **data.dict(),
        "pdf_url": f"/mock/reports/patient_{data.patient_id}_{report_id}.pdf"
    }
    reports_db.append(new_report)
    return {"message": "Rapor basariyla uretildi (In-Memory).", "pdf_url": new_report["pdf_url"]}
