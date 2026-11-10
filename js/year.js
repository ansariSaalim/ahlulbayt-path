/* =========================================================
   AFTER KARBALA, and WHY WE CELEBRATE OR MOURN
   Same rule as sources.js: cite only what is certain; mark later
   or disputed reports as such.
   ========================================================= */

/* [when, what happened, story id] — in order */
const AFTER_KARBALA = [
  ["Evening of 10 Muharram 61", "The tents are burned and looted. Lady Zaynab gathers the frightened children and guards the sick Imam Zayn al-Abidin through the Night of the Strangers (Sham-e-Ghariban).", "night-11"],
  ["11 Muharram", "The women, the children and the Imam are put on bare camels and led past the bodies of the martyrs toward Kufa. The heads are carried ahead on spears.", "night-11"],
  ["13 Muharram", "The Banu Asad bury the martyrs. Shia narrations add that Imam Zayn al-Abidin came to bury his father, since only an Imam buries an Imam.", "night-11"],
  ["In Kufa", "Lady Zaynab silences the crowd with a sermon that sounds like her father Ali. In Ibn Ziyad's court she answers: \"I saw nothing but beauty.\" When he orders the Imam killed, she holds on to him and he is spared.", "zaynab"],
  ["The road to Damascus, Safar 61", "The captives are paraded from town to town as if they were rebels, until they reach Yazid's palace.", "captives-damascus"],
  ["Yazid's court", "Yazid strikes the lips of Husayn's head with a cane. Lady Zaynab's sermon shames him in his own court, and Imam Zayn al-Abidin, in the Umayyad mosque, tells the people who they really are: \"I am the son of Mecca and Mina…\" The mood of Damascus turns.", "zaynab"],
  ["The ruins of Damascus", "The family is kept in a ruined building. Later reports say the little daughter of Husayn (Ruqayya, or Sukayna in some reports) died there beside her father's head.", "captives-damascus"],
  ["20 Safar 61 — Arba'in", "Forty days after Ashura, the companion Jabir ibn Abdullah al-Ansari and Atiyya al-Awfi reach the grave of Husayn: the first pilgrims. A well-known report (Ibn Tawus, al-Luhuf) says the family came back by Karbala and met them there.", "arbain"],
  ["Return to Medina", "Bashir ibn Jadhlam rides ahead and announces their return. Medina comes out weeping. Umm al-Banin mourns her four sons at al-Baqi', but asks first about Husayn.", "arbain"],
  ["The years of tears", "Imam Zayn al-Abidin weeps for his father for the rest of his life; whenever food or water was placed before him he remembered Husayn's thirst. He is counted among the five who wept the most.", "sajjad"],
  ["63 AH — al-Harra", "Medina rises against Yazid and is sacked by his army for three days.", "after-karbala"],
  ["64 AH", "Yazid dies, about three years after Karbala.", "after-karbala"],
  ["65 AH — the Penitents (Tawwabun)", "Sulayman ibn Surad leads thousands of Kufans who had failed to help Husayn. They are martyred at 'Ayn al-Warda, seeking forgiveness with their blood.", "after-karbala"],
  ["66–67 AH — al-Mukhtar", "Al-Mukhtar takes Kufa under the cry \"Ya litharat al-Husayn\". Umar ibn Sa'd, Shimr and Khawli are killed, and Ibrahim, son of Malik al-Ashtar, kills Ibn Ziyad at the river Khazir.", "after-karbala"],
  ["Ever since", "The Imams hold gatherings of mourning, teach the ziyarat of Husayn and promise reward for every tear. Karbala becomes the heart of the Shia, and Arba'in becomes one of the largest gatherings on earth.", "mourning"]
];
const AFTER_KARBALA_SRC = "al-Tabari, Tarikh al-Rusul wa al-Muluk (from Abu Mikhnaf); al-Mufid, al-Irshad; Ibn Tawus, al-Luhuf; al-Tabrisi, al-Ihtijaj (the sermons); al-Khwarazmi, Maqtal al-Husayn; al-Saduq, al-Khisal (the five who wept); Ibn al-Athir, al-Kamil fi al-Tarikh (al-Harra, the Penitents, al-Mukhtar).";

/* Why we celebrate or mourn.  k: "joy" | "grief"
   [Hijri month index 1–12, day text, title, kind, why, story id, source] */
