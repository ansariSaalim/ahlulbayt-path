/* =========================================================
   SOURCES — the references behind each part of the app.
   Rule: cite only what the content actually rests on. Give the
   book (and chapter, sermon or hadith number where it is
   certain). Never invent a number; if unsure, name the book only.
   Sunni hadith numbers follow the common (Fath al-Bari /
   Abd al-Baqi) numbering used on sunnah.com.
   Fiqh follows Sayyid al-Sistani, "Islamic Laws" (the English
   Tawdih al-Masa'il) unless your marja' differs.
   ========================================================= */

const SISTANI = "Sayyid al-Sistani, Islamic Laws";

/* ---------- Course lessons (keyed by lesson id) ---------- */
const LESSON_SRC = {
  "understanding": "Qur'an 37:83, 98:7; al-Suyuti, al-Durr al-Manthur (on 98:7); Sahih Muslim 2424 (the Cloak, 33:33); al-Shaykh al-Saduq, I'tiqadat al-Imamiyya (the five roots).",
  "origins": "Ghadir: Sunan al-Tirmidhi 3713; Sunan Ibn Majah 121; Musnad Ahmad; al-Amini, al-Ghadir (the narrators). The pen and paper: Sahih al-Bukhari 114, 4431; Sahih Muslim 1637. Saqifa as a \"falta\": Sahih al-Bukhari 6830. Fatima's anger and Ali's late pledge: Sahih al-Bukhari 4240–4241. The army of Usama: Ibn Sa'd, al-Tabaqat al-Kubra; al-Mufid, al-Irshad. Qur'an 2:124.",
  "l-ali": "Abu Turab: Sahih al-Bukhari 441. Laylat al-Mabit: Qur'an 2:207. The battles: Ibn Hisham, al-Sira al-Nabawiyya; al-Mufid, al-Irshad. Nahj al-Balagha (al-Sharif al-Radi): Sermons 1 and 3, Letters 31 and 53, and the sermon on Aqil and the hot iron.",
  "l-hasan": "Masters of the youth of Paradise: Sunan al-Tirmidhi 3768. \"O Allah, I love him\": Sahih al-Bukhari 3749; Sahih Muslim 2422. The treaty: al-Mufid, al-Irshad; Abu al-Faraj al-Isfahani, Maqatil al-Talibiyyin; Ibn Abi al-Hadid, Sharh Nahj al-Balagha.",
  "l-husayn": "\"Husayn is from me\": Sunan al-Tirmidhi 3775. The soil of Karbala: Musnad Ahmad; al-Hakim, al-Mustadrak. The refusal and the road to Karbala: al-Tabari, Tarikh al-Rusul wa al-Muluk (from Abu Mikhnaf); al-Mufid, al-Irshad; Ibn Tawus, al-Luhuf.",
  "l-ashura": "al-Tabari, Tarikh al-Rusul wa al-Muluk (from Abu Mikhnaf); al-Mufid, al-Irshad; Ibn Tawus, al-Luhuf; al-Khwarazmi, Maqtal al-Husayn; the names of the martyrs in Ziyarat al-Nahiya (Ibn al-Mashhadi, al-Mazar).",
  "l-sajjad": "al-Mufid, al-Irshad; al-Tabrisi, al-Ihtijaj and Ibn Tawus, al-Luhuf (the sermons in Kufa and Damascus); al-Sahifa al-Sajjadiyya; Risalat al-Huquq in Ibn Shu'ba, Tuhaf al-'Uqul and al-Saduq, Man la Yahduruhu al-Faqih.",
  "l-baqir": "Jabir's salaam: al-Kulayni, al-Kafi (Kitab al-Hujja); al-Mufid, al-Irshad. Zayd ibn Ali: al-Isfahani, Maqatil al-Talibiyyin. \"Our Shia is only the one who fears Allah\": al-Kafi, vol. 2 (Kitab al-Iman wa al-Kufr).",
  "l-sadiq": "Four thousand narrators: al-Mufid, al-Irshad. Wiping the feet: Qur'an 5:6. Combining prayers: Sahih Muslim 705. Taqiyya: Qur'an 16:106 and its occasion of revelation ('Ammar ibn Yasir) in al-Tabari, Tafsir. Rulings: " + SISTANI + ".",
  "l-kazim": "Qur'an 3:134. Imprisonment and martyrdom: al-Mufid, al-Irshad; al-Saduq, 'Uyun Akhbar al-Rida. The borders of Fadak: Ibn Shahrashub, Manaqib Al Abi Talib.",
  "l-rida": "Silsilat al-Dhahab and the debates at Merv: al-Saduq, 'Uyun Akhbar al-Rida and al-Tawhid; al-Tabrisi, al-Ihtijaj. The journey and the heirship: al-Mufid, al-Irshad.",
  "l-jawad": "Qur'an 19:12, 19:29–30. The debate with Yahya ibn Aktham: al-Mufid, al-Irshad; al-Tabrisi, al-Ihtijaj. His death: al-Mas'udi, Ithbat al-Wasiyya.",
  "l-hadi": "The wine table: al-Mas'udi, Muruj al-Dhahab. The demolition of Husayn's grave in 236 AH: al-Tabari, Tarikh. Ziyarat al-Jami'a al-Kabira: al-Saduq, Man la Yahduruhu al-Faqih; al-Tusi, Tahdhib al-Ahkam. Life: al-Mufid, al-Irshad.",
  "l-askari": "al-Mufid, al-Irshad; al-Kafi (Kitab al-Hujja). \"Worship is not much fasting and prayer\": Ibn Shu'ba, Tuhaf al-'Uqul. The signs of a believer (51 rak'at): al-Tusi, Tahdhib al-Ahkam, vol. 6.",
  "l-mahdi": "al-Saduq, Kamal al-Din (his birth, the funeral prayer, the sun behind clouds, the last letter to al-Samari); al-Tusi, Kitab al-Ghayba (the four deputies); al-Kafi (Kitab al-Hujja). Du'a al-'Ahd: Ibn al-Mashhadi, al-Mazar al-Kabir.",
  "l-fatima": "\"Fatima is a part of me\": Sahih al-Bukhari 3714, 3767. She did not speak to Abu Bakr until she died: Sahih al-Bukhari 3092–3093, 4240–4241. The Sermon of Fadak: al-Tabrisi, al-Ihtijaj; Ibn Abi Tayfur, Balaghat al-Nisa'. The Tasbih: Sahih al-Bukhari 3113; al-Kafi, vol. 3 (Kitab al-Salat).",
  "l-women": "Fatima bint Asad: al-Kafi (Kitab al-Hujja). Zaynab's words to Ibn Ziyad: Ibn Tawus, al-Luhuf. Umm al-Banin and her sons: al-Isfahani, Maqatil al-Talibiyyin. Lady Hakima and the birth of the Mahdi: al-Saduq, Kamal al-Din.",
  "tawhid-adl": "Qur'an 42:11, 6:103, 4:40, 12:97. \"The beginning of religion is knowing Him\": Nahj al-Balagha, Sermon 1. \"No compulsion and no delegation\": al-Kafi, vol. 1 (Kitab al-Tawhid, chapter on Jabr and Qadar); al-Saduq, al-Tawhid.",
  "nubuwwa-maad": "Qur'an 33:40, 15:9, 2:124. The earth is never without a hujja: al-Kafi, vol. 1 (Kitab al-Hujja). 124,000 prophets: al-Saduq, al-Khisal. Beliefs: al-Saduq, I'tiqadat al-Imamiyya; al-Mufid, Awa'il al-Maqalat.",
  "taqlid": "Imam al-Mahdi's letter (\"refer to the narrators of our hadith\"): al-Saduq, Kamal al-Din; al-Tusi, Kitab al-Ghayba; al-Tabrisi, al-Ihtijaj. Rulings on taqlid and the five terms: " + SISTANI + ", chapter on Taqlid.",
  "wudu": "Qur'an 5:6. " + SISTANI + ": Najasat, Wudu, What breaks wudu. Hadith basis: al-Hurr al-'Amili, Wasa'il al-Shi'a (Kitab al-Tahara).",
  "ghusl-tayammum": "Qur'an 5:6, 4:43. " + SISTANI + ": Ghusl, Tayammum. Hadith basis: Wasa'il al-Shi'a (Kitab al-Tahara).",
  "namaz-times": "Combining prayers: Sahih Muslim 705. " + SISTANI + ": Times of prayers, Qibla, Dress and Place of the one praying, Things on which sajda is allowed. Hadith basis: al-Kafi, vol. 3 (Kitab al-Salat); Wasa'il al-Shi'a (Kitab al-Salat).",
  "namaz-steps": "Qur'an 1, 112. " + SISTANI + ": Obligatory acts of prayer (niyyah to salam), Ta'qibat. Tasbih of Fatima: al-Kafi, vol. 3 (Kitab al-Salat). Hadith basis: Wasa'il al-Shi'a (Kitab al-Salat).",
  "namaz-rules": SISTANI + ": Things that invalidate prayer, Doubts in prayer, Salat al-Ihtiyat, Sajdat al-Sahw, Prayer of a traveller, Salat al-Ayat, Qada prayers, Congregational prayer.",
  "fasting": SISTANI + ": Fasting, Things that invalidate a fast, Qada and Kaffara, Zakat al-Fitr. The Nights of Qadr: Qur'an 97; al-Kafi, vol. 4 (Kitab al-Siyam). Du'a al-Iftitah and Du'a Abu Hamza: al-Tusi, Misbah al-Mutahajjid.",
  "khums-zakat": "Qur'an 8:41, 9:103. " + SISTANI + ": Khums, Zakat. The hot iron: Nahj al-Balagha (the sermon on Aqil).",
  "muharram": "\"Keep our affair alive\": al-Himyari, Qurb al-Isnad; Wasa'il al-Shi'a (Kitab al-Mazar). Ziyarat Ashura, Warith and al-Arba'in: Ibn Qulawayh, Kamil al-Ziyarat; al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan. On matam: the published rulings (istifta'at) of the maraji', e.g. sistani.org.",
  "hadith-books": "The Four Books and their compilers: al-Najashi, Rijal; al-Tusi, al-Fihrist. Grading of hadith: al-Shahid al-Thani, al-Ri'aya fi 'Ilm al-Diraya.",
  "your-path": "\"Be an adornment for us\": al-Saduq, al-Amali. The routine draws on the sources of the earlier lessons and Mafatih al-Jinan.",
  "adhan-jumua-nafila": SISTANI + ": Adhan and Iqama (the third testimony recited for blessing, not as a part), Friday prayer, Nafila prayers. 51 rak'at as a sign of the believer: al-Tusi, Tahdhib al-Ahkam, vol. 6. Salat al-Layl and the qunut of al-Witr: al-Saduq, Man la Yahduruhu al-Faqih; al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan.",
  "quran-ahlulbayt": "Hadith al-Thaqalayn: Sahih Muslim 2408; Sunan al-Tirmidhi 3788. Qur'an 33:33 (Sahih Muslim 2424), 3:61 (Sahih Muslim 2404), 42:23, 5:55, 5:67, 5:3, 76:8–9, 2:207, 13:7, with their occasions in al-Wahidi, Asbab al-Nuzul and al-Hakim al-Haskani, Shawahid al-Tanzil. \"Compare our narrations with the Book of Allah\": al-Kafi, vol. 1 (Kitab Fadl al-'Ilm). \"Our Shia is only…\": al-Kafi, vol. 2.",
  "imamah": "Qur'an 2:124, 33:33, 4:59. Twelve successors from Quraysh: Sahih al-Bukhari 7222; Sahih Muslim 1821. The twelve by name: al-Saduq, Kamal al-Din; al-Khazzaz al-Qummi, Kifayat al-Athar. The hujja and nass: al-Kafi, vol. 1 (Kitab al-Hujja).",
  "halal-ethics": "Qur'an 24:30–31, 2:275. " + SISTANI + ": Slaughtering of animals, Food and drink, Buying and selling, Riba. The major sins: al-Kafi, vol. 2 (chapter on the major sins).",
  "tafsir": "Qur'an 3:7, 15:9. The tafsir works named in the lesson: al-Qummi; al-'Ayyashi; al-Tusi, al-Tibyan; al-Tabrisi, Majma' al-Bayan; al-Tabataba'i, al-Mizan; Makarem Shirazi, Tafsir-e Namuneh.",
  "calendar": "al-Mufid, Masar al-Shi'a; al-Tusi, Misbah al-Mutahajjid; the birth and martyrdom chapters of al-Kafi (Kitab al-Hujja) and al-Irshad; Shaykh Abbas al-Qummi, Mafatih al-Jinan. Where reports differ, the most widely followed date is given.",
  "ziyarat-duas": "Qur'an 5:35. Ziyarat of the Prophet after his death: al-Tusi, Tahdhib al-Ahkam; al-Daraqutni, Sunan. The \"cut-off salawat\": Ibn Hajar al-Haytami, al-Sawa'iq al-Muhriqa. Ziyarat Aminullah and al-Jami'a: Kamil al-Ziyarat; Man la Yahduruhu al-Faqih. Du'a Tawassul and the rest: Mafatih al-Jinan.",
  "history-beyond": "al-Najashi, Rijal; al-Tusi, al-Fihrist; Ibn al-Athir, al-Kamil fi al-Tarikh (the Buyids, 352 AH); Qazi Nurullah Shushtari, Majalis al-Mu'minin; standard histories of the Safavid, Qutb Shahi and Awadh periods.",
  "living": "Qur'an 17:23. Half of religion and the simple dowry: al-Kafi, vol. 5 (Kitab al-Nikah). Charity wards off calamity: al-Kafi, vol. 4 (Kitab al-Zakat). The rights of the mother: Risalat al-Huquq (Tuhaf al-'Uqul). \"Happy in our happiness\": al-Majlisi, Bihar al-Anwar."
};

