/* =========================================================
   The Path of the Ahl al-Bayt — content
   The history of Islam as narrated by the Ahl al-Bayt and
   their followers, with proofs from Sunni books too.
   ========================================================= */

const ERAS = [
  { id: "prophet",  name: "The Prophet & Ali",            years: "610–632 CE · before Hijra–11 AH", color: "#2f8f6b" },
  { id: "after",    name: "After the Prophet",            years: "632–656 CE · 11–35 AH",           color: "#b9822e" },
  { id: "ali",      name: "Imam Ali's Caliphate",         years: "656–661 CE · 35–40 AH",           color: "#3d6fb3" },
  { id: "umayyad",  name: "Karbala & the Umayyads",       years: "661–750 CE · 40–132 AH",          color: "#a83a3a" },
  { id: "abbasid",  name: "Imams under the Abbasids",     years: "750–874 CE · 132–260 AH",         color: "#7a4fa3" },
  { id: "ghayba",   name: "The Occultation",              years: "874 CE – today · 260 AH –",       color: "#3b8a95" }
];

/* ---------------------------------------------------------
   STORIES
   --------------------------------------------------------- */
const STORIES = [

/* ===================== THE PROPHET & ALI ===================== */
{
  id: "kaaba-birth", era: "prophet",
  title: "Born inside the Ka'ba",
  arabic: "مولد علي في الكعبة",
  when: "13 Rajab, c. 600 CE (about 30 years before Hijra)", where: "Mecca",
  summary: "Ali ibn Abi Talib is the only person reported to have been born inside the House of Allah, and he grew up in the Prophet's own home.",
  body: `
<p>Fatima bint Asad, the wife of Abu Talib, came to the Ka'ba in the pains of labour and prayed beside its wall. Our narrations, and even Sunni scholars such as al-Hakim al-Nishaburi, report that the wall opened for her, she went inside, and three days later she came out holding a baby boy: <strong>Ali</strong>.</p>
<p>Abu Talib was the Prophet's uncle and guardian. When Mecca was struck by famine, the Prophet ﷺ offered to lighten his uncle's burden and took young Ali into his own home. Ali later described those years: he followed the Prophet the way a young camel follows its mother, and every day the Prophet taught him something of his character.</p>
<p>When the first revelation came in 610 CE, Ali was about ten years old. He was the first male to believe in the Prophet, and he prayed behind him with Khadija when no one else in the world prayed that prayer.</p>`,
  lesson: "Ali was not a companion who joined later. He was raised by the Prophet himself, which is why Shia Muslims see him as the one who knew the Prophet best.",
  sources: "al-Hakim, al-Mustadrak; Shaykh al-Mufid, Kitab al-Irshad; Nahj al-Balagha, sermon 192 (al-Qasi'a)"
},
{
  id: "dhul-ashira", era: "prophet",
  title: "The Feast of the Clan",
  arabic: "دعوة ذي العشيرة",
  when: "c. 613 CE, 3rd year of the mission", where: "Mecca",
  summary: "When Allah told the Prophet to warn his nearest relatives, he invited them to a meal and asked who would be his brother, his executor and his successor.",
  body: `
<p>Allah revealed: <em>"And warn your nearest kinsfolk"</em> (Qur'an 26:214). The Prophet ﷺ asked Ali to prepare a simple meal and invited about forty men of Banu Hashim. The first time, his uncle Abu Lahab broke up the gathering before he could speak. The next day he invited them again.</p>
<p>After they had eaten, the Prophet stood and said that he had brought them the best of this world and the next, and asked: <strong>which of you will help me in this matter, so that he will be my brother, my executor (wasi) and my successor (khalifa) among you?</strong></p>
<p>Silence. Then the youngest person there, Ali, about thirteen, stood up and said, "I will, O Messenger of Allah." The Prophet told him to sit and repeated the question. Three times he asked, and three times only Ali stood. Then the Prophet put his hand on Ali's neck and declared him his brother, executor and successor, and told them to listen to him and obey him.</p>
<p>The men got up laughing, and some of them mocked Abu Talib: "He has ordered you to listen to your son and obey him!"</p>`,
  lesson: "For Shia Muslims, the question of succession was not raised for the first time at the Prophet's death. It was answered on the first day of the public call to Islam.",
  sources: "al-Tabari, Tarikh al-Rusul wa al-Muluk; Ibn al-Athir, al-Kamil; Ahmad ibn Hanbal, Musnad (shorter version)",
  proof: "Recorded by al-Tabari in his History and by Ibn al-Athir. In some later printings of al-Tabari's Tafsir the words 'my executor and successor' were replaced with 'so-and-so': the original wording was too clear to leave."
},
{
  id: "laylat-al-mabit", era: "prophet",
  title: "The Night Ali Slept in the Prophet's Bed",
  arabic: "ليلة المبيت",
  when: "1 Rabi al-Awwal, 1 AH (622 CE)", where: "Mecca",
  summary: "The Quraysh planned to kill the Prophet in his bed. Ali lay down in his place, knowing the swords were waiting outside.",
  body: `
<p>The leaders of Quraysh met in Dar al-Nadwa and agreed on a plan: one young man from every clan would strike the Prophet ﷺ at the same moment, so that no single tribe could be blamed and Banu Hashim could not take revenge against them all.</p>
<p>Allah informed His Messenger, and he was commanded to migrate. He asked Ali to sleep in his bed, covered in his green cloak, so the assassins watching the house would think he was still there. Ali's only question was: <em>"Will you be safe if I do this?"</em> When the Prophet said yes, Ali fell into prostration in thanks.</p>
<p>All night the killers watched the house. At dawn they rushed in with drawn swords and found Ali getting out of the bed. "Where is Muhammad?" they demanded. "Did you leave him with me to guard?" he answered. By then the Prophet was safely on his way, hiding in the cave of Thawr.</p>
<p>Ali stayed in Mecca for three more days to return the valuables people had left with the Prophet. Even his enemies had trusted him with their money. Then he migrated to Medina on foot, bringing the Prophet's daughter Fatima and other women of the family with him.</p>
<p>Many commentators report that this verse was revealed about that night: <em>"And among the people is he who sells his own self seeking the pleasure of Allah"</em> (Qur'an 2:207).</p>`,
  lesson: "Wilayah (loyalty to the Ahl al-Bayt) begins here: putting your own life below the life of the Messenger.",
  sources: "Ibn Hisham, al-Sira al-Nabawiyya; al-Hakim, al-Mustadrak; al-Tha'labi, Tafsir; Kitab al-Irshad"
},
{
  id: "brotherhood", era: "prophet",
  title: "\"You Are My Brother\"",
  arabic: "حديث المؤاخاة والمنزلة",
  when: "1 AH and 9 AH", where: "Medina and Tabuk",
  summary: "In Medina the Prophet made every Muslim a brother to another. He kept Ali for himself, and later told him: you are to me as Harun was to Musa.",
  body: `
<p>After the Hijra, the Prophet ﷺ paired the emigrants from Mecca with the helpers of Medina as brothers, to share homes and wealth. He paired everyone, but Ali was left without a partner. Ali came to him with tears in his eyes and asked why. The Prophet said: <strong>"You are my brother in this world and in the Hereafter."</strong></p>
<p>Years later, in 9 AH, the Prophet marched to Tabuk and left Ali behind in Medina to look after the city. The hypocrites spread the rumour that the Prophet had left him behind because he found him a burden. Ali caught up with the army and told the Prophet what people were saying.</p>
<p>The Prophet answered with words recorded in both Sahih al-Bukhari and Sahih Muslim: <strong>"Are you not pleased to be to me as Harun was to Musa, except that there is no prophet after me?"</strong></p>
<p>In the Qur'an, Harun was Musa's brother, his helper, his partner in the mission, and his deputy over the people when Musa went away (Qur'an 20:29–32, 7:142). Every one of those roles, except prophethood, belongs to Ali.</p>`,
  lesson: "This is called Hadith al-Manzila (the hadith of rank). Even Sahih al-Bukhari and Sahih Muslim record it. Harun was Musa's successor; Ali is the Prophet's.",
  sources: "Sahih al-Bukhari, Book of the Companions; Sahih Muslim, Virtues of Ali; Sunan al-Tirmidhi"
},
{
  id: "khaybar", era: "prophet",
  title: "The Banner at Khaybar",
  arabic: "يوم خيبر",
  when: "7 AH (628 CE)", where: "Khaybar, north of Medina",
  summary: "After others failed to take the fortress, the Prophet said: tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom they love.",
  body: `
<p>The Muslim army besieged the fortified Jewish settlements of Khaybar. Day after day the banner was given to senior companions, and each time they returned without conquering the main fortress of al-Qamus.</p>
<p>Then the Prophet ﷺ announced: <strong>"Tomorrow I will give the banner to a man who loves Allah and His Messenger, and Allah and His Messenger love him. Allah will grant victory at his hands."</strong> That night the companions could not sleep, each one hoping it would be him. Umar ibn al-Khattab later said he had never wanted leadership except on that day.</p>
<p>In the morning the Prophet asked, "Where is Ali?" They said he was suffering from an eye infection and could not see. The Prophet called him, put his blessed saliva on Ali's eyes, and they were healed so completely that Ali said he never had eye pain again. He was given the banner.</p>
<p>At the gate, the champion Marhab came out boasting in verse. Ali answered him and killed him with a single blow. Then, the historians say, Ali tore the heavy gate off the fortress and used it as a shield. Khaybar was conquered.</p>`,
  lesson: "Years later, when Muawiya asked the companion Sa'd ibn Abi Waqqas why he would not curse Ali, Sa'd named this day as one of the three reasons. (Sahih Muslim)",
  sources: "Sahih al-Bukhari, Book of Military Expeditions; Sahih Muslim, Virtues of Ali; Ibn Hisham, al-Sira"
},
{
  id: "mubahala", era: "prophet",
  title: "Mubahala & the People of the Cloak",
  arabic: "المباهلة وحديث الكساء",
  when: "24 Dhul Hijja, 9–10 AH (631 CE)", where: "Medina",
  summary: "When the Prophet had to bring 'our sons, our women and ourselves', he brought only Hasan, Husayn, Fatima and Ali.",
  body: `
<p>A delegation of Christian scholars came from Najran to debate the Prophet ﷺ about Jesus. When they would not accept the argument, Allah revealed the verse of Mubahala, a challenge to call down Allah's curse on whoever was lying:</p>
<p class="ayah">فَقُلْ تَعَالَوْا نَدْعُ أَبْنَاءَنَا وَأَبْنَاءَكُمْ وَنِسَاءَنَا وَنِسَاءَكُمْ وَأَنفُسَنَا وَأَنفُسَكُمْ</p>
<p><em>"Say: come, let us call our sons and your sons, our women and your women, ourselves and yourselves, then let us pray and invoke Allah's curse upon the liars"</em> (Qur'an 3:61).</p>
<p>The Prophet had many companions and wives, but he came out holding Husayn, leading Hasan by the hand, with Fatima walking behind him and Ali behind her. Sahih Muslim records that when this verse came down he called Ali, Fatima, Hasan and Husayn and said: <strong>"O Allah, these are my family (ahli)."</strong> When the Christian bishop saw their faces he told his people not to go through with it, saying that if these faces asked Allah to move a mountain, He would move it. They made a peace treaty instead.</p>
<h4>The Cloak (al-Kisa)</h4>
<p>On another occasion, in the house of Umm Salama, the Prophet gathered the same four under his cloak and recited: <em>"Allah only wishes to remove all impurity from you, O People of the House (Ahl al-Bayt), and to purify you completely"</em> (Qur'an 33:33). Umm Salama asked, "Am I with them, O Messenger of Allah?" He replied, "You are in your place, and you are upon good," but he did not bring her in.</p>`,
  lesson: "This is how Shia Muslims know exactly who the Ahl al-Bayt are: the Prophet named them himself, by bringing them under one cloak.",
  sources: "Sahih Muslim, Virtues of the Companions (hadiths of Sa'd and of A'isha); Sunan al-Tirmidhi (Umm Salama); Tafsir al-Tabari on 3:61 and 33:33"
},
{
  id: "ghadir", era: "prophet",
  title: "Ghadir Khumm",
  arabic: "غدير خم",
  when: "18 Dhul Hijja, 10 AH (March 632 CE)", where: "Pond of Khumm, near al-Juhfa",
  summary: "On the way home from his last Hajj, in the desert heat, the Prophet stopped tens of thousands of pilgrims, raised Ali's hand and declared: whoever I am his master, Ali is his master.",
  body: `
<p>It was the Prophet's ﷺ farewell pilgrimage, and he had told the people he might not meet them again after that year. On the journey back to Medina, at a place called Ghadir Khumm, just before the caravans split up to go to their own regions, he stopped. This verse had just come down:</p>
<p><em>"O Messenger, convey what has been sent down to you from your Lord. If you do not, you will not have conveyed His message. And Allah will protect you from the people"</em> (Qur'an 5:67).</p>
<p>He sent for those who had gone ahead to come back, and waited for those behind to catch up. It was midday and so hot that people wrapped cloth around their feet. A pulpit was made from camel saddles. After a long sermon, he asked: <strong>"Do I not have more authority over the believers than they have over themselves?"</strong> They answered, "Yes, O Messenger of Allah." Then he took Ali's hand, raised it until people could see the whiteness of their armpits, and said:</p>
<p class="ayah">مَنْ كُنْتُ مَوْلَاهُ فَعَلِيٌّ مَوْلَاهُ</p>
<p><strong>"Whoever I am his mawla (master), Ali is his mawla. O Allah, befriend whoever befriends him, and be the enemy of whoever is his enemy."</strong></p>
<p>He also left them the Hadith of the Two Weighty Things (al-Thaqalayn): <strong>"I am leaving among you two weighty things: the Book of Allah and my family, my Ahl al-Bayt."</strong> In other narrations he adds that they will never separate until they meet him at the Pond, and that whoever holds onto both will never go astray.</p>
<p>A tent was set up and people came to congratulate Ali. Musnad Ahmad records that Umar ibn al-Khattab was among them and said: "Congratulations, son of Abu Talib! You have become the mawla of every believing man and woman." The poet Hassan ibn Thabit asked permission and recited a poem about the day on the spot. Shia tradition holds that afterwards Allah revealed: <em>"Today I have perfected your religion for you, completed My favour upon you"</em> (Qur'an 5:3).</p>
<p>About seventy days later, the Prophet passed away.</p>`,
  lesson: "Eid al-Ghadir (18 Dhul Hijja) is the greatest Eid, because it is the day the line of guidance after the Prophet was publicly announced.",
  sources: "Musnad Ahmad; Sunan al-Tirmidhi; Sunan Ibn Majah; al-Hakim, al-Mustadrak; Sahih Muslim (Thaqalayn, narrated by Zayd ibn Arqam at Khumm); al-Amini, al-Ghadir (lists 110 companions who narrated it)",
  proof: "Ghadir is narrated by more than 100 companions and is found in Musnad Ahmad, Sunan al-Tirmidhi, Sunan Ibn Majah and al-Mustadrak. Allamah al-Amini gathered them in the 11 volumes of al-Ghadir. The Prophet first asked 'Do I not have more authority over you than yourselves?', so 'mawla' here can only mean the one with that same authority. Why else would he stop the pilgrims in the midday heat just to say 'Ali is your friend'?"
},
{
  id: "pen-paper", era: "prophet",
  title: "The Pen and Paper",
  arabic: "رزية يوم الخميس",
  when: "Thursday, a few days before the Prophet's death, 11 AH", where: "The Prophet's house, Medina",
  summary: "On his sickbed the Prophet asked for something to write a document so the Ummah would never go astray. He was not allowed to write it.",
  body: `
<p>The Prophet ﷺ was very ill and the room was full of companions. He said: <strong>"Bring me something to write on, so I can write you a document after which you will never go astray."</strong></p>
<p>Sahih al-Bukhari records what happened next. Umar said: "The Prophet is overcome by pain. We have the Book of Allah, and it is enough for us." The people in the room began to argue. Some said, "Bring it so he can write," and others repeated what Umar had said. The voices grew loud in front of the Prophet, until he said: <strong>"Get up and leave me."</strong></p>
<p>The document was never written. Ibn Abbas, the Prophet's cousin, used to weep when he told this story, until his tears wet the pebbles, and he called it <em>"the calamity, the whole calamity"</em>: what came between the Messenger of Allah and the writing of that document.</p>
<p>Shia Muslims point out that the Prophet used the same words here, "you will never go astray", as in the Hadith of the Two Weighty Things, which tells them what he intended to write.</p>`,
  lesson: "Shia scholars see this as the first open sign that some were ready to set aside the Prophet's wishes about what came after him.",
  sources: "Sahih al-Bukhari, Book of Knowledge and Book of Military Expeditions; Sahih Muslim, Book of Wills",
  proof: "Recorded in Sahih al-Bukhari and Sahih Muslim, the two most trusted Sunni books. Ibn Abbas, the Prophet's cousin, called it 'the calamity, the whole calamity'."
},

/* ===================== AFTER THE PROPHET ===================== */
{
  id: "saqifa", era: "after",
  title: "Saqifa: The Meeting Held While Ali Washed the Prophet",
  arabic: "سقيفة بني ساعدة",
  when: "Monday, 28 Safar 11 AH (Shia dating), the day of the Prophet's death", where: "Saqifa of Banu Sa'ida, Medina",
  summary: "While the Prophet's family was washing and shrouding him, a small group met in a shaded courtyard and chose a leader.",
  body: `
<p>The Prophet ﷺ passed away with his head resting on Ali's chest. Ali, al-Abbas and the men of Banu Hashim began washing his body and preparing him for burial.</p>
<p>At the same time, some of the Ansar (people of Medina) gathered at the roofed courtyard (saqifa) of Banu Sa'ida around their chief, Sa'd ibn Ubada, to choose a leader. When Abu Bakr, Umar and Abu Ubayda heard, they hurried there. The meeting turned into a heated argument. The Ansar suggested "a leader from us and a leader from you." The Quraysh men argued that the Arabs would only accept a leader from Quraysh, because they were the Prophet's tribe. Then Umar took Abu Bakr's hand and pledged allegiance to him, and others followed.</p>
<p>When Ali was told that the Quraysh had argued by being the Prophet's tree, he said: <strong>"They argued by the tree, and wasted its fruit."</strong> (Nahj al-Balagha, sermon 67)</p>
<p>Ali, Banu Hashim and companions like Salman al-Farsi, Abu Dharr, al-Miqdad, Ammar ibn Yasir and al-Zubayr did not give their pledge that day. Sahih al-Bukhari records that Ali did not pledge allegiance while Fatima was alive, for about six months. The Prophet's burial was attended by very few of those who had been at Saqifa.</p>
<p>Umar himself later described the pledge as <em>falta</em>, a hasty affair "whose evil Allah protected us from," and warned that anyone who repeated it should be killed. (Sahih al-Bukhari)</p>`,
  lesson: "For Shia Muslims, Saqifa is where the community turned from the man named at Ghadir to a leader chosen by a few people in a few hours.",
  sources: "Sahih al-Bukhari, Book of Punishments (Umar's sermon on Saqifa); al-Tabari, Tarikh; Nahj al-Balagha, sermon 67",
  proof: "Sahih al-Bukhari records Umar himself calling the pledge at Saqifa a 'falta', a hasty slip, and records that Ali did not pledge for six months. A 'consultation' that left out the Prophet's own family, while they were burying him, was no consultation at all."
},
{
  id: "fadak", era: "after",
  title: "Fadak and the Sermon of Fatima",
  arabic: "فدك والخطبة الفدكية",
  when: "11 AH", where: "The Prophet's Mosque, Medina",
  summary: "The land the Prophet had given his daughter was taken. Fatima came to the mosque and defended her right with the Qur'an.",
  body: `
<p>Fadak was a village of palm orchards near Khaybar that surrendered without battle, so it belonged personally to the Prophet ﷺ (Qur'an 59:6). When the verse <em>"And give the relative his right"</em> (17:26) was revealed, the Prophet gave Fadak to Fatima, and her workers managed it.</p>
<p>Soon after the Prophet's death, the new government removed her workers. Fatima came to Abu Bakr. He answered with a hadith that only he reported: <em>"We prophets do not leave inheritance; whatever we leave is charity."</em></p>
<p>Fatima entered the Prophet's Mosque surrounded by the women of her family, a curtain was hung, and she gave a long sermon. She praised Allah, explained the purpose of every pillar of Islam, reminded the people who her father was and who her husband was, and then answered the hadith with the Qur'an:</p>
<ul>
<li><em>"And Sulayman inherited from Dawud"</em> (27:16)</li>
<li>Zakariyya praying for a son <em>"who will inherit from me and inherit from the family of Ya'qub"</em> (19:6)</li>
<li><em>"Allah instructs you concerning your children: for the male, the share of two females"</em> (4:11)</li>
</ul>
<p>She asked: did Allah reveal a verse that excluded my father? Or do you say that people of two religions do not inherit from each other? Am I not of the same religion as my father? She also said that if it was a gift, not an inheritance, she had witnesses. Ali and Umm Ayman testified, a woman the Prophet had promised Paradise, but the testimony was not accepted.</p>
<p>Sahih al-Bukhari records the result: Fatima became angry with Abu Bakr and stayed away from him, and did not speak to him until she died. The same book records the Prophet's words: <strong>"Fatima is a part of me. Whoever angers her has angered me."</strong></p>`,
  lesson: "Fadak was never about palm trees. Fatima used it to stand in public and show which side the Prophet's own family was on.",
  sources: "Sahih al-Bukhari, Book of Khums and Book of Military Expeditions; Ibn Tayfur, Balaghat al-Nisa (3rd century AH, earliest written text of the sermon); al-Ihtijaj of al-Tabrisi",
  proof: "Sahih al-Bukhari records both that Fatima died angry with Abu Bakr, and that the Prophet said whoever angers Fatima angers him. Even the Umayyad caliph Umar ibn Abd al-Aziz later admitted Fadak had been taken unjustly and returned it to her children."
},
{
  id: "door", era: "after",
  title: "The Door of Fatima's House",
  arabic: "الهجوم على بيت فاطمة",
  when: "11 AH", where: "The house of Ali and Fatima, Medina",
  summary: "Those who refused to pledge gathered in Ali's house. A group came to force them out, and Fatima was injured at her own door.",
  body: `
<p>After Saqifa, Ali, al-Zubayr and others who refused to pledge gathered in the house of Ali and Fatima, the house the Prophet ﷺ used to stand at every morning, greeting its people as the Ahl al-Bayt.</p>
<p>Several early Sunni sources, such as the <em>Musannaf</em> of Ibn Abi Shayba and al-Baladhuri's <em>Ansab al-Ashraf</em>, record that Umar came to the house and swore he would burn it down on those inside if they did not come out to give allegiance. When someone told him, "Fatima is inside," he answered, "Even if she is."</p>
<p>Our Imams and scholars tell the rest. Fatima stood behind the door. It was pushed in on her, she was crushed between the door and the wall and struck, and she lost the son she was carrying, whom the Prophet had named <strong>Muhsin</strong>. Ali was taken to the mosque by force. Fatima never recovered from her injuries.</p>
<p>Al-Tabari also records Abu Bakr, on his deathbed, saying he wished he had left Fatima's house alone and never opened it.</p>`,
  lesson: "The days of mourning for Lady Fatima (Ayyam al-Fatimiyya) in Jumada al-Ula and Jumada al-Thani remember these events.",
  sources: "Ibn Abi Shayba, al-Musannaf; al-Baladhuri, Ansab al-Ashraf; al-Tabari, Tarikh (Abu Bakr's regret); Shia: Kitab Sulaym ibn Qays, al-Ihtijaj, Dala'il al-Imama",
  proof: "The threat to burn the house with Fatima inside is in Sunni books: the Musannaf of Ibn Abi Shayba and al-Baladhuri's Ansab al-Ashraf. Al-Tabari records Abu Bakr regretting, on his deathbed, that he had ever opened Fatima's house."
},
{
  id: "fatima-burial", era: "after",
  title: "Buried at Night, Her Grave Hidden",
  arabic: "شهادة الزهراء ودفنها ليلاً",
  when: "Jumada al-Ula or al-Thani, 11 AH, 75 or 95 days after the Prophet", where: "Medina",
  summary: "The Prophet's only daughter died months after him. By her own wish, she was buried at night, and to this day nobody knows where her grave is.",
  body: `
<p>After her father's death, Fatima was rarely seen without tears. She would go to the graves of the martyrs of Uhud and to al-Baqi to weep, until people complained about the sound of her crying, and Ali built her a small shelter in al-Baqi, known as <em>Bayt al-Ahzan</em>, the House of Sorrows.</p>
<p>Before she died she made her will to Ali: to wash her body himself, to bury her at night, and not to let those who had wronged her attend her funeral or pray over her. Sahih al-Bukhari confirms that Ali buried her at night and did not inform Abu Bakr.</p>
<p>Ali buried her with a handful of companions. Then, the reports say, he made several false graves so no one could find the real one. Standing at her grave, he turned to the Prophet's grave and said: <em>"Peace be upon you, O Messenger of Allah, from me and from your daughter who has come to you and hurried to join you. My patience over your chosen one has run thin… Your daughter will tell you how your Ummah joined together to oppress her."</em> (Nahj al-Balagha, sermon 202)</p>
<p>She was about eighteen years old. Her hidden grave is a silent protest that still speaks: if you want to know who her opponents were, ask why her grave is hidden.</p>`,
  lesson: "Fatima al-Zahra is the link between prophethood and imamate: daughter of the Prophet, wife of the first Imam, mother of the next ten.",
  sources: "Sahih al-Bukhari, Book of Military Expeditions (Khaybar chapter); Nahj al-Balagha, sermon 202; Shaykh al-Mufid, al-Amali"
},
{
  id: "patience", era: "after",
  title: "Twenty-Five Years of Patience",
  arabic: "صبر أمير المؤمنين",
  when: "11–35 AH (632–656 CE)", where: "Medina",
  summary: "Ali stepped back from power for a quarter of a century, but never stepped back from Islam. He advised the caliphs, judged cases and protected the religion.",
  body: `
<p>After Fatima's death, Ali faced a choice: fight for his right and split a young Ummah that had enemies on every border, or be patient. He chose patience. In the sermon known as <em>al-Shaqshaqiyya</em> he described it in his own words: he thought about whether to fight with no helpers or to endure a blinding darkness, and he found that patience was wiser, <strong>so he was patient, "with a thorn in the eye and a bone in the throat,"</strong> watching his inheritance being taken.</p>
<p>He did not withdraw from the community. During those years:</p>
<ul>
<li>He gathered the Qur'an in the order it was revealed, with notes on where and why each part came down.</li>
<li>He solved legal cases the caliphs could not. Even Sunni sources report Umar saying many times, <em>"Were it not for Ali, Umar would have perished,"</em> and asking Allah never to leave him with a problem that Ali was not there to solve.</li>
<li>When Umar wanted to lead the army against Persia himself, Ali advised him to stay in Medina, because if the leader fell the whole Arab world would collapse. (Nahj al-Balagha, sermon 146)</li>
<li>He named three of his sons Abu Bakr, Umar and Uthman. Two of them were martyred beside their brother Husayn at Karbala.</li>
</ul>
<p>He also worked with his own hands: he dug wells and planted palm groves around Medina, then gave them away as endowments for the poor.</p>`,
  lesson: "Ali taught that unity of the Muslims and protection of Islam come before personal right. Shia scholars still point to this as the model for how to live with other Muslims.",
  sources: "Nahj al-Balagha, sermons 3 (al-Shaqshaqiyya) and 146; Ibn Abd al-Barr, al-Isti'ab; Kitab al-Irshad"
},
{
  id: "shura", era: "after",
  title: "The Council of Six",
  arabic: "الشورى",
  when: "23 AH (644 CE)", where: "Medina",
  summary: "Before he died, Umar named six men to choose the next caliph. The final choice came down to a single condition, which Ali refused.",
  body: `
<p>Umar was stabbed during the dawn prayer by a slave named Abu Lu'lu'a. Before he died he named six men to choose a caliph from among themselves within three days: <strong>Ali, Uthman, Abd al-Rahman ibn Awf, Sa'd ibn Abi Waqqas, al-Zubayr and Talha.</strong> If they split evenly, the side with Abd al-Rahman ibn Awf would win.</p>
<p>Ali saw at once how the votes would fall: Sa'd would not go against his cousin Abd al-Rahman, and Abd al-Rahman was Uthman's brother-in-law. In the Shaqshaqiyya sermon he asked with pain how he could be made equal to these men, and when had there ever been doubt about him compared with the first of them?</p>
<p>On the last day, Abd al-Rahman offered the caliphate to Ali first, on one condition: that he rule by the Book of Allah, the Sunnah of His Messenger, <strong>and the way of the two previous caliphs</strong>, Abu Bakr and Umar.</p>
<p>Ali answered: by the Book of Allah, the Sunnah of His Messenger, and my own judgement. He would not tie Islam to the decisions of other men. The same offer was made to Uthman, who accepted all three conditions, and he became the third caliph.</p>`,
  lesson: "Ali turned down power rather than accept that anything except the Qur'an and the Prophet's Sunnah could bind the religion.",
  sources: "al-Tabari, Tarikh; Ibn Qutayba, al-Imama wa al-Siyasa; Nahj al-Balagha, sermon 3"
},
{
  id: "abu-dharr", era: "after",
  title: "Abu Dharr: Exiled to the Desert",
  arabic: "نفي أبي ذر إلى الربذة",
  when: "c. 30–32 AH", where: "Damascus, Medina, al-Rabadha",
  summary: "The companion who spoke against the governors' wealth was exiled to a desert village and died there almost alone, just as the Prophet had foretold.",
  body: `
<p>Abu Dharr al-Ghifari was one of the first five or so people to accept Islam, and the Prophet ﷺ said that the sky had never shaded a more truthful man. He was among those who stayed loyal to Ali after Saqifa.</p>
<p>Under Uthman, wealth from the conquests poured in. Governors, many of them Uthman's Umayyad relatives, built palaces. In Damascus, Muawiya was building his Green Palace. Abu Dharr stood in the streets reciting: <em>"Those who hoard gold and silver and do not spend it in the way of Allah, give them news of a painful punishment"</em> (Qur'an 9:34).</p>
<p>Muawiya complained to Uthman, who had Abu Dharr brought back to Medina on a camel without a saddle. In Medina he continued speaking, so he was exiled to al-Rabadha, a barren place in the desert, and people were ordered not to see him off. Ali, Hasan, Husayn, Aqil and Ammar went with him anyway. Ali told him: <em>"You became angry for the sake of Allah, so hope in the One for whom you became angry. They feared you for their world, and you feared them for your religion."</em> (Nahj al-Balagha, sermon 130)</p>
<p>Years before, on the march to Tabuk, Abu Dharr had fallen behind and walked alone, and the Prophet had said: <strong>"May Allah have mercy on Abu Dharr. He walks alone, he will die alone, and he will be raised alone."</strong> In al-Rabadha he died with only his wife and daughter beside him. A passing caravan with Abdullah ibn Mas'ud buried him, and Ibn Mas'ud wept, remembering the Prophet's words.</p>`,
  lesson: "Loyalty to the Ahl al-Bayt meant speaking for the poor, even against a caliph.",
  sources: "Ibn Hisham, al-Sira (Tabuk); al-Baladhuri, Ansab al-Ashraf; al-Mas'udi, Muruj al-Dhahab; Nahj al-Balagha, sermon 130"
},

/* ===================== IMAM ALI'S CALIPHATE ===================== */
{
  id: "ali-justice", era: "ali",
  title: "Ali Takes Power, and the Hot Iron",
  arabic: "عدل علي",
  when: "35 AH (656 CE)", where: "Medina, then Kufa",
  summary: "After Uthman was killed, the people begged Ali to lead. His first acts were to remove corrupt governors and divide the treasury equally, even with his own brother.",
  body: `
<p>Uthman was killed in 35 AH by rebels from Egypt and Iraq who were angry at his governors. During the siege Ali had tried to mediate, and had sent Hasan and Husayn to guard Uthman's door. After his death, the crowds came to Ali's house and pressed so hard to pledge to him that, he said, Hasan and Husayn were nearly trampled. He first refused. Then he insisted the pledge be taken publicly, in the mosque, freely.</p>
<p>He told the people that any land or wealth given out unjustly would be taken back to the treasury, <em>"even if it had been used as a dowry or to buy slave girls."</em> He removed Uthman's governors, including Muawiya in Syria. He divided the treasury equally among all Muslims: Arab and non-Arab, early convert and late convert, freed slave and noble, each received the same three dinars. Talha and al-Zubayr, who had expected governorships and favour, turned against him.</p>
<h4>The hot iron</h4>
<p>His own brother Aqil, poor and with hungry children, came to ask for a little extra wheat from the treasury. Ali heated a piece of iron and brought it near Aqil's hand. Aqil cried out from the heat. Ali said: <strong>"You cry out from an iron heated by a human for play, and you want to drag me to a fire lit by the All-Powerful in His anger?"</strong> (Nahj al-Balagha, sermon 224)</p>
<p>His famous letter to Malik al-Ashtar, appointing him governor of Egypt, tells a ruler that people are of two kinds: <strong>"either your brother in religion, or your equal in creation."</strong> It is still studied as a guide to just government.</p>`,
  lesson: "Ali showed that the Imam's rule is measured by justice, even when justice costs you allies.",
  sources: "Nahj al-Balagha, sermons 15, 224 and letter 53; al-Tabari, Tarikh"
},
{
  id: "jamal", era: "ali",
  title: "The Battle of the Camel",
  arabic: "معركة الجمل",
  when: "Jumada al-Akhira, 36 AH (656 CE)", where: "Basra, Iraq",
  summary: "The first war between Muslims: Talha, al-Zubayr and A'isha raised an army against Ali in the name of avenging Uthman.",
  body: `
<p>Talha and al-Zubayr had pledged to Ali, then left for Mecca and joined A'isha, the Prophet's wife. Together they raised an army, demanding revenge for Uthman's blood, and took Basra. Ali marched from Medina to Iraq to face them.</p>
<p>Before the battle, Ali rode out alone and called al-Zubayr. He reminded him of a day when the Prophet ﷺ had seen them laughing together and told al-Zubayr: <em>"You will fight him one day, and you will be wronging him."</em> Al-Zubayr remembered and left the battlefield. He was killed on the road by a man named Ibn Jurmuz. Talha was struck by an arrow; it was fired by Marwan ibn al-Hakam, from his own side.</p>
<p>A'isha sat in an armoured litter on a camel, and the fiercest fighting raged around it. Ali ordered the camel brought down to end the killing. When the fighting stopped, he gave clear orders: <strong>do not chase anyone who runs, do not finish off the wounded, do not enter any house, and do not take anyone's property or women.</strong></p>
<p>He sent A'isha back to Medina with respect, escorted by her own brother Muhammad ibn Abi Bakr, who was one of Ali's companions, and by a group of women.</p>`,
  lesson: "Even in civil war, Ali kept the rules of Islam. Later jurists learned how to treat rebel Muslims from how Ali acted at Jamal.",
  sources: "al-Tabari, Tarikh; al-Mas'udi, Muruj al-Dhahab; Shaykh al-Mufid, al-Jamal"
},
{
  id: "siffin", era: "ali",
  title: "Siffin: Ammar and the Qur'ans on Spears",
  arabic: "صفين",
  when: "Safar, 37 AH (657 CE)", where: "Siffin, on the Euphrates (Syria)",
  summary: "Muawiya refused to accept Ali. At Siffin, the death of the elderly companion Ammar showed who the rebels were, and a trick with the Qur'an stopped Ali's army on the edge of victory.",
  body: `
<p>Muawiya, Uthman's cousin and governor of Syria, refused to pledge to Ali. He hung Uthman's bloodstained shirt in the mosque of Damascus to stir up the people. The armies met at Siffin.</p>
<p>Muawiya's soldiers got to the river first and refused Ali's army water. Ali's men fought and took the river, and then Ali allowed Muawiya's army to drink too, saying he would not do what they had done.</p>
<p>In Ali's army fought <strong>Ammar ibn Yasir</strong>, over ninety years old, whose mother and father were the first martyrs of Islam. While building the mosque in Medina, the Prophet ﷺ had wiped the dust from Ammar and said: <strong>"Woe to Ammar! The rebel party (al-fi'a al-baghiya) will kill him. He calls them to Paradise and they call him to the Fire."</strong> (Sahih al-Bukhari). At Siffin, Ammar asked for a drink, was brought milk, smiled because the Prophet had told him his last drink would be milk, and went out to fight. Muawiya's soldiers killed him. The news shook the Syrian army.</p>
<p>As Ali's commander Malik al-Ashtar pushed to Muawiya's tent, Amr ibn al-As had a plan. Muawiya's soldiers raised copies of the Qur'an on their spears and called for the Book of Allah to judge between them. Ali warned his army it was a trick. But thousands of his own men, later the Khawarij, surrounded him and threatened to kill him unless he called back al-Ashtar and accepted arbitration. Ali was forced to agree.</p>
<p>At the arbitration, Amr ibn al-As tricked Abu Musa al-Ash'ari, the arbitrator Ali's soldiers had forced on him, and the meeting ended in confusion that strengthened Muawiya.</p>`,
  lesson: "The hadith of Ammar is in Sahih al-Bukhari itself. It leaves no doubt about which side at Siffin was in the right.",
  sources: "Sahih al-Bukhari, Book of Prayer (building the mosque); Nasr ibn Muzahim, Waq'at Siffin; al-Tabari, Tarikh"
},
{
  id: "nahrawan", era: "ali",
  title: "Nahrawan: The Khawarij",
  arabic: "النهروان",
  when: "38 AH (658 CE)", where: "Nahrawan, near Baghdad",
  summary: "The same men who forced Ali into arbitration then declared him a disbeliever for accepting it, and began killing Muslims.",
  body: `
<p>After Siffin, a group of Ali's soldiers turned on him. They said, "Judgement belongs to Allah alone" (<em>la hukma illa lillah</em>), and declared that Ali had become a disbeliever by accepting arbitration, the very arbitration they had forced on him. They were called the <strong>Khawarij</strong>, "those who went out."</p>
<p>Ali's answer to their slogan became famous: <strong>"A word of truth, by which falsehood is intended."</strong> He explained that people must have a ruler, good or bad, under whom believers can work and the roads can be safe. (Nahj al-Balagha, sermon 40)</p>
<p>At first Ali did not fight them. He let them keep their share of the treasury and their place in the mosque as long as they did not shed blood. Then they killed Abdullah, son of the companion Khabbab ibn al-Aratt, on the road, and cut open his pregnant wife. When Ali demanded the killers, they replied, "We all killed him."</p>
<p>Ali sent Ibn Abbas to debate them, and then went himself. Many returned. Those who remained fought at Nahrawan, and almost all were killed. Ali said afterwards: <em>"Do not fight the Khawarij after me. The one who sought the truth and missed it is not like the one who sought falsehood and found it."</em> He meant Muawiya.</p>`,
  lesson: "Extremism that calls other Muslims disbelievers (takfir) began with the Khawarij, and the first Imam was the first to warn against it.",
  sources: "Nahj al-Balagha, sermons 40 and 61; al-Tabari, Tarikh; Sahih Muslim, Book of Zakat (hadiths on the Khawarij)"
},
{
  id: "ali-martyrdom", era: "ali",
  title: "\"By the Lord of the Ka'ba, I Have Succeeded\"",
  arabic: "فزت ورب الكعبة",
  when: "19–21 Ramadan, 40 AH (January 661 CE)", where: "Great Mosque of Kufa",
  summary: "A Kharijite struck Ali with a poisoned sword as he led the dawn prayer. In his last two days he asked that his killer be fed and treated fairly.",
  body: `
<p>Three Khawarij agreed to kill Ali, Muawiya and Amr ibn al-As on the same day. Only one succeeded: Abd al-Rahman ibn Muljam al-Muradi, who went to Kufa.</p>
<p>On the night of the 19th of Ramadan, Ali was a guest at the house of his daughter Umm Kulthum. He barely slept, going in and out of the house looking at the sky and saying that it was the night he had been promised. Before dawn he went to the mosque and woke the sleeping men for prayer, including Ibn Muljam, who lay on his face with his sword hidden.</p>
<p>As Ali rose from prostration, Ibn Muljam struck his head with a sword soaked in poison. Ali's first words were: <strong>"Fuztu wa rabbil-Ka'ba"</strong>, <em>"By the Lord of the Ka'ba, I have succeeded!"</em></p>
<p>In his two remaining days he gave his final will to Hasan and Husayn: fear Allah, keep your affairs in order, make peace between people, look after the orphans, the neighbours, the Qur'an and the prayer. About his killer he said: <strong>"Feed him from what you eat, give him to drink from what you drink. If I live, I will decide. If I die, strike him one blow for one blow, and do not mutilate him."</strong></p>
<p>He passed away on the 21st of Ramadan. Only then did the orphans of Kufa realise who the masked man was who had been bringing them food at night. He was buried in secret at night, outside the city, so his enemies could not dig up his grave. The place, Najaf, was revealed generations later by Imam Ja'far al-Sadiq.</p>`,
  lesson: "The 19th, 21st and 23rd nights of Ramadan, the nights of Qadr, are also nights of mourning for Ali.",
  sources: "Nahj al-Balagha, letter 47; Kitab al-Irshad; Ibn Sa'd, al-Tabaqat; al-Tabari, Tarikh"
},

/* ===================== KARBALA & THE UMAYYADS ===================== */
{
  id: "hasan-treaty", era: "umayyad",
  title: "Imam Hasan's Peace Treaty",
  arabic: "صلح الإمام الحسن",
  when: "41 AH (661 CE)", where: "Iraq",
  summary: "Betrayed by his own commanders, Imam Hasan made a treaty with Muawiya on strict conditions. Muawiya broke every one of them.",
  body: `
<p>After Ali's martyrdom, the people of Kufa pledged to his son Hasan, and Muawiya marched on Iraq. Imam Hasan sent an army ahead under his cousin Ubaydullah ibn Abbas. Muawiya sent Ubaydullah a million dirhams, and he went over to Muawiya at night with thousands of soldiers. Then a Kharijite stabbed Imam Hasan in the thigh at al-Mada'in, and his tent was looted by his own men.</p>
<p>The Imam saw that a war would only mean the killing of the last loyal Shia, with nothing gained. He signed a peace treaty. According to the historians, its conditions included:</p>
<ul>
<li>Muawiya must rule by the Book of Allah and the Sunnah of the Prophet.</li>
<li>Muawiya would <strong>not appoint a successor</strong>. After him, the matter would return to Hasan, or to the Muslims to decide.</li>
<li>The cursing of Ali would stop.</li>
<li>The Shia of Ali would be safe wherever they lived, in their lives, families and property.</li>
</ul>
<p>When Muawiya entered Kufa, he told the people: <em>"I did not fight you so that you would pray or fast… I fought you to rule over you. Every condition I gave to Hasan is under my feet."</em></p>
<p>Some of Imam Hasan's own followers greeted him bitterly as "the humiliator of the believers." He explained that, like the Prophet's treaty at Hudaybiyya, the wisdom of his peace would become clear later. It did: the treaty exposed Muawiya, and prepared the ground for Karbala.</p>`,
  lesson: "Hasan's peace and Husayn's uprising are not opposites. Each Imam chose the action that would protect Islam in his situation.",
  sources: "Ibn Abi al-Hadid, Sharh Nahj al-Balagha; Abu al-Faraj al-Isfahani, Maqatil al-Talibiyyin; Kitab al-Irshad; al-Tabari, Tarikh"
},
{
  id: "muawiya-persecution", era: "umayyad",
  title: "Cursed from the Pulpits: Hujr ibn Adi",
  arabic: "سب علي وقتل حجر",
  when: "41–60 AH", where: "Kufa, Damascus, Marj Adhra",
  summary: "For decades, Ali was cursed in Friday sermons across the empire. Those who refused were hunted. The companion Hujr ibn Adi was executed for it.",
  body: `
<p>Under Muawiya, cursing Ali became part of Friday sermons on the pulpits of the empire. Sahih Muslim records that Muawiya asked the companion Sa'd ibn Abi Waqqas: <em>"What stops you from cursing Abu Turab (Ali)?"</em> Sa'd answered that he had heard the Prophet ﷺ say three things about Ali, and if he had even one of them it would be dearer to him than red camels: the hadith of Harun and Musa, the banner at Khaybar, and Mubahala.</p>
<p>Ziyad ibn Abih, Muawiya's governor of Kufa and Basra, knew the Shia of Kufa personally, because he had once been on Ali's side. He hunted them: cutting off hands and feet, blinding, crucifying on palm trunks and driving them out of Iraq.</p>
<p><strong>Hujr ibn Adi</strong> was a companion of the Prophet, famous for his worship. Whenever the governor cursed Ali from the pulpit, Hujr stood up and objected. In 51 AH he and his companions were arrested and sent to Muawiya. At Marj Adhra, near Damascus, they were offered their lives if they would curse Ali and disown him. Hujr refused. He asked to pray two rak'as first, then said: <em>"I see the sword, the shroud and the dug grave, and I am not afraid."</em> He asked that his son be killed before him, so the boy would not weaken at the sight of the sword. Seven of them were killed.</p>
<p>When A'isha heard, she condemned Muawiya for it. Other Shia, like Amr ibn al-Hamiq and Rushayd al-Hajari, were also killed in these years.</p>`,
  lesson: "The cursing of Ali lasted around sixty years, until the caliph Umar ibn Abd al-Aziz ended it.",
  sources: "Sahih Muslim, Virtues of Ali (hadith of Sa'd); al-Tabari, Tarikh (51 AH); Ibn al-Athir, al-Kamil; Ibn Abd al-Barr, al-Isti'ab"
},
{
  id: "hasan-poison", era: "umayyad",
  title: "The Poisoning of Imam Hasan and the Arrows at his Coffin",
  arabic: "شهادة الإمام الحسن",
  when: "Safar, 50 AH (670 CE)", where: "Medina",
  summary: "To clear the way for his son Yazid, Muawiya arranged Imam Hasan's poisoning by his own wife. Even his funeral was attacked.",
  body: `
<p>As long as Imam Hasan lived, the treaty stood between Muawiya and his plan to make his son Yazid the next caliph. Historians report that Muawiya sent a promise to Ja'da bint al-Ash'ath, Imam Hasan's wife: a large sum of money and marriage to Yazid if she poisoned her husband. She put poison in his drink. The Imam suffered for days; he said that he had been poisoned before, but never like this, and that he could feel his liver coming apart. He refused to name who did it.</p>
<p>Muawiya paid her the money, but did not marry her to Yazid, saying: if she did this to the grandson of the Prophet, what would she do to my son?</p>
<p>Imam Hasan's will was that his body be taken to his grandfather's grave to renew his covenant, and then be buried in al-Baqi beside his grandmother Fatima bint Asad. <strong>He told Husayn: let not a drop of blood be shed for me.</strong></p>
<p>When the funeral approached the Prophet's grave, Marwan ibn al-Hakam and the Umayyads came out armed, thinking Husayn meant to bury his brother there. Arrows were shot, and some struck the coffin. Remembering his brother's will, Husayn turned the funeral away and buried him in al-Baqi.</p>
<p>Ten years later, Muawiya made the people pledge to Yazid as his heir, the very thing the treaty had forbidden.</p>`,
  lesson: "Imam Hasan is known as Karim Ahl al-Bayt, the generous one of the family. He gave away all his wealth for Allah twice in his life.",
  sources: "Abu al-Faraj al-Isfahani, Maqatil al-Talibiyyin; al-Mas'udi, Muruj al-Dhahab; Kitab al-Irshad",
  proof: "The poisoning by Ja'da on Muawiya's promise is recorded by Abu al-Faraj al-Isfahani, al-Mas'udi and other early historians."
},
{
  id: "husayn-departure", era: "umayyad",
  title: "\"Someone Like Me Does Not Pledge to Someone Like Him\"",
  arabic: "مثلي لا يبايع مثله",
  when: "Rajab 60 AH – Dhul Hijja 60 AH (680 CE)", where: "Medina → Mecca → Iraq",
  summary: "When Yazid took power and demanded his pledge, Imam Husayn refused, left Medina, and set out for Kufa, whose people had sent him thousands of letters.",
  body: `
<p>Muawiya died in Rajab 60 AH. His son Yazid, known openly for drinking and playing with monkeys and dogs, wrote to the governor of Medina: take the pledge from Husayn, and if he refuses, cut off his head.</p>
<p>Called to the governor at night, Imam Husayn said: <strong>"We are the House of Prophethood… Yazid is a sinful man who drinks wine and kills innocent souls, and openly commits sin. <u>Someone like me does not pledge allegiance to someone like him.</u>"</strong></p>
<p>He left Medina with his family on 28 Rajab. In his will to his brother Muhammad ibn al-Hanafiyya he wrote: <em>"I have not come out in arrogance or to cause trouble or injustice. I have come out only to seek reform in the Ummah of my grandfather. I want to enjoin good and forbid evil."</em></p>
<p>He stayed four months in Mecca. Letters poured in from Kufa: thousands of them, saying, "Come to us, we have no Imam." He sent his cousin <strong>Muslim ibn Aqil</strong> ahead. Thousands of Kufans pledged to Muslim, and he wrote to Husayn to come.</p>
<p>Then Yazid sent <strong>Ubaydullah ibn Ziyad</strong> to Kufa. With bribes and terror he turned the city. Muslim was left alone in the streets at night. An old woman named Tau'a took him in. He was betrayed, fought alone, and was thrown from the top of the palace on 9 Dhul Hijja. Hani ibn Urwa, who had sheltered him earlier, was killed too.</p>
<p>The next day, 8 Dhul Hijja, Husayn changed his Hajj into an Umra and left Mecca, because Yazid had sent men to kill him even inside the Sacred Mosque, and he would not let the Ka'ba be dishonoured with his blood. On the road the poet al-Farazdaq told him: <em>"The people's hearts are with you, but their swords are against you."</em></p>`,
  lesson: "Husayn's cause was not power: it was 'enjoining good and forbidding evil', a branch of the faith every Shia Muslim practices.",
  sources: "al-Tabari, Tarikh (narrating Abu Mikhnaf); Kitab al-Irshad; Ibn Tawus, al-Luhuf; Ibn A'tham, al-Futuh"
},
{
  id: "hurr-karbala", era: "umayyad",
  title: "Hurr, and the Land of Karb and Bala",
  arabic: "الحر بن يزيد ووصول كربلاء",
  when: "Dhul Hijja 60 AH – 7 Muharram 61 AH", where: "The desert of Iraq → Karbala",
  summary: "An army of a thousand cut Husayn off. He gave them water. A week later, his own children were thirsty, and the river was blocked.",
  body: `
<p>On the road, Husayn heard of Muslim's death. He told his companions the truth: the Kufans had abandoned them, and whoever wanted to leave could leave. Many who had joined for gain went away. His family and true companions stayed.</p>
<p>Then an army of a thousand horsemen under <strong>al-Hurr ibn Yazid al-Riyahi</strong> appeared, sent to stop him. They were exhausted and dying of thirst. Husayn ordered his men to give them water, and their horses too, and he himself gave water to a straggler. When prayer time came, Hurr and his soldiers prayed behind Husayn.</p>
<p>Hurr would not let them go to Kufa or back to Medina, and forced them along until, on <strong>2 Muharram 61 AH</strong>, Husayn's horse would not go further. He asked the name of the land. When told "Karbala," he said: <em>"This is a place of karb (grief) and bala (trial). Here our camels will kneel, here our blood will be spilled."</em> His tents were pitched there.</p>
<p>Umar ibn Sa'd arrived with 4,000 soldiers. Ibn Ziyad had promised him the governorship of Rayy if he finished Husayn. More troops came every day, until there were many thousands. On <strong>7 Muharram</strong>, Ibn Ziyad ordered the Euphrates blocked so that not a drop of water reached Husayn's camp.</p>
<p>On the 9th, Shimr ibn Dhil-Jawshan arrived with orders: either Husayn surrenders, or attack. Shimr also offered safety to al-Abbas and his brothers, because their mother was from Shimr's tribe. Abbas answered: <em>"May Allah curse you and your safety! You offer us safety while the son of the Messenger of Allah has none?"</em></p>`,
  lesson: "Husayn gave water to the very army that came to stop him. The army that met him did not give water even to his six-month-old baby.",
  sources: "al-Tabari, Tarikh (Abu Mikhnaf); Kitab al-Irshad; Ibn Tawus, al-Luhuf"
},
{
  id: "ashura", era: "umayyad",
  title: "The Day of Ashura",
  arabic: "يوم عاشوراء",
  when: "10 Muharram, 61 AH (10 October 680 CE)", where: "Karbala, Iraq",
  summary: "In one day, Imam Husayn, his brothers, sons, nephews and loyal companions, about 72 in all, were martyred by an army of thousands.",
  body: `
<h4>The night before</h4>
<p>Husayn asked for one night's delay "so we may pray to our Lord, call on Him and seek His forgiveness." He gathered his companions, thanked them and said: the night has covered you, take it as a camel and leave; they want only me. One by one they refused. Muslim ibn Awsaja said that if he were killed and burned seventy times, he would not leave him. Zuhayr ibn al-Qayn said he wished to be killed a thousand times if it protected Husayn and the young men of his family. All night the camp sounded like bees, with the humming of the Qur'an and prayer.</p>
<h4>The morning</h4>
<p>Husayn spoke to the enemy army, reminding them who he was and holding up the Prophet's turban and sword. Then <strong>Hurr</strong>, trembling, rode over to Husayn's camp, ashamed, and asked: is there repentance for me? Husayn accepted him. Hurr went out to fight his former army and was one of the first martyrs. Husayn wiped the dust from his face and said: "You are free (hurr), as your mother named you."</p>
<h4>The companions</h4>
<p>Husayn's companions went out first: the elderly Habib ibn Mazahir, a friend from childhood; Muslim ibn Awsaja; Zuhayr; the black freed slave John (Jaun), whose face Husayn held as he died; and Abis, who threw off his armour to die sooner. At noon, Husayn led the midday prayer while two companions stood in front of him taking the arrows.</p>
<h4>The family</h4>
<p><strong>Ali al-Akbar</strong>, Husayn's eighteen-year-old son, who looked and spoke like the Prophet, went out first of the family. <strong>Al-Qasim</strong>, the son of Imam Hasan, about thirteen, asked his uncle how death felt to him and answered himself: "sweeter than honey." <strong>Aun and Muhammad</strong>, sons of Zaynab, fell. <strong>Al-Abbas</strong>, standard-bearer and brother of Husayn, rode to the river for the children's water. He filled the waterskin but would not drink, remembering his thirsty brother. On the way back his right hand was cut off, then his left; he held the waterskin in his teeth until an arrow pierced it and the water spilled. Husayn reached him and said, "Now my back is broken."</p>
<p>Husayn brought out his six-month-old son <strong>Ali al-Asghar</strong>, lips dry from thirst, and asked for water for the baby. Harmala answered with an arrow through the infant's neck. Husayn collected the blood in his palm and threw it to the sky, and not a drop came back.</p>
<h4>Husayn alone</h4>
<p>He called out: <em>"Is there anyone to help us?"</em> Then he fought alone, wounded by spears, swords and arrows, until he fell from his horse. In his last moments he lay in prostration, saying: <em>"I am content with Your decree, O Lord."</em> Shimr sat on his chest and cut off his head. His body was trampled by horses. The tents were set on fire, and the women and children ran into the desert. His sick son Ali Zayn al-Abidin was spared only because Zaynab threw herself over him.</p>`,
  lesson: "Every year Shia Muslims mourn Ashura not just for sorrow but to keep alive Husayn's message: never give your hand to injustice.",
  sources: "al-Tabari, Tarikh (Abu Mikhnaf's eyewitness narrations); Kitab al-Irshad; Ibn Tawus, al-Luhuf; Abu al-Faraj, Maqatil al-Talibiyyin"
},
{
  id: "zaynab", era: "umayyad",
  title: "Zaynab in the Courts of Kufa and Damascus",
  arabic: "خطبة زينب",
  when: "Muharram – Safar 61 AH", where: "Kufa and Damascus",
  summary: "The women and children of the Prophet's house were marched as captives with the heads of their men on spears. Zaynab turned captivity into a voice for Karbala.",
  body: `
<p>The survivors, the women, the children and the sick Imam Ali Zayn al-Abidin in chains, were put on camels without saddles and taken to Kufa. In front of them, on spears, went the heads of the martyrs.</p>
<p>In Kufa, the same people who had written letters to Husayn now came out to see the captives and wept. <strong>Zaynab</strong>, daughter of Ali and Fatima, silenced the crowd with a gesture and spoke. Those who heard said it was as if Ali himself were speaking. She told them: <em>you weep? Then weep much and laugh little, for you have brought on yourselves a shame you will never wash off.</em></p>
<p>In the palace, Ibn Ziyad mocked her: "How did you see what Allah did to your brother?" She answered with words Shia Muslims repeat to this day: <strong>"I saw nothing but beauty (ma ra'aytu illa jamila)."</strong> These were people for whom Allah had written martyrdom, and they went to their resting places.</p>
<p>In Damascus, Yazid sat in his court with Husayn's head in a basin before him and struck the lips with his cane, reciting verses about avenging his ancestors killed at Badr. The companion Abu Barza al-Aslami cried out that he had seen the Prophet kiss those lips. Zaynab stood up in Yazid's court and said: <strong>"Plot your plots, make your efforts. By Allah, you will never erase our remembrance, nor kill our revelation."</strong></p>
<p>In the Umayyad mosque, Imam Ali Zayn al-Abidin asked to speak from the pulpit. He introduced himself: son of Mecca and Mina, son of Zamzam and Safa, son of the one taken on the Night Journey, son of Fatima… until the people wept. When the call to prayer reached "I testify that Muhammad is the Messenger of Allah," he turned to Yazid and asked: <em>"Is Muhammad your grandfather or mine? If you say yours, you lie. If you say mine, why did you kill his family?"</em></p>`,
  lesson: "Husayn's blood was the uprising; Zaynab's words were its message. Without Zaynab, Shia scholars say, Karbala would have been buried in the desert.",
  sources: "Ibn Tayfur, Balaghat al-Nisa; Ibn Tawus, al-Luhuf; al-Tabari, Tarikh; al-Khwarizmi, Maqtal al-Husayn"
},
{
  id: "after-karbala", era: "umayyad",
  title: "After Karbala: Harra, the Penitents and Mukhtar",
  arabic: "واقعة الحرة والتوابين والمختار",
  when: "63–67 AH (683–687 CE)", where: "Medina, Mecca, Kufa",
  summary: "Yazid's army sacked the Prophet's city and attacked the Ka'ba. In Kufa, those who had failed Husayn rose up in repentance, and Mukhtar avenged Karbala.",
  body: `
<p><strong>Harra (63 AH):</strong> The people of Medina expelled Yazid's governor. Yazid sent an army under Muslim ibn Uqba, who allowed his soldiers to plunder the city of the Prophet ﷺ for three days. Hundreds of companions and their sons were killed, and those left alive were forced to pledge that they were Yazid's slaves. Imam Ali Zayn al-Abidin was spared, and he sheltered hundreds of families in his house.</p>
<p><strong>The Ka'ba (64 AH):</strong> Yazid's army then besieged Mecca, where Abdullah ibn al-Zubayr had declared himself caliph, and bombarded it with catapults. The Ka'ba caught fire. In the middle of the siege, news came that Yazid had died, aged about 38, after ruling for three and a half years.</p>
<p><strong>The Tawwabun (65 AH):</strong> In Kufa, thousands who had written to Husayn and then failed him were tormented by guilt. Led by the old companion Sulayman ibn Surad, they called themselves the Penitents. They went to Husayn's grave, wept there a whole day and night, then marched to fight the Umayyad army at Ayn al-Warda, knowing they would not survive. Almost all were killed.</p>
<p><strong>Mukhtar (66–67 AH):</strong> Al-Mukhtar al-Thaqafi took Kufa under the slogan "Revenge for Husayn," with Ibrahim, son of Malik al-Ashtar, as his commander. They hunted down the killers of Karbala: Umar ibn Sa'd, Shimr, Harmala and others. Ibrahim killed Ubaydullah ibn Ziyad at the river Khazir. Shia reports say that when Ibn Ziyad's head was brought to Medina, Imam Zayn al-Abidin was eating, and he thanked Allah, remembering that he had been brought before Ibn Ziyad's table as a captive. Mukhtar was later killed by Mus'ab ibn al-Zubayr.</p>`,
  lesson: "The Umayyads won the battle of Karbala, but within a few years the whole Muslim world knew what they had done.",
  sources: "al-Tabari, Tarikh; al-Mas'udi, Muruj al-Dhahab; Ibn al-Athir, al-Kamil",
},
{
  id: "sajjad", era: "umayyad",
  title: "Imam Zayn al-Abidin: A Revolution of Tears and Prayer",
  arabic: "الإمام السجاد",
  when: "61–95 AH", where: "Medina and Mecca",
  summary: "Under constant watch, the fourth Imam taught Islam through supplication, and secretly fed the poor of Medina for years.",
  body: `
<p>After Karbala, the Shia were terrified and scattered, and the Umayyads were at the height of their power. Open teaching was impossible. Imam Ali ibn al-Husayn chose another way: he taught the whole of Islam through <strong>du'a</strong>. His prayers were collected as <em>al-Sahifa al-Sajjadiyya</em>, called the "Psalms of the Ahl al-Bayt," covering everything from repentance to prayers for parents, for neighbours and for the soldiers guarding the borders. His <em>Risalat al-Huquq</em> (Treatise on Rights) lists the rights of Allah, of your own body, of your parents, your teacher, your ruler and even your enemy.</p>
<p>For years he wept whenever he saw water or food, remembering his father's thirst. When someone asked how long he would grieve, he replied that Ya'qub lost one son, Yusuf, who was still alive, and wept until his eyes went white; he had seen eighteen of his family slaughtered in one day.</p>
<h4>The poem at the Ka'ba</h4>
<p>One year at Hajj, the Umayyad prince Hisham ibn Abd al-Malik tried to touch the Black Stone, but the crowd was too dense. Then Imam Zayn al-Abidin arrived, and the crowd parted for him in respect. A Syrian asked Hisham, "Who is that?" Hisham pretended not to know. The poet al-Farazdaq, standing there, answered with a famous poem praising the Imam, describing him as the one whose footsteps the valley of Mecca knows, the son of the best of Allah's servants. Hisham had Farazdaq imprisoned for it.</p>
<h4>The secret of his back</h4>
<p>At night the Imam carried sacks of bread on his back to poor families in Medina, hiding his face. When he died in 95 AH, about a hundred families stopped receiving food, and when his body was washed, people saw the marks on his back from years of carrying those sacks.</p>`,
  lesson: "He was martyred by poison on the orders of the Umayyad caliph al-Walid ibn Abd al-Malik. He is buried in al-Baqi, Medina.",
  sources: "al-Sahifa al-Sajjadiyya; Abu Nu'aym, Hilyat al-Awliya; Kitab al-Irshad; Ibn Shahrashub, Manaqib"
},
{
  id: "baqir", era: "umayyad",
  title: "Imam al-Baqir: Splitting Knowledge Open",
  arabic: "الإمام الباقر",
  when: "95–114 AH", where: "Medina, Damascus",
  summary: "The Prophet sent his salaam to the fifth Imam through a companion who lived long enough to deliver it.",
  body: `
<p>The companion <strong>Jabir ibn Abdullah al-Ansari</strong> was one of the last companions alive, old and blind. Many years earlier, the Prophet ﷺ had told him: you will live until you meet a son of mine from Husayn named Muhammad, who will split knowledge open (<em>yabqur al-'ilm baqran</em>). When you meet him, give him my salaam.</p>
<p>Jabir used to sit in the Prophet's mosque calling out, "O Baqir!" People thought he had lost his mind. One day he met the young Muhammad ibn Ali, felt his face and hands, and wept as he delivered the Prophet's greeting.</p>
<p>As the Umayyads weakened, Imam al-Baqir opened the first great school of the Ahl al-Bayt in Medina. Scholars came from every land to learn Qur'an, hadith, law and theology. His companions, like Zurara, Muhammad ibn Muslim and Jabir al-Ju'fi, narrated thousands of hadiths from him.</p>
<h4>The coins of Islam</h4>
<p>Sunni historians such as al-Bayhaqi and al-Damiri report that the Byzantine emperor threatened to stamp insults to the Prophet on the coins and papyrus that the Islamic world still imported from him. Caliph Abd al-Malik did not know what to do, and sent for Imam al-Baqir, who advised him to mint the Muslims' own coins, inscribed with the declaration of faith, and gave exact instructions for their weight. Islamic coinage, the reports say, began this way.</p>
<p>The caliph Hisham ibn Abd al-Malik later summoned the Imam to Damascus to humiliate him in public, but failed. Imam al-Baqir was martyred by poison on Hisham's orders in 114 AH, and he is buried in al-Baqi.</p>`,
  lesson: "Most of the fiqh that Shia Muslims follow today comes from the teaching of the fifth and sixth Imams.",
  sources: "Kitab al-Irshad; al-Kulayni, al-Kafi; al-Bayhaqi, al-Mahasin wa al-Masawi; al-Damiri, Hayat al-Hayawan"
},
{
  id: "umar-ii", era: "umayyad",
  title: "The Caliph Who Returned Fadak",
  arabic: "عمر بن عبد العزيز ورد فدك",
  when: "99–101 AH (717–720 CE)", where: "Damascus",
  summary: "One Umayyad caliph was different. Umar ibn Abd al-Aziz ended the cursing of Ali and gave Fadak back to the children of Fatima.",
  body: `
<p>History is not all black and white. The Umayyad caliph <strong>Umar ibn Abd al-Aziz</strong> took a different path from his family.</p>
<p>He said that as a boy he had heard Ali cursed from the pulpits as normal, until his teacher scolded him and asked how he knew that Allah was angry with the people of Badr after being pleased with them. When he became caliph, he ended the cursing of Ali in the Friday sermon and replaced it with a verse of the Qur'an still recited in many Friday sermons today: <em>"Indeed, Allah commands justice, excellence, and giving to relatives, and forbids indecency, wrongdoing and transgression"</em> (16:90).</p>
<p>He also returned Fadak to the descendants of Fatima, saying it had been taken from them unjustly. He treated Imam al-Baqir and the Hashimites with respect.</p>
<p>His reign lasted only about two and a half years. Imam al-Baqir praised his justice while pointing out that he still sat in a seat that was not his. After him, Fadak was taken back again.</p>`,
  lesson: "Being fair to history means recognising good wherever it is, even from those whose house wronged the Ahl al-Bayt.",
  sources: "Ibn Sa'd, al-Tabaqat; al-Ya'qubi, Tarikh; Ibn al-Athir, al-Kamil; Shaykh al-Saduq, al-Khisal"
},
{
  id: "zayd", era: "umayyad",
  title: "Zayd ibn Ali: Crucified for Four Years",
  arabic: "ثورة زيد بن علي",
  when: "122 AH (740 CE)", where: "Kufa",
  summary: "The grandson of Imam Husayn rose against Hisham. His body was crucified naked for years and then burned.",
  body: `
<p>Zayd was the son of Imam Zayn al-Abidin and brother of Imam al-Baqir, a scholar of the Qur'an. Humiliated by the caliph Hisham, who told him to his face that he, the son of a slave mother, was not fit for anything, Zayd rose in Kufa in 122 AH to command the good and forbid evil, as his grandfather had.</p>
<p>The Kufans once more pledged in thousands and then abandoned him in hundreds. Zayd was struck in the forehead by an arrow and died. His companions buried him secretly under a riverbed, but a man showed the governor the grave. His body was dug up and crucified naked at the Kufa rubbish ground, and left there for about four years. Under the next caliph it was taken down, burned, and its ashes thrown into the Euphrates.</p>
<p>Imam Ja'far al-Sadiq wept for his uncle and said that Zayd had called people to the pleasure of the family of Muhammad, and that had he won he would have kept his word. Zayd's son Yahya was later killed in Khurasan in 125 AH.</p>`,
  lesson: "The Zaydi branch of Shia Islam, found today mostly in Yemen, takes its name from Zayd ibn Ali.",
  sources: "al-Tabari, Tarikh (122 AH); Abu al-Faraj, Maqatil al-Talibiyyin; Shaykh al-Saduq, Uyun Akhbar al-Rida"
},

/* ===================== ABBASIDS ===================== */
{
  id: "sadiq", era: "abbasid",
  title: "Imam al-Sadiq: The Burned Letter and the Four Thousand Students",
  arabic: "الإمام الصادق",
  when: "114–148 AH (732–765 CE)", where: "Medina, Kufa, Baghdad",
  summary: "When the Umayyads fell, the caliphate was offered to Imam Ja'far al-Sadiq. He burned the letter, and built a school instead.",
  body: `
<p>The Abbasids, descendants of the Prophet's uncle al-Abbas, overthrew the Umayyads in 132 AH using the slogan <em>"al-Rida min Al Muhammad"</em>: "for the one chosen from the family of Muhammad." Many people believed they were fighting for the Ahl al-Bayt.</p>
<p>Abu Salama al-Khallal, a leader of the revolution in Kufa, secretly wrote to Imam Ja'far al-Sadiq offering him the caliphate. The Imam held the letter over a lamp and burned it, saying to the messenger: <strong>"This is the answer."</strong> He knew the revolution was not built for the Ahl al-Bayt, and that the ones who brought it would never let him rule by the truth.</p>
<p>In the short gap between the two dynasties, the Imam's school in Medina grew to its greatest size. The scholar Ibn Uqda listed four thousand people who narrated from him. Among those who learned from him were <strong>Abu Hanifa</strong> and <strong>Malik ibn Anas</strong>, founders of two Sunni schools of law; Abu Hanifa is reported to have said that he had never seen anyone more learned than Ja'far ibn Muhammad. His own students included the theologian Hisham ibn al-Hakam, and tradition links him with the chemist Jabir ibn Hayyan. That is why Twelver Shia law is called the <strong>Ja'fari</strong> school.</p>
<h4>Al-Mansur's net</h4>
<p>The second Abbasid caliph, al-Mansur, killed the Hasanid rebels Muhammad al-Nafs al-Zakiyya and his brother Ibrahim, and starved members of the Prophet's family in his dungeons. He summoned Imam al-Sadiq to Iraq again and again, threatened him, and had his house in Medina set on fire. He had the Imam poisoned in 148 AH.</p>
<p>Al-Mansur then ordered his governor in Medina: find whoever Ja'far named as his successor, and behead him. The governor wrote back: he named five people as executors of his will, and the first of them is the caliph himself, then the governor of Medina, then his son Abdullah, his son Musa, and his wife Hamida. Al-Mansur's plan failed. The true heir, Musa al-Kazim, was hidden among the names.</p>`,
  lesson: "The Imam chose knowledge over a throne that would have been a trap, and that knowledge lasted longer than any dynasty.",
  sources: "al-Kulayni, al-Kafi; Kitab al-Irshad; al-Mas'udi, Muruj al-Dhahab; Abu al-Faraj, Maqatil al-Talibiyyin"
},
{
  id: "kazim", era: "abbasid",
  title: "Imam al-Kazim in Harun's Prisons",
  arabic: "الإمام الكاظم في سجون هارون",
  when: "179–183 AH (795–799 CE)", where: "Medina, Basra, Baghdad",
  summary: "Harun al-Rashid arrested the seventh Imam beside the Prophet's grave, moved him from prison to prison for years, and finally had him poisoned.",
  body: `
<p>Harun al-Rashid, the most famous Abbasid caliph, visited Medina and stood at the Prophet's grave in front of a crowd. To boast of his family tie, he said: <em>"Peace be upon you, O Messenger of Allah, O cousin!"</em> Imam Musa ibn Ja'far stepped forward and said: <strong>"Peace be upon you, O father!"</strong> Harun's face changed. He ordered the Imam's arrest.</p>
<p>The Imam was taken in a closed litter, moved first to Basra, where the governor Isa ibn Ja'far held him for a year. Isa wrote to Harun asking to be relieved, because he had spied on the Imam and heard nothing but prayers for forgiveness, and he could not bring himself to harm him.</p>
<p>He was moved to Baghdad, from one jailer to another, and finally to the harshest, <strong>al-Sindi ibn Shahak</strong>, in an underground cell. Even there he thanked Allah for giving him a place free for worship, because he used to pray for exactly that. He became known as <strong>al-Kazim</strong>, "the one who swallows his anger," because of his patience.</p>
<p>In 183 AH, al-Sindi gave him poisoned dates. Harun had witnesses brought in to look at his body and confirm he had died "naturally." His body was placed on the bridge of Baghdad with chains still on his legs, and it was announced that this was the Imam of the Rafida (the Shia). Sulayman ibn Ja'far, Harun's own uncle, could not bear it. He took the body, shrouded it in a costly shroud, and buried it with honour in the Quraysh cemetery. That place is now al-Kadhimiya in Baghdad.</p>`,
  lesson: "He is called Bab al-Hawa'ij, the Door to Needs, because so many people turn to Allah through him. He spent around fourteen years of his life in prisons.",
  sources: "Kitab al-Irshad; Shaykh al-Saduq, Uyun Akhbar al-Rida; al-Khatib al-Baghdadi, Tarikh Baghdad; Abu al-Faraj, Maqatil al-Talibiyyin"
},
{
  id: "rida", era: "abbasid",
  title: "Imam al-Rida: The Heir Who Was Never Meant to Rule",
  arabic: "ولاية العهد للإمام الرضا",
  when: "200–203 AH (816–818 CE)", where: "Medina → Nishapur → Merv → Tus (Mashhad)",
  summary: "Caliph al-Ma'mun forced the eighth Imam to become his heir. The plan backfired: the people loved him more each day.",
  body: `
<p>Al-Ma'mun had just won a civil war against his brother al-Amin and needed the support of the Shia and the Alids, who were rising in revolt. His plan: bring Imam Ali ibn Musa al-Rida to his capital at Merv (in today's Turkmenistan) and make him his heir. The Imam's popularity would quiet the Shia, and his presence at court would make him look like part of the government.</p>
<p>The Imam was brought from Medina against his will, on a route chosen to avoid the Shia cities of Kufa and Qum. Before leaving, he gathered his family and told them to weep for him, because he would not return.</p>
<h4>The Golden Chain at Nishapur</h4>
<p>At Nishapur, tens of thousands came out, and scholars held inkwells ready. The Imam narrated from his fathers, one by one up to the Prophet, from Jibra'il, from Allah: <strong>"'There is no god but Allah' is My fortress. Whoever enters My fortress is safe from My punishment."</strong> As his litter moved on, he added: <strong>"…with its conditions, and I am one of its conditions."</strong> This is called the Hadith of the Golden Chain (Silsilat al-Dhahab), because every narrator in it is an Imam.</p>
<h4>Accepted under threat</h4>
<p>Al-Ma'mun first offered him the caliphate itself, then the position of heir. The Imam refused both, until he was threatened with death. He accepted on condition that he would not appoint or dismiss anyone, or change any decision. Coins were minted with his name, and the Abbasid black was changed to green.</p>
<h4>The Eid prayer</h4>
<p>Al-Ma'mun asked him to lead the Eid prayer. The Imam agreed only if he could go out as the Prophet did. He came out barefoot, in simple white, calling the takbir. The army officers jumped off their horses, threw off their boots and followed him in tears, and the whole city rose up behind him. Al-Ma'mun's minister warned that if he reached the prayer ground, the people would follow him against the state. Al-Ma'mun sent word for him to turn back.</p>
<p>The Imam also defeated the scholars of every religion that al-Ma'mun brought to debate him: Christian, Jewish, Zoroastrian and Sabian, each from their own scriptures. In 203 AH, at Tus, al-Ma'mun gave him poisoned grapes. He was buried beside Harun al-Rashid's grave; that place is now the city of Mashhad, Iran.</p>`,
  lesson: "The Imam turned a gilded prison into a pulpit, showing that a true Imam cannot be absorbed into an unjust government.",
  sources: "Shaykh al-Saduq, Uyun Akhbar al-Rida; Kitab al-Irshad; al-Tabari, Tarikh; Abu al-Faraj, Maqatil al-Talibiyyin",
  proof: "Even historians who avoid naming al-Ma'mun admit the Imam died suddenly after eating grapes in al-Ma'mun's company, just as the Abbasid family was rising against him for choosing an Alid heir."
},
{
  id: "jawad", era: "abbasid",
  title: "The Boy Imam and the Chief Judge",
  arabic: "مناظرة الإمام الجواد ويحيى بن أكثم",
  when: "c. 204–220 AH", where: "Baghdad",
  summary: "Imam al-Jawad became Imam at about eight years old. In the caliph's court, the chief judge tried to embarrass him with one question.",
  body: `
<p>When Imam al-Rida was martyred, his son Muhammad was about eight. Some Shia were confused: could a child be the Imam? The Imams answered by pointing to the Qur'an: Allah gave 'Isa (Jesus) prophethood as a baby in the cradle, and gave Yahya wisdom as a child (19:12, 19:30).</p>
<p>Al-Ma'mun wanted to marry his daughter Umm al-Fadl to the young Imam. The Abbasid family protested that he was just a boy. Al-Ma'mun arranged a test in front of the whole court: the chief judge, <strong>Yahya ibn Aktham</strong>, could ask anything.</p>
<p>Yahya asked: <em>"What do you say about a pilgrim in ihram who kills game?"</em></p>
<p>The Imam replied with questions: Did he kill it inside the sacred area or outside? Did he know it was forbidden, or not? Did he do it on purpose or by mistake? Was he a free man or a slave? An adult or a child? Was it his first time or had he done it before? Was the game a bird or another animal? Small or large? Was he sorry or did he insist? Was it at night or in the day? Was he in ihram for Hajj or for Umra?</p>
<p>Yahya was speechless, and the court understood that the boy had answered more than the judge had asked. The Imam then gave the ruling for every case. Afterwards he asked Yahya a question of his own, which Yahya could not answer.</p>
<p>The marriage went ahead, but Umm al-Fadl was unhappy and jealous. After al-Ma'mun's death, his brother al-Mu'tasim summoned the Imam to Baghdad. In 220 AH, at about twenty-five, the youngest Imam to die, he was poisoned through Umm al-Fadl. He is buried beside his grandfather al-Kazim in al-Kadhimiya.</p>`,
  lesson: "Knowledge from Allah does not depend on age. He is called al-Jawad, the Generous, and Bab al-Murad, the Door of Wishes.",
  sources: "Kitab al-Irshad; al-Mufid, al-Ikhtisas; al-Tabrisi, al-Ihtijaj; al-Mas'udi, Ithbat al-Wasiyya"
},
{
  id: "hadi-samarra", era: "abbasid",
  title: "Samarra: The Imam in a Garrison Town, and the Shrine of Karbala Ploughed Over",
  arabic: "الإمام الهادي والمتوكل",
  when: "233–254 AH (848–868 CE)", where: "Samarra and Karbala, Iraq",
  summary: "Caliph al-Mutawakkil moved the tenth Imam to his military capital to watch him, and tried to wipe out Husayn's grave.",
  body: `
<p><strong>Al-Mutawakkil</strong> was one of the caliphs most hostile to the family of Ali. Hearing that Imam Ali al-Hadi was loved in Medina, he had him brought to Samarra, the Abbasid military capital, where he could be watched day and night. On arrival, the Imam was lodged on purpose in Khan al-Sa'alik, the inn of beggars and the homeless.</p>
<p>Al-Mutawakkil's soldiers raided his house at night more than once, after reports that he was hiding weapons and money. One night they found him alone in a room, on a floor of sand and pebbles, in a woollen cloak, his head covered, reciting the Qur'an. They carried him like that to al-Mutawakkil, who was drinking with his companions. The caliph offered him a cup. The Imam said his flesh and blood had never touched wine. Asked to recite poetry, he recited verses about kings who lived in high fortresses, guarded by armed men, yet were taken down from their heights into graves, where all that remains of their beautiful faces is food for worms. Al-Mutawakkil wept until his beard was wet and ordered the wine taken away.</p>
<h4>The war on a grave</h4>
<p>Al-Mutawakkil could not stop the pilgrims going to Husayn. In 236 AH, al-Tabari records, he ordered Husayn's grave and all the houses around it demolished, the land ploughed and sown, and water released over it. The water would not flow over the grave and circled round it, which is why the shrine area is called <em>al-Ha'ir</em>. Pilgrims were punished; some reports say a hand was cut off for every visit, and people still went.</p>
<p>In 247 AH al-Mutawakkil was killed by his own Turkish guards, with the support of his son. Imam al-Hadi lived under watch in Samarra for twenty years, and passed away in 254 AH. He was martyred by poison under the caliph al-Mu'tazz.</p>`,
  lesson: "The Imam taught his followers the great visitation prayer al-Ziyara al-Jami'a al-Kabira, a complete lesson on who the Imams are.",
  sources: "al-Tabari, Tarikh (236 AH); al-Mas'udi, Muruj al-Dhahab; Abu al-Faraj, Maqatil al-Talibiyyin; Kitab al-Irshad"
},
{
  id: "askari", era: "abbasid",
  title: "Imam al-Askari: Under House Arrest",
  arabic: "الإمام العسكري",
  when: "254–260 AH (868–874 CE)", where: "Samarra",
  summary: "The eleventh Imam spent his whole short life inside a military camp. The Abbasids watched his house because they knew who his son would be.",
  body: `
<p>Imam Hasan ibn Ali is called <strong>al-Askari</strong> because he lived in al-Askar, the military district of Samarra. He had to report to the caliph's court twice a week, on Mondays and Thursdays, so they could see he was still there. He was imprisoned several times.</p>
<p>The Abbasids knew the hadiths: the twelfth Imam, the Mahdi, would come from the descendants of Husayn and would fill the earth with justice. They were watching the eleventh Imam's house for a son.</p>
<p>One of his jailers, Salih ibn Wasif, was given orders to make the Imam's life as hard as possible. He chose two of the worst guards he had. After a while, the two guards became devout worshippers themselves. When asked why, they said: what can we say about a man who fasts all day and stands in prayer all night, who does not speak or busy himself with anything else? When we look at him, we tremble.</p>
<p>Because the Shia could not meet him, the Imam relied on a network of trusted agents (<em>wukala</em>), who collected questions and religious dues and carried letters back and forth. This network would become essential in the next stage of history.</p>
<p>He passed away on 8 Rabi al-Awwal 260 AH, aged only about 28. He was martyred by poison under the caliph al-Mu'tamid. Immediately afterwards, the caliph's men searched his house, sealed it, and kept watch over his women for months, looking for a pregnancy or a child.</p>`,
  lesson: "The network of trusted agents the Imam built prepared the Shia for a time when they could no longer see their Imam.",
  sources: "Kitab al-Irshad; al-Kulayni, al-Kafi; Shaykh al-Saduq, Kamal al-Din"
},

/* ===================== OCCULTATION ===================== */
{
  id: "mahdi-birth", era: "ghayba",
  title: "The Hidden Child, and the Funeral Prayer",
  arabic: "مولد الإمام المهدي",
  when: "15 Sha'ban 255 AH (869 CE) – 260 AH", where: "Samarra",
  summary: "The twelfth Imam was born in secret. The first time most people saw him was when he stepped forward to lead his father's funeral prayer.",
  body: `
<p>The mother of the twelfth Imam was <strong>Narjis</strong> (also called Malika). She was a Byzantine princess who came to the Imam's house by a remarkable path. Because the Abbasids were watching, the birth, on the night of <strong>15 Sha'ban 255 AH</strong>, was kept secret. The Imam's aunt Hakima, who was present, narrated it. Imam al-Askari showed his son only to a few trusted companions, telling them: this is your Imam after me.</p>
<p>When Imam al-Askari died in 260 AH, his brother Ja'far, who wanted the inheritance and the leadership, stepped forward to lead the funeral prayer. Abu al-Adyan, a servant of the Imam, describes what happened next: as Ja'far raised his hands to begin, a small boy with a bright face came out from inside the house, took hold of Ja'far's cloak and pulled him back, saying: <strong>"Step back, uncle. I am more entitled to pray over my father than you."</strong> Ja'far went pale and stepped back. The boy led the prayer, and then went back into the house.</p>
<p>Ja'far reported the child to the caliph, whose men raided the house and searched for him, but he could not be found.</p>`,
  lesson: "Shia Muslims celebrate 15 Sha'ban, the birthday of Imam al-Mahdi, as a night of hope.",
  sources: "Shaykh al-Saduq, Kamal al-Din wa Tamam al-Ni'ma; Shaykh al-Tusi, Kitab al-Ghayba; al-Kulayni, al-Kafi"
},
{
  id: "ghayba", era: "ghayba",
  title: "The Four Deputies and the Major Occultation",
  arabic: "النواب الأربعة والغيبة الكبرى",
  when: "260–329 AH (874–941 CE) and after", where: "Baghdad",
  summary: "For about seventy years, the Imam guided the Shia through four deputies. Then the last deputy received a letter: there would be no more.",
  body: `
<p>From 260 AH the Imam lived in the <strong>Minor Occultation</strong> (al-Ghayba al-Sughra). He was hidden from the public, but answered his followers through four special deputies, one after another, all of them based in Baghdad:</p>
<ol>
<li><strong>Uthman ibn Sa'id al-Amri</strong>, who had already been a trusted agent of the 10th and 11th Imams. He worked as a seller of cooking oil and hid letters and dues in his oil containers.</li>
<li><strong>Muhammad ibn Uthman al-Amri</strong>, his son, deputy for about forty years.</li>
<li><strong>al-Husayn ibn Rawh al-Nawbakhti.</strong></li>
<li><strong>Ali ibn Muhammad al-Samari.</strong></li>
</ol>
<p>Questions went to the deputy, and answers came back in letters (<em>tawqi'at</em>) in the Imam's known handwriting.</p>
<p>In 329 AH, a few days before al-Samari's death, he brought out a final letter. It told him to set his affairs in order, because he would die in six days, and to appoint no one after him, because <strong>the complete occultation had begun</strong>. Anyone who claimed to have seen him as a deputy before the Sufyani and the Cry from the heavens would be a liar. Al-Samari died on the day the letter said. This began the <strong>Major Occultation</strong> (al-Ghayba al-Kubra), which continues today.</p>
<h4>What now?</h4>
<p>In another letter the Imam had told the Shia: <em>"As for events that happen, refer to the narrators of our hadith, for they are my proof over you, and I am Allah's proof over them."</em> This is the basis of <strong>marja'iyya</strong> and <strong>taqlid</strong>: in practical religious law, Shia Muslims follow a qualified, just jurist (mujtahid).</p>
<p>Shia Muslims believe the Imam is alive, present in the world but not recognised, like the sun behind clouds, which still gives light. Waiting for him (<em>intizar</em>) does not mean sitting still. It means becoming the kind of person who would be worthy to stand with him when Allah allows him to appear and fill the earth with justice, as it is filled with injustice.</p>`,
  lesson: "This is why, as a new Shia Muslim, you will be told to choose a marja' for taqlid. It is the Imam's own instruction for the time of his absence.",
  sources: "Shaykh al-Saduq, Kamal al-Din; Shaykh al-Tusi, Kitab al-Ghayba; al-Tabrisi, al-Ihtijaj"
}
];

