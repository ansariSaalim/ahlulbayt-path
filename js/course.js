/* =========================================================
   30-DAY COURSE · 1–30 November 2026
   Follows the syllabus of the user's study plan.
   Fiqh lessons follow the common rulings of the maraji'
   (e.g. Ayatollah Sistani). Always check your own marja's risala.
   ========================================================= */

const COURSE_META = {
  start: "2026-11-01",
  syllabus: [
    ["Nov 1–6", "Foundations & Karbala", "Shia identity, succession, Imam Ali, Imam Hasan, Imam Husayn, Ashura"],
    ["Nov 7–15", "The Imams", "Imam Zayn al-Abidin to Imam al-Mahdi, one Imam per day"],
    ["Nov 16–17", "Women of the Ahl al-Bayt", "Lady Fatima and her haq; Zaynab, Khadija, Umm al-Banin, Ma'suma"],
    ["Nov 18–19", "Beliefs (Usul al-Din)", "Tawhid, Adl, Nubuwwa, Imama, Ma'ad"],
    ["Nov 20–27", "Worship & Fiqh", "Taqlid, taharat, wudu, ghusl, tayammum, namaz, fasting, khums, zakat"],
    ["Nov 28", "Karbala & mourning", "Muharram, majlis, matam, ziyarat, Arba'in"],
    ["Nov 29", "Hadith & duas", "The Four Books, Nahj al-Balagha, Sahifa, Mafatih, daily duas"],
    ["Nov 30", "Shia calendar & revision", "Festivals, commemorations, your lifelong routine"]
  ]
};

const AR = {
  fatiha: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾`,
  ikhlas: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾`
};

const ar = (a, t, m) => `<div class="pray-line"><p class="pl-ar" dir="rtl" lang="ar">${a}</p><p class="pl-tr">${t}</p>${m ? `<p class="pl-m">${m}</p>` : ""}</div>`;

