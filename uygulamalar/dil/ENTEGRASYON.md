# ASİ Dil — canlı projeye bağlama notları

## 1. Yasal bilgileri doldur
`yasal/ayarlar.js` içindeki köşeli parantezli alanlar yayından önce doldurulmalı (sayfalarda sarı görünür):
- `controller`, `address`: veri sorumlusu (kişi ya da şirket) ve adresi
- `email` / `kep`: KVKK başvuru adresi
- `provider`, `country`, `abroad`: giriş ve barındırma servisi, sunucu ülkesi. Yurt dışıysa KVKK md. 9 standart sözleşmesi imzalanıp Kurum'a 5 iş günü içinde bildirilmeli.

## 2. Giriş sistemini bağla
`auth.js` şu an sunucusuz DEMO modda çalışır. Gerçek sisteme bağlamak için `index.html`'de `auth.js`'ten önce
`window.ASI_AUTH_BACKEND` tanımlanır. Gereken yöntemler `auth.js`'in başında yazılıdır:
`signUp, signIn, signOut, resetPassword, deleteAccount, exportData, saveProgress, loadProgress, session`.

Sunucu tarafında uyulması gerekenler:
- Şifre yalnızca güçlü bir özet (bcrypt/argon2) olarak saklanır; HTTPS zorunlu.
- `signUp`'a gelen `consents` (onay zamanları ve metin sürümü) hesapla birlikte saklanır.
- `deleteAccount` hesabı ve ilerlemeyi siler; yedeklerden `retentionDays` içinde silinir.
- `exportData` hesaptaki bütün verileri döndürür (şifre özeti hariç).
- Toplanan veri: e-posta, şifre özeti, ilerleme, oluşturma/giriş zamanları. Fazlası istenmez.