/* ---------------------------------------------------------
   THE FOURTEEN INFALLIBLES (Ma'sumin)
   --------------------------------------------------------- */
const MASUMIN = [
  { n: "ﷺ", name: "Prophet Muhammad", title: "al-Mustafa · Seal of the Prophets", born: "17 Rabi al-Awwal, 570 CE · Mecca", died: "28 Safar 11 AH (632 CE) · Medina", age: "63", rulers: "Before the caliphate", note: "Brought the final message. Named Ali at Ghadir and left the Ummah 'the Book of Allah and my Ahl al-Bayt'.", story: "ghadir" },
  { n: "ع", name: "Fatima al-Zahra", title: "Sayyidat Nisa al-Alamin · Lady of the Women of the Worlds", born: "20 Jumada al-Thani, c. 615 CE · Mecca", died: "11 AH (632 CE) · Medina, grave unknown", age: "c. 18", rulers: "Abu Bakr", note: "Defended Ali's right and her own at Fadak; buried at night by her own will.", story: "fadak" },
  { n: "1", name: "Ali ibn Abi Talib", title: "Amir al-Mu'minin · Commander of the Faithful", born: "13 Rajab, c. 600 CE · inside the Ka'ba", died: "21 Ramadan 40 AH (661 CE) · Najaf", age: "63", rulers: "Abu Bakr, Umar, Uthman, then his own caliphate; enemy: Muawiya", note: "25 years of patience, then 5 years of rule marked by Jamal, Siffin and Nahrawan. Struck in prayer.", story: "ali-martyrdom" },
  { n: "2", name: "al-Hasan ibn Ali", title: "al-Mujtaba · the Chosen", born: "15 Ramadan 3 AH (625 CE) · Medina", died: "Safar 50 AH (670 CE) · al-Baqi, Medina", age: "47", rulers: "Muawiya", note: "Made peace to save the Shia; poisoned. Arrows struck his funeral.", story: "hasan-treaty" },
  { n: "3", name: "al-Husayn ibn Ali", title: "Sayyid al-Shuhada · Master of Martyrs", born: "3 Sha'ban 4 AH (626 CE) · Medina", died: "10 Muharram 61 AH (680 CE) · Karbala", age: "57", rulers: "Muawiya, Yazid", note: "Refused allegiance to Yazid; martyred at Karbala with about 72 companions.", story: "ashura" },
  { n: "4", name: "Ali Zayn al-Abidin", title: "al-Sajjad · the one who prostrates", born: "5 Sha'ban 38 AH (659 CE) · Medina", died: "25 Muharram 95 AH (713 CE) · al-Baqi", age: "57", rulers: "Yazid → Walid I", note: "Survived Karbala; taught Islam through du'a in al-Sahifa al-Sajjadiyya.", story: "sajjad" },
  { n: "5", name: "Muhammad al-Baqir", title: "al-Baqir · who splits knowledge open", born: "1 Rajab 57 AH (677 CE) · Medina", died: "7 Dhul Hijja 114 AH (733 CE) · al-Baqi", age: "57", rulers: "Walid I → Hisham", note: "Was at Karbala as a child of three or four. Founded the school of the Ahl al-Bayt.", story: "baqir" },
  { n: "6", name: "Ja'far al-Sadiq", title: "al-Sadiq · the Truthful", born: "17 Rabi al-Awwal 83 AH (702 CE) · Medina", died: "25 Shawwal 148 AH (765 CE) · al-Baqi", age: "65", rulers: "Hisham → al-Mansur", note: "Burned the letter offering him power; taught thousands. The Ja'fari school is named after him.", story: "sadiq" },
  { n: "7", name: "Musa al-Kazim", title: "al-Kazim · who restrains anger", born: "7 Safar 128 AH (745 CE) · al-Abwa", died: "25 Rajab 183 AH (799 CE) · Kadhimiya, Baghdad", age: "55", rulers: "al-Mansur → Harun al-Rashid", note: "Years in Harun's prisons; body left on the bridge of Baghdad.", story: "kazim" },
  { n: "8", name: "Ali al-Rida", title: "al-Rida · the one who is pleasing", born: "11 Dhul Qa'da 148 AH (765 CE) · Medina", died: "End of Safar 203 AH (818 CE) · Mashhad", age: "55", rulers: "Harun → al-Ma'mun", note: "Forced to be al-Ma'mun's heir; Hadith of the Golden Chain; poisoned at Tus.", story: "rida" },
  { n: "9", name: "Muhammad al-Jawad", title: "al-Jawad · the Generous; al-Taqi", born: "10 Rajab 195 AH (811 CE) · Medina", died: "End of Dhul Qa'da 220 AH (835 CE) · Kadhimiya", age: "25", rulers: "al-Ma'mun, al-Mu'tasim", note: "Imam at about eight; silenced the chief judge in al-Ma'mun's court.", story: "jawad" },
  { n: "10", name: "Ali al-Hadi", title: "al-Hadi · the Guide; al-Naqi", born: "15 Dhul Hijja 212 AH (828 CE) · near Medina", died: "3 Rajab 254 AH (868 CE) · Samarra", age: "41", rulers: "al-Mu'tasim → al-Mu'tazz", note: "Forced to Samarra by al-Mutawakkil, who ploughed over Husayn's grave.", story: "hadi-samarra" },
  { n: "11", name: "Hasan al-Askari", title: "al-Askari · of the garrison", born: "8 Rabi al-Thani 232 AH (846 CE) · Medina", died: "8 Rabi al-Awwal 260 AH (874 CE) · Samarra", age: "28", rulers: "al-Mu'tazz, al-Muhtadi, al-Mu'tamid", note: "Lived under house arrest; built the network of agents.", story: "askari" },
  { n: "12", name: "Muhammad al-Mahdi", title: "al-Qa'im · al-Hujja · Sahib al-Zaman", born: "15 Sha'ban 255 AH (869 CE) · Samarra", died: "Alive, in occultation since 260 AH", age: "—", rulers: "al-Mu'tamid (at the start of the occultation)", note: "Minor Occultation 260–329 AH through four deputies; Major Occultation since 329 AH.", story: "ghayba" }
];

