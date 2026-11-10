/* =========================================================
   SUPPORT & CHARITY
   SUPPORT_CASES is EMPTY on purpose. A case appears ONLY after
   the team has verified the person and their payment details.
   The app never collects or routes money — helpers pay the
   person (or charity) directly. To add a verified case, fill the
   shape shown in the example comment below and the QR renders
   from the UPI string.
   ========================================================= */

/* Support for the app itself. Set comingSoon:false and fill upi/qr when ready. */
const APP_SUPPORT = {
  comingSoon: true,
  name: "Musafir",
  upi: "",            // e.g. "yourname@okbank"
  note: "A way to support the app and keep it running is coming soon, inshaAllah.",
  contact: "https://wa.me/917567724402?text=" + encodeURIComponent("Assalamu alaikum, I am writing from the Musafir app about a help request.")  // public WhatsApp contact for help requests
};

/* Each person here has been checked by the team before appearing.
   Example (remove the // to add a real, verified case):
   {
     id: "c1",
     name: "A family in Lucknow",      // keep it respectful; use only what the person consents to show
     city: "Lucknow, India",
     type: "sadaqah",                  // one of GIVING_TYPES ids below
     need: "Help with a month of medical treatment.",
     goal: "₹25,000",                  // optional
     upi: "name@okbank",               // their UPI id; the QR is drawn from this
     payee: "Full Name",               // name shown in the UPI app
     phone: "+91XXXXXXXXXX",           // optional, tap to call
     verifiedOn: "2026-11-06"
   },
*/
const SUPPORT_CASES = [];

/* Kinds of giving, for labelling a case and for the short explainer. */
const GIVING_TYPES = [
  ["sadaqah", "Sadaqah", "Voluntary charity, any amount, for anyone in need. It wards off calamity and is loved by Allah."],
  ["khums", "Khums", "The obligatory one-fifth of yearly savings: half Sahm al-Imam (through your marja') and half Sahm al-Sadat (to needy sayyids)."],
  ["zakat", "Zakat", "Obligatory charity on specific kinds of wealth once they reach the set limit."],
  ["fitra", "Zakat al-Fitra", "Given at the end of Ramadan, before the Eid prayer, on behalf of each member of the household."],
  ["niaz", "Niaz / Nadhr", "A vow offering, often made in the name of the Ahl al-Bayt, then given to the needy."],
  ["help", "General help", "Direct help to a family or person in hardship — food, rent, medicine, a debt."]
];