/* ---------- Short du'as (same order as DUAS) ---------- */
const DUA_SRC = [
  "Qur'an 33:56; Sahih al-Bukhari 3370; al-Kafi, vol. 2 (Kitab al-Du'a, chapter on salawat). 100 on Friday: Mafatih al-Jinan (a'mal of Friday).",
  "al-Kafi, vol. 3 (Kitab al-Salat, chapter on ta'qib); Sahih al-Bukhari 3113.",
  "al-Kaf'ami, al-Misbah; Mafatih al-Jinan.",
  "al-Kafi, vol. 4 (Kitab al-Siyam: du'a of the 23rd night of Ramadan); Ibn Tawus, Iqbal al-A'mal; Mafatih al-Jinan.",
  "Ibn Qulawayh, Kamil al-Ziyarat; al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan.",
  "Imam al-Sadiq on remembering Husayn when drinking water: al-Kafi, vol. 6 (Kitab al-Ashriba); Ibn Qulawayh, Kamil al-Ziyarat.",
  "Qur'an 2:255–257; al-Kafi, vol. 2 (Kitab Fadl al-Qur'an).",
  "al-Kafi, vol. 2 (Kitab al-Du'a, chapter on istighfar); al-Saduq, Man la Yahduruhu al-Faqih (the qunut of al-Witr).",
  "al-Kafi, vol. 2 (Kitab al-Du'a: on leaving the house); Sunan Abi Dawud 5095.",
  "Sahih al-Bukhari 6312; al-Kafi, vol. 2 (Kitab al-Du'a: on going to sleep)."
];