/* ---------------------------------------------------------
   THE RULERS & THE AHL AL-BAYT
   --------------------------------------------------------- */
const RULERS = [
  { group: "The first three caliphs", items: [
    { name: "Abu Bakr", reign: "11–13 AH · 632–634", imam: "Ali, Fatima", text: "Chosen at Saqifa while Ali was burying the Prophet. Took Fadak from Fatima. Ali did not pledge allegiance for about six months, and Fatima died angry with him (Bukhari).", links: ["saqifa","fadak","door"] },
    { name: "Umar ibn al-Khattab", reign: "13–23 AH · 634–644", imam: "Ali", text: "Opposed the writing of the Prophet's last document. Ali kept out of power but advised Umar on law and war, and Umar relied on his judgements. Set up the six-man council whose condition kept Ali from the caliphate.", links: ["pen-paper","patience","shura"] },
    { name: "Uthman ibn Affan", reign: "23–35 AH · 644–656", imam: "Ali", text: "Appointed his Umayyad relatives as governors (Muawiya, al-Walid ibn Uqba, Marwan as his secretary). Exiled Abu Dharr; Ammar ibn Yasir was beaten. Ali mediated with the protesters and sent Hasan and Husayn to guard his house during the siege.", links: ["abu-dharr","ali-justice"] }
  ]},
  { group: "The Umayyads", items: [
    { name: "Muawiya ibn Abi Sufyan", reign: "41–60 AH · 661–680", imam: "Ali, Hasan, Husayn", text: "Fought Ali at Siffin. Broke every condition of the treaty with Imam Hasan. Made cursing Ali part of the Friday sermon. Executed Hujr ibn Adi. Arranged Imam Hasan's poisoning. Made the people pledge to his son Yazid.", links: ["siffin","hasan-treaty","muawiya-persecution","hasan-poison"] },
    { name: "Yazid ibn Muawiya", reign: "60–64 AH · 680–683", imam: "Husayn, Zayn al-Abidin", text: "Demanded Husayn's pledge or his head. His army killed Husayn and his family at Karbala and marched the women as captives to Damascus. Then sacked Medina (Harra) and bombarded the Ka'ba.", links: ["husayn-departure","ashura","zaynab","after-karbala"] },
    { name: "Marwan ibn al-Hakam", reign: "64–65 AH · 684–685", imam: "Zayn al-Abidin", text: "Earlier, as governor, led the armed Umayyads who turned back Imam Hasan's funeral. Fired the arrow that killed Talha at Jamal, from his own side.", links: ["hasan-poison","jamal"] },
    { name: "Abd al-Malik ibn Marwan", reign: "65–86 AH · 685–705", imam: "Zayn al-Abidin, al-Baqir", text: "His governor al-Hajjaj ibn Yusuf terrorised Iraq and killed close companions of Ali such as Kumayl ibn Ziyad and Qanbar. Consulted Imam al-Baqir about minting Islamic coins.", links: ["baqir"] },
    { name: "al-Walid ibn Abd al-Malik", reign: "86–96 AH · 705–715", imam: "Zayn al-Abidin, al-Baqir", text: "Martyred Imam Zayn al-Abidin by poison in 95 AH. In the same year al-Hajjaj killed the scholar Sa'id ibn Jubayr.", links: ["sajjad"] },
    { name: "Umar ibn Abd al-Aziz", reign: "99–101 AH · 717–720", imam: "al-Baqir", text: "The exception. Ended the cursing of Ali and returned Fadak to the children of Fatima.", links: ["umar-ii"] },
    { name: "Hisham ibn Abd al-Malik", reign: "105–125 AH · 724–743", imam: "al-Baqir, al-Sadiq", text: "Imprisoned al-Farazdaq for praising Imam Zayn al-Abidin. Summoned Imam al-Baqir to Damascus to humiliate him, then had him poisoned. Crushed Zayd ibn Ali's uprising and crucified his body.", links: ["sajjad","baqir","zayd"] }
  ]},
  { group: "The Abbasids", items: [
    { name: "al-Saffah", reign: "132–136 AH · 750–754", imam: "al-Sadiq", text: "Took power using the slogan of 'the chosen one from the family of Muhammad'. The caliphate was secretly offered to Imam al-Sadiq, who burned the letter.", links: ["sadiq"] },
    { name: "al-Mansur", reign: "136–158 AH · 754–775", imam: "al-Sadiq, al-Kazim", text: "Killed Muhammad al-Nafs al-Zakiyya and starved Hasanids in his dungeons. Summoned and threatened Imam al-Sadiq repeatedly, burned his house, and finally poisoned him. Ordered the Imam's heir found and killed.", links: ["sadiq"] },
    { name: "al-Hadi (Abbasid)", reign: "169–170 AH · 785–786", imam: "al-Kazim", text: "His army massacred the Alid rebel al-Husayn ibn Ali and his companions at Fakhkh near Mecca, a slaughter compared to Karbala.", links: [] },
    { name: "Harun al-Rashid", reign: "170–193 AH · 786–809", imam: "al-Kazim, al-Rida", text: "Arrested Imam al-Kazim at the Prophet's grave and kept him in prisons in Basra and Baghdad until he was poisoned in 183 AH. His body was left on the bridge of Baghdad.", links: ["kazim"] },
    { name: "al-Ma'mun", reign: "198–218 AH · 813–833", imam: "al-Rida, al-Jawad", text: "Forced Imam al-Rida to Merv and to become his heir, then poisoned him in 203 AH. Married his daughter to the young Imam al-Jawad.", links: ["rida","jawad"] },
    { name: "al-Mu'tasim", reign: "218–227 AH · 833–842", imam: "al-Jawad, al-Hadi", text: "Summoned Imam al-Jawad to Baghdad, where he was poisoned in 220 AH at about 25.", links: ["jawad"] },
    { name: "al-Mutawakkil", reign: "232–247 AH · 847–861", imam: "al-Hadi", text: "Forced Imam al-Hadi to live under watch in Samarra and had his house raided. Demolished and flooded Husayn's grave in 236 AH and punished the pilgrims.", links: ["hadi-samarra"] },
    { name: "al-Mu'tazz", reign: "252–255 AH · 866–869", imam: "al-Hadi, al-Askari", text: "Imam al-Hadi was martyred by poison in 254 AH during his reign.", links: ["hadi-samarra"] },
    { name: "al-Mu'tamid", reign: "256–279 AH · 870–892", imam: "al-Askari, al-Mahdi", text: "Imprisoned Imam al-Askari. After the Imam's death in 260 AH his men searched the house for his son. The Minor Occultation began.", links: ["askari","mahdi-birth"] }
  ]}
];

