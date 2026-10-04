/* SPOTIQ Dil — kurs içeriği (Türkçe konuşanlar için İngilizce)
   Kelime: [ingilizce, türkçe, emoji]
   Cümle:  [ingilizce, türkçe, [ingilizce alternatifler], [türkçe alternatifler]] */
window.COURSE = {
  id: 'en',
  name: 'İngilizce',
  flag: '🇬🇧',
  units: [
    {
      title: 'Temeller', desc: 'Selamlaş, kendini tanıt, ilk kelimelerini öğren', color: 'coral',
      lessons: [
        { title: 'Selamlaşma', icon: '👋',
          words: [['hello','merhaba','👋'],['goodbye','hoşça kal','🙋'],['yes','evet','✅'],['no','hayır','❌'],['thank you','teşekkürler','🙏'],['please','lütfen','🥺']],
          sentences: [
            ['Hello!','Merhaba!'],
            ['Goodbye!','Hoşça kal!',[],['Güle güle']],
            ['Yes, please.','Evet, lütfen.'],
            ['No, thank you.','Hayır, teşekkürler.',['No, thanks'],['Hayır, teşekkür ederim']],
            ['Hello, how are you?','Merhaba, nasılsın?',[],['Merhaba, nasılsınız']],
            ['I am fine, thank you.','İyiyim, teşekkürler.',['I am fine, thanks','I am good, thank you'],['İyiyim, teşekkür ederim','Ben iyiyim, teşekkürler']]
          ] },
        { title: 'Kişiler', icon: '🧑',
          words: [['man','adam','👨'],['woman','kadın','👩'],['boy','oğlan','👦'],['girl','kız','👧'],['child','çocuk','🧒'],['friend','arkadaş','🤝']],
          sentences: [
            ['I am a man.','Ben bir adamım.',[],['Ben adamım','Bir adamım','Adamım']],
            ['You are a woman.','Sen bir kadınsın.',[],['Sen kadınsın','Bir kadınsın','Kadınsın']],
            ['She is a girl.','O bir kız.',[],['O kız','O bir kızdır']],
            ['He is a boy.','O bir oğlan.',[],['O oğlan','O bir erkek çocuk','O bir oğlandır']],
            ['He is my friend.','O benim arkadaşım.',[],['O arkadaşım']],
            ['The child is happy.','Çocuk mutlu.',[],['Çocuk mutludur']]
          ] },
        { title: 'Yiyecek', icon: '🍎',
          words: [['apple','elma','🍎'],['bread','ekmek','🍞'],['water','su','💧'],['milk','süt','🥛'],['egg','yumurta','🥚'],['cheese','peynir','🧀']],
          sentences: [
            ['I eat an apple.','Ben bir elma yiyorum.',['I am eating an apple'],['Bir elma yiyorum','Elma yiyorum','Ben elma yiyorum','Ben bir elma yerim','Bir elma yerim','Elma yerim']],
            ['You drink water.','Sen su içiyorsun.',['You are drinking water'],['Su içiyorsun','Sen su içersin','Su içersin']],
            ['The bread is fresh.','Ekmek taze.',[],['Ekmek tazedir']],
            ['I drink milk.','Ben süt içiyorum.',['I am drinking milk'],['Süt içiyorum','Ben süt içerim','Süt içerim']],
            ['She eats bread and cheese.','O ekmek ve peynir yiyor.',['She is eating bread and cheese'],['O ekmek ve peynir yer','Ekmek ve peynir yiyor','Ekmek ve peynir yer']],
            ['An egg, please.','Bir yumurta, lütfen.',['One egg, please'],['Lütfen bir yumurta']]
          ] },
        { title: 'Eylemler', icon: '🏃',
          words: [['eat','yemek','🍴'],['drink','içmek','🥤'],['read','okumak','📖'],['write','yazmak','✍️'],['sleep','uyumak','😴'],['run','koşmak','🏃']],
          sentences: [
            ['I read a book.','Ben bir kitap okuyorum.',['I am reading a book'],['Bir kitap okuyorum','Kitap okuyorum','Ben kitap okuyorum','Kitap okurum','Ben kitap okurum','Bir kitap okurum']],
            ['The boy runs.','Oğlan koşuyor.',['The boy is running'],['Oğlan koşar','Çocuk koşuyor']],
            ['We sleep.','Biz uyuyoruz.',['We are sleeping'],['Uyuyoruz','Biz uyuruz','Uyuruz']],
            ['They write.','Onlar yazıyor.',['They are writing'],['Onlar yazıyorlar','Yazıyorlar','Onlar yazar','Yazarlar']],
            ['The woman drinks milk.','Kadın süt içiyor.',['The woman is drinking milk'],['Kadın süt içer']],
            ['Do you eat eggs?','Yumurta yer misin?',[],['Sen yumurta yer misin','Yumurta yiyor musun']]
          ] }
      ]
    },
    {
      title: 'Aile ve Ev', desc: 'Aileni anlat, evini tarif et, renkleri ve sayıları say', color: 'teal',
      lessons: [
        { title: 'Aile', icon: '👨‍👩‍👧',
          words: [['mother','anne','🤱'],['father','baba','🧔'],['sister','kız kardeş','👭'],['brother','erkek kardeş','👬'],['family','aile','👨‍👩‍👧‍👦'],['baby','bebek','👶']],
          sentences: [
            ['This is my mother.','Bu benim annem.',[],['Bu annem']],
            ['My father is tall.','Babam uzun boylu.',[],['Babam uzun','Benim babam uzun boylu','Benim babam uzun','Babam uzun boyludur']],
            ['I have a sister.','Bir kız kardeşim var.',[],['Kız kardeşim var','Benim bir kız kardeşim var']],
            ['We are a big family.','Biz büyük bir aileyiz.',[],['Büyük bir aileyiz','Biz kalabalık bir aileyiz','Kalabalık bir aileyiz']],
            ['The baby is sleeping.','Bebek uyuyor.',['The baby sleeps'],[]],
            ['My brother is ten years old.','Erkek kardeşim on yaşında.',[],['Kardeşim on yaşında','Benim erkek kardeşim on yaşında']]
          ] },
        { title: 'Ev', icon: '🏠',
          words: [['house','ev','🏠'],['room','oda','🛋️'],['door','kapı','🚪'],['window','pencere','🪟'],['bed','yatak','🛏️'],['kitchen','mutfak','🍳']],
          sentences: [
            ['The house is big.','Ev büyük.',[],['Ev büyüktür']],
            ['My room is small.','Odam küçük.',[],['Benim odam küçük','Odam küçüktür']],
            ['Open the door, please.','Kapıyı aç, lütfen.',['Please open the door'],['Lütfen kapıyı aç','Kapıyı açın, lütfen','Lütfen kapıyı açın']],
            ['The cat is on the bed.','Kedi yatağın üstünde.',[],['Kedi yatağın üzerinde','Kedi yatakta']],
            ['Mom is in the kitchen.','Annem mutfakta.',['Mum is in the kitchen','Mother is in the kitchen'],['Anne mutfakta']],
            ['The window is open.','Pencere açık.',[],['Pencere açıktır']]
          ] },
        { title: 'Renkler', icon: '🎨',
          words: [['red','kırmızı','🔴'],['blue','mavi','🔵'],['green','yeşil','🟢'],['yellow','sarı','🟡'],['black','siyah','⚫'],['white','beyaz','⚪']],
          sentences: [
            ['The apple is red.','Elma kırmızı.',[],['Elma kırmızıdır']],
            ['The sky is blue.','Gökyüzü mavi.',[],['Gökyüzü mavidir','Gök mavi']],
            ['I like green.','Yeşili severim.',[],['Ben yeşili severim','Yeşili seviyorum','Ben yeşili seviyorum','Yeşil rengi severim']],
            ['The cat is black and white.','Kedi siyah beyaz.',[],['Kedi siyah ve beyaz','Kedi siyah beyazdır']],
            ['My car is yellow.','Arabam sarı.',[],['Benim arabam sarı','Arabam sarıdır']],
            ['What color is it?','O ne renk?',[],['Ne renk','Bu ne renk','Rengi ne']]
          ] },
        { title: 'Sayılar', icon: '🔢',
          words: [['one','bir','1️⃣'],['two','iki','2️⃣'],['three','üç','3️⃣'],['four','dört','4️⃣'],['five','beş','5️⃣'],['ten','on','🔟']],
          sentences: [
            ['I have two cats.','İki kedim var.',[],['Benim iki kedim var']],
            ['Three apples, please.','Üç elma, lütfen.',[],['Lütfen üç elma']],
            ['She is five years old.','O beş yaşında.',[],['Beş yaşında']],
            ['We have four chairs.','Dört sandalyemiz var.',[],['Bizim dört sandalyemiz var']],
            ['One, two, three!','Bir, iki, üç!'],
            ['There are ten books.','On kitap var.',[],['Orada on kitap var']]
          ] }
      ]
    },
    {
      title: 'Şehirde', desc: 'Yol sor, ulaşımı kullan, alışveriş yap', color: 'gold',
      lessons: [
        { title: 'Yerler', icon: '🏙️',
          words: [['school','okul','🏫'],['hospital','hastane','🏥'],['park','park','🌳'],['shop','dükkan','🏪'],['street','sokak','🛣️'],['city','şehir','🏙️']],
          sentences: [
            ['The school is near.','Okul yakın.',[],['Okul yakında','Okul yakındır']],
            ['Where is the hospital?','Hastane nerede?'],
            ['We walk in the park.','Parkta yürüyoruz.',['We are walking in the park'],['Biz parkta yürüyoruz','Parkta yürürüz','Biz parkta yürürüz']],
            ['The shop is closed.','Dükkan kapalı.',[],['Mağaza kapalı','Dükkân kapalı']],
            ['This street is long.','Bu sokak uzun.',[],['Bu cadde uzun']],
            ['I love this city.','Bu şehri seviyorum.',[],['Bu şehri severim','Ben bu şehri seviyorum']]
          ] },
        { title: 'Ulaşım', icon: '🚌',
          words: [['car','araba','🚗'],['bus','otobüs','🚌'],['train','tren','🚆'],['bike','bisiklet','🚲'],['plane','uçak','✈️'],['ticket','bilet','🎫']],
          sentences: [
            ['I go to school by bus.','Okula otobüsle gidiyorum.',[],['Okula otobüsle giderim','Ben okula otobüsle gidiyorum','Ben okula otobüsle giderim']],
            ['The train is late.','Tren geç kaldı.',[],['Tren gecikti','Tren geç']],
            ['My bike is new.','Bisikletim yeni.',[],['Benim bisikletim yeni']],
            ['The plane is fast.','Uçak hızlı.',[],['Uçak hızlıdır']],
            ['One ticket, please.','Bir bilet, lütfen.',[],['Lütfen bir bilet']],
            ['Is this your car?','Bu senin araban mı?',[],['Bu araba senin mi','Bu sizin arabanız mı']]
          ] },
        { title: 'Yön Bulma', icon: '🧭',
          words: [['left','sol','⬅️'],['right','sağ','➡️'],['near','yakın','📍'],['far','uzak','🔭'],['here','burada','👇'],['there','orada','👉']],
          sentences: [
            ['Turn left.','Sola dön.',[],['Sola dönün']],
            ['The bank is on the right.','Banka sağda.',[],['Banka sağ tarafta']],
            ['Is it far?','Uzak mı?',[],['O uzak mı','Burası uzak mı']],
            ['The station is near here.','İstasyon buraya yakın.',[],['İstasyon yakında','İstasyon buralarda']],
            ['Wait here.','Burada bekle.',[],['Burada bekleyin']],
            ['My house is over there.','Evim şurada.',['My house is there'],['Benim evim şurada','Evim orada','Benim evim orada']]
          ] },
        { title: 'Alışveriş', icon: '🛍️',
          words: [['money','para','💵'],['price','fiyat','🏷️'],['buy','satın almak','🛒'],['cheap','ucuz','🪙'],['expensive','pahalı','💎'],['bag','çanta','👜']],
          sentences: [
            ['How much is this?','Bu ne kadar?',[],['Bunun fiyatı ne','Bu kaç para']],
            ['It is too expensive.','Çok pahalı.',['It is very expensive'],['Bu çok pahalı','O çok pahalı']],
            ['I want to buy a bag.','Bir çanta almak istiyorum.',[],['Çanta almak istiyorum','Bir çanta satın almak istiyorum','Ben bir çanta almak istiyorum']],
            ['This shirt is cheap.','Bu gömlek ucuz.',[],['Bu gömlek ucuzdur']],
            ['I do not have money.','Param yok.',['I have no money'],['Benim param yok','Hiç param yok']],
            ['Can I pay by card?','Kartla ödeyebilir miyim?',['Can I pay with a card','Can I pay with card'],['Kart ile ödeyebilir miyim']]
          ] }
      ]
    },
    {
      title: 'Zaman ve Hava', desc: 'Günler, saatler, mevsimler ve hava durumu', color: 'plum',
      lessons: [
        { title: 'Günler', icon: '📆',
          words: [['today','bugün','📆'],['tomorrow','yarın','⏭️'],['yesterday','dün','⏮️'],['week','hafta','🗓️'],['morning','sabah','🌅'],['night','gece','🌙']],
          sentences: [
            ['Today is Monday.','Bugün pazartesi.',[],['Bugün pazartesidir']],
            ['See you tomorrow.','Yarın görüşürüz.'],
            ['I was tired yesterday.','Dün yorgundum.',['Yesterday I was tired'],['Ben dün yorgundum']],
            ['Good morning!','Günaydın!'],
            ['Good night!','İyi geceler!'],
            ['A week has seven days.','Bir haftada yedi gün var.',['There are seven days in a week'],['Haftada yedi gün var','Bir hafta yedi gündür']]
          ] },
        { title: 'Saat', icon: '⏰',
          words: [['hour','saat','⏰'],['minute','dakika','⏱️'],['early','erken','🐓'],['late','geç','🐢'],['now','şimdi','⚡'],['time','zaman','⌛']],
          sentences: [
            ['What time is it?','Saat kaç?'],
            ['It is three o\'clock.','Saat üç.',['It is three'],['Saat üçtür']],
            ['I am late.','Geç kaldım.',[],['Geciktim','Ben geç kaldım']],
            ['Wait five minutes.','Beş dakika bekle.',[],['Beş dakika bekleyin']],
            ['I get up early.','Erken kalkarım.',['I wake up early'],['Ben erken kalkarım','Erken kalkıyorum','Ben erken kalkıyorum']],
            ['We have no time.','Zamanımız yok.',['We do not have time'],['Hiç zamanımız yok','Bizim zamanımız yok']]
          ] },
        { title: 'Hava Durumu', icon: '🌦️',
          words: [['sun','güneş','☀️'],['rain','yağmur','🌧️'],['snow','kar','❄️'],['wind','rüzgar','💨'],['hot','sıcak','🔥'],['cold','soğuk','🥶']],
          sentences: [
            ['It is sunny today.','Bugün hava güneşli.',['Today it is sunny','Today is sunny'],['Bugün güneşli','Hava bugün güneşli']],
            ['It is raining.','Yağmur yağıyor.'],
            ['I love snow.','Karı severim.',[],['Karı seviyorum','Ben karı seviyorum','Ben karı severim']],
            ['The wind is strong.','Rüzgar sert.',[],['Rüzgar güçlü','Rüzgâr sert','Rüzgâr güçlü']],
            ['It is very hot.','Hava çok sıcak.',[],['Çok sıcak']],
            ['Is it cold outside?','Dışarısı soğuk mu?',[],['Dışarıda hava soğuk mu','Dışarı soğuk mu']]
          ] },
        { title: 'Mevsimler', icon: '🍂',
          words: [['spring','ilkbahar','🌸'],['summer','yaz','🌞'],['autumn','sonbahar','🍂'],['winter','kış','⛄'],['year','yıl','🎆'],['month','ay','📅']],
          sentences: [
            ['Summer is my favorite season.','Yaz en sevdiğim mevsim.',['Summer is my favourite season'],['Yaz benim en sevdiğim mevsim']],
            ['It snows in winter.','Kışın kar yağar.',[],['Kışın kar yağıyor']],
            ['The leaves fall in autumn.','Sonbaharda yapraklar düşer.',[],['Yapraklar sonbaharda düşer','Sonbaharda yapraklar dökülür','Yapraklar sonbaharda dökülür']],
            ['Flowers grow in spring.','İlkbaharda çiçekler büyür.',[],['Çiçekler ilkbaharda büyür','İlkbaharda çiçekler açar','Çiçekler ilkbaharda açar']],
            ['A year has twelve months.','Bir yılda on iki ay var.',['There are twelve months in a year'],['Bir yıl on iki aydır','Bir yılın on iki ayı var']],
            ['Happy New Year!','Mutlu yıllar!',[],['Yeni yılın kutlu olsun','İyi yıllar']]
          ] }
      ]
    },
    {
      title: 'Restoranda', desc: 'Yemek sipariş et, tatları anlat, hesabı iste', color: 'navy',
      lessons: [
        { title: 'Yemekler', icon: '🍲',
          words: [['soup','çorba','🍲'],['meat','et','🥩'],['fish','balık','🐟'],['rice','pilav','🍚'],['salad','salata','🥗'],['cake','pasta','🍰']],
          sentences: [
            ['The soup is hot.','Çorba sıcak.'],
            ['I do not eat meat.','Et yemem.',[],['Ben et yemem','Et yemiyorum','Ben et yemiyorum']],
            ['Fish and rice, please.','Balık ve pilav, lütfen.',[],['Lütfen balık ve pilav']],
            ['This salad is delicious.','Bu salata lezzetli.',[],['Bu salata çok lezzetli','Bu salata nefis']],
            ['The cake is sweet.','Pasta tatlı.',[],['Kek tatlı','Pasta tatlıdır']],
            ['Do you want rice?','Pilav ister misin?',[],['Pilav istiyor musun','Sen pilav ister misin']]
          ] },
        { title: 'İçecekler', icon: '☕',
          words: [['tea','çay','🍵'],['coffee','kahve','☕'],['juice','meyve suyu','🧃'],['sugar','şeker','🍬'],['ice','buz','🧊'],['glass','bardak','🥃']],
          sentences: [
            ['A glass of tea, please.','Bir bardak çay, lütfen.',['A cup of tea, please'],['Bir fincan çay, lütfen','Lütfen bir bardak çay','Bir çay, lütfen']],
            ['I drink coffee every morning.','Her sabah kahve içerim.',[],['Her sabah kahve içiyorum','Ben her sabah kahve içerim']],
            ['No sugar, please.','Şekersiz, lütfen.',[],['Şeker olmasın, lütfen','Lütfen şekersiz']],
            ['The juice is cold.','Meyve suyu soğuk.',[],['Meyve suyu soğuktur']],
            ['With ice, please.','Buzlu, lütfen.',[],['Buzlu olsun, lütfen','Lütfen buzlu']],
            ['This glass is empty.','Bu bardak boş.']
          ] },
        { title: 'Sipariş', icon: '📋',
          words: [['menu','menü','📋'],['waiter','garson','🤵'],['bill','hesap','🧾'],['table','masa','🍽️'],['order','sipariş','📝'],['hungry','aç','🤤']],
          sentences: [
            ['The menu, please.','Menü, lütfen.',[],['Lütfen menü','Menüyü alabilir miyim']],
            ['I am very hungry.','Çok açım.',[],['Ben çok açım']],
            ['A table for two, please.','İki kişilik bir masa, lütfen.',[],['İki kişilik masa, lütfen','Lütfen iki kişilik bir masa']],
            ['The bill, please.','Hesap, lütfen.',['The check, please'],['Lütfen hesap','Hesabı alabilir miyim']],
            ['The waiter is kind.','Garson nazik.',[],['Garson kibar']],
            ['Are you ready to order?','Sipariş vermeye hazır mısınız?',[],['Sipariş vermeye hazır mısın']]
          ] },
        { title: 'Tatlar', icon: '🌶️',
          words: [['sweet','tatlı','🍭'],['salty','tuzlu','🧂'],['sour','ekşi','🍋'],['spicy','acı','🌶️'],['delicious','lezzetli','😋'],['fresh','taze','🌿']],
          sentences: [
            ['Lemons are sour.','Limonlar ekşidir.',[],['Limonlar ekşi','Limon ekşidir','Limon ekşi']],
            ['I like spicy food.','Acı yemekleri severim.',[],['Acı yemek severim','Acı yemekleri seviyorum','Ben acı yemekleri severim']],
            ['The soup is too salty.','Çorba çok tuzlu.',['The soup is very salty'],[]],
            ['This is delicious!','Bu çok lezzetli!',[],['Bu lezzetli','Bu nefis']],
            ['The fish is fresh.','Balık taze.',[],['Balık tazedir']],
            ['Chocolate is sweet.','Çikolata tatlıdır.',[],['Çikolata tatlı']]
          ] }
      ]
    },
    {
      title: 'Seyahat', desc: 'Havalimanında, tatilde ve yardım gerektiğinde', color: 'coral',
      lessons: [
        { title: 'Havalimanı', icon: '🛫',
          words: [['passport','pasaport','🛂'],['airport','havalimanı','🛫'],['suitcase','bavul','🧳'],['hotel','otel','🏨'],['key','anahtar','🔑'],['map','harita','🗺️']],
          sentences: [
            ['Where is my passport?','Pasaportum nerede?',[],['Benim pasaportum nerede']],
            ['The airport is far.','Havalimanı uzak.',[],['Havaalanı uzak']],
            ['My suitcase is heavy.','Bavulum ağır.',[],['Benim bavulum ağır','Valizim ağır']],
            ['I have a reservation.','Rezervasyonum var.',[],['Benim rezervasyonum var','Bir rezervasyonum var']],
            ['Here is your key.','İşte anahtarınız.',[],['İşte anahtarın','Anahtarınız burada','Anahtarın burada']],
            ['Do you have a map?','Haritan var mı?',[],['Haritanız var mı','Bir haritan var mı','Bir haritanız var mı']]
          ] },
        { title: 'Tatil', icon: '🌴',
          words: [['sea','deniz','🌊'],['beach','plaj','🏖️'],['mountain','dağ','⛰️'],['photo','fotoğraf','📷'],['holiday','tatil','🌴'],['museum','müze','🏛️']],
          sentences: [
            ['The sea is beautiful.','Deniz güzel.',[],['Deniz çok güzel','Deniz güzeldir']],
            ['We are on holiday.','Tatildeyiz.',['We are on vacation'],['Biz tatildeyiz']],
            ['Let\'s go to the beach!','Hadi plaja gidelim!',[],['Plaja gidelim']],
            ['Take a photo, please.','Bir fotoğraf çek, lütfen.',['Please take a photo'],['Lütfen bir fotoğraf çek','Fotoğraf çek, lütfen']],
            ['The museum opens at nine.','Müze dokuzda açılır.',[],['Müze saat dokuzda açılır','Müze dokuzda açılıyor','Müze saat dokuzda açılıyor']],
            ['The mountain is high.','Dağ yüksek.',[],['Dağ yüksektir']]
          ] },
        { title: 'Yardım', icon: '🆘',
          words: [['help','yardım','🆘'],['doctor','doktor','🩺'],['police','polis','👮'],['phone','telefon','📱'],['lost','kayıp','❓'],['sick','hasta','🤒']],
          sentences: [
            ['Help me, please!','Bana yardım et, lütfen!',['Please help me'],['Lütfen bana yardım et','Bana yardım edin, lütfen','Lütfen bana yardım edin','Yardım et, lütfen']],
            ['I need a doctor.','Bir doktora ihtiyacım var.',[],['Doktora ihtiyacım var']],
            ['Call the police!','Polisi ara!',[],['Polisi arayın','Polis çağır','Polis çağırın']],
            ['I am lost.','Kayboldum.',[],['Ben kayboldum']],
            ['My phone is broken.','Telefonum bozuk.',[],['Telefonum bozuldu','Benim telefonum bozuk']],
            ['I feel sick.','Kendimi hasta hissediyorum.',[],['Hastayım','Kendimi kötü hissediyorum']]
          ] },
        { title: 'Sohbet', icon: '💬',
          words: [['name','isim','📛'],['country','ülke','🌍'],['language','dil','🗣️'],['speak','konuşmak','💬'],['understand','anlamak','💡'],['Turkey','Türkiye','🇹🇷']],
          sentences: [
            ['What is your name?','Adın ne?',[],['Senin adın ne','Adınız ne','İsmin ne','Adınız nedir','Adın nedir']],
            ['My name is Ali.','Benim adım Ali.',[],['Adım Ali','İsmim Ali','Benim ismim Ali']],
            ['I am from Turkey.','Türkiyeliyim.',[],['Ben Türkiyeliyim','Türkiye\'denim','Ben Türkiye\'denim']],
            ['Do you speak English?','İngilizce konuşuyor musun?',[],['İngilizce biliyor musun','İngilizce konuşabiliyor musun','İngilizce konuşuyor musunuz']],
            ['I do not understand.','Anlamıyorum.',[],['Ben anlamıyorum','Anlamadım']],
            ['Nice to meet you.','Tanıştığımıza memnun oldum.',[],['Tanıştığıma memnun oldum','Memnun oldum']]
          ] }
      ]
    }
  ]
};

