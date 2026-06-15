# 🌿 5-D Piknik Katılım Sistemi

Beytepe Ortaokulu 5-D Sınıfı • 20 Haziran 2025 Piknik Katılım Formu

---

## 📁 Dosya Yapısı

```
piknik-server/
├── server.js          ← Node.js sunucu (API + statik dosyalar)
├── package.json
├── data.json          ← Kayıtlar burada saklanır (otomatik oluşur)
└── public/
    ├── form.html      ← Katılımcıların dolduracağı form
    └── admin.html     ← Yönetici paneli
```

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- [Node.js](https://nodejs.org) v16 veya üzeri

### Adımlar

```bash
# 1. Klasöre girin
cd piknik-server

# 2. Bağımlılıkları yükleyin (ilk kurulumda bir kere)
npm install

# 3. Sunucuyu başlatın
npm start
```

Sunucu başladığında terminalde şunu göreceksiniz:
```
✅ Piknik sunucusu çalışıyor: http://localhost:3000
   Katılımcı formu : http://localhost:3000/form.html
   Admin paneli    : http://localhost:3000/admin.html
```

---

## 🌐 Farklı Cihazlardan Erişim

Sunucunun çalıştığı bilgisayarın **yerel ağ IP adresini** bulun:

- **Windows:** Komut istemcisinde `ipconfig` → "IPv4 Adresi"
- **Mac/Linux:** Terminalde `ifconfig` veya `ip addr` → `inet` adresi

Örneğin IP adresiniz `192.168.1.42` ise:

| Sayfa | Adres |
|---|---|
| Katılımcı Formu | `http://192.168.1.42:3000/form.html` |
| Admin Paneli | `http://192.168.1.42:3000/admin.html` |

> Tüm cihazların **aynı Wi-Fi ağında** olması gerekir.

---

## ☁️ İnternet Üzerinden Erişim (Opsiyonel)

Farklı ağlardan (farklı evlerden) erişmek istiyorsanız:

### Seçenek A — Railway (Ücretsiz, Kolay)
1. [railway.app](https://railway.app) → GitHub ile giriş
2. "New Project" → "Deploy from GitHub repo"
3. Bu klasörü GitHub'a yükleyip deploy edin
4. Railway size otomatik bir URL verir

### Seçenek B — ngrok (Geçici, Çok Kolay)
```bash
# ngrok yükle: https://ngrok.com/download
npm start          # sunucuyu başlat
ngrok http 3000    # başka terminalde
# Verilen URL'yi paylaşın (örn: https://abc123.ngrok.io)
```

---

## 📋 API Endpoints

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/kayitlar` | Tüm kayıtları getir |
| GET | `/api/kayitlar/:key` | Tek kayıt getir |
| POST | `/api/kayitlar/:key` | Kayıt ekle/güncelle |
| DELETE | `/api/kayitlar/:key` | Kayıt sil |
| DELETE | `/api/kayitlar` | Tüm kayıtları sil |

---

## 💾 Veriler Nerede Saklanır?

Tüm kayıtlar `data.json` dosyasında saklanır. Sunucuyu yeniden başlatsan bile veriler korunur.
Yedek almak için bu dosyayı kopyalamanız yeterli.
