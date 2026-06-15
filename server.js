const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Data helpers ────────────────────────────────────────────
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ── API Routes ───────────────────────────────────────────────

// Tüm kayıtları getir
app.get('/api/kayitlar', (req, res) => {
  res.json(readData());
});

// Tek kayıt getir
app.get('/api/kayitlar/:key', (req, res) => {
  const data = readData();
  const entry = data[req.params.key];
  if (!entry) return res.status(404).json({ error: 'Kayıt bulunamadı' });
  res.json(entry);
});

// Kayıt ekle / güncelle
app.post('/api/kayitlar/:key', (req, res) => {
  const data = readData();
  data[req.params.key] = {
    ...req.body,
    tarih: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
  };
  writeData(data);
  res.json({ ok: true, entry: data[req.params.key] });
});

// Kayıt sil
app.delete('/api/kayitlar/:key', (req, res) => {
  const data = readData();
  if (!data[req.params.key]) return res.status(404).json({ error: 'Kayıt bulunamadı' });
  delete data[req.params.key];
  writeData(data);
  res.json({ ok: true });
});

// Tüm verileri sil (admin)
app.delete('/api/kayitlar', (req, res) => {
  writeData({});
  res.json({ ok: true });
});

// ── Kura API ─────────────────────────────────────────────────
const KURA_FILE = '/app/data/kura.json';

function readKura() {
  try {
    if (!fs.existsSync(KURA_FILE)) return null;
    return JSON.parse(fs.readFileSync(KURA_FILE, 'utf8'));
  } catch { return null; }
}

function writeKura(data) {
  fs.writeFileSync(KURA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Kura sonucunu getir (herkese açık)
app.get('/api/kura', (req, res) => {
  const kura = readKura();
  if (!kura) return res.status(404).json({ error: 'Henüz kura çekilmedi' });
  res.json(kura);
});

// Kura çek ve kaydet (admin)
app.post('/api/kura', (req, res) => {
  const { secilen } = req.body;
  if (!secilen || !Array.isArray(secilen)) return res.status(400).json({ error: 'Geçersiz veri' });
  const kura = {
    secilen,
    tarih: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }),
    ceken: 'Admin'
  };
  writeKura(kura);
  res.json({ ok: true, kura });
});

// Kurayı sıfırla (admin)
app.delete('/api/kura', (req, res) => {
  try { fs.unlinkSync(KURA_FILE); } catch {}
  res.json({ ok: true });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Piknik sunucusu çalışıyor: http://localhost:${PORT}`);
  console.log(`   Katılımcı formu : http://localhost:${PORT}/form.html`);
  console.log(`   Admin paneli    : http://localhost:${PORT}/admin.html`);
});