const COURSE = [
/* ---------------- 1 ---------------- */
{ title: "Understanding Shia Islam", tag: "Foundations",
  body: `
<h4>What does "Shia" mean?</h4>
<p>"Shia" comes from <em>Shi'at Ali</em>: the followers of Ali. The Qur'an uses the same word for the prophets: <em>"And indeed, among his shi'a was Ibrahim"</em> (37:83), meaning Ibrahim followed the way of Nuh. Al-Suyuti, a Sunni commentator, records that when the verse <em>"they are the best of creation"</em> (98:7) came down, the Prophet ﷺ pointed to Ali and said: <strong>"This one and his Shia are the successful ones on the Day of Judgement."</strong></p>
<p>Shia Muslims believe that after the Prophet, leadership of the Ummah was given by Allah to Imam Ali, and then to eleven Imams from his descendants. Most Shia Muslims are <strong>Twelvers</strong> (Ithna 'Ashari).</p>
<h4>The five roots (Usul al-Din)</h4>
<ul><li><b>Tawhid</b>: the Oneness of Allah</li><li><b>'Adl</b>: Allah's Justice</li><li><b>Nubuwwa</b>: Prophethood</li><li><b>Imama</b>: leadership appointed by Allah</li><li><b>Ma'ad / Qiyama</b>: the Resurrection</li></ul>
<p>'Adl and Imama are what make the Shia list distinct: Allah never does injustice, and He never leaves His creation without a guide.</p>
<h4>The Ahl al-Bayt</h4>
<p>The Prophet, Ali, Fatima, Hasan and Husayn: the five of the Cloak (Ahl al-Kisa). With the nine Imams after Husayn, they are the <strong>Fourteen Ma'sumin</strong>.</p>
<h4>The Twelve Imams, in order, and where they rest</h4>
<ol class="imam-list">
<li>Ali ibn Abi Talib · Najaf</li><li>Hasan al-Mujtaba · al-Baqi, Medina</li><li>Husayn ibn Ali · Karbala</li><li>Ali Zayn al-Abidin · al-Baqi</li><li>Muhammad al-Baqir · al-Baqi</li><li>Ja'far al-Sadiq · al-Baqi</li><li>Musa al-Kazim · Kadhimiya, Baghdad</li><li>Ali al-Rida · Mashhad</li><li>Muhammad al-Jawad · Kadhimiya</li><li>Ali al-Hadi · Samarra</li><li>Hasan al-Askari · Samarra</li><li>Muhammad al-Mahdi · alive, in occultation</li></ol>
<h4>How we study</h4>
<ul><li>Know the source of every narration, not just the story.</li><li>Learn from the Qur'an, the Prophet and the Ahl al-Bayt together, the two weighty things.</li><li>Know the proofs well, and keep your tongue clean.</li></ul>
<p>The goal is not to <em>look</em> Shia. It is to know the Ahl al-Bayt, and live like them.</p>`,
  practice: "Learn the names of the Twelve Imams in order. Say them out loud three times today.",
  links: ["kaaba-birth", "mubahala"], sections: ["proofs"],
  quiz: [
    { q: "What does Shi'at Ali mean?", o: ["Followers of Ali", "Family of Muhammad", "People of Medina"], a: 0 },
    { q: "How many Imams are recognised in Twelver Shia Islam?", o: ["Five", "Seven", "Twelve"], a: 2 },
    { q: "Which of these is one of the Usul al-Din?", o: ["Zakat", "'Adl", "Hajj"], a: 1 },
    { q: "Who is the third Imam?", o: ["Imam Hasan", "Imam Husayn", "Imam Zayn al-Abidin"], a: 1 }
  ] },
/* ---------------- 2 ---------------- */
{ title: "The Origins: Ghadir, Saqifa and the Succession", tag: "Foundations",
  body: `
<p>The central question: <strong>who should lead the Ummah after the Prophet ﷺ?</strong> Shia Islam's answer comes from the Prophet's own words and actions in his last months.</p>
<h4>The sequence of events</h4>
<ol>
<li><b>18 Dhul Hijja 10 AH, Ghadir Khumm:</b> "Whoever I am his mawla, Ali is his mawla." Narrated by over 100 companions, in Sunni books too.</li>
<li><b>Safar 11 AH:</b> the army of Usama. The senior companions are ordered out of Medina; Ali is kept beside the Prophet.</li>
<li><b>The Thursday:</b> the Prophet asks for pen and paper to write "a document after which you will never go astray", and is refused (Bukhari).</li>
<li><b>28 Safar 11 AH:</b> the Prophet passes away, his head on Ali's chest. Ali washes him.</li>
<li><b>The same day, Saqifa:</b> while Ali and the Banu Hashim are burying the Prophet, Abu Bakr is chosen by those gathered there. Umar himself later calls it a hasty slip (<em>falta</em>, Bukhari 6830).</li>
<li><b>The months after:</b> Fadak is taken. Fatima defends her right in the mosque.</li>
<li><b>About six months later:</b> Fatima dies angry with Abu Bakr, and only then does Ali give his pledge (Bukhari 4240–4241). In that same report, Ali says he had a right to the matter because of his closeness to the Prophet, and that it was decided without him.</li>
</ol>
<h4>Why "mawla" means leader here</h4>
<p>The Prophet first asked: "Do I not have more authority over the believers than they have over themselves?" Then he gave the same to Ali. No one stops a hundred thousand pilgrims in the midday sun to announce a friendship.</p>
<h4>The key principle</h4>
<p>For Shia Muslims, <strong>Imama is appointed by Allah, not chosen by people</strong>, just as prophethood is. Allah says to Ibrahim: <em>"I am making you an Imam for mankind"</em> (2:124).</p>`,
  practice: "Read the Ghadir story and the Saqifa story on this site. Write down, in one sentence each, what happened at both.",
  links: ["ghadir", "usama", "pen-paper", "saqifa", "fadak"], sections: ["proofs"],
  quiz: [
    { q: "What was declared at Ghadir Khumm?", o: ["Ali is the mawla of whoever the Prophet is mawla of", "Abu Bakr is my successor", "Ali is the final prophet"], a: 0 },
    { q: "Where was Abu Bakr chosen?", o: ["Karbala", "Ghadir Khumm", "Saqifa of Banu Sa'ida"], a: 2 },
    { q: "According to Sahih al-Bukhari, when did Ali give his pledge?", o: ["Before the Prophet died", "After Lady Fatima's death", "On the day of Saqifa"], a: 1 },
    { q: "What did Umar call the pledge at Saqifa (Bukhari)?", o: ["A blessed consultation", "A falta, a hasty slip", "The will of the Prophet"], a: 1 },
    { q: "What was the dispute about Fadak?", o: ["Land and inheritance taken from Fatima", "A battle in Iraq", "A disagreement about prayer"], a: 0 }
  ] },
/* ---------------- 3 ---------------- */
{ title: "Imam Ali ibn Abi Talib: The First Imam", tag: "Imam 1",
  body: `
<table class="facts"><tr><td>Father / Mother</td><td>Abu Talib · Fatima bint Asad</td></tr><tr><td>Born</td><td>13 Rajab, c. 600 CE, inside the Ka'ba</td></tr><tr><td>Titles</td><td>Amir al-Mu'minin (Commander of the Faithful), Haydar (Lion), Asadullah (Lion of Allah), Abu Turab (Father of Dust, a name the Prophet gave him), al-Murtada (the Chosen)</td></tr><tr><td>Wife</td><td>Lady Fatima al-Zahra; children Hasan, Husayn, Zaynab, Umm Kulthum and Muhsin</td></tr><tr><td>Martyred</td><td>Struck 19 Ramadan, died 21 Ramadan 40 AH (661 CE), Kufa</td></tr><tr><td>Buried</td><td>Najaf, Iraq</td></tr></table>
<h4>His life in five scenes</h4>
<ol><li><b>Childhood:</b> raised in the Prophet's own home; the first male to believe.</li><li><b>Laylat al-Mabit:</b> slept in the Prophet's bed under forty swords.</li><li><b>The battles:</b> Badr, Uhud, Khandaq, Khaybar, Hunayn. He never fled once.</li><li><b>25 years of patience:</b> stepped back from power, but never from Islam.</li><li><b>His caliphate (35–40 AH):</b> equal shares for all, the hot iron for his own brother, then Jamal, Siffin and Nahrawan.</li></ol>
<h4>Nahj al-Balagha</h4>
<p>His sermons, letters and sayings, compiled by al-Sharif al-Radi (d. 406 AH). Start with <b>Sermon 1</b> (creation and knowing Allah), <b>Sermon 3</b> (al-Shaqshaqiyya), <b>Letter 31</b> (advice to his son), and <b>Letter 53</b> (to Malik al-Ashtar on just rule: "people are either your brothers in religion or your equals in creation").</p>
<h4>Loving Ali means living like Ali</h4>
<ul><li>Be fair even to people you dislike.</li><li>Never humiliate anyone.</li><li>Don't lie to protect yourself.</li><li>Control your anger.</li><li>Help the poor, and give people their rights.</li></ul>`,
  practice: "Read Nahj al-Balagha, Letter 31 (or its first page) on al-islam.org.",
  links: ["kaaba-birth", "laylat-al-mabit", "khandaq", "patience", "ali-justice", "ali-martyrdom"], sections: ["battles"],
  quiz: [
    { q: "Who was Imam Ali's father?", o: ["Abu Talib", "Abu Bakr", "al-Abbas"], a: 0 },
    { q: "What is Laylat al-Mabit?", o: ["The night of Ashura", "The night Ali slept in the Prophet's bed", "The night of Qadr"], a: 1 },
    { q: "Which book contains Imam Ali's sermons and letters?", o: ["al-Sahifa al-Sajjadiyya", "Nahj al-Balagha", "al-Kafi"], a: 1 },
    { q: "Who struck Imam Ali in the mosque of Kufa?", o: ["Muawiya", "Ibn Muljam", "Amr ibn Abd Wadd"], a: 1 },
    { q: "Which letter is about just government?", o: ["Letter 31", "Letter 53", "Sermon 1"], a: 1 }
  ] },
/* ---------------- 4 ---------------- */
{ title: "Imam Hasan al-Mujtaba: The Courage to Choose Peace", tag: "Imam 2",
  body: `
<table class="facts"><tr><td>Born</td><td>15 Ramadan 3 AH, Medina</td></tr><tr><td>Parents</td><td>Imam Ali and Lady Fatima</td></tr><tr><td>Imamate</td><td>40–50 AH</td></tr><tr><td>Martyred</td><td>Safar 50 AH, by poison</td></tr><tr><td>Buried</td><td>al-Baqi, Medina</td></tr></table>
<p>The Prophet's first grandson. "Hasan and Husayn are the masters of the youth of Paradise" (al-Tirmidhi). Bukhari records the Prophet carrying Hasan on his shoulder and praying: "O Allah, I love him, so love him."</p>
<h4>Why the treaty?</h4>
<p>His army was bribed and broken; his own commander went over to Muawiya; he was stabbed by a Kharijite. War would only have meant the slaughter of the last loyal Shia. In 41 AH he signed a treaty with strict conditions: rule by the Qur'an and Sunnah, <b>no successor to be appointed</b>, the cursing of Ali to stop, and safety for the Shia. Muawiya broke every one, and the treaty exposed him for all to see. The Umayyads called that year "the Year of Unity".</p>
<h4>Hasan and Husayn: two ways, one goal</h4>
<p>Hasan made peace with Muawiya; Husayn rose against Yazid. They were not following different principles. Each Imam did what protected Islam in his own situation. Husayn honoured his brother's treaty for ten years, until Muawiya died.</p>
<h4>Five lessons</h4>
<ul><li>Peace is not cowardice.</li><li>Never spend innocent lives for power.</li><li>Patience is strength.</li><li>Keep your principles, even when people misunderstand you.</li><li>Answer insults with generosity, as he did with the Syrian man in Medina.</li></ul>`,
  practice: "Give something in charity today, however small, for Imam Hasan, Karim Ahl al-Bayt.",
  links: ["hasan-treaty", "muawiya-persecution", "hasan-poison"], sections: ["lessons"],
  quiz: [
    { q: "Who was Imam Hasan's mother?", o: ["Lady Khadija", "Lady Fatima al-Zahra", "Lady Zaynab"], a: 1 },
    { q: "When was Imam Hasan born?", o: ["15 Ramadan 3 AH", "10 Muharram 61 AH", "13 Rajab 40 AH"], a: 0 },
    { q: "Who was his opponent?", o: ["Yazid", "Muawiya", "Marwan"], a: 1 },
    { q: "When was the treaty made?", o: ["10 AH", "40 AH", "41 AH"], a: 2 },
    { q: "Which condition did Muawiya break by making Yazid his heir?", o: ["Not to appoint a successor", "To pray on time", "To pay khums"], a: 0 }
  ] },
/* ---------------- 5 ---------------- */
{ title: "Imam Husayn: Standing for Truth, Whatever the Cost", tag: "Imam 3",
  body: `
<table class="facts"><tr><td>Born</td><td>3 Sha'ban 4 AH, Medina</td></tr><tr><td>Imamate</td><td>50–61 AH</td></tr><tr><td>Martyred</td><td>10 Muharram 61 AH, Karbala</td></tr></table>
<p>"Husayn is from me and I am from Husayn" (al-Tirmidhi 3775). Jibra'il brought the Prophet the soil of Karbala, and he wept for Husayn fifty years before Ashura (Musnad Ahmad).</p>
<h4>Why he refused Yazid</h4>
<p>Muawiya broke his treaty and made his son Yazid heir: a man known for open sin. Yazid demanded Husayn's pledge or his head. Husayn said: <strong>"Someone like me does not pledge allegiance to someone like him."</strong> To pledge would have made Yazid's rule look legitimate in the name of the Prophet's family.</p>
<h4>The road to Karbala</h4>
<ol><li><b>28 Rajab 60:</b> leaves Medina.</li><li><b>Mecca, 4 months:</b> thousands of letters from Kufa.</li><li><b>Muslim ibn Aqil</b> sent ahead; Kufa pledges, then abandons him to Ibn Ziyad. He is martyred on 9 Dhul Hijja.</li><li><b>8 Dhul Hijja:</b> Husayn leaves Mecca so the Ka'ba is not stained with his blood.</li><li><b>al-Hurr</b> blocks his way with 1,000 men; Husayn gives them water.</li><li><b>2 Muharram 61:</b> Karbala. <b>7 Muharram:</b> the river is blocked.</li></ol>
<h4>The five principles of Karbala</h4>
<ul><li><b>Haqq</b>: stand with the truth, even alone.</li><li><b>Sabr</b>: patience in hardship.</li><li><b>'Izzat</b>: dignity; never sell your principles.</li><li><b>Tawakkul</b>: trust in Allah.</li><li><b>Shahada</b>: sacrifice rather than legitimise oppression.</li></ul>`,
  practice: "Reflect: Hasan chose peace to protect Islam; why did Husayn choose to rise? Write your answer in two lines.",
  links: ["husayn-prophet", "husayn-departure", "hurr-karbala"], sections: ["karbala"],
  quiz: [
    { q: "Who was Yazid's father?", o: ["Abu Sufyan", "Muawiya", "Marwan"], a: 1 },
    { q: "Who did Imam Husayn send to Kufa?", o: ["Muslim ibn Aqil", "al-Abbas", "Ali al-Akbar"], a: 0 },
    { q: "Who was Yazid's governor of Kufa?", o: ["Umar ibn Sa'd", "Ubaydullah ibn Ziyad", "al-Hurr"], a: 1 },
    { q: "When did Imam Husayn reach Karbala?", o: ["1 Muharram", "2 Muharram", "10 Muharram"], a: 1 },
    { q: "Who blocked his path and later joined him?", o: ["Shimr", "Umar ibn Sa'd", "al-Hurr ibn Yazid"], a: 2 }
  ] },
/* ---------------- 6 ---------------- */
{ title: "The Tragedy of Karbala: Ashura", tag: "Karbala",
  body: `
<h4>The morning</h4>
<p>Surrounded, thirsty, with women and children in the camp, Husayn arranged his seventy-odd companions, then addressed the army: who he was, whose grandson, whose turban he wore. Then <b>al-Hurr</b> crossed over, repentant, and was among the first to fall.</p>
<h4>The companions</h4>
<p>Habib ibn Mazahir, Husayn's childhood friend, past seventy. Muslim ibn Awsaja. Zuhayr ibn al-Qayn. Burayr. Jaun, the freed slave. At noon, Husayn prayed while Sa'id al-Hanafi stood in front of him taking the arrows.</p>
<h4>The family, in order</h4>
<ul><li><b>Ali al-Akbar</b>: Husayn's son, who looked like the Prophet. First of the family to go out.</li><li><b>al-Qasim ibn al-Hasan</b>: about thirteen. "Death is sweeter than honey."</li><li><b>al-Abbas</b>: son of Imam Ali and <b>Umm al-Banin (Fatima bint Hizam)</b>. Abul Fadl, <b>Alamdar</b> (standard-bearer) and <b>Saqqa-e-Sakina</b>. He reached the river, would not drink, and lost both arms bringing the water back.</li><li><b>Ali al-Asghar</b>: six months old, killed by Harmala's arrow as Husayn asked for water for him.</li></ul>
<h4>Husayn alone</h4>
<p>"Is there anyone to help us?" Wounded beyond count, he fell, and in prostration said: "I am content with Your decree." Shimr took his head.</p>
<h4>After</h4>
<p>The tents burned. Zaynab protected the children and the sick Imam Zayn al-Abidin, who had survived only because he was too ill to fight. The captives were taken to Kufa, then Damascus.</p>
<h4>Why did he bring the women and children?</h4>
<p>Imam Husayn said: Allah has willed to see them as captives. Without Zaynab's sermons and Imam Zayn al-Abidin's speeches, Yazid would have buried the truth in the desert. Husayn's blood was the uprising; their captivity carried its message.</p>
<h4>Why we mourn</h4>
<p>Love for Husayn, grief for the Ahl al-Bayt, opposition to oppression, and renewing our loyalty to the truth. The Prophet was the first to weep for him.</p>`,
  practice: "Recite Ziyarat Ashura, or at least its opening salaams: 'Peace be upon you, O Aba Abdillah…'",
  links: ["ashura", "night-11", "zaynab", "arbain"], sections: ["karbala"],
  quiz: [
    { q: "On which date was Imam Husayn martyred?", o: ["2 Muharram", "10 Muharram", "20 Safar"], a: 1 },
    { q: "Who was the standard-bearer of Karbala?", o: ["al-Abbas", "Habib ibn Mazahir", "Muslim ibn Aqil"], a: 0 },
    { q: "Which son of Imam Hasan was martyred at Karbala?", o: ["al-Qasim", "Ali al-Akbar", "Aun"], a: 0 },
    { q: "Who was Imam Husayn's infant son?", o: ["Ali al-Akbar", "Ali al-Asghar", "Zayn al-Abidin"], a: 1 },
    { q: "Who was Imam Husayn's sister who spoke in Kufa and Damascus?", o: ["Sukayna", "Zaynab", "Ruqayya"], a: 1 },
    { q: "Who became the fourth Imam?", o: ["Ali Zayn al-Abidin", "Muhammad al-Baqir", "Ali al-Akbar"], a: 0 },
    { q: "Who first intercepted Husayn and later joined him?", o: ["Shimr", "al-Hurr", "Umar ibn Sa'd"], a: 1 }
  ] },
/* ---------------- 7 ---------------- */
{ title: "Imam Ali Zayn al-Abidin: Courage Without a Sword", tag: "Imam 4",
  body: `
<table class="facts"><tr><td>Titles</td><td>Zayn al-Abidin (adornment of the worshippers), al-Sajjad (the one who prostrates)</td></tr><tr><td>Mother</td><td>Lady Shahrbanu</td></tr><tr><td>Born</td><td>5 Sha'ban 38 AH</td></tr><tr><td>Martyred</td><td>25 Muharram 95 AH, Medina, by poison under al-Walid</td></tr><tr><td>Buried</td><td>al-Baqi</td></tr></table>
<h4>At Karbala and after</h4>
<p>He was too ill to fight on Ashura, and that is how Allah kept the line of Imams alive. In chains, he spoke in Kufa and in the mosque of Damascus: "Is Muhammad your grandfather or mine?"</p>
<h4>His gifts to us</h4>
<ul><li><b>al-Sahifa al-Sajjadiyya</b>: 54 supplications on repentance, gratitude, parents, character, fear and hope. Called the "Psalms of the Ahl al-Bayt".</li><li><b>Risalat al-Huquq</b>: the Treatise on Rights: the rights of Allah, of your body and senses, parents, teachers, neighbours, workers, and even your enemy.</li></ul>
<h4>His character</h4>
<p>Worship that earned him his titles; bread carried secretly at night to a hundred families; patience after Karbala; teaching through du'a when open teaching was impossible.</p>`,
  practice: "Read Supplication 20 of al-Sahifa al-Sajjadiyya (Makarim al-Akhlaq). Say 'Astaghfirullaha rabbi wa atubu ilayh' 70 times. Do one hidden act of charity.",
  links: ["zaynab", "after-karbala", "sajjad"], sections: ["pearls"],
  quiz: [
    { q: "What is his other famous title?", o: ["al-Sajjad", "al-Baqir", "al-Kazim"], a: 0 },
    { q: "Why did he survive Karbala?", o: ["He was in Medina", "He was too ill to fight", "He hid in Kufa"], a: 1 },
    { q: "What is al-Sahifa al-Sajjadiyya?", o: ["A book of history", "His collection of supplications", "A book of fiqh"], a: 1 },
    { q: "What does Risalat al-Huquq teach?", o: ["The rights we owe to Allah and to people", "The rules of Hajj", "The battles of Ali"], a: 0 }
  ] },
/* ---------------- 8 ---------------- */
{ title: "Imam Muhammad al-Baqir: Splitting Knowledge Open", tag: "Imam 5",
  body: `
<table class="facts"><tr><td>Mother</td><td>Fatima bint al-Hasan, so he was descended from both Hasan and Husayn</td></tr><tr><td>Born</td><td>1 Rajab 57 AH, Medina</td></tr><tr><td>Martyred</td><td>7 Dhul Hijja 114 AH, by poison under Hisham</td></tr><tr><td>Buried</td><td>al-Baqi</td></tr></table>
<p>He was at Karbala as a child of three or four. The Prophet had sent him salaam through Jabir ibn Abdullah al-Ansari, calling him the one who would "split knowledge open" (<em>baqr al-'ilm</em>).</p>
<h4>The school of the Ahl al-Bayt</h4>
<p>As the Umayyads weakened, he taught tafsir, hadith, fiqh, belief and ethics openly. Great companions like <b>Zurara ibn A'yan, Muhammad ibn Muslim, Abu Basir</b> and <b>Jabir al-Ju'fi</b> narrated thousands of hadiths from him.</p>
<h4>His brother Zayd</h4>
<p>Zayd ibn Ali rose against the Umayyads and was martyred in 122 AH. The Zaydi Shia are named after him. Imam al-Baqir is remembered for scholarly leadership, Zayd for his uprising.</p>
<h4>Learn from him</h4>
<ul><li>Knowledge is worship: understand your faith, don't just inherit it.</li><li>Teach what you learn.</li><li>"Our Shia is only the one who fears Allah and obeys Him."</li></ul>`,
  practice: "Teach one thing you learned this week to a friend or family member.",
  links: ["baqir", "zayd", "umar-ii"], sections: ["pearls"],
  quiz: [
    { q: "What does al-Baqir mean?", o: ["The one who splits knowledge open", "The truthful", "The generous"], a: 0 },
    { q: "Who was his mother?", o: ["Shahrbanu", "Fatima bint al-Hasan", "Umm Farwa"], a: 1 },
    { q: "Who carried the Prophet's salaam to him?", o: ["Jabir ibn Abdullah al-Ansari", "Salman", "Abu Dharr"], a: 0 },
    { q: "Who was Zayd ibn Ali?", o: ["His brother, who rose against the Umayyads", "An Umayyad caliph", "His son"], a: 0 }
  ] },
/* ---------------- 9 ---------------- */
{ title: "Imam Ja'far al-Sadiq and the Ja'fari School", tag: "Imam 6",
  body: `
<table class="facts"><tr><td>Mother</td><td>Umm Farwa</td></tr><tr><td>Born</td><td>17 Rabi al-Awwal 83 AH, Medina</td></tr><tr><td>Martyred</td><td>25 Shawwal 148 AH, by poison under al-Mansur</td></tr><tr><td>Buried</td><td>al-Baqi</td></tr></table>
<h4>Why we are called Ja'fari</h4>
<p>Most of the Shia fiqh we practise comes through his teaching: the Qur'an, the Sunnah as the Ahl al-Bayt narrated it, and reason ('aql). Four thousand narrators learned from him, among them <b>Abu Hanifa</b> and <b>Malik ibn Anas</b>, founders of two Sunni schools.</p>
<h4>What you'll notice in Ja'fari practice</h4>
<ul><li>Praying with <b>hands at the sides</b>, not folded.</li><li>Prostrating on <b>earth</b> or what grows from it (the turbah / sajdagah).</li><li><b>Wiping</b> (not washing) the feet in wudu, as in Qur'an 5:6.</li><li>Allowed to <b>combine</b> Zuhr with Asr and Maghrib with Isha (Sahih Muslim records the Prophet doing so without travel or fear).</li><li>"<b>Hayya 'ala khayril 'amal</b>" in the adhan.</li><li><b>Khums</b> on yearly surplus.</li><li>Breaking the fast at Maghrib, after the redness in the eastern sky has gone.</li></ul>
<h4>Taqiyya</h4>
<p>Hiding one's beliefs when life is in real danger, as 'Ammar ibn Yasir did under torture and the Qur'an permits (16:106). It was a shield for the Shia under rulers like al-Mansur. It is not lying to fellow believers.</p>`,
  practice: "Look at how you pray and do wudu. Note which of these Ja'fari practices you already follow, and which you still need to learn.",
  links: ["sadiq", "mourning"], sections: ["pearls"],
  quiz: [
    { q: "What does al-Sadiq mean?", o: ["The Truthful", "The Generous", "The Patient"], a: 0 },
    { q: "Why is Shia fiqh called Ja'fari?", o: ["After Ja'far al-Tayyar", "Because most of it comes through Imam Ja'far al-Sadiq", "After a city"], a: 1 },
    { q: "Who is the seventh Imam?", o: ["Musa al-Kazim", "Ali al-Rida", "Isma'il"], a: 0 },
    { q: "What is taqiyya?", o: ["Hiding belief when life is in danger", "Fasting in Sha'ban", "A kind of charity"], a: 0 }
  ] },
/* ---------------- 10 ---------------- */
{ title: "Imam Musa al-Kazim: The One Who Swallows His Anger", tag: "Imam 7",
  body: `
<table class="facts"><tr><td>Titles</td><td>al-Kazim, Bab al-Hawa'ij (the door to needs)</td></tr><tr><td>Mother</td><td>Hamida</td></tr><tr><td>Born</td><td>7 Safar 128 AH, al-Abwa</td></tr><tr><td>Martyred</td><td>25 Rajab 183 AH, in Harun's prison, Baghdad</td></tr><tr><td>Buried</td><td>Kadhimiya, Baghdad</td></tr></table>
<p>"Those who restrain their anger and pardon people; and Allah loves the good-doers" (3:134). He lived that verse until it became his name.</p>
<h4>Imprisoned by Harun al-Rashid</h4>
<p>Arrested at the Prophet's grave for calling the Prophet "father", moved between prisons in Basra and Baghdad for years, he thanked Allah for the free time to worship. Poisoned by al-Sindi ibn Shahak, his body was left on the bridge of Baghdad. He also named the true "borders of Fadak" to the caliph.</p>
<h4>Today's practice</h4>
<ul><li>Someone insults you: don't reply while angry.</li><li>Someone misunderstands you: explain calmly.</li><li>Forgive where you can, without allowing yourself to be harmed again.</li><li>Keep your prayer even on hard days.</li></ul>`,
  practice: "Today, when something makes you angry, wait before you answer and say 'A'udhu billah'. Notice how it changes your reply.",
  links: ["fadak-borders", "kazim"], sections: ["lessons"],
  quiz: [
    { q: "What does al-Kazim mean?", o: ["The one who restrains anger", "The generous", "The guide"], a: 0 },
    { q: "Who was his father?", o: ["Imam al-Baqir", "Imam al-Sadiq", "Imam al-Rida"], a: 1 },
    { q: "Which caliph imprisoned him?", o: ["al-Ma'mun", "Harun al-Rashid", "al-Mutawakkil"], a: 1 },
    { q: "Who was the eighth Imam?", o: ["Ali al-Rida", "Muhammad al-Jawad", "Ali al-Hadi"], a: 0 }
  ] },
/* ---------------- 11 ---------------- */
{ title: "Imam Ali al-Rida: The Golden Chain", tag: "Imam 8",
  body: `
<table class="facts"><tr><td>Mother</td><td>Najma (Tuktam)</td></tr><tr><td>Born</td><td>11 Dhul Qa'da 148 AH, Medina</td></tr><tr><td>Martyred</td><td>End of Safar 203 AH, Tus, by poison from al-Ma'mun</td></tr><tr><td>Buried</td><td>Mashhad, Iran</td></tr></table>
<h4>Forced to Khurasan</h4>
<p>Al-Ma'mun needed the Shia's support after his civil war. He brought the Imam from Medina via Basra, Ahvaz and Fars to Merv, and forced him to be his heir. The Imam accepted only under threat, on condition he would decide nothing.</p>
<h4>Silsilat al-Dhahab, at Nishapur</h4>
<p>"<b>'La ilaha illallah' is My fortress; whoever enters My fortress is safe from My punishment</b>… with its conditions, and I am one of its conditions." Tawhid is the fortress, and the Imamate is its gate.</p>
<h4>The debates</h4>
<p>At Merv he answered Christian, Jewish, Zoroastrian and Sabian scholars from their own scriptures.</p>
<h4>His sister, Lady Fatima al-Ma'suma</h4>
<p>She set out to visit him, fell ill on the way and died in <b>Qom</b>. Her shrine made Qom a great centre of Shia learning.</p>
<h4>Lessons</h4><ul><li>Never trade principles for power.</li><li>Explain your faith with knowledge, not anger.</li><li>Respect knowledge wherever you find it.</li></ul>`,
  practice: "Say 'La ilaha illallah' 100 times today, remembering it is Allah's fortress.",
  links: ["rida", "mourning"], sections: ["pearls"],
  quiz: [
    { q: "Who was his father?", o: ["Imam al-Kazim", "Imam al-Sadiq", "Imam al-Jawad"], a: 0 },
    { q: "Which caliph made him heir?", o: ["Harun", "al-Ma'mun", "al-Amin"], a: 1 },
    { q: "What is Silsilat al-Dhahab?", o: ["The hadith of the Golden Chain, narrated at Nishapur", "A gold chain he wore", "A battle"], a: 0 },
    { q: "Where is he buried?", o: ["Qom", "Mashhad", "Baghdad"], a: 1 }
  ] },
/* ---------------- 12 ---------------- */
{ title: "Imam Muhammad al-Jawad: The Child Imam", tag: "Imam 9",
  body: `
<table class="facts"><tr><td>Titles</td><td>al-Jawad (the Generous), al-Taqi (the God-conscious)</td></tr><tr><td>Mother</td><td>Sabika</td></tr><tr><td>Born</td><td>10 Rajab 195 AH, Medina</td></tr><tr><td>Martyred</td><td>220 AH, Baghdad, aged about 25</td></tr><tr><td>Buried</td><td>Kadhimiya, beside his grandfather</td></tr></table>
<p>He became Imam at about seven or eight. Allah gave Yahya wisdom as a child (19:12) and made 'Isa speak in the cradle (19:29–30).</p>
<h4>The debate with Yahya ibn Aktham</h4>
<p>"What about a pilgrim who kills game?" The boy asked back: inside the sanctuary or outside? Knowing or not? Free or slave? First time or repeated? A bird or another animal, young or full grown? The chief judge had no answer.</p>
<h4>His marriage and death</h4>
<p>Al-Ma'mun married his daughter Umm al-Fadl to him; the Abbasids objected. Under al-Mu'tasim he was poisoned at about 25, through Umm al-Fadl.</p>
<h4>Three lessons</h4><ul><li>Age does not decide wisdom.</li><li>Learn the reasons behind the rulings.</li><li>Generosity is part of faith.</li></ul>`,
  practice: "Help someone younger than you learn something about the Ahl al-Bayt.",
  links: ["jawad"], sections: ["lessons"],
  quiz: [
    { q: "What does al-Jawad mean?", o: ["The Generous", "The Truthful", "The Guide"], a: 0 },
    { q: "At about what age did he become Imam?", o: ["7–8", "20", "40"], a: 0 },
    { q: "Who did he debate?", o: ["Yahya ibn Aktham", "Abu Hanifa", "Harun"], a: 0 },
    { q: "Who was the tenth Imam?", o: ["Ali al-Hadi", "Hasan al-Askari", "Musa al-Kazim"], a: 0 }
  ] },
/* ---------------- 13 ---------------- */
{ title: "Imam Ali al-Hadi: Guiding Under Surveillance", tag: "Imam 10",
  body: `
<table class="facts"><tr><td>Titles</td><td>al-Hadi (the Guide), al-Naqi (the Pure)</td></tr><tr><td>Born</td><td>15 Dhul Hijja 212 AH, near Medina</td></tr><tr><td>Martyred</td><td>3 Rajab 254 AH, Samarra</td></tr><tr><td>Buried</td><td>Samarra</td></tr></table>
<p>Al-Mutawakkil forced him from Medina to Samarra, the military capital, lodged him first in the inn of beggars, and raided his house at night. Brought to the caliph's wine table, he recited about palaces that became graves until the caliph wept.</p>
<p>In 236 AH al-Mutawakkil demolished Husayn's grave, ploughed the land and flooded it. The pilgrims still came.</p>
<h4>Ziyarat al-Jami'a al-Kabira</h4>
<p>The Imam taught this great visitation prayer to be recited at the grave of any Imam. It is a full course on who the Imams are: "the treasurers of Allah's knowledge, the people of His remembrance, the doors of faith…"</p>
<h4>The wukala</h4>
<p>Because the Shia could not reach him, he built a network of trusted agents across the Muslim lands. That network would carry the Shia through the Occultation.</p>`,
  practice: "Read a translation of the first part of Ziyarat al-Jami'a al-Kabira (in Mafatih al-Jinan, or on al-islam.org).",
  links: ["hadi-samarra"], sections: ["rulers"],
  quiz: [
    { q: "Which caliph forced him to Samarra?", o: ["al-Mutawakkil", "Harun", "al-Ma'mun"], a: 0 },
    { q: "What did that caliph do to Husayn's grave?", o: ["Built a dome", "Demolished and flooded it", "Nothing"], a: 1 },
    { q: "Which ziyarat did Imam al-Hadi teach?", o: ["Ziyarat Ashura", "al-Ziyara al-Jami'a al-Kabira", "Ziyarat Warith"], a: 1 }
  ] },
/* ---------------- 14 ---------------- */
{ title: "Imam Hasan al-Askari: The Garrison and the Hidden Son", tag: "Imam 11",
  body: `
<table class="facts"><tr><td>Born</td><td>8 Rabi al-Thani 232 AH, Medina</td></tr><tr><td>Martyred</td><td>8 Rabi al-Awwal 260 AH, Samarra, aged 28</td></tr><tr><td>Buried</td><td>Samarra, beside his father</td></tr></table>
<p>Called al-Askari because he lived in al-'Askar, the army district of Samarra. He had to report to court twice a week and was imprisoned several times. The guards sent to torment him became worshippers themselves.</p>
<p>The Abbasids knew that the Mahdi would come from his line, so they watched his house for a son. The Imam hid his son and prepared the Shia, through his agents, for the day they would not see their Imam.</p>
<h4>His teaching</h4>
<p>"Worship is not much fasting and prayer; it is much reflection on the affair of Allah." Shia Muslims recite <b>51 rak'at</b> of daily prayer when the nafila are included (17 obligatory + 34 recommended), and he named this among the signs of a believer.</p>`,
  practice: "Pray two rak'at of nafila tonight (for example the two rak'at before Fajr, or Salat al-Layl if you can).",
  links: ["askari", "mahdi-birth"], sections: ["rulers"],
  quiz: [
    { q: "Why is he called al-Askari?", o: ["He lived in the army district of Samarra", "He was a soldier", "He led an army"], a: 0 },
    { q: "Why did the Abbasids watch his house?", o: ["They were looking for his son, the Mahdi", "For taxes", "They wanted to visit"], a: 0 },
    { q: "How old was he at his martyrdom?", o: ["About 28", "About 50", "About 63"], a: 0 }
  ] },
/* ---------------- 15 ---------------- */
{ title: "Imam al-Mahdi and the Occultation", tag: "Imam 12",
  body: `
<table class="facts"><tr><td>Born</td><td>15 Sha'ban 255 AH, Samarra</td></tr><tr><td>Mother</td><td>Narjis</td></tr><tr><td>Titles</td><td>al-Qa'im, al-Hujja, Sahib al-Zaman, Baqiyyat Allah</td></tr><tr><td>Minor Occultation</td><td>260–329 AH, through four deputies</td></tr><tr><td>Major Occultation</td><td>329 AH until today</td></tr></table>
<p>At his father's funeral the five-year-old Imam pulled his uncle Ja'far back: "I am more entitled to pray over my father."</p>
<h4>The four deputies (al-Nuwwab al-Arba'a)</h4>
<ol><li>Uthman ibn Sa'id al-Amri</li><li>Muhammad ibn Uthman al-Amri</li><li>al-Husayn ibn Rawh al-Nawbakhti</li><li>Ali ibn Muhammad al-Samari</li></ol>
<p>In 329 AH al-Samari received the final letter: no deputy after him. The Major Occultation began.</p>
<h4>How do we benefit from a hidden Imam?</h4>
<p>"As people benefit from the sun when clouds hide it." He is present, he knows our deeds, and he prays for us.</p>
<h4>What intizar (waiting) means</h4>
<ul><li>Become someone worthy to stand with him.</li><li>Follow the jurists, as he instructed.</li><li>Pray for his reappearance: Du'a al-Faraj, Du'a al-'Ahd each morning.</li><li>Fill the world with justice in your small corner, as he will in the whole earth.</li></ul>`,
  practice: "Recite Du'a al-Faraj ('Ilahi 'azuma al-bala'…') or the short prayer 'Allahumma kun li-waliyyik…' for the Imam.",
  links: ["mahdi-birth", "ghayba"], sections: ["proofs"],
  quiz: [
    { q: "When did the Minor Occultation begin?", o: ["260 AH", "329 AH", "61 AH"], a: 0 },
    { q: "How many special deputies were there?", o: ["Two", "Four", "Twelve"], a: 1 },
    { q: "His hidden presence is compared to…", o: ["The sun behind clouds", "A closed door", "A dream"], a: 0 }
  ] },
/* ---------------- 16 ---------------- */
{ title: "Lady Fatima al-Zahra and Her Haq", tag: "Ahl al-Bayt",
  body: `
<table class="facts"><tr><td>Titles</td><td>al-Zahra (the Radiant), al-Batul, al-Siddiqa, Sayyidat Nisa al-'Alamin</td></tr><tr><td>Born</td><td>20 Jumada al-Thani, Mecca</td></tr><tr><td>Married</td><td>Imam Ali, 1 Dhul Hijja 2 AH, with a dowry of one coat of armour</td></tr><tr><td>Martyred</td><td>Jumada 11 AH, 75 or 95 days after her father</td></tr><tr><td>Buried</td><td>Medina, at night; her grave is unknown</td></tr></table>
<p>"Fatima is a part of me; whoever angers her angers me" (Bukhari). She is one of the Five of the Cloak and the mother of the Imams.</p>
<h4>What was taken from her</h4>
<ol><li>Fadak, her father's gift.</li><li>Her inheritance.</li><li>Her family's share of khums.</li><li>Her husband's right, the leadership.</li><li>The sanctity of her home.</li><li>Her voice and her witnesses.</li></ol>
<h4>Her answer</h4>
<p>The Sermon of Fadak in the Prophet's mosque. Not speaking to the caliph until she died (Bukhari). "I call Allah to witness that you have angered me." A burial at night and a hidden grave.</p>
<h4>Her worship</h4>
<p>She taught us the <b>Tasbih of Fatima</b> after every prayer: 34 Allahu Akbar, 33 Alhamdulillah, 33 Subhanallah.</p>`,
  practice: "Recite the Tasbih of Fatima after every prayer today.",
  links: ["marriage", "fadak", "door", "fatima-visit", "fatima-burial"], sections: ["haq"],
  quiz: [
    { q: "What dowry did Imam Ali give Lady Fatima?", o: ["The price of a coat of armour", "A house", "A thousand camels"], a: 0 },
    { q: "Which Sunni book records that Fatima died angry with Abu Bakr?", o: ["Sahih al-Bukhari", "No book", "Tarikh Baghdad"], a: 0 },
    { q: "Tasbih of Fatima: how many Allahu Akbar?", o: ["33", "34", "100"], a: 1 },
    { q: "Where is her grave?", o: ["al-Baqi, marked", "Hidden; nobody knows", "Najaf"], a: 1 }
  ] },
/* ---------------- 17 ---------------- */
{ title: "The Great Women of the Ahl al-Bayt", tag: "Ahl al-Bayt",
  body: `
<ul>
<li><b>Lady Khadija</b>: the first believer, who spent all her wealth on Islam in the siege of Shi'b Abi Talib. The Prophet never stopped loving her and called the year she died the Year of Sorrow.</li>
<li><b>Fatima bint Asad</b>: Ali's mother, who raised the Prophet as her own. The Prophet shrouded her in his own shirt and lay in her grave before her burial.</li>
<li><b>Lady Zaynab</b>: daughter of Ali and Fatima. She protected the survivors of Karbala, prayed on the Night of the Strangers, and silenced Ibn Ziyad and Yazid. "I saw nothing but beauty."</li>
<li><b>Umm Kulthum</b>: her sister in captivity and in the sermons.</li>
<li><b>Umm al-Banin</b>: wife of Ali, mother of al-Abbas and three more martyrs, who asked first about Husayn.</li>
<li><b>Rubab, Sukayna, Ruqayya</b>: the mothers and daughters of Karbala.</li>
<li><b>Lady Fatima al-Ma'suma</b>: sister of Imam al-Rida, buried in Qom.</li>
<li><b>Lady Hakima</b>: aunt of Imam al-Askari, witness to the birth of Imam al-Mahdi.</li>
</ul>
<p>Shia Islam carries its message through these women as much as through its men.</p>`,
  practice: "Read the story of Zaynab in the courts of Kufa and Damascus.",
  links: ["abu-talib", "zaynab", "captives-damascus", "arbain"], sections: ["karbala"],
  quiz: [
    { q: "Who said 'I saw nothing but beauty' to Ibn Ziyad?", o: ["Lady Zaynab", "Umm Kulthum", "Rubab"], a: 0 },
    { q: "Where is Lady Fatima al-Ma'suma buried?", o: ["Qom", "Mashhad", "Damascus"], a: 0 },
    { q: "Who was the mother of al-Abbas?", o: ["Umm al-Banin", "Khadija", "Hakima"], a: 0 }
  ] },
/* ---------------- 18 ---------------- */
{ title: "Beliefs I: Tawhid and 'Adl", tag: "Usul al-Din",
  body: `
<h4>Tawhid: Allah is One</h4>
<ul><li><b>In His essence:</b> no partner, no parts, nothing like Him (42:11).</li><li><b>In His attributes:</b> His knowledge, power and life are not things added to Him; they are His very essence.</li><li><b>In His actions:</b> everything happens by His permission.</li><li><b>In worship:</b> we worship Him alone.</li></ul>
<p>Allah has no body, no place, and cannot be seen with the eyes, in this world or the next: "Eyes do not perceive Him" (6:103). Imam Ali: "The beginning of religion is knowing Him."</p>
<p><b>Tawassul</b> (asking Allah through the Ahl al-Bayt) and ziyarat are not shirk. We ask Allah by the honour of those He loves, as the brothers of Yusuf asked their father to seek forgiveness for them (12:97).</p>
<h4>'Adl: Allah is Just</h4>
<ul><li>Allah never wrongs anyone even by an atom's weight (4:40).</li><li>Good and evil can be known by reason: Allah commands justice because it is good.</li><li>We are neither forced nor left completely alone. Imam al-Sadiq: "<b>No compulsion and no total delegation, but a matter between the two.</b>" We are free, and responsible.</li><li>Hardship is a test, a consequence of human choices, or a means of reward.</li></ul>
<p>Because Allah is Just, He would never leave people without guidance. That leads to prophethood and Imamate.</p>`,
  practice: "Recite Surat al-Ikhlas and read its meaning. It is the whole of Tawhid in four lines.",
  links: [], sections: ["proofs"],
  quiz: [
    { q: "Can Allah be seen with the eyes?", o: ["Yes, on the Day of Judgement", "No, never", "Only by prophets"], a: 1 },
    { q: "'No compulsion, no total delegation, but…'", o: ["a matter between the two", "only fate", "only free will"], a: 0 },
    { q: "Is tawassul through the Ahl al-Bayt shirk?", o: ["Yes", "No, we ask Allah through those He loves", "Only on Fridays"], a: 1 }
  ] },
/* ---------------- 19 ---------------- */
{ title: "Beliefs II: Nubuwwa, Imama and Ma'ad", tag: "Usul al-Din",
  body: `
<h4>Nubuwwa: Prophethood</h4>
<p>124,000 prophets, five of them Ulul 'Azm (Nuh, Ibrahim, Musa, 'Isa, Muhammad). The prophets are <b>ma'sum</b>: free from sin and error, before and after their mission. Muhammad ﷺ is the Seal (33:40), and the Qur'an we read today is complete and unaltered (15:9).</p>
<h4>Imama: the guide after the Prophet</h4>
<ul><li>The earth is never without a proof (hujja) of Allah.</li><li>The Imam must be <b>ma'sum</b>, have knowledge from Allah, and be <b>appointed</b> by Allah through the Prophet or the previous Imam (nass).</li><li>"My covenant does not reach the wrongdoers" (2:124). Leadership from Allah cannot go to anyone who ever did wrong.</li></ul>
<h4>Ma'ad: the Return</h4>
<ul><li>Death and the questioning in the grave.</li><li><b>Barzakh</b>: the life between death and resurrection.</li><li>The <b>Qiyama</b>, the Scale (Mizan), the Bridge (Sirat), the Book of deeds.</li><li><b>Shafa'a</b>: the intercession of the Prophet and the Ahl al-Bayt, by Allah's permission.</li><li>Paradise and Hell.</li><li><b>Raj'a</b>: Shia belief that some of the righteous and some oppressors will return before the Qiyama, at the time of the Mahdi.</li></ul>`,
  practice: "Visit a graveyard or remember the dead, and recite al-Fatiha for them.",
  links: ["ghayba"], sections: ["proofs"],
  quiz: [
    { q: "How must the Imam be chosen?", o: ["By election", "By appointment from Allah (nass)", "By the strongest army"], a: 1 },
    { q: "What is Barzakh?", o: ["The life between death and resurrection", "A city", "A prayer"], a: 0 },
    { q: "Who are the Ulul 'Azm prophets?", o: ["Nuh, Ibrahim, Musa, 'Isa, Muhammad", "Adam and Shith", "All prophets"], a: 0 }
  ] },
/* ---------------- 20 ---------------- */
{ title: "Taqlid: Following a Marja'", tag: "Fiqh",
  body: `
<p><b>Usul al-Din</b> (beliefs) must be understood for yourself, with your own reasoning. For <b>Furu' al-Din</b> (practical laws: prayer, fasting and so on), each Muslim must do one of three things:</p>
<ol><li><b>Ijtihad</b>: become a mujtahid who derives rulings from the sources (years of study);</li><li><b>Ihtiyat</b>: act on the most cautious option every time (difficult); or</li><li><b>Taqlid</b>: follow a qualified mujtahid (a <b>marja'</b>). This is what most people do.</li></ol>
<p>This comes from Imam al-Mahdi's own letter: "<b>In new events, refer to the narrators of our hadith; they are my proof over you.</b>"</p>
<h4>Who to follow</h4>
<ul><li>A living, just ('adil) mujtahid, and according to most maraji', the most learned (<b>a'lam</b>).</li><li>How to know: two trustworthy experts testify, or it is widely known among the people of knowledge.</li><li>Ask the trusted 'alim of your community. Many Shia worldwide follow Ayatollah Sistani; his rulings are at sistani.org.</li></ul>
<h4>The risala</h4>
<p>Every marja' has a book of rulings (<em>risala 'amaliyya</em>, e.g. "Islamic Laws"). Keep it at home; it is your fiqh reference.</p>
<p class="note-small">The fiqh lessons on this site follow the most common rulings of the maraji'. Where your marja' differs, follow him.</p>`,
  practice: "Ask a trusted 'alim or your local Shia centre which marja' to follow, and download his rulings book.",
  links: ["ghayba"], sections: [],
  quiz: [
    { q: "Is taqlid allowed in the Usul al-Din?", o: ["Yes", "No, beliefs must be understood yourself", "Only in Tawhid"], a: 1 },
    { q: "Who said to refer to the narrators of hadith in his absence?", o: ["Imam al-Mahdi", "Imam Ali", "Abu Bakr"], a: 0 },
    { q: "What is a risala 'amaliyya?", o: ["A marja's book of practical rulings", "A du'a book", "A history book"], a: 0 }
  ] },
/* ---------------- 21 ---------------- */
{ title: "Taharat and Wudu", tag: "Fiqh",
  body: `
<h4>Najasat: what makes things impure</h4>
<p>Urine and stool, semen, blood (of animals with gushing blood), dead bodies (maytah), dogs and pigs, and intoxicating drinks. If they touch your body or clothes while wet, wash with pure water before prayer.</p>
<p><b>Istinja:</b> after urinating, wash the area with water (twice when using little water, by precaution). After stool, wash until clean.</p>
<h4>How to do wudu, step by step</h4>
<ol class="steps">
<li><b>Niyyah</b>: intend in your heart: "I do wudu, qurbatan ilallah" (for the closeness of Allah).</li>
<li><i>(Recommended)</i> Wash both hands, rinse the mouth three times and the nose three times.</li>
<li><b>Face</b>: from the hairline to the chin, and as wide as the span between thumb and middle finger. Wash <b>from top to bottom</b> with the right hand.</li>
<li><b>Right arm</b>: from the elbow down to the fingertips, top to bottom, with the left hand.</li>
<li><b>Left arm</b>: the same, with the right hand.</li>
<li><b>Masah of the head</b>: with the wetness left on the right hand, wipe the front part of the head (above the forehead), from top to bottom. No new water.</li>
<li><b>Masah of the feet</b>: with the wetness on your hands, wipe the <b>right foot</b> with the right hand from the tips of the toes to the ankle joint, then the <b>left foot</b> with the left hand.</li>
</ol>
<ul><li>The first washing is obligatory and the second is allowed; never wash a third time.</li><li>Keep the order, and do it continuously, without letting a part dry before the next.</li><li>The water must be pure and permitted, and nothing (like nail polish) may block it from the skin.</li></ul>
<h4>What breaks wudu</h4>
<p>Urine, stool, passing wind, deep sleep (when you can no longer hear or see), losing consciousness, and things that require ghusl.</p>
<p class="note-small">Shia wipe the feet because the Qur'an says: "…and wipe your heads and your feet up to the ankles" (5:6).</p>`,
  practice: "Do wudu slowly today, following each step on this page.",
  links: [], sections: [],
  quiz: [
    { q: "Which direction do we wash the face and arms?", o: ["Top to bottom", "Bottom to top", "Either"], a: 0 },
    { q: "With what do we wipe the head and feet?", o: ["Fresh water", "The wetness left on the hands", "A towel"], a: 1 },
    { q: "How many times may each part be washed at most?", o: ["Once is obligatory, twice allowed", "Three times", "Seven times"], a: 0 },
    { q: "Which foot is wiped first?", o: ["Right", "Left", "Both together only"], a: 0 }
  ] },
/* ---------------- 22 ---------------- */
{ title: "Ghusl and Tayammum", tag: "Fiqh",
  body: `
<h4>When ghusl is obligatory</h4>
<ul><li><b>Janaba</b>: after intercourse or discharge of semen.</li><li><b>Hayd, Nifas, Istihada</b>: for women after menstruation, after childbirth bleeding, and some cases of irregular bleeding.</li><li><b>Mass al-mayyit</b>: after touching a human corpse after it has cooled and before its ghusl.</li><li><b>Ghusl al-mayyit</b>: washing the dead.</li></ul>
<p>Recommended ghusls include Friday, the two Eids, and the nights of Qadr.</p>
<h4>How to do ghusl (tartibi, in order)</h4>
<ol class="steps"><li>Make sure the body is free of najasa.</li><li><b>Niyyah</b>: "I do ghusl of janaba (or whichever), qurbatan ilallah."</li><li>Wash the <b>head and neck</b> completely.</li><li>Wash the <b>right side</b> of the body.</li><li>Wash the <b>left side</b> of the body.</li></ol>
<p>Or <b>irtimasi</b>: immerse the whole body in water at once, with niyyah. The ghusl of janaba replaces wudu for prayer.</p>
<h4>Tayammum: when there is no water</h4>
<p>If water is not available, or would harm you, or there is not enough time:</p>
<ol class="steps"><li>Niyyah.</li><li>Strike both palms together on clean earth, sand or stone.</li><li>Wipe the <b>forehead</b> with both palms, from the hairline down to the eyebrows and the top of the nose.</li><li>Wipe the back of the <b>right hand</b> with the left palm, from wrist to fingertips.</li><li>Wipe the back of the <b>left hand</b> with the right palm.</li></ol>
<p class="note-small">Many maraji' recommend striking the earth a second time before wiping the hands, as a precaution.</p>`,
  practice: "Read the ghusl steps twice so you know them by heart.",
  links: [], sections: [],
  quiz: [
    { q: "In tartibi ghusl, what is washed first?", o: ["Head and neck", "Feet", "Right side"], a: 0 },
    { q: "Does the ghusl of janaba replace wudu?", o: ["Yes", "No", "Only on Fridays"], a: 0 },
    { q: "Tayammum is done on…", o: ["Clean earth or stone", "Cloth", "Paper"], a: 0 }
  ] },
/* ---------------- 23 ---------------- */
{ title: "Namaz I: Times, Conditions and the Adhan", tag: "Namaz",
  body: `
<h4>The five daily prayers: 17 rak'at, in three times</h4>
<table class="facts"><tr><td><b>Fajr</b></td><td>2 rak'at · from true dawn until sunrise · recited aloud (men)</td></tr><tr><td><b>Zuhr + Asr</b></td><td>4 + 4 rak'at · <b>one shared time</b> from midday until sunset · quiet. Zuhr must come first. The first few minutes after midday belong to Zuhr alone, and the last few minutes before sunset to Asr alone.</td></tr><tr><td><b>Maghrib + Isha</b></td><td>3 + 4 rak'at · <b>one shared time</b> from Maghrib until midnight · first two rak'at aloud (men). Maghrib must come first.</td></tr></table>
<p><b>Combining is allowed.</b> You may pray Zuhr and Asr one after the other, and Maghrib and Isha one after the other, at any point in their shared time. Ibn Abbas narrates in Sahih Muslim that the Prophet ﷺ combined them in Medina "without fear and without travel", so as not to put his Ummah in hardship. Praying each prayer at its own preferred time (<em>waqt al-fadila</em>) brings extra reward, but combining is completely valid.</p>
<p class="note-small">"Midnight" here means the middle of the night, not 12:00. It is about halfway between sunset and dawn; your marja's timetable gives the exact time.</p>
<h4>Conditions</h4>
<ul><li>Wudu (or ghusl/tayammum).</li><li>Facing the <b>qibla</b>.</li><li>Clothes and body <b>tahir</b> (pure), and clothes and place <b>permitted</b> (not stolen).</li><li>Covering: men cover the private parts at least; women cover the whole body except the face (as washed in wudu) and the hands up to the wrists, and the feet up to the ankles.</li><li>Men may not wear <b>gold</b> or <b>pure silk</b> in prayer.</li><li>The place of <b>sajda</b>: on earth, or something that grows from it which is not eaten or worn. That is why we use a <b>turbah / sajdagah</b>, often of the soil of Karbala.</li></ul>
<h4>The Adhan (call to prayer)</h4>
${ar("اللَّهُ أَكْبَرُ", "Allahu Akbar · 4×", "Allah is the Greatest")}
${ar("أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ", "Ashhadu an la ilaha illallah · 2×", "I bear witness there is no god but Allah")}
${ar("أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", "Ashhadu anna Muhammadan rasulullah · 2×", "I bear witness Muhammad is the Messenger of Allah")}
${ar("أَشْهَدُ أَنَّ عَلِيًّا وَلِيُّ اللَّهِ", "Ashhadu anna Aliyyan waliyyullah · 2×", "I bear witness Ali is the wali of Allah. Recited for blessing, not as part of the adhan itself.")}
${ar("حَيَّ عَلَى الصَّلَاةِ", "Hayya 'alas-salah · 2×", "Hasten to prayer")}
${ar("حَيَّ عَلَى الْفَلَاحِ", "Hayya 'alal-falah · 2×", "Hasten to success")}
${ar("حَيَّ عَلَى خَيْرِ الْعَمَلِ", "Hayya 'ala khayril-'amal · 2×", "Hasten to the best of deeds")}
${ar("اللَّهُ أَكْبَرُ", "Allahu Akbar · 2×", "")}
${ar("لَا إِلَٰهَ إِلَّا اللَّهُ", "La ilaha illallah · 2×", "")}
<h4>The Iqama (just before standing for prayer)</h4>
<p>The same phrases, each <b>twice</b> (Allahu Akbar ×2 at the start), with <b>"Qad qamatis-salah"</b> (قَدْ قَامَتِ الصَّلَاةُ, "the prayer has begun") ×2 after "Hayya 'ala khayril-'amal", and ending with La ilaha illallah <b>once</b>.</p>`,
  practice: "Find the prayer times for your city for today, and say the adhan quietly before one prayer.",
  links: [], sections: [],
  quiz: [
    { q: "How many rak'at are the five daily prayers in total?", o: ["17", "11", "20"], a: 0 },
    { q: "Which prayers may be combined?", o: ["Zuhr & Asr, Maghrib & Isha", "Fajr & Zuhr", "None"], a: 0 },
    { q: "On what may we do sajda?", o: ["Earth or what grows from it, not eaten or worn", "A carpet", "Clothes"], a: 0 },
    { q: "Which phrase is in the Shia adhan?", o: ["Hayya 'ala khayril-'amal", "As-salatu khayrun minan-nawm", "Neither"], a: 0 }
  ] },
/* ---------------- 24 ---------------- */
{ title: "Namaz II: How to Pray, Step by Step", tag: "Namaz",
  body: `
<p>Here is a <b>2-rak'at prayer (Fajr)</b>. Stand facing the qibla, <b>hands open at your sides</b>, turbah in front of you.</p>
<h4>Rak'at 1</h4>
<ol class="steps">
<li><b>Niyyah</b>: in your heart: "I pray two rak'at of Fajr, wajib, qurbatan ilallah."</li>
<li><b>Takbirat al-Ihram</b>: raise both hands to your ears and say:${ar("اللَّهُ أَكْبَرُ", "Allahu Akbar", "")}</li>
<li><b>Qira'a</b>: recite Surat al-Fatiha:${ar(AR.fatiha, "Bismillahir-Rahmanir-Rahim. Al-hamdu lillahi Rabbil-'alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinas-siratal-mustaqim. Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin.", "In the name of Allah, the Beneficent, the Merciful. All praise is for Allah, Lord of the worlds…")} Then one complete sura, for example al-Ikhlas:${ar(AR.ikhlas, "Bismillahir-Rahmanir-Rahim. Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.", "Say: He is Allah, the One…")}</li>
<li><b>Ruku'</b>: bow until your hands reach your knees, and say:${ar("سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ", "Subhana Rabbiyal-'Azimi wa bihamdih", "Glory be to my Lord, the Great, and praise be to Him")}Instead, you may say <i>Subhanallah</i> three times.</li>
<li>Stand straight up again, and be still for a moment.</li>
<li><b>Sajda</b>: go down with <b>seven parts</b> on the ground: forehead (on the turbah), both palms, both knees, both big toes. Say:${ar("سُبْحَانَ رَبِّيَ الْأَعْلَىٰ وَبِحَمْدِهِ", "Subhana Rabbiyal-A'la wa bihamdih", "Glory be to my Lord, the Most High, and praise be to Him")}Instead, you may say <i>Subhanallah</i> three times.</li>
<li>Sit up. <i>(Recommended:)</i>${ar("أَسْتَغْفِرُ اللَّهَ رَبِّي وَأَتُوبُ إِلَيْهِ", "Astaghfirullaha Rabbi wa atubu ilayh", "I seek forgiveness from Allah my Lord and turn to Him")}</li>
<li><b>Second sajda</b>, the same as the first. Then sit up briefly.</li>
</ol>
<h4>Rak'at 2</h4>
<ol class="steps" start="9">
<li>Stand up. <i>(Recommended:)</i>${ar("بِحَوْلِ اللَّهِ وَقُوَّتِهِ أَقُومُ وَأَقْعُدُ", "Bihawlillahi wa quwwatihi aqumu wa aq'ud", "By the power and strength of Allah I stand and sit")}</li>
<li>Recite al-Fatiha and a sura again.</li>
<li><b>Qunut</b> <i>(recommended)</i>: raise your hands in front of your face, palms up, and make any du'a, for example:${ar("رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar", "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire")}</li>
<li>Ruku' and two sajdas, as before.</li>
<li><b>Tashahhud</b>: sit and recite:${ar("أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ", "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh. Allahumma salli 'ala Muhammadin wa Ali Muhammad.", "I bear witness there is no god but Allah, alone without partner, and that Muhammad is His servant and Messenger. O Allah, bless Muhammad and the family of Muhammad.")}</li>
<li><b>Salam</b>:${ar("السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", "As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. As-salamu 'alaykum wa rahmatullahi wa barakatuh.", "Peace be upon you, O Prophet… Peace be upon us and the righteous servants of Allah… Peace be upon you all.")}</li>
<li>Finish with the <b>Tasbih of Fatima</b>: 34 × Allahu Akbar, 33 × Alhamdulillah, 33 × Subhanallah.</li>
</ol>
<h4>3 and 4 rak'at prayers (Maghrib, Zuhr, Asr, Isha)</h4>
<p>After the tashahhud of the 2nd rak'at, <b>do not</b> say salam; stand up for the 3rd. In the 3rd and 4th rak'at, recite (quietly) the <b>Tasbihat al-Arba'a</b>; once is enough and three times is better. Instead you may recite al-Fatiha alone, quietly:</p>
${ar("سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ", "Subhanallahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar", "Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest")}
<p>Then ruku', two sajdas, and after the last rak'at: tashahhud and salam.</p>`,
  practice: "Pray today's prayers slowly with this page open. Learn al-Fatiha and the tashahhud by heart this week.",
  links: [], sections: [],
  quiz: [
    { q: "Where are the hands during qiyam in Shia prayer?", o: ["Open at the sides", "Folded on the chest", "Folded on the navel"], a: 0 },
    { q: "What do we say in ruku'?", o: ["Subhana Rabbiyal-'Azimi wa bihamdih", "Subhana Rabbiyal-A'la wa bihamdih", "Allahu Akbar only"], a: 0 },
    { q: "How many parts of the body touch the ground in sajda?", o: ["5", "7", "3"], a: 1 },
    { q: "What can be recited in the 3rd and 4th rak'at?", o: ["Tasbihat al-Arba'a", "Ayat al-Kursi only", "Nothing"], a: 0 },
    { q: "When is qunut recited?", o: ["In the 2nd rak'at, before ruku'", "After salam", "In sajda"], a: 0 }
  ] },
/* ---------------- 25 ---------------- */
{ title: "Namaz III: Mistakes, Travel and Special Prayers", tag: "Namaz",
  body: `
<h4>What invalidates the prayer</h4>
<ul><li>Losing wudu; turning away from the qibla; talking; laughing aloud; eating or drinking.</li><li>Folding the hands (by precaution); saying "Amin" after al-Fatiha (by precaution).</li><li>Adding or missing a <b>rukn</b> (essential part): niyyah, takbirat al-ihram, the standing before ruku', ruku', or both sajdas of one rak'at.</li></ul>
<h4>Doubts (shakk)</h4>
<ul><li>A doubt in a <b>2 or 3 rak'at</b> prayer, or in the <b>first two rak'at</b> of any prayer, about how many you have prayed: the prayer is void. Pray it again.</li><li>Some doubts in 4-rak'at prayers after the second sajda can be fixed: take the higher number, finish, then pray <b>salat al-ihtiyat</b>. Learn the exact table from your marja's risala.</li><li>If you forget a sajda or the tashahhud, there are rules to make it up, often with <b>sajdat al-sahw</b> (two sajdas of forgetfulness) after the prayer.</li></ul>
<h4>Travel (qasr)</h4>
<p>On a journey of about <b>44 km (8 farsakh)</b> or more, counted one way, or going and returning together with each leg at least about 22 km, the <b>4-rak'at prayers become 2</b>, and you do not fast. If you intend to stay <b>10 days</b> or more in one place, pray in full.</p>
<h4>Special prayers</h4>
<ul><li><b>Salat al-Ayat</b>: obligatory at a solar or lunar eclipse or an earthquake. Two rak'at, each with five ruku'.</li><li><b>Jumu'a</b>: in the Occultation, most maraji' hold it optional; if prayed in congregation it replaces Zuhr.</li><li><b>Jama'a</b>: praying in congregation behind a just imam brings great reward.</li><li><b>Qada'</b>: every missed obligatory prayer must be made up.</li><li><b>Nafila</b>: the 34 recommended rak'at, especially <b>Salat al-Layl</b> (the night prayer).</li></ul>`,
  practice: "If you have missed prayers in the past, start a simple plan today to make them up: one extra prayer a day.",
  links: [], sections: [],
  quiz: [
    { q: "A doubt about rak'at in Fajr (2 rak'at) means…", o: ["The prayer is void; pray again", "Assume 2", "Assume 1"], a: 0 },
    { q: "When travelling about 44 km, Zuhr becomes…", o: ["2 rak'at", "3 rak'at", "Still 4"], a: 0 },
    { q: "Which prayer is obligatory at an eclipse?", o: ["Salat al-Ayat", "Salat al-Layl", "Jumu'a"], a: 0 }
  ] },
/* ---------------- 26 ---------------- */
{ title: "Fasting (Sawm)", tag: "Fiqh",
  body: `
<p>Fasting in Ramadan is obligatory for every adult Muslim who is able. The fast runs from <b>true dawn (Fajr)</b> until <b>Maghrib</b>, after the redness in the eastern sky has disappeared, a little after sunset.</p>
<h4>What breaks the fast (if done on purpose)</h4>
<ul><li>Eating and drinking.</li><li>Sexual intercourse, and causing the discharge of semen.</li><li>Knowingly attributing a lie to Allah, the Prophet or the Imams.</li><li>Immersing the whole head in water.</li><li>Letting thick dust or smoke reach the throat.</li><li>Staying in janaba until Fajr on purpose.</li><li>Making oneself vomit; a liquid enema.</li></ul>
<h4>If you break or miss a fast</h4>
<ul><li>Missed for illness or travel: <b>qada'</b>, make it up later.</li><li>Broken deliberately without excuse: qada' plus <b>kaffara</b>: fast 60 days (31 in a row), or feed 60 poor people.</li></ul>
<h4>The heart of Ramadan</h4>
<ul><li>The <b>Nights of Qadr</b>: 19th, 21st and 23rd, the nights Imam Ali was struck and martyred.</li><li>Du'a Iftitah each night, Du'a Abu Hamza al-Thumali before dawn.</li><li><b>Zakat al-Fitr</b> before the Eid prayer: about 3 kg of staple food (or its value) for every person you support.</li></ul>`,
  practice: "Learn when Fajr and Maghrib are in your city. If you can, fast a recommended day (Mondays and Thursdays, or the 13th–15th of the month).",
  links: ["ali-martyrdom"], sections: ["dates"],
  quiz: [
    { q: "When does the Shia fast end?", o: ["At Maghrib, after the eastern redness goes", "Exactly at sunset", "At Isha"], a: 0 },
    { q: "Which of these breaks the fast?", o: ["Immersing the whole head in water", "Brushing teeth without swallowing", "Smelling perfume"], a: 0 },
    { q: "Which are the nights of Qadr?", o: ["19, 21, 23 Ramadan", "1, 2, 3 Ramadan", "27 only"], a: 0 }
  ] },
/* ---------------- 27 ---------------- */
{ title: "Khums, Zakat and Clean Earnings", tag: "Fiqh",
  body: `
<h4>Khums: one fifth</h4>
<p>"Know that whatever you gain, one fifth of it is for Allah, the Messenger, the near relatives, the orphans, the needy and the wayfarer" (8:41).</p>
<ul><li>Choose a <b>khums date</b> (often the day you began earning).</li><li>Each year on that date, from what is <b>left over</b> after your year's living expenses (savings, unused items bought for the house, etc.), give <b>20%</b>.</li><li>Half is <b>Sahm al-Imam</b>, the Imam's share, given to your marja' or his representative, used for seminaries, mosques and the poor.</li><li>Half is <b>Sahm al-Sadat</b>, for needy Sayyids (descendants of the Prophet through Hashim).</li></ul>
<h4>Zakat</h4>
<p>Obligatory on nine things, once they reach a minimum amount (nisab): <b>gold and silver coins, wheat, barley, dates, raisins, camels, cows and sheep/goats</b>. Plus <b>Zakat al-Fitr</b> at Eid.</p>
<h4>Halal earnings</h4>
<p>Avoid interest (riba), cheating, and wealth taken unjustly. Imam Ali's hot iron reminds us that every coin will be asked about.</p>`,
  practice: "Pick your khums date and write it down. Ask your marja's office how to calculate it.",
  links: ["ali-justice"], sections: ["haq"],
  quiz: [
    { q: "Khums is how much of yearly surplus?", o: ["20%", "2.5%", "10%"], a: 0 },
    { q: "The Imam's share of khums is given to…", o: ["Your marja' or his representative", "Anyone you like", "The government"], a: 0 },
    { q: "Zakat is obligatory on how many items?", o: ["9", "5", "12"], a: 0 }
  ] },
/* ---------------- 28 ---------------- */
{ title: "Muharram: Majlis, Matam, Ziyarat and Arba'in", tag: "Karbala",
  body: `
<h4>The majlis</h4>
<p>A gathering to remember Husayn: recitation of the Qur'an, <b>marthiya / soz / nawha</b> (elegies), a lecture on faith and history, then the <b>masa'ib</b> (the account of the tragedy), weeping, matam and ziyarat. Imam al-Sadiq encouraged these gatherings: "Keep our affair alive."</p>
<h4>Matam</h4>
<p>Striking the chest in grief for Husayn. Senior maraji' warn against any practice that seriously harms the body or brings disrepute to the faith; follow your marja' on what is allowed.</p>
<h4>Ziyarat</h4>
<ul><li><b>Ziyarat Ashura</b>: recited daily by many, especially on Ashura.</li><li><b>Ziyarat Warith</b>: "Peace be upon you, heir of Adam…"</li><li><b>Ziyarat al-Arba'in</b>: on 20 Safar.</li></ul>
<h4>Other customs</h4>
<ul><li><b>Sabeel</b>: giving water in memory of Husayn's thirst.</li><li><b>Niyaz / nazr</b>: food given in the name of the Ahl al-Bayt.</li><li><b>'Alam</b>: the standard of al-Abbas.</li><li><b>Arba'in walk</b>: Najaf to Karbala, one of the largest gatherings on earth.</li></ul>
<h4>The 10 days</h4>
<p>Many communities remember one martyr each night: Muslim ibn Aqil, the children of Muslim, al-Hurr, Aun and Muhammad, al-Qasim, Ali al-Akbar, al-Abbas (Tasu'a), and Ashura itself, then the Night of the Strangers.</p>`,
  practice: "Attend a majlis this week, or listen to one online, and recite Ziyarat Ashura.",
  links: ["mourning", "arbain", "night-11"], sections: ["karbala"],
  quiz: [
    { q: "What is a sabeel?", o: ["Giving water in memory of Husayn's thirst", "A prayer", "A book"], a: 0 },
    { q: "When is Arba'in?", o: ["20 Safar", "10 Muharram", "18 Dhul Hijja"], a: 0 },
    { q: "Who encouraged majalis with 'keep our affair alive'?", o: ["Imam al-Sadiq", "Muawiya", "Harun"], a: 0 }
  ] },
/* ---------------- 29 ---------------- */
{ title: "Hadith Books and Daily Duas", tag: "Hadith & Duas",
  body: `
<h4>The Four Books (al-Kutub al-Arba'a)</h4>
<ol><li><b>al-Kafi</b>: al-Kulayni (d. 329 AH)</li><li><b>Man la Yahduruhu al-Faqih</b>: Shaykh al-Saduq (d. 381)</li><li><b>Tahdhib al-Ahkam</b>: Shaykh al-Tusi (d. 460)</li><li><b>al-Istibsar</b>: Shaykh al-Tusi</li></ol>
<p>Shia scholars do not call any book entirely "sahih" except the Qur'an. Every hadith is checked, chain and text.</p>
<h4>Other treasures</h4>
<p><b>Nahj al-Balagha</b> (Imam Ali), <b>al-Sahifa al-Sajjadiyya</b> (Imam Zayn al-Abidin), <b>Bihar al-Anwar</b> (al-Majlisi), and <b>Mafatih al-Jinan</b> (Shaykh Abbas al-Qummi), the everyday book of duas and ziyarat in most Shia homes.</p>
<h4>Your weekly duas</h4>
<table class="facts"><tr><td>Every morning</td><td>Du'a al-'Ahd (renewing your pledge to Imam al-Mahdi)</td></tr><tr><td>After every prayer</td><td>Tasbih of Fatima</td></tr><tr><td>Tuesday night (often)</td><td>Du'a Tawassul</td></tr><tr><td>Thursday night</td><td>Du'a Kumayl, taught by Imam Ali to Kumayl</td></tr><tr><td>Friday morning</td><td>Du'a al-Nudba</td></tr><tr><td>Any day</td><td>Ziyarat Ashura; Hadith al-Kisa</td></tr></table>
<h4>Salawat</h4>
${ar("اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ", "Allahumma salli 'ala Muhammadin wa Ali Muhammad", "O Allah, bless Muhammad and the family of Muhammad")}`,
  practice: "Install or buy Mafatih al-Jinan, and recite Du'a Kumayl this Thursday night.",
  links: [], sections: ["pearls", "reading"],
  quiz: [
    { q: "Who compiled al-Kafi?", o: ["al-Kulayni", "al-Bukhari", "al-Tusi"], a: 0 },
    { q: "When is Du'a Kumayl recited?", o: ["Thursday night", "Monday morning", "Only in Ramadan"], a: 0 },
    { q: "Which book is the everyday book of duas?", o: ["Mafatih al-Jinan", "Tarikh al-Tabari", "al-Kashshaf"], a: 0 }
  ] },
/* ---------------- 30 ---------------- */
{ title: "The Shia Year, Revision and Your Lifelong Path", tag: "Revision",
  body: `
<h4>The Shia year</h4>
<p>Joy on the births and on <b>Eid al-Ghadir</b>; grief in <b>Muharram</b>, <b>Safar</b> and the <b>Fatimiyya</b> days. See the full list in the Key Dates section.</p>
<h4>What you have learned in 30 days</h4>
<ul><li>Who the Ahl al-Bayt are, and the proofs from the Qur'an and even Bukhari and Muslim.</li><li>What happened after the Prophet: Saqifa, Fadak, the door, Fatima's hidden grave.</li><li>Each of the Twelve Imams, and what each ruler did to them.</li><li>Karbala, day by day, and why we mourn.</li><li>The five roots of belief.</li><li>Taqlid, taharat, wudu, ghusl, tayammum, namaz, fasting, khums and zakat.</li><li>The books, duas and the Shia calendar.</li></ul>
<h4>Your daily routine from now on</h4>
<ol><li>The five prayers on time, with Tasbih of Fatima.</li><li>A page of the Qur'an every day.</li><li>Du'a al-'Ahd in the morning.</li><li>One story of the Ahl al-Bayt a week; one majlis a month.</li><li>Du'a Kumayl every Thursday night.</li><li>Khums on your khums date; follow your marja'.</li><li>Live like them: honest, just, generous, patient, and gentle with your tongue.</li></ol>
<p>"Be an adornment for us, and do not be a disgrace to us." (Imam al-Sadiq)</p>`,
  practice: "Take the final quiz, then write your own daily routine and keep it somewhere you will see it.",
  links: ["ghadir", "ashura"], sections: ["dates"],
  quiz: [
    { q: "What is the greatest Eid in Shia tradition?", o: ["Eid al-Ghadir", "New Year", "Nawruz"], a: 0 },
    { q: "Who is the Imam of our time?", o: ["Imam Muhammad al-Mahdi", "Imam al-Askari", "No one"], a: 0 },
    { q: "How many rak'at are the obligatory daily prayers?", o: ["17", "51", "34"], a: 0 },
    { q: "Which day did the Prophet raise Ali's hand?", o: ["18 Dhul Hijja", "10 Muharram", "27 Rajab"], a: 0 },
    { q: "What did Imam al-Sadiq ask his Shia to be?", o: ["An adornment, not a disgrace", "Silent always", "Rich"], a: 0 }
  ] }
];