/* ---------------------------------------------------------
   COMPANIONS WHO STOOD FIRM
   --------------------------------------------------------- */
const COMPANIONS = [
  { name: "Salman al-Farsi", text: "A Persian who searched for the truth from Zoroastrianism to Christianity to Islam. The Prophet said: 'Salman is one of us, the Ahl al-Bayt.' Stayed loyal to Ali after Saqifa. Governor of al-Mada'in." },
  { name: "Abu Dharr al-Ghifari", text: "Spoke against the hoarding of wealth and was exiled to al-Rabadha, where he died almost alone, as the Prophet foretold." },
  { name: "al-Miqdad ibn al-Aswad", text: "One of the first Muslims and a horseman at Badr. One of the very few who never wavered from Ali." },
  { name: "Ammar ibn Yasir", text: "Son of the first martyrs of Islam. Killed at Siffin in his nineties. The Prophet said the rebel party would kill him." },
  { name: "Malik al-Ashtar", text: "Ali's bravest commander. On his way to govern Egypt he was poisoned with honey. Muawiya rejoiced and said: 'Allah has soldiers made of honey.'" },
  { name: "Hujr ibn Adi", text: "A companion famous for worship. Executed at Marj Adhra in 51 AH for refusing to curse Ali." },
  { name: "Maytham al-Tammar", text: "A date-seller of Kufa whom Ali taught. Crucified by Ibn Ziyad in 60 AH. When he kept speaking of the virtues of Ali from the cross, his tongue was cut out, as Ali had foretold." },
  { name: "Kumayl ibn Ziyad", text: "Ali taught him the du'a recited by Shia Muslims every Thursday night: Du'a Kumayl. Killed by al-Hajjaj." },
  { name: "Habib ibn Mazahir", text: "A childhood friend of Husayn. Over seventy years old, he commanded the left wing at Karbala and was martyred there." },
  { name: "Umm al-Banin", text: "Wife of Ali and mother of al-Abbas and his three brothers, all martyred at Karbala. When told the news, she asked first about Husayn." },
  { name: "Zaynab bint Ali", text: "The heroine of Karbala. Protected the survivors and spoke out in the courts of Ibn Ziyad and Yazid." },
  { name: "al-Abbas ibn Ali", text: "Standard-bearer at Karbala. Lost both arms bringing water for the children, but would not drink while Husayn was thirsty." }
];

/* ---------------------------------------------------------
   KEY DATES (Islamic calendar)
   --------------------------------------------------------- */
const DATES = [
  { month: "Muharram", day: "1–10", name: "Mourning of Muharram, Ashura (10th)", story: "ashura" },
  { month: "Safar", day: "20", name: "Arba'in, 40 days after Ashura", story: "zaynab" },
  { month: "Safar", day: "28", name: "Passing of the Prophet ﷺ (Shia dating) and of Imam Hasan", story: "saqifa" },
  { month: "Rabi al-Awwal", day: "8 / 9", name: "Martyrdom of Imam al-Askari / Start of the Imamate of al-Mahdi", story: "askari" },
  { month: "Rabi al-Awwal", day: "17", name: "Birth of the Prophet ﷺ and of Imam al-Sadiq", story: "sadiq" },
  { month: "Jumada al-Ula / Thani", day: "—", name: "Ayyam al-Fatimiyya, mourning of Lady Fatima", story: "fatima-burial" },
  { month: "Jumada al-Thani", day: "20", name: "Birth of Lady Fatima al-Zahra", story: "fadak" },
  { month: "Rajab", day: "13", name: "Birth of Imam Ali, inside the Ka'ba", story: "kaaba-birth" },
  { month: "Rajab", day: "25", name: "Martyrdom of Imam al-Kazim", story: "kazim" },
  { month: "Rajab", day: "27", name: "Mab'ath, the start of the Prophet's mission", story: "dhul-ashira" },
  { month: "Sha'ban", day: "3–5", name: "Births of Imam Husayn, al-Abbas and Imam Zayn al-Abidin", story: "husayn-departure" },
  { month: "Sha'ban", day: "15", name: "Birth of Imam al-Mahdi", story: "mahdi-birth" },
  { month: "Ramadan", day: "19–21", name: "Striking and martyrdom of Imam Ali; Nights of Qadr", story: "ali-martyrdom" },
  { month: "Dhul Qa'da", day: "11", name: "Birth of Imam al-Rida", story: "rida" },
  { month: "Dhul Hijja", day: "18", name: "Eid al-Ghadir", story: "ghadir" },
  { month: "Dhul Hijja", day: "24", name: "Mubahala", story: "mubahala" }
];

/* ---------------------------------------------------------
   TIMELINE (pulls from stories + a few extra markers)
   --------------------------------------------------------- */
const TIMELINE = [
  { y: "c. 600", era: "prophet", t: "Ali born inside the Ka'ba", s: "kaaba-birth" },
  { y: "610", era: "prophet", t: "First revelation; Ali, about ten, is the first male to believe", s: "kaaba-birth" },
  { y: "613", era: "prophet", t: "Feast of the Clan: Ali named brother, executor, successor", s: "dhul-ashira" },
  { y: "619", era: "prophet", t: "Year of Sorrow: Khadija and Abu Talib die", s: null },
  { y: "622 · 1 AH", era: "prophet", t: "Hijra; Ali sleeps in the Prophet's bed", s: "laylat-al-mabit" },
  { y: "628 · 7 AH", era: "prophet", t: "Khaybar: the banner given to Ali", s: "khaybar" },
  { y: "631 · 10 AH", era: "prophet", t: "Mubahala with the Christians of Najran", s: "mubahala" },
  { y: "632 · 10 AH", era: "prophet", t: "Ghadir Khumm: 'Whoever I am his mawla, Ali is his mawla'", s: "ghadir" },
  { y: "632 · 11 AH", era: "prophet", t: "The pen and paper; the Prophet passes away", s: "pen-paper" },
  { y: "632 · 11 AH", era: "after", t: "Saqifa: Abu Bakr chosen while Ali buries the Prophet", s: "saqifa" },
  { y: "632 · 11 AH", era: "after", t: "Fadak taken; Fatima's sermon", s: "fadak" },
  { y: "632 · 11 AH", era: "after", t: "Fatima martyred; buried at night", s: "fatima-burial" },
  { y: "634 · 13 AH", era: "after", t: "Umar becomes caliph", s: "patience" },
  { y: "644 · 23 AH", era: "after", t: "Council of Six; Uthman becomes caliph", s: "shura" },
  { y: "652 · 32 AH", era: "after", t: "Abu Dharr dies in exile at al-Rabadha", s: "abu-dharr" },
  { y: "656 · 35 AH", era: "ali", t: "Uthman killed; Ali becomes caliph", s: "ali-justice" },
  { y: "656 · 36 AH", era: "ali", t: "Battle of the Camel", s: "jamal" },
  { y: "657 · 37 AH", era: "ali", t: "Siffin; Ammar martyred; arbitration", s: "siffin" },
  { y: "658 · 38 AH", era: "ali", t: "Nahrawan against the Khawarij", s: "nahrawan" },
  { y: "661 · 40 AH", era: "ali", t: "Ali struck in the mosque of Kufa", s: "ali-martyrdom" },
  { y: "661 · 41 AH", era: "umayyad", t: "Imam Hasan's treaty with Muawiya", s: "hasan-treaty" },
  { y: "670 · 50 AH", era: "umayyad", t: "Imam Hasan poisoned", s: "hasan-poison" },
  { y: "671 · 51 AH", era: "umayyad", t: "Hujr ibn Adi executed", s: "muawiya-persecution" },
  { y: "680 · 60 AH", era: "umayyad", t: "Yazid takes power; Husayn refuses", s: "husayn-departure" },
  { y: "680 · 61 AH", era: "umayyad", t: "Karbala: the Day of Ashura", s: "ashura" },
  { y: "680 · 61 AH", era: "umayyad", t: "Zaynab and Zayn al-Abidin in Kufa and Damascus", s: "zaynab" },
  { y: "683 · 63 AH", era: "umayyad", t: "Harra: Medina sacked", s: "after-karbala" },
  { y: "686 · 66 AH", era: "umayyad", t: "Mukhtar avenges Karbala", s: "after-karbala" },
  { y: "713 · 95 AH", era: "umayyad", t: "Imam Zayn al-Abidin martyred", s: "sajjad" },
  { y: "717 · 99 AH", era: "umayyad", t: "Umar ibn Abd al-Aziz ends the cursing, returns Fadak", s: "umar-ii" },
  { y: "733 · 114 AH", era: "umayyad", t: "Imam al-Baqir martyred", s: "baqir" },
  { y: "740 · 122 AH", era: "umayyad", t: "Uprising of Zayd ibn Ali", s: "zayd" },
  { y: "750 · 132 AH", era: "abbasid", t: "Abbasid revolution; Imam al-Sadiq burns the letter", s: "sadiq" },
  { y: "765 · 148 AH", era: "abbasid", t: "Imam al-Sadiq martyred", s: "sadiq" },
  { y: "799 · 183 AH", era: "abbasid", t: "Imam al-Kazim dies in Harun's prison", s: "kazim" },
  { y: "817 · 201 AH", era: "abbasid", t: "Imam al-Rida made heir; Golden Chain at Nishapur", s: "rida" },
  { y: "818 · 203 AH", era: "abbasid", t: "Imam al-Rida martyred at Tus", s: "rida" },
  { y: "835 · 220 AH", era: "abbasid", t: "Imam al-Jawad martyred at 25", s: "jawad" },
  { y: "850 · 236 AH", era: "abbasid", t: "al-Mutawakkil ploughs over Husayn's grave", s: "hadi-samarra" },
  { y: "868 · 254 AH", era: "abbasid", t: "Imam al-Hadi martyred in Samarra", s: "hadi-samarra" },
  { y: "869 · 255 AH", era: "ghayba", t: "Birth of Imam al-Mahdi", s: "mahdi-birth" },
  { y: "874 · 260 AH", era: "ghayba", t: "Imam al-Askari martyred; Minor Occultation begins", s: "askari" },
  { y: "941 · 329 AH", era: "ghayba", t: "Last deputy dies; Major Occultation begins", s: "ghayba" }
];

/* ---------------------------------------------------------
   PHOTOS — loaded live from Wikipedia (Wikimedia Commons,
   free licences). Only places, never faces of holy figures.
   --------------------------------------------------------- */
const STORY_IMAGES = {
  "kaaba-birth": "Kaaba",
  "dhul-ashira": "Mecca",
  "laylat-al-mabit": "Jabal_Thawr",
  "brotherhood": "Prophet's_Mosque",
  "khaybar": "Khaybar",
  "mubahala": "Prophet's_Mosque",
  "ghadir": "Ghadir_Khumm",
  "pen-paper": "Prophet's_Mosque",
  "saqifa": "Saqifa",
  "fadak": "Fadak",
  "door": "Medina",
  "fatima-burial": "Al-Baqi_Cemetery",
  "patience": "Medina",
  "shura": "Medina",
  "abu-dharr": "Al-Rabadha",
  "ali-justice": "Great_Mosque_of_Kufa",
  "jamal": "Basra",
  "siffin": "Euphrates",
  "nahrawan": "Tigris",
  "ali-martyrdom": "Imam_Ali_Shrine",
  "hasan-treaty": "Kufa",
  "muawiya-persecution": "Damascus",
  "hasan-poison": "Al-Baqi_Cemetery",
  "husayn-departure": "Great_Mosque_of_Mecca",
  "hurr-karbala": "Karbala",
  "ashura": "Imam_Husayn_Shrine",
  "zaynab": "Sayyida_Zaynab_Mosque",
  "after-karbala": "Al-Abbas_Shrine",
  "sajjad": "Al-Baqi_Cemetery",
  "baqir": "Umayyad_Mosque",
  "umar-ii": "Umayyad_Mosque",
  "zayd": "Kufa",
  "sadiq": "Medina",
  "kazim": "Al-Kadhimiya_Mosque",
  "rida": "Imam_Reza_shrine",
  "jawad": "Al-Kadhimiya_Mosque",
  "hadi-samarra": "Great_Mosque_of_Samarra",
  "askari": "Al-Askari_Shrine",
  "mahdi-birth": "Al-Askari_Shrine",
  "ghayba": "Jamkaran_Mosque"
};

const ERA_IMAGES = {
  prophet: "Kaaba",
  after: "Prophet's_Mosque",
  ali: "Imam_Ali_Shrine",
  umayyad: "Imam_Husayn_Shrine",
  abbasid: "Imam_Reza_shrine",
  ghayba: "Al-Askari_Shrine"
};

const IMAM_IMAGES = {
  "Prophet Muhammad": "Prophet's_Mosque",
  "Fatima al-Zahra": "Al-Baqi_Cemetery",
  "Ali ibn Abi Talib": "Imam_Ali_Shrine",
  "al-Hasan ibn Ali": "Al-Baqi_Cemetery",
  "al-Husayn ibn Ali": "Imam_Husayn_Shrine",
  "Ali Zayn al-Abidin": "Al-Baqi_Cemetery",
  "Muhammad al-Baqir": "Al-Baqi_Cemetery",
  "Ja'far al-Sadiq": "Al-Baqi_Cemetery",
  "Musa al-Kazim": "Al-Kadhimiya_Mosque",
  "Ali al-Rida": "Imam_Reza_shrine",
  "Muhammad al-Jawad": "Al-Kadhimiya_Mosque",
  "Ali al-Hadi": "Al-Askari_Shrine",
  "Hasan al-Askari": "Al-Askari_Shrine",
  "Muhammad al-Mahdi": "Jamkaran_Mosque"
};

/* ---------------------------------------------------------
   PROOFS — why the Ahl al-Bayt are the path of the Prophet
   --------------------------------------------------------- */