/* Kelime ipuçları için ek sözlük (cümlelerdeki küçük kelimeler) */
window.HINTS = {
  en: { i:'ben', you:'sen / siz', he:'o (erkek)', she:'o (kadın)', it:'o', we:'biz', they:'onlar', my:'benim', your:'senin', the:'(belirli tanımlık)', a:'bir', an:'bir', is:'-dir / -dır', am:'-ım', are:'-sın / -iz', and:'ve', this:'bu', very:'çok', too:'çok / fazla', in:'içinde / -de', on:'üstünde', to:'-e / -a', by:'ile', at:'-de', of:'-in', for:'için', with:'ile', what:'ne', where:'nerede', how:'nasıl', do:'(yardımcı fiil)', not:'değil', have:'sahip olmak', has:'sahip', big:'büyük', small:'küçük', happy:'mutlu', fine:'iyi', book:'kitap', cat:'kedi', cats:'kediler', tall:'uzun boylu', open:'açık / aç', every:'her', old:'yaşında / eski', years:'yıllar', like:'sevmek', love:'sevmek', go:'gitmek', new:'yeni', fast:'hızlı', want:'istemek', can:'-ebilmek', pay:'ödemek', card:'kart', turn:'dön', wait:'bekle', see:'görmek', good:'iyi', tired:'yorgun', was:'idi', seven:'yedi', days:'günler', season:'mevsim', favorite:'en sevilen', twelve:'on iki', months:'aylar', outside:'dışarıda', strong:'güçlü', sunny:'güneşli', raining:'yağmur yağıyor', get:'almak', up:'yukarı', leaves:'yapraklar', fall:'düşmek', flowers:'çiçekler', grow:'büyümek', heavy:'ağır', reservation:'rezervasyon', here:'burada', beautiful:'güzel', high:'yüksek', nine:'dokuz', take:'almak / çekmek', need:'ihtiyaç', call:'aramak', broken:'bozuk', feel:'hissetmek', me:'beni / bana', from:'-den', nice:'güzel', meet:'tanışmak', english:'İngilizce', empty:'boş', ready:'hazır', kind:'nazik', two:'iki', no:'hayır / yok', food:'yemek', chocolate:'çikolata', lemons:'limonlar', shirt:'gömlek', station:'istasyon', bank:'banka', sky:'gökyüzü', color:'renk', chairs:'sandalyeler', books:'kitaplar', there:'orada', over:'öte', closed:'kapalı', long:'uzun', walk:'yürümek', school:'okul', mom:'anne', eggs:'yumurtalar', apples:'elmalar', minutes:'dakikalar', "o'clock":'saat', "let's":'hadi ...elim', monday:'pazartesi', ali:'Ali', glass:'bardak', fresh:'taze', delicious:'lezzetli', salty:'tuzlu', how_much:'ne kadar' },
  tr: { ben:'I', sen:'you', o:'he / she / it', biz:'we', onlar:'they', bir:'a / one', ve:'and', bu:'this', çok:'very / a lot', lütfen:'please', benim:'my', senin:'your', var:'there is / have', yok:'there is no', nerede:'where', ne:'what', mi:'(soru eki)', mı:'(soru eki)', mu:'(soru eki)', mü:'(soru eki)', her:'every', hadi:'let\'s', işte:'here is', şurada:'over there', hava:'weather / air', saat:'hour / o\'clock', kaç:'how many', kedi:'cat', kitap:'book', mutlu:'happy', büyük:'big', küçük:'small', uzun:'long / tall', boylu:'tall', yeni:'new', hızlı:'fast', açık:'open', kapalı:'closed', gömlek:'shirt', istiyorum:'I want', almak:'to buy / take', güzel:'beautiful', yüksek:'high', ağır:'heavy', boş:'empty', nazik:'kind', hazır:'ready', taze:'fresh', tatlı:'sweet', sıcak:'hot', soğuk:'cold', iki:'two', üç:'three', beş:'five', on:'ten', dört:'four', yedi:'seven', gün:'day', mevsim:'season', yaz:'summer', kış:'winter', ay:'month', yıl:'year' }
};
