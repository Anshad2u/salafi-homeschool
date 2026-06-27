import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedFiqhEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='fiqh' AND strand='fiqh-enhanced'"
  );
  const cnt = Number(existing[0]?.cnt ?? 1);
  if (cnt > 0) {
    console.log('  Fiqh enhanced already seeded — skipping.');
    return;
  }
  console.log('  Seeding comprehensive Fiqh expansion...');

  const f = 'fiqh';

  // TAHA... (purification / purity)
  const t = [
    // ═══════════════════════════════════════════════════════════
    // TAHARAH (PURITY) EXPANSION
    // Based on: An-Nasihah Shafii Fiqh, Umdat al-Ahkam
    // ═══════════════════════════════════════════════════════════
    ['fe-001',f,'fiqh-enhanced',2,'2-3','Istinja: Cleaning After Toilet','After using the toilet we must clean ourselves. Use water or toilet paper. Clean from front to back. The Prophet said: Guard your private parts from urine drops.','practice',3,'["hands-on"]','[""]','toilet routine chart, wudhu steps poster'],
    ['fe-002',f,'fiqh-enhanced',3,'3-4','Faraid of Wudu (Obligatory Parts)','Wudu has 6 obligatory parts: 1) Wash face, 2) Wash arms to elbows, 3) Wipe head, 4) Wash feet to ankles, 5) In order, 6) Continuity. Prayer is not accepted without proper wudu.','practice',4,'["hands-on","visual"]','[""]','wudu poster, steps chart, wudu mat'],
    ['fe-003',f,'fiqh-enhanced',3,'3-4','Sunnah Acts of Wudu','Extra rewarded acts: washing hands first, rinsing mouth, rinsing nose, wiping ears, doing each part 3 times, using miswak, saying Bismillah before. These complete the wudu and bring extra reward.','practice',3,'["hands-on"]','["fe-002"]','Sunnah wudu checklist, miswak'],
    ['fe-004',f,'fiqh-enhanced',4,'4-5','Nullifiers of Wudu (Nawaqid)','Things that break wudu: passing wind, urine, stool, touching private parts, deep sleep, losing consciousness, eating camel meat, apostasy. Learn what requires a new wudu before prayer.','practice',3,'["verbal"]','["fe-002"]','nullifiers chart, check cards, hadith evidence'],
    ['fe-005',f,'fiqh-enhanced',5,'5-6','Ghusl (Full Bath) When Required','Ghusl is required after: sexual discharge (for older children), end of menstruation/postnatal bleeding, entering Islam, or after a wet dream. Also recommended for Jumuah and Eid.','practice',3,'["verbal"]','["fe-004"]','ghusl poster, checklist, steps guide'],
    ['fe-006',f,'fiqh-enhanced',5,'5-6','Tayammum: Dry Ablution','Tayammum is purification with clean earth when water is unavailable or harmful. Strike clean earth with hands, wipe face, then wipe hands to wrists. It replaces wudu and ghusl when needed.','practice',2,'["hands-on"]','["fe-004"]','tayammum steps guide, examples of when allowed'],
    ['fe-007',f,'fiqh-enhanced',4,'4-5','Types of Water and Impurities','Pure water (tahur): rainwater, well water, sea water, spring water. Impurities (najas): blood, urine, alcohol, pork, dogs saliva. Learn how to purify objects.','practice',2,'["visual"]','["fe-004"]','water types poster, impurity cards'],
    ['fe-008',f,'fiqh-enhanced',4,'4-5','Cleaning Impurities (Istinja)','Remove impurities: urine drops, blood, vomit. Men must wipe/ wash away urine. For najas on clothes: 3 washes for dogs saliva, running water for liquid najas, rubbing for solid.','practice',3,'["hands-on"]','["fe-001"]','impurity removal guide, clean/dirty sorting'],

    // ═══════════════════════════════════════════════════════════
    // SALAH (PRAYER) EXPANSION
    // Shurut (conditions), Arkan (pillars), Wajibat, Mufsidaat
    // ═══════════════════════════════════════════════════════════
    ['fe-009',f,'fiqh-enhanced',4,'4-5','Conditions of Salah (Shurut)','Before salah starts: 1) Islam, 2) Sanity, 3) Maturity, 4) Clean body/ clothes/ place, 5) Covering awrah, 6) Facing Qiblah, 7) Intention, 8) Correct time. All must be met for valid salah.','practice',3,'["verbal","visual"]','["fe-002"]','salah conditions poster, checklist'],
    ['fe-010',f,'fiqh-enhanced',4,'4-5','Pillars of Salah (Arkan)','The 13 pillars of salah: 1) Standing, 2) Takbir, 3) Fatihah, 4) Ruku, 5) Rise from ruku, 6) Sujood, 7) Rise from sujood, 8) Second sujood, 9) Final tashahhud, 10) Sitting, 11) Salawat, 12) Tasleem, 13) Order.','practice',4,'["verbal","hands-on"]','["fe-009"]','13 pillars poster, prayer practice mat'],
    ['fe-011',f,'fiqh-enhanced',5,'5-6','Obligatory Acts of Salah (Wajibat)','Wajibat make salah incomplete if missed intentionally: 1) Takbiratul ihram (opening), 2) Fatihah (if missed can correct), but the 13 pillars must be performed. Learn the difference between rukn and wajib.','practice',3,'["verbal"]','["fe-010"]','wajibat vs arkan chart, practice exercises'],
    ['fe-012',f,'fiqh-enhanced',5,'5-6','Sunnah and Recommended Acts of Salah','Extra acts in salah: raising hands for takbir, placing right on left, duaa istiftah, saying Ameen aloud, reading surah after Fatihah, saying Subhana Rabbiyal Azeem in ruku, Sami Allahu liman hamidah, Subhana Rabbiyal Ala in sujood.','practice',3,'["hands-on"]','["fe-010"]','Sunnah of salah checklist, practice mat'],
    ['fe-013',f,'fiqh-enhanced',5,'5-6','What Invalidates Salah (Mufsidaat)','Things that break salah: talking intentionally, eating/drinking, moving excessively, passing wind, laughing, turning chest away from qiblah, uncovering awrah, breaking wudu, missing a pillar. Must repeat the salah.','practice',3,'["verbal"]','["fe-009"]','mufsidaat cards, quiz, review activity'],
    ['fe-014',f,'fiqh-enhanced',5,'5-6','Types of Salah: Fard, Sunnah, Nafl','Fard (obligatory): 5 daily prayers, Jumuah. Sunnah: 12 rakat (2 before Fajr, 4 before Dhuhr, 2 after, 2 after Maghrib, 2 after Isha). Nafl: extra voluntary prayers. Each type has different reward.','practice',3,'["visual"]','["fe-010"]','salah types chart, tracker, rakats poster'],
    ['fe-015',f,'fiqh-enhanced',5,'5-6','Sujud al-Sahw: Prostration of Forgetfulness','When you make a mistake in salah (add or miss a part), do 2 extra sujood at the end while sitting. Cases: adding, subtracting, doubting. This fixes the salah.','practice',3,'["verbal","hands-on"]','["fe-011"]','sujood al-sahw guide, practice scenarios'],
    ['fe-016',f,'fiqh-enhanced',5,'5-6','Friday Prayer (Jumuah)','Jumuah replaces Dhuhr on Friday. Conditions: 2 khutbahs (sermons), congregation, after noon. If you miss Jumuah, pray Dhuhr. Sunnah: ghusl, wear best clothes, use perfume (for men), come early, sit close.','practice',3,'["verbal"]','["fe-014"]','Jumuah etiquette cards, khutbah listening guide'],
    ['fe-017',f,'fiqh-enhanced',5,'5-6','Congregational Prayer (Salat al-Jamah)','Praying in congregation is 27 times better than alone. The imam leads, the followers pray behind. Conditions: intent to follow, close rows. Rows should be straight with no gaps. Children stand in the back or separate.','practice',3,'["verbal","hands-on"]','["fe-014"]','congregation practice, row straightening exercise'],
    ['fe-018',f,'fiqh-enhanced',6,'6-7','Eid Prayer','Eid prayer is 2 rakat with extra takbirs (7 in first rakat, 5 in second). It is prayed after sunrise on Eid al-Fitr and Eid al-Adha. Sunnah: ghusl, eat dates before Eid al-Fitr, walk to prayer, go one route and return another.','practice',3,'["verbal"]','["fe-016"]','Eid prayer steps guide, Eid adab checklist'],
    ['fe-019',f,'fiqh-enhanced',6,'6-7','Funeral Prayer (Salat al-Janazah)','Janazah prayer is a fard kifayah (community obligation). 4 takbirs: 1st: Fatihah, 2nd: Salawat on Prophet, 3rd: Dua for deceased, 4th: Dua and Tasleem. Prayed standing without ruku or sujood.','practice',3,'["verbal"]','["fe-010"]','janazah prayer guide, dua cards for deceased'],
    ['fe-020',f,'fiqh-enhanced',6,'6-7','Making Up Missed Prayers (Qada)','If we miss a salah due to sleep or forgetfulness, we must pray it as soon as we remember. All missed prayers must be made up. The Prophet said: Whoever forgets a prayer, let him pray it when he remembers.','practice',2,'["verbal"]','["fe-014"]','qada tracker, missed prayer log'],
    ['fe-021',f,'fiqh-enhanced',6,'6-7','Combining and Shortening Prayers','On a journey (traveling) we can combine: Dhuhr with Asr, Maghrib with Isha. And shorten 4-rakat prayers to 2. This is a mercy from Allah. Also allowed for heavy rain or extreme need.','practice',2,'["verbal"]','["fe-014"]','travel salah chart, combining rules guide'],
    ['fe-022',f,'fiqh-enhanced',6,'6-7','Taraweeh and Qiyam al-Layl','Taraweeh are night prayers during Ramadan (20 or 8 rakat + Witr). Qiyam al-Layl (night prayer) is recommended all year. The Prophet prayed at night until his feet swelled. Based on love and gratitude.','practice',3,'["verbal","hands-on"]','["fe-014"]','Taraweeh tracker, qiyam guide, Witr how-to'],
    ['fe-023',f,'fiqh-enhanced',5,'5-6','Adhkar After Salah','After each salah: 1) Astaghfirullah 3x, 2) Allahumma antas salam, 3) SubhanAllah 33x, Alhamdulillah 33x, Allahu Akbar 34x, 4) Ayat al-Kursi, 5) Last 3 surahs, 6) La ilaha illAllah. This completes the salah with remembrance.','practice',2,'["hands-on"]','["fe-010"]','tasbih beads, dhikr cards, adhkar poster'],
    ['fe-024',f,'fiqh-enhanced',5,'5-6','Awrah (Covering) in Salah','Awrah for boys: from navel to knee. Awrah for girls: entire body except face and hands. Cover properly before salah. Allah says: Take your adornment at every masjid.','practice',2,'["verbal","visual"]','["fe-009"]','awrah chart (boys/girls), modesty cards'],

    // ═══════════════════════════════════════════════════════════
    // FASTING (SAWM) EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-025',f,'fiqh-enhanced',4,'4-5','Who Must Fast Ramadan','Fasting in Ramadan is obligatory for: Muslims, sane, mature (reached puberty), healthy, not traveling (long distance). Children are encouraged to practice before they are obligated. Build the habit early!','practice',3,'["verbal"]','[""]','fasting requirements poster, practice fast tracker'],
    ['fe-026',f,'fiqh-enhanced',4,'4-5','Pillars of Fasting','2 pillars of fasting: 1) Intention (niyyah) from the night before, 2) Abstaining from food, drink, and sexual relations from dawn (Fajr) to sunset (Maghrib). No fasting without intention.','practice',3,'["verbal"]','["fe-025"]','intention cards, fasting clock visual'],
    ['fe-027',f,'fiqh-enhanced',5,'5-6','Sunnah Acts of Fasting','Sunnah of fasting: eat suhoor (pre-dawn meal) late, say Bismillah and duaa for fasting, break fast immediately at Maghrib with dates/water, make dua at iftar, give iftar to others, increase Quran charity.','practice',3,'["hands-on"]','["fe-026"]','suhoor/iftar routine, sunnah checklist'],
    ['fe-028',f,'fiqh-enhanced',5,'5-6','What Invalidates Fasting (Mufsidaat)','Eating or drinking on purpose, having sexual intercourse, taking injections for nutrition, medicine that reaches the stomach, vomiting on purpose, menstruation or postnatal bleeding. These break the fast.','practice',3,'["verbal"]','["fe-026"]','invalidators poster, examples discussion'],
    ['fe-029',f,'fiqh-enhanced',5,'5-6','Who is Excused from Fasting','Excused: sick (may recover, make up later), traveler (make up later), elderly (fidyah: feed the poor), pregnant/ nursing (make up later), women with menses (make up later). Children before puberty: not yet required.','practice',3,'["verbal"]','["fe-025"]','excused fasting flow chart, fidyah explanation'],
    ['fe-030',f,'fiqh-enhanced',5,'5-6','Recommended and Voluntary Fasts','Recommended fasts: Day of Ashura (10th Muharram), Day of Arafah for non-pilgrims, Ayyam al-Beed (13th, 14th, 15th of lunar month), Mondays and Thursdays, 6 days of Shawwal. The Prophet fasted these regularly.','practice',3,'["hands-on"]','["fe-025"]','voluntary fast calendar, hadith cards'],
    ['fe-031',f,'fiqh-enhanced',5,'5-6','Ramadan Etiquette and Activities','Ramadan: increase Quran reading, extra prayers (Taraweeh), give charity, seek Laylat al-Qadr (last 10 nights), make dua, help mother with iftar, avoid bad language. Read at least 1 juz per day.','practice',3,'["verbal","hands-on"]','["fe-027"]','Ramadan activity book, good deed tracker, dua list'],
    ['fe-032',f,'fiqh-enhanced',5,'5-6','Zakat al-Fitr','Zakat al-Fitr is a wajib charity given before Eid al-Fitr. Everyone must give for themselves and their dependents. Amount: 1 sa (about 3 kg) of staple food. Given to the poor so they can enjoy Eid.','practice',2,'["verbal"]','["fe-029"]','Zakat al-Fitr calculator, giving to poor guide'],

    // ═══════════════════════════════════════════════════════════
    // ZAKAT EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-033',f,'fiqh-enhanced',5,'5-6','Nisab and Hawl (Zakat Thresholds)','Zakat is obligatory when: 1) The wealth reaches nisab (minimum: 85g gold / 595g silver value), 2) One full lunar year passes (hawl). If your savings reach this amount and a year passes, pay 2.5%.','practice',3,'["verbal"]','[""]','nisab calculator, zakat poster, hadith evidence'],
    ['fe-034',f,'fiqh-enhanced',6,'6-7','Zakatable Wealth Types','Zakat on: gold and silver (2.5%), cash and savings (2.5%), trade goods (2.5%), crops/fruits (5-10%), livestock (sheep, cows, camels — specific rates). Each type has conditions.','practice',3,'["verbal"]','["fe-033"]','zakatable items chart, percentage guide'],
    ['fe-035',f,'fiqh-enhanced',6,'6-7','The Eight Recipients of Zakat','Allah specifies 8 recipients: 1) Poor, 2) Needy, 3) Zakat workers, 4) Those whose hearts are reconciled, 5) Freeing slaves, 6) Debtors, 7) For Allahs cause, 8) Stranded travelers. Give zakat only to these.','practice',3,'["verbal"]','["fe-033"]','8 recipients poster, charity sorting activity'],
    ['fe-036',f,'fiqh-enhanced',6,'6-7','Sadaqah: Voluntary Charity','Any good done for others is sadaqah: smile, remove harm from road, help carry something, give money, feed animals. Sadaqah does not decrease wealth. It protects from calamity. Give secretly and openly.','practice',2,'["hands-on"]','[""]','Sadaqah jar, good deed cards, charity challenge'],

    // ═══════════════════════════════════════════════════════════
    // HAJJ AND UMRAH EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-037',f,'fiqh-enhanced',5,'5-6','Conditions of Hajj (Istitaah)','Hajj is obligatory once in a lifetime for those who: are Muslim, sane, mature, free, and have the ability (health, wealth, safe travel). If you cannot afford it, you do not have to go. Prepare early!','practice',2,'["verbal"]','[""]','conditions chart, hajj storybook, maps'],
    ['fe-038',f,'fiqh-enhanced',6,'6-7','Pillars of Hajj','4 pillars of Hajj: 1) Ihram with intention, 2) Staying at Arafah (9th Dhul-Hijjah), 3) Tawaf al-Ifadah (circling Kabah), 4) Sai between Safa and Marwah. Missing any invalidates the Hajj.','practice',3,'["verbal","visual"]','["fe-037"]','hajj pillars poster, step-by-step visuals'],
    ['fe-039',f,'fiqh-enhanced',6,'6-7','The Miqat and Ihram','Miqat: boundaries where pilgrims enter state of ihram. Ihram: two white cloths for men, modest clothes for women. Restrictions in ihram: no perfume, no cutting nails/hair, no hunting, no sexual relations, no disputes.','practice',2,'["verbal"]','["fe-038"]','miqat map, ihram restrictions cards'],
    ['fe-040',f,'fiqh-enhanced',6,'6-7','Umrah: The Lesser Pilgrimage','Umrah can be done any time of year. Steps: 1) Ihram from miqat, 2) Tawaf 7 rounds, 3) Sai 7 times between Safa and Marwah, 4) Shave/trim hair. Umrah expiates sins between it and the next Umrah.','practice',2,'["verbal"]','["fe-037"]','Umrah guide step cards, tawaf/sai guide'],
    ['fe-041',f,'fiqh-enhanced',5,'5-6','Day of Arafah and the First 10 Days of Dhul-Hijjah','Arafah is the greatest day of Hajj. Fasting on Arafah (for non-pilgrims) expiates 2 years of sins. The first 10 days of Dhul-Hijjah are the best days of the year. Increase good deeds and dhikr.','practice',2,'["verbal"]','[""]','Dhul-Hijjah calendar, takbirat cards, good deeds list'],
    ['fe-042',f,'fiqh-enhanced',6,'6-7','Qurbani (Sacrifice) and Eid al-Adha','Qurbani is a sunnah muakkadah for those who can afford it. Slaughter a sheep/goat or share a cow/camel (7 shares) on Eid al-Adha. Meat: 1/3 to eat, 1/3 to relatives/friends, 1/3 to poor.','practice',2,'["verbal"]','["fe-041"]','qurbani guide, meat distribution chart'],

    // ═══════════════════════════════════════════════════════════
    // FOOD & DRINK EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-043',f,'fiqh-enhanced',5,'5-6','Halal Meat and Slaughter (Dhabihah)','Halal meat: animal slaughtered with Bismillah, cut throat, allow blood to drain. Blood itself is haram (not to be eaten). Muslims, Jews, Christians food is halal. Dead animals (carrion) are not. Learn to check for halal.','practice',3,'["verbal"]','[""]','halal meat guide, slaughtering rules illustrated'],
    ['fe-044',f,'fiqh-enhanced',3,'3-4','Eating with the Right Hand','Always eat and drink with your right hand. The Prophet said: Do not eat with your left hand, for the shaytan eats with his left hand. Use 3 fingers when eating.','practice',2,'["hands-on"]','[""]','right hand sticker, practice meal routine'],
    ['fe-045',f,'fiqh-enhanced',4,'4-5','Etiquette of Drinking','Drink in 3 sips, not one gulp. Say Bismillah before, Alhamdulillah after. Drink sitting down if possible. Do not breathe into the cup. Do not drink directly from a bottle/jug. Share water with others.','practice',2,'["hands-on"]','["fe-044"]','drinking etiquette poster, practice activity'],
    ['fe-046',f,'fiqh-enhanced',5,'5-6','Prohibition of Excess (Israf)','Allah says: Eat and drink but do not be excessive. Do not waste food. Take only what you can eat. Do not leave food on the plate. The Prophet never criticized food; if he liked it he ate, otherwise he left.','practice',2,'["verbal","hands-on"]','[""]','israf awareness cards, small plate challenge'],
    ['fe-047',f,'fiqh-enhanced',5,'5-6','Inviting Guests and Feeding Others','Sunnah: invite people to eat, accept invitations, bring food to neighbors. The more people eat together, the more blessing (barakah) in the food. Feed the poor and needy as an act of worship.','practice',2,'["hands-on"]','[""]','diyafah adab cards, food share challenge'],

    // ═══════════════════════════════════════════════════════════
    // CLOTHING & ADORNMENT (NEW)
    // ═══════════════════════════════════════════════════════════
    ['fe-048',f,'fiqh-enhanced',4,'4-5','Islamic Dress Code: Awrah','Boys awrah: from navel to knee. Girls awrah: entire body except face and hands (after puberty). Before puberty girls wear modest clothes. Teach modesty from a young age.','practice',3,'["verbal","visual"]','[""]','awrah chart (boys vs girls), modesty poster'],
    ['fe-049',f,'fiqh-enhanced',5,'5-6','Hijab for Girls: Preparation','When a girl reaches puberty, hijab becomes obligatory. Start practicing before then: wear modest clothes, cover the body, develop love for modesty. The Prophet said: Modesty is part of faith.','practice',3,'["verbal"]','["fe-048"]','hijab preparation chart, modesty hadith cards'],
    ['fe-050',f,'fiqh-enhanced',5,'5-6','Prohibition of Silk and Gold for Men','Men are forbidden to wear pure silk and gold. The Prophet said wearing silk and gold in this world means they are deprived of them in the Hereafter. Women may wear them. Natural fabrics are best.','practice',2,'["verbal"]','[""]','silk/gold prohibition cards, fabric sorting activity'],
    ['fe-051',f,'fiqh-enhanced',6,'6-7','Prohibition of Tattoos and Hair Plucking','Tattoos are haram: they change Allahs creation and are painful. The Prophet cursed the one who tattoos and gets tattooed. Plucking eyebrows is cursed. Men: do not pluck gray hairs. Let the beard grow.','practice',2,'["verbal"]','[""]','body modification awareness cards'],
    ['fe-052',f,'fiqh-enhanced',5,'5-6','Imitating the Opposite Gender','Men should not imitate women and women should not imitate men in clothing, hairstyle, or mannerisms. The Prophet cursed men who imitate women and women who imitate men. Be proud of who Allah created.','practice',2,'["verbal"]','[""]','gender identity cards, Islamic identity discussion'],

    // ═══════════════════════════════════════════════════════════
    // FAMILY & RELATIONSHIPS (NEW)
    // Birr al-Walidain, Silat al-Rahim, Rights
    // ═══════════════════════════════════════════════════════════
    ['fe-053',f,'fiqh-enhanced',4,'4-5','Rights of Parents (Birr al-Walidain)','Be kind to parents, speak gently, say Uff (angry sound) is not allowed. Obey them in good, help them, pray for them. Even after they die, give charity on their behalf. Paradise is under the feet of mothers.','practice',4,'["verbal","hands-on"]','[""]','parents rights cards, kindness checklist, dua for parents'],
    ['fe-054',f,'fiqh-enhanced',5,'5-6','Ties of Kinship (Silat al-Rahim)','Keep good relations with family: grandparents, uncles/aunts, cousins. Visit them, call them, help them. The Prophet said: Whoever believes in Allah and the Last Day let him maintain family ties. Do not cut them.','practice',2,'["hands-on"]','["fe-053"]','family tree cards, contact relatives challenge'],
    ['fe-055',f,'fiqh-enhanced',5,'5-6','Rights of Children in Islam','Children have rights: good name, proper upbringing, education, love and mercy, fair treatment among siblings, financial support. Parents must teach children Islam from a young age.','practice',2,'["verbal"]','[""]','childrens rights poster, discussion cards'],
    ['fe-056',f,'fiqh-enhanced',5,'5-6','Rights of Neighbors','The Prophet said: Jibril kept advising me about the neighbor until I thought the neighbor would inherit. Share food with neighbors, be kind, do not harm. Help them when sick. The neighbor has a right over you.','practice',2,'["hands-on"]','["fe-053"]','neighbor rights cards, kindness to neighbors challenge'],
    ['fe-057',f,'fiqh-enhanced',3,'3-4','Spreading Salam (Islamic Greeting)','Say Assalamu Alaykum to those you know and do not know. The one who initiates the greeting gets more reward. Respond with Wa Alaykum Assalam wa Rahmatullah. This creates love and unity among Muslims.','practice',3,'["hands-on"]','[""]','salam cards, greeting practice, smile challenge'],

    // ═══════════════════════════════════════════════════════════
    // BUSINESS & TRANSACTIONS EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-058',f,'fiqh-enhanced',5,'5-6','Halal and Haram Earnings','Earning halal (lawful) money is an obligation. Avoid: stealing, cheating, interest (riba), gambling, selling haram products. Allah says: Eat of the good things We have provided you. Work hard and be honest.','practice',3,'["verbal"]','[""]','halal/haram earnings sorting cards, role-play shop'],
    ['fe-059',f,'fiqh-enhanced',6,'6-7','Honesty in Business','The Prophet said: The truthful and honest merchant will be with the prophets, truthful ones, and martyrs. Do not lie about your product, do not cheat in weights and measures. Full disclosure about defects.','practice',2,'["verbal","hands-on"]','["fe-058"]','honesty role-play, merchant hadith cards'],
    ['fe-060',f,'fiqh-enhanced',6,'6-7','Understanding Riba (Interest)','Riba (interest/usury) is a major sin. Allah declared war on those who deal with riba. Avoid: bank interest, late payment fees, buying with interest. Riba on any loan is forbidden.','practice',2,'["verbal"]','["fe-058"]','riba awareness poster, halal transaction guide'],
    ['fe-061',f,'fiqh-enhanced',6,'6-7','Trust (Amanah) in Transactions','If someone gives you something to keep (amanah/trust), return it honestly. Do not take what is not yours. Do not break promises. Being trustworthy is a sign of faith. The Prophet was called Al-Amin (the Trustworthy).','practice',2,'["verbal","hands-on"]','[""]','amanah activity, trustworthiness stories'],

    // ═══════════════════════════════════════════════════════════
    // FUNERALS & DEATH EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-062',f,'fiqh-enhanced',4,'4-5','Visiting the Sick','Sunnah to visit sick Muslims: ask how they are, make dua for them, sit a short time. The Prophet said: When you visit a sick person, say: Take away the illness, O Lord of the people, cure him.','practice',2,'["hands-on"]','[""]','sick visit etiquettes, dua cards for sick'],
    ['fe-063',f,'fiqh-enhanced',5,'5-6','What to Say When Someone Dies','When we hear of a death, say: Inna lillahi wa inna ilayhi rajiun (To Allah we belong and to Him we return). Make dua for the deceased. Do not wail or scream. Patience is rewarded.','practice',2,'["verbal"]','[""]','death sayings card, patience activity'],
    ['fe-064',f,'fiqh-enhanced',6,'6-7','Janazah (Funeral) Steps','Steps: 1) Ghusl al-Mayyit (washing), 2) Kafan (shrouding), 3) Janazah prayer, 4) Burial facing Qiblah, 5) Talqeen/reminder for the deceased. Fard kifayah: if some do it, others are relieved of sin.','practice',2,'["verbal"]','["fe-019"]','janazah steps poster, process guide'],
    ['fe-065',f,'fiqh-enhanced',6,'6-7','Condolences (Taziyyah) and Mourning','Visit the bereaved family, provide food, make dua for them and the deceased. Mourning is 3 days max, except for a widow (4 months 10 days). Do not hold gatherings where people wail or cry loudly.','practice',2,'["verbal"]','["fe-063"]','condolence phrase cards, mourning adab guide'],

    // ═══════════════════════════════════════════════════════════
    // MANNERS & ADAB EXPANSION
    // ═══════════════════════════════════════════════════════════
    ['fe-066',f,'fiqh-enhanced',3,'3-4','Manners of Sneezing and Yawning','When you sneeze say Alhamdulillah. When someone sneezes and says Alhamdulillah, say Yarhamukallah. Suppress yawning as much as possible. The shaytan laughs when we yawn.','practice',2,'["hands-on"]','[""]','sneeze/yawning etiquettes cards, practice role-play'],
    ['fe-067',f,'fiqh-enhanced',3,'3-4','Manners of Entering and Leaving Home','Enter home: say Bismillah, then Salam, mention Allahs name. Shaytan cannot enter a home where Bismillah is said. Leave home: say Bismillahi tawakkaltu ala Allah.','practice',2,'["hands-on"]','[""]','entering/leaving cards, dua stickers for door'],
    ['fe-068',f,'fiqh-enhanced',4,'4-5','Manners of Speaking','Speak good words or remain silent. Do not backbite (gheebah): mentioning your brother in a way he dislikes. Do not gossip (nameemah): spreading what others said. Both are major sins. Guard your tongue.','practice',3,'["verbal"]','[""]','good words jar, gheebah awareness cards, tongue control chart'],
    ['fe-069',f,'fiqh-enhanced',4,'4-5','Manners of Listening and Asking Permission','Listen when someone speaks. Do not interrupt. Ask permission before entering: knock 3 times, say Salam, wait for reply. Do not enter someone elses room without knocking. The Prophet taught us this.','practice',2,'["hands-on"]','[""]','asking permission role-play, listening skills game'],
    ['fe-070',f,'fiqh-enhanced',4,'4-5','Manners of the Masjid (Expanded)','Masjid is Allahs house. Enter with right foot: Bismillah and Salam upon the Prophet. Sit quietly. Do not run or shout. Do not disturb those praying. Keep the masjid clean. Pray 2 rakat for greeting the masjid.','practice',3,'["hands-on"]','[""]','masjid adab cards, entering dua poster, respect activity'],
    ['fe-071',f,'fiqh-enhanced',5,'5-6','Manners of the Road and Public Places','Lower your gaze, do not stare at the opposite gender. Remove harmful things from the road. Do not sit in public places blocking the way. Give way to the elderly and women. Help the blind cross.','practice',2,'["verbal","hands-on"]','[""]','public adab cards, road safety with Islamic etiquettes'],
    ['fe-072',f,'fiqh-enhanced',5,'5-6','Manners of Dealing with the Elderly','Respect the elderly. Do not speak harshly to them. Help them walk, carry things, and sit. The Prophet said: He is not from us who does not show mercy to our young and respect to our elderly.','practice',2,'["hands-on"]','["fe-053"]','respect elderly cards, grandparent appreciation activity'],

    // ═══════════════════════════════════════════════════════════
    // ANIMALS & ENTERTAINMENT
    // ═══════════════════════════════════════════════════════════
    ['fe-073',f,'fiqh-enhanced',4,'4-5','Kindness to Animals in Islam','Allah created animals for our benefit. Feed and water your pets. Do not overload working animals. Do not burn or hit animals. A prostitute was forgiven for giving water to a thirsty dog.','practice',2,'["verbal"]','[""]','animall kindness poster, hadith stories'],
    ['fe-074',f,'fiqh-enhanced',4,'4-5','Permissible Play and Games','Play sports and games that are halal. The Prophet raced with Aisha, wrestled, and allowed play. Avoid: gambling, games with statues/images of living beings, wasting time. Board games, sports, outdoor play are good.','practice',2,'["hands-on"]','[""]','halal game ideas card, sports sunnah guide'],
    ['fe-075',f,'fiqh-enhanced',5,'5-6','Permissible and Impermissible Art and Music','Drawing: animate beings (people/animals) with eyes is makruh/haram for those who want to create life. Trees, mountains, patterns are OK. Music: hadith warns about musical instruments. Avoid explicit songs.','practice',2,'["verbal"]','[""]','art guidelines poster, permissible activities list'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Fiqh Batch ${Math.floor(i/5)+1}: topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} Fiqh topics`);
}