const PROOFS = [
  { title: "The Two Weighty Things", ar: "إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ: كِتَابَ اللَّهِ وَعِتْرَتِي أَهْلَ بَيْتِي",
    en: "\"I am leaving among you two weighty things: the Book of Allah and my family, my Ahl al-Bayt. If you hold onto them you will never go astray, and they will not separate until they come to me at the Pond.\"",
    src: "Sahih Muslim (from Zayd ibn Arqam); Sunan al-Tirmidhi; Musnad Ahmad",
    why: "The Prophet named exactly two things to hold onto after him. Whoever leaves the Ahl al-Bayt has let go of half of what the Prophet left. The Shia are the ones who held onto both.", story: "ghadir" },
  { title: "Ghadir: \"Ali is his Mawla\"", ar: "مَنْ كُنْتُ مَوْلَاهُ فَعَلِيٌّ مَوْلَاهُ",
    en: "\"Whoever I am his master, Ali is his master.\"",
    src: "Musnad Ahmad; Sunan al-Tirmidhi; Sunan Ibn Majah; al-Mustadrak; narrated by over 100 companions",
    why: "Spoken to the pilgrims of the Farewell Hajj, after asking 'Do I not have more authority over you than yourselves?' The authority of the Prophet was handed to Ali in front of everyone.", story: "ghadir" },
  { title: "The Verse of Wilayah", ar: "إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُمْ رَاكِعُونَ",
    en: "\"Your guardian is only Allah, His Messenger, and those who believe, who establish prayer and give charity while bowing.\" (Qur'an 5:55)",
    src: "Revealed when Ali gave his ring to a beggar while in ruku': Tafsir al-Tabari, al-Wahidi's Asbab al-Nuzul, al-Razi and many others",
    why: "The Qur'an names three guardians: Allah, the Messenger, and the one who gave charity in ruku'. Only one person did that: Ali.", story: "ghadir" },
  { title: "The Verse of Purification", ar: "إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ",
    en: "\"Allah only wishes to remove all impurity from you, O People of the House, and to purify you completely.\" (Qur'an 33:33)",
    src: "Sahih Muslim (hadith of the Cloak, from A'isha); Sunan al-Tirmidhi (Umm Salama)",
    why: "The Prophet gathered Ali, Fatima, Hasan and Husayn under his cloak and recited this verse, and did not let even his wife enter. Allah purified them: this is the basis of their infallibility ('isma).", story: "mubahala" },
  { title: "Twelve Successors, All from Quraysh", ar: "اثْنَا عَشَرَ خَلِيفَةً كُلُّهُمْ مِنْ قُرَيْشٍ",
    en: "\"This religion will remain standing until there have been twelve successors over you, all of them from Quraysh.\"",
    src: "Sahih al-Bukhari and Sahih Muslim (from Jabir ibn Samura)",
    why: "Their own most trusted books say twelve. The caliphs of history were four, then dozens of Umayyads and Abbasids. Only one line has exactly twelve, the last still alive: the Twelve Imams.", story: "ghayba" },
  { title: "The Ark of Nuh", ar: "مَثَلُ أَهْلِ بَيْتِي فِيكُمْ مَثَلُ سَفِينَةِ نُوحٍ",
    en: "\"My Ahl al-Bayt among you are like the Ark of Nuh: whoever boards it is saved, and whoever stays behind is drowned.\"",
    src: "al-Hakim, al-Mustadrak; al-Tabarani, al-Mu'jam",
    why: "In the flood, being related to Nuh did not save his own son. Only boarding the ark did. Following the Ahl al-Bayt is the ark.", story: "mubahala" },
  { title: "Like Harun to Musa", ar: "أَنْتَ مِنِّي بِمَنْزِلَةِ هَارُونَ مِنْ مُوسَى",
    en: "\"You are to me as Harun was to Musa, except that there is no prophet after me.\"",
    src: "Sahih al-Bukhari; Sahih Muslim",
    why: "Harun was Musa's brother, minister and deputy over the people. The Prophet gave Ali every rank of Harun except prophethood, including leading the people after him.", story: "brotherhood" },
  { title: "The Gate of the City of Knowledge", ar: "أَنَا مَدِينَةُ الْعِلْمِ وَعَلِيٌّ بَابُهَا",
    en: "\"I am the city of knowledge and Ali is its gate. Whoever wants the city, let him come through the gate.\"",
    src: "al-Hakim, al-Mustadrak; Sunan al-Tirmidhi ('I am the house of wisdom and Ali is its door')",
    why: "Even Umar said many times, 'Were it not for Ali, Umar would have perished.' The one the Muslims turned to for answers is the one who should have led them.", story: "patience" },
  { title: "Love of Ali is Faith", ar: "لَا يُحِبُّنِي إِلَّا مُؤْمِنٌ وَلَا يُبْغِضُنِي إِلَّا مُنَافِقٌ",
    en: "Ali said: the Prophet promised me that \"none loves me except a believer, and none hates me except a hypocrite.\"",
    src: "Sahih Muslim, Book of Faith",
    why: "Love for Ali is a test of faith itself. That is why Shia Islam is called the school of Wilayah: love and loyalty to Ali and his sons.", story: "muawiya-persecution" },
  { title: "Love of the Near Relatives", ar: "قُل لَّا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ",
    en: "\"Say: I ask of you no reward for it except love for my near relatives.\" (Qur'an 42:23)",
    src: "Commentaries such as al-Zamakhshari's al-Kashshaf and al-Razi report the relatives are Ali, Fatima, Hasan and Husayn",
    why: "The only payment the Prophet asked for 23 years of his mission was love for his family. Look at what was done to them after him.", story: "ashura" },
  { title: "The Imam of Your Time", ar: "مَنْ مَاتَ وَلَمْ يَعْرِفْ إِمَامَ زَمَانِهِ مَاتَ مِيتَةً جَاهِلِيَّةً",
    en: "\"Whoever dies without knowing the Imam of his time dies the death of the days of ignorance.\"",
    src: "al-Kulayni, al-Kafi; similar in Sahih Muslim ('whoever dies without a pledge on his neck…') and Musnad Ahmad",
    why: "Every age must have an Imam. Ask anyone: who is the Imam of our time? Only the Shia have an answer: Imam Muhammad al-Mahdi, alive and awaited.", story: "ghayba" },
  { title: "Ali is With the Truth", ar: "عَلِيٌّ مَعَ الْحَقِّ وَالْحَقُّ مَعَ عَلِيٍّ",
    en: "\"Ali is with the truth and the truth is with Ali.\" In al-Tirmidhi: \"O Allah, turn the truth with him wherever he turns.\"",
    src: "Sunan al-Tirmidhi; al-Hakim, al-Mustadrak; al-Khatib, Tarikh Baghdad",
    why: "So in every dispute, at Saqifa, at Jamal, at Siffin, the side of Ali is the side of truth.", story: "siffin" }
];

/* ---------------------------------------------------------
   NEW STORIES: the battles of Amir al-Mu'minin
   --------------------------------------------------------- */
const BATTLE_STORIES = {
before: [
{
  id: "badr", era: "prophet",
  title: "Badr: The Lion of the First Battle",
  arabic: "معركة بدر",
  when: "17 Ramadan, 2 AH (624 CE)", where: "Wells of Badr, south-west of Medina",
  summary: "313 Muslims against about a thousand. Ali, about twenty-five, stepped out for the first duel and killed one of the champions of Quraysh.",
  body: `
<p>The army of Quraysh came out of Mecca about a thousand strong, with horses and armour. The Muslims were 313, with two horses and seventy camels between them. The night before, the Prophet ﷺ stood in prayer until dawn, asking Allah for His promised help.</p>
<p>As was the Arab custom, three champions of Quraysh stepped out to call for duels: <strong>Utba ibn Rabi'a, his brother Shayba, and his son al-Walid</strong>. Three men of the Ansar went out to meet them, but Utba shouted: "We want our equals from our own tribe!" So the Prophet sent out his own family: his elderly cousin <strong>Ubayda ibn al-Harith</strong>, his uncle <strong>Hamza</strong>, and the youngest, <strong>Ali</strong>.</p>
<p>Ali faced al-Walid and killed him almost at once. Hamza killed Shayba. Ubayda and Utba struck each other down, and Ali and Hamza rushed in, finished Utba and carried the wounded Ubayda back to the Prophet. Ubayda's leg was cut, and he died on the way home: the first martyr of the Prophet's family.</p>
<p>Then the armies clashed. Allah sent angels to help (Qur'an 8:9), and Quraysh broke and fled, leaving seventy dead, among them Abu Jahl. Shaykh al-Mufid lists thirty-six of them who fell to Ali's sword.</p>
<p><strong>Remember these names.</strong> Utba was the father, Shayba the uncle and al-Walid the brother of <strong>Hind</strong>, the mother of Muawiya. Fifty-seven years later, with the head of Husayn in front of him, Yazid recited verses saying he had now taken revenge for his ancestors killed at Badr. That grudge began here.</p>`,
  lesson: "Victory comes from Allah, not numbers. And the family of the Prophet were always the first to stand in front of danger, not behind it.",
  sources: "Ibn Hisham, al-Sira; al-Waqidi, al-Maghazi; al-Tabari, Tarikh; Kitab al-Irshad",
  proof: "The duel of Ali, Hamza and Ubayda is recorded in Sahih al-Bukhari, where Ali says the verse 'These are two opponents who disputed about their Lord' (22:19) was revealed about them."
},
{
  id: "uhud", era: "prophet",
  title: "Uhud: When Everyone Ran, Ali Stood",
  arabic: "معركة أحد",
  when: "Shawwal, 3 AH (625 CE)", where: "Mount Uhud, Medina",
  summary: "One mistake turned victory into disaster. As most of the army fled, Ali stood in front of the Prophet, and a voice from the sky called out his name.",
  body: `
<p>Quraysh came back for revenge with three thousand men. The Prophet ﷺ placed fifty archers on a small hill and ordered them: <em>do not leave this place, whether we win or lose.</em></p>
<p>The battle began with the standard-bearers of Quraysh. Ali killed <strong>Talha ibn Abi Talha</strong>, who carried their banner, and then the next who picked it up, and the next. Quraysh broke, and the Muslims were winning.</p>
<p>Then most of the archers saw the enemy camp full of spoils and ran down the hill, despite their commander's orders. Khalid ibn al-Walid, still a polytheist, saw the gap, rode around the hill and attacked from behind. Someone shouted that Muhammad had been killed, and panic spread. The Qur'an describes it: <em>"when you were running up the hill, not turning to anyone, while the Messenger was calling you from behind"</em> (3:153).</p>
<p>The Prophet was struck in the face, his tooth was broken, and he fell into a pit. Around him stood only a handful of people, and at their centre was Ali. Groups of Quraysh charged one after another. Each time the Prophet said, "Ali, drive them back," and Ali drove them back, until his body was covered with wounds.</p>
<p>Al-Tabari records that a voice was heard from the sky that day: <strong>"There is no youth like Ali, and no sword like Dhul-Fiqar."</strong> (<em>La fata illa Ali, la sayfa illa Dhul-Fiqar.</em>) Shia narrations add that Jibra'il said to the Prophet, "This is true devotion," and the Prophet replied: "He is from me and I am from him."</p>
<p>That day the Prophet's uncle <strong>Hamza</strong>, the Lion of Allah, was martyred by Wahshi's spear, and his body was mutilated by Hind, the mother of Muawiya.</p>`,
  lesson: "One act of disobedience by a few turned victory into defeat. Steadfastness is shown when others run, not when everyone is winning.",
  sources: "al-Tabari, Tarikh (the call 'La fata illa Ali'); Ibn Hisham, al-Sira; al-Waqidi, al-Maghazi; Kitab al-Irshad",
  proof: "Al-Tabari, the great Sunni historian, records the heavenly call 'La fata illa Ali, la sayfa illa Dhul-Fiqar'. The Qur'an itself (3:153) records that the others ran."
},
{
  id: "khandaq", era: "prophet",
  title: "Khandaq: All of Faith against All of Disbelief",
  arabic: "معركة الخندق وقتل عمرو بن عبد ود",
  when: "Shawwal, 5 AH (627 CE)", where: "The trench around Medina",
  summary: "Ten thousand enemies surrounded Medina. Their greatest champion leapt the trench and mocked the Muslims. Only Ali answered.",
  body: `
<p>The tribes of Arabia united against Medina: Quraysh, Ghatafan and their allies, about ten thousand men. They were called <em>al-Ahzab</em>, the Confederates. On the advice of <strong>Salman al-Farsi</strong>, the Muslims dug a deep trench along the open side of the city. For weeks the enemy camped on the other side, in the cold and hunger.</p>
<p>Then <strong>Amr ibn Abd Wadd</strong>, the most feared warrior in Arabia, who was said to be worth a thousand horsemen, found a narrow place and jumped his horse across the trench. He rode up and down in front of the Muslims and shouted: "Is there no one to fight me? Where is the Paradise you say your dead go to?" The Qur'an describes that day: <em>"eyes swerved and hearts reached the throats"</em> (33:10).</p>
<p>Nobody moved, except Ali, who stood up and said, "I will, O Messenger of Allah." The Prophet told him to sit: "It is Amr!" Amr called out a second time, and a third, mocking them. Each time, only Ali stood. The third time, Ali said: <strong>"Even if it is Amr."</strong></p>
<p>The Prophet put his own turban on Ali's head, gave him his sword, and as Ali walked out he said: <strong>"All of faith has gone out to face all of disbelief."</strong></p>
<p>Ali offered Amr three choices: accept Islam, take his men and go home, or fight. Amr laughed and said he did not want to kill the son of his old friend Abu Talib. Ali replied, "But I would love to kill you." Amr jumped from his horse in anger and cut its legs. Dust rose around them so no one could see. Then the cry <em>Allahu Akbar</em> came out of the dust, and the Muslims knew that Ali had won.</p>
<p>It is narrated that when Ali had Amr on the ground, Amr spat in his face. Ali stood up, walked a few steps, then came back and finished the fight. When asked why, he said: <strong>"I did not want to kill him out of my own anger. I waited until it was only for Allah."</strong> He also refused to strip Amr's valuable armour, and Amr's own sister later praised him for it.</p>
<p>The Prophet said: <strong>"Ali's strike on the day of Khandaq is better than the worship of both worlds (al-thaqalayn) until the Day of Judgement."</strong> Soon after, Allah sent a freezing wind, and the Confederates fled.</p>`,
  lesson: "True courage is for Allah, never for ego. Ali controlled his anger even in a duel to the death.",
  sources: "al-Hakim, al-Mustadrak (the 'strike' hadith); al-Waqidi, al-Maghazi; Ibn Hisham, al-Sira; Kitab al-Irshad; Rumi, Mathnawi (the spitting story)",
  proof: "Al-Hakim al-Nishaburi, a Sunni hadith master, records the Prophet's words that Ali's strike at Khandaq outweighs the deeds of his whole Ummah."
}
],
after: [
{
  id: "mecca-hunayn", era: "prophet",
  title: "Mecca and Hunayn: Breaking the Idols, Holding the Line",
  arabic: "فتح مكة وحنين",
  when: "Ramadan and Shawwal, 8 AH (630 CE)", where: "Mecca and the valley of Hunayn",
  summary: "Ali stood on the Prophet's shoulders to throw down the idols of the Ka'ba. Weeks later, when twelve thousand Muslims ran in an ambush, he was among the few who stayed.",
  body: `
<h4>The conquest of Mecca</h4>
<p>Quraysh broke the treaty of Hudaybiyya, and the Prophet ﷺ marched on Mecca with ten thousand men. One commander, Sa'd ibn Ubada, rode in shouting, "Today is the day of slaughter!" The Prophet took the banner from him and gave it to Ali, and changed the call: <em>"Today is the day of mercy."</em></p>
<p>Mecca surrendered almost without blood. The Prophet entered the Ka'ba, where 360 idols stood, and struck them with his staff, reciting: <em>"Truth has come and falsehood has vanished"</em> (17:81). The largest idol stood on the roof. Musnad Ahmad and al-Hakim record that the Prophet told Ali to climb on his shoulders. Ali stood on the shoulders of the Messenger of Allah, threw the idol down and smashed it.</p>
<p>The Prophet forgave the people of Mecca who had fought him for twenty years, saying: <strong>"Go, you are free."</strong> They became known as <em>al-tulaqa'</em>, "the freed ones." Among them were Abu Sufyan and his son Muawiya.</p>
<h4>Hunayn</h4>
<p>Weeks later, the tribes of Hawazin gathered to fight. The Muslims marched out twelve thousand strong, the largest army they had ever had, and some said, "We will not be defeated today because of our numbers." At dawn, as they entered the narrow valley of Hunayn, Hawazin ambushed them with arrows from the hills. The army broke and ran.</p>
<p>The Qur'an remembers it: <em>"on the day of Hunayn, when your great numbers pleased you, but they did not help you at all… then you turned back, fleeing"</em> (9:25). Around the Prophet stood only a few men of his family and close companions: Ali, al-Abbas, al-Fadl ibn Abbas, Abu Sufyan ibn al-Harith and a handful of others. Ali attacked and killed <strong>Abu Jarwal</strong>, the standard-bearer of Hawazin. Al-Abbas, who had a powerful voice, called the fleeing Muslims back, and the battle turned.</p>`,
  lesson: "Pride in numbers loses battles. In the moment of fear, the people who stand by the Prophet show who they really are.",
  sources: "Musnad Ahmad and al-Hakim, al-Mustadrak (breaking the idols); Ibn Hisham, al-Sira; al-Waqidi, al-Maghazi; Kitab al-Irshad",
  proof: "Musnad Ahmad and al-Mustadrak record Ali standing on the Prophet's shoulders to break the idols. The Qur'an (9:25) records that the army fled at Hunayn."
},
{
  id: "baraa", era: "prophet",
  title: "Bara'a: \"Only Me, or a Man from Me\"",
  arabic: "تبليغ سورة براءة",
  when: "Dhul Hijja, 9 AH (631 CE)", where: "Mina, during Hajj",
  summary: "The Prophet sent Abu Bakr to announce Surat al-Tawba at Hajj. Then Jibra'il came with an order: it must be Ali.",
  body: `
<p>In 9 AH, Allah revealed the opening verses of <strong>Surat al-Tawba</strong> (also called Bara'a, "Disavowal"): the polytheists had four months, after which no polytheist could approach the Sacred Mosque or walk around the Ka'ba naked, as some still did.</p>
<p>The Prophet ﷺ sent <strong>Abu Bakr</strong> to lead the Hajj and read these verses to the crowds. He had already left when Jibra'il came down and said: <strong>"No one may convey this on your behalf except you, or a man who is from you."</strong></p>
<p>The Prophet called Ali, gave him his own camel, al-Adba', and sent him after Abu Bakr to take the verses. Ali caught up and took them. Abu Bakr returned to the Prophet and asked if something had been revealed about him. The Prophet answered that he had been commanded that only he or a man of his family could convey it. Sunan al-Tirmidhi and Musnad Ahmad record the story.</p>
<p>At Mina, Ali stood alone in front of the gathered tribes of Arabia. Many of them had lost fathers, sons and brothers to his sword at Badr, Uhud and Khandaq, and he announced to their faces that Allah and His Messenger were free of the polytheists.</p>
<p>On another occasion, recorded by al-Tirmidhi, the Prophet said: <strong>"Ali is from me and I am from Ali, and no one conveys on my behalf except me or Ali."</strong></p>`,
  lesson: "Allah Himself chose who could speak for the Prophet. If it was only Ali for a few verses, what about the whole religion after him?",
  sources: "Sunan al-Tirmidhi; Musnad Ahmad; al-Nasa'i, Khasa'is Amir al-Mu'minin; Tafsir al-Tabari on 9:1",
  proof: "Al-Tirmidhi and Ahmad, two of the great Sunni hadith collections, record the recall of the verses and the words 'no one conveys on my behalf except me or Ali'."
}
]};

(function insertBattles() {
  const k = STORIES.findIndex(s => s.id === "khaybar");
  STORIES.splice(k, 0, ...BATTLE_STORIES.before);
  const k2 = STORIES.findIndex(s => s.id === "khaybar");
  STORIES.splice(k2 + 1, 0, ...BATTLE_STORIES.after);
  Object.assign(STORY_IMAGES, { badr: "Medina", uhud: "Mount_Uhud", khandaq: "Medina", "mecca-hunayn": "Great_Mosque_of_Mecca", baraa: "Mina,_Saudi_Arabia" });
  const t = TIMELINE.findIndex(x => x.s === "khaybar");
  TIMELINE.splice(t, 0,
    { y: "624 · 2 AH", era: "prophet", t: "Badr: Ali kills al-Walid in the first duel", s: "badr" },
    { y: "625 · 3 AH", era: "prophet", t: "Uhud: 'There is no youth like Ali'", s: "uhud" },
    { y: "627 · 5 AH", era: "prophet", t: "Khandaq: Ali kills Amr ibn Abd Wadd", s: "khandaq" });
  const t2 = TIMELINE.findIndex(x => x.s === "khaybar");
  TIMELINE.splice(t2 + 1, 0,
    { y: "630 · 8 AH", era: "prophet", t: "Conquest of Mecca; Hunayn", s: "mecca-hunayn" },
    { y: "631 · 9 AH", era: "prophet", t: "Ali conveys Surat Bara'a at Hajj", s: "baraa" });
})();

/* ---------------------------------------------------------
   THE BATTLES OF AMIR AL-MU'MININ (overview)
   --------------------------------------------------------- */
const BATTLES = [
  { name: "The Night of the Hijra", ar: "ليلة المبيت", year: "1 AH · 622", foe: "Forty assassins of Quraysh", story: "laylat-al-mabit",
    brave: "Slept in the Prophet's bed knowing forty swords waited outside. His only question: 'Will you be safe?'",
    learn: "Courage starts with putting the Prophet's life before your own." },
  { name: "Badr", ar: "بدر", year: "2 AH · 624", foe: "Quraysh, about 1,000 men", story: "badr",
    brave: "Won the first duel of Islam, killing al-Walid ibn Utba, then helped kill Utba. Dozens of Quraysh fell to his sword.",
    learn: "Numbers don't decide victory. Allah's help comes to those who step forward first." },
  { name: "Uhud", ar: "أحد", year: "3 AH · 625", foe: "Quraysh, 3,000 men", story: "uhud",
    brave: "Killed the standard-bearers of Quraysh, then stayed beside the wounded Prophet when most of the army ran.",
    learn: "Disobedience can turn victory into defeat. Real loyalty shows when others flee." },
  { name: "Khandaq (the Trench)", ar: "الخندق", year: "5 AH · 627", foe: "The Confederates, 10,000 men; champion Amr ibn Abd Wadd", story: "khandaq",
    brave: "The only one to answer Amr's challenge, three times. 'All of faith against all of disbelief.'",
    learn: "Fight for Allah, never for your ego. Ali waited until his anger had passed before striking." },
  { name: "Khaybar", ar: "خيبر", year: "7 AH · 628", foe: "The fortresses of Khaybar; champion Marhab", story: "khaybar",
    brave: "Took the banner after others returned, killed Marhab, and tore off the fortress gate.",
    learn: "Allah and His Messenger love the one who keeps going until the job is done." },
  { name: "Conquest of Mecca", ar: "فتح مكة", year: "8 AH · 630", foe: "The idols of the Ka'ba", story: "mecca-hunayn",
    brave: "Carried the banner into Mecca and climbed on the Prophet's shoulders to break the idols.",
    learn: "Strength in victory means mercy: 'Today is the day of mercy.'" },
  { name: "Hunayn", ar: "حنين", year: "8 AH · 630", foe: "Hawazin, in an ambush", story: "mecca-hunayn",
    brave: "Stood firm with a handful of men when 12,000 ran, and killed Hawazin's standard-bearer.",
    learn: "Never rely on numbers or pride. Rely on Allah." },
  { name: "Tabuk: the battle he was told to stay behind", ar: "تبوك", year: "9 AH · 630", foe: "The Byzantine frontier", story: "brotherhood",
    brave: "Obeyed the order to guard Medina, even when hypocrites mocked him for it.",
    learn: "Obedience is also bravery. 'You are to me as Harun was to Musa.'" },
  { name: "The Camel (Jamal)", ar: "الجمل", year: "36 AH · 656", foe: "Talha, al-Zubayr and their army", story: "jamal",
    brave: "Rode out alone between the armies to remind al-Zubayr of the Prophet's words, and ended the war with mercy.",
    learn: "Even against rebels: no chasing the fleeing, no looting, no harm to the wounded or women." },
  { name: "Siffin", ar: "صفين", year: "37 AH · 657", foe: "Muawiya and the army of Syria", story: "siffin",
    brave: "Fought through the Night of Harir, at nearly sixty, and gave water even to the enemy who had denied it to him.",
    learn: "Never fight the way your enemy fights. Ammar's death showed the world which side was right." },
  { name: "Nahrawan", ar: "النهروان", year: "38 AH · 658", foe: "The Khawarij", story: "nahrawan",
    brave: "Debated them first and won many back, and fought only after they shed innocent blood.",
    learn: "Extremism that calls Muslims disbelievers must be answered with knowledge first, and force only when it kills." }
];

/* ---------------------------------------------------------
   WHAT WE LEARN FROM EACH OF THE FOURTEEN
   --------------------------------------------------------- */
const LESSONS = {
  "Prophet Muhammad": { teach: "He said he was sent to perfect noble character.", items: [
    ["Character before preaching", "Mecca called him al-Amin, the Trustworthy, before he received revelation. Even his enemies left their valuables with him."],
    ["Mercy to enemies", "After twenty years of war, he told the people of Mecca: 'Go, you are free.'"],
    ["Care about what comes after you", "At Ghadir and on his deathbed, his final concern was who would guide the Ummah after him."]] },
  "Fatima al-Zahra": { teach: "Tasbih al-Zahra: 34 × Allahu Akbar, 33 × Alhamdulillah, 33 × Subhanallah. The Prophet gave it to her instead of a servant.", items: [
    ["Speak the truth in public", "She stood in the mosque and defended her right with the Qur'an, when men stayed silent."],
    ["Worship and hard work together", "She ground grain until her hands blistered, and still stood in prayer until her feet swelled."],
    ["Your stance outlives you", "Her hidden grave is still a question to every Muslim: why?"]] },
  "Ali ibn Abi Talib": { teach: "Do not be the slave of another, when Allah has made you free. (Nahj al-Balagha, letter 31)", items: [
    ["Courage with self-control", "He would not strike Amr ibn Abd Wadd in anger, only for Allah."],
    ["Justice without favourites", "The hot iron for his own brother Aqil; equal shares for Arab and non-Arab."],
    ["Patience for the sake of Islam", "Twenty-five years of patience to protect a young Ummah from splitting."]] },
  "al-Hasan ibn Ali": { teach: "Making peace when war would destroy the faithful can be the braver choice.", items: [
    ["Wisdom over anger", "His treaty saved the last loyal Shia and exposed Muawiya to the world."],
    ["Generosity", "Twice in his life he gave away everything he owned for Allah."],
    ["Answer insults with kindness", "When a Syrian man cursed him in Medina, the Imam smiled, offered him a home and food, until the man said, 'Allah knows best where to place His message.'"]] },
  "al-Husayn ibn Ali": { teach: "'Hayhat minna al-dhilla': humiliation is far from us. (Day of Ashura)", items: [
    ["Never give your hand to injustice", "'Someone like me does not pledge allegiance to someone like him.'"],
    ["Stand even if you are few", "Seventy-two against thousands. The truth does not depend on numbers."],
    ["Pray even in the fire", "At noon on Ashura, under arrows, he led the prayer."]] },
  "Ali Zayn al-Abidin": { teach: "Everything has a right over you: Allah, your body, your tongue, your parents, your neighbour, even your enemy. (Risalat al-Huquq)", items: [
    ["Turn grief into worship", "After Karbala he taught the whole of Islam through du'a: al-Sahifa al-Sajjadiyya."],
    ["Give in secret", "He carried bread at night to a hundred families, who only knew when he died."],
    ["Truth in front of tyrants", "Even in chains in Yazid's court: 'Is Muhammad your grandfather or mine?'"]] },
  "Muhammad al-Baqir": { teach: "Is it enough to say 'I love the Ahl al-Bayt'? Our Shia is only the one who fears Allah and obeys Him. (al-Kafi)", items: [
    ["A Shia is known by deeds", "Love for the Ahl al-Bayt without obedience to Allah is only a claim."],
    ["Spread knowledge", "He opened the doors of the school of the Ahl al-Bayt to everyone who came."],
    ["Serve the Ummah, even your opponents", "He helped Abd al-Malik mint Islamic coins to protect the dignity of Islam."]] },
  "Ja'far al-Sadiq": { teach: "Be an adornment for us, and do not be a disgrace to us.", items: [
    ["Knowledge over thrones", "He burned the letter offering him power, and built a school that outlived the dynasty."],
    ["Truthfulness is the real test", "Do not judge a man by long prayers, but by his honesty and returning trusts."],
    ["Your manners are dawah", "People should see the Ahl al-Bayt in how their Shia live."]] },
  "Musa al-Kazim": { teach: "Al-Kazim: 'those who swallow their anger' (Qur'an 3:134).", items: [
    ["Control your anger", "He answered harm with patience so often that it became his name."],
    ["A prison can be a prayer room", "He thanked Allah for the free time to worship in Harun's dungeon."],
    ["Small words change lives", "One sentence from him at a party house turned Bishr al-Hafi into one of the great worshippers of Baghdad."]] },
  "Ali al-Rida": { teach: "'La ilaha illallah' is Allah's fortress, with its conditions, and the Imam is one of its conditions. (Silsilat al-Dhahab)", items: [
    ["Don't let power use you", "He accepted al-Ma'mun's title only under threat, and on condition of making no decisions."],
    ["Debate with knowledge and respect", "He answered Christians, Jews and Zoroastrians from their own scriptures."],
    ["Humility in high places", "As crown prince, he still ate at the same table as his servants."]] },
  "Muhammad al-Jawad": { teach: "Knowledge from Allah does not depend on age.", items: [
    ["Answer with knowledge, not anger", "At about eight, he answered the chief judge with a question that held thirty answers inside it."],
    ["Generosity", "He is called al-Jawad, the Generous, and Bab al-Murad, the Door of Wishes."],
    ["Trust in Allah's choice", "Allah gave Yahya wisdom as a child and 'Isa speech in the cradle. The Imam's age was no obstacle."]] },
  "Ali al-Hadi": { teach: "He taught al-Ziyara al-Jami'a al-Kabira: a complete lesson on who the Imams are.", items: [
    ["Stay steady under watch", "Twenty years of surveillance in a military town, and he never stopped guiding."],
    ["Remind the powerful of death", "Brought drunk before al-Mutawakkil, he recited about palaces turned into graves until the caliph wept."],
    ["Faith survives persecution", "They ploughed over Husayn's grave, but pilgrims kept coming."]] },
  "Hasan al-Askari": { teach: "Worship is not only much fasting and prayer. It is much reflection on the affair of Allah.", items: [
    ["Prepare for the future", "His network of trusted agents readied the Shia for the Occultation."],
    ["Your worship can change your enemy", "The cruel guards set over him became worshippers themselves."],
    ["Protect what matters most", "He hid his son from a whole empire."]] },
  "Muhammad al-Mahdi": { teach: "In new events, refer to the narrators of our hadith: they are my proof over you. (Tawqi')", items: [
    ["Waiting is action", "Intizar means becoming someone worthy to stand with him."],
    ["Follow the maraji'", "Taqlid of a qualified jurist is the Imam's own instruction for his absence."],
    ["Never lose hope", "He will fill the earth with justice, as it is filled with injustice."]] }
};

