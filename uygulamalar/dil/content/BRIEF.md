# SPOTIQ Dil — içerik yazım kılavuzu (ajanlar için)

Türkçe konuşan yetişkinlere (hedef kitle: ~25 yaş) İngilizce öğreten, oyunlaştırılmış bir dil uygulamasının kurs içeriğini yazıyorsun.
Hedef: Kurs bittiğinde öğrenci C1 seviyesine ulaşmış olmalı. İçerik yetişkinlere hitap etmeli (iş, kariyer, ilişkiler, para, teknoloji, seyahat, haber, kültür), sıkıcı olmamalı, esprili ve doğal olmalı.
Tüm içerik ÖZGÜN olmalı: hiçbir ders kitabından, şarkıdan, filmden veya yayından metin kopyalama.

## Dosya biçimi
Tek bir JS dosyası yaz: `/home/user/spotiq/uygulamalar/dil/content/<ANAHTAR>.js`

```js
(window.COURSE_PARTS = window.COURSE_PARTS || {})['<ANAHTAR>'] = [
  {
    title: 'Ünite başlığı (Türkçe, kısa)',
    desc: 'Tek cümlelik Türkçe açıklama: bu ünitede ne yapabileceksin',
    cefr: 'A1',            // A1 | A2 | B1 | B2 | C1
    guide: [               // Dilbilgisi/kullanım rehberi, Türkçe anlatım. 3-4 madde.
      { h: 'Başlık', p: 'Türkçe, net, örnekli kısa açıklama (2-4 cümle). Türk öğrencinin yaptığı tipik hataları belirt.', ex: [['English example.', 'Türkçe karşılığı.'], ['...', '...']] }
    ],
    story: {               // Ünitenin sonunda okunan kısa hikâye/diyalog
      title: 'Hikâye başlığı (Türkçe)', icon: '☕',
      lines: [ ['Konuşan', 'English line.', 'Türkçe çeviri.'], ... ],   // 8-12 satır. Anlatıcı için 'Anlatıcı' kullan.
      questions: [ { after: 3, q: 'Soru metni', options: ['a', 'b', 'c'], answer: 0 }, ... ]  // en az 3 soru; after = hangi satırdan (0 tabanlı indeks) SONRA sorulacak; answer = doğru seçeneğin indeksi. Doğru cevabın yeri değişsin.
    },
    extra: [ ['word', 'kelime', '🧩'], ... ],   // 30 ek kelime/ifade (kelime paketi). Emoji yoksa ''.
    lessons: [             // TAM 5 ders
      {
        title: 'Ders başlığı (Türkçe)', icon: '👋',
        words: [ ['english', 'türkçe', '👋'], ... ],   // 10 kelime/ifade. Somutsa emoji, soyutsa ''.
        sentences: [       // 6 cümle
          ['English sentence.', 'Türkçe cümle.', ['Other acceptable English'], ['Diğer kabul edilebilir Türkçe çeviri', '...']],
        ]
      }
    ]
  }
];
```

## Kurallar (çok önemli — uygulama bunları otomatik kontrol eder)
1. Her ünitede TAM 5 ders; her derste 10 kelime ve 6 cümle; ünite başına 30 `extra`.
2. Kelimeler: `[ingilizce, türkçe, emoji]`. İngilizce kısım küçük harf (özel isim değilse). Phrasal verb ve deyimler de olabilir ("give up", "break the ice"). Aynı İngilizce kelime dosyada İKİ KEZ geçmesin (words + extra dahil). Çok temel kelimeleri (I, you, the, is, a) kelime listesine koyma.
3. Ders kelimelerinin çoğu o dersin cümlelerinde geçsin.
4. Cümlelerde şu karakterler YASAK: ; : " ( ) [ ] { } … — Sadece . , ! ? ' ve - kullan. JS string için tek tırnak kullanıyorsan içteki kesme işaretini \' ile kaçır.
5. İngilizce cümle en fazla 18 kelime, Türkçe en fazla 14 kelime. Seviye yükseldikçe cümleler uzasın ve zenginleşsin (A1: 3-7 kelime; C1: 10-18).
6. TÜRKÇE ALTERNATİFLER HAYATİ: Kullanıcı Türkçe kelime kartlarını dizerek ya da İngilizce yazarak cevap veriyor. Doğru bir çeviriyi yanlış saymamak için 4. alana makul tüm Türkçe varyantları yaz: zamirli/zamirsiz ("Ben yorgunum" / "Yorgunum"), -iyor/-ir ("içiyorum"/"içerim"), sen/siz, eş anlamlılar ("hızlı/çabuk"). İngilizce alternatifleri 3. alana yaz (eş anlamlı ifade, farklı kelime sırası). Kısaltmalar (I'm, don't) otomatik eşleşir, onları alternatif olarak yazmana gerek yok.
7. Türkçe doğal, akıcı ve doğru olsun (makine çevirisi gibi değil). Türkçe karakterleri doğru kullan (ç ğ ı İ ö ş ü).
8. Rehber (guide) birçok dil uygulamasında eksik olan bir şeyi kapatıyor: dilbilgisini açıkça, Türkçe ve Türkler için anlat (ör. "Türkçede 'olmak' fiili gizlidir, İngilizcede am/is/are şarttır").
9. Hikâyeler eğlenceli, esprili ve süreklilik içinde olsun (aşağıdaki hikâye evrenine uy). Sorular anlamayı ölçsün. A1-A2'de sorular Türkçe; B1 ve üstünde İngilizce olabilir.
10. Bittikten sonra doğrula: `cd /home/user/spotiq/uygulamalar/dil/content && node validate.js <ANAHTAR>.js` — 0 hata olana kadar düzelt. `node --check <ANAHTAR>.js` de geçmeli.
11. Dosya büyük olacak; Write ile bir kerede yazamıyorsan üniteleri sırayla ekleyerek (Edit ile) yaz. Başka dosyaya dokunma.

## Hikâye evreni (tüm kurs boyunca süren özgün anlatı)
- **Deniz** (25, İzmirli yazılım geliştirici, esprili, biraz dağınık) Londra'da bir teknoloji şirketinde iş bulur ve oraya taşınır.
- **Lina** (Deniz'in ev arkadaşı, İspanyol, şef olmak istiyor), **Emma** (iş arkadaşı, İngiliz, zeki ve alaycı; ileride Deniz'le aralarında bir şeyler başlar), **Mr. Walker** (patron, katı ama adil), **Can** (Deniz'in İzmir'deki en yakın arkadaşı, telefonda konuşurlar), **Priya** (yatırımcı, C1'de).
- A1: Londra'ya varış, ev, ilk market, ilk gün. A2: ilk hafta sonları, hastalanma, ofis hayatı, gezi. B1: daha iyi bir iş için mülakat, Emma ile yakınlaşma, haberler, para sorunları. B2: zor toplantılar, tartışmalar, kültür farkları, bir hukuki sorun. C1: Deniz kendi girişimini kurar, yatırımcılarla müzakere eder, konferansta konuşma yapar.
