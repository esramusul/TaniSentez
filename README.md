# CDSS (Klinik Karar Destek Sistemi) - Çoklu Modalite Yapay Zeka Projesi

Bu proje, hekimlerin klinik karar alma süreçlerini hızlandırmak ve doğruluk payını artırmak amacıyla geliştirilmiş, **Çoklu Modalite (Multi-Modal)** yapay zeka destekli bir tıbbi analiz platformudur. Sistem; hastanın anamnezini (klinik öykü), kan tahlillerini ve radyolojik görüntülerini (Röntgen) eş zamanlı olarak analiz ederek risk skorlaması yapar ve konsolide bir rapor sunar.

---

## 🎯 Projenin Amacı ve Kapsamı

Tıbbi teşhis sürecinde veriler genellikle farklı sistemlerde dağınık halde bulunur. Bu sistemin temel amacı; metin, sayısal veri (tahlil) ve görsel veriyi (röntgen) tek bir merkezde toplayarak yapay zeka algoritmalarıyla analiz etmek ve hekime "ikinci bir görüş" (second opinion) sunmaktır. Özellikle COVID-19 ve benzeri solunum yolu enfeksiyonlarının risk değerlendirmesinde yüksek başarı oranına sahiptir.

---

## ✨ Temel Modüller ve Yetenekler

### 1. NLP ile Anamnez ve Klinik Öykü Analizi
- Hekimin girdiği serbest metin formundaki (Türkçe) anamnez notları **Doğal Dil İşleme (NLP)** teknikleri ile ayrıştırılır.
- "Öksürük", "Ateş", "Nefes Darlığı" gibi semptomlar otomatik olarak tespit edilir.
- Metnin bağlamına göre (Context Window) semptomların **şiddeti** (Örn: Şiddetli, Hafif) ve **süresi** (Örn: 4 gün, dünden beri) regex ve anahtar kelime haritalandırmasıyla çıkartılır.

### 2. Makine Öğrenmesi ile Kan Tahlili Analizi
- WBC, Trombosit, CRP, Monosit, Eozinofil ve Yaş verileri alınarak eğitilmiş **Random Forest** modeli üzerinden hastanın risk durumu hesaplanır.
- Model çıktısı doğrudan risk skoru olarak kullanılır; herhangi bir kural tabanlı (rule-based) müdahale uygulanmaz. Risk sınıflaması (Düşük / Orta / Yüksek) yalnızca modelin ürettiği olasılık skoruna göre belirlenir.

### 3. Derin Öğrenme ile Radyoloji (X-Ray) Analizi
- **PyTorch** kullanılarak eğitilmiş ve TorchScript formatına (`.pt`) dönüştürülmüş derin öğrenme modeli (EfficientNet tabanlı) ile akciğer röntgenleri analiz edilir.
- Görüntüler `torchvision.transforms` ile standartlaştırılır (224x224, Normalize) ve model üzerinden geçirilerek "COVID" veya "Normal" olma ihtimalleri yüzdelik bir skor olarak (Örn: %82 Yüksek Risk) hekime sunulur.

### 4. Hasta Yönetimi ve Konsolide Raporlama
- Hastaların demografik ve klinik bilgileri In-Memory veritabanında tutulur.
- Tahlil, röntgen ve NLP analizleri sonucunda oluşturulan skorlar birleştirilerek nihai bir PDF/Görsel rapor üretim altyapısı sunulur.

---

## 🛠️ Teknik Mimari

Proje, modern web teknolojileri ve güçlü veri bilimi kütüphaneleri kullanılarak uçtan uca (Full-Stack) tasarlanmıştır.

### Backend (Python / FastAPI)
- **Framework:** FastAPI (Yüksek performanslı, asenkron API altyapısı)
- **Yapay Zeka ve Veri Bilimi:** PyTorch (Görüntü İşleme), Scikit-learn / Joblib (Makine Öğrenmesi), Pandas, PIL (Pillow)
- **Modeller:** Bellek dostu çalışması için `startup` event'i sırasında modeller RAM'e yüklenir (Global State).

### Frontend (React / TypeScript)
- **Framework:** React 19 + TypeScript
- **Derleyici & Sunucu:** Vite (Hızlı geliştirme ve HMR desteği)
- **Stil & Tasarım:** Tailwind CSS v4
- **Mimari:** Modüler component yapısı ile hasta listesi, analiz ekranları ve rapor görüntüleme arayüzleri tasarlandı.

---

## 🚀 Kurulum ve Çalıştırma

Projeyi lokal ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### 1. Backend (FastAPI) Kurulumu

```bash
# Backend klasörüne gidin
cd backend

# Sanal ortam oluşturun ve aktif edin (Opsiyonel ama önerilir)
python -m venv venv
venv\Scripts\activate  # Windows için

# Gerekli kütüphaneleri yükleyin
pip install -r requirements.txt
# (veya pip install fastapi uvicorn torch torchvision joblib pandas pydantic python-multipart pillow)

# API sunucusunu başlatın
uvicorn main:app --reload --port 8000
```
Backend sunucusu **http://localhost:8000** adresinde çalışacak ve Swagger UI dokümantasyonu **http://localhost:8000/docs** adresinde erişilebilir olacaktır.

### 2. Frontend (React) Kurulumu

```bash
# Frontend klasörüne gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirici sunucusunu başlatın
npm run dev
```
Uygulama arayüzü **http://localhost:5173** (veya Vite'in atadığı port) adresinde çalışacaktır.

---

## 📁 Proje Klasör Yapısı

```text
yapay zeka/
├── README.md                 ← Proje detaylarını içeren bu dosya
├── COVID_Rontgen_Test.jpg    ← Test için örnek COVID pozitif röntgen görüntüsü
├── Normal_Rontgen_Test.jpg   ← Test için örnek sağlıklı röntgen görüntüsü
├── tahlil_*.csv              ← Örnek kan tahlili veri setleri (Düşük/Orta/Yüksek Risk)
├── backend/                  ← FastAPI tabanlı yapay zeka sunucusu
│   ├── main.py               ← API endpoint'leri ve AI entegrasyonları
│   ├── requirements.txt      ← Python kütüphane bağımlılıkları
│   └── modeller/             ← Eğitilmiş yapay zeka modelleri (.pkl ve .pt)
└── frontend/                 ← React & Vite tabanlı web arayüzü
    ├── package.json          ← Frontend bağımlılıkları
    ├── src/                  ← React componentleri ve sayfalar
    └── ...
```

---

*Geliştirme Notu: Bu proje, yapay zeka ajanları desteğiyle tasarlanmış olup, medikal teşhislerde karar destek sistemi olarak görev yapmak üzere kurgulanmıştır. Sistem, klinik uzman görüşünün yerini almaz, ona rehberlik eder.*