/* =========================================================
   LEARN & PRACTICE LIBRARY — organised by category
   ========================================================= */
const OLD_IDS = ["understanding","origins","l-ali","l-hasan","l-husayn","l-ashura","l-sajjad","l-baqir","l-sadiq","l-kazim","l-rida","l-jawad","l-hadi","l-askari","l-mahdi","l-fatima","l-women","tawhid-adl","nubuwwa-maad","taqlid","wudu","ghusl-tayammum","namaz-times","namaz-steps","namaz-rules","fasting","khums-zakat","muharram","hadith-books","your-path"];
const LESSONS_LIB = {};
COURSE.forEach((l, i) => { LESSONS_LIB[OLD_IDS[i]] = Object.assign({ id: OLD_IDS[i] }, l); });

/* split the adhan out of the namaz-times lesson */
(function () {
  const nt = LESSONS_LIB["namaz-times"];
  const [before, after] = nt.body.split("<h4>The Adhan (call to prayer)</h4>");
  nt.body = before + `<h4>Main differences from common Sunni practice</h4>
<ul><li>Hands open at the sides (qabd/folding is not done).</li><li>Sajda on earth or a turbah.</li><li>Zuhr–Asr and Maghrib–Isha may be combined.</li><li>No "Amin" after al-Fatiha.</li><li>Qunut in the 2nd rak'at of every prayer.</li><li>Maghrib a little after sunset, when the eastern redness has gone.</li></ul>
<h4>Memorise first</h4><ol><li>Takbir: Allahu Akbar</li><li>Surat al-Fatiha</li><li>Surat al-Ikhlas</li><li>The dhikr of ruku' and sajda</li><li>Tashahhud and salam</li><li>Tasbihat al-Arba'a</li></ol>`;
  nt.title = "Namaz I: The Five Prayers, Times and Conditions";
  nt.quiz = nt.quiz.filter(q => !q.q.includes("adhan"));
  LESSONS_LIB["adhan-jumua-nafila"] = { id: "adhan-jumua-nafila", tag: "Namaz", title: "Adhan, Iqama, Friday Prayer, Nafila and Salat al-Layl",
    body: `<h4>The Adhan (call to prayer)</h4>` + after + `
<h4>Salat al-Jumu'a (Friday prayer)</h4>
<p>Two rak'at in congregation, after two sermons, in place of Zuhr. During the Occultation most maraji' hold it is <b>optional</b> (wajib takhyiri): you may pray Jumu'a or Zuhr. Friday also has its own sunnahs: <b>ghusl al-Jumu'a</b>, cutting nails, perfume, Surat al-Kahf, Du'a al-Nudba, extra salawat, and remembering the Imam of the Time.</p>
<h4>Nafila: the 34 recommended rak'at</h4>
<table class="facts"><tr><td>Before Fajr</td><td>2 rak'at</td></tr><tr><td>Before Zuhr</td><td>8 rak'at (in 2s)</td></tr><tr><td>Before Asr</td><td>8 rak'at</td></tr><tr><td>After Maghrib</td><td>4 rak'at</td></tr><tr><td>After Isha</td><td>2 rak'at sitting (counted as 1), called al-Watira</td></tr><tr><td>Salat al-Layl</td><td>11 rak'at</td></tr></table>
<p>17 obligatory + 34 recommended = <b>51 rak'at</b>, which Imam al-Askari named as one of the signs of a believer.</p>
<h4>Salat al-Layl (Tahajjud): the night prayer</h4>
<p>Its time is from midnight until dawn; the best time is the last third of the night, close to Fajr. It has <b>11 rak'at</b>:</p>
<ol class="steps"><li><b>8 rak'at</b> of Salat al-Layl, prayed as four 2-rak'at prayers.</li><li><b>2 rak'at of al-Shaf'</b>.</li><li><b>1 rak'at of al-Witr</b>.</li></ol>
<h4>How to pray al-Witr</h4>
<ol class="steps"><li>Niyyah, takbir, al-Fatiha and a sura (often al-Ikhlas three times, al-Falaq and al-Nas).</li><li>Raise your hands for a long <b>qunut</b>:<ul><li>Pray for forgiveness for <b>40 believers</b> by name, living or dead.</li><li>Say <em>"Astaghfirullaha Rabbi wa atubu ilayh"</em> <b>70 times</b>.</li><li>Say <em>"Hadha maqamul-'a'idhi bika minan-nar"</em> ("this is the place of one who seeks refuge in You from the Fire") <b>7 times</b>.</li><li>Say <em>"al-'Afw"</em> ("forgiveness") <b>300 times</b>.</li></ul></li><li>Ruku', two sajdas, tashahhud and salam.</li></ol>
<h4>A simple start for beginners</h4>
<p>If 11 rak'at is too much, start with the <b>3 rak'at</b> of Shaf' and Witr before Fajr, then grow it step by step. Even a few rak'at in the night are loved by Allah.</p>`,
    practice: "Tonight, before you sleep or before Fajr, pray the 2 rak'at of Shaf' and 1 rak'at of Witr.",
    links: [], sections: [],
    quiz: [
      { q: "Which phrase is in the Shia adhan?", o: ["Hayya 'ala khayril-'amal", "As-salatu khayrun minan-nawm", "Neither"], a: 0 },
      { q: "How many rak'at is Salat al-Layl in full?", o: ["11", "4", "17"], a: 0 },
      { q: "How many recommended (nafila) rak'at are there daily?", o: ["34", "17", "51"], a: 0 },
      { q: "In the Occultation, most maraji' hold Jumu'a is…", o: ["Optional; it can replace Zuhr", "Forbidden", "Obligatory on all"], a: 0 }
    ] };
})();

