# ASİ Dil — ek içerik kılavuzu (kütüphane, okuma, dinleme, konuşma)

ASİ Dil, Türkçe konuşan yetişkinlere (~25 yaş) sıfırdan C1'e İngilizce öğreten oyunlaştırılmış bir uygulama. Ana kurs (45 ünite, ~3.100 kelime) hazır.
Şimdi gerçek C1 için gereken ek içerikleri yazıyorsun. TÜM METİNLER ÖZGÜN OLMALI: hiçbir kitaptan, makaleden, şarkıdan, filmden, diziden veya yayından alıntı ya da yakın uyarlama yapma.
Türkçe doğal ve doğru olsun (ç ğ ı İ ö ş ü). JS stringlerinde çift tırnak kullan; içerikte çift tırnak karakteri (") ve ; : ( ) [ ] { } … kullanma.
İşin bitince doğrula: `cd /home/user/spotiq/uygulamalar/dil/content && node validate2.js <dosya>` ve `node --check <dosya>`, 0 hata olana kadar düzelt. Sadece kendi dosyana dokun.
Dosya büyükse Write ile başlayıp Edit ile parça parça ekleyebilirsin. Bitince yalnızca kısa bir özet döndür.

## A) Kelime kütüphanesi — content/lib_N.js
```js
(window.LIBRARY = window.LIBRARY || []).push(
  { id: "lib1a", title: "Deste adı (Türkçe)", icon: "💼", cefr: "B2", desc: "Tek cümle Türkçe açıklama",
    words: [ ["negotiate", "müzakere etmek", "", "We need to negotiate a better price.", "Daha iyi bir fiyat için müzakere etmemiz gerekiyor."], ... ] },
  { ...ikinci deste... }, { ...üçüncü deste... }
);
```
- Her deste TAM 110 kelime/ifade. Alanlar: [ingilizce, türkçe anlam, emoji ("" olabilir), İngilizce örnek cümle, Türkçe çevirisi].
- Seviye B2 veya C1 (desteye göre). Kelimeler gerçekten kullanışlı, sık geçen, yetişkin hayatında işe yarayan kelimeler olsun; collocation ve phrasal verb de olabilir.
- İngilizce kelime örnek cümlede AYNEN geçsin (çekimsiz hâliyle, mümkünse). Örnek cümle 8-18 kelime.
- `existing_words.txt` dosyasındaki kelimeleri KULLANMA (ana kursta zaten var). Kendi destelerin arasında da tekrar olmasın.

## B) Okuma metinleri — content/read_N.js
```js
(window.READINGS = window.READINGS || []).push(
  { id: "r1", title: "Başlık (İngilizce)", trTitle: "Başlık (Türkçe)", cefr: "B1", icon: "📰", kind: "Haber",   // Hikâye | Blog | Haber | Makale | Röportaj | E-posta
    paragraphs: [ ["English paragraph, 2-4 sentences.", "Türkçe çevirisi."], ... ],
    glossary: [ ["word", "anlamı"], ... ],         // 8-12 zor kelime, metinde geçen hâliyle
    questions: [ { q: "Question?", options: ["a","b","c"], answer: 1 }, ... ] }   // 4 soru; A2'de Türkçe, B1+ İngilizce; doğru cevabın yeri değişsin
);
```
- Uzunluk: A2 200-300 kelime, B1 300-400, B2 400-550, C1 500-700. Paragraf 4-8 tane.
- Konular ilgi çekici ve yetişkine uygun: kariyer, teknoloji, psikoloji, seyahat, tuhaf ama gerçekçi olaylar, kısa kurgu, kişisel blog yazıları. Gerçek kişiler hakkında uydurma iddia yazma; kurgusal karakterler kullan.

## C) Podcast / dinleme — content/listen_1.js
```js
(window.PODCASTS = window.PODCASTS || []).push(
  { id: "p1", title: "Bölüm başlığı (Türkçe)", cefr: "B1", icon: "🎧", desc: "Tek cümle",
    lines: [ ["Maya", "English line.", "Türkçe."], ["Tom", "...", "..."], ... ],   // 14-24 satır
    questions: [ { after: 6, q: "Question?", options: ["a","b","c"], answer: 0 }, ... ] }  // 3-4 soru, after = satır indeksi (0 tabanlı)
);
```
- "ASİ Dil Radyo" adlı kurgusal bir podcast. Sunucular Maya (Kanadalı, enerjik) ve Tom (İngiliz, kuru espri). Bazen konuk olabilir (kurgusal).
- Doğal konuşma dili: dolgu sözcükleri (well, you know, I mean), deyimler, phrasal verbs, aksan farklarına dair esprili yorumlar.

## D) Konuşma kulübü — content/speak_1.js
```js
(window.ROLEPLAYS = window.ROLEPLAYS || []).push(
  { id: "s1", title: "Senaryo adı (Türkçe)", cefr: "A2", icon: "☕", situation: "Türkçe durum açıklaması: kimsin, kiminle, ne istiyorsun.",
    partner: "Barista",
    turns: [ { them: "Hi! What can I get you?", themTr: "Merhaba! Ne alırsınız?", hint: "Bir latte iste, boyutunu söyle.",
               answers: ["Can I have a large latte, please?", "I'd like a large latte, please."], keywords: ["latte", "large"] }, ... ] }   // 5-7 tur
);
```
- `keywords`: kullanıcının cevabında geçmesi beklenen 2-4 anahtar kelime (küçük harf). `answers`: 2-3 doğal örnek cevap.