/* Chapter introductions */
const ERA_INTRO = {
  prophet: "From the Ka'ba where Ali was born to the Prophet's last days: how the Prophet raised Ali, made him his brother, sent him first into every battle, and named him at Ghadir. Read this chapter first. Everything after it depends on it.",
  after: "The Prophet's body was not yet buried when power was taken at Saqifa. Fadak, the door of Fatima's house, her hidden grave, and Ali's twenty-five years of patience.",
  ali: "Five years in which Ali ruled as the Prophet would have: equal shares for all, no favours for family, and three wars forced on him by those who could not bear his justice.",
  umayyad: "Muawiya and his son Yazid: a broken treaty, Ali cursed from the pulpits, Imam Hasan poisoned, and Karbala. Then Zaynab's voice, the penitents, and the Imams who rebuilt the faith with prayer and knowledge.",
  abbasid: "The Abbasids rose in the name of the Prophet's family, then imprisoned and poisoned its Imams one by one: al-Sadiq, al-Kazim, al-Rida, al-Jawad, al-Hadi and al-Askari.",
  ghayba: "The twelfth Imam, hidden from birth, his four deputies, and the Major Occultation that continues today, and what it asks of us while we wait."
};

/* ---------------------------------------------------------
   The marriage of Ali and Fatima
   --------------------------------------------------------- */
(function addMarriage() {
  const story = {
    id: "marriage", era: "prophet",
    title: "The Marriage of Ali and Fatima",
    arabic: "زواج علي وفاطمة",
    when: "1 Dhul Hijja, 2 AH (624 CE)", where: "Medina",
    summary: "Rich and powerful men asked for her hand and were turned away. The Prophet gave his daughter to a poor young man whose only valuable was his armour.",
    body: `
<h4>The proposals</h4>
<p>Fatima was the daughter of the Prophet ﷺ and the Lady of the Women of the Worlds. Many men asked to marry her, including senior companions and wealthy men who offered large dowries. Al-Nasa'i records that when Abu Bakr and then Umar asked, the Prophet turned them away. Shia narrations add his words: <strong>"I am waiting for the command of Allah about her."</strong></p>
<p>Ali loved her, but he was poor. He owned almost nothing and was too shy to ask. His friends kept encouraging him: if the Prophet has refused the others, perhaps he is waiting for you.</p>
<h4>Ali asks</h4>
<p>One day Ali went to the Prophet's house, sat down, and could not say a word. The Prophet smiled and said: "It seems you have come for something?" Ali said yes, and finally asked for Fatima.</p>
<p>The Prophet asked: "Do you have anything to give as mahr?" Ali listed everything he owned: <strong>his sword, his camel, and his armour.</strong> The Prophet said: your sword you need to defend Islam, your camel you need to earn your living and draw water. <strong>Sell the armour.</strong></p>
<p>Then the Prophet went in to Fatima and told her that Ali had asked for her. She said nothing and lowered her head. The Prophet said: <strong>"Allahu Akbar! Her silence is her consent."</strong></p>
<p>Shia narrations tell us more about this match. The Prophet said that Allah had married Fatima to Ali in the heavens before the marriage on earth, and that <strong>if Allah had not created Ali, there would have been no equal for Fatima</strong> among all people, from Adam onwards.</p>
<h4>A dowry of one coat of armour</h4>
<p>The armour was sold for about <strong>480 to 500 dirhams</strong>. This became the <strong>Mahr al-Sunna</strong>, the dowry of the Prophet's daughter. It is still the most blessed mahr in Shia Islam. Some narrations say Uthman bought the armour and then gave it back to Ali as a gift.</p>
<p>The Prophet spent the money himself. He sent part for perfume, and the rest to buy the household of the leader of the women of Paradise: a mat, a leather pillow stuffed with palm fibre, a water skin, some clay pots and cups, a hand mill for grinding grain, and a simple bed. When he saw it, he prayed: <em>"O Allah, bless a people whose dishes are mostly made of clay."</em></p>
<h4>The wedding</h4>
<p>Ali gave a wedding feast (walima) of bread, dates and meat, and the Prophet invited the people of Medina. That night, the Prophet brought Fatima to Ali's house, called for water, made wudu, sprinkled them with it and prayed: <strong>"O Allah, these are my family. Bless them, and bless their children."</strong></p>
<p>A famous narration says that on her wedding night a poor woman came to the door asking for an old garment. Fatima had an old dress and her new wedding dress. She remembered the verse <em>"You will never attain righteousness until you spend from what you love"</em> (3:92), and gave away the new one.</p>
<p>The next morning the Prophet asked Ali, "How did you find your wife?" Ali answered: <strong>"The best helper in obeying Allah."</strong> He asked Fatima about Ali, and she said: <strong>"The best of husbands."</strong></p>
<h4>Their home</h4>
<p>Their life was hard and full of love. Ali drew water and worked in others' palm groves; Fatima ground grain until her hands blistered. When they asked the Prophet for a servant, he taught them something better: 34 Allahu Akbar, 33 Alhamdulillah and 33 Subhanallah before sleep. This is the <strong>Tasbih of Fatima</strong>, recorded in Sahih al-Bukhari.</p>
<p>Once, Ali, Fatima, Hasan, Husayn and their helper Fidda fasted three days for a vow. Each evening, as they were about to break their fast, someone knocked: on the first night a poor man, on the second an orphan, on the third a captive. Each time they gave away all their bread and broke their fast with water. Allah revealed Surat al-Insan about them: <em>"They give food, out of love for Him, to the poor, the orphan and the captive. 'We feed you only for the sake of Allah. We want from you no reward and no thanks'"</em> (76:8–9).</p>
<p>From this house of clay pots came Hasan, Husayn, Zaynab and Umm Kulthum, and through Husayn, nine more Imams.</p>`,
    lesson: "The best marriage in history had the simplest dowry. Marriage in Islam is about faith and character, not wealth, so do not make it hard with heavy dowries and expensive weddings.",
    sources: "al-Nasa'i, Sunan and Khasa'is (the refused proposals); Sahih al-Bukhari (Tasbih of Fatima); al-Zamakhshari, al-Kashshaf and al-Wahidi, Asbab al-Nuzul (Surat al-Insan); Shaykh al-Tusi, al-Amali; al-Kulayni, al-Kafi; Bihar al-Anwar",
    proof: "Al-Nasa'i records that Abu Bakr and Umar asked for Fatima and were refused, and that she was then given to Ali. Sunni commentators such as al-Zamakhshari and al-Wahidi report that Surat al-Insan was revealed about Ali, Fatima, Hasan and Husayn."
  };
  const k = STORIES.findIndex(s => s.id === "badr");
  STORIES.splice(k + 1, 0, story);
  STORY_IMAGES.marriage = "Prophet's_Mosque";
  const t = TIMELINE.findIndex(x => x.s === "badr");
  TIMELINE.splice(t + 1, 0, { y: "624 · 2 AH", era: "prophet", t: "Ali marries Fatima; a dowry of one coat of armour", s: "marriage" });
  const d = DATES.findIndex(x => x.name === "Eid al-Ghadir");
  DATES.splice(d, 0, { month: "Dhul Hijja", day: "1", name: "Marriage of Imam Ali and Lady Fatima", story: "marriage" });
  LESSONS["Fatima al-Zahra"].items.push(["A simple marriage", "The daughter of the Prophet married with a dowry of one coat of armour and a home of clay pots."]);
})();

/* ---------------------------------------------------------
   MORE STORIES (v6)
   --------------------------------------------------------- */
const MORE_STORIES = [
{ after: "dhul-ashira", s: {
  id: "abu-talib", era: "prophet",
  title: "Abu Talib: The Shield of the Prophet",
  arabic: "أبو طالب وشعب أبي طالب",
  when: "c. 613–619 CE (3rd–10th year of the mission)", where: "Mecca, the valley of Abu Talib",
  summary: "Ali's father protected the Prophet against all of Quraysh, endured three years of siege and starvation for him, and died in the Year of Sorrow.",
  body: `
<p>When the Prophet's ﷺ grandfather Abd al-Muttalib died, the eight-year-old Muhammad was raised by his uncle <strong>Abu Talib</strong>, chief of Banu Hashim and father of Ali. Abu Talib loved him more than his own sons.</p>
<h4>"The sun in my right hand"</h4>
<p>As Islam grew, the leaders of Quraysh came to Abu Talib again and again: stop your nephew, or hand him over. When Abu Talib told the Prophet, he answered with words recorded by Ibn Hisham: <strong>"By Allah, if they put the sun in my right hand and the moon in my left to make me leave this matter, I would not leave it until Allah makes it victorious or I die for it."</strong> Abu Talib replied: "Go, my nephew, and say what you wish. By Allah, I will never hand you over to anyone."</p>
<h4>Three years in the valley</h4>
<p>In about the seventh year of the mission, Quraysh signed a document and hung it inside the Ka'ba: no one would marry, trade or even sell food to Banu Hashim until they gave up Muhammad. Abu Talib led the whole clan into a narrow valley outside Mecca, known as <strong>Shi'b Abi Talib</strong>.</p>
<p>For about three years they lived there under siege. People ate leaves; the crying of hungry children could be heard from outside. <strong>Khadija</strong>, once the richest woman of Mecca, spent all her wealth on food smuggled in at night. And every night Abu Talib moved the Prophet from his bed and put one of his own sons, often Ali, in his place, so that if anyone came to kill the Prophet in the dark, they would kill his own son instead.</p>
<p>The Prophet then told Abu Talib that Allah had sent termites to eat the document, leaving only the name of Allah. Abu Talib went to Quraysh and challenged them to look. They opened it and found exactly that, and the siege ended.</p>
<h4>The Year of Sorrow</h4>
<p>Soon after, in the tenth year, <strong>Abu Talib died</strong>, and within days <strong>Khadija</strong> died too. The Prophet called it <em>'Am al-Huzn</em>, the Year of Sorrow. With Abu Talib gone, Quraysh dared to throw dirt on the Prophet's head in the street, and he soon had to leave Mecca.</p>
<h4>Was Abu Talib a believer?</h4>
<p>The Ahl al-Bayt, who knew him best, are clear: Abu Talib died a believer. He hid his faith so he could keep his position among Quraysh and protect the Prophet, like the believer of Pharaoh's family who hid his faith (Qur'an 40:28). His poems, recorded by Ibn Hisham, call Muhammad truthful and compare him to Musa. Imam al-Sadiq said that Abu Talib was like the People of the Cave, who hid their faith and showed shirk, and Allah gave them their reward twice. The claim that he died a disbeliever spread from those who hated his son Ali.</p>`,
  lesson: "Before Ali defended the Prophet with his sword, his father defended him with his life, his clan and his name. The house of Abu Talib gave everything for Islam from the very first day.",
  sources: "Ibn Hisham, al-Sira al-Nabawiyya; Ibn Sa'd, al-Tabaqat; al-Kulayni, al-Kafi (Imam al-Sadiq on Abu Talib); Shaykh al-Mufid, Iman Abi Talib",
  proof: "Ibn Hisham, the classic Sunni biographer, records Abu Talib's protection, the boycott, the termites eating the document, and Abu Talib's poems affirming the Prophet's truthfulness."
}},
{ after: "mubahala", s: {
  id: "husayn-prophet", era: "prophet",
  title: "\"Husayn is From Me\": The Soil of Karbala",
  arabic: "حسين مني وأنا من حسين",
  when: "4–10 AH", where: "Medina",
  summary: "The Prophet loved his grandsons beyond words. He also knew what would happen to Husayn, and he was the first to weep for him.",
  body: `
<p>Imam Hasan was born in Ramadan 3 AH and Imam Husayn in Sha'ban 4 AH. The Prophet ﷺ himself named them, recited the adhan in their ears, and was never far from them.</p>
<h4>The masters of the youth of Paradise</h4>
<p>Sunan al-Tirmidhi records the Prophet's words: <strong>"Hasan and Husayn are the masters of the youth of Paradise."</strong> And: <strong>"Husayn is from me and I am from Husayn. Allah loves whoever loves Husayn."</strong></p>
<p>Once, while the Prophet was giving a sermon, the two little boys came walking into the mosque in red shirts, stumbling. He came down from the pulpit, picked them up, and put them in front of him, saying that he could not wait. Another time he prolonged his prostration so long that the people thought something had happened. Afterwards he explained: my son was riding on my back, and I did not want to hurry him. (al-Nasa'i)</p>
<h4>The red soil</h4>
<p>Musnad Ahmad records that one day the Prophet's eyes were filled with tears. When asked why, he said: <strong>Jibra'il has just told me that Husayn will be killed by the banks of the Euphrates</strong>, and he brought me some of the soil of that land. The Prophet gave the soil to his wife <strong>Umm Salama</strong> and told her: when this soil turns to blood, know that my son has been killed. She kept it in a bottle for fifty years.</p>
<p>On the afternoon of 10 Muharram 61 AH, in Medina, Umm Salama looked at the bottle and saw that the soil had turned to fresh blood. She screamed, and the women of Medina came running.</p>
<p>The same day, far from Karbala, Ibn Abbas saw the Prophet in a dream at midday, dusty and dishevelled, holding a bottle of blood. "What is this?" he asked. The Prophet said: <strong>"The blood of Husayn and his companions. I have been collecting it since this morning."</strong> Ibn Abbas noted the day. It was the day of Ashura. (Musnad Ahmad)</p>
<p>Shia narrations add that Imam Ali, passing Karbala on the way to Siffin, stopped, wept and said: "Here they will kneel their camels, here their blood will be shed. Youths of the family of Muhammad will be killed in this open land, and heaven and earth will weep for them."</p>`,
  lesson: "The first person to weep for Husayn was the Prophet himself, fifty years before Karbala. When we weep for Husayn, we follow his Sunnah.",
  sources: "Sunan al-Tirmidhi; Sunan al-Nasa'i; Musnad Ahmad (the soil and Ibn Abbas's dream); al-Hakim, al-Mustadrak; Ibn Qulawayh, Kamil al-Ziyarat",
  proof: "Musnad Ahmad, one of the main Sunni hadith books, records both Jibra'il bringing the soil of Karbala and Ibn Abbas's dream of the Prophet collecting Husayn's blood. Al-Tirmidhi records 'Husayn is from me and I am from Husayn.'"
}},
{ before: "pen-paper", s: {
  id: "usama", era: "prophet",
  title: "The Army of Usama and the Prophet's Last Days",
  arabic: "جيش أسامة ووفاة النبي",
  when: "Safar 11 AH (May–June 632 CE)", where: "Medina and al-Jurf",
  summary: "In his final illness, the Prophet ordered the senior companions out of Medina under an eighteen-year-old commander, and repeated it again and again. Ali was not sent.",
  body: `
<p>In Safar 11 AH, the Prophet ﷺ prepared an army to march to the Byzantine frontier. He gave command to <strong>Usama ibn Zayd</strong>, about eighteen years old, son of his freed slave and beloved companion Zayd, who had been martyred at Mu'ta. Ibn Sa'd records that the senior emigrants, including <strong>Abu Bakr and Umar</strong>, were placed under Usama's command.</p>
<p>Some objected to such a young commander. The Prophet, already ill with fever, came out with his head bandaged, climbed the pulpit and said: you criticise his command as you criticised his father's before him. By Allah, he is worthy of it. (Sahih al-Bukhari)</p>
<p>His illness grew worse, and he kept repeating: <strong>"Send out the army of Usama! Send out the army of Usama!"</strong> Shia narrations, also recorded by al-Shahrastani, add that he cursed anyone who stayed behind from it. But the army camped at al-Jurf, just outside Medina, and delayed, and leading men kept coming back into the city.</p>
<p>Shia scholars ask a simple question: why would the Prophet, knowing he was dying, insist on sending the senior companions far away, but keep Ali beside him? The answer is that he wanted the city clear when the succession he had announced at Ghadir took place.</p>
<h4>His last moments</h4>
<p>Then came the Thursday of the pen and paper. In his final days the Prophet's last advice was about the prayer and about the weak. Imam Ali said: <strong>"The Messenger of Allah passed away while his head was on my chest, and his soul flowed out into my hand, and I passed it over my face."</strong> (Nahj al-Balagha, sermon 197)</p>
<p>Ali washed him, with al-Abbas and his sons helping, and said that the angels were helping him turn the body. The Muslims came in groups to pray over him. He was buried in his own room. And while all this was happening, a few men were meeting at Saqifa.</p>`,
  lesson: "The Prophet's last weeks were spent preparing for what came after him: Usama's army, the pen and paper, and his repeated warnings. Very little of it was obeyed.",
  sources: "Ibn Sa'd, al-Tabaqat al-Kubra (Abu Bakr and Umar in Usama's army); Sahih al-Bukhari (the objection to Usama); al-Shahrastani, al-Milal wa al-Nihal; Nahj al-Balagha, sermon 197; Kitab al-Irshad",
  proof: "Sahih al-Bukhari records the Prophet defending Usama's command from the pulpit, and Ibn Sa'd records that Abu Bakr and Umar were ordered to march under him. Neither went."
}},
{ before: "fatima-burial", s: {
  id: "fatima-visit", era: "after",
  title: "Her Last Days: \"I Call Allah to Witness that You Angered Me\"",
  arabic: "أيام الزهراء الأخيرة",
  when: "Jumada 11 AH (632 CE)", where: "The house of Ali and Fatima, Medina",
  summary: "Ill and in pain, Fatima refused the visits of those who had wronged her. When she finally let them in, she made them bear witness to the Prophet's words, and to her anger.",
  body: `
<h4>Knocking on doors at night</h4>
<p>After Saqifa, Ibn Qutayba and Shia sources report that Ali put Fatima on a mount and went at night, with Hasan and Husayn, to the houses of the Ansar, asking them to stand by the pledge of Ghadir. They replied: "Daughter of the Messenger of Allah, our pledge has been given to this man. If your husband had come to us first, we would not have turned from him." Ali answered: should I have left the Prophet's body unwashed in his house and gone out to argue about power?</p>
<h4>Her words to the women of Medina</h4>
<p>As she lay ill, the women of the emigrants and the Ansar came to visit her. She gave them a short, sharp sermon, recorded by Ibn Tayfur: she said she had come to dislike their world, and asked what their men had held against Ali. Was it his sword that spared no one in Allah's cause, his fearlessness in death, his strength against the enemies of Allah? She warned them that what they had started would bring bitter fruit. Their husbands came to apologise. She would not accept it.</p>
<h4>The visit</h4>
<p>Abu Bakr and Umar asked many times to visit her, and she refused. In the end they asked Ali, and she told him: the house is your house; do as you wish. They came in and greeted her. She turned her face to the wall and did not answer.</p>
<p>Then she asked them: <strong>"Did you not hear the Messenger of Allah say: 'Fatima's pleasure is my pleasure, and Fatima's anger is my anger. Whoever loves my daughter Fatima loves me, whoever pleases Fatima pleases me, and whoever angers Fatima angers me'?"</strong> They said: yes, we heard it from the Messenger of Allah.</p>
<p>She said: <strong>"Then I call Allah and His angels to witness that you two have angered me and have not pleased me. When I meet the Prophet, I will complain to him about you."</strong> The Sunni historian Ibn Qutayba records this.</p>
<h4>Her will</h4>
<p>Before she died she asked Ali: to marry her niece Umama after her, to care for her children; to make her a coffin with sides, so the shape of her body would not be seen, as she had seen done in Abyssinia (Asma bint Umays made it); to wash her himself, bury her at night, and let none of those who wronged her attend.</p>`,
  lesson: "Fatima's anger was not personal. The Prophet tied her anger to his own, and his to Allah's. She made sure that history would remember who angered her.",
  sources: "Ibn Qutayba al-Dinawari, al-Imama wa al-Siyasa (the visit); Ibn Tayfur, Balaghat al-Nisa (sermon to the women); Sahih al-Bukhari ('whoever angers her angers me'); Shaykh al-Tusi, al-Amali",
  proof: "Ibn Qutayba, a Sunni scholar of the 3rd century AH, records Fatima making the two of them confirm the Prophet's hadith, and then declaring that they had angered her."
}},
{ after: "ashura", s: {
  id: "night-11", era: "umayyad",
  title: "The Night of the Strangers",
  arabic: "شام غريبان · ليلة الحادي عشر",
  when: "Evening of 10 Muharram to 13 Muharram, 61 AH", where: "Karbala",
  summary: "The tents burned, the bodies were trampled, and the women and children of the Prophet spent the night alone in the desert with no men left but a sick Imam.",
  body: `
<p>When Husayn fell, his horse <strong>Dhul-Janah</strong> came back to the tents alone, its saddle empty and its mane red with blood. The women came out and knew.</p>
<h4>The looting and the fire</h4>
<p>The army rushed the camp. They stripped the women of their head coverings and jewellery, pulled earrings from the ears of little girls, and set the tents on fire. Children ran into the open desert in terror. <strong>Zaynab</strong> ran from tent to tent, gathering them.</p>
<p>Shimr came to kill <strong>Imam Ali Zayn al-Abidin</strong>, who lay too ill to stand. Zaynab threw herself over him and said they would have to kill her first. Umar ibn Sa'd told them to leave him.</p>
<h4>The horses</h4>
<p>Umar ibn Sa'd then called out for volunteers to trample Husayn's body with their horses. Ten horsemen rode over the body of the grandson of the Messenger of Allah until his chest and back were crushed. Al-Tabari records it.</p>
<p>The heads of the martyrs, seventy-two of them, were cut off and divided among the tribes, so each could carry its share to Ibn Ziyad and claim a reward. The bodies were left unburied on the sand.</p>
<h4>Sham-e-Ghariban</h4>
<p>That night, called the <strong>Night of the Strangers</strong> (<em>Sham-e-Ghariban</em>), there was no man left to guard the family of the Prophet except a sick young Imam. Zaynab and her sister Umm Kulthum kept watch over the burnt camp, counting the children, searching the dark for the missing. Imam Zayn al-Abidin later said that his aunt Zaynab never missed her night prayer, even that night, but that night she prayed it sitting, because she could no longer stand.</p>
<h4>The 11th: passing the bodies</h4>
<p>In the morning the women and children were put on camels without saddles. Umar ibn Sa'd had them led past the battlefield on purpose. When Zaynab saw her brother's body, she cried out: <strong>"O Muhammad! The angels of heaven send blessings on you, and this is Husayn in the open desert, soaked in blood, his limbs cut apart. Your daughters are captives, your children are slain, and the wind blows dust over them."</strong> Al-Tabari records that every friend and enemy who heard her wept.</p>
<h4>The burial</h4>
<p>The bodies lay three days in the sun. Then men of the nearby tribe of <strong>Banu Asad</strong> came to bury them. Shia narrations say that Imam Zayn al-Abidin came, by the power of the Imamate, to show them who was who, and buried his father with his own hands, saying that no one else could carry him. Al-Abbas was buried where he fell by the river. Hurr was buried by his tribe a little way off. The others were buried together at Husayn's feet.</p>`,
  lesson: "On the night after Ashura, the family of the Prophet had nothing left but Zaynab's courage and prayer. Majalis on Sham-e-Ghariban are held in darkness, to remember that night.",
  sources: "al-Tabari, Tarikh (the trampling and Zaynab's cry); Ibn Tawus, al-Luhuf; Kitab al-Irshad; al-Khwarizmi, Maqtal al-Husayn",
  proof: "Al-Tabari records Umar ibn Sa'd ordering the horses over Husayn's body, and Zaynab's cry over her brother that made even the enemy weep."
}},
{ after: "zaynab", s: {
  id: "captives-damascus", era: "umayyad",
  title: "The Road to Damascus, and Little Ruqayya",
  arabic: "سبايا آل محمد في الشام",
  when: "Muharram – Safar 61 AH", where: "Kufa → Syria → Damascus",
  summary: "Hundreds of miles in chains, a city decorated to celebrate, a ruin with no roof, and a little girl who asked for her father.",
  body: `
<p>From Kufa, Ibn Ziyad sent the captives on to Yazid in Damascus, with the heads of the martyrs carried ahead of them on spears. Imam Zayn al-Abidin's neck was chained, his hands tied to it. The journey took weeks across the desert.</p>
<h4>An old man at the gate</h4>
<p>Damascus was decorated as if for a festival. An old Syrian came up to the captives and said: "Praise be to Allah who killed you and destroyed you." Imam Zayn al-Abidin asked him: have you read the Qur'an? Have you read <em>"Say: I ask of you no reward except love for my near relatives"</em> (42:23)? And <em>"Allah only wishes to remove all impurity from you, O People of the House"</em> (33:33)? The old man said yes. The Imam said: <strong>we are the ones these verses are about.</strong> The old man burst into tears, threw down his turban and asked Allah to forgive him for what he had said. Many in Syria had never been told who the Ahl al-Bayt were.</p>
<h4>In Yazid's court</h4>
<p>Besides Zaynab's sermon, al-Tabari records another moment. A red-faced Syrian stood up and asked Yazid to give him one of the girls, a daughter of Husayn, as his slave. She clung to her aunt in terror. Zaynab told him: <strong>"You lie, and you are base. That is not for you or for him."</strong> Yazid said he could do it if he wished. Zaynab said: <strong>"Never. Allah has not given you that, unless you leave our religion."</strong></p>
<h4>The ruin</h4>
<p>The family of the Prophet was kept in a ruined building near the palace, with no roof: burning sun by day and cold at night. Shia narrations say their faces were peeling from the sun.</p>
<h4>Ruqayya</h4>
<p>Shia tradition tells of a small daughter of Husayn, <strong>Ruqayya</strong> (also called Sakina in South Asia), about three or four years old. Every night she cried for her father. One night she woke from a dream and screamed for him until the women could not calm her. Yazid, disturbed by the noise, ordered: take her father to her. A covered tray was brought. She lifted the cloth and saw her father's head. She held it, kissed it, and spoke to it: who stained you with your blood? Who cut your veins? Who made me an orphan so young? She lay her face on his, and when they lifted her, she had died. She was buried there in Damascus, where her shrine stands today.</p>
<h4>Turning of the tide</h4>
<p>As word spread through Damascus of who the captives were, people began to turn. Yazid grew afraid, blamed Ibn Ziyad for everything, and finally released the family. The women of the Umayyad house itself held mourning. Imam Zayn al-Abidin asked for the heads to be returned, and for permission to go home.</p>`,
  lesson: "Yazid wanted Damascus to celebrate. Instead, the captives taught Syria who the Ahl al-Bayt were. The truth was carried in chains, and still it spread.",
  sources: "al-Tabari, Tarikh (the Syrian and Zaynab's reply); Ibn Tawus, al-Luhuf (the old man of Damascus); al-Khwarizmi, Maqtal al-Husayn; later Shia maqatil for Ruqayya",
  proof: "Al-Tabari records the Syrian who asked for a granddaughter of the Prophet as a slave, and Zaynab's fearless answer to Yazid's face."
}},
{ after: "captives-damascus", s: {
  id: "arbain", era: "umayyad",
  title: "Arba'in: The First Pilgrims, and the Return to Medina",
  arabic: "الأربعين والعودة إلى المدينة",
  when: "20 Safar 61 AH and after", where: "Karbala and Medina",
  summary: "Forty days after Ashura, an old blind companion walked to Husayn's grave. Today, millions walk the same road.",
  body: `
<h4>Jabir at the grave</h4>
<p>On <strong>20 Safar 61 AH</strong>, the old companion <strong>Jabir ibn Abdullah al-Ansari</strong>, the same man who had carried the Prophet's salaam to Imam al-Baqir, came from Medina to Karbala with his student <strong>Atiyya al-Awfi</strong>. Jabir was old and nearly blind. He bathed in the Euphrates, put on clean clothes, perfumed himself, and walked to the grave barefoot, glorifying Allah with every step.</p>
<p>When Atiyya put his hand on the grave, Jabir fell on it and fainted. When he came round, he called out three times: <strong>"Ya Husayn!"</strong> Then he said: a beloved who does not answer his beloved? How can you answer, when your veins have been cut and your head separated from your body? I bear witness that you are the son of the best of prophets…</p>
<p>He was the first pilgrim of Husayn. That is why Shia Muslims visit Karbala on Arba'in.</p>
<h4>The family returns</h4>
<p>Many Shia narrations say the caravan of the Ahl al-Bayt, released from Damascus, came by way of Karbala and arrived the same day, and that Imam Zayn al-Abidin brought back the head of his father to be reunited with his body. They stayed some days mourning at the graves, then set out for Medina.</p>
<h4>"O people of Yathrib"</h4>
<p>Near Medina, the Imam sent <strong>Bashir ibn Jadhlam</strong>, a poet, ahead to tell the city. Bashir rode into Medina weeping and calling out a lament: people of Medina, there is no staying here for you now, Husayn has been killed; his body lies in Karbala, covered in blood, and his head is carried around on a spear. Not a man or woman stayed home. Medina had not wept like that since the day the Prophet died.</p>
<p>Imam Zayn al-Abidin stood outside the city and spoke. He praised Allah, then told them what had happened: that his father had been killed with his family, his women taken captive, his head raised on a spear in every town. If the Prophet had ordered the people to fight us, he said, they could not have done more than they did.</p>
<p>In Medina, <strong>Umm al-Banin</strong> sat at al-Baqi every day with Abbas's son, reciting elegies for her four sons, so moving that even Marwan wept. <strong>Zaynab</strong> lived only a short time more. Shia sources say she died in 62 AH; her shrine stands near Damascus.</p>
<h4>Arba'in today</h4>
<p>Every year, tens of millions of people walk from Najaf, Basra and beyond to Karbala for Arba'in: one of the largest gatherings on earth. Along the way, ordinary Iraqis open their homes and set up free food stalls (<em>mawakib</em>) for every pilgrim, whoever they are.</p>`,
  lesson: "Yazid wanted Husayn forgotten in the desert. Forty days later his grave had its first pilgrim, and today it has millions.",
  sources: "Bisharat al-Mustafa (Atiyya's narration); Ibn Tawus, al-Luhuf (Bashir's lament and the Imam's speech); Shaykh al-Tusi, Misbah al-Mutahajjid (Ziyarat al-Arba'in); al-Mufid, Masar al-Shi'a"
}},
{ after: "sadiq", s: {
  id: "mourning", era: "abbasid",
  title: "\"Whoever Weeps for Husayn\": How the Imams Kept Karbala Alive",
  arabic: "إحياء ذكرى الحسين",
  when: "61 AH onwards", where: "Medina, Merv, Baghdad and the whole Shia world",
  summary: "The rulers wanted Karbala forgotten. The Imams made sure it never would be, through tears, poetry, gatherings and pilgrimage.",
  body: `
<p>After Karbala, remembering Husayn was dangerous. Every Imam made it part of the faith anyway.</p>
<h4>Gatherings and poetry</h4>
<p><strong>Imam Zayn al-Abidin</strong> wept for his father for over thirty years. <strong>Imam al-Baqir</strong> welcomed the poet al-Kumayt, who recited his poems for the Ahl al-Bayt at a time when such poems could cost a man his life.</p>
<p><strong>Imam al-Sadiq</strong> would ask poets to recite elegies for Husayn, with the women of his house listening behind a curtain, until the house was filled with weeping. He taught that whoever recites poetry about Husayn, weeps and makes others weep, will be rewarded with Paradise. He taught the <em>Ziyarat Warith</em>, the visitation prayer for Husayn that names him the heir of Adam, Nuh, Ibrahim, Musa, 'Isa and Muhammad.</p>
<h4>"If you weep for anything…"</h4>
<p>On the first day of Muharram, <strong>Imam al-Rida</strong> told his companion al-Rayyan ibn Shabib that Muharram was a month in which even the people of jahiliyya forbade fighting, yet in it they killed the son of the Prophet. He said: <strong>"O son of Shabib, if you weep for anything, weep for Husayn ibn Ali, for he was slaughtered as a ram is slaughtered."</strong></p>
<p>At Merv, the poet <strong>Di'bil al-Khuza'i</strong> recited his famous poem about the family of Muhammad: their homes, once full of the Qur'an, now empty, and their graves scattered from Kufa to Karbala to Baghdad. Imam al-Rida wept, and gave Di'bil one of his own robes as a gift. People later offered Di'bil a fortune for that robe, and he would not sell it.</p>
<h4>Banned, and never stopped</h4>
<p>The Umayyads and Abbasids tried to stop it. Al-Mutawakkil ploughed over the grave and punished pilgrims, and still people went. In 352 AH, under the Buyids in Baghdad, the day of Ashura was observed as a public day of mourning for the first time: markets closed and the people came out in the streets.</p>
<p>From those gatherings come the <strong>majalis</strong>, the processions, the elegies (<em>marthiya</em> and <em>nawha</em>), the <em>sabeel</em> of water given out in memory of Husayn's thirst, and the pilgrimage of Arba'in that Shia Muslims keep today.</p>`,
  lesson: "Mourning for Husayn is not only sadness. It is how the Imams kept the message of Karbala alive under rulers who wanted it erased. As the saying goes: every day is Ashura, and every land is Karbala.",
  sources: "Ibn Qulawayh, Kamil al-Ziyarat; Shaykh al-Saduq, Uyun Akhbar al-Rida and al-Amali (al-Rayyan ibn Shabib); Abu al-Faraj, al-Aghani (Di'bil and al-Kumayt); Ibn al-Athir, al-Kamil (352 AH)",
  proof: "Ibn al-Athir and other Sunni historians record the public mourning of Ashura in Baghdad in 352 AH, and the Sunni literary historian Abu al-Faraj records Di'bil's poem and the Imam's robe."
}},
{ before: "kazim", s: {
  id: "fadak-borders", era: "abbasid",
  title: "The Borders of Fadak",
  arabic: "حدود فدك",
  when: "c. 170–179 AH", where: "Baghdad / Medina",
  summary: "The caliph offered to give Fadak back. Imam al-Kazim told him its true borders, and the caliph understood what Fadak really meant.",
  body: `
<p>For two centuries, Fadak was taken back and given back by one ruler after another. Then the Abbasid caliph (the narration names Harun al-Rashid, and in another version his father al-Mahdi) made Imam Musa al-Kazim an offer: <em>let me return Fadak to you.</em></p>
<p>The Imam refused: I will only take it with its borders. The caliph asked: what are its borders? The Imam said: if I tell you, you will not return it. The caliph insisted, by the right of the Imam's grandfather.</p>
<p>So the Imam said: <strong>its first border is Aden. Its second is Samarqand. Its third is Africa. And its fourth is the frontier of Armenia and the coasts of the sea.</strong></p>
<p>The caliph's face changed. "Then nothing is left for us," he said. "Stand up and take my seat!" The Imam replied: <strong>"I told you that if I defined its borders, you would not return it."</strong></p>
<p>The Imam had made the point clear. Fadak was never just a village of palm trees. It was the sign of the whole right of the Ahl al-Bayt: the leadership of the Ummah that was taken from Ali and Fatima. Narrations say that from that day, the caliph made up his mind to be rid of the Imam.</p>`,
  lesson: "Fadak is the symbol of every right taken from the Ahl al-Bayt. When we speak of 'Fatima's haq', we mean all of it: her land, her inheritance, her husband's right, and her children's.",
  sources: "Ibn Shahrashub, Manaqib Al Abi Talib; al-Zamakhshari, Rabi' al-Abrar; Bihar al-Anwar",
  proof: "The Sunni scholar al-Zamakhshari records this conversation between the Imam and the caliph in his Rabi' al-Abrar."
}}
];