/* fix the closing lesson wording */
LESSONS_LIB["your-path"].title = "Your Lifelong Path: Revision, Final Exam and a 90-Day Roadmap";
LESSONS_LIB["your-path"].body = LESSONS_LIB["your-path"].body
  .replace("<h4>What you have learned in 30 days</h4>", "<h4>What you have learned here</h4>")
  + `<h4>Your next 90 days</h4>
<table class="facts"><tr><td>Days 1–30</td><td>The Qur'an with translation, and selected tafsir (al-Mizan)</td></tr><tr><td>Days 31–45</td><td>Nahj al-Balagha and al-Sahifa al-Sajjadiyya</td></tr><tr><td>Days 46–60</td><td>Hadith, the Four Books and how hadith are graded</td></tr><tr><td>Days 61–75</td><td>Ja'fari fiqh from your marja's risala</td></tr><tr><td>Days 76–90</td><td>Islamic history, ziyarat and deeper theology</td></tr></table>
<h4>Become a little more like them</h4>
<ul><li>More truthful, like Imam Ali.</li><li>More patient, like Imam Hasan.</li><li>More courageous, like Imam Husayn.</li><li>More humble in worship, like Imam al-Sajjad.</li><li>More knowledgeable, like Imam al-Baqir and Imam al-Sadiq.</li><li>Slower to anger, like Imam al-Kazim.</li></ul>`;
LESSONS_LIB["your-path"].quiz = [
  { q: "What are the five Usul al-Din?", o: ["Tawhid, 'Adl, Nubuwwa, Imama, Ma'ad", "Salat, Sawm, Hajj, Zakat, Khums", "Qur'an, Sunnah, 'Aql, Ijma', Qiyas"], a: 0 },
  { q: "Who was the first Imam?", o: ["Imam Ali", "Imam Hasan", "Abu Bakr"], a: 0 },
  { q: "On which date was Karbala?", o: ["10 Muharram 61 AH", "18 Dhul Hijja 10 AH", "21 Ramadan 40 AH"], a: 0 },
  { q: "Who was the sixth Imam?", o: ["Ja'far al-Sadiq", "Musa al-Kazim", "Muhammad al-Baqir"], a: 0 },
  { q: "How are the feet treated in Ja'fari wudu?", o: ["Wiped with the wetness of the hands", "Washed three times", "Not touched"], a: 0 },
  { q: "What are the four main Shia hadith books called?", o: ["al-Kutub al-Arba'a", "al-Sihah al-Sitta", "al-Mafatih"], a: 0 },
  { q: "What does taqlid mean in practical law?", o: ["Following a qualified mujtahid", "Copying friends", "Reading hadith yourself"], a: 0 },
  { q: "When did the Major Occultation begin?", o: ["329 AH", "260 AH", "61 AH"], a: 0 },
  { q: "Who founded the Safavid state in 1501?", o: ["Shah Isma'il I", "Nadir Shah", "Mu'izz al-Dawla"], a: 0 },
  { q: "What is the central lesson of Karbala?", o: ["Never give your hand to injustice, whatever the cost", "Avoid all conflict", "Power is everything"], a: 0 }
];