/* ---------- Long du'as (keyed by name in LONG_DUAS) ---------- */
const LONG_DUA_SRC = {
  "Du'a Kumayl": "al-Tusi, Misbah al-Mutahajjid; Ibn Tawus, Iqbal al-A'mal.",
  "Du'a Tawassul": "al-Majlisi, Bihar al-Anwar; Mafatih al-Jinan.",
  "Du'a al-Nudba": "Ibn al-Mashhadi, al-Mazar al-Kabir; Ibn Tawus, Misbah al-Za'ir.",
  "Du'a al-'Ahd": "Ibn al-Mashhadi, al-Mazar al-Kabir; Ibn Tawus, Misbah al-Za'ir.",
  "Hadith al-Kisa": "al-Bahrani, 'Awalim al-'Ulum; the short report in Sahih Muslim 2424.",
  "Ziyarat Ashura (full)": "Ibn Qulawayh, Kamil al-Ziyarat; al-Tusi, Misbah al-Mutahajjid.",
  "Du'a 'Arafa of Imam Husayn": "Ibn Tawus, Iqbal al-A'mal; al-Kaf'ami, al-Balad al-Amin.",
  "Du'a Abu Hamza al-Thumali": "al-Tusi, Misbah al-Mutahajjid."
};

/* ---------- Namaz guide (keyed by prayer id) ---------- */
const NAMAZ_SRC = (() => {
  const daily = SISTANI + ": Times of prayers, Obligatory acts of prayer, Ta'qibat. Combining: Sahih Muslim 705. Hadith basis: al-Kafi, vol. 3 and Wasa'il al-Shi'a (Kitab al-Salat).";
  return {
    fajr: daily, zuhr: daily, asr: daily, maghrib: daily, isha: daily,
    layl: "Qur'an 17:79, 73:1–6. al-Saduq, Man la Yahduruhu al-Faqih; al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan (Salat al-Layl and the qunut of al-Witr).",
    nafila: SISTANI + ": Nafila prayers. 51 rak'at: al-Tusi, Tahdhib al-Ahkam, vol. 6; Wasa'il al-Shi'a (the number of the obligatory and nafila prayers).",
    ayat: SISTANI + ": Salat al-Ayat. Wasa'il al-Shi'a (Salat al-Kusuf wa al-Ayat).",
    jumua: "Qur'an 62:9–10. " + SISTANI + ": Friday prayer.",
    eid: SISTANI + ": Eid prayers. Mafatih al-Jinan (a'mal of the two Eids).",
    ghufayla: "Qur'an 21:87–88, 6:59. al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan.",
    wahsha: "al-Kaf'ami, al-Misbah; Mafatih al-Jinan (the prayer of the first night in the grave).",
    mayyit: SISTANI + ": Funeral prayer. al-Kafi, vol. 3 (Kitab al-Jana'iz).",
    doubts: SISTANI + ": Doubts in prayer.",
    ihtiyat: SISTANI + ": Salat al-Ihtiyat.",
    sahw: SISTANI + ": Sajdat al-Sahw, Forgotten parts of prayer.",
    qada: SISTANI + ": Qada prayers.",
    wudu: "Qur'an 5:6. " + SISTANI + ": Wudu (washing, wiping, conditions, things that break wudu). Hadith basis: al-Kafi, vol. 3 (Kitab al-Tahara); Wasa'il al-Shi'a (Kitab al-Tahara).",
    ghusl: "Qur'an 5:6, 4:43. " + SISTANI + ": Ghusl of janaba, hayd, nifas, mass al-mayyit; recommended ghusls. Hadith basis: Wasa'il al-Shi'a (Kitab al-Tahara).",
    tayammum: "Qur'an 5:6, 4:43. " + SISTANI + ": Tayammum (when it is allowed, how it is done, what breaks it).",
    "ziyarat-after": "Ziyarat Ashura with its salam and final sajda, from Imam al-Baqir (AS): Ibn Qulawayh, Kamil al-Ziyarat; al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan. Greeting Imam Husayn from afar: al-Kafi, vol. 4 (Kitab al-Hajj); Kamil al-Ziyarat. Standing at the name al-Qa'im: a custom recorded in al-Nuri, al-Najm al-Thaqib.",
    before: "Qur'an 2:144 (the qibla). " + SISTANI + ": Najasat, Dress of the one praying, Place of prayer, Qibla, Things on which sajda is allowed, Things that invalidate prayer."
  };
})();

