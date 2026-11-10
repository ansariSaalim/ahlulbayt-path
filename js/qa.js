/* =========================================================
   QUESTIONS PEOPLE ASK THE SHIA — with answers from the Qur'an,
   the Ahl al-Bayt and the Shia books.
   ========================================================= */
const QA_CATS = { ali: "Imam Ali & the caliphate", belief: "Beliefs", practice: "Prayer & practice", mourn: "Muharram & shrines", sahaba: "The companions", origin: "Shia & Islam", family: "Marriage & family" };
const QA = [
/* ---------- Imam Ali ---------- */
{ id: "ali-fight", c: "ali", q: "Why didn't Imam Ali take up the sword for his right after the Prophet?",
a: `<p>It was not fear. This is the man who killed Amr ibn Abd Wudd and tore off the gate of Khaybar. He held back because of a <b>promise to the Prophet</b> and to <b>save Islam itself</b>.</p>
<ul><li><b>The Prophet's will.</b> The Prophet told Ali that the Ummah would betray him, and commanded him: if you find helpers, fight for your right; if you do not, be patient and protect your blood.</li>
<li><b>He had no army.</b> Ali said: <i>"I looked and found no helper except my family, so I spared them from death. I closed my eyes with dust in them and swallowed despite the choking."</i> (Nahj al-Balagha, sermon 26)</li>
<li><b>Islam was in danger.</b> The Prophet had just died. Tribes were leaving Islam, false prophets had risen, the hypocrites were waiting, and the Romans and Persians were at the borders. A civil war among the Muslims would have destroyed the religion. Ali wrote: <i>"I held back my hand until I saw people turning away from Islam, trying to wipe out the religion of Muhammad. I feared that if I did not help Islam, I would see a breach in it... which for me would be a greater disaster than losing rule over you."</i> (Nahj al-Balagha, letter 62)</li>
<li><b>Like Harun.</b> The Prophet said Ali is to him as Harun was to Musa. When the people worshipped the calf, Harun did not fight them, fearing division, and said: <i>"The people overpowered me and were about to kill me"</i> (7:150). Ali stood at the Prophet's grave and said these same words.</li></ul>
<p>Holding back the sword when every part of you wants to use it, only for Allah, is harder than fighting. It was his greatest jihad.</p>`,
src: "Kitab Sulaym ibn Qays; Nahj al-Balagha, sermons 3 & 26 and letter 62; al-Ihtijaj" },

{ id: "fadak-back", c: "ali", q: "Why didn't Imam Ali take back Fadak when he became the caliph?",
a: `<p>The Imams were asked this exact question, and al-Saduq recorded their answers in <b>'Ilal al-Shara'i'</b>:</p>
<ul><li><b>To follow the Prophet.</b> When the Prophet conquered Mecca, he did not take back his own house, which Aqil had sold. Ali followed his example.</li>
<li><b>The case was already with Allah.</b> The one who was wronged (Lady Fatima) and those who wronged her had both gone to Allah. Allah had rewarded the wronged and would punish the wrongdoers. Ali did not want to take back something whose case Allah had already judged.</li>
<li><b>"We do not take back what was taken from us."</b> The Ahl al-Bayt leave it to Allah to return their rights.</li></ul>
<p>There was also the reality of his rule. In al-Kafi (Kitab al-Rawda) Ali lists the changes made after the Prophet that he wanted to undo, among them <b>returning Fadak to the heirs of Fatima</b>. He said that if he did these things, his army would <b>scatter from him</b>. When he only tried to stop the congregational Tarawih prayer, people in his own army shouted "O the sunna of Umar!" He was fighting Jamal, Siffin and Nahrawan; giving Fadak to his own sons would have been used to say he ruled for his family.</p>
<p>Fadak was never about money. Ali wrote: <i>"Yes, we had Fadak... What would I do with Fadak, when tomorrow the soul's place is a grave?"</i> (Nahj al-Balagha, letter 45). By leaving it, the injustice stayed recorded in history as a witness.</p>`,
src: "al-Saduq, 'Ilal al-Shara'i'; al-Kafi, Kitab al-Rawda; Nahj al-Balagha, letter 45" },

{ id: "ali-bayah", c: "ali", q: "If Ali was the true successor, why did he give allegiance to Abu Bakr?",
a: `<p>He did not give it at Saqifa, nor while Lady Fatima was alive. He gave it about six months later, after her martyrdom, when he was alone and Islam faced the wars of apostasy. It was the same reason he did not fight: to keep the religion from breaking apart (Nahj al-Balagha, letter 62). An allegiance taken under pressure does not make something right; Harun lived among the calf-worshippers without agreeing with them.</p>
<p>He also never stopped saying it was his right. In the Shiqshiqiyya sermon he says: <i>"By Allah, he put on the caliphate knowing that my position in it was like the axis of a mill."</i></p>`,
src: "Nahj al-Balagha, sermon 3 and letter 62; Kitab al-Irshad" },

{ id: "ali-names", c: "ali", q: "Why did Imam Ali name some of his sons Abu Bakr, Umar and Uthman?",
a: `<p>These were ordinary Arab names, used by many people, friends and enemies alike. A name is not a vote of support. Ali himself explained one of them: <i>"I named him after my brother Uthman ibn Maz'un,"</i> a great companion who died early in Medina. "Abu Bakr" was a kunya (nickname) of a son, not his real name.</p>
<p>The Imams also named children Muhammad, Ali, Hasan and Husayn again and again. Look at actions, not names: these sons of Ali were martyred with Imam Husayn at Karbala, fighting the Umayyads.</p>`,
src: "Abu al-Faraj al-Isfahani, Maqatil al-Talibiyyin; Kitab al-Irshad" },

{ id: "umm-kulthum", c: "ali", q: "Did Imam Ali marry his daughter Umm Kulthum to Umar?",
a: `<p>Great Shia scholars such as <b>Shaykh al-Mufid</b> wrote that the reports of this marriage are weak and contradict each other, in names, dates and what happened. Even the reports in al-Kafi that mention it describe it as something <b>taken by force</b>: Imam al-Sadiq said, "That was something taken from us by force." So either it did not happen, or it happened under threat. Either way, it says nothing about Ali's approval.</p>`,
src: "al-Mufid, al-Masa'il al-Sarawiyya; al-Kafi, Kitab al-Nikah" },

{ id: "ghadir-mawla", c: "ali", q: "At Ghadir, didn't \"mawla\" just mean \"friend\"?",
a: `<p>Look at what happened. The Prophet stopped about a hundred thousand pilgrims in the burning desert, called back those ahead, waited for those behind, and built a pulpit of camel saddles. One does not do that to say "Ali is my friend."</p>
<ul><li>Just before, the verse came: <i>"O Messenger, deliver what has been sent down to you... if you do not, you have not delivered His message"</i> (5:67). Friendship with Ali was already well known; this was about something the whole mission depended on.</li>
<li>He first asked: <i>"Am I not more entitled over the believers than they are over themselves?"</i> They said yes. Then he said: <i>"Whoever I am his mawla, Ali is his mawla."</i> The second sentence takes its meaning from the first: authority.</li>
<li>Right after, the verse came: <i>"Today I have perfected your religion"</i> (5:3).</li>
<li>The pilgrims came to congratulate Ali, and the poet Hassan ibn Thabit composed a poem calling him "Imam and guide".</li></ul>`,
src: "The Qur'an 5:67 and 5:3; al-Kafi; Kitab al-Irshad; al-Amini, al-Ghadir" },

{ id: "ali-quran", c: "ali", q: "If Ali's Imamate is so important, why isn't his name in the Qur'an?",
a: `<p>Abu Basir asked Imam al-Sadiq exactly this. The Imam answered: the command to pray was revealed, but Allah did not name the number of rak'at, three or four; the Prophet explained it. Zakat was revealed, but not that it is one in forty; the Prophet explained it. Hajj was revealed, but not that it is seven circuits; the Prophet explained it. And <i>"Obey Allah, obey the Messenger and those in authority among you"</i> (4:59) was revealed, and the Prophet explained who they are: Ali, Hasan and Husayn.</p>
<p>The Qur'an describes Ali clearly without naming him, as in the verse of wilaya: <i>"Your guardian is only Allah, His Messenger and those who believe, who establish prayer and give zakat while bowing"</i> (5:55), revealed when Ali gave his ring to a beggar during ruku'.</p>`,
src: "al-Kafi, Kitab al-Hujja (hadith of Abu Basir); Tafsir of 5:55" },

/* ---------- Beliefs ---------- */
{ id: "tahrif", c: "belief", q: "Do the Shia believe the Qur'an has been changed?",
a: `<p><b>No.</b> The Qur'an we read is the same Qur'an every Muslim reads, complete and protected by Allah: <i>"We have sent down the Reminder, and We will surely protect it"</i> (15:9). Our great scholars said this clearly: al-Saduq in his book of beliefs, al-Sharif al-Murtada, Shaykh al-Tusi, al-Tabrisi, and in our time Sayyid al-Khoei in <b>al-Bayan</b>.</p>
<p>The Imams told us to judge every hadith by the Qur'an, and to reject whatever contradicts it. That only makes sense if the Qur'an is complete. Any weak report that seems to say otherwise is rejected or refers to tafsir, not to the text.</p>`,
src: "al-Saduq, al-I'tiqadat; al-Tusi, al-Tibyan; al-Khoei, al-Bayan" },

{ id: "tawassul", c: "belief", q: "Isn't asking the Prophet and Imams for help (tawassul) shirk?",
a: `<p>Shirk is to worship someone other than Allah or to believe someone has power apart from Him. We do neither. We worship Allah alone and ask Him <b>through</b> those He loves, as He told us: <i>"Seek a means (wasila) to Him"</i> (5:35).</p>
<ul><li>The brothers of Yusuf asked their father: <i>"O father, ask forgiveness for us,"</i> and he said: <i>"I will ask my Lord to forgive you"</i> (12:97-98).</li>
<li><i>"If, when they wronged themselves, they had come to you and asked Allah's forgiveness, and the Messenger had asked forgiveness for them, they would have found Allah Accepting and Merciful"</i> (4:64).</li></ul>
<p>Asking a living believer to pray for you is not shirk; the martyrs and the Ahl al-Bayt are alive with their Lord (3:169). Everything they give is by Allah's permission.</p>`,
src: "The Qur'an 5:35, 12:97-98, 4:64, 3:169" },

{ id: "ismah", c: "belief", q: "Why do the Shia believe the Imams are infallible (ma'sum)?",
a: `<ul><li>Allah told Ibrahim that the Imamate does not reach <b>wrongdoers</b>: <i>"My covenant does not include the wrongdoers"</i> (2:124). Anyone who has ever committed a sin has wronged himself.</li>
<li>Allah orders us to obey <i>"those in authority"</i> together with Himself and the Messenger, with no condition (4:59). Allah would never order unconditional obedience to someone who might command a sin.</li>
<li>The verse of purification: <i>"Allah only wishes to remove all impurity from you, O Ahl al-Bayt, and purify you completely"</i> (33:33).</li>
<li>The Prophet said the Qur'an and the Ahl al-Bayt will never separate. The Qur'an has no error, so its partner cannot have error either.</li></ul>`,
src: "The Qur'an 2:124, 4:59, 33:33; Hadith al-Thaqalayn (al-Kafi; Kamal al-Din)" },

{ id: "twelve", c: "belief", q: "Why exactly twelve Imams?",
a: `<p>Because the Prophet said so. He said there would be <b>twelve successors</b> after him, all from Quraysh; this hadith is accepted by Shia and Sunni scholars alike. Only the Twelve Imams of the Ahl al-Bayt fit it.</p>
<p>In the Shia books the Prophet named them one by one, for example in the hadith of <b>Jabir ibn Abd Allah</b> and the <b>Tablet (Lawh)</b> that Jabir saw with Lady Fatima, which lists the Imams from Ali to the Mahdi.</p>`,
src: "al-Kafi, Kitab al-Hujja; al-Saduq, Kamal al-Din; al-Nu'mani, Kitab al-Ghayba" },

{ id: "mahdi-age", c: "belief", q: "How can Imam al-Mahdi be alive for over a thousand years?",
a: `<p>Long life is easy for Allah. The Qur'an says Prophet <b>Nuh</b> lived among his people for 950 years (29:14). Prophet <b>Isa</b> is alive and will return. Al-<b>Khidr</b> is alive. And about Yunus Allah says that, had he not glorified Allah, he would have stayed in the belly of the whale <i>"until the Day they are raised"</i> (37:144).</p>
<p>The question is not whether Allah can do it, but whether He has told us. The Prophet said the Mahdi is from his descendants, from the sons of Husayn, and the Imams said he would have a long occultation that would test the believers.</p>`,
src: "The Qur'an 29:14, 37:144, 4:157-158; Kamal al-Din; Kitab al-Ghayba of al-Tusi" },

{ id: "taqiyya", c: "belief", q: "Isn't taqiyya just lying?",
a: `<p>Taqiyya means hiding your belief to protect your life or others from oppressors. It is in the Qur'an:</p>
<ul><li><b>Ammar ibn Yasir</b> was tortured until he said words against the Prophet. Allah revealed: <i>"...except the one who was forced while his heart was firm in faith"</i> (16:106).</li>
<li><i>"...unless you guard yourselves against them out of caution"</i> (3:28).</li>
<li>A believer in Pharaoh's family <i>"hid his faith"</i> (40:28), and Allah praised him.</li></ul>
<p>It is not lying to deceive people in matters of faith, and it is not allowed where it would cause killing of the innocent or the loss of the religion. Shia lived under tyrants for centuries; taqiyya is how they survived.</p>`,
src: "The Qur'an 16:106, 3:28, 40:28; al-Kafi, chapter on taqiyya" },

{ id: "bada", c: "belief", q: "What is bada'? Do the Shia believe Allah changes His mind?",
a: `<p><b>No.</b> Allah's knowledge never changes and nothing is hidden from Him. Bada' means that Allah may change a decree that <b>appears</b> to us, because of our deeds, du'a or charity, while He always knew the final outcome. The Qur'an says: <i>"Allah erases what He wills and confirms, and with Him is the Mother of the Book"</i> (13:39).</p>
<p>When the people of Yunus repented, the punishment that was coming was lifted (10:98). That is bada'. It teaches that du'a, repentance and good deeds really change our destiny.</p>`,
src: "The Qur'an 13:39, 10:98; al-Kafi, chapter on bada'; al-Saduq, al-Tawhid" },

/* ---------- Practice ---------- */
{ id: "turbah", c: "practice", q: "Why do Shia pray on a stone (turbah)? Isn't that worshipping it?",
a: `<p>We prostrate <b>on</b> it, not <b>to</b> it, just as everyone prays on a mat or a floor. The Prophet said: <i>"The earth has been made for me a place of prostration and a purifier."</i> The Ahl al-Bayt taught that sajda must be on the earth, or on what grows from it that is not eaten or worn, because sajda is the greatest humility, and placing the forehead on dust is the most humble.</p>
<p>A turbah is simply clean earth, easy to carry. Many prefer the soil of <b>Karbala</b> because Imam al-Sadiq used to prostrate on it, to remember Husayn's sacrifice in every prayer.</p>`,
src: "Man la Yahduruhu al-Faqih; al-Kafi; Wasa'il al-Shi'a, chapter on the place of sajda" },

{ id: "combine", c: "practice", q: "Why do Shia combine prayers? Aren't there five times?",
a: `<p>There are five prayers in <b>three times</b>, as the Qur'an says: <i>"Establish prayer from the declining of the sun until the darkness of the night, and the recitation at dawn"</i> (17:78). The Prophet combined Zuhr with Asr and Maghrib with Isha in Medina, without fear and without travel, so that his Ummah would not face hardship; this report is accepted by both Shia and Sunni scholars, and Imam al-Sadiq confirmed it.</p>
<p>Praying each one at its own best time is still recommended, and many Shia do. Combining is permitted, not required.</p>`,
src: "The Qur'an 17:78; al-Kafi; Tahdhib al-Ahkam" },

{ id: "hands", c: "practice", q: "Why do Shia pray with their hands at their sides?",
a: `<p>Because that is how the Ahl al-Bayt taught the Prophet's prayer. Imam al-Sadiq stood and prayed in front of Hammad ibn Isa to teach him; he let his hands down on his thighs. Folding the arms was not part of the Prophet's prayer; it was added later. Even many Maliki Sunnis pray with open hands to this day.</p>`,
src: "al-Kafi and Man la Yahduruhu al-Faqih (the hadith of Hammad)" },

{ id: "adhan-ali", c: "practice", q: "Why do Shia say \"Ali is the wali of Allah\" in the adhan?",
a: `<p>Our scholars say clearly that it is <b>not a part</b> of the adhan. Shia say it after the two testimonies as a blessed statement of truth (with the intention of tabarruk), because Allah said: <i>"Your guardian (wali) is only Allah, His Messenger and those who believe... while bowing"</i> (5:55). Whoever says it as a part of the adhan makes a mistake; whoever says it as a testimony of truth does a good deed.</p>`,
src: "The Qur'an 5:55; the risalas of the maraji'" },

{ id: "mut'a", c: "practice", q: "Why do Shia allow temporary marriage (mut'a)?",
a: `<p>Because the Qur'an allowed it: <i>"For those you enjoy (istamta'tum) among them, give them their dowries as an obligation"</i> (4:24), and the Prophet allowed it. It was forbidden later by the second caliph. Imam Ali said: <i>"Had it not been forbidden, no one would commit zina except a wretched person."</i></p>
<p>It is a real marriage with conditions: an unmarried or permitted woman, a dowry, a fixed time, and the waiting period (idda) afterwards. It is not a game, and the maraji' warn against misusing it. It exists to protect people from sin, not to harm women or families.</p>`,
src: "The Qur'an 4:24; al-Kafi, Kitab al-Nikah" },

{ id: "feet", c: "practice", q: "Why do Shia wipe the feet in wudu instead of washing them?",
a: `<p>The Qur'an says: <i>"Wash your faces and your hands to the elbows, and <b>wipe</b> your heads and your feet to the ankles"</i> (5:6). The feet are joined to the heads, which are wiped. This is how the Ahl al-Bayt, who lived in the Prophet's house, did wudu.</p>`,
src: "The Qur'an 5:6; al-Kafi, Kitab al-Tahara" },

{ id: "khums", c: "practice", q: "Where does khums come from?",
a: `<p>From the Qur'an: <i>"Know that whatever you gain, a fifth of it is for Allah, the Messenger, the near relatives, the orphans, the needy and the traveller"</i> (8:41). The Ahl al-Bayt explained that "whatever you gain" includes yearly savings, not only war booty. Today it is paid to the marja' or his representative, for religious work and for needy Sayyids.</p>`,
src: "The Qur'an 8:41; al-Kafi, Kitab al-Hujja (chapter on khums)" },

/* ---------- Mourning ---------- */
{ id: "mourning", c: "mourn", q: "Why do Shia mourn for Husayn every year? Isn't weeping a bid'a?",
a: `<ul><li>Prophet <b>Ya'qub</b> wept for Yusuf until his eyes turned white (12:84), and the Qur'an praises him.</li>
<li>The Prophet wept for <b>Hamza</b>, and wept for Husayn on the day he was born, when Jibra'il told him what would happen at Karbala.</li>
<li>Imam al-Rida said: <i>"If you weep for anything, weep for Husayn."</i> Imam al-Sadiq said: <i>"May Allah have mercy on whoever keeps our affair alive."</i></li></ul>
<p>Mourning is not for grief alone. Every year it reminds the world of the difference between Husayn and Yazid, between truth and tyranny. It is why Karbala is not forgotten.</p>`,
src: "The Qur'an 12:84; 'Uyun Akhbar al-Rida; al-Amali of al-Saduq; Kamil al-Ziyarat" },

{ id: "matam", c: "mourn", q: "Is beating the chest (matam) allowed?",
a: `<p>Hitting the chest in grief (latmiya) is an expression of love and sorrow, and the maraji' allow it when it does not cause serious harm. The women of Banu Hashim mourned openly for Husayn, and the Imams held gatherings of mourning.</p>
<p>Cutting the head with blades (tatbir) is different: many maraji' forbid it, and others forbid it when it harms the body or damages the image of the faith. Follow your own marja'.</p>`,
src: "The risalas and fatwas of the maraji'" },

{ id: "shrines", c: "mourn", q: "Why do Shia visit graves and build shrines?",
a: `<p>The Prophet visited the graves of al-Baqi' and of his mother, and told Muslims to visit graves because they remind of the Hereafter. The Qur'an tells how the believers said about the People of the Cave: <i>"We will surely build a place of worship over them"</i> (18:21), and Allah did not condemn it. The Prophet himself is buried inside a building, next to his mosque.</p>
<p>At a shrine we pray to Allah alone, recite Qur'an and send salam to those Allah honoured.</p>`,
src: "The Qur'an 18:21; Kamil al-Ziyarat; al-Kafi, Kitab al-Hajj (ziyara)" },

/* ---------- Companions ---------- */
{ id: "sahaba", c: "sahaba", q: "Do the Shia curse all the companions (Sahaba)?",
a: `<p><b>No.</b> We love and honour the companions who stayed true: <b>Salman, Abu Dharr, Miqdad, Ammar, Jabir, Hudhayfa, Bilal, Hamza, Ja'far</b> and many more. Our books are full of their praise.</p>
<p>But the Qur'an itself says not every companion was righteous: there were hypocrites in Medina whom even the Prophet did not know (9:101), and some fled at Uhud (3:155). So we judge each one by his actions, as the Qur'an does. We keep away from those who wronged the Ahl al-Bayt, as the Qur'an condemns the oppressors (11:18). The major maraji' forbid insulting the figures that other Muslims respect. Sayyid al-Sistani's office, asked about people insulting Umar and A'isha, answered that such behaviour is "condemned, strongly denounced and contrary to the commands of the Imams of the Holy Household of the Prophet."</p>`,
src: "The Qur'an 9:101, 3:155, 11:18; fatwas of the maraji'" },

{ id: "aisha", c: "sahaba", q: "Do the Shia accuse Aisha of immorality?",
a: `<p><b>No.</b> The Shia believe the wives of all the prophets are protected from that kind of sin, because it would dishonour the Prophet. Our criticism is about history: her role in the Battle of <b>Jamal</b> against Imam Ali, the rightful caliph, in which thousands of Muslims died. The major maraji' have forbidden insulting the wives of the Prophet.</p>`,
src: "Shia tafsir of 24:11-26; fatwas of the maraji'" },

{ id: "cave", c: "sahaba", q: "Wasn't Abu Bakr praised for being with the Prophet in the cave (9:40)?",
a: `<p><b>Yes, it is an honour.</b> Abu Bakr accompanied the Prophet ﷺ on the Hijra and was with him in the cave, and the Qur'an mentions it (9:40). Shia scholars do not deny this.</p>
<p>The Shia simply hold that leadership after the Prophet was not decided by companionship, however honoured, but by the Prophet's own appointment at Ghadir. On that same night of the Hijra, Ali lay in the Prophet's bed under the swords of forty men so that the Prophet could leave safely, and Allah revealed: <i>"Among the people is he who sells himself seeking the pleasure of Allah"</i> (2:207). Both nights are part of the story of Islam.</p>`,
src: "The Qur'an 9:40, 18:37, 2:207; Shia tafsir" },

/* ---------- Origin ---------- */
{ id: "origin", c: "origin", q: "Isn't Shia Islam a later invention?",
a: `<p>The word comes from the Qur'an: <i>"And indeed, among his Shia was Ibrahim"</i> (37:83), meaning the followers of Nuh. The Prophet himself used it: when the verse <i>"those who believe and do good, they are the best of creation"</i> (98:7) was revealed, he told Ali: <i>"It is you and your Shia."</i></p>
<p>In the Prophet's own lifetime Salman, Abu Dharr, Miqdad and Ammar were known as the Shia of Ali. Shia Islam did not start after the Prophet; it is staying with what he left: the Qur'an and his Ahl al-Bayt.</p>`,
src: "The Qur'an 37:83, 98:7; Shia tafsir of 98:7; al-Amali of al-Tusi" },

{ id: "different", c: "origin", q: "Do Shia have a different Qur'an, Kalima or religion?",
a: `<p><b>No.</b> One Allah, one Prophet, one Qur'an, one Ka'ba. The Kalima is the same: <i>La ilaha illallah, Muhammadun Rasulullah</i>. We pray five prayers, fast Ramadan, pay zakat and perform Hajj. The difference is about <b>who leads after the Prophet</b> and from whom we take the religion: the Shia take it from the Ahl al-Bayt, whom the Prophet joined to the Qur'an.</p>`,
src: "Hadith al-Thaqalayn; al-Kafi" },

{ id: "abu-talib", c: "origin", q: "Was Abu Talib a believer?",
a: `<p><b>Yes</b>, the Shia are agreed on this, following the Imams. He raised the Prophet, protected him for over forty years, suffered three years of boycott for him, and wrote poems declaring that Muhammad is a true prophet. Imam al-Sadiq said that the example of Abu Talib is like the People of the Cave: they hid their faith and showed something else, and Allah gave them double reward. The Prophet called the year of his death the Year of Sorrow.</p>`,
src: "al-Kafi, Kitab al-Hujja; Kamal al-Din; al-Amini, al-Ghadir (vol. 7-8)" },
{ id: "sayyida-marry", c: "family", q: "Can a Sayyida (a woman from the Prophet's family) marry a non-Sayyid man?",
a: `<p><b>Yes.</b> A Sayyida may marry a non-Sayyid Muslim man. No verse of the Qur'an and no hadith of the Prophet ﷺ or the Imams forbids it, and no Shia jurist forbids it. Refusing it is a cultural custom, not a ruling of Islam.</p>
<ul>
<li><b>The Qur'an:</b> "The most noble of you in the sight of Allah is the most God-conscious of you" (49:13).</li>
<li><b>What the Prophet ﷺ did:</b> he married his own cousin from Banu Hashim, <b>Duba'a bint al-Zubayr ibn Abd al-Muttalib</b>, to <b>al-Miqdad</b>, who was not from Banu Hashim. Imam al-Sadiq explained that he did it to make marriage easy, so that people would follow his example and know that the most noble is the most God-fearing. He also married <b>Zaynab bint Jahsh</b>, his cousin through his aunt Umayma bint Abd al-Muttalib, to his freed slave <b>Zayd ibn Haritha</b>, and sent the poor, tribeless <b>Juwaybir</b> to marry <b>Dhulfa</b>, daughter of the noble Ziyad ibn Labid, telling her father: <i>"A believing man is the equal of a believing woman."</i></li>
<li><b>What the Prophet ﷺ said:</b> <i>"If someone whose religion and character you are pleased with comes to you to propose, marry him. If you do not, there will be fitna on earth and great corruption."</i></li>
<li><b>What the Imams said:</b> Imam al-Jawad wrote these same words to men who asked about marrying their daughters, and told one who said he could find no "equal" for his daughters not to hold back for that reason. Imam Zayn al-Abidin married a freed slave woman; when the caliph Abd al-Malik mocked him, he answered that Islam has raised up the lowly and there is no shame on a Muslim, only the shame of the Jahiliyya.</li>
<li><b>Sayyid al-Sistani:</b> asked <i>"Can a Sayyid girl marry a non-Sayyid man?"</i>, he answered: <i>"It is permissible and there is no objection to it."</i> Other maraji' say the same, and great Sayyid maraji' married their own daughters to non-Sayyid scholars: Imam Khomeini's daughter married Shaykh Shahab al-Din Ishraqi, and Ayatollah Sayyid Muhammad Reza Golpaygani's daughter married Shaykh Lutfullah Safi Golpaygani.</li>
<li><b>Sunni scholars:</b> all four schools hold the marriage valid. Some (Hanafi, Shafi'i) count lineage within <i>kafa'a</i> (suitability), which can give the guardian a right to object, but none calls it haram.</li>
<li><b>Honouring Sayyids:</b> love for the Prophet's family is obligatory (42:23), and Sayyids deserve respect. That honour does not close marriage to other believers. The saying that a Sayyida is "like a mother" to non-Sayyid men has no basis.</li>
</ul>
<p>For any first marriage of a virgin girl, her father's permission is still needed, whoever the groom is. See the next question.</p>`,
src: "Qur'an 49:13, 42:23, 33:36–37; al-Kafi, vol. 5, Kitab al-Nikah (chapter: the believer is the equal of the believing woman — Duba'a and al-Miqdad, Juwaybir and Dhulfa; the letters of Imam al-Jawad; Imam Zayn al-Abidin and Abd al-Malik); Sunan al-Tirmidhi 1084; Sayyid al-Sistani, sistani.org Q&A 15064" },
{ id: "family-refuses", c: "family", q: "My family refuses a good proposal only because he is not a Sayyid. What does Islam say?",
a: `<p>Lineage alone is not a reason Islam accepts for refusing a good believer. But the father's role is real, so this needs patience and wisdom, not rebellion.</p>
<ul>
<li><b>The father's permission:</b> according to Sayyid al-Sistani, a virgin girl needs her father's (or paternal grandfather's) permission to marry, permanent or temporary. If she is independent, this is still required as an obligatory precaution. The permission of the mother, brothers or other relatives is not a condition, though their goodwill matters.</li>
<li><b>The Prophet's warning:</b> <i>"If someone whose religion and character you are pleased with proposes, marry him; if you do not, there will be fitna on earth and great corruption."</i> Turning away a good believer only for his family name goes against this.</li>
<li><b>If the father blocks every suitable match:</b> Sayyid al-Sistani rules that if the father or grandfather prevents her from marrying anyone who is suitable for her in Shari'a and in custom, his permission is no longer required. This is a serious step: take it only after advice from a trusted 'alim or your marja's representative.</li>
</ul>
<p><b>What helps in practice:</b> stay respectful; show the family Sayyid al-Sistani's answer and the example of the Sayyid maraji' who married their daughters to non-Sayyids; ask an 'alim the family trusts to speak with them; pray, and be patient. Never turn to a secret relationship.</p>`,
src: "Sunan al-Tirmidhi 1084; al-Kafi, vol. 5 (Kitab al-Nikah); Sayyid al-Sistani: sistani.org Q&A 15054, 15055 and 15064; Islamic Laws, Ruling 2396" },
{ id: "sayyid-children", c: "family", q: "Can a Sayyid man marry a non-Sayyida? And are the children Sayyids?",
a: `<p><b>Yes, a Sayyid man may marry any Muslim woman</b>, and it has always been common. Most of the Imams' own mothers were not from Banu Hashim: Shahrbanu (mother of Imam Zayn al-Abidin), Umm Farwa (Imam al-Sadiq), Hamida (Imam al-Kazim), Najma (Imam al-Rida), Sabika (Imam al-Jawad), Samana (Imam al-Hadi), Hudayth (Imam al-Askari) and Narjis (Imam al-Mahdi).</p>
<ul>
<li><b>Through the father:</b> in fiqh, being a Sayyid (Hashimi) passes through the father. The children of a Sayyid father are Sayyids: a needy Sayyid may receive Sahm al-Sadat from khums, and may not take zakat from non-Sayyids except in necessity.</li>
<li><b>Through the mother:</b> the children of a Sayyida and a non-Sayyid father are not counted as Sayyids for these rulings, in the view of most jurists. They are still the Prophet's descendants through their mother, and that is an honour.</li>
</ul>
<p>Lady Fatima is the exception that proves the honour: through her, Hasan and Husayn are called the Prophet's own sons in the verse of Mubahala, "our sons" (3:61).</p>`,
src: "Qur'an 3:61; al-Mufid, al-Irshad (the mothers of the Imams); Muhammad Hasan al-Najafi, Jawahir al-Kalam (Kitab al-Khums: the share of the Sayyids is for those descended from Hashim through the father); Sayyid al-Sistani, Islamic Laws: Khums, Zakat" },
{ id: "unity", c: "origin", q: "How should a Shia treat Sunni Muslims?",
a: `<p><b>As brothers and sisters in Islam.</b> We share one Allah, one Prophet ﷺ, one Qur'an and one qibla. Love for the Ahl al-Bayt is something we share with them too.</p>
<ul>
<li><b>Imam al-Sadiq (AS)</b> told his followers to attend their funerals, visit their sick, and be present with the people in their mosques for prayer.</li>
<li><b>Imam Ali (AS)</b>, hearing his soldiers revile the Syrians at Siffin, told them: <i>"I dislike that you should be revilers. If you described their deeds and spoke of their situation, it would be closer to the truth."</i></li>
<li><b>The Qur'an</b> forbids insulting even what others worship, "lest they insult Allah" (6:108).</li>
<li><b>Sayyid al-Sistani</b>'s office, asked about people insulting figures Sunnis respect, called it "condemned, strongly denounced and contrary to the commands of the Imams of the Holy Household." He has repeatedly called Sunnis "our brothers".</li>
<li><b>Sayyid Ali Khamenei</b> ruled in 2010: <i>"Insulting figures and symbols celebrated by Sunni brethren, including the wife of the Prophet of Islam, is prohibited."</i></li>
</ul>
<p>We can explain our beliefs and our history with evidence, and still keep our tongues clean. That is the way of the Ahl al-Bayt.</p>`,
src: "Qur'an 6:108; al-Kafi, vol. 8 (al-Rawda: attend their funerals, visit their sick, pray in their mosques); Nahj al-Balagha, sermon 206; Office of Sayyid al-Sistani, answer on insulting Sunni figures (imam-us.org); Sayyid Ali Khamenei, fatwa of 30 September 2010" },
{ id: "shia-sunni-marry", c: "family", q: "Can a Shia marry a Sunni?",
a: `<p><b>Yes, in principle.</b> Shia and Sunni are both Muslims, and a marriage between them is a valid Islamic marriage. The Shia maraji' add one main caution: <b>protecting the faith of the Shia spouse and of the children.</b></p>
<ul>
<li><b>A Shia man marrying a Sunni woman</b> is allowed by the maraji', as long as he isn't at risk of losing his own beliefs. Scholars encourage kindness and good character, so that the home is built on love, not argument.</li>
<li><b>A Shia woman marrying a Sunni man</b> is where the maraji' are more careful, because a wife and children often follow the husband's way:
<ul>
<li><b>Sayyid al-Sistani</b>'s office: it is fine for a Shia man to marry a Sunni woman; for a Shia woman marrying a Sunni man, if there is a real chance of her being led away from her beliefs, it is not permissible.</li>
<li><b>Ayatullah Makarem Shirazi</b> gives the same reason and does not permit it.</li>
<li><b>Ayatullah Bahjat</b>: not permissible as an obligatory precaution.</li>
<li><b>Ayatullah Fazel Lankarani</b>: makruh (discouraged), but valid.</li>
</ul>
Follow your own marja'. If her faith is strong and secure, some maraji' allow it.</li>
<li><b>A virgin woman needs her father's permission</b> (Sistani: as a precaution, even if she is independent). This applies whoever she marries.</li>
<li><b>The one exception everyone agrees on:</b> not with a <i>Nasibi</i>, someone openly hostile to the Ahl al-Bayt (AS). That is not the ordinary Sunni Muslim, who loves the Prophet's family too.</li>
</ul>
<p><b>The Sunni side:</b> many Sunni scholars also allow it (for example SeekersGuidance, a Hanafi institute, answered a Shia man that marrying a Sunni woman is permissible); some Sunni muftis are stricter. So both families may hear different opinions, and that is normal.</p>
<p><b>Practical advice:</b> talk honestly before marriage about prayer, Muharram, how the children will be raised, and respect for each other's scholars and figures. A marriage where neither side mocks what the other holds dear is the one that lasts.</p>`,
src: "Office of Sayyid al-Sistani, Ayatullah Makarem Shirazi, Ayatullah Bahjat and Ayatullah Fazel Lankarani, answers compiled at islamquest.net (question 1852, \"Is it permissible for Shias to get married to Sunnis?\"); Sayyid al-Sistani, Q&A on permanent marriage (sistani.org/14872, father's consent); al-Kafi, vol. 5, Kitab al-Nikah, chapter on marrying the Nawasib; al-islam.org, \"Is marriage between Shia and Sunni allowed?\"; SeekersGuidance, \"Is it permissible for a Shia man to marry a girl who is Sunni?\"" },
];