/* add Taqlid terms */
LESSONS_LIB.taqlid.body += `
<h4>Five terms in every risala</h4>
<table class="facts"><tr><td><b>Wajib</b></td><td>Obligatory: reward for doing it, punishment for leaving it</td></tr><tr><td><b>Mustahab</b></td><td>Recommended: reward for doing it, no sin in leaving it</td></tr><tr><td><b>Mubah</b></td><td>Permitted: neither reward nor sin</td></tr><tr><td><b>Makruh</b></td><td>Disliked: better to leave it, but not a sin</td></tr><tr><td><b>Haram</b></td><td>Forbidden: sin if done</td></tr></table>
<p><b>Ihtiyat wajib</b> (obligatory precaution): you must follow it, or you may refer to the next most learned mujtahid on that one issue. <b>Ihtiyat mustahab</b>: a recommended precaution you may leave.</p>
<h4>If two maraji' rule differently</h4>
<p>You follow your own marja'. Other believers who follow a different marja' are acting correctly too; do not argue with them about it.</p>`;
LESSONS_LIB.taqlid.title = "Fiqh, Ijtihad and Taqlid: Following a Marja'";

/* add Majlis / Imambargah terms */
LESSONS_LIB.muharram.title = "Mosque, Imambargah, Majlis and Azadari";
LESSONS_LIB.muharram.body = `
<h4>Mosque, Imambargah, Hussainiya</h4>
<ul><li><b>Masjid</b>: the house of Allah, for prayer. Special rules apply (no entering in janaba, keeping it pure).</li><li><b>Imambargah / Ashurkhana</b> (South Asia), <b>Hussainiya</b> (Iraq, Iran, the Gulf): a hall built to remember the Ahl al-Bayt, for majalis, lectures and community.</li></ul>
<h4>Azadari words you will hear</h4>
<table class="facts"><tr><td><b>Majlis</b></td><td>A gathering of remembrance</td></tr><tr><td><b>Zakir / Khatib</b></td><td>The speaker who gives the lecture and recites the masa'ib</td></tr><tr><td><b>Soz & Salam</b></td><td>Opening elegy and salutation, recited in a slow melody</td></tr><tr><td><b>Marsiya</b></td><td>Long elegiac poem (Mir Anis and Mirza Dabir in Urdu)</td></tr><tr><td><b>Nauha</b></td><td>Lamentation recited with matam</td></tr><tr><td><b>Matam</b></td><td>Striking the chest in grief</td></tr><tr><td><b>'Alam</b></td><td>The standard of al-Abbas</td></tr><tr><td><b>Zuljanah</b></td><td>The horse representing Husayn's horse</td></tr><tr><td><b>Taboot / Ta'ziya</b></td><td>Replica coffin or shrine carried in processions</td></tr><tr><td><b>Juloos</b></td><td>Procession</td></tr><tr><td><b>Niyaz / Tabarruk</b></td><td>Food offered for Allah in the name of the Ahl al-Bayt, shared with all</td></tr><tr><td><b>Sabeel</b></td><td>Free water in memory of the thirst of Karbala</td></tr></table>
<h4>How to behave in a majlis</h4>
<ul><li>Come in wudu, in clean, modest, usually black clothes.</li><li>Sit quietly, phone away; listen to the lecture, not only the masa'ib.</li><li>Weep sincerely; join the matam as your community does.</li><li>Eat the niyaz with respect, and never waste it.</li></ul>
<h4>Matam: different opinions</h4>
<p>Chest-beating (sina-zani) is accepted by all maraji'. Practices that cause serious harm to the body or bring the faith into disrepute are forbidden by many senior maraji'; follow your own marja'.</p>` + LESSONS_LIB.muharram.body.replace("<h4>Matam</h4>", "<h4>Matam, in short</h4>");