/* ---------- Sections with short lists (keyed by section id) ---------- */
const SECTION_SRC = {
  haq: "Qur'an 17:26, 59:6–7; Sahih al-Bukhari 3092–3093, 4240–4241; al-Suyuti, al-Durr al-Manthur (on 17:26); the Sermon of Fadak in al-Tabrisi, al-Ihtijaj and Ibn Abi Tayfur, Balaghat al-Nisa'; Nahj al-Balagha, Letter 45; al-Baladhuri, Futuh al-Buldan (what later rulers did with Fadak); Ibn Abi al-Hadid, Sharh Nahj al-Balagha.",
  karbala: "al-Tabari, Tarikh al-Rusul wa al-Muluk (from Abu Mikhnaf); al-Mufid, al-Irshad; Ibn Tawus, al-Luhuf; Abu al-Faraj al-Isfahani, Maqatil al-Talibiyyin; the names of the martyrs in Ziyarat al-Nahiya (Ibn al-Mashhadi, al-Mazar). Each day links to its full, sourced story.",
  abbas: "al-Mufid, al-Irshad; al-Isfahani, Maqatil al-Talibiyyin; Ibn Tawus, al-Luhuf; Imam al-Sajjad's words on al-Abbas in al-Saduq, al-Khisal and al-Amali; his ziyarat from Imam al-Sadiq in Ibn Qulawayh, Kamil al-Ziyarat.",
  battles: "al-Waqidi, al-Maghazi; Ibn Hisham, al-Sira al-Nabawiyya; al-Mufid, al-Irshad; Khaybar's banner: Sahih al-Bukhari 4210, Sahih Muslim 2406; Siffin: Nasr ibn Muzahim al-Minqari, Waq'at Siffin; Jamal and Nahrawan: al-Tabari, Tarikh.",
  rulers: "al-Tabari, Tarikh al-Rusul wa al-Muluk; al-Mas'udi, Muruj al-Dhahab; al-Isfahani, Maqatil al-Talibiyyin; al-Mufid, al-Irshad; al-Saduq, 'Uyun Akhbar al-Rida.",
  wronged: "Sahih al-Bukhari 4240–4241; al-Tabari, Tarikh al-Rusul wa al-Muluk; al-Isfahani, Maqatil al-Talibiyyin; al-Mufid, al-Irshad; Ibn al-Athir, al-Kamil fi al-Tarikh (including the revenge of al-Mukhtar). Each entry links to its full, sourced story.",
  lessons: "These are lessons drawn from their lives. The events behind them are sourced in each Ma'sum's Life story and in the Stories section.",
  companions: "Ibn Sa'd, al-Tabaqat al-Kubra; Ibn Abd al-Barr, al-Isti'ab; al-Kashshi, Ikhtiyar Ma'rifat al-Rijal; al-Tabari, Tarikh.",
  dates: "al-Mufid, Masar al-Shi'a and al-Irshad; al-Tusi, Misbah al-Mutahajjid; al-Kafi (Kitab al-Hujja, the birth chapters); Mafatih al-Jinan. Where reports differ, the most widely followed date is given. Each date links to its sourced story.",
  timeline: "Each event links to its full story, where its sources are listed. Dates: al-Mufid, al-Irshad; al-Tabari, Tarikh.",
  calendar: "al-Mufid, Masar al-Shi'a; al-Tusi, Misbah al-Mutahajjid; Shaykh Abbas al-Qummi, Mafatih al-Jinan. Where reports differ, the most widely followed date is given."
};