const YEAR_WHY = [
  [1, "1–10 Muharram", "Muharram and Ashura", "grief", "Imam Husayn, his family and companions were killed on the 10th, thirsty, because he refused to give Yazid's rule the name of Islam. The Prophet ﷺ himself wept for him. We mourn because love for Husayn means sharing his grief, and because every majlis keeps his stand against oppression alive.", "ashura", "Musnad Ahmad (the Prophet weeping); Ibn Qulawayh, Kamil al-Ziyarat; al-Saduq, al-Amali."],
  [1, "25 Muharram", "Martyrdom of Imam Zayn al-Abidin", "grief", "The survivor of Karbala, poisoned under al-Walid ibn Abd al-Malik. He carried Karbala's message through du'a when speech was forbidden.", "sajjad", "al-Mufid, al-Irshad."],
  [2, "20 Safar", "Arba'in", "grief", "Forty days after Ashura. Imam al-Askari named the ziyarat of Arba'in among the five signs of a believer. Millions walk from Najaf to Karbala to answer Husayn's call, \"Is there anyone to help us?\"", "arbain", "al-Tusi, Tahdhib al-Ahkam, vol. 6; Misbah al-Mutahajjid (Ziyarat al-Arba'in)."],
  [2, "28 Safar", "Passing of the Prophet ﷺ and Imam al-Hasan", "grief", "The Prophet ﷺ passed away, his head on Ali's chest. By the best-known report it is also the martyrdom of Imam al-Hasan, poisoned, whose coffin was struck with arrows (another report gives 7 Safar).", "hasan-poison", "al-Mufid, Masar al-Shi'a and al-Irshad; al-Tusi, Misbah al-Mutahajjid."],
  [2, "End of Safar", "Martyrdom of Imam al-Rida", "grief", "Poisoned by al-Ma'mun at Tus, far from home. Millions visit his shrine in Mashhad.", "rida", "al-Saduq, 'Uyun Akhbar al-Rida."],
  [3, "8–9 Rabi' al-Awwal", "Imam al-Askari, and the Imamate of the Mahdi", "grief", "Imam al-Askari is martyred on the 8th at 28. On the 9th the Imamate of Imam al-Mahdi begins, so grief turns to hope.", "askari", "al-Mufid, al-Irshad; al-Saduq, Kamal al-Din."],
  [3, "17 Rabi' al-Awwal", "Birth of the Prophet ﷺ and Imam al-Sadiq", "joy", "The birth of the Mercy to the Worlds, and of the Imam whose school we follow. The week from 12 (the Sunni date) to 17 is marked as the Week of Unity.", "", "al-Kulayni, al-Kafi (Kitab al-Hujja: the birth of the Prophet); al-Mufid, Masar al-Shi'a."],
  [5, "5 Jumada al-Ula", "Birth of Lady Zaynab", "joy", "The heroine of Karbala, whose sermons carried its message to Kufa and Damascus.", "zaynab", "Shaykh Abbas al-Qummi, Mafatih al-Jinan (dates of the year)."],
  [5, "13 Jumada al-Ula – 3 Jumada al-Thani", "Ayyam al-Fatimiyya", "grief", "Lady Fatima lived only 75 or 95 days after her father. In those days Fadak was taken and, as the Shia narrations report, her house was attacked and her unborn son Muhsin was lost; and she died wronged, asking to be buried at night so that those who hurt her could not attend. The First Fatimiyya (13–15 Jumada al-Ula) follows the 75-day report; the Second Fatimiyya (3 Jumada al-Thani) follows the 95-day report. We mourn her, and we keep her stand for the truth alive, because her grave is still hidden and her right was never returned.", "fatima-burial", "75 days: al-Kafi, vol. 1 (Kitab al-Hujja), from Imam al-Sadiq. 95 days, 3 Jumada al-Thani: al-Tabari al-Imami, Dala'il al-Imama. Buried at night: Sahih al-Bukhari 4240."],
  [6, "20 Jumada al-Thani", "Birth of Lady Fatima al-Zahra", "joy", "The Lady of the Women of the Worlds and the mother of the Imams. Many mark it as a day honouring mothers.", "", "al-Kafi, vol. 1 (Kitab al-Hujja); al-Tusi, Misbah al-Mutahajjid."],
  [7, "1 and 10 Rajab", "Births of Imam al-Baqir and Imam al-Jawad", "joy", "Two Imams of knowledge: the one who split knowledge open, and the child Imam who silenced the chief judge.", "jawad", "al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan (a'mal of Rajab)."],
  [7, "3 Rajab", "Martyrdom of Imam al-Hadi", "grief", "Poisoned in Samarra after years under surveillance.", "hadi-samarra", "al-Mufid, al-Irshad."],
  [7, "13 Rajab", "Birth of Imam Ali in the Ka'ba", "joy", "The only one born inside the House of Allah. The days of 13–15 Rajab are also the Ayyam al-Bid, with i'tikaf in the mosque.", "kaaba-birth", "al-Hakim, al-Mustadrak; al-Mufid, al-Irshad."],
  [7, "25 Rajab", "Martyrdom of Imam al-Kazim", "grief", "Died in Harun's prison in Baghdad; his body was left on the bridge.", "kazim", "al-Mufid, al-Irshad; al-Saduq, 'Uyun Akhbar al-Rida."],
  [7, "27 Rajab", "al-Mab'ath", "joy", "The first revelation in the cave of Hira: \"Read in the name of your Lord\" (96:1). The beginning of the Prophet's mission.", "", "Qur'an 96:1–5; al-Tusi, Misbah al-Mutahajjid; Mafatih al-Jinan."],
  [8, "3, 4 and 5 Sha'ban", "Births of Imam Husayn, al-Abbas and Imam al-Sajjad", "joy", "Three days of joy for the three heroes of Karbala.", "husayn-prophet", "al-Tusi, Misbah al-Mutahajjid (the du'a of 3 Sha'ban); Mafatih al-Jinan."],
  [8, "15 Sha'ban", "Birth of Imam al-Mahdi", "joy", "The birth of the living Imam, the hope of the world. The night before is one of the greatest nights of worship, close to the Nights of Qadr.", "mahdi-birth", "al-Saduq, Kamal al-Din; al-Tusi, Misbah al-Mutahajjid (the night of 15 Sha'ban)."],
  [9, "15 Ramadan", "Birth of Imam al-Hasan", "joy", "The Prophet's first grandson, the generous one of the Ahl al-Bayt.", "", "al-Mufid, al-Irshad."],
  [9, "19, 21 and 23 Ramadan", "Imam Ali, and the Nights of Qadr", "grief", "Imam Ali was struck in prostration on the 19th and martyred on the 21st. These are also the Nights of Qadr, \"better than a thousand months\" (97:3), so the nights are spent in both grief and worship.", "ali-martyrdom", "Qur'an 97; al-Mufid, al-Irshad; al-Kafi, vol. 4 (Kitab al-Siyam)."],
  [10, "1 Shawwal", "Eid al-Fitr", "joy", "Thanks to Allah after a month of fasting; Zakat al-Fitra is given before the Eid prayer.", "", "Sayyid al-Sistani, Islamic Laws: Eid prayers, Zakat al-Fitr."],
  [10, "8 Shawwal", "Demolition of al-Baqi'", "grief", "In 1926 the shrines over the graves of four Imams and many of the Prophet's family in Medina were demolished.", "", "Historical record, 8 Shawwal 1344 AH (21 April 1926)."],
  [10, "25 Shawwal", "Martyrdom of Imam al-Sadiq", "grief", "Poisoned under al-Mansur. The teacher of four thousand, whose school we carry.", "sadiq", "al-Mufid, al-Irshad."],
  [11, "11 Dhul Qa'da", "Birth of Imam al-Rida", "joy", "The Imam of the Golden Chain, buried in Mashhad.", "rida", "al-Saduq, 'Uyun Akhbar al-Rida."],
  [11, "End of Dhul Qa'da", "Martyrdom of Imam al-Jawad", "grief", "Poisoned at about 25, the youngest of the Imams to be martyred.", "jawad", "al-Mufid, al-Irshad."],
  [12, "1 Dhul Hijja", "Marriage of Ali and Fatima", "joy", "A wedding with a dowry of one coat of armour: the model of a simple, blessed marriage.", "marriage", "al-Tusi, Misbah al-Mutahajjid; al-Kafi, vol. 5."],
  [12, "7 Dhul Hijja", "Martyrdom of Imam al-Baqir", "grief", "Poisoned under Hisham ibn Abd al-Malik.", "baqir", "al-Mufid, al-Irshad."],
  [12, "9 Dhul Hijja", "Day of 'Arafa; martyrdom of Muslim ibn Aqil", "grief", "A day of du'a (Imam Husayn's Du'a 'Arafa), and the day Husayn's envoy Muslim ibn Aqil was killed in Kufa.", "husayn-departure", "Ibn Tawus, Iqbal al-A'mal; al-Mufid, al-Irshad."],
  [12, "10 Dhul Hijja", "Eid al-Adha", "joy", "The Eid of sacrifice, remembering Ibrahim and Isma'il.", "", "Qur'an 37:102–107; Sayyid al-Sistani, Islamic Laws: Eid prayers."],
  [12, "18 Dhul Hijja", "Eid al-Ghadir", "joy", "The day the Prophet ﷺ declared at Ghadir Khumm, \"Whoever I am his mawla, Ali is his mawla\", and the religion was completed (5:3). Imam al-Sadiq called it the greatest Eid of Allah.", "ghadir", "Sunan al-Tirmidhi 3713; al-Tusi, Tahdhib al-Ahkam, vol. 3 and Misbah al-Mutahajjid (Eid al-Ghadir)."],
  [12, "24 Dhul Hijja", "Mubahala", "joy", "The Prophet ﷺ came out with Ali, Fatima, Hasan and Husayn: \"our sons, our women, ourselves\" (3:61).", "mubahala", "Qur'an 3:61; Sahih Muslim 2404."]
];
const YEAR_WHY_INTRO = "Imam al-Rida (AS) told al-Rayyan ibn Shabib: \"If it pleases you to be with us in the high ranks of Paradise, be sad in our sadness and happy in our happiness.\" That is why the Shia year has days of joy and days of mourning.";
const YEAR_WHY_SRC = "Imam al-Rida to al-Rayyan ibn Shabib: al-Saduq, 'Uyun Akhbar al-Rida and al-Amali. Dates: al-Mufid, Masar al-Shi'a; al-Tusi, Misbah al-Mutahajjid; Shaykh Abbas al-Qummi, Mafatih al-Jinan. Where reports differ, the most widely followed date is given; each entry names its own source.";