const NEW_LESSONS = [
{ id: "quran-ahlulbayt", tag: "Foundations", title: "The Qur'an and the Ahl al-Bayt",
  body: `
<h4>The two weighty things</h4>
<p class="ayah">إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ كِتَابَ اللَّهِ وَعِتْرَتِي أَهْلَ بَيْتِي</p>
<p>"I am leaving among you two weighty things: the Book of Allah and my family, my Ahl al-Bayt. If you hold onto them you will never go astray; they will not separate until they meet me at the Pond." (Sahih Muslim; al-Tirmidhi)</p>
<p>The Qur'an is the <b>silent</b> book; the Imam is the <b>speaking</b> Qur'an who explains it. Imam Ali said at Siffin, as the Qur'ans were raised on spears: "I am the speaking Qur'an."</p>
<h4>Verses about the Ahl al-Bayt</h4>
<table class="facts"><tr><td>33:33</td><td>The verse of Purification: "O People of the House…"</td></tr><tr><td>3:61</td><td>Mubahala: "our sons, our women, ourselves"</td></tr><tr><td>42:23</td><td>"Love for the near relatives" is the only reward asked</td></tr><tr><td>5:55</td><td>Wilayah: the one who gave charity in ruku'</td></tr><tr><td>5:67 & 5:3</td><td>Ghadir: "convey…" and "today I have perfected your religion"</td></tr><tr><td>76:8–9</td><td>Surat al-Insan: feeding the poor, the orphan and the captive</td></tr><tr><td>2:207</td><td>Laylat al-Mabit: "he who sells himself for Allah's pleasure"</td></tr><tr><td>13:7</td><td>"You are only a warner, and for every people there is a guide"</td></tr></table>
<h4>Loving vs following</h4>
<p>Loving the Ahl al-Bayt is obligatory (42:23), but love without following is incomplete. Imam al-Baqir: "Our Shia is only the one who fears Allah and obeys Him." Following them means praying as they prayed, being honest as they were, and standing for the truth as they stood.</p>
<h4>Does following them mean leaving the Qur'an?</h4>
<p>Never. The Imams said: compare our narrations with the Book of Allah; whatever goes against it, throw it at the wall. The Ahl al-Bayt are the way into the Qur'an, not a replacement for it.</p>`,
  practice: "Read Surat al-Insan (76) with its translation, and remember the family who gave away their bread.",
  links: ["mubahala", "ghadir", "marriage"], sections: ["proofs"],
  quiz: [
    { q: "What are the two weighty things?", o: ["The Qur'an and the Ahl al-Bayt", "The Qur'an and the companions", "Prayer and fasting"], a: 0 },
    { q: "Which verse is the verse of Purification?", o: ["33:33", "2:255", "112:1"], a: 0 },
    { q: "Who said 'our Shia is only the one who fears Allah and obeys Him'?", o: ["Imam al-Baqir", "Imam al-Hadi", "Abu Dharr"], a: 0 }
  ] },
{ id: "imamah", tag: "Beliefs", title: "Imamah: Why Twelve Imams?",
  body: `
<h4>What is Imamah?</h4>
<p>The Imam is the leader appointed by Allah to guard the religion and guide the people after the Prophet, in matters of faith and of life. "I am making you an Imam for mankind," Allah told Ibrahim, after testing him; Ibrahim asked for his descendants, and Allah said: "<b>My covenant does not reach the wrongdoers</b>" (2:124).</p>
<h4>Prophet and Imam: the difference</h4>
<table class="facts"><tr><td>Prophet</td><td>Receives revelation (wahy) and brings the law</td></tr><tr><td>Imam</td><td>Receives no new law; guards, explains and applies the Prophet's law. Like the Prophet, he is ma'sum and appointed by Allah</td></tr></table>
<h4>'Isma: infallibility</h4>
<p>The Imams are protected by Allah from sin and error, because the verse of Purification (33:33) says so, and because Allah orders obedience to "those in authority" alongside the Messenger without condition (4:59). Allah would never order unconditional obedience to someone who could command a sin.</p>
<h4>Why twelve?</h4>
<ul><li>Bukhari and Muslim: "<b>twelve successors, all from Quraysh</b>".</li><li>The Prophet named them to companions like Jabir ibn Abdullah, beginning with Ali and ending with the Mahdi (Kamal al-Din; Kifayat al-Athar).</li><li>Each Imam named the next, in front of trusted witnesses: <em>nass</em>.</li><li>"The earth is never without a proof (hujja) of Allah." The twelfth is alive.</li></ul>
<h4>The twelve, once more</h4>
<p>Ali · Hasan · Husayn · Zayn al-Abidin · al-Baqir · al-Sadiq · al-Kazim · al-Rida · al-Jawad · al-Hadi · al-Askari · al-Mahdi.</p>`,
  practice: "Say the names of the Twelve Imams from memory, in order.",
  links: ["ghadir", "brotherhood", "ghayba"], sections: ["proofs", "masumin"],
  quiz: [
    { q: "What did Allah say when Ibrahim asked for Imamate for his descendants?", o: ["My covenant does not reach the wrongdoers", "All of them will be Imams", "Ask again"], a: 0 },
    { q: "Does the Imam bring a new law?", o: ["No; he guards and explains the Prophet's law", "Yes", "Only on Fridays"], a: 0 },
    { q: "Which Sunni books mention 'twelve successors from Quraysh'?", o: ["Bukhari and Muslim", "None", "Only Tabari"], a: 0 }
  ] },
{ id: "halal-ethics", tag: "Fiqh", title: "Halal, Haram and Everyday Ethics",
  body: `
<h4>Halal food</h4>
<ul><li><b>Meat</b>: from halal animals, slaughtered by a Muslim facing the qibla, saying "Bismillah", with the four main vessels of the neck cut, using an iron (steel) blade.</li><li><b>Seafood</b>: fish with scales are halal; shellfish other than <b>shrimp/prawns</b> are not, according to Ja'fari fiqh.</li><li><b>Forbidden</b>: pork, blood, carrion, alcohol and all intoxicants, and meat not slaughtered Islamically.</li><li>Gelatine, enzymes and additives: check your marja's rulings.</li></ul>
<h4>Halal income</h4>
<ul><li>No cheating, no false weighing, no bribes.</li><li>No <b>riba</b> (interest). For bank interest from a non-Muslim or state bank, many maraji' allow you to take it with the intention of taking "unowned property" (majhul al-malik), with the permission of your marja'. Check your marja's ruling before doing so.</li><li>No earning through gambling, alcohol, or anything that harms people.</li></ul>
<h4>Major sins to avoid</h4>
<p>Shirk; leaving the prayer; disobeying parents; consuming orphans' wealth; riba; zina; lying, especially about Allah and the Ahl al-Bayt; backbiting (ghiba); slander; oppression (zulm); breaking promises; drinking alcohol; despairing of Allah's mercy.</p>
<h4>Relationships and conduct</h4>
<ul><li><b>Hijab</b> and modesty for women and men: lowering the gaze (24:30–31).</li><li>No haram relationships; marriage is the way, and Islam made it simple.</li><li>Speak gently, keep your promises, keep family ties.</li></ul>
<h4>Five principles to practise every day</h4>
<ol><li>Honesty in every word.</li><li>Justice, even with people you dislike.</li><li>Mercy to people and animals.</li><li>Guarding the tongue: no backbiting.</li><li>Keeping your earnings clean.</li></ol>
<p>Fasting, khums and zakat are in their own category below.</p>`,
  practice: "Go through one day without saying a single lie or backbiting anyone. Notice how often you are tempted.",
  links: ["ali-justice"], sections: ["lessons"],
  quiz: [
    { q: "Which seafood is halal besides fish with scales (Ja'fari)?", o: ["Shrimp/prawns", "Crab", "Lobster"], a: 0 },
    { q: "Which of these is a major sin?", o: ["Backbiting (ghiba)", "Smiling", "Eating dates"], a: 0 },
    { q: "In Islamic slaughter the animal faces…", o: ["The qibla", "The sun", "Any direction"], a: 0 }
  ] },
{ id: "tafsir", tag: "Qur'an & Hadith", title: "Understanding the Qur'an: Shia Tafsir",
  body: `
<h4>What is tafsir?</h4>
<p>Explaining the meaning of the Qur'an: the words, the context of revelation, and the lessons. Shia tafsir follows three paths together:</p>
<ol><li><b>The Qur'an explains the Qur'an</b> (one verse explains another).</li><li><b>The Prophet and the Ahl al-Bayt</b>, those "firmly rooted in knowledge" (3:7), explain it.</li><li><b>Sound reason</b> and the Arabic language.</li></ol>
<p>The Qur'an we hold today is the complete Qur'an revealed to the Prophet, protected by Allah (15:9). This is the belief of the Shia scholars.</p>
<h4>Major Shia tafsir books</h4>
<table class="facts"><tr><td>Tafsir al-Qummi & Tafsir al-'Ayyashi</td><td>Early collections of narrations from the Imams</td></tr><tr><td>al-Tibyan</td><td>Shaykh al-Tusi (d. 460 AH)</td></tr><tr><td>Majma' al-Bayan</td><td>al-Tabrisi (d. 548 AH), admired by Sunni scholars too</td></tr><tr><td>al-Mizan</td><td>Allamah Tabatabai (d. 1981): the great modern tafsir, explaining the Qur'an by the Qur'an</td></tr><tr><td>Tafsir-e Namuneh</td><td>Ayatollah Makarem Shirazi and others: readable, practical</td></tr></table>
<h4>Five passages every Shia should know</h4>
<ul><li><b>2:255</b> Ayat al-Kursi</li><li><b>33:33</b> the verse of Purification</li><li><b>5:55</b> the verse of Wilayah</li><li><b>42:23</b> the verse of Mawadda</li><li><b>Sura 97</b> al-Qadr, and <b>Sura 76</b> al-Insan</li></ul>`,
  practice: "Read Ayat al-Kursi (2:255) with its meaning, and memorise it this week.",
  links: ["mubahala"], sections: ["proofs"],
  quiz: [
    { q: "Who wrote Tafsir al-Mizan?", o: ["Allamah Tabatabai", "al-Tabari", "al-Kulayni"], a: 0 },
    { q: "Who are 'those firmly rooted in knowledge' (3:7) for Shia?", o: ["The Prophet and the Imams", "Any scholar", "The caliphs"], a: 0 },
    { q: "Is the Qur'an today complete and protected?", o: ["Yes (15:9)", "No", "Partly"], a: 0 }
  ] },
{ id: "calendar", tag: "The Shia Year", title: "The Shia Calendar: Living the Year with the Ahl al-Bayt",
  body: `
<p>The Islamic year is lunar: 12 months of 29 or 30 days, starting from the Hijra. Each month begins with the sighting of the new moon, so dates move about 11 days earlier each year.</p>
<h4>Month by month</h4>
<table class="facts">
<tr><td><b>Muharram</b></td><td>1–10 mourning; 2 arrival at Karbala; 7 water cut; 9 Tasu'a (al-Abbas); <b>10 Ashura</b>; 25 martyrdom of Imam al-Sajjad</td></tr>
<tr><td><b>Safar</b></td><td>Mourning continues; 7 martyrdom of Imam Hasan (one report) and birth of Imam al-Kazim; <b>20 Arba'in</b>; <b>28</b> the Prophet's passing and Imam Hasan; end of Safar Imam al-Rida</td></tr>
<tr><td><b>Rabi al-Awwal</b></td><td>8 martyrdom of Imam al-Askari; 9 start of Imam al-Mahdi's Imamate (Eid al-Zahra in some communities); <b>17 birth of the Prophet ﷺ and Imam al-Sadiq</b></td></tr>
<tr><td><b>Rabi al-Thani</b></td><td>8 birth of Imam al-Askari</td></tr>
<tr><td><b>Jumada al-Ula</b></td><td>5 birth of Lady Zaynab; 13 martyrdom of Lady Fatima (75-day report): Fatimiyya begins</td></tr>
<tr><td><b>Jumada al-Thani</b></td><td>3 martyrdom of Lady Fatima (95-day report); <b>20 birth of Lady Fatima</b></td></tr>
<tr><td><b>Rajab</b></td><td>1 birth of Imam al-Baqir; 3 martyrdom of Imam al-Hadi; 10 birth of Imam al-Jawad; <b>13 birth of Imam Ali</b>; 13–15 Ayyam al-Bid (I'tikaf); 25 martyrdom of Imam al-Kazim; <b>27 Mab'ath</b></td></tr>
<tr><td><b>Sha'ban</b></td><td><b>3 Imam Husayn</b>, 4 al-Abbas, 5 Imam al-Sajjad, 11 Ali al-Akbar; <b>15 birth of Imam al-Mahdi</b></td></tr>
<tr><td><b>Ramadan</b></td><td>Fasting; 15 birth of Imam Hasan; <b>19 & 21 Imam Ali struck and martyred</b>; nights of Qadr 19, 21, 23</td></tr>
<tr><td><b>Shawwal</b></td><td><b>1 Eid al-Fitr</b>; 8 day of mourning for the demolition of al-Baqi (1926); 25 martyrdom of Imam al-Sadiq</td></tr>
<tr><td><b>Dhul Qa'da</b></td><td>11 birth of Imam al-Rida; end of month martyrdom of Imam al-Jawad</td></tr>
<tr><td><b>Dhul Hijja</b></td><td>1 marriage of Ali and Fatima; 7 martyrdom of Imam al-Baqir; 9 Day of Arafa (Du'a 'Arafa of Imam Husayn); <b>10 Eid al-Adha</b>; 15 birth of Imam al-Hadi; <b>18 Eid al-Ghadir</b>; 24 Mubahala; 25 revelation of Surat al-Insan</td></tr>
</table>
<h4>How a Shia lives the year</h4>
<ul><li><b>Daily</b>: five prayers, Qur'an, salawat.</li><li><b>Weekly</b>: Friday ghusl, Du'a Kumayl on Thursday night, charity.</li><li><b>Muharram & Safar</b>: majalis, study of Karbala, Arba'in.</li><li><b>Rajab & Sha'ban</b>: preparing for Ramadan with extra worship and fasting.</li><li><b>Ramadan</b>: fasting, the nights of Qadr, charity.</li><li><b>Dhul Hijja</b>: Hajj, Arafa, and celebrating Ghadir.</li></ul>`,
  practice: "Find today's Hijri date, and the next occasion of the Ahl al-Bayt coming up.",
  links: ["ghadir", "ashura", "arbain"], sections: ["dates"],
  quiz: [
    { q: "When is Eid al-Ghadir?", o: ["18 Dhul Hijja", "10 Dhul Hijja", "27 Rajab"], a: 0 },
    { q: "Which month has the birth of Imam Ali?", o: ["Rajab", "Sha'ban", "Ramadan"], a: 0 },
    { q: "What happened on 8 Shawwal 1926?", o: ["The shrines of al-Baqi were demolished", "Karbala", "Ghadir"], a: 0 }
  ] },
{ id: "ziyarat-duas", tag: "Qur'an & Hadith", title: "Ziyarat, Duas, Tawassul and Salawat",
  body: `
<h4>What is ziyarat?</h4>
<p>Visiting the Prophet, the Imams and the righteous, at their shrines or from afar, greeting them and asking Allah through them. "The Prophet said: whoever visits me after my death is as if he visited me in my life" is narrated in both Shia and Sunni books.</p>
<h4>Five to know</h4>
<table class="facts"><tr><td>Ziyarat Ashura</td><td>For Imam Husayn: recited daily by many</td></tr><tr><td>Ziyarat Warith</td><td>"Peace be upon you, heir of Adam…"</td></tr><tr><td>Ziyarat Aminullah</td><td>Recited by Imam al-Sajjad at Imam Ali's grave; for any Imam</td></tr><tr><td>al-Ziyara al-Jami'a al-Kabira</td><td>From Imam al-Hadi: for any Imam</td></tr><tr><td>Ziyarat Al-i Yasin</td><td>For Imam al-Mahdi</td></tr></table>
<h4>Tawassul</h4>
<p>Asking Allah by the right and honour of those He loves: "O Allah, I ask You by the right of Muhammad and the family of Muhammad…" It is not worshipping them; all power is Allah's. The Qur'an says: "seek a means (wasila) to Him" (5:35). Du'a Tawassul calls on each of the Fourteen in turn.</p>
<h4>Salawat</h4>
<p class="ayah">اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ</p>
<p>The Prophet forbade the "cut-off salawat", sending blessings on him without his family. Always say "wa Ali Muhammad".</p>
<h4>How to do ziyarat with respect</h4>
<ol><li>Ghusl or wudu, clean clothes, perfume.</li><li>Walk in with humility and dhikr.</li><li>Ask permission to enter (idhn al-dukhul).</li><li>Greet the Imam; recite the ziyarat.</li><li>Pray two rak'at of ziyarat; make du'a for yourself and others.</li><li>Leave without turning your back roughly, and with a short farewell.</li></ol>
<h4>A beginner's daily du'a routine</h4>
<table class="facts"><tr><td>Morning</td><td>Du'a al-'Ahd for Imam al-Mahdi; salawat 10×</td></tr><tr><td>After each prayer</td><td>Tasbih of Fatima; Ayat al-Kursi</td></tr><tr><td>Night</td><td>Surat al-Mulk; "Astaghfirullah" 70×</td></tr><tr><td>Tuesday night</td><td>Du'a Tawassul</td></tr><tr><td>Thursday night</td><td>Du'a Kumayl</td></tr><tr><td>Friday morning</td><td>Du'a al-Nudba</td></tr></table>`,
  practice: "Recite Ziyarat Ashura once this week, and Du'a Kumayl on Thursday night.",
  links: ["arbain", "mourning"], sections: ["pearls"],
  quiz: [
    { q: "Which ziyarat did Imam al-Hadi teach?", o: ["al-Ziyara al-Jami'a al-Kabira", "Ziyarat Ashura", "Ziyarat Warith"], a: 0 },
    { q: "What is the 'cut-off salawat'?", o: ["Salawat without 'wa Ali Muhammad'", "A short salawat", "Salawat at night"], a: 0 },
    { q: "Which Qur'anic verse tells us to seek a wasila?", o: ["5:35", "2:2", "114:1"], a: 0 }
  ] },
{ id: "history-beyond", tag: "History", title: "Shia History after the Imams",
  body: `
<h4>The great scholars (4th–5th century AH)</h4>
<table class="facts"><tr><td>al-Kulayni (d. 329)</td><td>Compiled al-Kafi</td></tr><tr><td>Shaykh al-Saduq (d. 381)</td><td>Man la Yahduruhu al-Faqih, Kamal al-Din, 'Uyun Akhbar al-Rida</td></tr><tr><td>Shaykh al-Mufid (d. 413)</td><td>Theologian; defended Imamah; Kitab al-Irshad</td></tr><tr><td>al-Sharif al-Radi (d. 406)</td><td>Compiled Nahj al-Balagha</td></tr><tr><td>al-Sharif al-Murtada (d. 436)</td><td>Theology and usul</td></tr><tr><td>Shaykh al-Tusi (d. 460)</td><td>Tahdhib, al-Istibsar; founded the seminary of <b>Najaf</b> (448 AH)</td></tr></table>
<h4>The Buyids (945–1055 CE)</h4>
<p>A Shia dynasty took Baghdad. In 352 AH Ashura was mourned publicly for the first time, and Eid al-Ghadir was celebrated openly. Shia scholarship flourished.</p>
<h4>Later centuries</h4>
<ul><li><b>Allamah al-Hilli</b> (d. 726 AH) and the Ilkhanid ruler Uljaytu, who embraced Shia Islam.</li><li><b>The Safavids</b> (1501–1722): <b>Shah Isma'il I</b> made Twelver Shia Islam the faith of Iran. Scholars came from Jabal 'Amil (Lebanon), Bahrain and Iraq; al-Majlisi compiled <b>Bihar al-Anwar</b>.</li><li><b>Najaf, Karbala and Qom</b> became the great seminaries (hawzas) they are today.</li></ul>
<h4>Shia Islam in India</h4>
<ul><li><b>The Deccan</b>: the Qutb Shahi kings of Golconda (who built the Charminar in Hyderabad, 1591) and the Adil Shahis of Bijapur supported Shia learning and azadari.</li><li><b>Qazi Nurullah Shushtari</b>, scholar and judge at the Mughal court, martyred in 1610; known as <b>Shahid-e-Salis</b>, the Third Martyr.</li><li><b>Awadh</b>: the Nawabs made Lucknow a capital of Shia culture. Asaf-ud-Daula built the <b>Bara Imambara</b> (1784). Mir Anis and Mirza Dabir perfected the Urdu marsiya.</li><li><b>Kashmir, Rampur, Murshidabad, Hyderabad</b>: communities with their own azadari traditions, like Hyderabad's Bibi ka Alam procession.</li></ul>
<h4>Timeline</h4>
<table class="facts"><tr><td>750</td><td>Abbasids rise</td></tr><tr><td>874 / 941</td><td>Minor and Major Occultation</td></tr><tr><td>945</td><td>Buyids in Baghdad</td></tr><tr><td>1056</td><td>Shaykh al-Tusi founds the Najaf seminary</td></tr><tr><td>1501</td><td>Safavid state</td></tr><tr><td>1518–1687</td><td>Qutb Shahis of Golconda</td></tr><tr><td>1784</td><td>Bara Imambara, Lucknow</td></tr><tr><td>1926</td><td>Demolition of the shrines of al-Baqi</td></tr></table>`,
  practice: "If you live in India, find out the oldest Imambargah in your city and its story.",
  links: ["mourning", "ghayba"], sections: ["rulers"],
  quiz: [
    { q: "Who founded the seminary of Najaf?", o: ["Shaykh al-Tusi", "al-Kulayni", "Shah Isma'il"], a: 0 },
    { q: "Who built the Bara Imambara in Lucknow?", o: ["Asaf-ud-Daula", "Akbar", "Quli Qutb Shah"], a: 0 },
    { q: "Who is known as Shahid-e-Salis?", o: ["Qazi Nurullah Shushtari", "Shaykh al-Mufid", "Mir Anis"], a: 0 }
  ] },
{ id: "living", tag: "Living Shia Islam", title: "Living Shia Islam Every Day",
  body: `
<h4>Family</h4>
<ul><li><b>Parents</b>: "Do not even say 'uff' to them" (17:23). Imam al-Sajjad's Treatise on Rights begins the family rights with the mother.</li><li><b>Spouse</b>: "the best helper in obeying Allah", as Ali called Fatima.</li><li><b>Children</b>: a good name, love, education, and teaching them the Ahl al-Bayt.</li><li><b>Relatives</b>: keep family ties, even with those who cut you off.</li></ul>
<h4>Marriage</h4>
<p>Marriage completes half of one's religion. Make it <b>simple</b>: the dowry of Fatima was one coat of armour. No dowry demands from the bride's family, no wasteful weddings. Choose for faith and character.</p>
<h4>Charity</h4>
<ul><li>Sadaqa every day, even a little; it pushes away misfortune.</li><li>Secret charity, like Imam al-Sajjad's bread at night.</li><li>Helping a neighbour, visiting the sick, feeding the hungry.</li></ul>
<h4>Joy and grief with the Ahl al-Bayt</h4>
<p>Imam al-Sadiq: "Our Shia are created from the leftover of our clay: they are happy in our happiness and sad in our sorrow." Celebrate their births and Ghadir; mourn in Muharram and the Fatimiyya days.</p>
<h4>How a Shia should behave</h4>
<ul><li>Truthful in speech, trustworthy with what is given to you.</li><li>Gentle in disagreement, especially with other Muslims.</li><li>Clean, modest and punctual in prayer.</li><li>Careful with the tongue: no cursing, no backbiting.</li></ul>
<h4>A practical daily routine</h4>
<table class="facts"><tr><td>Fajr</td><td>Prayer, Tasbih of Fatima, Du'a al-'Ahd, a page of Qur'an</td></tr><tr><td>Day</td><td>Honest work, salawat, helping someone</td></tr><tr><td>Zuhr & Asr</td><td>On time, ideally in congregation</td></tr><tr><td>Maghrib & Isha</td><td>Prayer, family time, a story of the Ahl al-Bayt</td></tr><tr><td>Before sleep</td><td>Account for your day (muhasaba), repent, and sleep in wudu</td></tr></table>`,
  practice: "Tonight before sleeping, spend two minutes on muhasaba: what did I do well today, and what must I fix?",
  links: ["marriage", "sajjad"], sections: ["lessons"],
  quiz: [
    { q: "What was Lady Fatima's dowry?", o: ["The price of one coat of armour", "Gold", "A house"], a: 0 },
    { q: "What is muhasaba?", o: ["Taking account of your day", "A prayer time", "A type of charity"], a: 0 },
    { q: "Who said 'our Shia are happy in our happiness and sad in our sorrow'?", o: ["Imam al-Sadiq", "Imam Ali", "Abu Talib"], a: 0 }
  ] }
];
NEW_LESSONS.forEach(l => { LESSONS_LIB[l.id] = l; });