/* ---------- Where the Fourteen rest (same order as MASUMIN) ----------
   [place, detail, ziyarat id in the Du'a library ("ziyarat/<id>")] */
const SHRINES = [
  ["Medina, Saudi Arabia", "In his house, now inside the Prophet's Mosque (Masjid al-Nabawi), under the green dome.", "prophet-far"],
  ["Medina — grave hidden", "Buried at night by her own wish, and the place kept secret. Reports name her house (now inside the Prophet's Mosque), the Rawda, or al-Baqi'.", "fatima"],
  ["Najaf, Iraq", "The shrine of Amir al-Mu'minin, hidden until Imam al-Sadiq showed its place.", "amin-allah"],
  ["Jannat al-Baqi', Medina", "His shrine was demolished on 8 Shawwal 1344 AH (1926); the grave remains, without a dome.", "baqi"],
  ["Karbala, Iraq", "With Ali al-Akbar and Ali al-Asghar beside him and the martyrs nearby; al-Abbas has his own shrine a short walk away.", "warith"],
  ["Jannat al-Baqi', Medina", "Beside his uncle Imam al-Hasan; shrine demolished in 1926.", "baqi"],
  ["Jannat al-Baqi', Medina", "Beside his father; shrine demolished in 1926.", "baqi"],
  ["Jannat al-Baqi', Medina", "Beside his father and grandfather; shrine demolished in 1926.", "baqi"],
  ["Kadhimiya (al-Kazimiyya), Baghdad, Iraq", "In the Quraysh cemetery; the twin golden domes.", "kazim"],
  ["Mashhad, Iran", "At Sanabad near Tus, beside the grave of Harun al-Rashid; the largest shrine in the Muslim world.", "rida"],
  ["Kadhimiya, Baghdad, Iraq", "Beside his grandfather Imam al-Kazim, under the same twin domes.", "jawad"],
  ["Samarra, Iraq", "In his own house; the al-Askariyyayn shrine (dome bombed in 2006, since rebuilt).", "hadi"],
  ["Samarra, Iraq", "Beside his father in the same shrine.", "askari"],
  ["Alive, in occultation", "He has no grave. The Sardab (cellar) of the Samarra shrine, where he was last seen, and Masjid Jamkaran near Qom are places where people pray to Allah for his return.", "zaman"]
];
const SHRINES_SRC = "al-Mufid, al-Irshad and al-Kafi (Kitab al-Hujja), the burial of each Imam; al-Tusi, Tahdhib al-Ahkam, vol. 6 (Kitab al-Mazar); Ibn Qulawayh, Kamil al-Ziyarat. Fatima's hidden grave: Sahih al-Bukhari 4240 (buried at night); al-Kafi (Kitab al-Hujja). Al-Baqi' demolition: 8 Shawwal 1344 AH (21 April 1926).";
