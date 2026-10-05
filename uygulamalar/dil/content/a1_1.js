(window.COURSE_PARTS = window.COURSE_PARTS || {})["a1_1"] = [
  // ===================== ÜNİTE 1 =====================
  {
    title: "Merhaba!",
    desc: "Selamlaşabilecek, kendini tanıtabilecek, nereli olduğunu ve mesleğini söyleyebileceksin.",
    cefr: "A1",
    guide: [
      { h: "to be fiili: am / is / are", p: "Türkçede 'olmak' fiili gizlidir, 'Ben yorgunum' deriz ve ek yeterlidir. İngilizcede am/is/are ŞARTTIR. I ile am, he/she/it ile is, you/we/they ile are kullanılır. En sık hata 'I tired' demektir, doğrusu 'I am tired'.", ex: [["I am tired.", "Yorgunum."], ["She is a teacher.", "O bir öğretmen."], ["We are from Turkey.", "Türkiyeliyiz."]] },
      { h: "Olumsuz ve soru", p: "Olumsuz yapmak için am/is/are'dan sonra not gelir. Soru için am/is/are öne geçer, Türkçedeki 'mi' eki gibi ayrı bir kelime yoktur. Konuşmada kısaltmalar çok yaygındır, I'm, he's, isn't, aren't.", ex: [["He is not a student.", "O öğrenci değil."], ["Are you ready?", "Hazır mısın?"], ["Is she British?", "O İngiliz mi?"]] },
      { h: "Meslek söylerken a / an", p: "Türkçede 'Ben doktorum' deriz, 'bir' kelimesine gerek yoktur. İngilizcede tekil meslekten önce a ya da an ZORUNLUDUR. Sesli harf sesiyle başlayan kelimelerden önce an gelir.", ex: [["I am a doctor.", "Doktorum."], ["She is an engineer.", "O mühendis."], ["He is a waiter.", "O garson."]] },
      { h: "Selamlaşma ve vedalaşma", p: "Good morning öğleye kadar, good afternoon öğleden sonra, good evening akşam selamıdır. Good night ise selam değil, iyi geceler diyerek vedalaşmaktır. Akşam birine ilk gördüğünde good night dersen tuhaf kaçar.", ex: [["Good evening, come in.", "İyi akşamlar, buyurun."], ["Good night, see you tomorrow.", "İyi geceler, yarın görüşürüz."]] }
    ],
    story: {
      title: "Heathrow'da İlk Adım", icon: "✈️",
      lines: [
        ["Anlatıcı", "Deniz lands at Heathrow Airport. It is cold and rainy.", "Deniz Heathrow Havalimanı'na iner. Hava soğuk ve yağmurlu."],
        ["Taksici", "Good afternoon! Where to?", "İyi günler! Nereye?"],
        ["Deniz", "Hello! I am Deniz. Camden, please. Here is the address.", "Merhaba! Ben Deniz. Camden, lütfen. İşte adres."],
        ["Taksici", "No problem. I am Tom. Are you on holiday?", "Sorun değil. Ben Tom. Tatilde misin?"],
        ["Deniz", "No, I am not. I am a software developer. I have a new job here.", "Hayır, değilim. Yazılım geliştiriciyim. Burada yeni bir işim var."],
        ["Taksici", "Great! Where are you from?", "Harika! Nerelisin?"],
        ["Deniz", "I am from Izmir, in Turkey. It is always sunny there.", "İzmirliyim, Türkiye'de. Orada hava hep güneşli."],
        ["Taksici", "Sunny? Welcome to London, mate. Here, the sun is just a rumour.", "Güneşli mi? Londra'ya hoş geldin dostum. Burada güneş sadece bir söylenti."],
        ["Deniz", "Oh no. Is my umbrella in my suitcase?", "Eyvah. Şemsiyem bavulumda mı?"],
        ["Anlatıcı", "Deniz opens the suitcase. Socks, a laptop, three packets of Turkish coffee. No umbrella.", "Deniz bavulu açar. Çoraplar, bir dizüstü bilgisayar, üç paket Türk kahvesi. Şemsiye yok."],
        ["Taksici", "Ha! Now you are a real Londoner. Nice to meet you, Deniz!", "Ha! Artık gerçek bir Londralısın. Tanıştığımıza memnun oldum, Deniz!"]
      ],
      questions: [
        { after: 3, q: "Taksicinin adı ne?", options: ["Tom", "Deniz", "Camden"], answer: 0 },
        { after: 6, q: "Deniz nereli?", options: ["Londra", "Camden", "İzmir"], answer: 2 },
        { after: 9, q: "Bavulda ne yok?", options: ["Türk kahvesi", "Şemsiye", "Çoraplar"], answer: 1 }
      ]
    },
    extra: [
      ["welcome", "hoş geldin", "🤗"], ["excuse me", "affedersiniz", "🙋"], ["yes", "evet", "✅"], ["no", "hayır", "❌"],
      ["okay", "tamam", "👌"], ["cheers", "sağ ol, şerefe", "🥂"], ["passport", "pasaport", "🛂"], ["airport", "havalimanı", "✈️"],
      ["taxi", "taksi", "🚕"], ["suitcase", "bavul", "🧳"], ["ticket", "bilet", "🎫"], ["address", "adres", "🏠"],
      ["phone number", "telefon numarası", "📞"], ["email address", "e-posta adresi", "📧"], ["age", "yaş", ""], ["married", "evli", "💍"],
      ["single", "bekâr", ""], ["nationality", "uyruk", ""], ["language", "dil", "🗣️"], ["France", "Fransa", "🇫🇷"],
      ["Italy", "İtalya", "🇮🇹"], ["the USA", "ABD", "🇺🇸"], ["Japan", "Japonya", "🇯🇵"], ["Chinese", "Çinli, Çince", "🇨🇳"],
      ["Arabic", "Arapça", ""], ["actor", "oyuncu, aktör", "🎭"], ["police officer", "polis memuru", "👮"], ["manager", "müdür, yönetici", "👔"],
      ["cashier", "kasiyer", "🧾"], ["farmer", "çiftçi", "👨‍🌾"]
    ],
    lessons: [
      {
        title: "Selamlaşma", icon: "👋",
        words: [
          ["hello", "merhaba", "👋"], ["good morning", "günaydın", "🌅"], ["good afternoon", "iyi günler, tünaydın", "🌤️"], ["good evening", "iyi akşamlar", "🌆"],
          ["good night", "iyi geceler", "🌙"], ["goodbye", "hoşça kal, güle güle", "👋"], ["see you later", "sonra görüşürüz", ""], ["thank you", "teşekkür ederim", "🙏"],
          ["please", "lütfen", ""], ["sorry", "pardon, özür dilerim", "😔"]
        ],
        sentences: [
          ["Hello, I am Deniz.", "Merhaba, ben Deniz.", ["Hello, my name is Deniz."], ["Merhaba, ben Deniz'im.", "Merhaba, adım Deniz.", "Merhaba, benim adım Deniz."]],
          ["Good morning, sir!", "Günaydın efendim!", [], ["Günaydın beyefendi!"]],
          ["Thank you, see you later!", "Teşekkürler, sonra görüşürüz!", ["Thanks, see you later!"], ["Teşekkür ederim, sonra görüşürüz!", "Sağ ol, sonra görüşürüz!", "Teşekkürler, görüşürüz!", "Sağ ol, görüşürüz!"]],
          ["Sorry, I am late.", "Pardon, geç kaldım.", [], ["Özür dilerim, geç kaldım.", "Kusura bakma, geç kaldım.", "Kusura bakmayın, geç kaldım.", "Üzgünüm, geç kaldım.", "Pardon, geciktim.", "Özür dilerim, geciktim."]],
          ["Good night and goodbye, Mum.", "İyi geceler ve hoşça kal anne.", [], ["İyi geceler, hoşça kal anne.", "İyi geceler ve hoşça kal, anne.", "İyi geceler ve güle güle anne."]],
          ["Good evening, please come in.", "İyi akşamlar, lütfen içeri gelin.", [], ["İyi akşamlar, lütfen içeri gel.", "İyi akşamlar, buyurun içeri.", "İyi akşamlar, lütfen buyurun.", "İyi akşamlar, lütfen içeri girin."]]
        ]
      },
      {
        title: "Tanışma", icon: "🤝",
        words: [
          ["name", "isim, ad", "📛"], ["nice to meet you", "tanıştığımıza memnun oldum", "🤝"], ["how are you", "nasılsın", ""], ["fine", "iyi", "🙂"],
          ["great", "harika", "🤩"], ["not bad", "fena değil", ""], ["friend", "arkadaş", "🧑‍🤝‍🧑"], ["Mr", "Bay", "👨"],
          ["Ms", "Bayan", "👩"], ["surname", "soyadı", ""]
        ],
        sentences: [
          ["What is your name?", "Adın ne?", [], ["Adınız ne?", "İsmin ne?", "İsminiz ne?", "Senin adın ne?", "Sizin adınız ne?", "Senin ismin ne?"]],
          ["My name is Deniz and my surname is Yılmaz.", "Adım Deniz ve soyadım Yılmaz.", [], ["Benim adım Deniz ve soyadım Yılmaz.", "İsmim Deniz, soyadım Yılmaz.", "Adım Deniz, soyadım Yılmaz."]],
          ["Nice to meet you, Mr Brown.", "Tanıştığımıza memnun oldum, Bay Brown.", [], ["Memnun oldum, Bay Brown.", "Tanıştığımıza memnun oldum Bay Brown.", "Tanıştığıma memnun oldum, Bay Brown."]],
          ["How are you today, Ms Green?", "Bugün nasılsınız, Bayan Green?", [], ["Bugün nasılsın, Bayan Green?", "Bayan Green, bugün nasılsınız?", "Bugün nasılsınız Bayan Green?"]],
          ["I am fine, thanks.", "İyiyim, teşekkürler.", ["I am fine, thank you."], ["Ben iyiyim, teşekkürler.", "İyiyim, sağ ol.", "İyiyim, teşekkür ederim.", "İyiyim, sağ olun."]],
          ["Not bad, my friend. And you?", "Fena değil dostum. Ya sen?", [], ["Fena değil, dostum. Ya sen?", "Fena değil arkadaşım. Ya sen?", "Fena değil, arkadaşım. Sen nasılsın?", "Fena değil dostum. Sen?"]]
        ]
      },
      {
        title: "Ben, Sen, O", icon: "🙋",
        words: [
          ["student", "öğrenci", "🎓"], ["teacher", "öğretmen", "👩‍🏫"], ["happy", "mutlu", "😊"], ["tired", "yorgun", "😴"],
          ["hungry", "aç", "🍽️"], ["ready", "hazır", ""], ["here", "burada", "📍"], ["from", "-den, -dan", ""],
          ["new", "yeni", "✨"], ["busy", "meşgul, yoğun", ""]
        ],
        sentences: [
          ["I am tired and hungry.", "Yorgunum ve açım.", [], ["Ben yorgunum ve açım.", "Yorgunum ve acıktım.", "Ben yorgunum ve acıktım."]],
          ["She is a teacher.", "O bir öğretmen.", [], ["O öğretmen.", "O bir öğretmendir.", "O öğretmendir.", "Öğretmen."]],
          ["We are very busy today.", "Bugün çok meşgulüz.", [], ["Biz bugün çok meşgulüz.", "Bugün çok yoğunuz.", "Biz bugün çok yoğunuz."]],
          ["Are you ready?", "Hazır mısın?", [], ["Hazır mısınız?", "Sen hazır mısın?", "Siz hazır mısınız?"]],
          ["He is not a student.", "O öğrenci değil.", [], ["O bir öğrenci değil.", "Öğrenci değil."]],
          ["They are new here, but happy.", "Onlar burada yeni ama mutlular.", [], ["Burada yeniler ama mutlular.", "Onlar burada yeni ama mutlu.", "Onlar buraya yeni ama mutlular."]]
        ]
      },
      {
        title: "Nerelisin?", icon: "🌍",
        words: [
          ["Turkey", "Türkiye", "🇹🇷"], ["Turkish", "Türk, Türkçe", ""], ["England", "İngiltere", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"], ["British", "İngiliz, Britanyalı", "🇬🇧"],
          ["Spain", "İspanya", "🇪🇸"], ["Spanish", "İspanyol, İspanyolca", ""], ["Germany", "Almanya", "🇩🇪"], ["country", "ülke", "🌍"],
          ["city", "şehir", "🏙️"], ["where", "nerede, nereli", "📍"]
        ],
        sentences: [
          ["Where are you from?", "Nerelisin?", [], ["Nerelisiniz?", "Sen nerelisin?", "Siz nerelisiniz?", "Nereden geliyorsun?", "Nereden geliyorsunuz?"]],
          ["I am Turkish, from Turkey.", "Türk'üm, Türkiye'denim.", ["I am Turkish. I am from Turkey."], ["Ben Türk'üm, Türkiye'denim.", "Türküm, Türkiyeliyim.", "Ben Türküm, Türkiyeliyim.", "Türk'üm, Türkiyeliyim."]],
          ["Izmir is a city in Turkey.", "İzmir, Türkiye'de bir şehir.", [], ["İzmir Türkiye'de bir şehir.", "İzmir Türkiye'de bir şehirdir.", "İzmir, Türkiye'de bir şehirdir."]],
          ["Lina is Spanish, from Spain.", "Lina İspanyol, İspanya'dan.", [], ["Lina İspanyol, İspanyalı.", "Lina İspanyoldur, İspanya'dan.", "Lina İspanyol ve İspanya'dan."]],
          ["Is Emma British?", "Emma İngiliz mi?", [], ["Emma Britanyalı mı?"]],
          ["Germany is a big country.", "Almanya büyük bir ülke.", [], ["Almanya büyük bir ülkedir."]]
        ]
      },
      {
        title: "Meslekler", icon: "💼",
        words: [
          ["job", "iş", "💼"], ["engineer", "mühendis", "👷"], ["doctor", "doktor", "🩺"], ["nurse", "hemşire", "👩‍⚕️"],
          ["waiter", "garson", "🍽️"], ["chef", "şef, aşçı", "👨‍🍳"], ["driver", "şoför, sürücü", "🚗"], ["lawyer", "avukat", "⚖️"],
          ["software developer", "yazılım geliştirici", "💻"], ["what do you do", "ne iş yapıyorsun", ""]
        ],
        sentences: [
          ["What do you do?", "Ne iş yapıyorsun?", [], ["Ne iş yapıyorsunuz?", "Ne iş yaparsın?", "Ne iş yaparsınız?", "Mesleğin ne?", "Mesleğiniz ne?", "İşin ne?"]],
          ["I am a software developer.", "Ben yazılım geliştiriciyim.", [], ["Yazılım geliştiriciyim."]],
          ["Lina is a waiter, not a chef.", "Lina garson, şef değil.", [], ["Lina bir garson, şef değil.", "Lina garson, aşçı değil.", "Lina bir garson, bir şef değil."]],
          ["Is he a lawyer or a doctor?", "O avukat mı, doktor mu?", [], ["O avukat mı doktor mu?", "Avukat mı, doktor mu?", "Avukat mı doktor mu?", "O bir avukat mı yoksa doktor mu?"]],
          ["The driver is very nice.", "Şoför çok nazik.", [], ["Sürücü çok nazik.", "Şoför çok iyi.", "Şoför çok hoş.", "Şoför çok kibar.", "Sürücü çok kibar.", "Sürücü çok iyi."]],
          ["She is an engineer in London.", "O, Londra'da mühendis.", [], ["O Londra'da mühendis.", "O Londra'da bir mühendis.", "Londra'da mühendis.", "Londra'da bir mühendis."]]
        ]
      }
    ]
  },

  // ===================== ÜNİTE 2 =====================
  {
    title: "İnsanlar ve Aile",
    desc: "Aileni ve arkadaşlarını tanıtabilecek, insanları birkaç sıfatla anlatabileceksin.",
    cefr: "A1",
    guide: [
      { h: "my, your, his, her, our, their", p: "Türkçede sahipliği ekle gösteririz, annem, annen, annesi. İngilizcede kelimenin ÖNÜNE ayrı bir kelime gelir, my mother, your mother. Türkçede 'o' tek kelimedir ama İngilizcede erkek için his, kadın için her kullanılır. Can'ın annesi için his mother, Lina'nın annesi için her mother dersin.", ex: [["My mother is a teacher.", "Annem öğretmen."], ["His wife is a doctor.", "Onun karısı doktor."], ["Her brother is in Izmir.", "Onun erkek kardeşi İzmir'de."]] },
      { h: "have got / has got ile 'var'", p: "Türkçede 'Bir kardeşim var' deriz. İngilizcede bu sahiplik have got ile kurulur. I, you, we, they ile have got, he, she, it ile has got gelir. Soru için have ya da has öne geçer, olumsuzu have not got ya da has not got olur.", ex: [["I have got a brother.", "Bir erkek kardeşim var."], ["She has got blue eyes.", "Onun mavi gözleri var."], ["Has he got a beard?", "Onun sakalı var mı?"]] },
      { h: "Sıfatlar ismin önünde ve hep tekil", p: "Sıfat Türkçedeki gibi ismin önüne gelir, a tall man. Ama İngilizcede sıfat asla çoğul eki almaz, blue eyes doğru, blues eyes yanlış. to be ile de kullanılır, She is young.", ex: [["Lina is tall and friendly.", "Lina uzun boylu ve cana yakın."], ["He has got short, curly hair.", "Onun kısa, kıvırcık saçları var."]] },
      { h: "İsimle sahiplik, 's", p: "Bir kişinin bir şeyine sahip olduğunu isimle söylemek için 's eklenir, Lina's flat, Lina'nın dairesi. Türkçedeki -nın eki gibi düşün ama sahibin hemen arkasına yapışır.", ex: [["Lina's room is clean.", "Lina'nın odası temiz."], ["Can's dog is funny.", "Can'ın köpeği komik."]] }
    ],
    story: {
      title: "Yeni Ev Arkadaşı", icon: "📱",
      lines: [
        ["Anlatıcı", "Deniz opens the door of the flat. A young woman is in the kitchen.", "Deniz dairenin kapısını açar. Mutfakta genç bir kadın var."],
        ["Lina", "Hola! You are Deniz, right? I am Lina, your flatmate.", "Hola! Sen Deniz'sin, değil mi? Ben Lina, ev arkadaşın."],
        ["Deniz", "Hi Lina! Nice to meet you. Mmm, what is that smell?", "Selam Lina! Memnun oldum. Hmm, bu koku ne?"],
        ["Lina", "Paella. I am not a chef yet, but I have got big dreams.", "Paella. Henüz şef değilim ama büyük hayallerim var."],
        ["Anlatıcı", "Deniz's phone rings. It is a video call from Can.", "Deniz'in telefonu çalar. Can'dan görüntülü arama."],
        ["Can", "Brother! How is London? Is it grey and rainy?", "Kardeşim! Londra nasıl? Gri ve yağmurlu mu?"],
        ["Deniz", "Yes, it is. Look, this is my flatmate, Lina. She is from Spain.", "Evet. Bak, bu ev arkadaşım Lina. İspanyalı."],
        ["Can", "Hello Lina! Deniz is very clever, but his room is always a mess.", "Merhaba Lina! Deniz çok zekidir ama odası hep dağınıktır."],
        ["Lina", "Ha! Thanks for the warning, Can.", "Ha! Uyarı için teşekkürler Can."],
        ["Can", "And he has got a big family. His mum calls every day!", "Bir de kalabalık bir ailesi var. Annesi her gün arar!"],
        ["Deniz", "Okay, okay. Goodbye, Can!", "Tamam, tamam. Hoşça kal Can!"]
      ],
      questions: [
        { after: 3, q: "Lina mutfakta ne yapıyor?", options: ["Uyuyor", "Paella yapıyor", "Telefonla konuşuyor"], answer: 1 },
        { after: 6, q: "Lina nereli?", options: ["İtalya", "Türkiye", "İspanya"], answer: 2 },
        { after: 9, q: "Can'a göre Deniz'in odası nasıl?", options: ["Dağınık", "Çok temiz", "Çok küçük"], answer: 0 }
      ]
    },
    extra: [
      ["man", "adam, erkek", "👨"], ["woman", "kadın", "👩"], ["child", "çocuk", "🧒"], ["children", "çocuklar", "👧"],
      ["boy", "erkek çocuk", "👦"], ["girl", "kız çocuk", "👧"], ["people", "insanlar", "👥"], ["neighbour", "komşu", "🏘️"],
      ["flatmate", "ev arkadaşı", "🏠"], ["best friend", "en yakın arkadaş", "🤞"], ["twins", "ikizler", "👯"], ["grandchild", "torun", ""],
      ["nephew", "erkek yeğen", ""], ["niece", "kız yeğen", ""], ["slim", "ince, zayıf", ""], ["pretty", "güzel, hoş", ""],
      ["ugly", "çirkin", ""], ["clever", "zeki, akıllı", "🧠"], ["lazy", "tembel", "🦥"], ["shy", "utangaç", "🙈"],
      ["serious", "ciddi", "😐"], ["cute", "sevimli, tatlı", "🥰"], ["strong", "güçlü", "💪"], ["sad", "üzgün", "😢"],
      ["glasses", "gözlük", "👓"], ["blonde", "sarışın", "👱"], ["grey", "gri", "🩶"], ["car", "araba", "🚗"],
      ["birthday", "doğum günü", "🎂"], ["relative", "akraba", ""]
    ],
    lessons: [
      {
        title: "Ailem", icon: "👨‍👩‍👧",
        words: [
          ["mother", "anne", "👩"], ["father", "baba", "👨"], ["sister", "kız kardeş", "👧"], ["brother", "erkek kardeş", "👦"],
          ["parents", "anne baba, ebeveynler", "👫"], ["family", "aile", "👨‍👩‍👧"], ["son", "oğul", "👦"], ["daughter", "kız evlat", "👧"],
          ["husband", "koca, eş", "🤵"], ["wife", "karı, eş", "👰"]
        ],
        sentences: [
          ["This is my family.", "Bu benim ailem.", [], ["Bu ailem."]],
          ["My mother is a teacher and my father is a doctor.", "Annem öğretmen, babam doktor.", [], ["Annem öğretmen ve babam doktor.", "Benim annem öğretmen, babam doktor.", "Annem bir öğretmen, babam bir doktor."]],
          ["Her brother and sister are in Izmir.", "Erkek ve kız kardeşi İzmir'de.", [], ["Onun erkek ve kız kardeşi İzmir'de.", "Kardeşleri İzmir'de.", "Onun kardeşleri İzmir'de."]],
          ["His wife is a doctor.", "Karısı doktor.", [], ["Onun karısı doktor.", "Eşi doktor.", "Onun eşi doktor.", "Karısı bir doktor.", "Eşi bir doktor."]],
          ["Are your parents in Turkey?", "Annenle baban Türkiye'de mi?", [], ["Ailen Türkiye'de mi?", "Ebeveynlerin Türkiye'de mi?", "Anne baban Türkiye'de mi?", "Annen baban Türkiye'de mi?", "Anne babanız Türkiye'de mi?"]],
          ["Her husband and son are at home.", "Kocası ve oğlu evde.", [], ["Onun kocası ve oğlu evde.", "Eşi ve oğlu evde.", "Onun eşi ve oğlu evde."]]
        ]
      },
      {
        title: "Nasıl Biri?", icon: "🧑",
        words: [
          ["tall", "uzun boylu", "🦒"], ["short", "kısa", ""], ["young", "genç", "🧑"], ["old", "yaşlı, eski", "👴"],
          ["beautiful", "güzel", "🌸"], ["handsome", "yakışıklı", "😎"], ["funny", "komik, eğlenceli", "😂"], ["kind", "nazik, iyi kalpli", "💛"],
          ["friendly", "cana yakın, samimi", "🤗"], ["quiet", "sessiz, sakin", "🤫"]
        ],
        sentences: [
          ["Lina is tall and friendly.", "Lina uzun boylu ve cana yakın.", [], ["Lina uzun ve cana yakın.", "Lina uzun boylu ve samimi.", "Lina uzun ve samimi.", "Lina uzun boylu ve arkadaş canlısı."]],
          ["My grandfather is old but very funny.", "Dedem yaşlı ama çok komik.", [], ["Benim dedem yaşlı ama çok komik.", "Dedem yaşlı ama çok eğlenceli.", "Büyükbabam yaşlı ama çok komik.", "Büyükbabam yaşlı ama çok eğlenceli."]],
          ["Is your brother handsome?", "Erkek kardeşin yakışıklı mı?", [], ["Ağabeyin yakışıklı mı?", "Kardeşin yakışıklı mı?", "Abin yakışıklı mı?", "Senin erkek kardeşin yakışıklı mı?"]],
          ["She is young and very kind.", "O genç ve çok nazik.", [], ["Genç ve çok nazik.", "O genç ve çok kibar.", "Genç ve çok kibar.", "O genç ve çok iyi kalpli."]],
          ["Can is short and quiet.", "Can kısa boylu ve sessiz.", [], ["Can kısa ve sessiz.", "Can kısa boylu ve sakin.", "Can kısa ve sakin."]],
          ["What a beautiful city!", "Ne güzel bir şehir!", [], ["Ne kadar güzel bir şehir!"]]
        ]
      },
      {
        title: "Benim, Senin, Onun", icon: "🏷️",
        words: [
          ["grandmother", "büyükanne, nine", "👵"], ["grandfather", "büyükbaba, dede", "👴"], ["aunt", "teyze, hala", ""], ["uncle", "amca, dayı", ""],
          ["cousin", "kuzen", ""], ["baby", "bebek", "👶"], ["boyfriend", "erkek arkadaş, sevgili", "💑"], ["girlfriend", "kız arkadaş, sevgili", "💑"],
          ["dog", "köpek", "🐶"], ["cat", "kedi", "🐱"]
        ],
        sentences: [
          ["Her grandmother is ninety.", "Büyükannesi doksan yaşında.", ["Her grandmother is ninety years old."], ["Onun büyükannesi doksan yaşında.", "Ninesi doksan yaşında.", "Anneannesi doksan yaşında.", "Babaannesi doksan yaşında."]],
          ["My uncle is a taxi driver.", "Amcam taksi şoförü.", [], ["Dayım taksi şoförü.", "Benim amcam taksi şoförü.", "Benim dayım taksi şoförü.", "Amcam taksici.", "Dayım taksici."]],
          ["Is this your cat?", "Bu senin kedin mi?", [], ["Bu kedin mi?", "Bu sizin kediniz mi?", "Bu kediniz mi?"]],
          ["His girlfriend is British.", "Kız arkadaşı İngiliz.", [], ["Onun kız arkadaşı İngiliz.", "Sevgilisi İngiliz.", "Onun sevgilisi İngiliz."]],
          ["Our dog is very funny.", "Köpeğimiz çok komik.", [], ["Bizim köpeğimiz çok komik.", "Köpeğimiz çok eğlenceli."]],
          ["My aunt and her baby are here.", "Teyzem ve bebeği burada.", [], ["Halam ve bebeği burada.", "Teyzemle bebeği burada.", "Halamla bebeği burada.", "Benim teyzem ve bebeği burada."]]
        ]
      },
      {
        title: "Neyi Var?", icon: "👀",
        words: [
          ["have got", "sahip olmak, -si var", ""], ["has got", "-si var", ""], ["eyes", "gözler", "👀"], ["hair", "saç", "💇"],
          ["blue", "mavi", "🔵"], ["brown", "kahverengi", "🟤"], ["black", "siyah", "⚫"], ["curly", "kıvırcık", "➰"],
          ["long", "uzun", "📏"], ["beard", "sakal", "🧔"]
        ],
        sentences: [
          ["I have got a brother.", "Bir erkek kardeşim var.", [], ["Erkek kardeşim var.", "Benim bir erkek kardeşim var.", "Bir ağabeyim var.", "Bir kardeşim var."]],
          ["She has got blue eyes.", "Onun mavi gözleri var.", [], ["Mavi gözleri var.", "Gözleri mavi.", "Onun gözleri mavi."]],
          ["Has he got a beard?", "Onun sakalı var mı?", [], ["Sakalı var mı?"]],
          ["We have not got a car.", "Arabamız yok.", [], ["Bizim arabamız yok.", "Bir arabamız yok.", "Bizim bir arabamız yok."]],
          ["Lina has got long black hair.", "Lina'nın uzun siyah saçları var.", [], ["Lina'nın uzun, siyah saçları var.", "Lina'nın saçları uzun ve siyah.", "Lina'nın uzun siyah saçı var."]],
          ["Can has got short, curly, brown hair.", "Can'ın kısa, kıvırcık, kahverengi saçları var.", ["Can has got short curly brown hair."], ["Can'ın kısa kıvırcık kahverengi saçları var.", "Can'ın kısa, kıvırcık, kahverengi saçı var.", "Can'ın saçları kısa, kıvırcık ve kahverengi."]]
        ]
      },
      {
        title: "Görüntülü Arama", icon: "📱",
        words: [
          ["video call", "görüntülü arama", "📹"], ["phone", "telefon", "📱"], ["call", "aramak", "📞"], ["miss", "özlemek", "🥺"],
          ["love", "sevmek, aşk", "❤️"], ["talk", "konuşmak", "🗣️"], ["smile", "gülümsemek", "😄"], ["together", "birlikte", "👫"],
          ["photo", "fotoğraf", "📷"], ["message", "mesaj", "💬"]
        ],
        sentences: [
          ["I miss my family.", "Ailemi özlüyorum.", [], ["Ailemi özledim.", "Ben ailemi özlüyorum.", "Ben ailemi özledim."]],
          ["Call me tonight, please.", "Bu akşam beni ara lütfen.", ["Please call me tonight."], ["Lütfen bu akşam beni ara.", "Bu gece beni ara lütfen.", "Lütfen bu gece beni ara.", "Bu akşam beni arayın lütfen.", "Lütfen bu akşam beni arayın."]],
          ["We love this photo together.", "Birlikte bu fotoğrafı seviyoruz.", [], ["Bu fotoğrafı birlikte seviyoruz.", "Bu fotoğrafı ikimiz de seviyoruz.", "Bu fotoğrafı çok seviyoruz."]],
          ["We talk on the phone every Sunday.", "Her pazar telefonda konuşuruz.", [], ["Her pazar telefonda konuşuyoruz.", "Biz her pazar telefonda konuşuruz.", "Biz her pazar telefonda konuşuyoruz.", "Her pazar telefonla konuşuruz."]],
          ["Your message is very funny.", "Mesajın çok komik.", [], ["Senin mesajın çok komik.", "Mesajınız çok komik.", "Mesajın çok eğlenceli."]],
          ["Smile, we are on a video call!", "Gülümse, görüntülü aramadayız!", [], ["Gülümse, görüntülü konuşmadayız!", "Gülümseyin, görüntülü aramadayız!", "Gülümse, görüntülü görüşmedeyiz!"]]
        ]
      }
    ]
  },

  // ===================== ÜNİTE 3 =====================
  {
    title: "Yiyecek ve İçecek",
    desc: "Yiyecek ve içecekleri adlandırabilecek, neyi sevip sevmediğini söyleyebilecek ve markette alışveriş yapabileceksin.",
    cefr: "A1",
    guide: [
      { h: "a mı, an mı?", p: "Tekil ve sayılabilen isimlerden önce a ya da an gelir. Kural yazıya değil SESE bakar, sesli harf sesiyle başlıyorsa an, değilse a. Bu yüzden an egg, an apple ama a banana. Dikkat, an hour derken h okunmaz, a university derken u 'yu' diye okunur.", ex: [["An egg, please.", "Bir yumurta lütfen."], ["I want an apple and a banana.", "Bir elma ve bir muz istiyorum."]] },
      { h: "Çoğullar", p: "Türkçede sayıdan sonra isim tekil kalır, iki elma. İngilizcede ikiden itibaren çoğul ŞARTTIR, two apples. Çoğu kelimeye -s, -s/-sh/-ch/-o ile bitenlere -es eklenir, potato potatoes, sandwich sandwiches. Ünsüz artı y ile bitenlerde y düşer ve -ies gelir, strawberry strawberries. Bazıları düzensizdir, child children, fish fish.", ex: [["Two potatoes and three onions, please.", "İki patates ve üç soğan lütfen."], ["I love strawberries.", "Çilekleri çok severim."]] },
      { h: "Sayılamayan isimler", p: "Water, milk, bread, rice gibi kelimeler sayılamaz, a bread ya da two waters denmez. Miktar için kap ya da ölçü kullanılır, a glass of water, a cup of tea, a bottle of wine. Türklerin sık hatası 'one bread' demektir, doğrusu some bread ya da a loaf of bread.", ex: [["A cup of tea, please.", "Bir fincan çay lütfen."], ["Can I have a glass of water?", "Bir bardak su alabilir miyim?"]] },
      { h: "I like / I don't like", p: "Genel olarak bir şeyi sevdiğini söylerken isimden önce the KULLANMA, I like chocolate. Türkçedeki 'çikolatayı severim' cümlesindeki -ı eki seni the koymaya kandırmasın. Olumsuz için don't like, he/she için likes ve doesn't like kullanılır.", ex: [["I like chocolate.", "Çikolatayı severim."], ["I don't like spicy food.", "Acı yemekleri sevmem."], ["Lina hates sour lemons.", "Lina ekşi limonlardan nefret eder."]] }
    ],
    story: {
      title: "İlk Market Alışverişi", icon: "🛒",
      lines: [
        ["Anlatıcı", "Saturday morning. Deniz and Lina are at the supermarket.", "Cumartesi sabahı. Deniz ve Lina süpermarkette."],
        ["Lina", "Okay, here is our shopping list. Eggs, tomatoes, rice and olive oil.", "Tamam, işte alışveriş listemiz. Yumurta, domates, pirinç ve zeytinyağı."],
        ["Deniz", "And chocolate. And biscuits. And three frozen pizzas.", "Bir de çikolata. Ve bisküvi. Ve üç donuk pizza."],
        ["Lina", "Deniz! I am a future chef. We don't buy frozen pizza.", "Deniz! Ben geleceğin şefiyim. Donuk pizza almayız."],
        ["Deniz", "But I like pizza. It is fast and cheap.", "Ama ben pizzayı severim. Hızlı ve ucuz."],
        ["Lina", "Do you like Spanish food?", "İspanyol yemeklerini sever misin?"],
        ["Deniz", "I don't know. I like Turkish food. Menemen is my favourite.", "Bilmiyorum. Türk yemeklerini severim. En sevdiğim menemen."],
        ["Lina", "Menemen? Eggs and tomatoes? Okay, we cook it tonight.", "Menemen mi? Yumurta ve domates mi? Tamam, bu akşam onu pişiririz."],
        ["Anlatıcı", "At the checkout, the price is forty-two pounds.", "Kasada tutar kırk iki sterlin."],
        ["Deniz", "Forty-two pounds? In Izmir, this is food for a week!", "Kırk iki sterlin mi? İzmir'de bu bir haftalık yemek!"],
        ["Lina", "Welcome to London. Pay, please. I have got no cash.", "Londra'ya hoş geldin. Öde lütfen. Bende nakit yok."]
      ],
      questions: [
        { after: 2, q: "Deniz listeye ne eklemek istiyor?", options: ["Zeytinyağı", "Çikolata ve pizza", "Balık"], answer: 1 },
        { after: 6, q: "Deniz'in en sevdiği yemek ne?", options: ["Paella", "Pizza", "Menemen"], answer: 2 },
        { after: 10, q: "Alışveriş kaç sterlin tutuyor?", options: ["Kırk iki", "On iki", "Yirmi dört"], answer: 0 }
      ]
    },
    extra: [
      ["food", "yemek, yiyecek", "🍽️"], ["breakfast", "kahvaltı", "🥐"], ["lunch", "öğle yemeği", "🥗"], ["dinner", "akşam yemeği", "🍝"],
      ["sugar", "şeker", "🍬"], ["salt", "tuz", "🧂"], ["pepper", "biber, karabiber", "🌶️"], ["butter", "tereyağı", "🧈"],
      ["honey", "bal", "🍯"], ["olive oil", "zeytinyağı", "🫒"], ["cake", "pasta, kek", "🍰"], ["lemon", "limon", "🍋"],
      ["grapes", "üzüm", "🍇"], ["lettuce", "marul", "🥬"], ["garlic", "sarımsak", "🧄"], ["mushroom", "mantar", "🍄"],
      ["yoghurt", "yoğurt", ""], ["cereal", "mısır gevreği", "🥣"], ["pizza", "pizza", "🍕"], ["burger", "hamburger", "🍔"],
      ["chips", "patates kızartması", "🍟"], ["snack", "atıştırmalık", ""], ["fresh", "taze", ""], ["healthy", "sağlıklı", "🥗"],
      ["thirsty", "susamış", "🥤"], ["card", "kart", "💳"], ["receipt", "fiş", "🧾"], ["bag", "çanta, poşet", "🛍️"],
      ["vegetarian", "vejetaryen", "🥕"], ["bitter", "acı (tat), buruk", ""]
    ],
    lessons: [
      {
        title: "Yiyecekler", icon: "🍎",
        words: [
          ["bread", "ekmek", "🍞"], ["cheese", "peynir", "🧀"], ["egg", "yumurta", "🥚"], ["apple", "elma", "🍎"],
          ["banana", "muz", "🍌"], ["tomato", "domates", "🍅"], ["chicken", "tavuk", "🍗"], ["rice", "pirinç, pilav", "🍚"],
          ["pasta", "makarna", "🍝"], ["soup", "çorba", "🍲"]
        ],
        sentences: [
          ["I want an apple and a banana.", "Bir elma ve bir muz istiyorum.", [], ["Bir elma ve bir muz isterim.", "Ben bir elma ve bir muz istiyorum.", "Bir elmayla bir muz istiyorum."]],
          ["This cheese is from Spain.", "Bu peynir İspanya'dan.", [], ["Bu peynir İspanyol.", "Bu peynir İspanya'dan geliyor."]],
          ["An egg and some bread, please.", "Bir yumurta ve biraz ekmek lütfen.", [], ["Bir yumurta ve biraz ekmek, lütfen.", "Lütfen bir yumurta ve biraz ekmek."]],
          ["The soup is very hot.", "Çorba çok sıcak.", [], []],
          ["Chicken with rice, please.", "Pilavlı tavuk lütfen.", [], ["Tavuk pilav lütfen.", "Pilavla tavuk lütfen.", "Pilavlı tavuk, lütfen.", "Tavuklu pilav lütfen."]],
          ["We have got pasta and tomatoes.", "Makarnamız ve domatesimiz var.", [], ["Makarna ve domatesimiz var.", "Bizde makarna ve domates var.", "Makarna ve domates var."]]
        ]
      },
      {
        title: "İçecekler", icon: "☕",
        words: [
          ["water", "su", "💧"], ["tea", "çay", "🍵"], ["coffee", "kahve", "☕"], ["milk", "süt", "🥛"],
          ["orange juice", "portakal suyu", "🧃"], ["beer", "bira", "🍺"], ["wine", "şarap", "🍷"], ["cup", "fincan", "☕"],
          ["glass", "bardak", "🥛"], ["bottle", "şişe", "🍾"]
        ],
        sentences: [
          ["A cup of tea, please.", "Bir fincan çay lütfen.", [], ["Bir bardak çay lütfen.", "Bir çay lütfen.", "Bir fincan çay, lütfen.", "Bir bardak çay, lütfen."]],
          ["I drink coffee with milk.", "Kahveyi sütlü içerim.", [], ["Sütlü kahve içerim.", "Sütlü kahve içiyorum.", "Kahveyi sütle içerim.", "Ben kahveyi sütlü içerim.", "Kahveyi sütlü içiyorum."]],
          ["Can I have a glass of water?", "Bir bardak su alabilir miyim?", [], ["Bir bardak su rica edebilir miyim?"]],
          ["Two bottles of wine, please.", "İki şişe şarap lütfen.", [], ["İki şişe şarap, lütfen.", "Lütfen iki şişe şarap."]],
          ["Is this orange juice fresh?", "Bu portakal suyu taze mi?", [], []],
          ["Beer or wine?", "Bira mı şarap mı?", [], ["Bira mı, şarap mı?", "Bira mı yoksa şarap mı?"]]
        ]
      },
      {
        title: "Bir, İki, Çok", icon: "🥕",
        words: [
          ["potato", "patates", "🥔"], ["carrot", "havuç", "🥕"], ["onion", "soğan", "🧅"], ["strawberry", "çilek", "🍓"],
          ["sandwich", "sandviç", "🥪"], ["biscuit", "bisküvi", "🍪"], ["fish", "balık", "🐟"], ["meat", "et", "🥩"],
          ["vegetable", "sebze", "🥦"], ["fruit", "meyve", "🍉"]
        ],
        sentences: [
          ["Two potatoes and three onions, please.", "İki patates ve üç soğan lütfen.", [], ["İki patates, üç soğan lütfen.", "İki patates ve üç soğan, lütfen."]],
          ["I love strawberries.", "Çilekleri çok severim.", [], ["Çilek severim.", "Çileğe bayılırım.", "Çilekleri severim.", "Çilek çok severim.", "Çileklere bayılırım.", "Çilekleri seviyorum."]],
          ["These sandwiches are great.", "Bu sandviçler harika.", [], ["Bu sandviçler mükemmel."]],
          ["Fish is healthy, but I like meat.", "Balık sağlıklı ama ben et severim.", [], ["Balık sağlıklıdır ama ben et severim.", "Balık sağlıklı ama eti severim.", "Balık sağlıklı ama et severim."]],
          ["We need vegetables and fruit.", "Sebze ve meyveye ihtiyacımız var.", ["We need fruit and vegetables."], ["Sebzeye ve meyveye ihtiyacımız var.", "Bize sebze ve meyve lazım.", "Sebze ve meyve lazım.", "Sebze ve meyve almamız lazım."]],
          ["The children eat biscuits and carrots.", "Çocuklar bisküvi ve havuç yiyor.", [], ["Çocuklar bisküvi ve havuç yer.", "Çocuklar bisküvi ve havuç yiyorlar.", "Çocuklar bisküviyle havuç yiyor."]]
        ]
      },
      {
        title: "Severim, Sevmem", icon: "😋",
        words: [
          ["like", "sevmek, hoşlanmak", "👍"], ["hate", "nefret etmek", "👎"], ["favourite", "en sevilen, favori", "⭐"], ["delicious", "lezzetli", "😋"],
          ["sweet", "tatlı", "🍬"], ["spicy", "acı, baharatlı", "🌶️"], ["salty", "tuzlu", "🧂"], ["sour", "ekşi", "🍋"],
          ["chocolate", "çikolata", "🍫"], ["ice cream", "dondurma", "🍦"]
        ],
        sentences: [
          ["I like chocolate.", "Çikolatayı severim.", [], ["Çikolata severim.", "Ben çikolata severim.", "Çikolatayı seviyorum.", "Çikolatadan hoşlanırım.", "Ben çikolatayı severim."]],
          ["I don't like spicy food.", "Acı yemekleri sevmem.", [], ["Acı yemek sevmem.", "Acılı yemekleri sevmem.", "Acı yemekleri sevmiyorum.", "Acı yemek sevmiyorum.", "Baharatlı yemekleri sevmem."]],
          ["Do you like ice cream?", "Dondurma sever misin?", [], ["Dondurmayı sever misin?", "Dondurma sever misiniz?", "Dondurmayı sever misiniz?", "Dondurmayı seviyor musun?"]],
          ["Lina hates sour lemons.", "Lina ekşi limonlardan nefret eder.", [], ["Lina ekşi limondan nefret eder.", "Lina ekşi limonlardan nefret ediyor.", "Lina ekşi limondan nefret ediyor."]],
          ["This cake is sweet and delicious, not salty.", "Bu pasta tatlı ve lezzetli, tuzlu değil.", [], ["Bu kek tatlı ve lezzetli, tuzlu değil."]],
          ["What is your favourite food?", "En sevdiğin yemek ne?", [], ["En sevdiğiniz yemek ne?", "En sevdiğin yiyecek ne?", "Favori yemeğin ne?", "Favori yemeğiniz ne?"]]
        ]
      },
      {
        title: "Markette", icon: "🛒",
        words: [
          ["supermarket", "süpermarket", "🛒"], ["basket", "sepet", "🧺"], ["price", "fiyat", "🏷️"], ["cheap", "ucuz", ""],
          ["expensive", "pahalı", "💸"], ["how much", "ne kadar, kaç para", ""], ["buy", "satın almak", "🛍️"], ["pay", "ödemek", "💳"],
          ["cash", "nakit", "💵"], ["shopping list", "alışveriş listesi", "📝"]
        ],
        sentences: [
          ["How much is this cheese?", "Bu peynir ne kadar?", [], ["Bu peynir kaç para?", "Bu peynirin fiyatı ne?", "Bu peynir kaça?"]],
          ["The supermarket is very expensive.", "Süpermarket çok pahalı.", [], ["Market çok pahalı."]],
          ["Bananas are cheap today, but the price of coffee is high.", "Bugün muz ucuz ama kahvenin fiyatı yüksek.", [], ["Muzlar bugün ucuz ama kahvenin fiyatı yüksek.", "Bugün muzlar ucuz ama kahve fiyatı yüksek."]],
          ["Can I pay in cash?", "Nakit ödeyebilir miyim?", [], ["Nakit olarak ödeyebilir miyim?", "Nakit ödeme yapabilir miyim?", "Nakitle ödeyebilir miyim?"]],
          ["We buy bread every day.", "Her gün ekmek alırız.", [], ["Her gün ekmek alıyoruz.", "Biz her gün ekmek alırız.", "Biz her gün ekmek alıyoruz."]],
          ["Where is the shopping list? And the basket?", "Alışveriş listesi nerede? Ya sepet?", [], ["Alışveriş listesi nerede? Sepet nerede?", "Alışveriş listesi nerede? Peki sepet?"]]
        ]
      }
    ]
  },

  // ===================== ÜNİTE 4 =====================
  {
    title: "Evim",
    desc: "Evini ve odanı anlatabilecek, bir şeyin nerede olduğunu söyleyebileceksin.",
    cefr: "A1",
    guide: [
      { h: "there is / there are ile 'var'", p: "Bir yerde bir şeyin VAR olduğunu söylemek için tekilde there is, çoğulda there are kullanılır. Türkçede yer başta gelir, 'Odada bir masa var'. İngilizcede genelde there is başa, yer sona gelir, There is a table in the room. 'In the room there is' de mümkün ama daha az doğaldır.", ex: [["There is a plant in the kitchen.", "Mutfakta bir bitki var."], ["There are two windows in my room.", "Odamda iki pencere var."]] },
      { h: "Soru ve olumsuz, 'var mı / yok'", p: "Soru için is ya da are öne geçer, Is there a fridge? Olumsuz için there is not, there are not ya da there is no kullanılır. Türklerin sık hatası 'There is not fridge' demektir, doğrusu There is no fridge ya da There isn't a fridge.", ex: [["Is there a garden?", "Bahçe var mı?"], ["There is no oven in the flat.", "Dairede fırın yok."], ["There are no pictures on the wall.", "Duvarda hiç resim yok."]] },
      { h: "Yer edatları ismin ÖNÜNDE", p: "Türkçede yer bildiren kelimeler ismin arkasına gelir, yatağın altında. İngilizcede tersi, edat önde, under the bed. in içinde, on üstünde ve temas halinde, under altında, next to yanında, behind arkasında, in front of önünde, between arasında demektir.", ex: [["The cat is under the bed.", "Kedi yatağın altında."], ["My laptop is on the desk.", "Dizüstü bilgisayarım masanın üstünde."], ["The box is behind the door.", "Kutu kapının arkasında."]] }
    ],
    story: {
      title: "Kayıp Anahtar", icon: "🔑",
      lines: [
        ["Anlatıcı", "Deniz's room is a disaster. There are boxes everywhere.", "Deniz'in odası tam bir felaket. Her yerde kutular var."],
        ["Lina", "Wow. Is there a bed in here?", "Vay. Burada yatak var mı?"],
        ["Deniz", "Yes, there is. It is under the clothes.", "Evet, var. Kıyafetlerin altında."],
        ["Anlatıcı", "Deniz puts his books on the shelf and the lamp on the desk.", "Deniz kitaplarını rafa, lambayı da masanın üstüne koyar."],
        ["Deniz", "Okay, I am ready. Let's go to the shop. Where are my keys?", "Tamam, hazırım. Hadi dükkâna gidelim. Anahtarlarım nerede?"],
        ["Lina", "Are they in your pocket?", "Cebinde mi?"],
        ["Deniz", "No. They are not in the drawer and not under the bed.", "Hayır. Çekmecede değiller, yatağın altında da değiller."],
        ["Lina", "Are they next to the fridge? Behind the sofa?", "Buzdolabının yanında mı? Kanepenin arkasında mı?"],
        ["Anlatıcı", "Thirty minutes later, there are no keys, but there is a very tired Deniz.", "Otuz dakika sonra anahtar yok ama çok yorgun bir Deniz var."],
        ["Lina", "Deniz, what is that in the door?", "Deniz, kapıdaki şu şey ne?"],
        ["Deniz", "My keys! In the door! All day!", "Anahtarlarım! Kapıda takılı! Bütün gün!"]
      ],
      questions: [
        { after: 2, q: "Deniz'in yatağı nerede?", options: ["Mutfakta", "Kıyafetlerin altında", "Balkonda"], answer: 1 },
        { after: 5, q: "Lina anahtarları ilk önce nerede sorar?", options: ["Deniz'in cebinde", "Banyoda", "Bahçede"], answer: 0 },
        { after: 10, q: "Anahtarlar sonunda nerede?", options: ["Buzdolabında", "Yatağın altında", "Kapıda"], answer: 2 }
      ]
    },
    extra: [
      ["home", "ev, yuva", "🏡"], ["rent", "kira", "💷"], ["landlord", "ev sahibi", ""], ["toilet", "tuvalet", "🚽"],
      ["shower", "duş", "🚿"], ["bath", "küvet, banyo", "🛁"], ["sink", "lavabo", ""], ["towel", "havlu", ""],
      ["pillow", "yastık", ""], ["blanket", "battaniye", ""], ["curtain", "perde", ""], ["cupboard", "dolap", ""],
      ["washing machine", "çamaşır makinesi", ""], ["dishwasher", "bulaşık makinesi", ""], ["armchair", "koltuk", "🪑"], ["bookcase", "kitaplık", "📚"],
      ["laptop", "dizüstü bilgisayar", "💻"], ["television", "televizyon", "📺"], ["heater", "ısıtıcı, kalorifer", ""], ["roof", "çatı", ""],
      ["garage", "garaj", ""], ["lift", "asansör", "🛗"], ["upstairs", "üst kat, yukarıda", "⬆️"], ["downstairs", "alt kat, aşağıda", "⬇️"],
      ["comfortable", "rahat", ""], ["cosy", "sıcacık, rahat", ""], ["dirty", "kirli", ""], ["broken", "bozuk, kırık", ""],
      ["furniture", "mobilya", ""], ["neighbourhood", "mahalle, semt", "🏘️"]
    ],
    lessons: [
      {
        title: "Evin Bölümleri", icon: "🏠",
        words: [
          ["house", "ev", "🏠"], ["flat", "daire", "🏢"], ["room", "oda", "🚪"], ["kitchen", "mutfak", "🍳"],
          ["bathroom", "banyo", "🛁"], ["bedroom", "yatak odası", "🛏️"], ["living room", "oturma odası, salon", "🛋️"], ["garden", "bahçe", "🌳"],
          ["balcony", "balkon", ""], ["stairs", "merdiven", ""]
        ],
        sentences: [
          ["Our flat is small but nice.", "Dairemiz küçük ama güzel.", [], ["Bizim dairemiz küçük ama güzel.", "Evimiz küçük ama güzel.", "Dairemiz küçük ama hoş."]],
          ["The kitchen is next to the living room.", "Mutfak oturma odasının yanında.", [], ["Mutfak salonun yanında."]],
          ["Where is the bathroom?", "Banyo nerede?", [], []],
          ["My bedroom has got a balcony.", "Yatak odamın balkonu var.", [], ["Yatak odamda balkon var.", "Yatak odamın bir balkonu var.", "Benim yatak odamın balkonu var."]],
          ["Is there a garden behind the house?", "Evin arkasında bahçe var mı?", [], ["Evin arkasında bir bahçe var mı?"]],
          ["The stairs in this room are very old.", "Bu odadaki merdivenler çok eski.", [], ["Bu odadaki merdiven çok eski."]]
        ]
      },
      {
        title: "Mobilyalar", icon: "🛋️",
        words: [
          ["bed", "yatak", "🛏️"], ["table", "masa", ""], ["chair", "sandalye", "🪑"], ["sofa", "kanepe", "🛋️"],
          ["wardrobe", "gardırop, elbise dolabı", ""], ["desk", "çalışma masası", ""], ["shelf", "raf", ""], ["lamp", "lamba", "💡"],
          ["mirror", "ayna", "🪞"], ["carpet", "halı", ""]
        ],
        sentences: [
          ["I need a new desk.", "Yeni bir çalışma masasına ihtiyacım var.", [], ["Yeni bir masaya ihtiyacım var.", "Bana yeni bir masa lazım.", "Yeni bir masa lazım.", "Bana yeni bir çalışma masası lazım."]],
          ["The sofa and the bed are very comfortable.", "Kanepe ve yatak çok rahat.", [], ["Koltuk ve yatak çok rahat.", "Kanepeyle yatak çok rahat."]],
          ["This lamp is ugly, and that carpet is old.", "Bu lamba çirkin, şu halı da eski.", [], ["Bu lamba çirkin ve şu halı eski.", "Bu lamba çirkin, o halı da eski."]],
          ["The wardrobe is too big.", "Gardırop çok büyük.", [], ["Dolap çok büyük.", "Elbise dolabı çok büyük.", "Gardırop fazla büyük.", "Dolap fazla büyük."]],
          ["Four chairs and a table, please.", "Dört sandalye ve bir masa lütfen.", [], ["Dört sandalye, bir masa lütfen.", "Dört sandalye ve bir masa, lütfen."]],
          ["Lina has got a big mirror and a shelf.", "Lina'nın büyük bir aynası ve bir rafı var.", [], ["Lina'nın büyük aynası ve rafı var."]]
        ]
      },
      {
        title: "Var mı, Yok mu?", icon: "🪟",
        words: [
          ["there is", "var (tekil)", ""], ["there are", "var (çoğul)", ""], ["window", "pencere", "🪟"], ["door", "kapı", "🚪"],
          ["wall", "duvar", "🧱"], ["floor", "yer, zemin, kat", ""], ["plant", "bitki", "🪴"], ["picture", "resim, tablo", "🖼️"],
          ["fridge", "buzdolabı", "🧊"], ["oven", "fırın", ""]
        ],
        sentences: [
          ["There is a plant in the kitchen.", "Mutfakta bir bitki var.", [], ["Mutfakta bitki var."]],
          ["There are two windows and a door in my room.", "Odamda iki pencere ve bir kapı var.", [], ["Benim odamda iki pencere ve bir kapı var.", "Odamın iki penceresi ve bir kapısı var."]],
          ["Is there a fridge?", "Buzdolabı var mı?", [], ["Bir buzdolabı var mı?"]],
          ["There are no pictures on the wall.", "Duvarda hiç resim yok.", [], ["Duvarda resim yok.", "Duvarda hiç tablo yok.", "Duvarda tablo yok."]],
          ["There is no oven in the flat.", "Dairede fırın yok.", [], ["Evde fırın yok.", "Dairede hiç fırın yok."]],
          ["The floor is cold.", "Yer soğuk.", [], ["Zemin soğuk."]]
        ]
      },
      {
        title: "Nerede?", icon: "📦",
        words: [
          ["under", "altında", "⬇️"], ["next to", "yanında", ""], ["behind", "arkasında", ""], ["in front of", "önünde", ""],
          ["between", "arasında", "↔️"], ["near", "yakınında", ""], ["opposite", "karşısında", ""], ["above", "üstünde, yukarısında", "⬆️"],
          ["box", "kutu", "📦"], ["corner", "köşe", "📐"]
        ],
        sentences: [
          ["The cat is under the bed.", "Kedi yatağın altında.", [], []],
          ["There is a box in the corner.", "Köşede bir kutu var.", [], ["Köşede kutu var."]],
          ["The lamp is between the bed and the sofa.", "Lamba yatakla kanepenin arasında.", [], ["Lamba yatak ile kanepenin arasında.", "Lamba yatakla koltuğun arasında."]],
          ["There is a shop near my flat.", "Dairemin yakınında bir dükkân var.", [], ["Evimin yakınında bir dükkân var.", "Dairemin yakınında bir dükkan var.", "Evimin yakınında bir dükkan var.", "Evimin yakınında bir mağaza var."]],
          ["Lina is in front of the house.", "Lina evin önünde.", [], []],
          ["The mirror is above the sink, opposite the door.", "Ayna lavabonun üstünde, kapının karşısında.", [], ["Ayna lavabonun üzerinde, kapının karşısında."]]
        ]
      },
      {
        title: "Kayıp Anahtar", icon: "🔑",
        words: [
          ["key", "anahtar", "🔑"], ["lose", "kaybetmek", ""], ["find", "bulmak", "🔍"], ["look for", "aramak", "👀"],
          ["pocket", "cep", "👖"], ["messy", "dağınık", "🌪️"], ["clean", "temizlemek, temiz", "🧹"], ["tidy up", "toplamak, toparlamak", "🧺"],
          ["drawer", "çekmece", ""], ["everywhere", "her yer, her yerde", "🌍"]
        ],
        sentences: [
          ["I can't find my keys.", "Anahtarlarımı bulamıyorum.", [], []],
          ["Are they in your pocket?", "Cebinde mi?", [], ["Senin cebinde mi?", "Cebinizde mi?", "Onlar cebinde mi?"]],
          ["Your room is very messy.", "Odan çok dağınık.", [], ["Senin odan çok dağınık.", "Odanız çok dağınık."]],
          ["I always lose my phone, so I look for it everywhere.", "Telefonumu hep kaybederim, o yüzden her yerde ararım.", [], ["Telefonumu hep kaybediyorum, o yüzden her yerde arıyorum.", "Hep telefonumu kaybederim, bu yüzden her yerde ararım."]],
          ["We clean the flat on Saturday.", "Cumartesi daireyi temizleriz.", [], ["Cumartesi evi temizleriz.", "Cumartesi günleri daireyi temizleriz.", "Cumartesi günleri evi temizleriz.", "Daireyi cumartesi temizleriz.", "Evi cumartesi temizleriz."]],
          ["Please tidy up your room and look in the drawer.", "Lütfen odanı topla ve çekmeceye bak.", [], ["Lütfen odanı toparla ve çekmeceye bak.", "Odanı topla ve çekmeceye bak lütfen.", "Lütfen odanızı toplayın ve çekmeceye bakın."]]
        ]
      }
    ]
  },

  // ===================== ÜNİTE 5 =====================
  {
    title: "Sayılar, Saat ve Günler",
    desc: "Yüze kadar sayabilecek, saati söyleyebilecek, günleri, ayları ve tarihleri kullanabileceksin.",
    cefr: "A1",
    guide: [
      { h: "Sayılar, 13 mü 30 mu?", p: "On üçten on dokuza kadar sayılar -teen ile biter ve vurgu sondadır, thirTEEN. Onlar basamağı -ty ile biter ve vurgu baştadır, THIRty. Bu farkı duymak çok önemli, yoksa fiyatı yanlış anlarsın. Yirmi bir gibi bileşik sayılar tireyle yazılır, twenty-one, forty-two.", ex: [["She is thirteen years old.", "O on üç yaşında."], ["There are thirty people in the office.", "Ofiste otuz kişi var."]] },
      { h: "Saat söyleme", p: "Tam saatlerde o'clock kullanılır, nine o'clock. Geçe için past, kala için to kullanılır, quarter past ten onu çeyrek geçe, quarter to eight sekize çeyrek var. Yarım saat half past ile söylenir. Dikkat, half past seven yedi buçuk demektir, Türkçedeki gibi sekizden geri sayılmaz.", ex: [["What time is it?", "Saat kaç?"], ["It is half past seven.", "Saat yedi buçuk."], ["It is quarter to eight.", "Saat sekize çeyrek var."]] },
      { h: "Günler ve aylar BÜYÜK harfle", p: "Türkçede günler ve aylar küçük harfle yazılır, pazartesi, nisan. İngilizcede her zaman büyük harfle başlar, Monday, April. Bu Türklerin yazıda en sık yaptığı hatalardan biridir.", ex: [["Today is Monday.", "Bugün pazartesi."], ["My birthday is in April.", "Doğum günüm nisanda."]] },
      { h: "at, on, in ile zaman", p: "Saatlerle at, günler ve tarihlerle on, aylar ve yıllarla in kullanılır. Türkçede hepsine sadece -de eki yetiyor ama İngilizcede doğru edatı seçmen gerekir.", ex: [["The meeting is at nine o'clock.", "Toplantı saat dokuzda."], ["See you on Wednesday!", "Çarşamba görüşürüz!"], ["I start my new job in June.", "Yeni işime haziranda başlıyorum."]] }
    ],
    story: {
      title: "İlk İş Günü", icon: "⏰",
      lines: [
        ["Anlatıcı", "Monday morning. It is Deniz's first day at work.", "Pazartesi sabahı. Deniz'in işteki ilk günü."],
        ["Deniz", "Lina! What time is it? My phone is dead.", "Lina! Saat kaç? Telefonumun şarjı bitti."],
        ["Lina", "It is quarter past eight. What time is your meeting?", "Saat sekizi çeyrek geçiyor. Toplantın saat kaçta?"],
        ["Deniz", "At nine o'clock! With my new boss, Mr Walker.", "Saat dokuzda! Yeni patronum Bay Walker ile."],
        ["Lina", "The office is forty minutes by train. Hurry up!", "Ofis trenle kırk dakika. Acele et!"],
        ["Anlatıcı", "Deniz runs to the station. The train is late. Of course.", "Deniz istasyona koşar. Tren gecikiyor. Tabii ki."],
        ["Deniz", "Excuse me, what time is the next train?", "Affedersiniz, bir sonraki tren saat kaçta?"],
        ["Yolcu", "Eight forty-five. Welcome to British trains, love.", "Sekiz kırk beşte. İngiliz trenlerine hoş geldin canım."],
        ["Anlatıcı", "At two minutes to nine, Deniz is in front of the office. He is wet but happy.", "Dokuza iki kala Deniz ofisin önünde. Islak ama mutlu."],
        ["Mr. Walker", "Good morning. You are Deniz? You are early. Good.", "Günaydın. Deniz sen misin? Erkencisin. Güzel."],
        ["Deniz", "Early? Yes, of course. I am always early!", "Erken mi? Evet, tabii. Ben hep erkenciyim!"],
        ["Anlatıcı", "That evening, Lina reads his message and laughs for ten minutes.", "O akşam Lina mesajını okur ve on dakika güler."]
      ],
      questions: [
        { after: 3, q: "Toplantı saat kaçta?", options: ["Sekizde", "Dokuzda", "Onda"], answer: 1 },
        { after: 7, q: "Bir sonraki tren saat kaçta?", options: ["Sekiz kırk beşte", "Dokuzda", "Sekizi çeyrek geçe"], answer: 0 },
        { after: 10, q: "Deniz ofise ne zaman varıyor?", options: ["Saat onda", "Dokuzu çeyrek geçe", "Dokuza iki kala"], answer: 2 }
      ]
    },
    extra: [
      ["one", "bir", "1️⃣"], ["two", "iki", "2️⃣"], ["four", "dört", "4️⃣"], ["five", "beş", "5️⃣"],
      ["six", "altı", "6️⃣"], ["eight", "sekiz", "8️⃣"], ["nine", "dokuz", "9️⃣"], ["fourteen", "on dört", ""],
      ["sixteen", "on altı", ""], ["seventeen", "on yedi", ""], ["eighteen", "on sekiz", ""], ["nineteen", "on dokuz", ""],
      ["March", "mart", ""], ["May", "mayıs", ""], ["July", "temmuz", "☀️"], ["September", "eylül", "🍂"],
      ["November", "kasım", ""], ["first", "birinci, ilk", "🥇"], ["second", "ikinci, saniye", "🥈"], ["third", "üçüncü", "🥉"],
      ["morning", "sabah", "🌅"], ["afternoon", "öğleden sonra", ""], ["evening", "akşam", "🌆"], ["early", "erken", "🐓"],
      ["alarm clock", "çalar saat", "⏰"], ["bus", "otobüs", "🚌"], ["train", "tren", "🚆"], ["meeting", "toplantı", "👥"],
      ["party", "parti", "🎉"], ["calendar", "takvim", "📅"]
    ],
    lessons: [
      {
        title: "Sayılar 0-20", icon: "🔢",
        words: [
          ["zero", "sıfır", "0️⃣"], ["three", "üç", "3️⃣"], ["seven", "yedi", "7️⃣"], ["ten", "on", "🔟"],
          ["eleven", "on bir", ""], ["twelve", "on iki", ""], ["thirteen", "on üç", ""], ["fifteen", "on beş", ""],
          ["twenty", "yirmi", ""], ["number", "sayı, numara", "🔢"]
        ],
        sentences: [
          ["I have got ten pounds.", "On sterlinim var.", [], ["Benim on sterlinim var.", "On poundum var.", "Benim on poundum var."]],
          ["There are twelve eggs in the box.", "Kutuda on iki yumurta var.", [], []],
          ["My flat number is seven.", "Daire numaram yedi.", [], ["Benim daire numaram yedi.", "Dairemin numarası yedi."]],
          ["She is thirteen years old.", "O on üç yaşında.", ["She is thirteen."], ["On üç yaşında."]],
          ["Three plus eleven is fourteen.", "Üç artı on bir on dört eder.", [], ["Üç artı on bir on dört.", "Üç artı on bir, on dört eder.", "Üç artı on bir eşittir on dört."]],
          ["Twenty minutes, not fifteen or zero!", "On beş ya da sıfır değil, yirmi dakika!", [], ["Yirmi dakika, on beş ya da sıfır değil!"]]
        ]
      },
      {
        title: "Sayılar 20-100", icon: "💯",
        words: [
          ["thirty", "otuz", ""], ["forty", "kırk", ""], ["fifty", "elli", ""], ["sixty", "altmış", ""],
          ["seventy", "yetmiş", ""], ["eighty", "seksen", ""], ["ninety", "doksan", ""], ["one hundred", "yüz", "💯"],
          ["twenty-five", "yirmi beş", ""], ["how old", "kaç yaşında", "🎂"]
        ],
        sentences: [
          ["How old are you?", "Kaç yaşındasın?", [], ["Kaç yaşındasınız?", "Sen kaç yaşındasın?", "Siz kaç yaşındasınız?"]],
          ["I am twenty-five years old.", "Yirmi beş yaşındayım.", ["I am twenty-five."], ["Ben yirmi beş yaşındayım."]],
          ["My grandfather is eighty, not seventy.", "Dedem yetmiş değil, seksen yaşında.", [], ["Büyükbabam yetmiş değil, seksen yaşında.", "Dedem seksen yaşında, yetmiş değil.", "Benim dedem yetmiş değil, seksen yaşında."]],
          ["There are thirty people in the office.", "Ofiste otuz kişi var.", [], []],
          ["Is it forty, fifty or sixty pounds?", "Kırk mı, elli mi, altmış sterlin mi?", [], ["Kırk mı elli mi altmış sterlin mi?", "Kırk, elli ya da altmış sterlin mi?"]],
          ["One hundred emails in a day!", "Bir günde yüz e-posta!", [], ["Bir günde yüz mail!", "Günde yüz e-posta!", "Günde yüz mail!"]]
        ]
      },
      {
        title: "Saat Kaç?", icon: "🕰️",
        words: [
          ["time", "zaman, saat", "⏳"], ["o'clock", "saat (tam)", "🕘"], ["half past", "buçuk", "🕢"], ["quarter past", "çeyrek geçe", "🕒"],
          ["quarter to", "çeyrek kala", "🕗"], ["clock", "saat (duvar)", "🕰️"], ["watch", "kol saati", "⌚"], ["minute", "dakika", ""],
          ["hour", "saat (süre)", "⏱️"], ["what time", "saat kaç, saat kaçta", ""]
        ],
        sentences: [
          ["What time is it?", "Saat kaç?", [], []],
          ["It is nine o'clock.", "Saat dokuz.", [], ["Saat tam dokuz."]],
          ["It is half past seven.", "Saat yedi buçuk.", [], ["Yedi buçuk."]],
          ["The meeting is at quarter past ten.", "Toplantı onu çeyrek geçe.", [], ["Toplantı saat onu çeyrek geçe."]],
          ["The clock says quarter to eight.", "Saat sekize çeyrek var diyor.", [], ["Duvar saati sekize çeyrek var diyor.", "Saat, sekize çeyrek var gösteriyor.", "Saat sekize çeyrek kalayı gösteriyor."]],
          ["My watch is ten minutes slow.", "Saatim on dakika geri.", [], ["Kol saatim on dakika geri.", "Saatim on dakika geride.", "Kol saatim on dakika geride."]]
        ]
      },
      {
        title: "Haftanın Günleri", icon: "🗓️",
        words: [
          ["Monday", "pazartesi", ""], ["Tuesday", "salı", ""], ["Wednesday", "çarşamba", ""], ["Thursday", "perşembe", ""],
          ["Friday", "cuma", "🎉"], ["Saturday", "cumartesi", ""], ["Sunday", "pazar", "☀️"], ["week", "hafta", "🗓️"],
          ["weekend", "hafta sonu", "🛋️"], ["tomorrow", "yarın", ""]
        ],
        sentences: [
          ["Today is Monday.", "Bugün pazartesi.", [], ["Bugün günlerden pazartesi."]],
          ["I work from Monday to Friday.", "Pazartesiden cumaya çalışırım.", [], ["Pazartesiden cumaya kadar çalışırım.", "Pazartesiden cumaya çalışıyorum.", "Pazartesiden cumaya kadar çalışıyorum.", "Ben pazartesiden cumaya çalışırım."]],
          ["See you on Wednesday!", "Çarşamba görüşürüz!", [], ["Çarşamba günü görüşürüz!"]],
          ["The weekend is Saturday and Sunday.", "Hafta sonu cumartesi ve pazar.", [], ["Hafta sonu cumartesi ve pazardır.", "Hafta sonu cumartesi ile pazar."]],
          ["Is the party on Thursday or Tuesday?", "Parti perşembe mi, salı mı?", [], ["Parti perşembe mi salı mı?", "Parti perşembe günü mü, salı günü mü?"]],
          ["Tomorrow is a big day, and next week too.", "Yarın büyük bir gün, gelecek hafta da.", [], ["Yarın önemli bir gün, gelecek hafta da.", "Yarın büyük bir gün, önümüzdeki hafta da."]]
        ]
      },
      {
        title: "Aylar ve Tarihler", icon: "📅",
        words: [
          ["January", "ocak", "❄️"], ["February", "şubat", ""], ["April", "nisan", "🌷"], ["June", "haziran", ""],
          ["August", "ağustos", "🏖️"], ["October", "ekim", ""], ["December", "aralık", "🎄"], ["month", "ay", "📆"],
          ["date", "tarih", ""], ["late", "geç", "🐢"]
        ],
        sentences: [
          ["My birthday is in April.", "Doğum günüm nisanda.", [], ["Benim doğum günüm nisanda.", "Doğum günüm nisan ayında."]],
          ["Today is the third of February.", "Bugün üç şubat.", ["Today is February the third."], ["Bugün şubatın üçü.", "Bugün 3 Şubat."]],
          ["What is the date today?", "Bugün ayın kaçı?", ["What's the date today?"], ["Bugünün tarihi ne?", "Bugün tarih ne?", "Bugün tarih kaç?"]],
          ["Don't be late on Monday!", "Pazartesi geç kalma!", [], ["Pazartesi günü geç kalma!", "Pazartesi geç kalmayın!"]],
          ["December and January are cold months in London.", "Aralık ve ocak Londra'da soğuk aylardır.", [], ["Aralık ve ocak, Londra'da soğuk aylar.", "Londra'da aralık ve ocak soğuk aylardır.", "Aralık ve ocak Londra'da soğuk aylar."]],
          ["I start my new job in June, not August or October.", "Yeni işime ağustos ya da ekimde değil, haziranda başlıyorum.", [], ["Yeni işime haziranda başlıyorum, ağustos ya da ekimde değil."]]
        ]
      }
    ]
  }
];