/* hadith books: add classifications */
LESSONS_LIB["hadith-books"].title = "Hadith: the Four Books and How Hadith Are Graded";
LESSONS_LIB["hadith-books"].body = LESSONS_LIB["hadith-books"].body.replace("<h4>Other treasures</h4>", `<h4>How a hadith is graded</h4>
<table class="facts"><tr><td><b>Sahih</b></td><td>Every narrator is a just, trustworthy Imami Shia</td></tr><tr><td><b>Hasan</b></td><td>Imami narrators who are praised, but not all explicitly declared just</td></tr><tr><td><b>Muwaththaq</b></td><td>A narrator from another school, but known to be truthful</td></tr><tr><td><b>Da'if</b></td><td>A weak or unknown narrator in the chain</td></tr></table>
<p>The study of narrators is called <b>'ilm al-rijal</b>. Even a weak chain can be accepted if the meaning is supported by the Qur'an or many other narrations.</p>
<h4>Other collections</h4><p><b>Wasa'il al-Shi'a</b> (al-Hurr al-'Amili), the main fiqh reference; <b>Kamal al-Din</b> and <b>'Uyun Akhbar al-Rida</b> (al-Saduq); <b>Tuhaf al-'Uqul</b> (sayings of the Fourteen).</p>
<h4>Other treasures</h4>`);
LESSONS_LIB["hadith-books"].body = LESSONS_LIB["hadith-books"].body.split("<h4>Your weekly duas</h4>")[0];
LESSONS_LIB["hadith-books"].quiz = LESSONS_LIB["hadith-books"].quiz.filter(q => !q.q.includes("Kumayl"));

