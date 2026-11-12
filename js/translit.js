/* Musafir: mechanical transliteration of fully vowelled Arabic (du'as & ziyarat).
   Letter-by-letter rules only: no dictionary, no translation. Long vowels are written aa / ee / oo,
   'ain as ', sun letters assimilate (ar-rahmaan), and hamzat al-wasl joins the previous word (bismillaah). */
(function () {
  const C = { "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "h", "خ": "kh", "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh", "ص": "s", "ض": "d", "ط": "t", "ظ": "z", "ع": "'", "غ": "gh", "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m", "ن": "n", "ه": "h", "و": "w", "ي": "y", "ء": "'", "أ": "'", "إ": "'", "ؤ": "'", "ئ": "'", "ة": "t", "ى": "y" };
  const FA = "َ", DA = "ُ", KA = "ِ", AN = "ً", UN = "ٌ", IN = "ٍ", SH = "ّ", SK = "ْ", SA = "ٰ", MD = "ٓ";
  const V = { [FA]: "a", [DA]: "u", [KA]: "i" }, T = { [AN]: "an", [UN]: "un", [IN]: "in" };
  const isMark = ch => /[ً-ٰٟۖ-ۭ]/.test(ch);

  function word(w) {
    // split into [letter, marks] units
    const u = [];
    for (const ch of w.replace(/ـ/g, "")) {
      if (isMark(ch) && u.length) u[u.length - 1].m += ch;
      else if (/[ء-يٱآ]/.test(ch)) u.push({ l: ch, m: "" });
    }
    let out = "", wasl = false;
    for (let i = 0; i < u.length; i++) {
      const { l, m } = u[i], nx = u[i + 1], pv = u[i - 1];
      const vowel = m.includes(FA) ? "a" : m.includes(DA) ? "u" : m.includes(KA) ? "i" : "";
      const tan = m.includes(AN) ? "an" : m.includes(UN) ? "un" : m.includes(IN) ? "in" : "";
      const shad = m.includes(SH), sup = m.includes(SA);
      const prevV = pv ? (pv.m.includes(FA) ? "a" : pv.m.includes(DA) ? "u" : pv.m.includes(KA) ? "i" : "") : "";
      // alif forms
      if (l === "آ") { out += i === 0 ? "aa" : "'aa"; continue; }
      if (l === "ا" || l === "ٱ") {
        if (i === 0) {                                 // word-initial: hamzat al-wasl (or unmarked hamza)
          if (vowel) { out += vowel; continue; }
          const al = nx && nx.l === "ل";
          wasl = true; out += al ? "a" : (nx && nx.m.includes(DA) ? "u" : "i"); continue;
        }
        if (vowel === "a" && !m.includes(SK)) { out += out.endsWith("a") ? "a" : "aa"; continue; } // fatha written on a long alif
        if (vowel) { out += "'" + vowel; continue; }               // alif with damma/kasra = hamza
        if (pv && pv.l === "و" && i === u.length - 1) continue;    // final alif after waw (qaaloo) is silent
        if (prevV === "a" || !pv.m || (pv && pv.m.includes(AN))) { if (!pv.m.includes(AN)) out += "a"; continue; } // long aa (or tanween seat)
        if (nx && nx.l === "ل" && i <= 2) continue;    // wa-/fa-/bi- + al-: silent wasl
        if (vowel) out += vowel;
        continue;
      }
      // long vowels: waw after damma, ya after kasra (no vowel of their own)
      if (l === "و" && !vowel && !shad && prevV === "u" && !m.includes(SK)) { out = out.replace(/u$/, "") + "oo"; continue; }
      if ((l === "ي" || l === "ى") && !vowel && !shad && prevV === "i" && !m.includes(SK)) { out = out.replace(/i$/, "") + "ee"; continue; }
      if (l === "ى" && !vowel) { if (prevV === "a") out += "a"; else out += "a"; continue; }
      if ((l === "و" || l === "ي") && !m && pv && !pv.m && !/[اوي]/.test(pv.l) && nx && i > 0) { out += l === "و" ? "oo" : "ee"; continue; }
      // sun-letter assimilation: lam with no vowel before a doubled letter in al-
      if (l === "ل" && !vowel && !m.includes(SK) && nx && nx.m.includes(SH) && pv && (pv.l === "ا" || pv.l === "ٱ")) continue;
      // hamza at word start is silent
      let c = (l === "أ" || l === "إ" || l === "ء") && i === 0 ? "" : C[l] || "";
      if (l === "ة") c = vowel || tan ? "t" : "h";
      out += shad ? c + c : c;
      // Allah: lam-lam(shadda)-fatha-ha  =>  long aa
      if (l === "ل" && shad && (m.includes(FA) || !vowel) && nx && nx.l === "ه" && (!u[i + 2] || !/[اوي]/.test(u[i + 2].l))) { out += "aa"; continue; }
      // a bare consonant directly before alif reads with fatha (lam-alif and partly vowelled text)
      if (!vowel && !tan && !m.includes(SK) && nx && nx.l === "ا" && !nx.m.replace(FA, "") && !(i === 0 && l === "ا")) { out += "aa"; i++; continue; }
      if (tan) out += tan;
      else if (vowel) out += vowel;
      if (sup) out += out.endsWith("a") ? "a" : "aa";
      if (m.includes(MD) && !out.endsWith("aa")) out += "a";
    }
    out = out.replace(/e{3,}/g, "ee").replace(/o{3,}/g, "oo").replace(/a{3,}/g, "aa");
    return { t: out, wasl };
  }
  function translit(ar) {
    const words = ar.replace(/[«»"()\[\]،؛:.!؟]/g, " ").split(/\s+/).filter(Boolean);
    let res = [];
    for (const w of words) {
      const { t, wasl } = word(w); if (!t) continue;
      const isAl = /^[\u0627\u0671]\u0644/.test(w.replace(/[\u064B-\u065F\u0670]/g, ""));
      const prev = res[res.length - 1];
      if (wasl && prev && /[aeiou]$/.test(prev) && !/^(wa|fa)$/.test(prev)) {
        // join: bismi + allaah => bismillaah ; shorten a long vowel before the join
        const p2 = prev.replace(/(aa|ee|oo)$/, m => m[0] === "o" ? "u" : m[0] === "e" ? "i" : "a"), rest = t.slice(1);
        if (/^llaah/.test(rest) || !/^a/.test(t) || !isAl) res[res.length - 1] = p2 + rest;   // bismillaah, yabna
        else { res[res.length - 1] = p2 + rest[0]; res.push(rest.slice(1)); } // rabbil 'aalameen, bismillaahir rahmaan
      } else if (wasl && prev && /^(wa|fa)$/.test(prev)) {
        const rest = t.slice(1);
        if (/^llaah/.test(rest) || !isAl) res[res.length - 1] = prev + rest; else { res[res.length - 1] = prev + rest[0]; res.push(rest.slice(1)); }
      } else res.push(t);
    }
    let s = res.join(" ");
    s = s.replace(/\ballaah/g, "Allaah").replace(/^./, x => x.toUpperCase());
    return s;
  }
  window.Translit = translit;
})();