(function insertMore() {
  for (const m of MORE_STORIES) {
    const ref = STORIES.findIndex(s => s.id === (m.after || m.before));
    if (ref < 0) { console.warn("missing ref", m); continue; }
    STORIES.splice(m.after ? ref + 1 : ref, 0, m.s);
  }
  Object.assign(STORY_IMAGES, {
    "abu-talib": "Mecca", "husayn-prophet": "Imam_Husayn_Shrine", "usama": "Prophet's_Mosque",
    "fatima-visit": "Al-Baqi_Cemetery", "night-11": "Karbala", "captives-damascus": "Umayyad_Mosque",
    "arbain": "Al-Abbas_Shrine", "mourning": "Imam_Husayn_Shrine", "fadak-borders": "Fadak"
  });
  const add = (afterId, item) => { const i = TIMELINE.findIndex(x => x.s === afterId); TIMELINE.splice(i + 1, 0, item); };
  add("dhul-ashira", { y: "c. 616–619", era: "prophet", t: "Siege of Shi'b Abi Talib; the Year of Sorrow", s: "abu-talib" });
  add("mubahala", { y: "626–632", era: "prophet", t: "'Husayn is from me'; Jibra'il brings the soil of Karbala", s: "husayn-prophet" });
  const p = TIMELINE.findIndex(x => x.s === "pen-paper");
  TIMELINE.splice(p, 0, { y: "632 · 11 AH", era: "prophet", t: "The army of Usama; the Prophet's last days", s: "usama" });
  const fb = TIMELINE.findIndex(x => x.s === "fatima-burial");
  TIMELINE.splice(fb, 0, { y: "632 · 11 AH", era: "after", t: "Fatima's last days: 'you have angered me'", s: "fatima-visit" });
  add("ashura", { y: "680 · 61 AH", era: "umayyad", t: "The Night of the Strangers; tents burned", s: "night-11" });
  const z = TIMELINE.findIndex(x => x.s === "zaynab");
  TIMELINE.splice(z + 1, 0,
    { y: "680 · 61 AH", era: "umayyad", t: "Captives in Damascus; Ruqayya", s: "captives-damascus" },
    { y: "680 · 61 AH", era: "umayyad", t: "Arba'in: Jabir, the first pilgrim", s: "arbain" });
  add("sadiq", { y: "61 AH →", era: "abbasid", t: "The Imams keep Karbala alive", s: "mourning" });
  const kz = TIMELINE.findIndex(x => x.s === "kazim");
  TIMELINE.splice(kz, 0, { y: "c. 175 AH", era: "abbasid", t: "Imam al-Kazim names the borders of Fadak", s: "fadak-borders" });
})();

/* ---------------------------------------------------------
   FATIMA'S HAQ
   --------------------------------------------------------- */
const HAQ = [
  { t: "Fadak, her father's gift", ar: "فدك", d: "The Prophet gave Fadak to Fatima in his lifetime, when the verse 'give the relative his right' (17:26) came down, and her workers ran it. Within days of his death they were thrown out. She brought Ali and Umm Ayman as witnesses, and their testimony was refused.", s: "fadak" },
  { t: "Her inheritance", ar: "الإرث", d: "When she then asked for her inheritance, she was told the Prophet had said 'we prophets leave no inheritance'. She answered with the Qur'an: Sulayman inherited from Dawud (27:16), and Zakariyya prayed for an heir (19:6). Was she not her father's daughter?", s: "fadak" },
  { t: "Her family's share of Khums", ar: "سهم ذي القربى", d: "The Qur'an gives a share of khums to 'the near relatives' of the Prophet (8:41). After him it was stopped. Sunan Abu Dawud records that the khums was divided as before, except that the Prophet's relatives were not given what he used to give them.", s: "fadak" },
  { t: "Her husband's right", ar: "الخلافة", d: "The leadership the Prophet gave Ali at Ghadir, in front of the pilgrims, was taken at Saqifa while Ali and Fatima were washing the Prophet's body.", s: "saqifa" },
  { t: "The sanctity of her home", ar: "حرمة البيت", d: "The house the Prophet greeted every morning as the home of the Ahl al-Bayt was threatened with fire with her inside, and its door was forced. She lost her unborn son Muhsin.", s: "door" },
  { t: "Her voice", ar: "الصوت", d: "She was the woman the verse of purification (33:33) speaks of, and the Prophet said whoever angers her angers him. Yet her word was not accepted, and her witnesses were turned away.", s: "fatima-visit" }
];
const HAQ_ANSWER = [
  { t: "She spoke", d: "The sermon of Fadak in the Prophet's mosque, and her words to the women of Medina." },
  { t: "She refused", d: "She did not speak to those who wronged her until she died (Sahih al-Bukhari)." },
  { t: "She bore witness", d: "'I call Allah and His angels to witness that you have angered me.'" },
  { t: "She hid her grave", d: "Buried at night by her will. Her hidden grave still asks every Muslim: why?" }
];
const FADAK_HISTORY = [
  { who: "The Prophet ﷺ", yr: "7 AH", t: "Fadak surrenders without a battle and belongs to the Prophet alone (59:6). He gives it to Fatima." },
  { who: "Abu Bakr", yr: "11 AH", t: "Her workers are removed. Her claim, her witnesses and her inheritance are all refused." },
  { who: "Uthman", yr: "23–35 AH", t: "Gives Fadak to his cousin Marwan ibn al-Hakam." },
  { who: "Imam Ali", yr: "35–40 AH", t: "Writes to his governor: 'Of all that the sky covers, we had Fadak. Some people coveted it, and others let it go. The best judge is Allah.'" },
  { who: "Muawiya", yr: "41–60 AH", t: "Keeps it in Umayyad hands and hands its income to his family." },
  { who: "Umar ibn Abd al-Aziz", yr: "99–101 AH", t: "Admits it was taken unjustly and returns it to the children of Fatima." },
  { who: "Later Umayyads", yr: "after 101 AH", t: "Take it back again." },
  { who: "al-Ma'mun", yr: "210 AH", t: "Officially returns Fadak to the descendants of Fatima, declaring it was hers by the Prophet's gift. Recorded by al-Baladhuri." },
  { who: "al-Mutawakkil", yr: "232–247 AH", t: "Takes it back once more." },
  { who: "Imam al-Kazim", yr: "", t: "Tells the caliph its true borders: Aden, Samarqand, Africa and Armenia. Fadak is the whole right of the Ahl al-Bayt.", s: "fadak-borders" }
];

/* ---------------------------------------------------------
   KARBALA
   --------------------------------------------------------- */
const KARBALA_DAYS = [
  { d: "28 Rajab 60", t: "Husayn leaves Medina with his family, refusing to pledge to Yazid.", s: "husayn-departure" },
  { d: "3 Sha'ban 60", t: "Arrives in Mecca. Thousands of letters from Kufa follow.", s: "husayn-departure" },
  { d: "15 Ramadan 60", t: "Sends his cousin Muslim ibn Aqil ahead to Kufa.", s: "husayn-departure" },
  { d: "8 Dhul Hijja 60", t: "Leaves Mecca rather than let the Ka'ba be dishonoured with his blood.", s: "husayn-departure" },
  { d: "9 Dhul Hijja 60", t: "Muslim ibn Aqil is abandoned and martyred in Kufa; Hani ibn Urwa too.", s: "husayn-departure" },
  { d: "Late Dhul Hijja", t: "News of Muslim reaches him on the road. Hurr's 1,000 horsemen block his path; Husayn gives them water.", s: "hurr-karbala" },
  { d: "2 Muharram 61", t: "Arrives at Karbala: 'a land of grief and trial'.", s: "hurr-karbala" },
  { d: "3 Muharram", t: "Umar ibn Sa'd arrives with 4,000. More troops follow each day.", s: "hurr-karbala" },
  { d: "7 Muharram", t: "The Euphrates is blocked. No water reaches the camp.", s: "hurr-karbala" },
  { d: "9 Muharram (Tasu'a)", t: "Shimr brings orders to attack. Abbas refuses the offer of safety. Husayn asks for one night to pray.", s: "hurr-karbala" },
  { d: "Night of the 10th", t: "Husayn releases his companions. Not one leaves. The camp hums with Qur'an.", s: "ashura" },
  { d: "10 Muharram (Ashura)", t: "Hurr repents. The companions fall, then the family, then Husayn.", s: "ashura" },
  { d: "Evening of the 10th", t: "Tents burned, the body trampled. The Night of the Strangers.", s: "night-11" },
  { d: "11 Muharram", t: "The captives are led past the bodies to Kufa. Zaynab's cry.", s: "night-11" },
  { d: "12–13 Muharram", t: "Zaynab's sermon in Kufa. Banu Asad bury the martyrs.", s: "zaynab" },
  { d: "Safar 61", t: "The captives enter Damascus. Zaynab and Zayn al-Abidin speak in Yazid's court. Ruqayya dies in the ruins.", s: "captives-damascus" },
  { d: "20 Safar 61 (Arba'in)", t: "Jabir, the first pilgrim, at Husayn's grave.", s: "arbain" }
];
const MARTYRS = [
  { g: "The family of the Prophet (Banu Hashim)", items: [
    ["al-Abbas ibn Ali", "Standard-bearer. Lost both arms bringing water for the children."],
    ["Abdullah, Ja'far and Uthman ibn Ali", "Abbas's full brothers. He sent them out before him."],
    ["Muhammad and Abu Bakr ibn Ali", "Sons of Imam Ali, brothers of Husayn."],
    ["Ali al-Akbar ibn al-Husayn", "Eighteen; looked and spoke like the Prophet. First of the family to go out."],
    ["Ali al-Asghar (Abdullah) ibn al-Husayn", "Six months old. Killed by Harmala's arrow in his father's arms."],
    ["al-Qasim ibn al-Hasan", "About thirteen. 'Death is sweeter to me than honey.'"],
    ["Abdullah ibn al-Hasan", "About eleven. Ran from the tents to shield his uncle; his arm was cut and he was killed in Husayn's arms."],
    ["Abu Bakr ibn al-Hasan", "Son of Imam Hasan."],
    ["Aun and Muhammad ibn Abdullah ibn Ja'far", "Grandsons of Ja'far al-Tayyar. Aun was Zaynab's son."],
    ["The sons of Aqil", "Ja'far, Abd al-Rahman and others, and Abdullah, son of Muslim ibn Aqil."]
  ]},
  { g: "The companions", items: [
    ["al-Hurr ibn Yazid al-Riyahi", "Blocked Husayn's road, then changed sides on the morning of Ashura. 'You are free, as your mother named you.'"],
    ["Habib ibn Mazahir al-Asadi", "Husayn's childhood friend, past seventy. Commanded the left wing."],
    ["Muslim ibn Awsaja al-Asadi", "Among the first to fall. Dying, he told Habib: my will is this man. Do not leave him."],
    ["Zuhayr ibn al-Qayn", "Had avoided Husayn on the road. After one meeting he sent his wife home with his blessing and commanded the right wing."],
    ["Burayr ibn Khudayr", "The Qur'an teacher of Kufa. He was joking on the morning of Ashura, because Paradise was so close."],
    ["Abu Thumama al-Sa'idi", "In the middle of the battle, he reminded Husayn of the noon prayer. 'You remembered the prayer; may Allah count you among those who pray.'"],
    ["Sa'id ibn Abdullah al-Hanafi", "Stood in front of Husayn during the prayer, taking the arrows on his body, and fell when it ended."],
    ["Abdullah ibn Umayr al-Kalbi & Umm Wahb", "When he fell, his wife went out and sat by his body. She was killed there, the only woman killed at Karbala (al-Tabari)."],
    ["Jaun (John) ibn Huwayy", "A Black freed slave of Abu Dharr. Husayn placed his cheek on Jaun's face as he died."],
    ["Abis ibn Abi Shabib al-Shakiri", "Threw off his armour and helmet: 'Love of Husayn has made me mad.'"],
    ["Nafi' ibn Hilal al-Jamali", "An archer who wrote his name on his arrows. Led the water party with Abbas on the 7th."],
    ["Hanzala ibn As'ad al-Shibami", "Stood before the army reciting the warnings of the believer of Pharaoh's family."],
    ["The Ghifari brothers", "Abdullah and Abd al-Rahman wept, not for themselves, but because they could not protect him."]
  ]},
  { g: "Martyrs on the road", items: [
    ["Muslim ibn Aqil", "Husayn's envoy. Abandoned by Kufa and thrown from the palace on 9 Dhul Hijja."],
    ["Hani ibn Urwa", "Sheltered Muslim in Kufa and was killed for it."],
    ["Qays ibn Mus'hir al-Saydawi", "Carried Husayn's letter to Kufa; thrown from the top of the palace."],
    ["Abdullah ibn Yaqtur", "Another of Husayn's messengers, also thrown from the palace."]
  ]}
];
const KARBALA_WOMEN = [
  ["Zaynab bint Ali", "The heroine of Karbala. Protected the survivors, prayed her night prayer on the Night of the Strangers, and silenced Ibn Ziyad and Yazid with her sermons."],
  ["Umm Kulthum bint Ali", "Zaynab's sister. Shared the captivity and the sermons in Kufa."],
  ["Rubab", "Mother of Ali al-Asghar. It is narrated she never sat in the shade again after Karbala."],
  ["Sukayna bint al-Husayn", "Husayn's beloved daughter. Narrations say she was found lying on her father's body."],
  ["Fatima bint al-Husayn", "The girl the Syrian asked for in Yazid's court. Zaynab shielded her."],
  ["Ruqayya bint al-Husayn", "The little girl who died in the ruins of Damascus holding her father's head."],
  ["Umm Wahb", "The only woman killed at Karbala, at her husband's side."],
  ["Umm al-Banin", "In Medina, mother of Abbas and his three brothers. She asked first about Husayn, then about her sons."]
];

/* ---------------------------------------------------------
   DIVINE PEARLS — sayings, in order of the Fourteen
   --------------------------------------------------------- */
const PEARLS = [
  { who: "Prophet Muhammad ﷺ", q: "The best of you is the one who is best to his family, and I am the best of you to my family.", src: "Sunan al-Tirmidhi" },
  { who: "Prophet Muhammad ﷺ", q: "None of you truly believes until he loves for his brother what he loves for himself.", src: "Sahih al-Bukhari; Sahih Muslim" },
  { who: "Prophet Muhammad ﷺ", q: "Fatima is a part of me. Whoever angers her has angered me.", src: "Sahih al-Bukhari" },
  { who: "Lady Fatima al-Zahra", q: "Allah made faith a purification from shirk, and prayer a cure for arrogance… and He made obedience to us order for the community, and our leadership a protection from division.", src: "The Sermon of Fadak" },
  { who: "Imam Ali", q: "People are of two kinds: either your brother in religion, or your equal in creation.", src: "Nahj al-Balagha, letter 53" },
  { who: "Imam Ali", q: "The worth of every person is in what he does well.", src: "Nahj al-Balagha, saying 81" },
  { who: "Imam Ali", q: "A man is hidden under his tongue.", src: "Nahj al-Balagha, saying 392" },
  { who: "Imam Ali", q: "Do not be the slave of another, when Allah has made you free.", src: "Nahj al-Balagha, letter 31" },
  { who: "Imam al-Hasan", q: "Work for your world as if you will live forever, and work for your hereafter as if you will die tomorrow.", src: "Bihar al-Anwar (his advice to Junada)" },
  { who: "Imam al-Husayn", q: "I see death as nothing but happiness, and life with oppressors as nothing but misery.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Husayn", q: "If you have no religion and do not fear the Day of Return, then at least be free people in this world.", src: "Words to the army on Ashura (al-Luhuf)" },
  { who: "Imam Zayn al-Abidin", q: "The right of your mother is that you know she carried you where no one carries anyone, and fed you from the fruit of her heart what no one feeds anyone.", src: "Risalat al-Huquq" },
  { who: "Imam al-Baqir", q: "A scholar whose knowledge benefits others is better than seventy thousand worshippers.", src: "al-Kafi" },
  { who: "Imam al-Baqir", q: "Our Shia is only the one who fears Allah and obeys Him.", src: "al-Kafi" },
  { who: "Imam al-Sadiq", q: "Be an adornment for us, and do not be a disgrace to us.", src: "al-Amali of al-Saduq" },
  { who: "Imam al-Sadiq", q: "Do not be fooled by the length of a man's bowing and prostration. Look at his truthfulness and how he returns what is entrusted to him.", src: "al-Kafi" },
  { who: "Imam al-Kazim", q: "Allah has two proofs over people: an outer proof, the prophets and Imams, and an inner proof, the intellect.", src: "al-Kafi, Book of Intellect" },
  { who: "Imam al-Rida", q: "Among the signs of understanding are knowledge, forbearance and silence. Silence is one of the gates of wisdom.", src: "al-Kafi" },
  { who: "Imam al-Rida", q: "If you weep for anything, weep for Husayn.", src: "Uyun Akhbar al-Rida" },
  { who: "Imam al-Jawad", q: "The believer needs three things: success from Allah, a preacher within himself, and acceptance of advice from those who advise him.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Hadi", q: "The world is a market: some profit in it, and some lose.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Askari", q: "Worship is not much fasting and prayer. Worship is much reflection on the affair of Allah.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Mahdi", q: "People benefit from me in my occultation as they benefit from the sun when clouds hide it.", src: "Kamal al-Din" }
];

/* extra proofs, rulers */
PROOFS.push(
  { title: "Close Every Door but Ali's", ar: "سُدُّوا الْأَبْوَابَ إِلَّا بَابَ عَلِيٍّ",
    en: "The Prophet ordered every door opening into his mosque to be closed, except the door of Ali. When people complained, he said he had not closed or opened anything himself, but was commanded to.",
    src: "Sunan al-Tirmidhi; Musnad Ahmad; al-Nasa'i, Khasa'is",
    why: "Like Harun, whose house opened into the place of worship of Musa, only Ali was given this rank. It was Allah's command, not the Prophet's preference.", story: "brotherhood" },
  { title: "\"The Guardian of Every Believer After Me\"", ar: "عَلِيٌّ مِنِّي وَأَنَا مِنْهُ، وَهُوَ وَلِيُّ كُلِّ مُؤْمِنٍ بَعْدِي",
    en: "When some companions complained about Ali, the Prophet's face changed and he said: \"What do you want from Ali? Ali is from me and I am from him, and he is the guardian (wali) of every believer after me.\"",
    src: "Sunan al-Tirmidhi; Musnad Ahmad",
    why: "'After me' leaves no room for doubt. The Prophet himself said who the wali of the believers would be once he was gone.", story: "ghadir" }
);
(function moreRulers() {
  const ab = RULERS[2].items, i = ab.findIndex(r => r.name === "al-Mansur");
  ab.splice(i + 1, 0, { name: "al-Mahdi (Abbasid)", reign: "158–169 AH · 775–785", imam: "al-Kazim", text: "Had Imam al-Kazim arrested and brought to Baghdad. He released him after dreaming of Imam Ali reciting the verse about those who cut off the ties of kinship (47:22).", links: ["kazim"] });
  const m = ab.findIndex(r => r.name === "al-Mutawakkil");
  ab.splice(m + 1, 0, { name: "al-Muntasir", reign: "247–248 AH · 861–862", imam: "al-Hadi", good: true, text: "An exception. After his father al-Mutawakkil was killed, he allowed pilgrims back to Husayn's grave and eased the persecution of the family of Ali. He ruled only six months.", links: ["hadi-samarra"] });
  RULERS[0].items[0].text = "Chosen at Saqifa while Ali was burying the Prophet. Took Fadak from Fatima, refused her inheritance and stopped her family's share of khums. Ali did not pledge for about six months, and Fatima died angry with him (Bukhari).";
  RULERS[0].items[0].links = ["saqifa", "fadak", "door", "fatima-visit"];
  RULERS[1].items.find(r => r.name === "Umar ibn Abd al-Aziz").good = true;
  RULERS[1].items.find(r => r.name === "Yazid ibn Muawiya").links = ["husayn-departure", "ashura", "night-11", "captives-damascus", "after-karbala"];
})();

