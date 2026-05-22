import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// ==========================================
// PÜRÜZSÜZ KLİNİK SVG İKONLARI (Sade & Estetik)
// ==========================================

const IconUser = ({ className = "" }) => (
  <svg className={`w-4 h-4 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconDroplet = ({ className = "" }) => (
  <svg className={`w-4 h-4 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const IconFileText = ({ className = "" }) => (
  <svg className={`w-5 h-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconCamera = ({ className = "" }) => (
  <svg className={`w-4 h-4 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStethoscope = ({ className = "" }) => (
  <svg className={`w-12 h-12 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m0 0a4 4 0 0 1-4-4v-.5C8 2.67 9.12 2 10.5 2h3c1.38 0 2.5.67 2.5 1.5V4a4 4 0 0 1-4 4Zm0 0v5a5 5 0 0 0 5 5h.5a2.5 2.5 0 0 1 2.5 2.5v1.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18v-1.5A2.5 2.5 0 0 1 6.5 14H7a5 5 0 0 0 5-5Z" />
    <circle cx="12" cy="19.5" r="1.5" />
  </svg>
);

const IconInfo = ({ className = "" }) => (
  <svg className={`w-5 h-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconSparkles = ({ className = "" }) => (
  <svg className={`w-5 h-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconMic = ({ className = "" }) => (
  <svg className={`w-4 h-4 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const IconUpload = ({ className = "" }) => (
  <svg className={`w-4 h-4 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const IconDashboard = ({ className = "" }) => (
  <svg className={`w-5 h-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconStatus = ({ className = "" }) => (
  <svg className={`w-5 h-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLogout = ({ className = "" }) => (
  <svg className={`w-5 h-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

interface ReportData {
  patient: { tc: string; fullName: string; age: string; gender: string; chronic: string; };
  speech_summary: string;
  symptoms: any[];
  bloodResult: { status: string; risk_score: number } | null;
  xrayResult: { status: string; score: number } | null;
  bloodData?: { crp: string; wbc: string; platelets: string; monocytes: string; eosinophils: string; };
  consolidated_report: string;
  pdf_url?: string;
}

const API_URL = "http://localhost:8000/api";

export default function App() {
  const [bloodLoading, setBloodLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  
  const [bloodAnalyzed, setBloodAnalyzed] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // NLP Anamnez / Sesli Belirti Analiz State'leri
  const [extractedSymptoms, setExtractedSymptoms] = useState<any[]>([]);
  const [speechSummary, setSpeechSummary] = useState<string>('');

  // Form State
  const [tc, setTc] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Erkek');
  const [chronic, setChronic] = useState('');
  const [anamnezText, setAnamnezText] = useState('');
  const [bloodData, setBloodData] = useState({ crp: '', wbc: '', platelets: '', monocytes: '', eosinophils: '' });
  const [xrayFile, setXrayFile] = useState<File | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = React.useRef<any>(null);

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Google Chrome veya Microsoft Edge kullanın.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'tr-TR';
    rec.interimResults = false;
    rec.continuous = false;

    rec.onstart = () => {
      setIsRecording(true);
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setAnamnezText((prev) => prev ? prev + " " + transcript : transcript);
    };

    rec.onerror = (event: any) => {
      console.error("Ses tanıma hatası:", event.error);
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = rec;
    rec.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  // Sonuç State'leri
  const [bloodResult, setBloodResult] = useState<{ status: string; risk_score: number } | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  // CSV Yükleme ve Parse Etme Fonksiyonu
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset the value synchronously so that the onChange event triggers every single time (even for the same file)
    e.target.value = "";

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      if (lines.length < 2) {
        alert("Geçersiz CSV formatı. En az başlık ve bir veri satırı içermelidir.");
        return;
      }

      // Separatör tespiti
      const firstLine = lines[0];
      const separator = firstLine.includes(";") ? ";" : ",";

      // Robust key sanitization (ANSI & Windows-1254 encoding safe)
      const sanitizeKey = (k: string) => {
        return k.trim()
          .toLowerCase()
          .replace(/ı/g, 'i')
          .replace(/ş/g, 's')
          .replace(/ğ/g, 'g')
          .replace(/ö/g, 'o')
          .replace(/ü/g, 'u')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9_]/g, ''); // strip gibberish and spaces
      };

      const headers = firstLine.split(separator).map(h => sanitizeKey(h));
      const values = lines[1].split(separator).map(v => v.trim().replace(/"/g, ""));

      const dataMap: Record<string, string> = {};
      headers.forEach((header, index) => {
        if (index < values.length) {
          dataMap[header] = values[index];
        }
      });

      // Hasta bilgilerini doldur
      if (dataMap['tc']) setTc(dataMap['tc']);
      
      const parsedName = dataMap['fullname'] || dataMap['adsoyad'] || dataMap['ad'] || dataMap['isim'];
      if (parsedName) setFullName(parsedName);

      const parsedAge = dataMap['age'] || dataMap['yas'] || dataMap['yasi'];
      if (parsedAge) setAge(parsedAge);
      
      const parsedGender = dataMap['gender'] || dataMap['cinsiyet'];
      if (parsedGender) {
        if (parsedGender.toLowerCase().startsWith('k') || parsedGender.toLowerCase().startsWith('f')) {
          setGender('Kadın');
        } else {
          setGender('Erkek');
        }
      }

      const parsedChronic = dataMap['chronic'] || dataMap['kronik'] || dataMap['kronikhastaliklar'];
      if (parsedChronic) setChronic(parsedChronic);

      // Kan tahlil değerlerini doldur
      const newBloodData = { ...bloodData };
      if (dataMap['crp']) newBloodData.crp = dataMap['crp'];
      
      const parsedWbc = dataMap['wbc'] || dataMap['lokosit'];
      if (parsedWbc) newBloodData.wbc = parsedWbc;
      
      const parsedPlatelets = dataMap['platelets'] || dataMap['trombosit'];
      if (parsedPlatelets) newBloodData.platelets = parsedPlatelets;
      
      const parsedMonocytes = dataMap['monocytes'] || dataMap['monosit'];
      if (parsedMonocytes) newBloodData.monocytes = parsedMonocytes;
      
      const parsedEosinophils = dataMap['eosinophils'] || dataMap['eozinofil'];
      if (parsedEosinophils) newBloodData.eosinophils = parsedEosinophils;

      setBloodData(newBloodData);
      alert("CSV verileri başarıyla aktarıldı! Form alanları güncellendi.");
    };
    reader.readAsText(file, "UTF-8");
  };

  // 1. AŞAMA: Sadece Kan Tahlilini Analiz Et
  const handleAnalyzeBlood = async () => {
    if (!bloodData.crp || !bloodData.wbc) {
      alert("Lütfen en azından CRP ve WBC gibi temel kan tahlili verilerini girin.");
      return;
    }

    setBloodLoading(true);
    try {
      const bloodPayload = {
        yas: parseInt(age) || 0,
        wbc: parseFloat(bloodData.wbc) || 0,
        platelets: parseFloat(bloodData.platelets) || 0,
        monocytes: parseFloat(bloodData.monocytes) || 0,
        crp: parseFloat(bloodData.crp) || 0,
        eosinophils: parseFloat(bloodData.eosinophils) || 0,
      };
      
      const bloodRes = await axios.post(`${API_URL}/analyze/blood`, bloodPayload);
      setBloodResult(bloodRes.data);

      // Klinik NLP: Eğer hasta ses kaydı / şikayet metni girilmişse, Stage 1'de hemen analiz edip belirtileri çekiyoruz.
      if (anamnezText.trim()) {
        try {
          const speechRes = await axios.post(`${API_URL}/analyze/anamnez`, { text: anamnezText });
          setExtractedSymptoms(speechRes.data.symptoms || []);
          setSpeechSummary(speechRes.data.speech_summary || '');
        } catch (speechErr) {
          console.error("Anamnez analizinde hata:", speechErr);
        }
      } else {
        setExtractedSymptoms([]);
        setSpeechSummary('');
      }

      setBloodAnalyzed(true);
      
      // Hasta kaydı backend'de tutulsun diye mock atıyoruz
      await axios.post(`${API_URL}/patients`, {
        full_name: fullName || "Bilinmiyor",
        age: parseInt(age) || 0,
        gender: gender,
        chronic_conditions: chronic
      }).catch(() => {});

    } catch (err) {
      console.error(err);
      alert("Tahlil analizinde hata oluştu.");
    } finally {
      setBloodLoading(false);
    }
  };

  // 2. AŞAMA: Varsa Röntgeni Analiz Et ve Konsensüs Raporunu Bas
  const handleFinalReport = async () => {
    setFinalLoading(true);
    try {
      // Ses / Anamnez Analizi (Klinik NLP)
      const speechRes = await axios.post(`${API_URL}/analyze/anamnez`, { text: anamnezText || "Hasta notu girilmedi" });

      // Röntgen Analizi (Birbirinden bağımsız çalışır)
      let xrayResData = null;
      if (xrayFile) {
        const xrayFormData = new FormData();
        xrayFormData.append('image_file', xrayFile);
        const xrayRes = await axios.post(`${API_URL}/analyze/radyoloji`, xrayFormData);
        xrayResData = xrayRes.data;
      }

      // 1. Semptomları çekiyoruz
      const symptomsText = speechRes.data.symptoms && speechRes.data.symptoms.length > 0 
        ? speechRes.data.symptoms.map((s: any) => `${s.semptom} (${s.derece}, ${s.sure})`).join(', ')
        : "Belirtilmemiş";

      // 2. Kan tahlil yüzdesini alıyoruz
      const bloodScorePct = ((bloodResult?.risk_score || 0) * 100).toFixed(2);
      const bloodStatus = bloodResult?.status || "Bilinmiyor";

      // 3. Röntgen yüzdesini alıyoruz
      const hasXray = !!xrayResData;
      const xrayScorePct = hasXray ? ((xrayResData.score || 0) * 100).toFixed(2) : null;
      const xrayStatus = hasXray ? xrayResData.status : null;

      // 4. Konsensüs metnini oluşturuyoruz
      let consensus = `Hasta şikayetlerinden tespit edilen klinik bulgular: ${symptomsText}. `;
      consensus += `Kan tahlili makine öğrenmesi modeli COVID-19 olasılık skoru: %${bloodScorePct} (${bloodStatus}). `;
      if (hasXray) {
        consensus += `Göğüs röntgeni (Chest X-Ray) derin öğrenme modeli COVID-19 olasılık skoru: %${xrayScorePct} (${xrayStatus}). `;
      } else {
        consensus += `Göğüs röntgeni analizi bu fazda uygulanmamıştır. `;
      }
      consensus += `Sistemimiz çoklu modalite entegrasyonuyla ön tarama değerlendirmesini tamamlamıştır. Klinik tablodaki nihai teşhis, tedavi yönetimi ve tüm tıbbi kararlar tamamen hekimin (doktorun) sorumluluğundadır.`;

      const finalReportPayload = {
        patient_id: 101, // Mock
        speech_summary: speechRes.data.speech_summary,
        symptoms: speechRes.data.symptoms,
        blood_test_data: bloodData,
        blood_test_risk_score: bloodResult?.risk_score || 0,
        blood_test_status: bloodResult?.status || "Bilinmiyor",
        xray_score: xrayResData?.score || 0,
        xray_status: xrayResData?.status || "Röntgen Yüklenmedi",
        consolidated_report: consensus
      };
      
      const reportRes = await axios.post(`${API_URL}/reports/generate`, finalReportPayload).catch(()=>({data:{pdf_url:""}}));

      setReport({
        patient: { tc, fullName, age, gender, chronic },
        speech_summary: speechRes.data.speech_summary,
        symptoms: speechRes.data.symptoms,
        bloodResult: bloodResult,
        xrayResult: xrayResData,
        bloodData: bloodData,
        consolidated_report: consensus,
        pdf_url: reportRes.data.pdf_url
      });
      setReportGenerated(true);

    } catch (err) {
      console.error(err);
      alert("Final rapor oluşturulurken hata oluştu.");
    } finally {
      setFinalLoading(false);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleReset = () => {
    setTc('');
    setFullName('');
    setAge('');
    setGender('Erkek');
    setChronic('');
    setAnamnezText('');
    setBloodData({ crp: '', wbc: '', platelets: '', monocytes: '', eosinophils: '' });
    setXrayFile(null);
    setBloodResult(null);
    setReport(null);
    setBloodAnalyzed(false);
    setReportGenerated(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-800 antialiased select-none">
      
      {/* ==========================================
          ÜST BAŞLIK (Navigasyon & Durum Göstergeleri)
          ========================================== */}
      <header className="h-[73px] bg-white border-b border-slate-200/90 px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-[#1e5adb]">
              TanıSentez <span className="font-medium text-slate-500 text-lg uppercase tracking-wider ml-1">CDSS</span>
            </span>
          </div>

          {/* Navigasyon Linkleri - Sadece Aktif Çalışan 'Çalışma Alanı' Tutuldu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#workstation" className="text-[#1e5adb] relative py-6 border-b-2 border-[#1e5adb] transition-colors">
              Çalışma Alanı
            </a>
          </nav>
        </div>

        {/* Sistem Durumları & Profil */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Sistem Çevrimiçi Rozeti */}
            <div className="flex items-center gap-2 bg-[#f1f5f9] border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] flex relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
              </span>
              Sistem Çevrimiçi
            </div>
            
            {/* RandomForest Durum Hapı */}
            <div className="flex items-center gap-2 bg-[#f1f5f9] border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600">
              RandomForest: <span className="font-bold text-[#1e5adb]">Aktif</span>
            </div>

            {/* EfficientNet Durum Hapı */}
            <div className="flex items-center gap-2 bg-[#f1f5f9] border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600">
              EfficientNet: <span className="font-bold text-[#1e5adb]">Aktif</span>
            </div>
          </div>

          <div className="h-5 w-[1px] bg-slate-200"></div>

          {/* Kullanıcı Profili */}
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors font-bold overflow-hidden" title="Profil">
              <IconUser className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          ANA GÖVDE YERLEŞİMİ
          ========================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ==========================================
            SOL YAN MENÜ (Hekim & Çalışma Alanı Paneli)
            ========================================== */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200/90 flex flex-col py-6 px-4 shrink-0 justify-between">
          <div className="space-y-7">
            {/* Yan Menü - Sadece Çalışan 'Kontrol Paneli' Tutuldu */}
            <div className="space-y-1">
              <a href="#dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#1e5adb] text-white font-bold text-sm shadow-md shadow-blue-500/10 hover:bg-[#1c54cd] transition-all">
                <IconDashboard />
                <span>Kontrol Paneli</span>
              </a>
            </div>
          </div>

          {/* Çalışan Sistem Ayarları ve Sıfırlama */}
          <div className="space-y-1 border-t border-slate-200/80 pt-4">
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-slate-500 font-bold text-sm">
              <IconStatus />
              <span>Sistem Durumu</span>
            </div>
            <button onClick={handleReset} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 font-bold text-sm transition-all text-left cursor-pointer">
              <IconLogout />
              <span>Sistem Sıfırla</span>
            </button>
          </div>
        </aside>

        {/* ==========================================
            ÇALIŞMA ALANI GÖVDESİ (Veri Giriş & CDSS Analiz)
            ========================================== */}
        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 overflow-y-auto lg:overflow-hidden max-h-[calc(100vh-73px)]">
          
          {/* ==========================================
              ORTA SÜTUN: VERİ GİRİŞ PANELİ (Hasta Verileri)
              ========================================== */}
          <div className="flex-1 bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Panel Başlığı */}
            <div className="px-6 py-4.5 border-b border-slate-150 bg-slate-50/50 flex justify-between items-center shrink-0">
              <h2 className="text-lg font-black text-slate-850 flex items-center gap-2.5">
                <div className="bg-[#1e5adb]/10 p-2 rounded-xl text-[#1e5adb] border border-blue-500/10 flex items-center justify-center">
                  <IconFileText />
                </div>
                <span>Veri Giriş Paneli</span>
              </h2>
              <span className="text-[10px] font-bold bg-blue-50 text-[#1e5adb] px-3.5 py-1.5 rounded-full border border-blue-100 uppercase tracking-wider">
                Hasta Bulguları ve Anamnez
              </span>
            </div>

            {/* Kaydırılabilir Form Alanları */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              
              {/* BÖLÜM 1: HASTA BİLGİLERİ */}
              <section className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <IconUser className="w-3.5 h-3.5 text-[#1e5adb]" />
                  <span>1. HASTA BİLGİLERİ</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">TC Kimlik No</label>
                    <input 
                      type="text" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={tc} 
                      onChange={e => setTc(e.target.value)} 
                      placeholder="11 haneli TC no" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Ad Soyad</label>
                    <input 
                      type="text" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={fullName} 
                      onChange={e => setFullName(e.target.value)} 
                      placeholder="Hasta adı ve soyadı" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Yaş</label>
                    <input 
                      type="number" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={age} 
                      onChange={e => setAge(e.target.value)} 
                      placeholder="Örn: 45" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Cinsiyet</label>
                    <select 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold cursor-pointer" 
                      value={gender} 
                      onChange={e => setGender(e.target.value)}
                    >
                      <option>Erkek</option>
                      <option>Kadın</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Kronik Hastalıklar</label>
                    <input 
                      type="text" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={chronic} 
                      onChange={e => setChronic(e.target.value)} 
                      placeholder="Diyabet, astım vb. (yoksa boş bırakın)" 
                    />
                  </div>
                </div>
              </section>

              {/* BÖLÜM 2: KLİNİK ANAMNEZ */}
              <section className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                  <span className="flex items-center gap-2">🗣️ 2. KLİNİK ANAMNEZ</span>
                  <div className="flex gap-2 items-center flex-nowrap shrink-0">
                    <button
                      onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
                      className={`text-[10px] font-extrabold px-3.5 py-1 rounded-full border transition-all duration-300 flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer ${
                        isRecording 
                          ? "bg-gradient-to-r from-red-500 to-rose-600 text-white border-transparent animate-pulse font-extrabold" 
                          : "bg-blue-50/50 hover:bg-gradient-to-r hover:from-[#1e5adb] hover:to-[#3b82f6] text-[#1e5adb] hover:text-white border-blue-200/70 hover:border-transparent"
                      }`}
                    >
                      <IconMic className="w-3.5 h-3.5" />
                      <span>{isRecording ? "Kaydı Durdur" : "Ses ile Yaz"}</span>
                    </button>
                    <span className="text-[9px] font-black text-slate-500 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap select-none">İSTEĞE BAĞLI</span>
                  </div>
                </h3>
                <textarea 
                  rows={3} 
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none resize-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-405 leading-relaxed" 
                  value={anamnezText} 
                  onChange={e => setAnamnezText(e.target.value)} 
                  placeholder="Hastanın şikayetlerini buraya yazın veya ses butonuna basıp konuşun..." 
                />
              </section>

              {/* BÖLÜM 3: KAN TAHLİLİ */}
              <section className={`bg-slate-50/30 p-5 rounded-2xl border border-slate-100 transition-opacity duration-300 ${bloodAnalyzed ? "opacity-60 pointer-events-none" : ""}`}>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <IconDroplet className="text-rose-500" />
                    <span>3. KAN TAHLİLİ</span>
                  </span>
                  <div className="flex gap-2 items-center flex-nowrap shrink-0">
                    <label className="cursor-pointer text-[10px] font-extrabold bg-blue-50/50 hover:bg-gradient-to-r hover:from-[#1e5adb] hover:to-[#3b82f6] text-[#1e5adb] hover:text-white border border-blue-200/70 hover:border-transparent px-3.5 py-1 rounded-full shadow-sm transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap">
                      <IconUpload className="w-3.5 h-3.5" />
                      <span>CSV'DEN YÜKLE</span>
                      <input type="file" className="hidden" accept=".csv" onChange={handleCSVUpload} />
                    </label>
                    <span className="text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap select-none">ZORUNLU ÖN ŞART</span>
                  </div>
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">CRP (mg/L)</label>
                    <input 
                      type="number" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={bloodData.crp} 
                      onChange={e => setBloodData({...bloodData, crp: e.target.value})} 
                      placeholder="Örn: 5.5" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Lökosit / WBC</label>
                    <input 
                      type="number" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={bloodData.wbc} 
                      onChange={e => setBloodData({...bloodData, wbc: e.target.value})} 
                      placeholder="Örn: 8.2" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Trombosit</label>
                    <input 
                      type="number" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={bloodData.platelets} 
                      onChange={e => setBloodData({...bloodData, platelets: e.target.value})} 
                      placeholder="Örn: 250" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Monosit</label>
                    <input 
                      type="number" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={bloodData.monocytes} 
                      onChange={e => setBloodData({...bloodData, monocytes: e.target.value})} 
                      placeholder="Örn: 0.5" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Eozinofil</label>
                    <input 
                      type="number" 
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#1e5adb]/20 focus:border-[#1e5adb] transition-all bg-white text-slate-700 text-sm font-semibold placeholder-slate-350" 
                      value={bloodData.eosinophils} 
                      onChange={e => setBloodData({...bloodData, eosinophils: e.target.value})} 
                      placeholder="Örn: 0.2" 
                    />
                  </div>
                </div>
                
                {!bloodAnalyzed && (
                  <button 
                    onClick={handleAnalyzeBlood} 
                    disabled={bloodLoading}
                    className="w-full bg-[#1e5adb] hover:bg-[#1a50c3] disabled:bg-slate-300 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-xl active:scale-[0.99] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {bloodLoading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Tahlil Analiz Ediliyor...</span>
                      </>
                    ) : (
                      <>
                        <IconSparkles className="w-4 h-4 text-white" />
                        <span>1. Aşama: Kan Tahlilini Analiz Et</span>
                      </>
                    )}
                  </button>
                )}
              </section>

              {/* BÖLÜM 4: RADYOLOJİ İNCELEMESİ (Tahlil sonrası açılır) */}
              {bloodAnalyzed && (
                <section className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 animate-fade-in">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <IconCamera className="text-[#1e5adb]" />
                      <span>4. Radyoloji İncelemesi</span>
                    </span>
                    {bloodResult?.status.includes("Yüksek Risk") && (
                      <span className="text-[9px] font-bold text-red-650 animate-pulse bg-red-50 border border-red-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        🚨 Röntgen Önerilir
                      </span>
                    )}
                    {bloodResult?.status.includes("Orta Risk") && (
                      <span className="text-[9px] font-bold text-orange-650 animate-pulse bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        ⚠️ Röntgen Önerilir
                      </span>
                    )}
                    {bloodResult?.status.includes("Düşük Risk") && (
                      <span className="text-[9px] font-bold text-green-650 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        ✅ İsteğe Bağlı
                      </span>
                    )}
                  </h3>
                  
                  <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 ${
                    bloodResult?.status.includes("Yüksek Risk") 
                      ? "border-red-300 bg-red-50/20 hover:bg-red-50/40" 
                      : bloodResult?.status.includes("Orta Risk") 
                      ? "border-orange-300 bg-orange-50/20 hover:bg-orange-50/40" 
                      : "border-slate-350 bg-slate-50/50 hover:bg-slate-50/80"
                  }`}>
                    <span className="text-4xl mb-3 filter drop-shadow">🩻</span>
                    <label className="cursor-pointer text-[#1e5adb] font-extrabold hover:underline text-sm flex items-center gap-1.5">
                      Göğüs Röntgeni Seçin
                      <input type="file" className="hidden" accept="image/*" onChange={e => setXrayFile(e.target.files?.[0] || null)} />
                    </label>
                    <span className="text-xxs text-slate-500 mt-2.5 font-bold bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-inner">
                      {xrayFile ? xrayFile.name : "Dosya seçilmedi"}
                    </span>
                  </div>
                </section>
              )}

            </div>
            
            {/* ORTA SÜTUN ALT: AŞAMA 2 SONUÇ ALIMI BUTONU */}
            {bloodAnalyzed && (
              <div className="p-5 border-t border-slate-150 bg-slate-50/40 shrink-0">
                <button 
                  onClick={handleFinalReport} 
                  disabled={finalLoading}
                  className="w-full bg-[#1e5adb] hover:bg-[#1a50c3] disabled:bg-slate-300 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-blue-500/10 hover:shadow-xl active:scale-[0.99] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  {finalLoading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Konsensüs Sağlanıyor...</span>
                    </>
                  ) : (
                    <>
                      <IconSparkles className="w-4 h-4 text-white" />
                      <span>2. Aşama: Raporu Tamamla ve Göster</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ==========================================
              SAĞ SÜTUN: CDSS ANALİZ RAPORU (Raporlama)
              ========================================== */}
          <div className="flex-1 bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Panel Başlığı */}
            <div className="px-6 py-4.5 border-b border-slate-150 bg-[#eef2f6]/50 flex justify-between items-center shrink-0">
              <h2 className="text-lg font-black text-slate-850 flex items-center gap-2.5">
                <div className="bg-[#1e5adb]/10 p-2 rounded-xl text-[#1e5adb] border border-blue-500/10 flex items-center justify-center">
                  <IconStatus className="w-5 h-5 text-[#1e5adb]" />
                </div>
                <span>CDSS Analiz Raporu</span>
              </h2>
              <span className="text-[10px] font-bold bg-[#dbeafe] text-[#1e5adb] px-3.5 py-1.5 rounded-full border border-blue-100 uppercase tracking-wider">
                Klinik Karar Paneli
              </span>
            </div>

            {/* Kaydırılabilir Raporlama Sütunu */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-50/30 flex flex-col justify-between">
              
              <div className="flex-1 flex flex-col">
                
                {/* 1. HAZIR BEKLENİYOR EKRANI */}
                {!bloodAnalyzed && !reportGenerated && (
                  <div className="flex-1 flex flex-col items-center justify-center py-12">
                    {/* Kalp Atış Efektli Stetoskop Çemberi */}
                    <div className="h-28 w-28 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center text-[#1e5adb] animate-heartbeat mb-6">
                      <IconStethoscope className="w-11 h-11 text-[#1e5adb]" />
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-800 mb-2">Hazır Bekleniyor</h3>
                    <p className="text-sm font-medium text-slate-500 max-w-xs text-center leading-relaxed">
                      Analiz raporunu oluşturmak için lütfen önce sol taraftan tahlil verilerini girin. Yapay zeka modellerimiz verilerinizi saniyeler içinde işleyecektir.
                     </p>
                   </div>
                 )}
                   {/* ========================================================
                    YENİ RESMİ DOKTOR RAPORU TASARIMI (Premium Clinical Sheet)
                    ======================================================== */}
                {bloodAnalyzed && (
                  <div id="clinical-report-container" className="space-y-6 animate-fade-in pb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md">
                    
                    {/* Resmi Rapor Üst Başlık Bandı */}
                    <div className="border-b-2 border-slate-800 pb-4 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase">T.C. SAĞLIK BAKANLIĞI</h3>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">TANISENTEZ KLİNİK KARAR DESTEK SİSTEMİ</h4>
                        </div>
                        <div>
                          <span className="text-[9px] font-black bg-slate-850 text-white px-3 py-1 rounded-sm uppercase tracking-widest shadow-sm">
                            CDSS ELEKTRONİK RAPOR
                          </span>
                        </div>
                      </div>
                      <div className="text-center mt-5">
                        <h2 className="text-sm font-extrabold text-slate-850 tracking-wider uppercase">HASTA TANI VE ANALİZ RAPORU</h2>
                      </div>
                    </div>

                    {/* 1. Hasta Kimlik Kartı & Özeti */}
                    <div>
                      <h5 className="text-[11px] font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <IconUser className="text-[#1e5adb]" />
                        <span>HASTA KİMLİK BİLGİLERİ</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 shadow-inner">
                        <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-400 font-bold">Adı Soyadı:</span>
                          <span className="text-slate-800 font-extrabold">{fullName || (reportGenerated && report ? report.patient.fullName : "Bilinmiyor")}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-400 font-bold">T.C. Kimlik No:</span>
                          <span className="text-slate-800 font-extrabold">{tc || (reportGenerated && report ? report.patient.tc : "Belirtilmemiş")}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/60 sm:border-none pb-1.5 sm:pb-0">
                          <span className="text-slate-400 font-bold">Yaş / Cinsiyet:</span>
                          <span className="text-slate-800 font-extrabold">
                            {age || (reportGenerated && report ? report.patient.age : "Belirtilmemiş")} Yaş / {gender || (reportGenerated && report ? report.patient.gender : "Erkek")}
                          </span>
                        </div>
                        <div className="flex justify-between pb-0">
                          <span className="text-slate-400 font-bold">Kronik Durum:</span>
                          <span className="text-rose-600 font-extrabold truncate max-w-[170px]" title={chronic || (reportGenerated && report ? report.patient.chronic : "")}>
                            {chronic || (reportGenerated && report ? report.patient.chronic : "") || "Belirtilmemiş"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Klinik Anamnez ve Belirti Analizi */}
                    <div>
                      <h5 className="text-[11px] font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        🗣️ KLİNİK ANAMNEZ VE BULGULAR
                      </h5>
                      <div className="bg-slate-50/30 p-4 rounded-xl border border-slate-200/50">
                        <p className="text-xs text-slate-700 leading-relaxed italic font-semibold">
                          "{speechSummary || (reportGenerated && report ? report.speech_summary : anamnezText) || "Hekim tarafından henüz klinik anamnez notu girilmemiştir."}"
                        </p>
                        
                        {/* NLP Semptom Analizi Listesi (Hem Stage 1 hem de Stage 2 için Canlı Çekim) */}
                        {((reportGenerated && report ? report.symptoms : extractedSymptoms) || []).length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-4 pt-3.5 border-t border-slate-200/60">
                            {((reportGenerated && report ? report.symptoms : extractedSymptoms) || []).map((sym: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                                <span className="text-[#1e5adb] font-bold">•</span>
                                <span className="text-slate-700">{sym.semptom}</span>
                                {sym.derece !== "Belirtilmemiş" && (
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                                    sym.derece === "Şiddetli" 
                                      ? "bg-red-50 text-red-650 border border-red-200" 
                                      : sym.derece === "Orta" 
                                      ? "bg-orange-50 text-orange-650 border border-orange-200" 
                                      : "bg-green-50 text-green-650 border border-green-200"
                                  }`}>{sym.derece}</span>
                                )}
                                {sym.sure !== "Belirtilmemiş" && (
                                  <span className="text-[9px] text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">{sym.sure}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[10px] font-bold text-slate-400 italic mt-3 pt-3 border-t border-slate-200/40">
                            * Klinik sesli anamnez analizi, semptom özetleme ve şiddet derecelendirmesi tahlil analizi başlatıldığında otomatik olarak oluşturulacaktır.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 3. Laboratuvar Bulguları Tablosu (Kan Tahlili) */}
                    <div>
                      <h5 className="text-[11px] font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <IconDroplet className="text-rose-500" />
                        <span>LABORATUVAR BULGULARI</span>
                      </h5>
                      <div className="overflow-hidden border border-slate-200 rounded-xl shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                              <th className="p-3">Tetkik Adı</th>
                              <th className="p-3 text-center">Değer</th>
                              <th className="p-3 text-center">Birim</th>
                              <th className="p-3 text-right">Referans Aralığı</th>
                              <th className="p-3 text-center">Durum</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {/* CRP */}
                            <tr>
                              <td className="p-3 font-semibold text-slate-700">CRP (C-Reaktif Protein)</td>
                              <td className="p-3 text-center font-extrabold text-slate-800">{bloodData.crp || (reportGenerated && report ? report?.bloodData?.crp : "-")}</td>
                              <td className="p-3 text-center text-slate-400">mg/L</td>
                              <td className="p-3 text-right text-slate-400">0 - 5.0</td>
                              <td className="p-3 text-center">
                                {(bloodData.crp || (reportGenerated && report ? report?.bloodData?.crp : "")) ? (
                                  parseFloat(bloodData.crp || report?.bloodData?.crp || "0") > 5.0 ? (
                                    <span className="text-[9px] font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">YÜKSEK</span>
                                  ) : (
                                    <span className="text-[9px] font-black text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">NORMAL</span>
                                  )
                                ) : "-"}
                              </td>
                            </tr>
                            {/* WBC */}
                            <tr>
                              <td className="p-3 font-semibold text-slate-700">Lökosit (WBC)</td>
                              <td className="p-3 text-center font-extrabold text-slate-800">{bloodData.wbc || (reportGenerated && report ? report?.bloodData?.wbc : "-")}</td>
                              <td className="p-3 text-center text-slate-400">G/L</td>
                              <td className="p-3 text-right text-slate-400">4.0 - 11.0</td>
                              <td className="p-3 text-center">
                                {(bloodData.wbc || (reportGenerated && report ? report?.bloodData?.wbc : "")) ? (
                                  (parseFloat(bloodData.wbc || report?.bloodData?.wbc || "0") < 4.0 || parseFloat(bloodData.wbc || report?.bloodData?.wbc || "0") > 11.0) ? (
                                    <span className="text-[9px] font-black text-red-650 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">ANORMAL</span>
                                  ) : (
                                    <span className="text-[9px] font-black text-green-650 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">NORMAL</span>
                                  )
                                ) : "-"}
                              </td>
                            </tr>
                            {/* PLT */}
                            <tr>
                              <td className="p-3 font-semibold text-slate-700">Trombosit (PLT)</td>
                              <td className="p-3 text-center font-extrabold text-slate-800">{bloodData.platelets || (reportGenerated && report ? report?.bloodData?.platelets : "-")}</td>
                              <td className="p-3 text-center text-slate-400">G/L</td>
                              <td className="p-3 text-right text-slate-400">150.0 - 450.0</td>
                              <td className="p-3 text-center">
                                {(bloodData.platelets || (reportGenerated && report ? report?.bloodData?.platelets : "")) ? (
                                  (parseFloat(bloodData.platelets || report?.bloodData?.platelets || "0") < 150.0 || parseFloat(bloodData.platelets || report?.bloodData?.platelets || "0") > 450.0) ? (
                                    <span className="text-[9px] font-black text-red-655 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">ANORMAL</span>
                                  ) : (
                                    <span className="text-[9px] font-black text-green-650 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">NORMAL</span>
                                  )
                                ) : "-"}
                              </td>
                            </tr>
                            {/* Monosit */}
                            <tr>
                              <td className="p-3 font-semibold text-slate-700">Monosit</td>
                              <td className="p-3 text-center font-extrabold text-slate-800">{bloodData.monocytes || (reportGenerated && report ? report?.bloodData?.monocytes : "-")}</td>
                              <td className="p-3 text-center text-slate-400">G/L</td>
                              <td className="p-3 text-right text-slate-400">0.2 - 0.8</td>
                              <td className="p-3 text-center">
                                {(bloodData.monocytes || (reportGenerated && report ? report?.bloodData?.monocytes : "")) ? (
                                  (parseFloat(bloodData.monocytes || report?.bloodData?.monocytes || "0") < 0.2 || parseFloat(bloodData.monocytes || report?.bloodData?.monocytes || "0") > 0.8) ? (
                                    <span className="text-[9px] font-black text-red-650 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">ANORMAL</span>
                                  ) : (
                                    <span className="text-[9px] font-black text-green-650 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">NORMAL</span>
                                  )
                                ) : "-"}
                              </td>
                            </tr>
                            {/* Eozinofil */}
                            <tr>
                              <td className="p-3 font-semibold text-slate-700">Eozinofil</td>
                              <td className="p-3 text-center font-extrabold text-slate-800">{bloodData.eosinophils || (reportGenerated && report ? report?.bloodData?.eosinophils : "-")}</td>
                              <td className="p-3 text-center text-slate-400">G/L</td>
                              <td className="p-3 text-right text-slate-400">0.05 - 0.5</td>
                              <td className="p-3 text-center">
                                {(bloodData.eosinophils || (reportGenerated && report ? report?.bloodData?.eosinophils : "")) ? (
                                  (parseFloat(bloodData.eosinophils || report?.bloodData?.eosinophils || "0") < 0.05 || parseFloat(bloodData.eosinophils || report?.bloodData?.eosinophils || "0") > 0.5) ? (
                                    <span className="text-[9px] font-black text-red-650 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">ANORMAL</span>
                                  ) : (
                                    <span className="text-[9px] font-black text-green-650 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">NORMAL</span>
                                  )
                                ) : "-"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 4. Radyoloji İnceleme Bulgusu */}
                    <div>
                      <h5 className="text-[11px] font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <IconCamera className="text-[#1e5adb]" />
                        <span>RADYOLOJİ VE GÖRÜNTÜLEME BULGULARI</span>
                      </h5>
                      {reportGenerated && report && report.xrayResult ? (
                        <div className={`p-4 rounded-xl border bg-white flex flex-col sm:flex-row gap-4 items-center ${
                          report.xrayResult.status.includes('Yüksek') ? 'border-red-200 bg-red-50/10' : 'border-green-200 bg-green-50/10'
                        }`}>
                          {xrayFile && (
                            <div className="w-24 h-24 rounded-lg border border-slate-200 overflow-hidden shrink-0 shadow-xs bg-black flex items-center justify-center">
                              <img src={URL.createObjectURL(xrayFile)} alt="Hasta Göğüs Röntgeni" className="max-h-full max-w-full object-contain" />
                            </div>
                          )}
                          <div className="flex-1 w-full text-left">
                            <span className="text-xs font-bold text-slate-400 uppercase block">EfficientNet Göğüs Röntgeni Sonucu:</span>
                            <span className={`text-sm font-extrabold ${report.xrayResult.status.includes('Yüksek') ? 'text-red-700' : 'text-green-700'}`}>
                              {report.xrayResult.status}
                            </span>
                            <div className="mt-1.5">
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                                Güven: {(report.xrayResult.score * 100).toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-xs font-semibold text-slate-400 bg-slate-50/40">
                          <span>⏳ Radyolojik tetkik henüz yapılmadı. Sağlıklı bir değerlendirme için sol taraftan röntgen yükleyip 2. aşamayı tamamlayabilirsiniz.</span>
                        </div>
                      )}
                    </div>

                    {/* 5. Yapay Zeka Risk Skoru Tanımlamaları */}
                    <div>
                      <h5 className="text-[11px] font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <IconSparkles className="text-[#1e5adb]" />
                        <span>YAPAY ZEKA KLİNİK TANI DEĞERLENDİRMESİ</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* RF Kan Tahlili Riski */}
                        <div className={`p-4 rounded-xl border bg-white shadow-xs flex flex-col justify-between ${
                          ((reportGenerated && report ? report.bloodResult?.status : bloodResult?.status) || "").includes('Yüksek') ? 'border-red-250' : ((reportGenerated && report ? report.bloodResult?.status : bloodResult?.status) || "").includes('Orta') ? 'border-orange-250' : 'border-green-250'
                        }`}>
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">KAN TAHLİLİ RİSK SEVİYESİ</span>
                            <span className={`text-sm font-extrabold ${((reportGenerated && report ? report.bloodResult?.status : bloodResult?.status) || "").includes('Yüksek') ? 'text-red-650' : ((reportGenerated && report ? report.bloodResult?.status : bloodResult?.status) || "").includes('Orta') ? 'text-orange-655' : 'text-green-655'}`}>
                              {reportGenerated && report ? report.bloodResult?.status : bloodResult?.status}
                            </span>
                          </div>
                          <div className="mt-3.5">
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/40 p-0.5 shadow-inner">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  ((reportGenerated && report ? report.bloodResult?.status : bloodResult?.status) || "").includes('Yüksek') ? 'bg-red-500' : ((reportGenerated && report ? report.bloodResult?.status : bloodResult?.status) || "").includes('Orta') ? 'bg-orange-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(((reportGenerated && report ? report?.bloodResult?.risk_score : bloodResult?.risk_score) || 0) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 mt-1.5 block">Güven / Risk Skoru: {(((reportGenerated && report ? report?.bloodResult?.risk_score : bloodResult?.risk_score) || 0) * 100).toFixed(2)}%</span>
                          </div>
                        </div>

                        {/* Röntgen Riski */}
                        <div className={`p-4 rounded-xl border bg-white shadow-xs flex flex-col justify-between ${
                          reportGenerated && report && report.xrayResult ? (report.xrayResult.status.includes('Yüksek') ? 'border-red-250' : 'border-green-250') : 'border-slate-200 opacity-60'
                        }`}>
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">RADYOLOJİ RİSK SEVİYESİ</span>
                            <span className={`text-sm font-extrabold ${reportGenerated && report && report.xrayResult ? (report.xrayResult.status.includes('Yüksek') ? 'text-red-650' : 'text-green-650') : 'text-slate-400'}`}>
                              {reportGenerated && report && report.xrayResult ? report.xrayResult.status : "ANALİZ BEKLENİYOR"}
                            </span>
                          </div>
                          {reportGenerated && report && report.xrayResult ? (
                            <div className="mt-3.5">
                              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/40 p-0.5 shadow-inner">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    report.xrayResult.status.includes('Yüksek') ? 'bg-red-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(report.xrayResult.score * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-[10px] font-bold text-slate-500 mt-1.5 block">Güven / Risk Skoru: {(report.xrayResult.score * 100).toFixed(2)}%</span>
                            </div>
                          ) : (
                            <div className="text-[10px] font-bold text-slate-400 italic mt-3.5">Röntgen tetkiki bekleniyor...</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 6. Yapay Zeka Ortak Kararı (Konsensüs) */}
                    <div>
                      <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-5 rounded-2xl border border-blue-150 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl opacity-5 select-none pointer-events-none">🧠</div>
                        <h5 className="text-[11px] font-black text-[#1e5adb] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          🧠 YAPAY ZEKA ORTAK KARARI (KONSENSÜS RAPORU)
                        </h5>
                        <p className="text-slate-750 text-xs font-semibold leading-relaxed">
                          {reportGenerated && report ? report.consolidated_report : "Laboratuvar bulguları ve anamnez başarıyla analiz edildi. CDSS, kan tahliline bağlı ön tespiti tamamladı. Röntgen analizi eklendiğinde klinik bulgular ve teşhis kararı modeller arası bağımsız doğrulama ile güncellenecektir. Raporu resmileştirmek için lütfen sol taraftan 2. aşamayı tamamlayıp 'Raporu Tamamla ve Göster' butonuna tıklayınız."}
                        </p>
                      </div>
                    </div>

                    {/* 7. Hekim Kaşe ve İmza Alanı */}
                    <div className="mt-8 pt-6 border-t border-dashed border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="text-slate-450 font-bold">Rapor Tarihi: <span className="text-slate-700 font-extrabold">{new Date().toLocaleDateString('tr-TR')}</span></p>
                        <p className="text-slate-450 font-bold">Rapor Durumu: <span className={`font-black ${reportGenerated ? 'text-green-600' : 'text-amber-500'}`}>{reportGenerated ? 'Resmi / Kesin Tanı' : 'Geçici / Ön Rapor'}</span></p>
                      </div>
                      <div className="text-center bg-slate-50 border border-slate-200 p-4 rounded-xl min-w-[200px] shadow-xxs">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">SİSTEM ONAYI</p>
                        <p className="font-black text-slate-800">TanıSentez CDSS</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Klinik Karar Destek Sistemi</p>
                        <div className="mt-3.5 border-t border-slate-200 pt-2 text-[9px] font-bold text-[#1e5adb] italic">
                          Güvenli Elektronik İmza
                        </div>
                      </div>
                    </div>

                    {/* Resmi Rapor İndirme Butonu (Yalnızca Rapor Oluşunca Görünür) */}
                    {reportGenerated && (
                      <button 
                        onClick={handlePrintReport}
                        className="w-full bg-[#10b981] hover:bg-[#0ea975] text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-500/10 hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest text-center cursor-pointer mt-4 no-print"
                      >
                        <IconUpload className="w-4 h-4 rotate-180 text-white" />
                        <span>Raporu Yazdır / PDF Kaydet</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* YASAL KLİNİK UYARI ŞERİDİ (Alt Kısımda Sabit) */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 flex gap-3.5 items-start mt-6 shrink-0">
                <div className="text-[#1e5adb] shrink-0 mt-0.5">
                  <IconInfo className="w-5 h-5" />
                </div>
                <p className="text-xs text-blue-800 font-bold leading-relaxed">
                  Bu sistem sadece klinik destek amaçlıdır. Nihai karar her zaman hekim tarafından verilmelidir.
                </p>
              </div>

            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