/* ---------- CATEGORIES ---------- */
const LEARN_CATS = [
  { id: "foundations", icon: "✦", name: "Foundations", desc: "What Shia Islam is, where it began, and why the Qur'an and the Ahl al-Bayt go together.", lessons: ["understanding", "origins", "quran-ahlulbayt"] },
  { id: "beliefs", icon: "◈", name: "Beliefs: Usul al-Din", desc: "Tawhid, 'Adl, Nubuwwa, Imama and Ma'ad, with their proofs.", lessons: ["tawhid-adl", "imamah", "nubuwwa-maad"] },
  { id: "masumin", icon: "✺", name: "The Fourteen Ma'sumin", desc: "One lesson for Lady Fatima and each Imam: life, struggle, teachings and lessons.", lessons: ["l-fatima", "l-ali", "l-hasan", "l-husayn", "l-sajjad", "l-baqir", "l-sadiq", "l-kazim", "l-rida", "l-jawad", "l-hadi", "l-askari", "l-mahdi", "l-women"] },
  { id: "karbala", icon: "⚑", name: "Karbala & Azadari", desc: "Ashura in order, and how we mourn: majlis, matam, imambargah, ziyarat.", lessons: ["l-ashura", "muharram"] },
  { id: "taharat", icon: "◇", name: "Taharat: Purity", desc: "Najasat, wudu step by step, ghusl and tayammum.", lessons: ["wudu", "ghusl-tayammum"] },
  { id: "namaz", icon: "۞", name: "Namaz", desc: "Times, conditions, how to pray with the Arabic, the adhan, Friday prayer, nafila, Salat al-Layl, doubts and travel.", lessons: ["namaz-times", "namaz-steps", "adhan-jumua-nafila", "namaz-rules"] },
  { id: "sawm-khums", icon: "☾", name: "Fasting, Khums & Zakat", desc: "Ramadan and what breaks the fast; khums, zakat and the shares of the Imam and the Sayyids.", lessons: ["fasting", "khums-zakat"] },
  { id: "fiqh", icon: "⚖", name: "Fiqh, Taqlid & Ethics", desc: "Following a marja', the five rulings, halal and haram, and everyday ethics.", lessons: ["taqlid", "halal-ethics"] },
  { id: "quran-hadith", icon: "❖", name: "Qur'an, Hadith & Duas", desc: "Tafsir, the Four Books, grading hadith, ziyarat, tawassul, salawat and daily duas.", lessons: ["tafsir", "hadith-books", "ziyarat-duas"] },
  { id: "year", icon: "◐", name: "The Shia Year", desc: "Every month and every occasion of the Ahl al-Bayt, and how to live them.", lessons: ["calendar"] },
  { id: "history", icon: "⌛", name: "History after the Imams", desc: "The great scholars, the Buyids, the Safavids, Najaf and Qom, and Shia Islam in India.", lessons: ["history-beyond"] },
  { id: "living", icon: "❀", name: "Living Shia Islam", desc: "Family, marriage, charity, conduct, a daily routine, and your lifelong path with a final exam.", lessons: ["living", "your-path"] }
];

/* =========================================================
   DUA LIBRARY (short duas in full; long ones with guidance)
   ========================================================= */
const DUAS = [
  { t: "Salawat", when: "Any time; after the Prophet's name; 100 times on Fridays",
    ar: "اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
    tr: "Allahumma salli 'ala Muhammadin wa Ali Muhammad",
    en: "O Allah, send blessings upon Muhammad and the family of Muhammad." },
  { t: "Tasbih of Lady Fatima", when: "After every prayer, and before sleeping",
    ar: "اللّٰهُ أَكْبَرُ (٣٤) ۔ الْحَمْدُ لِلّٰهِ (٣٣) ۔ سُبْحَانَ اللّٰهِ (٣٣)",
    tr: "Allahu Akbar ×34 · Alhamdulillah ×33 · Subhanallah ×33",
    en: "Allah is the Greatest · All praise is for Allah · Glory be to Allah. Use the counter below.", counter: true },
  { t: "Du'a al-Faraj", when: "In any hardship; for the reappearance of Imam al-Mahdi",
    ar: "إِلٰهِي عَظُمَ الْبَلَاءُ، وَبَرِحَ الْخَفَاءُ، وَانْكَشَفَ الْغِطَاءُ، وَانْقَطَعَ الرَّجَاءُ، وَضَاقَتِ الْأَرْضُ، وَمُنِعَتِ السَّمَاءُ، وَأَنْتَ الْمُسْتَعَانُ، وَإِلَيْكَ الْمُشْتَكَىٰ، وَعَلَيْكَ الْمُعَوَّلُ فِي الشِّدَّةِ وَالرَّخَاءِ، اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ، أُولِي الْأَمْرِ الَّذِينَ فَرَضْتَ عَلَيْنَا طَاعَتَهُمْ، وَعَرَّفْتَنَا بِذٰلِكَ مَنْزِلَتَهُمْ، فَفَرِّجْ عَنَّا بِحَقِّهِمْ فَرَجًا عَاجِلًا قَرِيبًا كَلَمْحِ الْبَصَرِ أَوْ هُوَ أَقْرَبُ، يَا مُحَمَّدُ يَا عَلِيُّ، يَا عَلِيُّ يَا مُحَمَّدُ، اِكْفِيَانِي فَإِنَّكُمَا كَافِيَانِ، وَانْصُرَانِي فَإِنَّكُمَا نَاصِرَانِ، يَا مَوْلَانَا يَا صَاحِبَ الزَّمَانِ، الْغَوْثَ الْغَوْثَ الْغَوْثَ، أَدْرِكْنِي أَدْرِكْنِي أَدْرِكْنِي، السَّاعَةَ السَّاعَةَ السَّاعَةَ، الْعَجَلَ الْعَجَلَ الْعَجَلَ، يَا أَرْحَمَ الرَّاحِمِينَ، بِحَقِّ مُحَمَّدٍ وَآلِهِ الطَّاهِرِينَ",
    tr: "Ilahi 'azumal-bala', wa barihal-khafa', wankashafal-ghita', wanqata'ar-raja', wa daqatil-ard, wa muni'atis-sama', wa antal-musta'an, wa ilaykal-mushtaka, wa 'alaykal-mu'awwalu fish-shiddati war-rakha'. Allahumma salli 'ala Muhammadin wa Ali Muhammad, ulil-amril-ladhina faradta 'alayna ta'atahum, wa 'arraftana bi-dhalika manzilatahum, fa-farrij 'anna bi-haqqihim farajan 'ajilan qariban ka-lamhil-basari aw huwa aqrab. Ya Muhammadu ya 'Ali, ya 'Aliyyu ya Muhammad, ikfiyani fa-innakuma kafiyan, wansurani fa-innakuma nasiran. Ya mawlana ya Sahibaz-zaman, al-ghawth al-ghawth al-ghawth, adrikni adrikni adrikni, as-sa'ata as-sa'ata as-sa'ah, al-'ajal al-'ajal al-'ajal, ya arhamar-rahimin, bi-haqqi Muhammadin wa alihit-tahirin.",
    en: "My God, the trial has become great, the hidden has been revealed, the veil lifted, hope cut off, the earth has become narrow and the heavens withheld. You are the One whose help is sought and to You is the complaint… O Muhammad, O Ali, suffice me, for you two suffice; help me, for you two are helpers. O our master, O Master of the Time: help! Reach me! Now! Hurry! O Most Merciful of the merciful, by the right of Muhammad and his pure family." },
  { t: "Du'a for Imam al-Zaman", when: "Daily, especially after prayers and on Friday",
    ar: "اللّٰهُمَّ كُنْ لِوَلِيِّكَ الْحُجَّةِ بْنِ الْحَسَنِ، صَلَوَاتُكَ عَلَيْهِ وَعَلَىٰ آبَائِهِ، فِي هٰذِهِ السَّاعَةِ وَفِي كُلِّ سَاعَةٍ، وَلِيًّا وَحَافِظًا، وَقَائِدًا وَنَاصِرًا، وَدَلِيلًا وَعَيْنًا، حَتَّىٰ تُسْكِنَهُ أَرْضَكَ طَوْعًا، وَتُمَتِّعَهُ فِيهَا طَوِيلًا",
    tr: "Allahumma kun li-waliyyikal-Hujjatibnil-Hasan, salawatuka 'alayhi wa 'ala aba'ih, fi hadhihis-sa'ati wa fi kulli sa'ah, waliyyan wa hafizan, wa qa'idan wa nasiran, wa dalilan wa 'ayna, hatta tuskinahu ardaka taw'an, wa tumatti'ahu fiha tawila.",
    en: "O Allah, be for Your wali, the Proof, son of al-Hasan, Your blessings be upon him and his forefathers, in this hour and in every hour, a guardian and protector, a leader and helper, a guide and a watchful eye, until You settle him on Your earth willingly, and let him enjoy it for a long time." },
  { t: "Ziyarat Ashura: the opening salaams", when: "Daily, especially in Muharram; full text in Mafatih al-Jinan",
    ar: "السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللّٰهِ، السَّلَامُ عَلَيْكَ يَا ابْنَ رَسُولِ اللّٰهِ، السَّلَامُ عَلَيْكَ يَا ابْنَ أَمِيرِ الْمُؤْمِنِينَ وَابْنَ سَيِّدِ الْوَصِيِّينَ، السَّلَامُ عَلَيْكَ يَا ابْنَ فَاطِمَةَ سَيِّدَةِ نِسَاءِ الْعَالَمِينَ",
    tr: "As-salamu 'alayka ya Aba 'Abdillah. As-salamu 'alayka yabna Rasulillah. As-salamu 'alayka yabna Amiril-Mu'minin wabna sayyidil-wasiyyin. As-salamu 'alayka yabna Fatimata sayyidati nisa'il-'alamin.",
    en: "Peace be upon you, O Aba Abdillah. Peace be upon you, O son of the Messenger of Allah. Peace be upon you, O son of the Commander of the Faithful and son of the master of the executors. Peace be upon you, O son of Fatima, the Lady of the Women of the Worlds." },
  { t: "Short salam to Imam Husayn", when: "Whenever you drink water, remember his thirst",
    ar: "السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللّٰهِ، لَعَنَ اللّٰهُ قَاتِلِيكَ",
    tr: "As-salamu 'alayka ya Aba 'Abdillah, la'anallahu qatilik.",
    en: "Peace be upon you, O Aba Abdillah; may Allah distance from His mercy those who killed you." },
  { t: "Ayat al-Kursi", when: "After every prayer, before sleeping and when leaving home (many recite up to verse 257)",
    ar: "اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    tr: "Allahu la ilaha illa huwal-hayyul-qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'in min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifzuhuma, wa huwal-'aliyyul-'azim.",
    en: "Allah: there is no god but He, the Living, the Self-Subsisting. Neither drowsiness nor sleep overtakes Him… His Throne extends over the heavens and the earth, and guarding them does not tire Him. He is the Most High, the Most Great. (2:255)" },
  { t: "Istighfar", when: "70 times a day; in the qunut of Witr",
    ar: "أَسْتَغْفِرُ اللّٰهَ رَبِّي وَأَتُوبُ إِلَيْهِ",
    tr: "Astaghfirullaha Rabbi wa atubu ilayh",
    en: "I seek forgiveness from Allah, my Lord, and I turn to Him in repentance." },
  { t: "When leaving home", when: "At the door",
    ar: "بِسْمِ اللّٰهِ، تَوَكَّلْتُ عَلَى اللّٰهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ",
    tr: "Bismillah, tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    en: "In the name of Allah. I rely on Allah. There is no power and no strength except through Allah." },
  { t: "Before sleeping", when: "Lying on the right side, after Tasbih of Fatima",
    ar: "بِاسْمِكَ اللّٰهُمَّ أَمُوتُ وَأَحْيَا",
    tr: "Bismika Allahumma amutu wa ahya.",
    en: "In Your name, O Allah, I die and I live." }
];
const LONG_DUAS = [
  ["Du'a Kumayl", "Thursday night, and the 15th of Sha'ban", "Taught by Imam Ali to Kumayl ibn Ziyad. A long, moving conversation with Allah about sin, mercy and hope."],
  ["Du'a Tawassul", "Tuesday night (or any time of need)", "Calls upon Allah by the right of each of the Fourteen Ma'sumin, one by one."],
  ["Du'a al-Nudba", "Friday morning, and the two Eids", "A lament of longing for Imam al-Mahdi, recalling the history of the prophets and the Ahl al-Bayt."],
  ["Du'a al-'Ahd", "Every morning for 40 days and beyond", "A renewal of your pledge to Imam al-Mahdi each day."],
  ["Hadith al-Kisa", "Gatherings, and for any need", "Lady Fatima's narration of the Five under the Cloak, and the verse of purification."],
  ["Ziyarat Ashura (full)", "Daily; on 10 Muharram", "The great visitation of Imam Husayn, with the 100 salaams and the sajda at the end."],
  ["Du'a 'Arafa of Imam Husayn", "The Day of 'Arafa, 9 Dhul Hijja", "Recited by Imam Husayn on the plain of 'Arafa: one of the deepest prayers of knowing Allah."],
  ["Du'a Abu Hamza al-Thumali", "Before dawn in Ramadan", "Taught by Imam Zayn al-Abidin; a long prayer of hope and repentance."]
];