/* Dhul-Fiqar */
(function () {
  const s = {
    id: "dhulfiqar", era: "prophet",
    title: "Dhul-Fiqar: How Ali Got His Sword",
    arabic: "ذو الفقار سيف علي",
    when: "2–3 AH (Badr and Uhud)", where: "Medina",
    summary: "The most famous sword in Islamic history came to Ali from the hand of the Prophet, and the heavens themselves named it.",
    body: `
<h4>A sword from the Prophet's hand</h4>
<p>Its name, <strong>Dhul-Fiqar</strong>, means "the one with notches" or "the one with vertebrae", after the grooves along its blade. Later tradition pictures it with a <strong>split, two-pointed tip</strong>, the shape you see today on every 'alam and banner of Imam Ali.</p>
<p>Ibn Hisham and al-Tabari record that Dhul-Fiqar came to the Prophet ﷺ after the <strong>Battle of Badr</strong>. It had belonged to a champion of Quraysh who was killed there, and it became the Prophet's own sword. Then the Prophet gave it to Ali.</p>
<h4>Uhud: the sword that did not break</h4>
<p>Shia narrations, and some Sunni historians, tell it more fully. At Uhud, when the army fled and Ali stood alone in front of the Prophet, he fought so hard that <strong>his own sword broke</strong>. He came to the Prophet and said: "O Messenger of Allah, a man fights with his sword, and mine is broken." The Prophet handed him Dhul-Fiqar. Ali went back into the battle and drove back group after group of Quraysh.</p>
<p>It was then that the voice was heard from the sky, recorded by al-Tabari: <strong>"There is no youth like Ali, and no sword like Dhul-Fiqar."</strong> Some Shia narrations say that Jibra'il himself brought the sword down from Paradise.</p>
<h4>The battles of Dhul-Fiqar</h4>
<p>With it Ali killed <strong>Amr ibn Abd Wadd</strong> at Khandaq, <strong>Marhab</strong> at Khaybar, and the standard-bearer of Hawazin at Hunayn. It was in his hand at Jamal, Siffin and Nahrawan. Yet he never once drew it in anger or for himself. At Khandaq he waited until his anger had passed before he struck.</p>
<h4>Where is it now?</h4>
<p>The Imams taught that the weapons and relics of the Prophet passed from Imam to Imam, like the Ark of the Covenant among the Children of Israel: whoever holds them holds the Imamate (al-Kafi, Book of the Proof). Dhul-Fiqar passed from Ali to Hasan, to Husayn, and down the line of the Imams. Shia narrations say it is today with <strong>Imam al-Mahdi</strong>, who will draw it when Allah allows him to appear.</p>`,
    lesson: "Dhul-Fiqar is the symbol of strength that serves the truth. The sword is famous because of the hand that held it, a hand that never struck for the sake of the self.",
    sources: "Ibn Hisham, al-Sira; al-Tabari, Tarikh (Badr and Uhud); al-Kulayni, al-Kafi, Kitab al-Hujja (the Prophet's weapons with the Imams); Kitab al-Irshad; Bihar al-Anwar",
    proof: "Al-Tabari, a Sunni historian, records both that Dhul-Fiqar was the Prophet's sword from Badr and the call at Uhud: 'There is no youth like Ali, and no sword like Dhul-Fiqar.'"
  };
  const k = STORIES.findIndex(x => x.id === "uhud");
  STORIES.splice(k + 1, 0, s);
  STORY_IMAGES.dhulfiqar = "Imam_Ali_Shrine";
  const t = TIMELINE.findIndex(x => x.s === "uhud");
  TIMELINE.splice(t + 1, 0, { y: "625 · 3 AH", era: "prophet", t: "Ali receives Dhul-Fiqar from the Prophet", s: "dhulfiqar" });
  BATTLES.find(b => b.name === "Uhud").brave = "Killed the standard-bearers of Quraysh. When his sword broke, the Prophet gave him Dhul-Fiqar, and he held the line alone when most of the army ran.";
})();

/* ---------------------------------------------------------
   AL-ABBAS IBN ALI — story + section data
   --------------------------------------------------------- */
(function () {
  const s = {
    id: "abbas", era: "umayyad",
    title: "Abul Fadl al-Abbas: The Moon of Banu Hashim",
    arabic: "أبو الفضل العباس قمر بني هاشم",
    when: "4 Sha'ban 26 AH – 10 Muharram 61 AH", where: "Medina → Siffin → Karbala",
    summary: "Imam Ali asked for a son who would stand by Husayn at Karbala. Allah gave him al-Abbas, who held the standard to the end and would not drink while his brother was thirsty.",
    body: `
<h4>A son for Karbala</h4>
<p>After Lady Fatima's death, Imam Ali asked his brother Aqil, an expert in the lineages of the Arabs, to find him a wife "from a family of brave men, so she may bear me a brave son". Aqil chose <strong>Fatima bint Hizam</strong> of the tribe of Kilab, known as <strong>Umm al-Banin</strong>, the mother of sons. She gave Ali four sons: <strong>al-Abbas</strong>, Abdullah, Ja'far and Uthman. All four were martyred at Karbala.</p>
<p>When she entered Ali's house, she asked them not to call her Fatima, so that Hasan and Husayn would not be reminded of their mother's loss, and she told her own sons that they were servants of the children of Fatima.</p>
<h4>The Moon of Banu Hashim</h4>
<p>Al-Abbas was born on <strong>4 Sha'ban 26 AH</strong>. He grew up so handsome that he was called <strong>Qamar Bani Hashim</strong>, the Moon of Banu Hashim, and so tall that when he rode a horse his feet nearly touched the ground. Narrations say Imam Ali would hold the baby's arms, kiss them and weep, and when Umm al-Banin asked why, he told her what would happen to those arms at Karbala.</p>
<p>All his life he never called Husayn "my brother" out of respect; he called him "my master", <em>ya sayyidi</em>. Only once, as he was dying, did he say <em>"ya akhi"</em>: my brother.</p>
<h4>At Karbala</h4>
<ul>
<li><strong>The standard-bearer</strong>: Husayn gave him the banner of the army. He is <strong>Alamdar</strong>, the one who holds the 'alam.</li>
<li><strong>7 Muharram</strong>: when the river was blocked, he led a party at night with Nafi' ibn Hilal, broke through the guards and brought water back to the camp. From then on he was called <strong>al-Saqqa</strong>, the water-bearer.</li>
<li><strong>9 Muharram</strong>: Shimr, whose tribe was related to Umm al-Banin, came to offer him and his brothers safety. Al-Abbas answered: <strong>"May Allah curse you and your safety! You offer us safety while the son of the Messenger of Allah has none?"</strong> That evening it was al-Abbas whom Husayn sent to ask the army for one more night of prayer.</li>
</ul>
<h4>The water of Ashura</h4>
<p>On the afternoon of Ashura, al-Abbas had already sent his three brothers out before him, so he could see their reward before his own. Then he came to Husayn and asked permission to fight. Husayn told him: if you must go, bring some water for the children. Little <strong>Sakina</strong> had given him her dry waterskin.</p>
<p>He charged into the guards at the Euphrates and reached the water. He scooped some up in his hand, then remembered his brother's thirst, and threw it back: <em>"O soul of Abbas, will you drink while Husayn is thirsty?"</em> He filled the waterskin, put it on his shoulder, and turned his horse back towards the tents.</p>
<p>They ambushed him in the palm grove. A man named <strong>Zayd ibn Warqa'</strong> struck off his <strong>right hand</strong>. He took the sword in his left and kept going, reciting that he would defend his religion and his Imam. <strong>Hakim ibn al-Tufayl</strong> struck off his <strong>left hand</strong>. He held the waterskin in his teeth. Then an arrow pierced the waterskin and the water ran out onto the sand. Another arrow struck his eye, and a blow of an iron club struck his head, and he fell.</p>
<p>He called out: <strong>"O my brother, come to your brother!"</strong> Husayn rushed to him, sat by his head, and said: <strong>"Now my back is broken, my means are few, and my enemy rejoices."</strong> Al-Abbas asked his brother not to carry him back to the tents, because he had promised Sakina water and could not face her. Husayn left him by the river. That is why the shrine of al-Abbas stands apart from Husayn's, near where the river ran.</p>
<h4>What the Imams said about him</h4>
<p>Imam Zayn al-Abidin wept and said: "May Allah have mercy on my uncle al-Abbas. He preferred his brother over himself and sacrificed himself for him until both his hands were cut off, so Allah gave him two wings with which he flies with the angels in Paradise, as He gave Ja'far ibn Abi Talib. Al-Abbas has a rank with Allah that all the martyrs will envy on the Day of Resurrection."</p>
<p>Imam al-Sadiq said: <strong>"My uncle al-Abbas had a penetrating insight and a firm faith. He fought alongside Abu Abdillah and was martyred."</strong> In the ziyarat he taught, al-Abbas is greeted as <em>"the righteous servant, obedient to Allah, to His Messenger, to Amir al-Mu'minin, to al-Hasan and al-Husayn."</em></p>
<p>In Medina, Umm al-Banin sat every day at al-Baqi with al-Abbas's young son Ubaydullah, reciting elegies so moving that even Marwan ibn al-Hakam stopped to weep. Millions today call al-Abbas <strong>Bab al-Hawa'ij</strong>, the door to whom people turn for their needs, and the 'alam that is carried in every Muharram is his standard.</p>`,
    lesson: "Wafa', loyalty. Al-Abbas teaches what it means to follow an Imam: never put yourself before him, even in thirst, even in death.",
    sources: "Ibn Shahrashub, Manaqib; Shaykh al-Saduq, al-Amali and al-Khisal (Imam al-Sajjad on al-Abbas); Ibn Qulawayh, Kamil al-Ziyarat (his ziyarat); al-Tabari, Tarikh (9 Muharram and the water party); Abu al-Faraj, Maqatil al-Talibiyyin; al-Mufid, al-Irshad",
    proof: "Al-Tabari, from Abu Mikhnaf, records Shimr's offer of safety to al-Abbas and his brothers and their refusal, and al-Abbas leading the water party of the 7th. Abu al-Faraj, a Sunni-leaning historian, records Umm al-Banin's elegies at al-Baqi that made Marwan weep."
  };
  const k = STORIES.findIndex(x => x.id === "ashura");
  STORIES.splice(k, 0, s);
  STORY_IMAGES.abbas = "Al-Abbas_Shrine";
  const t = TIMELINE.findIndex(x => x.s === "ashura");
  TIMELINE.splice(t, 0, { y: "680 · 61 AH", era: "umayyad", t: "Al-Abbas, the standard-bearer, at the river", s: "abbas" });
})();

const ABBAS = {
  titles: [
    ["Abul Fadl", "Father of virtue"], ["Qamar Bani Hashim", "Moon of Banu Hashim"], ["al-Saqqa", "The water-bearer"],
    ["Alamdar", "The standard-bearer"], ["Bab al-Hawa'ij", "The door to needs"], ["al-'Abd al-Salih", "The righteous servant"]
  ],
  facts: [
    ["Born", "4 Sha'ban 26 AH, Medina"], ["Father", "Imam Ali ibn Abi Talib"], ["Mother", "Fatima bint Hizam, Umm al-Banin"],
    ["Brothers martyred with him", "Abdullah, Ja'far and Uthman"], ["Martyred", "10 Muharram 61 AH, by the Euphrates, about 34 years old"], ["Shrine", "Karbala, a short walk from Imam Husayn's"]
  ],
  moments: [
    ["Childhood", "Imam Ali kisses his arms and weeps for what they will suffer."],
    ["A life of adab", "He calls Husayn 'my master', never 'my brother', until his last breath."],
    ["7 Muharram", "Breaks through the guards at night and brings water to the camp."],
    ["9 Muharram", "Refuses Shimr's safety: 'Safety for us, and none for the son of the Prophet?'"],
    ["Ashura", "Reaches the river, throws the water back, and loses both arms carrying it to Sakina."],
    ["His last words", "'O my brother, come to your brother.'"]
  ],
  ar: "السَّلَامُ عَلَيْكَ أَيُّهَا الْعَبْدُ الصَّالِحُ، الْمُطِيعُ لِلَّهِ وَلِرَسُولِهِ وَلِأَمِيرِ الْمُؤْمِنِينَ وَالْحَسَنِ وَالْحُسَيْنِ",
  en: "Peace be upon you, O righteous servant, obedient to Allah, to His Messenger, to the Commander of the Faithful, to al-Hasan and al-Husayn. (Ziyarat of al-Abbas)"
};

/* ---------------------------------------------------------
   THOSE WHO WRONGED THE AHL AL-BAYT
   --------------------------------------------------------- */
const WRONGED = [
  { who: "Lady Fatima al-Zahra", by: "The government formed at Saqifa: Abu Bakr took Fadak and refused her inheritance; Umar led the party that came to her door to force the pledge.", s: "door" },
  { who: "Imam Ali", by: "Struck in prayer by Abd al-Rahman ibn Muljam, a Kharijite. Fought by Talha, al-Zubayr and A'isha at Jamal, and by Muawiya and Amr ibn al-As at Siffin; cursed from the pulpits for decades on Muawiya's orders.", s: "ali-martyrdom" },
  { who: "Imam al-Hasan", by: "Poisoned by his wife Ja'da bint al-Ash'ath on the promise of Muawiya. His funeral was turned back with arrows by Marwan ibn al-Hakam and the Umayyads.", s: "hasan-poison" },
  { who: "Imam al-Husayn", by: "Yazid ibn Muawiya ordered it; Ubaydullah ibn Ziyad organised it; Umar ibn Sa'd commanded it; Shimr ibn Dhil-Jawshan beheaded him. See the killers of Karbala below.", s: "ashura" },
  { who: "Imam Zayn al-Abidin", by: "Chained and paraded as a captive by Ibn Ziyad and Yazid. Martyred by poison under the Umayyad caliph al-Walid ibn Abd al-Malik.", s: "sajjad" },
  { who: "Imam al-Baqir", by: "Summoned to Damascus to be humiliated, then poisoned under the caliph Hisham ibn Abd al-Malik.", s: "baqir" },
  { who: "Imam al-Sadiq", by: "Harassed, summoned and threatened again and again by the Abbasid caliph al-Mansur, who burned his house and finally had him poisoned.", s: "sadiq" },
  { who: "Imam al-Kazim", by: "Arrested by Harun al-Rashid and held for years in his prisons; poisoned by his jailer al-Sindi ibn Shahak.", s: "kazim" },
  { who: "Imam al-Rida", by: "Forced to Khurasan and made heir by al-Ma'mun, who then poisoned him at Tus.", s: "rida" },
  { who: "Imam al-Jawad", by: "Poisoned at about twenty-five under al-Mu'tasim, through his wife Umm al-Fadl, daughter of al-Ma'mun.", s: "jawad" },
  { who: "Imam al-Hadi", by: "Forced to Samarra and raided by al-Mutawakkil, who also ploughed over Husayn's grave. Poisoned under al-Mu'tazz.", s: "hadi-samarra" },
  { who: "Imam al-Askari", by: "Kept under house arrest and imprisoned by the Abbasids; poisoned under al-Mu'tamid, whose men then hunted for his son.", s: "askari" },
  { who: "Imam al-Mahdi", by: "Hunted from birth by the Abbasids under al-Mu'tamid; betrayed to the caliph by his own uncle Ja'far.", s: "mahdi-birth" }
];
const KILLERS = [
  { ln: true, n: "Yazid ibn Muawiya", d: "Demanded Husayn's pledge or his head, and struck his lips with a cane in Damascus.", f: "Died in 64 AH, aged about 38, after three and a half years of rule. His own son, Muawiya II, gave up the throne within weeks; it is reported he said his father and grandfather had taken what was not theirs." },
  { ln: true, n: "Ubaydullah ibn Ziyad", d: "Governor of Kufa. Killed Muslim ibn Aqil and Hani, ordered the water cut and the attack.", f: "Killed by Ibrahim, son of Malik al-Ashtar, at the river Khazir in 67 AH; his head was sent to Mukhtar." },
  { ln: true, n: "Umar ibn Sa'd", d: "Commander of the army, for the promise of governing Rayy. Ordered the horses over Husayn's body.", f: "Never got Rayy. Killed by Mukhtar's men in Kufa, together with his son Hafs." },
  { ln: true, n: "Shimr ibn Dhil-Jawshan", d: "Brought the order to attack; beheaded Imam Husayn; tried to kill Imam Zayn al-Abidin.", f: "Hunted down and killed by Mukhtar's men as he fled from Kufa." },
  { ln: true, n: "Harmala ibn Kahil al-Asadi", d: "Shot the arrow that killed the six-month-old Ali al-Asghar in his father's arms.", f: "Captured and executed by Mukhtar." },
  { ln: true, n: "Khawli ibn Yazid al-Asbahi", d: "Carried the head of Imam Husayn to Kufa and kept it in his house overnight.", f: "Found hiding in his house and killed by Mukhtar's men." },
  { ln: true, n: "Hakim ibn al-Tufayl", d: "Struck off the left hand of al-Abbas and stripped his body.", f: "Captured and killed by Mukhtar's men." },
  { ln: true, n: "Zayd ibn Warqa' al-Juhani", d: "Struck off the right hand of al-Abbas.", f: "Hunted by Mukhtar's men and killed." },
  { ln: true, n: "Shabath ibn Rib'i & Hajjar ibn Abjar", d: "Wrote letters inviting Husayn to Kufa, then stood in the army against him.", f: "Remembered forever as the men who invited their Imam and then fought him." }
];

/* Profiles: related stories for each of the Fourteen, in MASUMIN order */
const PROFILE = {
  lessons: [null, "l-fatima", "l-ali", "l-hasan", "l-husayn", "l-sajjad", "l-baqir", "l-sadiq", "l-kazim", "l-rida", "l-jawad", "l-hadi", "l-askari", "l-mahdi"],
  stories: [
    ["dhul-ashira", "abu-talib", "mubahala", "ghadir", "usama", "pen-paper"],
    ["marriage", "fadak", "door", "fatima-visit", "fatima-burial"],
    ["kaaba-birth", "laylat-al-mabit", "badr", "khandaq", "dhulfiqar", "khaybar", "ghadir", "patience", "ali-justice", "siffin", "ali-martyrdom"],
    ["husayn-prophet", "hasan-treaty", "hasan-poison"],
    ["husayn-prophet", "husayn-departure", "hurr-karbala", "abbas", "ashura", "night-11"],
    ["zaynab", "captives-damascus", "arbain", "sajjad"],
    ["baqir", "umar-ii", "zayd"],
    ["sadiq", "mourning"],
    ["fadak-borders", "kazim"],
    ["rida", "mourning"],
    ["jawad"],
    ["hadi-samarra"],
    ["askari", "mahdi-birth"],
    ["mahdi-birth", "ghayba"]
  ],
  pearlWho: ["Prophet Muhammad ﷺ", "Lady Fatima al-Zahra", "Imam Ali", "Imam al-Hasan", "Imam al-Husayn", "Imam Zayn al-Abidin", "Imam al-Baqir", "Imam al-Sadiq", "Imam al-Kazim", "Imam al-Rida", "Imam al-Jawad", "Imam al-Hadi", "Imam al-Askari", "Imam al-Mahdi"]
};

/* ---------------------------------------------------------
   MORE DIVINE PEARLS, with references
   --------------------------------------------------------- */
PEARLS.push(
  { who: "Prophet Muhammad ﷺ", q: "I am the city of knowledge and Ali is its gate. Whoever wants the city, let him come through its gate.", src: "al-Hakim, al-Mustadrak; al-Saduq, 'Uyun Akhbar al-Rida" },
  { who: "Prophet Muhammad ﷺ", q: "Ali is with the Qur'an and the Qur'an is with Ali. They will not separate until they come to me at the Pond.", src: "al-Hakim, al-Mustadrak; al-Tabarani, al-Mu'jam al-Awsat" },
  { who: "Prophet Muhammad ﷺ", q: "Seeking knowledge is an obligation upon every Muslim.", src: "al-Kafi, Book of the Merit of Knowledge; Sunan Ibn Majah" },
  { who: "Prophet Muhammad ﷺ", q: "The strong one is not the one who overpowers others, but the one who controls himself when angry.", src: "Sahih al-Bukhari; al-Kafi" },
  { who: "Prophet Muhammad ﷺ", q: "Whoever wakes up and does not care about the affairs of the Muslims is not one of them.", src: "al-Kafi, Book of Faith and Disbelief" },
  { who: "Prophet Muhammad ﷺ", q: "Paradise lies beneath the feet of mothers.", src: "Mustadrak al-Wasa'il; Kanz al-'Ummal" },
  { who: "Lady Fatima al-Zahra", q: "First the neighbour, then the house.", src: "al-Saduq, 'Ilal al-Shara'i' (Imam Hasan heard her pray all night for the neighbours before her own family)" },
  { who: "Lady Fatima al-Zahra", q: "Whoever sends up his sincere worship to Allah, Allah sends down to him the best of what is good for him.", src: "Ibn Fahd al-Hilli, 'Uddat al-Da'i; Bihar al-Anwar" },
  { who: "Lady Fatima al-Zahra", q: "The best of you are the gentlest with people, and the most generous to their wives.", src: "al-Tabari al-Imami, Dala'il al-Imama" },
  { who: "Imam Ali", q: "Knowledge is better than wealth. Knowledge guards you, while you have to guard wealth. Wealth decreases when spent, and knowledge grows when spent.", src: "Nahj al-Balagha, saying 147 (to Kumayl)" },
  { who: "Imam Ali", q: "Opportunity passes like the clouds, so make use of good opportunities.", src: "Nahj al-Balagha, saying 21" },
  { who: "Imam Ali", q: "Patience is of two kinds: patience over what you dislike, and patience over what you love.", src: "Nahj al-Balagha, saying 55" },
  { who: "Imam Ali", q: "The tongue of the wise man is behind his heart, and the heart of the fool is behind his tongue.", src: "Nahj al-Balagha, saying 40" },
  { who: "Imam Ali", q: "There is no wealth like intelligence, no poverty like ignorance, and no loneliness more desolate than self-conceit.", src: "Nahj al-Balagha, saying 113" },
  { who: "Imam Ali", q: "In times of trouble, be like a young camel: with no back to be ridden and no udder to be milked.", src: "Nahj al-Balagha, saying 1" },
  { who: "Imam Ali", q: "This world is a house of passing, and the hereafter is the house of staying. Take from where you are passing for where you will stay.", src: "Nahj al-Balagha, sermon 203" },
  { who: "Imam Ali", q: "Whoever knows himself knows his Lord.", src: "al-Amidi, Ghurar al-Hikam" },
  { who: "Imam al-Hasan", q: "Teach people your knowledge, and learn the knowledge of others. Then you will have perfected your knowledge and learned what you did not know.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Husayn", q: "People are slaves of this world, and religion is only on their tongues. They hold onto it as long as their living is comfortable; when they are tested with trials, the truly religious become few.", src: "Tuhaf al-'Uqul (his words on the way to Karbala)" },
  { who: "Imam al-Husayn", q: "Know that people's needs coming to you are among Allah's blessings upon you, so do not grow weary of them.", src: "al-Irbili, Kashf al-Ghumma; Bihar al-Anwar" },
  { who: "Imam al-Husayn", q: "Death with dignity is better than life with humiliation.", src: "Ibn Shahrashub, Manaqib Al Abi Talib" },
  { who: "Imam Zayn al-Abidin", q: "The right of your father is that you know he is your root; without him you would not be. Whenever you see something in yourself that pleases you, know that your father is its root.", src: "Risalat al-Huquq" },
  { who: "Imam Zayn al-Abidin", q: "O Allah, bless Muhammad and his family, and let my faith reach the most perfect faith, my certainty the best certainty, and my intention the best intention.", src: "al-Sahifa al-Sajjadiyya, supplication 20" },
  { who: "Imam al-Baqir", q: "Nothing is joined to anything better than forbearance joined to knowledge.", src: "al-Kafi" },
  { who: "Imam al-Baqir", q: "Whoever's outward is better than his inward, his scale will be light.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Sadiq", q: "Our intercession will not reach the one who takes the prayer lightly.", src: "al-Kafi; Man la Yahduruhu al-Faqih" },
  { who: "Imam al-Sadiq", q: "The believer is the brother of the believer: his eye and his guide. He does not betray him, wrong him or deceive him.", src: "al-Kafi" },
  { who: "Imam al-Kazim", q: "Try to divide your time into four parts: an hour for speaking to Allah, an hour for earning your living, an hour for trusted brothers who show you your faults, and an hour for halal pleasure, which gives you strength for the other three.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Kazim", q: "Whoever wants wealth without property, a heart free of envy and a sound religion, let him ask Allah humbly to perfect his intellect.", src: "al-Kafi, Book of Intellect (to Hisham ibn al-Hakam)" },
  { who: "Imam al-Rida", q: "May Allah have mercy on the servant who keeps our affair alive: he learns our knowledge and teaches it to people. If people knew the beauty of our words, they would follow us.", src: "al-Saduq, 'Uyun Akhbar al-Rida" },
  { who: "Imam al-Rida", q: "Every person's friend is his intellect, and his enemy is his ignorance.", src: "al-Kafi" },
  { who: "Imam al-Jawad", q: "Whoever listens to a speaker has worshipped him. If the speaker speaks from Allah, he has worshipped Allah; if he speaks from Iblis, he has worshipped Iblis.", src: "al-Kafi; Tuhaf al-'Uqul" },
  { who: "Imam al-Jawad", q: "Trust in Allah is the price of every precious thing, and a ladder to every height.", src: "Bihar al-Anwar" },
  { who: "Imam al-Hadi", q: "Whoever is pleased with himself, many become displeased with him.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Hadi", q: "Whoever fears Allah is respected, and whoever obeys Allah is obeyed.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Askari", q: "The best of your brothers is the one who forgets your mistakes and remembers your kindness to him.", src: "Bihar al-Anwar" },
  { who: "Imam al-Askari", q: "Two qualities have nothing above them: faith in Allah, and being of benefit to your brothers.", src: "Tuhaf al-'Uqul" },
  { who: "Imam al-Mahdi", q: "I am the security of the people of the earth, as the stars are the security of the people of the sky.", src: "al-Saduq, Kamal al-Din (his letter)" },
  { who: "Imam al-Mahdi", q: "We do not neglect your affairs and we do not forget you. Were it not so, hardships would have come down upon you.", src: "al-Tabrisi, al-Ihtijaj (his letter to Shaykh al-Mufid)" },
  { who: "al-Abbas ibn Ali", q: "By Allah, even if you cut off my right hand, I will go on defending my religion, and an Imam who is true in certainty.", src: "His words at the river, recorded in the maqatil (Ibn Shahrashub, Manaqib)" }
);
(function sortPearls() {
  const order = [...PROFILE.pearlWho, "al-Abbas ibn Ali"];
  PEARLS.sort((a, b) => order.indexOf(a.who) - order.indexOf(b.who));
})();

/* Gen Z love for Moula Abbas: every line is tied to a real moment */
const ABBAS_GENZ = {
  stats: [["Sips of water he took", "0"], ["Times he left Husayn", "0"], ["Times he called him 'brother' before his last breath", "0"], ["Loyalty", "∞"]],
  cards: [
    { h: "The ultimate green flag", p: "His 'alam is literally the green flag of Karbala. 1400 years later, still flying in every Muharram procession." },
    { h: "Loyalty? Unmatched. No cap.", p: "Shimr offered him and his brothers safety. He said: safety for us, and none for the son of the Prophet? Hard pass." },
    { h: "Water in his hand. Didn't drink. That's the whole lore.", p: "Reached the river thirsty, picked up the water, remembered Husayn's thirst, and let it go." },
    { h: "Main character energy", p: "But he made Husayn the main character his whole life. Always 'ya sayyidi', my master. Never 'my brother', until the very end." },
    { h: "Literally glowing", p: "Qamar Bani Hashim: the Moon of Banu Hashim. The name came from his face." },
    { h: "Held the flag. Held the line.", p: "Alamdar of Karbala. As long as the 'alam stood, the camp stood." },
    { h: "Never leaves you on read", p: "Bab al-Hawa'ij, the door to needs. Millions ask Allah through him, and keep coming back with stories." },
    { h: "Brother goals, undefeated", p: "Imam al-Sajjad said Allah gave him two wings in Paradise, and a rank every martyr will envy." },
    { h: "Sakina's hero", p: "He promised her water. That promise is why we give out sabeel today." }
  ],
  tags: ["#YaAbbas", "#Alamdar", "#SaqqaeSakina", "#GreenFlagOfKarbala", "#LoyaltyGoals", "#QamarBaniHashim", "#BabulHawaij"]
};
