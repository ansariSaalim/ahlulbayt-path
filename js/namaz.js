/* =========================================================
   NAMAZ GUIDE — every prayer step by step (Ja'fari fiqh)
   Rulings follow the common view of the major maraji'
   (e.g. Sayyid al-Sistani). Check your own marja's risala.
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } }
  };

  /* ---------- the words of the prayer ---------- */
  const P = {
    takbir: { ar: "اللّٰهُ أَكْبَرُ", tl: "Allahu Akbar", en: "Allah is the Greatest" },
    fatiha: {
      ar: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
      tl: "Bismillahir-Rahmanir-Rahim. Al-hamdu lillahi Rabbil-'alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinas-siratal-mustaqim. Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin.",
      en: "In the name of Allah, the Beneficent, the Merciful. All praise is for Allah, Lord of the worlds, the Beneficent, the Merciful, Master of the Day of Judgement. You alone we worship and You alone we ask for help. Guide us on the straight path, the path of those You have blessed, not of those who earned Your anger, nor of those who went astray."
    },
    ikhlas: {
      ar: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ قُلْ هُوَ اللّٰهُ أَحَدٌ ﴿١﴾ اللّٰهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾",
      tl: "Bismillahir-Rahmanir-Rahim. Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
      en: "Say: He is Allah, the One. Allah, the Self-Sufficient. He does not give birth, nor was He born. And there is none like Him."
    },
    ruku: { ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ", tl: "Subhana Rabbiyal-'Azimi wa bihamdih", en: "Glory be to my Lord, the Great, and praise be to Him" },
    sami: { ar: "سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ", tl: "Sami'allahu liman hamidah", en: "Allah hears the one who praises Him" },
    sajda: { ar: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ وَبِحَمْدِهِ", tl: "Subhana Rabbiyal-A'la wa bihamdih", en: "Glory be to my Lord, the Most High, and praise be to Him" },
    istighfar: { ar: "أَسْتَغْفِرُ اللّٰهَ رَبِّي وَأَتُوبُ إِلَيْهِ", tl: "Astaghfirullaha Rabbi wa atubu ilayh", en: "I seek forgiveness from Allah, my Lord, and I turn to Him" },
    bihawl: { ar: "بِحَوْلِ اللّٰهِ وَقُوَّتِهِ أَقُومُ وَأَقْعُدُ", tl: "Bihawlillahi wa quwwatihi aqumu wa aq'ud", en: "By the power and strength of Allah I stand and I sit" },
    qunut: { ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", tl: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar", en: "Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire" },
    tashahhud: { ar: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ", tl: "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh. Allahumma salli 'ala Muhammadin wa Ali Muhammad.", en: "I bear witness that there is no god but Allah, alone, without partner, and I bear witness that Muhammad is His servant and His Messenger. O Allah, send blessings on Muhammad and the family of Muhammad." },
    salam: { ar: "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ ۞ السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللّٰهِ الصَّالِحِينَ ۞ السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ", tl: "As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. As-salamu 'alaykum wa rahmatullahi wa barakatuh.", en: "Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. Peace be upon you all, and the mercy of Allah and His blessings." },
    tasbihat: { ar: "سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ", tl: "Subhanallahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar", en: "Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the Greatest" },
    salawat: { ar: "اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ", tl: "Allahumma salli 'ala Muhammadin wa Ali Muhammad", en: "O Allah, send blessings on Muhammad and the family of Muhammad" }
  };

  /* ---------- step builders ---------- */
  const S = (pose, t, o = {}) => Object.assign({ pose, t }, o);
  const say = (p, extra = {}) => Object.assign({ ar: p.ar, tl: p.tl, en: p.en }, extra);

  function rukuSteps(rk) {
    return [
      S("ruku", "Ruku'", Object.assign(say(P.ruku), { d: "Say <i>Allahu Akbar</i> (recommended), then bow until your palms can reach your knees. Be still and say the dhikr. Instead you may say <i>Subhanallah</i> three times.", tag: "Obligatory" })),
      S("stand", "Rise from ruku'", Object.assign(say(P.sami), { d: "Stand fully upright and be still for a moment. This standing is obligatory; saying the words is recommended.", rk })),
      S("sajda", "First sajda", Object.assign(say(P.sajda), { d: "Say <i>Allahu Akbar</i> (recommended) and go down. Seven parts touch the ground: the forehead on the turbah, both palms, both knees and both big toes. Instead you may say <i>Subhanallah</i> three times.", tag: "Obligatory" })),
      S("sit", "Sit between the sajdas", Object.assign(say(P.istighfar), { d: "Sit up and be still. Saying <i>Allahu Akbar</i> and the istighfar is recommended.", tag: "Obligatory to sit" })),
      S("sajda", "Second sajda", Object.assign(say(P.sajda), { d: "Go down again exactly as in the first sajda and say the same dhikr.", tag: "Obligatory" }))
    ].map(x => Object.assign(x, { rk }));
  }

  function dailySteps(o) {
    const out = [], rk = o.rk;
    for (let r = 1; r <= rk; r++) {
      if (r === 1) {
        out.push(S("stand", "Niyyah (intention)", { rk: r, d: `Stand facing the qibla with your hands open at your sides and the turbah in front of you. Make the intention in your heart; you do not need to say it aloud.`, quote: o.niyyah, tag: "Obligatory" }));
        out.push(S("takbir", "Takbirat al-Ihram", Object.assign(say(P.takbir), { rk: r, d: "Raise your hands to your ears (recommended) and say Allahu Akbar. Now you are in prayer.", tag: "Pillar (rukn)" })));
      } else {
        out.push(S("stand", `Stand for rak'at ${r}`, Object.assign(say(P.bihawl), { rk: r, d: "Rise to standing. Saying this while rising is recommended.", tag: "Recommended words" })));
      }
      if (r <= 2) {
        out.push(S("stand", "Recite al-Fatiha", Object.assign(say(P.fatiha), { rk: r, d: o.loud ? "Men recite it <b>aloud</b> in this prayer. Women may recite aloud or quietly, and quietly if a non-mahram man can hear." : "Recite it <b>quietly</b> in this prayer (men and women).", tag: "Obligatory" })));
        if (!o.noSura) out.push(S("stand", "Recite one complete sura", Object.assign(say(P.ikhlas), { rk: r, d: (o.loud ? "Also aloud for men. " : "Also quietly. ") + "Any complete sura is valid except the four with an obligatory sajda. Al-Ikhlas is shown here.", tag: o.nafila ? "Optional in nafila" : "Obligatory" })));
      } else {
        out.push(S("stand", "Tasbihat al-Arba'a", Object.assign(say(P.tasbihat), { rk: r, d: "Say it <b>quietly</b>. Once is enough; three times is better. Instead you may recite al-Fatiha quietly, with no sura.", tag: "Obligatory", count: 3 })));
      }
      if (r === 2) out.push(S("qunut", "Qunut", Object.assign(say(P.qunut), { rk: r, d: "Raise your hands in front of your face, palms up, and make any du'a. This one is common. You may also simply say salawat.", tag: "Recommended" })));
      out.push(...rukuSteps(r));
      if (r === 2 && rk > 2) {
        out.push(S("sit", "Tashahhud", Object.assign(say(P.tashahhud), { rk: r, d: "Sit up after the second sajda and recite the tashahhud. Do <b>not</b> say salam; stand up for the next rak'at.", tag: "Obligatory" })));
      } else if (r === rk) {
        out.push(S("sit", "Tashahhud", Object.assign(say(P.tashahhud), { rk: r, d: "Sit and recite the tashahhud.", tag: "Obligatory" })));
        out.push(S("sit", "Salam", Object.assign(say(P.salam), { rk: r, d: "End the prayer with the salam. The first line is recommended; the last line is the one that is needed (the second is also enough on its own). Your prayer is complete.", tag: "Obligatory" })));
      } else {
        out.push(S("sit", "Sit for a moment", { rk: r, d: "After the second sajda, sit still for a moment before standing (jalsat al-istiraha). It is a strong recommended act.", tag: "Recommended" }));
      }
    }
    out.push(S("sit", "After the prayer: Tasbih of Lady Fatima", { rk: "after", ar: "اللّٰهُ أَكْبَرُ ×٣٤ · الْحَمْدُ لِلّٰهِ ×٣٣ · سُبْحَانَ اللّٰهِ ×٣٣", tl: "Allahu Akbar 34 times · Alhamdulillah 33 times · Subhanallah 33 times", en: "The Prophet ﷺ taught this to Lady Fatima. Imam al-Sadiq said it after every prayer is more beloved to him than a thousand rak'at.", d: "Saying Allahu Akbar three times after the salam, with hands raised, is also recommended. Use the Tasbih counter on the Prayer tab.", tag: "Highly recommended" }));
    return out;
  }

  const nafila2 = (name, niy, extra = {}) => dailySteps(Object.assign({ rk: 2, loud: false, nafila: true, niyyah: niy }, extra)).map(s => {
    if (s.t === "Recite al-Fatiha") s.d = "Recite al-Fatiha, aloud or quietly (both are fine in nafila at night; quietly in the day is better).";
    if (s.t === "Salam") s.d = "End with the salam. That is one 2-rak'at prayer of " + name + ".";
    return s;
  }).filter(s => !(s.rk === "after"));

  /* ---------- Witr (the last rak'at of Salat al-Layl) ---------- */
  const WITR = [
    S("stand", "Niyyah", { rk: 1, d: "Stand facing the qibla.", quote: "I pray one rak'at of al-Witr, recommended, qurbatan ilallah.", tag: "Obligatory" }),
    S("takbir", "Takbirat al-Ihram", Object.assign(say(P.takbir), { rk: 1, tag: "Pillar (rukn)" })),
    S("stand", "Al-Fatiha", Object.assign(say(P.fatiha), { rk: 1, d: "Recite al-Fatiha.", tag: "Obligatory" })),
    S("stand", "Al-Ikhlas ×3, al-Falaq, al-Nas", Object.assign(say(P.ikhlas), { rk: 1, d: "It is recommended to recite al-Ikhlas three times, then al-Falaq and al-Nas once each. Any sura is acceptable.", tag: "Recommended", count: 3 })),
    S("qunut", "Qunut: begin", Object.assign(say(P.salawat), { rk: 1, d: "Raise your hands for a long qunut. Begin with praise of Allah and salawat. You may read from your phone or a paper.", tag: "Recommended" })),
    S("qunut", "Pray for 40 believers", { rk: 1, ar: "اللّٰهُمَّ اغْفِرْ لِـ ...", tl: "Allahummaghfir li ... (name)", en: "O Allah, forgive ... (name)", d: "Ask forgiveness for 40 believers by name, living or dead: parents, family, teachers, friends, martyrs. Imam al-Sadiq said whoever does this will have his own du'a answered.", tag: "Recommended", count: 40 }),
    S("qunut", "Istighfar 70 times", Object.assign(say(P.istighfar), { rk: 1, d: "The Prophet ﷺ used to seek forgiveness seventy times in the Witr.", tag: "Recommended", count: 70 })),
    S("qunut", "Seeking refuge 7 times", { rk: 1, ar: "هٰذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ", tl: "Hadha maqamul-'a'idhi bika minan-nar", en: "This is the place of one who seeks refuge in You from the Fire", tag: "Recommended", count: 7 }),
    S("qunut", "Al-'Afw 300 times", { rk: 1, ar: "الْعَفْوَ", tl: "Al-'afw", en: "Forgiveness!", d: "This was the practice of Imam Zayn al-'Abidin in his Witr.", tag: "Recommended", count: 300 }),
    S("qunut", "Close the qunut", { rk: 1, ar: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ الرَّحِيمُ", tl: "Rabbighfir li warhamni wa tub 'alayya innaka antat-tawwabul-ghafurur-rahim", en: "My Lord, forgive me, have mercy on me and accept my repentance; You are the Accepter of repentance, the Forgiving, the Merciful", tag: "Recommended" }),
    ...rukuSteps(1),
    S("sit", "Tashahhud", Object.assign(say(P.tashahhud), { rk: 1, tag: "Obligatory" })),
    S("sit", "Salam", Object.assign(say(P.salam), { rk: 1, d: "Your Salat al-Layl is complete. Follow it with the Tasbih of Lady Fatima and your own du'as before Fajr.", tag: "Obligatory" }))
  ];

  /* ---------- Salat al-Ayat ---------- */
  const IKH_PARTS = [
    ["بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillahir-Rahmanir-Rahim"],
    ["قُلْ هُوَ اللّٰهُ أَحَدٌ", "Qul huwallahu ahad"],
    ["اللّٰهُ الصَّمَدُ", "Allahus-samad"],
    ["لَمْ يَلِدْ وَلَمْ يُولَدْ", "Lam yalid wa lam yulad"],
    ["وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", "Wa lam yakun lahu kufuwan ahad"]
  ];
  function ayatSteps() {
    const out = [S("stand", "Niyyah", { rk: 1, d: "Face the qibla.", quote: "I pray Salat al-Ayat for the eclipse (or earthquake), wajib, qurbatan ilallah.", tag: "Obligatory" }), S("takbir", "Takbirat al-Ihram", Object.assign(say(P.takbir), { rk: 1, tag: "Pillar (rukn)" }))];
    for (let r = 1; r <= 2; r++) {
      if (r === 2) out.push(S("stand", "Stand for rak'at 2", Object.assign(say(P.bihawl), { rk: 2, d: "The second rak'at is exactly like the first: five ruku', then two sajdas." })));
      out.push(S("stand", "Al-Fatiha (once)", Object.assign(say(P.fatiha), { rk: r, d: "In the short method, recite al-Fatiha once at the start of the rak'at. Then split one sura into five parts, one part before each ruku'.", tag: "Obligatory" })));
      IKH_PARTS.forEach((p, i) => {
        out.push(S("stand", `Part ${i + 1} of the sura`, { rk: r, ar: p[0], tl: p[1], d: i === 0 ? "Recite the first part of al-Ikhlas." : `Rise from the previous ruku' and recite part ${i + 1}. Do not repeat al-Fatiha.`, tag: "Obligatory" }));
        const no = i + 1 + (r - 1) * 5;
        if (no % 2 === 0) out.push(S("qunut", "Qunut", Object.assign(say(P.qunut), { rk: r, d: `A qunut before ruku' ${no} is recommended (before the 2nd, 4th, 6th, 8th and 10th). One qunut before the 10th is enough.`, tag: "Recommended" })));
        out.push(S("ruku", `Ruku' ${no} of 10`, Object.assign(say(P.ruku), { rk: r, d: i < 4 ? "Bow, say the dhikr, then rise straight up." : "This is the fifth ruku' of this rak'at. Rise, then go to sajda.", tag: "Pillar (rukn)" })));
      });
      out.push(...rukuSteps(r).slice(1));
    }
    out.push(S("sit", "Tashahhud", Object.assign(say(P.tashahhud), { rk: 2, tag: "Obligatory" })));
    out.push(S("sit", "Salam", Object.assign(say(P.salam), { rk: 2, d: "Salat al-Ayat is complete.", tag: "Obligatory" })));
    return out;
  }

  /* ---------- Eid ---------- */
  const EID_QUNUT = { ar: "اللّٰهُمَّ أَهْلَ الْكِبْرِيَاءِ وَالْعَظَمَةِ، وَأَهْلَ الْجُودِ وَالْجَبَرُوتِ، وَأَهْلَ الْعَفْوِ وَالرَّحْمَةِ، وَأَهْلَ التَّقْوَىٰ وَالْمَغْفِرَةِ، أَسْأَلُكَ بِحَقِّ هٰذَا الْيَوْمِ الَّذِي جَعَلْتَهُ لِلْمُسْلِمِينَ عِيدًا، وَلِمُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَآلِهِ ذُخْرًا وَشَرَفًا وَكَرَامَةً وَمَزِيدًا، أَنْ تُصَلِّيَ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ، وَأَنْ تُدْخِلَنِي فِي كُلِّ خَيْرٍ أَدْخَلْتَ فِيهِ مُحَمَّدًا وَآلَ مُحَمَّدٍ، وَأَنْ تُخْرِجَنِي مِنْ كُلِّ سُوءٍ أَخْرَجْتَ مِنْهُ مُحَمَّدًا وَآلَ مُحَمَّدٍ، صَلَوَاتُكَ عَلَيْهِ وَعَلَيْهِمْ، اللّٰهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ مَا سَأَلَكَ بِهِ عِبَادُكَ الصَّالِحُونَ، وَأَعُوذُ بِكَ مِمَّا اسْتَعَاذَ مِنْهُ عِبَادُكَ الْمُخْلَصُونَ", en: "O Allah, Lord of grandeur and greatness, of generosity and might, of pardon and mercy, of piety and forgiveness: I ask You by the right of this day, which You made an Eid for the Muslims and a treasure, honour and increase for Muhammad, may Allah bless him and his family, to send blessings on Muhammad and the family of Muhammad, to enter me into every good You entered Muhammad and his family into, and to take me out of every evil You took them out of. O Allah, I ask You for the best that Your righteous servants asked of You, and I seek refuge in You from what Your sincere servants sought refuge from." };
  function eidSteps() {
    const out = [S("stand", "Niyyah", { rk: 1, d: "Its time is from sunrise until midday (Zuhr) on the day of Eid.", quote: "I pray two rak'at of the prayer of Eid al-Fitr (or al-Adha), qurbatan ilallah.", tag: "Obligatory" }), S("takbir", "Takbirat al-Ihram", Object.assign(say(P.takbir), { rk: 1, tag: "Pillar (rukn)" }))];
    [[1, 5], [2, 4]].forEach(([r, n]) => {
      if (r === 2) out.push(S("stand", "Stand for rak'at 2", Object.assign(say(P.bihawl), { rk: 2 })));
      out.push(S("stand", "Al-Fatiha and a sura", Object.assign(say(P.fatiha), { rk: r, d: r === 1 ? "Recite al-Fatiha and any sura. Surat al-A'la or al-Shams are recommended." : "Recite al-Fatiha and any sura. Surat al-Shams or al-Ghashiya are recommended.", tag: "Obligatory" })));
      for (let i = 1; i <= n; i++) {
        out.push(S("takbir", `Takbir ${i} of ${n}`, Object.assign(say(P.takbir), { rk: r, d: `Raise your hands and say Allahu Akbar.`, tag: "Part of the Eid prayer" })));
        out.push(S("qunut", `Qunut ${i} of ${n}`, { rk: r, ar: EID_QUNUT.ar, en: EID_QUNUT.en, d: "Any du'a is valid here; this is the recommended du'a for every qunut of Eid.", tag: "Part of the Eid prayer" }));
      }
      out.push(S("takbir", `Final takbir, then ruku'`, Object.assign(say(P.takbir), { rk: r, d: `After the ${n === 5 ? "fifth" : "fourth"} qunut, say one more Allahu Akbar and go to ruku'.` })));
      out.push(...rukuSteps(r));
    });
    out.push(S("sit", "Tashahhud", Object.assign(say(P.tashahhud), { rk: 2, tag: "Obligatory" })));
    out.push(S("sit", "Salam", Object.assign(say(P.salam), { rk: 2, d: "If prayed in congregation, the imam then gives two sermons.", tag: "Obligatory" })));
    return out;
  }

  /* ---------- Salat al-Mayyit ---------- */
  const MAYYIT = [
    S("stand", "Before you begin", { d: "The body lies on its back in front of you, with its head to your <b>right</b>, after its ghusl and kafan. Stand facing the qibla. Wudu is recommended, not required. There is no ruku', sajda, tashahhud or salam in this prayer.", quote: "I pray Salat al-Mayyit on this deceased, wajib, qurbatan ilallah.", tag: "Obligatory (wajib kifa'i)" }),
    S("takbir", "Takbir 1, then the shahada", { ar: "اللّٰهُ أَكْبَرُ ۞ أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللّٰهِ", tl: "Allahu Akbar. Ashhadu an la ilaha illallahu wa anna Muhammadan rasulullah.", en: "Allah is the Greatest. I bear witness that there is no god but Allah and that Muhammad is the Messenger of Allah.", tag: "Obligatory" }),
    S("takbir", "Takbir 2, then salawat", { ar: "اللّٰهُ أَكْبَرُ ۞ اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ", tl: "Allahu Akbar. Allahumma salli 'ala Muhammadin wa Ali Muhammad.", en: "Allah is the Greatest. O Allah, bless Muhammad and the family of Muhammad.", tag: "Obligatory" }),
    S("takbir", "Takbir 3, then du'a for all believers", { ar: "اللّٰهُ أَكْبَرُ ۞ اللّٰهُمَّ اغْفِرْ لِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ", tl: "Allahu Akbar. Allahummaghfir lil-mu'minina wal-mu'minat.", en: "Allah is the Greatest. O Allah, forgive the believing men and the believing women.", tag: "Obligatory" }),
    S("takbir", "Takbir 4, then du'a for this person", { ar: "اللّٰهُ أَكْبَرُ ۞ اللّٰهُمَّ اغْفِرْ لِهٰذَا الْمَيِّتِ", tl: "Allahu Akbar. Allahummaghfir li-hadhal-mayyit.", en: "Allah is the Greatest. O Allah, forgive this deceased.", d: "For a woman say: <i>Allahummaghfir li-hadhihil-mayyita</i> (اللّٰهُمَّ اغْفِرْ لِهٰذِهِ الْمَيِّتَةِ).", tag: "Obligatory" }),
    S("takbir", "Takbir 5: the prayer ends", Object.assign(say(P.takbir), { d: "Say the fifth Allahu Akbar. The prayer is complete; there is no salam.", tag: "Obligatory" }))
  ];

  /* ---------- Ghufayla & Wahsha ---------- */
  const GHUFAYLA = [
    S("stand", "Niyyah and takbir", Object.assign(say(P.takbir), { rk: 1, d: "Pray it between Maghrib and Isha, before the western redness has gone.", quote: "I pray two rak'at of Salat al-Ghufayla, recommended, qurbatan ilallah.", tag: "Recommended prayer" })),
    S("stand", "Rak'at 1: al-Fatiha, then these verses", { rk: 1, ar: "وَذَا النُّونِ إِذْ ذَهَبَ مُغَاضِبًا فَظَنَّ أَنْ لَنْ نَقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ ۞ فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ وَكَذٰلِكَ نُنْجِي الْمُؤْمِنِينَ", tl: "Wa dhan-nuni idh dhahaba mughadiban fazanna an lan naqdira 'alayhi fanada fiz-zulumati an la ilaha illa anta subhanaka inni kuntu minaz-zalimin. Fastajabna lahu wa najjaynahu minal-ghamm, wa kadhalika nunjil-mu'minin.", en: "And Dhul-Nun (Prophet Yunus), when he left in anger and thought We would not constrain him; then he called out in the darkness: There is no god but You, glory be to You, I have been of the wrongdoers. So We answered him and saved him from grief, and so We save the believers. (Qur'an 21:87-88)", tag: "Instead of a sura" }),
    ...rukuSteps(1),
    S("stand", "Rak'at 2: al-Fatiha, then this verse", { rk: 2, ar: "وَعِنْدَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ وَيَعْلَمُ مَا فِي الْبَرِّ وَالْبَحْرِ وَمَا تَسْقُطُ مِنْ وَرَقَةٍ إِلَّا يَعْلَمُهَا وَلَا حَبَّةٍ فِي ظُلُمَاتِ الْأَرْضِ وَلَا رَطْبٍ وَلَا يَابِسٍ إِلَّا فِي كِتَابٍ مُبِينٍ", tl: "Wa 'indahu mafatihul-ghaybi la ya'lamuha illa huwa, wa ya'lamu ma fil-barri wal-bahr, wa ma tasqutu min waraqatin illa ya'lamuha, wa la habbatin fi zulumatil-ardi wa la ratbin wa la yabisin illa fi kitabin mubin.", en: "With Him are the keys of the unseen; none knows them but He. He knows what is in the land and the sea. Not a leaf falls but He knows it, nor a grain in the darkness of the earth, nor anything fresh or dry, but it is in a clear Book. (Qur'an 6:59)", tag: "Instead of a sura" }),
    S("qunut", "Qunut of Ghufayla", { rk: 2, ar: "اللّٰهُمَّ إِنِّي أَسْأَلُكَ بِمَفَاتِحِ الْغَيْبِ الَّتِي لَا يَعْلَمُهَا إِلَّا أَنْتَ أَنْ تُصَلِّيَ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ وَأَنْ تَفْعَلَ بِي ...", tl: "Allahumma inni as'aluka bi-mafatihil-ghaybil-lati la ya'lamuha illa anta an tusalliya 'ala Muhammadin wa Ali Muhammad, wa an taf'ala bi ... (ask your need)", en: "O Allah, I ask You by the keys of the unseen which none knows but You, to bless Muhammad and the family of Muhammad, and to do for me ... (name your need).", d: "Then say: <i>Allahumma anta waliyyu ni'mati wal-qadiru 'ala talibati, ta'lamu hajati, fa-as'aluka bi-haqqi Muhammadin wa Alihi 'alayhi wa 'alayhimus-salam lamma qadaytaha li</i>: O Allah, You are the master of my blessings and able to grant my request; You know my need, so I ask You by the right of Muhammad and his family to fulfil it for me.", tag: "Recommended" }),
    ...rukuSteps(2),
    S("sit", "Tashahhud and salam", Object.assign(say(P.tashahhud), { rk: 2, d: "Finish with the tashahhud and salam.", tag: "Obligatory" }))
  ];
  const WAHSHA = [
    S("stand", "Niyyah and takbir", Object.assign(say(P.takbir), { rk: 1, d: "Pray it on the first night after the burial, ideally in the early part of the night. It is a gift to the deceased for the loneliest night of the grave.", quote: "I pray two rak'at of Salat al-Wahsha for (name), recommended, qurbatan ilallah.", tag: "Recommended prayer" })),
    S("stand", "Rak'at 1: al-Fatiha and Ayat al-Kursi", { rk: 1, ar: "اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ...", tl: "Allahu la ilaha illa huwal-Hayyul-Qayyum ...", en: "After al-Fatiha, recite Ayat al-Kursi once (2:255, many continue to the end of 2:257). Open it in the Qur'an tab.", tag: "Instead of a sura" }),
    ...rukuSteps(1),
    S("stand", "Rak'at 2: al-Fatiha and al-Qadr ×10", { rk: 2, ar: "إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ...", tl: "Inna anzalnahu fi laylatil-qadr ...", en: "After al-Fatiha, recite Surat al-Qadr (97) ten times.", tag: "Instead of a sura", count: 10 }),
    ...rukuSteps(2),
    S("sit", "Tashahhud and salam", Object.assign(say(P.tashahhud), { rk: 2, tag: "Obligatory" })),
    S("sit", "Gift it to the deceased", { rk: "after", ar: "اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ وَابْعَثْ ثَوَابَهَا إِلَىٰ قَبْرِ فُلَانٍ", tl: "Allahumma salli 'ala Muhammadin wa Ali Muhammad, wab'ath thawabaha ila qabri ... (name)", en: "O Allah, bless Muhammad and the family of Muhammad, and send its reward to the grave of ... (name).", tag: "After the prayer" })
  ];

  /* ---------- Salat al-Ihtiyat & Sajdat al-Sahw ---------- */
  const IHTIYAT = [
    S("stand", "Straight after the salam", { d: "Pray it immediately after the salam of the main prayer, without turning from the qibla or doing anything that breaks prayer. It is a separate prayer that may complete the missing part.", quote: "I pray one rak'at (or two) of Salat al-Ihtiyat, wajib, qurbatan ilallah.", tag: "Obligatory when needed" }),
    S("takbir", "Takbirat al-Ihram", Object.assign(say(P.takbir), { tag: "Pillar (rukn)" })),
    S("stand", "Al-Fatiha only, quietly", Object.assign(say(P.fatiha), { d: "Recite al-Fatiha quietly, the bismillah too (by precaution). No sura and no qunut.", tag: "Obligatory" })),
    ...rukuSteps(1).map(s => (delete s.rk, s)),
    S("sit", "Tashahhud and salam", Object.assign(say(P.tashahhud), { d: "If it is one rak'at, recite the tashahhud and salam now. If it is two rak'at, stand and pray the second exactly like the first, then the tashahhud and salam.", tag: "Obligatory" }))
  ];
  const SAHW_DHIKR = { ar: "بِسْمِ اللّٰهِ وَبِاللّٰهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ", tl: "Bismillahi wa billah, as-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh", en: "In the name of Allah and by Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings" };
  const SAHW = [
    S("sit", "When it is needed", { d: "Straight after the salam, for example when you spoke by mistake, said salam in the wrong place by mistake, forgot the tashahhud, or doubted between 4 and 5 after the second sajda. Your marja's risala lists every case.", quote: "I do two sajdas of sahw, wajib, qurbatan ilallah.", tag: "Obligatory when needed" }),
    S("sajda", "First sajda", Object.assign(say(SAHW_DHIKR), { tag: "Obligatory" })),
    S("sit", "Sit up", { d: "Sit up and be still." }),
    S("sajda", "Second sajda", Object.assign(say(SAHW_DHIKR), { tag: "Obligatory" })),
    S("sit", "Tashahhud and salam", Object.assign(say(P.tashahhud), { d: "Sit, recite the tashahhud, then say the last salam: <i>As-salamu 'alaykum wa rahmatullahi wa barakatuh</i>.", tag: "Obligatory" }))
  ];

  /* ---------- the menu ---------- */
  const NIY = (n, w = "wajib") => `I pray ${n}, ${w}, qurbatan ilallah (to come closer to Allah).`;

  /* ---------- purity: wudu, ghusl, tayammum ---------- */
  const W = (t, d, tag, quote) => S("water", t, { d, tag, quote });
  const WUDU = [
    W("Before you start", "The water must be pure (tahir) and permitted, and nothing on the skin may stop water reaching it: remove nail polish, paint, glue or a tight ring. Be free of najasa on the parts you wash.", "Condition"),
    W("Niyyah (intention)", "In your heart, intend to do wudu for the closeness of Allah. You do not have to say it aloud.", "Obligatory", "I do wudu, qurbatan ilallah."),
    W("Hands, mouth and nose", "Wash both hands, rinse the mouth three times and the nose three times.", "Recommended"),
    W("Wash the face", "From where the hair grows on the forehead down to the end of the chin, and as wide as the span between your thumb and middle finger. Pour the water with the right hand and wash <b>from top to bottom</b>. Once is obligatory, twice is allowed; never three times.", "Obligatory"),
    W("Wash the right arm", "From the elbow down to the fingertips, top to bottom, using the left hand. Begin a little above the elbow to be sure it is all washed.", "Obligatory"),
    W("Wash the left arm", "The same, from the elbow to the fingertips, using the right hand.", "Obligatory"),
    W("Masah of the head", "With the wetness left on the <b>right</b> hand, without taking new water, wipe the front part of the head (the quarter above the forehead), from top towards the forehead. Wiping the width of one finger is enough.", "Obligatory"),
    W("Masah of the right foot", "With the wetness on your right hand, wipe the top of the right foot from the tips of the toes up to the ankle joint.", "Obligatory"),
    W("Masah of the left foot", "With the wetness on your left hand, wipe the left foot the same way. By precaution, the right foot comes first.", "Obligatory"),
    W("Keep these rules", "<b>Order:</b> face, right arm, left arm, head, feet. <b>Continuity:</b> do not wait so long that the earlier parts dry before you finish. <b>Do it yourself</b> unless you are unable. The Qur'an: \"wash your faces and your hands up to the elbows, and wipe your heads and your feet up to the ankles\" (5:6).", "Obligatory"),
    W("What breaks wudu", "Urine, stool, passing wind, sleep that overcomes hearing and seeing, anything that takes away the mind (fainting, drunkenness), and anything that makes ghusl obligatory. Bleeding, vomiting or touching the private parts do <b>not</b> break wudu.", "Know this")
  ];
  const GHUSL = [
    W("When it is obligatory", "Janaba (after intercourse or discharge of semen); for women after hayd (menses), nifas (childbirth bleeding) and some cases of istihada; after touching a human corpse once it is cold and before its ghusl (mass al-mayyit); and the ghusl of the dead. Recommended: Friday, the two Eids, the Nights of Qadr.", "Know this"),
    W("Clean the body first", "Wash away any najasa from the body before starting, so the ghusl water stays pure.", "Condition"),
    W("Niyyah", "Intend the ghusl you are doing, for the closeness of Allah.", "Obligatory", "I do ghusl of janaba (or whichever), qurbatan ilallah."),
    W("1. Head and neck", "Wash the whole head and neck, making sure water reaches the skin under the hair.", "Obligatory"),
    W("2. The right side", "Wash the right half of the body, from the shoulder to the foot. Include a little of the left side to be sure.", "Obligatory"),
    W("3. The left side", "Wash the left half of the body the same way. Water must reach every part of the skin.", "Obligatory"),
    W("Or: irtimasi (immersion)", "Instead of the three parts, with niyyah you may immerse the whole body in water at once, so that water reaches all of it.", "Allowed"),
    W("After ghusl", "The ghusl of janaba replaces wudu, so you may pray without wudu. For other ghusls, follow your marja's ruling on whether wudu is also needed.", "Know this")
  ];
  const TAYAMMUM = [
    W("When to do it", "When there is no water, when using water would harm you (illness, wounds), or when there is not enough time for wudu or ghusl before the prayer time ends. Tayammum can replace either.", "Know this"),
    W("Niyyah", "Intend tayammum in place of wudu (or of ghusl), for the closeness of Allah.", "Obligatory", "I do tayammum in place of wudu, qurbatan ilallah."),
    W("Strike the earth", "Strike both palms together on clean earth, sand, a stone or a clay brick. It must be pure and permitted.", "Obligatory"),
    W("Wipe the forehead", "With both palms, wipe the forehead from where the hair grows down to the eyebrows and the top of the nose.", "Obligatory"),
    W("Wipe the right hand", "With the left palm, wipe the back of the right hand from the wrist to the fingertips.", "Obligatory"),
    W("Wipe the left hand", "With the right palm, wipe the back of the left hand from the wrist to the fingertips.", "Obligatory"),
    W("Strike again (precaution)", "By precaution, strike the earth once more and wipe the backs of both hands again, as above.", "Precaution"),
    W("Afterwards", "Tayammum is broken by whatever breaks wudu (or makes ghusl obligatory), and as soon as the excuse ends, for example when water becomes available.", "Know this")
  ];

  const LIST = [
    { g: "Purity", id: "wudu", name: "Wudu", sub: "Step by step", ar: "الْوُضُوء", facts: [["Washed", "Face, right arm, left arm"], ["Wiped", "Front of the head, then the feet"], ["Needed for", "Every prayer, tawaf, touching the Qur'an's writing"]], build: () => WUDU },
    { g: "Purity", id: "ghusl", name: "Ghusl", sub: "Full bath", ar: "الْغُسْل", facts: [["Order", "Head & neck, right side, left side"], ["Or", "Immersion (irtimasi)"], ["Janaba ghusl", "Replaces wudu"]], build: () => GHUSL },
    { g: "Purity", id: "tayammum", name: "Tayammum", sub: "Without water", ar: "التَّيَمُّم", facts: [["Instead of", "Wudu or ghusl"], ["On", "Clean earth, sand or stone"], ["Wiped", "Forehead, backs of the hands"]], build: () => TAYAMMUM },
    { g: "Daily", id: "fajr", name: "Fajr", ar: "صَلَاةُ الصُّبْح", rk: 2, map: [2], facts: [["Rak'at", "2"], ["Time", "From true dawn until sunrise"], ["Recite", "Aloud (men)"], ["Before it", "2 rak'at nafila"]], build: () => dailySteps({ rk: 2, loud: true, niyyah: NIY("two rak'at of Fajr") }) },
    { g: "Daily", id: "zuhr", name: "Zuhr", ar: "صَلَاةُ الظُّهْر", rk: 4, map: [2, 2], facts: [["Rak'at", "4"], ["Time", "From midday until sunset (shared with Asr; Zuhr first)"], ["Recite", "Quietly"], ["Before it", "8 rak'at nafila"]], build: () => dailySteps({ rk: 4, loud: false, niyyah: NIY("four rak'at of Zuhr") }) },
    { g: "Daily", id: "asr", name: "Asr", ar: "صَلَاةُ الْعَصْر", rk: 4, map: [2, 2], facts: [["Rak'at", "4"], ["Time", "After Zuhr, until sunset"], ["Recite", "Quietly"], ["Before it", "8 rak'at nafila"]], build: () => dailySteps({ rk: 4, loud: false, niyyah: NIY("four rak'at of Asr") }) },
    { g: "Daily", id: "maghrib", name: "Maghrib", ar: "صَلَاةُ الْمَغْرِب", rk: 3, map: [2, 1], facts: [["Rak'at", "3"], ["Time", "After sunset, once the eastern redness has gone, until midnight (shared with Isha)"], ["Recite", "First two rak'at aloud (men)"], ["After it", "4 rak'at nafila"]], build: () => dailySteps({ rk: 3, loud: true, niyyah: NIY("three rak'at of Maghrib") }) },
    { g: "Daily", id: "isha", name: "Isha", ar: "صَلَاةُ الْعِشَاء", rk: 4, map: [2, 2], facts: [["Rak'at", "4"], ["Time", "After Maghrib, until midnight"], ["Recite", "First two rak'at aloud (men)"], ["After it", "Al-Watira: 2 rak'at sitting"]], build: () => dailySteps({ rk: 4, loud: true, niyyah: NIY("four rak'at of Isha") }) },
    { g: "Night", id: "layl", name: "Salat al-Layl", sub: "Tahajjud", ar: "صَلَاةُ اللَّيْل", special: "layl" },
    { g: "Night", id: "nafila", name: "Daily nafila", sub: "34 rak'at", ar: "النَّوَافِل", special: "nafila", build: () => nafila2("nafila", "I pray two rak'at of the nafila of (Fajr / Zuhr / Asr / Maghrib), recommended, qurbatan ilallah.") },
    { g: "After prayer", id: "ziyarat-after", name: "Ziyarat after namaz", sub: "Stand, salam, sajda", ar: "زِيَارَةُ عَاشُورَاء", special: "afterz" },
    { g: "Special", id: "ayat", name: "Salat al-Ayat", sub: "Eclipse, earthquake", ar: "صَلَاةُ الْآيَات", facts: [["Rak'at", "2, each with 5 ruku'"], ["When", "Solar or lunar eclipse, earthquake, and (by precaution) any heavenly event that frightens most people"], ["Time", "As soon as it begins; for an eclipse, do not delay until it starts to clear"], ["Ruling", "Obligatory; if missed, make it up"]], intro: "There are two ways. <b>Full way:</b> before each of the ten ruku' recite al-Fatiha and a complete sura. <b>Short way</b> (shown below): in each rak'at recite al-Fatiha once, then split one sura into five parts, one part before each ruku'.", build: ayatSteps },
    { g: "Special", id: "jumua", name: "Jumu'a", sub: "Friday prayer", ar: "صَلَاةُ الْجُمُعَة", special: "jumua" },
    { g: "Special", id: "eid", name: "Eid prayer", sub: "Fitr & Adha", ar: "صَلَاةُ الْعِيد", facts: [["Rak'at", "2, with 9 qunuts (5 + 4)"], ["Time", "Sunrise until midday on Eid day"], ["Ruling", "In the Occultation: recommended; alone or in congregation"], ["Before it", "Ghusl; on Eid al-Fitr, pay Zakat al-Fitra"]], build: eidSteps },
    { g: "Special", id: "ghufayla", name: "Ghufayla", sub: "Between Maghrib & Isha", ar: "صَلَاةُ الْغُفَيْلَة", facts: [["Rak'at", "2"], ["Time", "Between Maghrib and Isha"], ["Ruling", "Highly recommended; a way to ask for your needs"]], build: () => GHUFAYLA },
    { g: "Special", id: "wahsha", name: "Salat al-Wahsha", sub: "First night in the grave", ar: "صَلَاةُ الْوَحْشَة", facts: [["Rak'at", "2"], ["Time", "The first night after burial"], ["Ruling", "Recommended; a gift to the deceased"]], build: () => WAHSHA },
    { g: "Special", id: "mayyit", name: "Salat al-Mayyit", sub: "Funeral prayer", ar: "صَلَاةُ الْمَيِّت", facts: [["Takbirs", "5"], ["Ruling", "Obligatory on the community for every Muslim who has reached six years"], ["Wudu", "Not required"], ["No", "Ruku', sajda, tashahhud or salam"]], build: () => MAYYIT },
    { g: "Rules", id: "doubts", name: "Doubts (shakk)", ar: "الشَّكّ", special: "doubts" },
    { g: "Rules", id: "ihtiyat", name: "Salat al-Ihtiyat", sub: "Precautionary prayer", ar: "صَلَاةُ الِاحْتِيَاط", facts: [["Rak'at", "1 or 2, as the doubt requires"], ["Recite", "Al-Fatiha only, quietly"], ["No", "Sura or qunut"]], build: () => IHTIYAT },
    { g: "Rules", id: "sahw", name: "Sajdat al-Sahw", sub: "Sajdas of forgetfulness", ar: "سَجْدَتَا السَّهْو", facts: [["What", "Two sajdas after the salam"], ["No", "Takbir needed"]], build: () => SAHW },
    { g: "Rules", id: "qada", name: "Qada", sub: "Missed prayers", ar: "الْقَضَاء", special: "qada" },
    { g: "Rules", id: "before", name: "Before you pray", sub: "Checklist", ar: "الشُّرُوط", special: "before" }
  ];

  /* ---------- posture figures ---------- */
  const POSE = {
    stand: '<circle cx="32" cy="11" r="5"/><path d="M32 17v21M32 38l-4 20M32 38l4 20M32 21l-5 15M32 21l5 15"/>',
    takbir: '<circle cx="32" cy="11" r="5"/><path d="M32 17v21M32 38l-4 20M32 38l4 20M32 22l-8-3 1-11M32 22l8-3-1-11"/>',
    qunut: '<circle cx="32" cy="11" r="5"/><path d="M32 17v21M32 38l-4 20M32 38l4 20M32 21l-10 7v-11M32 21l10 7v-11"/>',
    ruku: '<circle cx="15" cy="26" r="5"/><path d="M20 27h22M42 27l-1 16 1 15M23 28l17 14"/>',
    sajda: '<circle cx="12" cy="51" r="5"/><path d="M17 49l21-14M38 35l3 22h15M21 47l1 10M4 60h56"/>',
    sit: '<circle cx="25" cy="17" r="5"/><path d="M25 23l2 22M27 45l20 6M47 54H26M26 27l14 19M4 58h56"/>'
  };
  POSE.water = '<path d="M32 8C25 21 18 30 18 40a14 14 0 0 0 28 0c0-10-7-19-14-32z"/><path d="M26 42a6 6 0 0 0 6 6"/>';
  const fig = p => `<svg class="ng-fig" viewBox="0 0 64 64" aria-hidden="true">${POSE[p] || POSE.stand}</svg>`;

  /* ---------- render ---------- */
  let cur = null, steps = [], idx = 0, mode = store.get("abp-ng-mode", "guide"), counts = {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function stepHTML(s, i, full) {
    const rkLabel = s.rk === "after" ? "After the prayer" : s.rk ? `Rak'at ${s.rk}` : "";
    const cnt = s.count ? `<button class="ng-count" data-ci="${i}"><b>${counts[i] || 0}</b> / ${s.count}<small>Tap to count</small></button>` : "";
    return `<div class="ng-step${full ? " full" : ""}">
      <div class="ng-s-top">${fig(s.pose)}<div><small>${rkLabel}${full ? ` · Step ${i + 1} of ${steps.length}` : ""}</small><h4>${esc(s.t)}</h4>${s.tag ? `<span class="ng-tag ${/Recommended|Optional/.test(s.tag) ? "rec" : ""}">${esc(s.tag)}</span>` : ""}</div></div>
      ${s.d ? `<p class="ng-d">${s.d}</p>` : ""}
      ${s.quote ? `<p class="ng-q">“${esc(s.quote)}”</p>` : ""}
      ${s.ar ? `<p class="ng-ar" dir="rtl" lang="ar">${s.ar}</p>` : ""}
      ${s.tl ? `<p class="ng-tl">${esc(s.tl)}</p>` : ""}
      ${s.en ? `<p class="ng-en">${esc(s.en)}</p>` : ""}
      ${cnt}
    </div>`;
  }
  function rakMap(m) {
    if (!m) return "";
    const parts = []; let n = 0;
    m.forEach((g, gi) => { for (let k = 0; k < g; k++) parts.push(`<span class="rk">${++n}</span>`); parts.push(`<span class="rk-t">${gi === m.length - 1 ? "Tashahhud + Salam" : "Tashahhud"}</span>`); });
    return `<div class="ng-map">${parts.join("")}</div>`;
  }
  function factsHTML(it) {
    return `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">${it.ar}</p><h3>${esc(it.name)}${it.sub ? ` <small>${esc(it.sub)}</small>` : ""}</h3>
      ${it.facts ? `<dl class="ng-facts">${it.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join("")}</dl>` : ""}${rakMap(it.map)}${it.intro ? `<p class="ng-intro">${it.intro}</p>` : ""}</div>`;
  }
  function stepperHTML(title) {
    return `<div class="ng-modebar"><div class="q-seg"><button data-m="guide" class="${mode === "guide" ? "on" : ""}">Guide me</button><button data-m="all" class="${mode === "all" ? "on" : ""}">All steps</button></div>${title ? `<span class="ng-mt">${title}</span>` : ""}</div>
      <div class="ng-stage" id="ngStage"></div>`;
  }
  function drawStage() {
    const st = $("#ngStage"); if (!st) return;
    if (mode === "all") {
      let last = null, html = "";
      steps.forEach((s, i) => { if (s.rk && s.rk !== last) { html += `<p class="ng-rkh">${s.rk === "after" ? "After the prayer" : "Rak'at " + s.rk}</p>`; last = s.rk; } html += stepHTML(s, i, false); });
      st.innerHTML = html;
    } else {
      idx = Math.max(0, Math.min(idx, steps.length - 1));
      st.innerHTML = `<div class="ng-prog"><i style="width:${((idx + 1) / steps.length) * 100}%"></i></div>${stepHTML(steps[idx], idx, true)}
        <div class="ng-nav"><button class="ng-prev" ${idx === 0 ? "disabled" : ""}>Back</button><button class="ng-next">${idx === steps.length - 1 ? "Start again" : "Next step"}</button></div>`;
      $(".ng-prev", st).onclick = () => { idx--; drawStage(); st.scrollIntoView({ block: "nearest" }); };
      $(".ng-next", st).onclick = () => { idx = idx === steps.length - 1 ? 0 : idx + 1; drawStage(); const top = st.getBoundingClientRect().top; if (top < 70) window.scrollBy(0, top - 80); };
    }
    $$(".ng-count", st).forEach(b => b.onclick = () => {
      const i = +b.dataset.ci, max = steps[i].count; counts[i] = ((counts[i] || 0) + 1);
      if (counts[i] > max) counts[i] = 0;
      $("b", b).textContent = counts[i]; b.classList.toggle("done", counts[i] === max);
      if (counts[i] === max && navigator.vibrate) try { navigator.vibrate(60); } catch { /* ignore */ }
    });
  }
  function bindModes(root) {
    $$(".ng-modebar [data-m]", root).forEach(b => b.onclick = () => { mode = b.dataset.m; store.set("abp-ng-mode", mode); $$(".ng-modebar [data-m]", root).forEach(x => x.classList.toggle("on", x === b)); drawStage(); });
  }
  function useSteps(arr, root) { steps = arr; idx = 0; counts = {}; bindModes(root); drawStage(); }

  /* ---------- special pages ---------- */
  function laylPage(body) {
    const nightKey = new Date(Date.now() - 12 * 3600e3).toISOString().slice(0, 10);
    let rec = store.get("abp-layl", {}); if (rec.n !== nightKey) rec = { n: nightKey, d: [] };
    const parts = [["1st", "2 rak'at", "Salat al-Layl"], ["2nd", "2 rak'at", "Salat al-Layl"], ["3rd", "2 rak'at", "Salat al-Layl"], ["4th", "2 rak'at", "Salat al-Layl"], ["Shaf'", "2 rak'at", "al-Shaf'"], ["Witr", "1 rak'at", "al-Witr"]];
    body.innerHTML = `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">صَلَاةُ اللَّيْل</p><h3>Salat al-Layl <small>Tahajjud, the night prayer</small></h3>
      <dl class="ng-facts"><div><dt>Rak'at</dt><dd>11: eight of Layl (four 2-rak'at prayers), two of Shaf', one of Witr</dd></div><div><dt>Time</dt><dd>From midnight until true dawn. Best: the last third of the night, close to Fajr</dd></div><div><dt>Ruling</dt><dd>Highly recommended (mustahab mu'akkad)</dd></div></dl>
      <p class="ng-intro">The Qur'an says: <i>"And in part of the night, pray Tahajjud as an extra for you; perhaps your Lord will raise you to a praiseworthy station"</i> (17:79). Imam al-Sadiq said: <i>"Salat al-Layl brightens the face, sweetens the breath and brings sustenance"</i>, and <i>"He is not of us who does not pray the night prayer."</i></p></div>
      <div class="ng-card"><h4 class="ng-h">Tonight's progress</h4><div class="ng-layl">${parts.map((p, i) => `<button class="${rec.d[i] ? "on" : ""}" data-li="${i}"><b>${p[0]}</b><small>${p[1]}</small><span>${p[2]}</span></button>`).join("")}</div><p class="ng-small" id="ngLaylMsg"></p></div>
      <div class="ng-card"><h4 class="ng-h">How to pray it</h4>
      <ol class="ng-ol"><li><b>Wake up</b> before Fajr, make wudu. It is recommended to look at the sky and recite the last verses of Surat Al 'Imran (3:190-194).</li>
      <li><b>Eight rak'at</b> as four prayers of 2 rak'at, each one just like Fajr: niyyah, takbir, al-Fatiha (a sura is optional), qunut in the 2nd rak'at, ruku', sajdas, tashahhud, salam.</li>
      <li><b>Two rak'at of al-Shaf'</b>, prayed the same way. Many scholars say to make its qunut only with the hope of reward (raja'), or leave it; follow your marja'.</li>
      <li><b>One rak'at of al-Witr</b> with the long qunut. It is shown step by step below, with counters.</li>
      <li>After it, the Tasbih of Lady Fatima, your own du'as and istighfar until Fajr.</li></ol>
      <h4 class="ng-h">Easier ways</h4><ul class="ng-ol"><li>Short on time? Pray just the <b>Shaf' and Witr</b> (3 rak'at), or even the Witr alone.</li><li>You may pray it <b>sitting</b>; a sura is not needed in nafila; and you may read the qunut from your phone.</li><li>Fear you will not wake? Some maraji' allow praying it before midnight; making it up (qada) later is better. Check your marja'.</li></ul></div>
      <div class="ng-card"><div class="ng-pick2"><button data-p="layl2" class="on">2 rak'at of Layl</button><button data-p="shaf">Shaf'</button><button data-p="witr">Witr</button></div>${stepperHTML("")}</div>`;
    const msg = () => { const n = rec.d.filter(Boolean).length; $("#ngLaylMsg").textContent = n === 6 ? "Masha'Allah, all 11 rak'at done tonight. May Allah accept it." : n ? `${n} of 6 parts done tonight. Tap each part when you finish it.` : "Tap each part as you finish it. It resets for the next night."; };
    msg();
    $$(".ng-layl button", body).forEach(b => b.onclick = () => { const i = +b.dataset.li; rec.d[i] = !rec.d[i]; store.set("abp-layl", rec); b.classList.toggle("on", !!rec.d[i]); msg(); });
    const sets = {
      layl2: () => nafila2("Salat al-Layl", "I pray two rak'at of Salat al-Layl, recommended, qurbatan ilallah."),
      shaf: () => nafila2("al-Shaf'", "I pray two rak'at of al-Shaf', recommended, qurbatan ilallah.").filter(s => s.pose !== "qunut"),
      witr: () => WITR
    };
    $$(".ng-pick2 button", body).forEach(b => b.onclick = () => { $$(".ng-pick2 button", body).forEach(x => x.classList.toggle("on", x === b)); useSteps(sets[b.dataset.p](), body); });
    useSteps(sets.layl2(), body);
  }

  function infoPage(body, html) { body.innerHTML = html; }

  const DOUBTS = [
    ["2 or 3", "after the 2nd sajda", "Take it as 3, pray the 4th, finish.", "1 rak'at standing (or 2 sitting)"],
    ["2 or 4", "after the 2nd sajda", "Take it as 4, finish.", "2 rak'at standing"],
    ["2, 3 or 4", "after the 2nd sajda", "Take it as 4, finish.", "2 rak'at standing, then 2 rak'at sitting"],
    ["4 or 5", "after the 2nd sajda", "Take it as 4, finish.", "2 Sajdat al-Sahw"],
    ["3 or 4", "at any point", "Take it as 4, finish.", "1 rak'at standing (or 2 sitting)"],
    ["4 or 5", "while standing", "Sit down at once, tashahhud, salam.", "1 rak'at standing (or 2 sitting)"],
    ["3 or 5", "while standing", "Sit down at once, tashahhud, salam.", "2 rak'at standing"],
    ["3, 4 or 5", "while standing", "Sit down at once, tashahhud, salam.", "2 rak'at standing, then 2 rak'at sitting"],
    ["5 or 6", "while standing", "Sit down at once, tashahhud, salam.", "2 Sajdat al-Sahw"]
  ];

  function special(it, body) {
    if (it.special === "layl") return laylPage(body);
    if (it.special === "nafila") {
      body.innerHTML = `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">النَّوَافِل الْيَوْمِيَّة</p><h3>The daily nafila <small>34 rak'at</small></h3>
        <table class="facts ng-tbl"><tr><td>Nafila of Fajr</td><td><b>2</b> · before Fajr; from Salat al-Layl's time until sunrise</td></tr><tr><td>Nafila of Zuhr</td><td><b>8</b> · before Zuhr, in 2-rak'at prayers</td></tr><tr><td>Nafila of Asr</td><td><b>8</b> · before Asr, in 2-rak'at prayers</td></tr><tr><td>Nafila of Maghrib</td><td><b>4</b> · after Maghrib, as two 2-rak'at prayers</td></tr><tr><td>Al-Watira</td><td><b>2 sitting</b> (counted as 1) · after Isha</td></tr><tr><td>Salat al-Layl</td><td><b>11</b> · the night prayer</td></tr></table>
        <p class="ng-intro">17 obligatory + 34 recommended = <b>51 rak'at</b>. Imam al-Askari counted praying 51 rak'at a day among the five signs of a believer. Every nafila is prayed in 2s, like Fajr, with no adhan or iqama. A sura after al-Fatiha is not required, and you may pray it sitting.</p></div>
        <div class="ng-card">${stepperHTML("Any 2-rak'at nafila")}</div>`;
      return useSteps(it.build(), body);
    }
    if (it.special === "afterz") return infoPage(body, `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللّٰه</p><h3>Ziyarat after namaz <small>what happens in the mosque after the jama'at</small></h3></div>
      <div class="ng-card"><h4 class="ng-h">What you are seeing</h4>
      <p>In many Shia mosques, after the congregational prayer (and every day in Muharram), everyone stands and the reciter leads <b>Ziyarat Ashura</b> or a shorter <b>salam to Imam Husayn (AS)</b>. At the end, everyone goes down into one <b>sajda</b>.</p>
      <ul class="ng-ol">
        <li><b>Why stand?</b> A ziyarat is a greeting. You stand to greet the Imam, as you would stand for an honoured guest. Many turn toward Karbala; Imam al-Sadiq (AS) taught that greeting Husayn from afar, facing toward his grave, is like visiting him.</li>
        <li><b>Is it part of namaz?</b> No. Your namaz is complete at the salam. This is a recommended act (mustahab). You can join in, or sit quietly; both are fine.</li>
        <li><b>Why the sajda?</b> Ziyarat Ashura itself ends with a sajda of thanks and grief, taught by Imam al-Baqir (AS). The words are below.</li>
      </ul></div>
      <div class="ng-card"><h4 class="ng-h">The order, step by step</h4><ol class="ng-ol">
        <li><b>Stand</b> after the namaz and its tasbih.</li>
        <li><b>The opening salaams:</b> "As-salamu 'alayka ya Aba 'Abdillah…" (Peace be upon you, O Aba Abdillah). <a href="#lib/ziyarat/ashura">Full text</a></li>
        <li><b>The middle part</b> asks Allah to distance from His mercy those who killed Imam Husayn and oppressed the Ahl al-Bayt. This is <i>bara'a</i>: turning away from oppression.</li>
        <li><b>The salam</b> below. In the full ziyarat it is said 100 times; in the mosque it is often said once or a few times.</li>
        <li><b>The sajda:</b> everyone goes down and recites the words below, then rises.</li>
        <li>Many then say <b>"Ya Husayn"</b> and the short salam: "As-salamu 'alayka ya Aba 'Abdillah, la'anallahu qatilak."</li>
      </ol></div>
      <div class="ng-card"><h4 class="ng-h">The salam</h4>
      <p class="ng-ar" dir="rtl" lang="ar">السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللّٰهِ، وَعَلَى الْأَرْوَاحِ الَّتِي حَلَّتْ بِفِنَائِكَ، عَلَيْكَ مِنِّي سَلَامُ اللّٰهِ أَبَدًا مَا بَقِيتُ وَبَقِيَ اللَّيْلُ وَالنَّهَارُ، وَلَا جَعَلَهُ اللّٰهُ آخِرَ الْعَهْدِ مِنِّي لِزِيَارَتِكُمْ. السَّلَامُ عَلَى الْحُسَيْنِ، وَعَلَىٰ عَلِيِّ بْنِ الْحُسَيْنِ، وَعَلَىٰ أَوْلَادِ الْحُسَيْنِ، وَعَلَىٰ أَصْحَابِ الْحُسَيْنِ</p>
      <p><i>As-salamu 'alayka ya Aba 'Abdillah, wa 'alal-arwahil-lati hallat bi-fina'ik. 'Alayka minni salamullahi abadan ma baqitu wa baqiyal-laylu wan-nahar, wa la ja'alahullahu akhiral-'ahdi minni li-ziyaratikum. As-salamu 'alal-Husayn, wa 'ala 'Aliyyibnil-Husayn, wa 'ala awladil-Husayn, wa 'ala ashabil-Husayn.</i></p>
      <p>Peace be upon you, O Aba Abdillah, and upon the souls that came to rest beside you. Upon you be the peace of Allah from me forever, as long as I live and night and day remain, and may Allah not make this my last visit to you. Peace be upon al-Husayn, upon Ali son of al-Husayn, upon the children of al-Husayn, and upon the companions of al-Husayn.</p></div>
      <div class="ng-card"><h4 class="ng-h">The sajda at the end</h4>
      <p class="ng-ar" dir="rtl" lang="ar">اللّٰهُمَّ لَكَ الْحَمْدُ حَمْدَ الشَّاكِرِينَ لَكَ عَلَىٰ مُصَابِهِمْ، الْحَمْدُ لِلّٰهِ عَلَىٰ عَظِيمِ رَزِيَّتِي، اللّٰهُمَّ ارْزُقْنِي شَفَاعَةَ الْحُسَيْنِ يَوْمَ الْوُرُودِ، وَثَبِّتْ لِي قَدَمَ صِدْقٍ عِنْدَكَ مَعَ الْحُسَيْنِ وَأَصْحَابِ الْحُسَيْنِ الَّذِينَ بَذَلُوا مُهَجَهُمْ دُونَ الْحُسَيْنِ عَلَيْهِ السَّلَامُ</p>
      <p><i>Allahumma lakal-hamdu hamdash-shakirina laka 'ala musabihim. Al-hamdu lillahi 'ala 'azimi raziyyati. Allahummar-zuqni shafa'atal-Husayni yawmal-wurud, wa thabbit li qadama sidqin 'indaka ma'al-Husayni wa ashabil-Husaynil-ladhina badhalu muhajahum dunal-Husayni 'alayhis-salam.</i></p>
      <p>O Allah, Yours is the praise of those who thank You in their affliction. Praise be to Allah for my great grief. O Allah, grant me the intercession of al-Husayn on the Day of Arrival, and keep my foot firm in truth with You, with al-Husayn and the companions of al-Husayn, who gave their lives for al-Husayn, peace be upon him.</p></div>
      <div class="ng-card"><h4 class="ng-h">Standing at the name of Imam al-Mahdi (AS)</h4>
      <p>In a majlis or du'a, when the reciter says <b>"al-Qa'im"</b> (a title of Imam al-Mahdi), many people stand up and place their right hand on their head, as a pledge of readiness for him. It is a respected custom, not an obligation.</p></div>`);
    if (it.special === "jumua") return infoPage(body, `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">صَلَاةُ الْجُمُعَة</p><h3>Salat al-Jumu'a <small>Friday prayer</small></h3>
      <dl class="ng-facts"><div><dt>Rak'at</dt><dd>2, in congregation, in place of Zuhr</dd></div><div><dt>Before it</dt><dd>Two sermons (khutbas) by the imam</dd></div><div><dt>Ruling</dt><dd>In the Occultation most maraji' hold it is optional (wajib takhyiri): pray Jumu'a or Zuhr</dd></div></dl></div>
      <div class="ng-card"><h4 class="ng-h">How it differs</h4><ul class="ng-ol"><li>Recite al-Fatiha and a sura <b>aloud</b>. Surat al-Jumu'a in the 1st rak'at and al-Munafiqun in the 2nd are recommended.</li><li>It has <b>two qunuts</b>: in the 1st rak'at before ruku', and in the 2nd rak'at <b>after</b> ruku'.</li><li>Follow the imam in every action; do not go ahead of him.</li><li>If you miss Jumu'a, pray the normal 4 rak'at of Zuhr.</li></ul>
      <h4 class="ng-h">Sunnahs of Friday</h4><ul class="ng-ol"><li>Ghusl al-Jumu'a (from dawn until Zuhr, the best near Zuhr).</li><li>Cut your nails, wear clean clothes and perfume.</li><li>Recite Surat al-Kahf, Du'a Kumayl on Thursday night and Du'a al-Nudba on Friday morning.</li><li>Send salawat in abundance and remember the Imam of the Time; Friday is his day.</li></ul></div>`);
    if (it.special === "doubts") return infoPage(body, `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">الشَّكّ فِي الصَّلَاة</p><h3>Doubts in prayer <small>shakk</small></h3>
      <p class="ng-intro">First <b>think for a moment</b>. If you become more sure of one number, act on it. Use this table only when the doubt stays.</p></div>
      <div class="ng-card"><h4 class="ng-h">These doubts make the prayer void: start again</h4><ul class="ng-ol"><li>Any doubt about the number of rak'at in a <b>2-rak'at</b> prayer (Fajr, Jumu'a, a traveller's prayer) or in <b>Maghrib</b>.</li><li>A doubt between <b>1 and more</b>.</li><li>A doubt in a 4-rak'at prayer <b>before finishing the second sajda</b> of the 2nd rak'at.</li><li>Not knowing at all how many rak'at you have prayed.</li></ul></div>
      <div class="ng-card"><h4 class="ng-h">The nine doubts you can fix (4-rak'at prayers)</h4><div class="ng-dt">${DOUBTS.map(d => `<div class="ng-drow"><p class="ng-dq">Between <b>${d[0]}</b> <small>${d[1]}</small></p><p>${d[2]}</p><p class="ng-dfix">Then: ${d[3]}</p></div>`).join("")}</div>
      <p class="ng-small">"Then" means pray Salat al-Ihtiyat (or Sajdat al-Sahw) straight after the salam. Both are in this guide.</p></div>
      <div class="ng-card"><h4 class="ng-h">Doubts you ignore</h4><ul class="ng-ol"><li>A doubt <b>after the salam</b>, or after the prayer's time has passed.</li><li>A doubt about a part you have already passed (for example about ruku' when you are already in sajda).</li><li>If you doubt very often (kathir al-shakk), ignore it.</li><li>In <b>nafila</b>, you may take the lower or the higher number; the lower is better.</li><li>In congregation, the imam and the followers rely on each other when one of them is sure.</li></ul><p class="ng-small">This follows the common rulings (for example Sayyid al-Sistani). Details differ slightly between maraji'; check your marja's risala.</p></div>`);
    if (it.special === "qada") return infoPage(body, `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">قَضَاءُ الصَّلَوَات</p><h3>Qada <small>making up missed prayers</small></h3>
      <p class="ng-intro">Every missed obligatory prayer must be made up, whether it was missed by forgetting, sleeping or neglect. Allah is Merciful: start today and be steady.</p></div>
      <div class="ng-card"><h4 class="ng-h">How</h4><ul class="ng-ol"><li>Pray it exactly like the missed prayer: same rak'at, aloud or quiet in the same way. A prayer missed while travelling is made up as 2 rak'at, even at home.</li><li>Niyyah: <i>"I pray two rak'at qada of Fajr, wajib, qurbatan ilallah."</i></li><li>You may pray qada at any time of day or night.</li><li>For prayers of the same day, keep Zuhr before Asr and Maghrib before Isha. Otherwise the order between days is not required by most maraji'.</li><li>Not sure how many you missed? Pray the number you are sure of; more is better.</li></ul>
      <h4 class="ng-h">A simple plan</h4><table class="facts ng-tbl"><tr><td>Gentle</td><td>One qada prayer after each daily prayer · 5 a day</td></tr><tr><td>Steady</td><td>One full day of qada (17 rak'at) each day</td></tr><tr><td>Strong</td><td>Two days of qada each day</td></tr></table>
      <p class="ng-small">Use the rak'at counter on the Prayer tab so you never lose count. The Prophet ﷺ said: the most beloved deeds to Allah are the steady ones, even if small.</p></div>`);
    if (it.special === "before") return infoPage(body, `<div class="ng-card ng-sum"><p class="ng-sum-ar" dir="rtl" lang="ar">شُرُوطُ الصَّلَاة</p><h3>Before you pray <small>checklist</small></h3></div>
      <div class="ng-card"><ul class="ng-check">
      <li><b>It is the right time.</b> Check today's times on the Prayer tab.</li>
      <li><b>You have wudu</b> (or ghusl, or tayammum when water cannot be used). <a href="#lesson/wudu">Wudu step by step</a></li>
      <li><b>Body and clothes are pure (tahir).</b> No urine, blood or other najasa on them.</li>
      <li><b>Clothes and place are permitted.</b> Not stolen or used without permission.</li>
      <li><b>Covering.</b> Men at least the private parts (better navel to knee). Women the whole body except the face, the hands to the wrists and the feet to the ankles.</li>
      <li><b>Men:</b> no gold, and no pure silk.</li>
      <li><b>Facing the qibla.</b> Use the Qibla compass.</li>
      <li><b>A turbah</b> or something from the earth that is not eaten or worn, for the forehead in sajda.</li>
      <li><b>Adhan and iqama</b> before the daily prayers are highly recommended. <a href="#lesson/adhan-jumua-nafila">The words</a></li>
      </ul></div>
      <div class="ng-card"><h4 class="ng-h">What breaks the prayer</h4><ul class="ng-ol"><li>Losing wudu, turning away from the qibla, talking, laughing aloud, eating or drinking.</li><li>Adding or missing a pillar (rukn): niyyah, takbirat al-ihram, the standing at takbir and before ruku', ruku', or both sajdas of one rak'at, even by mistake.</li><li>By precaution: folding the arms, and saying "Amin" after al-Fatiha.</li></ul></div>`);
  }

  function select(id) {
    const it = LIST.find(x => x.id === id) || LIST[0];
    cur = it.id; store.set("abp-ng", cur);
    $$("#ngPicks button").forEach(b => b.classList.toggle("on", b.dataset.id === cur));
    const body = $("#ngBody");
    if (it.special) special(it, body);
    else { body.innerHTML = factsHTML(it) + `<div class="ng-card">${stepperHTML(`${it.build().length} steps`)}</div>`; useSteps(it.build(), body); }
    const src = $("#ngSrc"); if (src) src.innerHTML = typeof NAMAZ_SRC !== "undefined" && NAMAZ_SRC[cur] ? `<b>Sources:</b> ${esc(NAMAZ_SRC[cur])}` : "";
    const btn = $(`#ngPicks button[data-id="${cur}"]`); if (btn) btn.scrollIntoView({ block: "nearest", inline: "center" });
  }

  let built = false;
  function render() {
    const root = $("#namaz-guide"); if (!root) return;
    if (!built) {
      const groups = [...new Set(LIST.map(x => x.g))];
      $("#ngPicks").innerHTML = groups.map(g => `<div class="ng-grp"><span>${g}</span>${LIST.filter(x => x.g === g).map(x => `<button data-id="${x.id}">${esc(x.name)}${x.sub ? `<small>${esc(x.sub)}</small>` : ""}</button>`).join("")}</div>`).join("");
      $$("#ngPicks button").forEach(b => b.onclick = () => select(b.dataset.id));
      built = true;
      select(store.get("abp-ng", "fajr"));
    }
  }
  window.NamazGuide = { render, select, LIST };
})();
