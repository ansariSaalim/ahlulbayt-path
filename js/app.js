/* ===========================================================
   Musafir — interactions
   =========================================================== */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const eraById = Object.fromEntries(ERAS.map(e => [e.id, e]));
  const storyById = Object.fromEntries(STORIES.map(s => [s.id, s]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- storage (safe) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }
  };
  let readSet = new Set(store.get("abp-read", []));
  const saveRead = () => store.set("abp-read", [...readSet]);

  /* ---------- theme ---------- */
  const root = document.documentElement;
  /* three looks: Paper (warm), White, Dark. White is the light theme with a neutral tone. */
  function applyTheme(v) {
    if (!["light", "white", "dark"].includes(v)) v = "light";
    root.dataset.theme = v === "dark" ? "dark" : "light";
    if (v === "white") root.dataset.tone = "white"; else delete root.dataset.tone;
    store.set("abp-theme", v); if (v !== "dark") store.set("abp-theme-light", v);
    document.querySelectorAll("#setTheme .tp").forEach(b => { b.classList.toggle("on", b.dataset.v === v); b.setAttribute("aria-checked", b.dataset.v === v); });
    const mc = document.querySelector('meta[name="theme-color"]'); if (mc) mc.content = v === "dark" ? "#0d1714" : v === "white" ? "#ffffff" : "#fbf8f2";
  }
  applyTheme(store.get("abp-theme", "light"));
  $("#themeBtn").addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? store.get("abp-theme-light", "light") : "dark"));

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ===========================================================
     PHOTOS from Wikipedia (Wikimedia Commons)
     =========================================================== */
  const imgCache = new Map();
  function wikiImage(title, want = 1000) {
    const key = title + "@" + want;
    if (imgCache.has(key)) return imgCache.get(key);
    const p = (async () => {
      let cached = null;
      try { cached = JSON.parse(sessionStorage.getItem("wk:" + key)); } catch { /* ignore */ }
      if (cached) return cached;
      const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title), { headers: { "Accept": "application/json" } });
      if (!r.ok) throw new Error("no page");
      const j = await r.json();
      const orig = j.originalimage, thumb = j.thumbnail;
      if (!orig && !thumb) throw new Error("no image");
      let src;
      if (thumb && orig && orig.width > want) src = thumb.source.replace(/\/\d+px-/, "/" + want + "px-");
      else src = (orig || thumb).source;
      const out = { src, page: (j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page) || ("https://en.wikipedia.org/wiki/" + title), name: j.title };
      try { sessionStorage.setItem("wk:" + key, JSON.stringify(out)); } catch { /* ignore */ }
      return out;
    })();
    imgCache.set(key, p);
    return p;
  }
  const small = window.innerWidth < 700;
  const SZ = { card: small ? 640 : 800, big: small ? 1000 : 1600 };
  function paint(el, title, creditEl, want = SZ.card) {
    if (!title) { el.classList.add("ph-fallback"); return; }
    el.classList.add("shimmer");
    wikiImage(title, want).then(info => new Promise((res, rej) => {
      const im = new Image(); im.decoding = "async";
      im.onload = () => res(info); im.onerror = rej; im.src = info.src;
    })).then(info => {
      el.classList.remove("shimmer", "ph-fallback");
      el.style.backgroundImage = `url("${info.src}")`;
      el.style.opacity = 0; requestAnimationFrame(() => { el.style.opacity = 1; });
      if (creditEl) creditEl.innerHTML = `Photo: <a href="${esc(info.page)}" target="_blank" rel="noopener">${esc(info.name)}</a> · Wikimedia Commons`;
      el.dataset.done = "1";
    }).catch(() => {
      el.classList.remove("shimmer"); el.classList.add("ph-fallback");
      if (creditEl) creditEl.textContent = "";
    });
  }
  const lazyImgs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; lazyImgs.unobserve(el);
      paint(el, el.dataset.wiki, el.dataset.credit ? $(el.dataset.credit, el) : null, el.dataset.size === "big" ? SZ.big : SZ.card);
    });
  }, { rootMargin: "300px" });
  const lazy = el => lazyImgs.observe(el);

  /* ===========================================================
     REVEAL ON SCROLL
     =========================================================== */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealer.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  const observeReveals = (scope = document) => $$(".reveal:not(.in)", scope).forEach(el => revealer.observe(el));

  /* ===========================================================
     HERO
     =========================================================== */
  // words of the ayah float in one by one
  const ayah = $("#heroAyah");
  const words = ayah.textContent.trim().split(/\s+/);
  ayah.innerHTML = words.map((w, i) => `<span class="w" style="animation-delay:${.25 + i * .18}s">${w}</span>`).join(" ");

  // hero photo
  const heroBg = $("#heroBg");
  wikiImage("Imam_Husayn_Shrine", SZ.big).then(info => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => res(info); im.onerror = rej; im.src = info.src;
  })).then(info => {
    heroBg.style.background = `url("${info.src}") center/cover no-repeat`;
    heroBg.classList.add("has-img");
    $("#heroCredit").innerHTML = `Photo: <a href="${esc(info.page)}" target="_blank" rel="noopener">${esc(info.name)}, Karbala</a> · Wikimedia Commons`;
  }).catch(() => {});

  // floating golden motes (like lantern light)
  (function motes() {
    const c = $("#motes"); if (!c || reduceMotion) return;
    const ctx = c.getContext("2d");
    const sprite = document.createElement("canvas"); sprite.width = sprite.height = 32;
    const sc = sprite.getContext("2d"), g = sc.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,228,160,1)"); g.addColorStop(.35, "rgba(250,210,130,.5)"); g.addColorStop(1, "rgba(250,210,130,0)");
    sc.fillStyle = g; sc.fillRect(0, 0, 32, 32);
    let w, h, parts = [], running = true, last = 0;
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(small ? 22 : 45, (w * h) / 26000));
      parts = Array.from({ length: n }, () => spawn(true));
    }
    function spawn(any) {
      return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, s: Math.random() * 14 + 6,
        vy: Math.random() * .5 + .15, vx: (Math.random() - .5) * .2, a: Math.random() * .6 + .25, t: Math.random() * 6.28 };
    }
    function frame(now) {
      if (!running) return;
      requestAnimationFrame(frame);
      if (now - last < 33) return; last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += .04; p.y -= p.vy * 2; p.x += p.vx + Math.sin(p.t) * .2;
        if (p.y < -20) Object.assign(p, spawn(false));
        ctx.globalAlpha = p.a * (.6 + .4 * Math.sin(p.t * 1.7));
        ctx.drawImage(sprite, p.x - p.s / 2, p.y - p.s / 2, p.s, p.s);
      }
    }
    size(); window.addEventListener("resize", size);
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting && !document.hidden; if (running && !was) requestAnimationFrame(frame); }).observe(c);
    document.addEventListener("visibilitychange", () => { const was = running; running = !document.hidden; if (running && !was) requestAnimationFrame(frame); });
    requestAnimationFrame(frame);
  })();

  // animated counters
  $("#statStories").dataset.count = STORIES.length;
  const rulersCount = RULERS.reduce((n, g) => n + g.items.length, 0);
  $$(".stats b")[2].dataset.count = rulersCount;
  const counterObs = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return; counterObs.unobserve(en.target);
    const el = en.target, end = +el.dataset.count, t0 = performance.now(), dur = 1600;
    const tick = now => { const k = Math.min(1, (now - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), { threshold: .5 });
  $$(".stats b").forEach(b => counterObs.observe(b));

  /* ===========================================================
     NAV, SCROLL PROGRESS, ACTIVE SECTION
     =========================================================== */
  const nav = $("#nav"), bar = $("#progress");
  const sections = $$("section[id]");
  let ticking = false, secTops = [];
  const measure = () => { secTops = sections.map(x => [x.id, x.offsetTop]); };
  window.addEventListener("load", measure); window.addEventListener("resize", measure);
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { ticking = false; doScroll(); });
  }
  let lastActive = "";
  function doScroll() {
    if (!secTops.length) measure();
    const y = window.scrollY, H = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("solid", y > 40);
    bar.style.width = (H > 0 ? (y / H) * 100 : 0) + "%";
    let cur = "";
    for (const [id, top] of secTops) if (top - 120 <= y) cur = id;
    lastActive = cur;
    tlProgress();
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ===========================================================
     LEARNING PATH (eras)
     =========================================================== */
  function renderEras() {
    $("#eras").innerHTML = ERAS.map((e, i) => {
      const total = STORIES.filter(s => s.era === e.id).length;
      const done = STORIES.filter(s => s.era === e.id && readSet.has(s.id)).length;
      return `<button class="era reveal" data-era="${e.id}" style="transition-delay:${i * 80}ms">
        <div class="era-img" data-wiki="${ERA_IMAGES[e.id] || ""}"></div>
        <span class="era-num">0${i + 1}</span>
        <small>${e.years}</small>
        <h3>${e.name}</h3>
        <div class="era-bar"><i style="background:${e.color};width:${total ? (done / total) * 100 : 0}%"></i></div>
        <div class="era-count">${done} / ${total} stories read</div>
      </button>`;
    }).join("");
    $$("#eras .era").forEach(b => b.addEventListener("click", () => { location.hash = "chapter/" + b.dataset.era; }));
    $$("#eras .era-img").forEach(el => { if (el.dataset.wiki) lazy(el); else el.classList.add("ph-fallback"); });
    observeReveals($("#eras"));
    const all = STORIES.length, read = STORIES.filter(s => readSet.has(s.id)).length;
    $("#overallFill").style.width = (read / all) * 100 + "%";
    $("#overallText").textContent = `${read} of ${all} stories read`;
  }
  function refreshStats() { /* overall text handled in refreshEraBars */ }
  function refreshEraBars() {
    $$("#eras .era").forEach(b => {
      const id = b.dataset.era;
      const total = STORIES.filter(s => s.era === id).length;
      const done = STORIES.filter(s => s.era === id && readSet.has(s.id)).length;
      $(".era-bar i", b).style.width = (done / total) * 100 + "%";
      $(".era-count", b).textContent = `${done} / ${total} stories read`;
    });
    const all = STORIES.length, read = STORIES.filter(s => readSet.has(s.id)).length;
    $("#overallFill").style.width = (read / all) * 100 + "%";
    $("#overallText").textContent = `${read} of ${all} stories read`;
  }

  /* ===========================================================
     TIMELINE
     =========================================================== */
  let tlEra = "all";
  function chipHTML(active, withAll = true) {
    return (withAll ? `<button class="chip ${active === "all" ? "on" : ""}" data-era="all">All eras</button>` : "") +
      ERAS.map(e => `<button class="chip ${active === e.id ? "on" : ""}" data-era="${e.id}"><i style="background:${e.color}"></i>${e.name}</button>`).join("");
  }
  function renderTimeline() {
    $("#tlChips").innerHTML = chipHTML(tlEra);
    $$("#tlChips .chip").forEach(c => c.addEventListener("click", () => { tlEra = c.dataset.era; renderTimeline(); }));
    $("#tlList").innerHTML = TIMELINE.filter(t => tlEra === "all" || t.era === tlEra).map(t => {
      const c = eraById[t.era].color;
      const inner = `<time>${t.y}</time><span>${esc(t.t)}</span>`;
      return `<li class="tl-item reveal" style="--c:${c}">${t.s
        ? `<a class="tl-card" href="#story/${t.s}" style="text-decoration:none">${inner}</a>`
        : `<div class="tl-card no-link">${inner}</div>`}</li>`;
    }).join("");
    observeReveals($("#tlList"));
    tlProgress();
  }
  function tlProgress() {
    const tl = $("#tl"); if (!tl) return;
    const r = tl.getBoundingClientRect();
    const k = Math.max(0, Math.min(1, (innerHeight * .6 - r.top) / r.height));
    $("#tlFill").style.height = k * 100 + "%";
  }

  /* ===========================================================
     STORIES GRID
     =========================================================== */
  let storyEra = "all", query = "", unreadOnly = false;
  function setStoryFilter(era) { storyEra = era; renderStoryChips(); renderStories(); }
  function renderStoryChips() {
    $("#storyChips").innerHTML = chipHTML(storyEra);
    $$("#storyChips .chip").forEach(c => c.addEventListener("click", () => setStoryFilter(c.dataset.era)));
  }
  function matches(s) {
    if (storyEra !== "all" && s.era !== storyEra) return false;
    if (unreadOnly && readSet.has(s.id)) return false;
    if (!query) return true;
    const hay = (s.title + " " + s.summary + " " + s.body + " " + s.where + " " + s.when).toLowerCase();
    return query.split(/\s+/).every(q => hay.includes(q));
  }
  function renderStories() {
    const list = STORIES.filter(matches);
    $("#emptyMsg").hidden = list.length > 0;
    $("#storyGrid").innerHTML = list.map((s, i) => {
      const e = eraById[s.era];
      return `<a class="s-card reveal ${readSet.has(s.id) ? "read" : ""}" href="#story/${s.id}" data-id="${s.id}" style="--c:${e.color};transition-delay:${(i % 3) * 70}ms;text-decoration:none">
        <div class="s-img"><div class="ph" data-wiki="${STORY_IMAGES[s.id] || ""}" style="--c:${e.color}"></div><span class="s-arabic" dir="rtl" lang="ar">${s.arabic}</span><span class="s-read" title="Read">✓</span></div>
        <div class="s-body">
          <span class="s-tag">${e.name}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.summary)}</p>
          <span class="s-when">${esc(s.when)} · ${esc(s.where)}</span>
        </div>
      </a>`;
    }).join("");
    $$("#storyGrid .ph").forEach(lazy);
    observeReveals($("#storyGrid"));
    if (!reduceMotion && matchMedia("(hover:hover)").matches) $$("#storyGrid .s-card").forEach(tilt);
  }
  function tilt(card) {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  }
  let searchT;
  $("#search").addEventListener("input", e => { clearTimeout(searchT); searchT = setTimeout(() => { query = e.target.value.trim().toLowerCase(); renderStories(); }, 160); });
  $("#unreadOnly").addEventListener("change", e => { unreadOnly = e.target.checked; renderStories(); });

  /* ===========================================================
     READER
     =========================================================== */
  const reader = $("#reader"), rScroll = $("#readerScroll");
  let currentId = null, lastFocus = null;

  function openStory(id) {
    const s = storyById[id]; if (!s) return;
    const e = eraById[s.era];
    const idx = STORIES.indexOf(s);
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = id;
    setMode("story");
    const eraNo = String(ERAS.indexOf(e) + 1).padStart(2, "0");
    const back = $("#rBack"); back.hidden = false;
    back.href = "#chapter/" + e.id; back.textContent = `← Chapter ${eraNo}: ${e.name}`;
    reader.style.setProperty("--c", e.color);
    $("#rEra").textContent = e.name;
    $("#rArabic").textContent = s.arabic;
    $("#rTitle").textContent = s.title;
    $("#rMeta").textContent = `${s.when} · ${s.where}`;
    $("#rSummary").textContent = s.summary;
    $("#rContent").innerHTML = s.body;
    $("#rLesson").innerHTML = `<b>Lesson</b>${esc(s.lesson)}`;
    const proof = $("#rDiffer");
    if (s.proof) { proof.hidden = false; proof.innerHTML = `<b>The proof, even from their own books</b>${esc(s.proof)}`; } else proof.hidden = true;
    $("#rSources").innerHTML = `<b>Sources:</b> ${esc(s.sources)}<br><button class="share-btn" id="rShare">Share this story</button>`;
    $("#rShare").onclick = () => shareText(s.title, s.title + ": " + s.summary);
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback");
    img.style.setProperty("--c", e.color);
    $("#rCredit").textContent = "";
    paint(img, STORY_IMAGES[id], $("#rCredit"), SZ.big);
    updateDoneBtn();
    const prev = STORIES[idx - 1], next = STORIES[idx + 1];
    const pb = $("#rPrev"), nb = $("#rNext");
    pb.disabled = !prev; nb.disabled = !next;
    $("span", pb).textContent = prev ? prev.title : "";
    $("span", nb).textContent = next ? next.title : "";
    pb.onclick = () => prev && (location.hash = "story/" + prev.id);
    nb.onclick = () => next && (location.hash = "story/" + next.id);
    const body = $(".r-body"); body.classList.remove("fade"); void body.offsetWidth; body.classList.add("fade");
    rScroll.scrollTop = 0;
    reader.classList.add("open"); reader.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    document.title = s.title + " · Musafir";
    setLast("#story/" + id, "Story", s.title);
    setTimeout(() => $(".reader-close").focus({ preventScroll: true }), 50);
  }
  function setMode(mode) {
    reader.classList.remove("is-quran"); const qp = $("#qPlayer"); if (qp) qp.hidden = true; const qs = $("#qSheet"); if (qs) qs.hidden = true;
    $("#rChapter").hidden = mode !== "chapter";
    $("#rStory").hidden = mode !== "story";
    $("#rLessonView").hidden = mode !== "lesson";
  }
  function showReader(title) {
    const body = $(".r-body"); body.classList.remove("fade"); void body.offsetWidth; body.classList.add("fade");
    rScroll.scrollTop = 0;
    reader.classList.add("open"); reader.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    document.title = title + " · Musafir";
  }
  function openChapter(eraId) {
    const e = eraById[eraId]; if (!e) return;
    const i = ERAS.indexOf(e);
    const list = STORIES.filter(s => s.era === eraId);
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null;
    setMode("chapter");
    reader.style.setProperty("--c", e.color);
    $("#rEra").textContent = "Chapter " + String(i + 1).padStart(2, "0");
    $("#rArabic").textContent = "";
    $("#rTitle").textContent = e.name;
    $("#rMeta").textContent = e.years + " · " + list.length + " stories";
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback");
    $("#rCredit").textContent = "";
    paint(img, ERA_IMAGES[eraId], $("#rCredit"), SZ.big);
    const back = $("#rBack"); back.hidden = true;
    const next = list.find(s => !readSet.has(s.id)) || list[0];
    const done = list.filter(s => readSet.has(s.id)).length;
    const nextEra = ERAS[i + 1];
    $("#rChapter").innerHTML = `
      <p class="r-summary">${esc(ERA_INTRO[eraId] || "")}</p>
      <div class="ch-progress"><div class="overall-bar"><i style="width:${(done / list.length) * 100}%;background:${e.color}"></i></div><span>${done} / ${list.length} read</span></div>
      <a class="btn btn-gold ch-start" href="#story/${next.id}">${done === 0 ? "Start reading" : done === list.length ? "Read again" : "Continue"}: ${esc(next.title)} →</a>
      <ol class="ch-list">${list.map((s, k) => `
        <li style="animation-delay:${.08 + k * .06}s"><a href="#story/${s.id}" class="${readSet.has(s.id) ? "read" : ""}">
          <span class="ch-n">${readSet.has(s.id) ? "✓" : k + 1}</span>
          <span class="ch-t"><b>${esc(s.title)}</b><small>${esc(s.when)}</small></span>
          <span class="ch-ar" dir="rtl" lang="ar">${s.arabic}</span>
        </a></li>`).join("")}</ol>
      ${nextEra ? `<a class="r-nav-btn ch-next" href="#chapter/${nextEra.id}"><small>Next chapter</small><span>${String(i + 2).padStart(2, "0")} · ${esc(nextEra.name)}</span></a>` : ""}`;
    const body = $(".r-body"); body.classList.remove("fade"); void body.offsetWidth; body.classList.add("fade");
    rScroll.scrollTop = 0;
    reader.classList.add("open"); reader.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    document.title = e.name + " · Musafir";
  }
  function closeStory(fromHash) {
    if (!reader.classList.contains("open")) return;
    reader.classList.remove("open"); reader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    document.title = "Musafir · Prayer, Qur\'an, Du\'as & the History of Islam";
    currentId = null;
    if (!fromHash && /^#(story|chapter|learn|lesson|imam|quran|lib)\//.test(location.hash)) history.replaceState(history.state, "", location.pathname + location.search + (screenHash || "#/home"));
    if (typeof stopQuran === "function") stopQuran();
    reader.classList.remove("is-quran"); $("#qPlayer").hidden = true; $("#qSheet").hidden = true;
    if (!fromHash && screenHash) setTimeout(() => shellRoute(screenHash), 0);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$("[data-close]", reader).forEach(b => b.addEventListener("click", () => closeReaderBack()));
  document.addEventListener("keydown", e => {
    if (!reader.classList.contains("open")) return;
    if (e.key === "Escape") closeStory();
    if (e.key === "ArrowRight" && !$("#rNext").disabled) $("#rNext").click();
    if (e.key === "ArrowLeft" && !$("#rPrev").disabled) $("#rPrev").click();
  });

  function updateDoneBtn() {
    const b = $("#rDone"), done = readSet.has(currentId);
    b.classList.toggle("done", done);
    b.textContent = done ? "✓ Read · tap to undo" : "Mark as read";
  }
  function setRead(id, val) {
    if (val) readSet.add(id); else readSet.delete(id);
    saveRead(); refreshEraBars(); refreshStats();
    const card = $(`.s-card[data-id="${id}"]`); if (card) card.classList.toggle("read", val);
    if (id === currentId) updateDoneBtn();
  }
  $("#rDone").addEventListener("click", () => {
    const val = !readSet.has(currentId); setRead(currentId, val);
    if (val) toast("Story marked as read ✓");
  });
  rScroll.addEventListener("scroll", () => {
    const max = rScroll.scrollHeight - rScroll.clientHeight;
    const k = max > 0 ? rScroll.scrollTop / max : 0;
    $("#readerProgress").style.width = k * 100 + "%";
    if (k > .92 && currentId && !readSet.has(currentId)) { setRead(currentId, true); toast("Story finished. Marked as read ✓"); }
  }, { passive: true });

  function route() {
    const h = decodeURIComponent(location.hash);
    const overlay = /^#(story|chapter|learn|lesson|imam|quran|lib)\//.test(h);
    if (overlay && !screenHash) showScreen("home");
    if (h.startsWith("#quran/")) openSurah(h.slice(7));
    else if (h.startsWith("#story/")) openStory(h.slice(7));
    else if (h.startsWith("#chapter/")) openChapter(h.slice(9));
    else if (h.startsWith("#learn/")) openCategory(h.slice(7));
    else if (h.startsWith("#lesson/")) openLesson(h.slice(8));
    else if (h.startsWith("#imam/")) openImam(+h.slice(6));
    else if (h.startsWith("#lib/")) { const [c, id] = h.slice(5).split("/"); id ? openLibItem(c, id) : openLib(c); }
    else { closeStory(true); shellRoute(h); }
  }
  window.addEventListener("hashchange", route);

  /* ===========================================================
     RULERS
     =========================================================== */
  let rulerGroup = 0;
  function renderRulers() {
    $("#rulerTabs").innerHTML = RULERS.map((g, i) => `<button class="tab ${i === rulerGroup ? "on" : ""}" role="tab" data-i="${i}">${g.group}</button>`).join("");
    $$("#rulerTabs .tab").forEach(t => t.addEventListener("click", () => { rulerGroup = +t.dataset.i; renderRulers(); }));
    $("#rulerList").innerHTML = RULERS[rulerGroup].items.map((r, i) => {
      const good = r.name === "Umar ibn Abd al-Aziz";
      return `<div class="ruler reveal ${good ? "good" : ""}" style="transition-delay:${i * 60}ms">
        <div>
          <h3>${esc(r.name)}</h3>
          <div class="reign">${esc(r.reign)}</div>
          <div class="imam">Imam(s) of the time: <b>${esc(r.imam)}</b></div>
          ${good ? `<span class="badge-good">The exception</span>` : ""}
        </div>
        <div>
          <p>${esc(r.text)}</p>
          ${r.links.length ? `<div class="links">${r.links.map(id => `<a href="#story/${id}">${esc(storyById[id].title)} →</a>`).join("")}</div>` : ""}
        </div>
      </div>`;
    }).join("");
    observeReveals($("#rulerList"));
  }

  /* ===========================================================
     MA'SUMIN
     =========================================================== */
  const starSVG = `<svg viewBox="0 0 100 100"><path d="M50 4 L61 26 L84 16 L74 39 L96 50 L74 61 L84 84 L61 74 L50 96 L39 74 L16 84 L26 61 L4 50 L26 39 L16 16 L39 26Z"/></svg>`;
  function renderMasumin() {
    $("#mGrid").innerHTML = MASUMIN.map((m, i) => `
      <div class="m-card reveal" style="transition-delay:${(i % 4) * 70}ms" tabindex="0" role="button" aria-label="${esc(m.name)}, tap to see details">
        <div class="m-inner">
          <div class="m-face m-front">
            <div class="ph" data-wiki="${IMAM_IMAGES[m.name] || ""}"></div>
            <div class="medal">${starSVG}<b>${m.n}</b></div>
            <h3>${esc(m.name)} ${i === 0 ? "ﷺ" : `<span class="hon">(${i === 1 ? "SA" : "AS"})</span>`}</h3>
            <div class="t">${esc(m.title)}</div>
            <div class="hint">Tap to turn ↻</div>
          </div>
          <div class="m-face m-back">
            <h4>${esc(m.name)} ${i === 0 ? "ﷺ" : `<span class="hon">(${i === 1 ? "SA" : "AS"})</span>`}</h4>
            <dl>
              <dt>Born</dt><dd>${esc(m.born)}</dd>
              <dt>${m.n === "12" ? "Now" : "Died"}</dt><dd>${esc(m.died)}</dd>
              <dt>Age</dt><dd>${esc(m.age)}</dd>
              <dt>Rulers</dt><dd>${esc(m.rulers)}</dd>
            </dl>
            <p>${esc(m.note)}</p>
            <a class="btn btn-gold" href="#imam/${MASUMIN.indexOf(m)}">Open full profile →</a>
          </div>
        </div>
      </div>`).join("");
    $$("#mGrid .m-card").forEach(c => {
      const flip = e => { if (e.target.closest("a")) return; c.classList.toggle("flip"); };
      c.addEventListener("click", flip);
      c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(e); } });
    });
    $$("#mGrid .ph").forEach(el => el.dataset.wiki ? lazy(el) : el.classList.add("ph-fallback"));
    observeReveals($("#mGrid"));
    const sl = $("#shrineList");
    if (sl && typeof SHRINES !== "undefined") sl.innerHTML = MASUMIN.map((m, i) => `<li><b>${esc(m.name)}</b><span>${esc(SHRINES[i][0])}</span><small>${esc(SHRINES[i][1])}</small><a href="#lib/ziyarat/${SHRINES[i][2]}">Ziyarat →</a></li>`).join("");
  }

  /* ===========================================================
     PROOFS
     =========================================================== */
  function renderProofs() {
    $("#pGrid").innerHTML = PROOFS.map((p, i) => `
      <article class="p-card reveal" style="transition-delay:${(i % 3) * 70}ms">
        <button class="p-head" aria-expanded="false">
          <span class="p-num">${i + 1}</span>
          <span class="p-title">${esc(p.title)}</span>
          <i class="chev"></i>
        </button>
        <p class="p-ar" dir="rtl" lang="ar">${p.ar}</p>
        <div class="p-more">
          <div>
            <p class="p-en">${esc(p.en)}</p>
            <p class="p-src"><b>Source:</b> ${esc(p.src)}</p>
            <p class="p-why">${esc(p.why)}</p>
            <a class="p-link" href="#story/${p.story}">Read the story: ${esc(storyById[p.story].title)} →</a>
          </div>
        </div>
      </article>`).join("");
    $$("#pGrid .p-card").forEach(c => {
      const h = $(".p-head", c);
      const toggle = () => { const o = c.classList.toggle("open"); h.setAttribute("aria-expanded", o); };
      h.addEventListener("click", toggle);
      $(".p-ar", c).addEventListener("click", toggle);
    });
    observeReveals($("#pGrid"));
  }

  /* ===========================================================
     BATTLES
     =========================================================== */
  function renderBattles() {
    $("#bList").innerHTML = BATTLES.map((b, i) => `
      <li class="b-card reveal">
        <span class="b-wm" dir="rtl" lang="ar">${b.ar}</span>
        <div>
          <div class="b-thumb"><div class="ph" data-wiki="${STORY_IMAGES[b.story] || ""}"></div></div>
          <div class="b-num">${String(i + 1).padStart(2, "0")}</div>
          <h3>${esc(b.name)}</h3>
          <span class="b-year">${esc(b.year)}</span>
          <p class="b-foe">Against: ${esc(b.foe)}</p>
        </div>
        <div class="b-body">
          <div class="bv"><h4>⚔ His bravery</h4><p>${esc(b.brave)}</p></div>
          <div class="ls"><h4>✦ What we learn</h4><p>${esc(b.learn)}</p></div>
          <a href="#story/${b.story}">Read the full story: ${esc(storyById[b.story].title)} →</a>
        </div>
      </li>`).join("");
    $$("#bList .ph").forEach(el => el.dataset.wiki ? lazy(el) : el.classList.add("ph-fallback"));
    observeReveals($("#bList"));
    const z = $(".zulfiqar");
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { z.classList.add("in"); z.parentElement.classList.add("lit"); o.disconnect(); } }, { threshold: .3 }).observe(z);
  }

  /* ===========================================================
     LESSONS
     =========================================================== */
  let lessonIdx = 2;
  function renderLessonPicker() {
    $("#lPick").innerHTML = MASUMIN.map((m, i) => `<button class="l-btn ${i === lessonIdx ? "on" : ""}" data-i="${i}" role="tab" aria-selected="${i === lessonIdx}">
      <div class="medal">${starSVG}<b>${m.n}</b></div><span>${esc(m.name)}</span></button>`).join("");
    $$("#lPick .l-btn").forEach(b => b.addEventListener("click", () => showLesson(+b.dataset.i, true)));
  }
  function showLesson(i, scrollPick) {
    lessonIdx = (i + MASUMIN.length) % MASUMIN.length;
    const m = MASUMIN[lessonIdx], L = LESSONS[m.name];
    $$("#lPick .l-btn").forEach((b, j) => { b.classList.toggle("on", j === lessonIdx); b.setAttribute("aria-selected", j === lessonIdx); });
    if (scrollPick) { const btn = $$("#lPick .l-btn")[lessonIdx]; btn.parentElement.scrollTo({ left: btn.offsetLeft - btn.parentElement.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" }); }
    $("#lPanel").innerHTML = `<div class="l-in">
      <h3>${esc(m.name)} ${m.n === "ﷺ" ? "ﷺ" : "<span style='color:var(--gold);font-size:.7em'>(ع)</span>"}</h3>
      <p class="l-title">${esc(m.title)}</p>
      <p class="l-teach">${esc(L.teach)}</p>
      <div class="l-grid">${L.items.map((it, k) => `<div class="l-item" style="animation-delay:${.1 + k * .12}s"><b><i>${k + 1}</i>${esc(it[0])}</b><p>${esc(it[1])}</p></div>`).join("")}</div>
      <div class="l-foot">
        <a class="btn btn-gold" href="#story/${m.story}">Read their story</a>
        <div class="l-arrows"><button id="lPrev" aria-label="Previous">←</button><button id="lNext" aria-label="Next">→</button></div>
      </div></div>`;
    $("#lPrev").onclick = () => showLesson(lessonIdx - 1, true);
    $("#lNext").onclick = () => showLesson(lessonIdx + 1, true);
  }

  /* ===========================================================
     COMPANIONS & DATES
     =========================================================== */
  function renderCompanions() {
    $("#cGrid").innerHTML = COMPANIONS.map((c, i) => `<div class="c-card reveal" style="transition-delay:${(i % 4) * 60}ms"><h3>${esc(c.name)}</h3><p>${esc(c.text)}</p></div>`).join("");
    observeReveals($("#cGrid"));
  }
  function renderDates() {
    $("#dGrid").innerHTML = DATES.map((d, i) => `<a class="d-card reveal" href="#story/${d.story}" style="transition-delay:${(i % 4) * 50}ms">
      <div class="d-day"><div><b>${esc(d.day)}</b><small>${esc(d.month)}</small></div></div>
      <span>${esc(d.name)}</span></a>`).join("");
    observeReveals($("#dGrid"));
  }


  /* ===========================================================
     LEARN & PRACTICE LIBRARY
     =========================================================== */
  let doneLessons = new Set(store.get("abp-lessons", []));
  const catOf = id => LEARN_CATS.find(c => c.lessons.includes(id));
  function renderLearn() {
    $("#learnGrid").innerHTML = LEARN_CATS.map((c, i) => {
      const d = c.lessons.filter(l => doneLessons.has(l)).length;
      return `<a class="lc reveal" href="#learn/${c.id}" style="transition-delay:${(i % 4) * 60}ms;text-decoration:none">
        <span class="lc-icon">${c.icon}</span><h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p>
        <div class="lc-foot"><div class="overall-bar"><i style="width:${(d / c.lessons.length) * 100}%"></i></div><span>${d}/${c.lessons.length} lessons</span></div></a>`;
    }).join("");
    observeReveals($("#learnGrid"));
  }
  function openCategory(cid) {
    const c = LEARN_CATS.find(x => x.id === cid); if (!c) return;
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null; setMode("chapter");
    reader.style.setProperty("--c", "#b9822e");
    $("#rEra").textContent = "Learn & practise";
    $("#rArabic").textContent = "";
    $("#rTitle").textContent = c.icon + "  " + c.name;
    $("#rMeta").textContent = c.lessons.length + " lessons";
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback"); img.classList.add("ph-fallback"); $("#rCredit").textContent = "";
    $("#rBack").hidden = false; $("#rBack").href = "#learn"; $("#rBack").textContent = "← All categories";
    const next = c.lessons.find(l => !doneLessons.has(l)) || c.lessons[0];
    $("#rChapter").innerHTML = `<p class="r-summary">${esc(c.desc)}</p>
      <a class="btn btn-gold ch-start" href="#lesson/${next}">${doneLessons.has(next) ? "Review" : "Start"}: ${esc(LESSONS_LIB[next].title)} →</a>
      <ol class="ch-list">${c.lessons.map((l, k) => { const L = LESSONS_LIB[l]; return `
        <li style="animation-delay:${.06 + k * .05}s"><a href="#lesson/${l}" class="${doneLessons.has(l) ? "read" : ""}">
          <span class="ch-n">${doneLessons.has(l) ? "✓" : k + 1}</span>
          <span class="ch-t"><b>${esc(L.title)}</b><small>${esc(L.tag)}${L.quiz ? " · " + L.quiz.length + "-question quiz" : ""}</small></span></a></li>`; }).join("")}</ol>`;
    showReader(c.name);
  }
  function openLesson(id) {
    const L = LESSONS_LIB[id]; if (!L) return;
    const c = catOf(id), idx = c.lessons.indexOf(id);
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null; setMode("lesson");
    reader.style.setProperty("--c", "#b9822e");
    $("#rEra").textContent = c.name;
    $("#rArabic").textContent = "";
    $("#rTitle").textContent = L.title;
    $("#rMeta").textContent = L.tag + " · lesson " + (idx + 1) + " of " + c.lessons.length;
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback"); $("#rCredit").textContent = "";
    const imgTitle = (L.links && L.links[0] && STORY_IMAGES[L.links[0]]) || ERA_IMAGES.prophet;
    paint(img, imgTitle, $("#rCredit"), SZ.big);
    $("#rBack").hidden = false; $("#rBack").href = "#learn/" + c.id; $("#rBack").textContent = "← " + c.name;
    const secName = { proofs: "The proofs", battles: "Ali's battles", karbala: "Karbala", haq: "Fatima's Haq", pearls: "Divine pearls", lessons: "Lessons of the Fourteen", rulers: "The caliphs", masumin: "The Ma'sumin", dates: "Key dates", reading: "Books" };
    const rel = [...(L.links || []).map(sid => `<a href="#story/${sid}">${esc(storyById[sid].title)}</a>`),
                 ...(L.sections || []).map(sec => `<a href="#${sec}" data-sec="${sec}">✦ ${secName[sec] || sec}</a>`)].join("");
    const prev = c.lessons[idx - 1], next = c.lessons[idx + 1];
    const quizHTML = L.quiz && L.quiz.length ? `<div class="quiz" id="quiz"><h4>Test yourself</h4><p class="qz-score" id="qzScore">${L.quiz.length} questions</p>
      ${L.quiz.map((q, qi) => `<div class="qz" data-qi="${qi}"><p>${qi + 1}. ${esc(q.q)}</p><div class="qz-opts">${q.o.map((o, oi) => `<button data-oi="${oi}">${esc(o)}</button>`).join("")}</div><div class="qz-fb"></div></div>`).join("")}
      <button class="qz-retake" id="qzRetake" hidden>Retake the quiz</button></div>` : "";
    $("#rLessonView").innerHTML = `
      <div class="r-content">${L.body}</div>
      ${typeof LESSON_SRC !== "undefined" && LESSON_SRC[id] ? `<p class="r-sources"><b>Sources:</b> ${esc(LESSON_SRC[id])}</p>` : ""}
      ${L.practice ? `<div class="l-practice"><b>Practise today</b>${esc(L.practice)}</div>` : ""}
      ${rel ? `<p style="font-family:var(--sans);font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)">Read more on this site</p><div class="l-rel">${rel}</div>` : ""}
      ${quizHTML}
      <button class="btn btn-gold r-done ${doneLessons.has(id) ? "done" : ""}" id="lDone">${doneLessons.has(id) ? "✓ Lesson complete · tap to undo" : "Mark lesson complete"}</button>
      <nav class="r-nav">
        <button class="r-nav-btn" ${prev ? "" : "disabled"} onclick="location.hash='lesson/${prev || ""}'"><small>Previous</small><span>${prev ? esc(LESSONS_LIB[prev].title) : ""}</span></button>
        <button class="r-nav-btn" ${next ? "" : "disabled"} onclick="location.hash='lesson/${next || ""}'"><small>Next</small><span>${next ? esc(LESSONS_LIB[next].title) : ""}</span></button>
      </nav>`;
    $$("#rLessonView .l-rel a[data-sec]").forEach(a => { a.href = "#/s/" + a.dataset.sec; });
    $("#lDone").onclick = () => {
      const on = !doneLessons.has(id); if (on) doneLessons.add(id); else doneLessons.delete(id);
      store.set("abp-lessons", [...doneLessons]);
      $("#lDone").classList.toggle("done", on); $("#lDone").textContent = on ? "✓ Lesson complete · tap to undo" : "Mark lesson complete";
      renderLearn(); if (on) toast("Lesson complete ✓");
    };
    if (quizHTML) setupQuiz(L.quiz, id);
    setLast("#lesson/" + id, "Lesson", L.title);
    showReader(L.title);
  }
  function setupQuiz(quiz, id) {
    let answered = 0, right = 0;
    const score = $("#qzScore"), retake = $("#qzRetake");
    $$("#quiz .qz").forEach(box => {
      const q = quiz[+box.dataset.qi];
      $$("button", box).forEach(btn => btn.addEventListener("click", () => {
        const oi = +btn.dataset.oi, ok = oi === q.a;
        $$("button", box).forEach((b, j) => { b.disabled = true; if (j === q.a) b.classList.add("ok"); });
        if (!ok) btn.classList.add("bad");
        $(".qz-fb", box).textContent = ok ? "Correct! ✓" : "Not quite. The answer is: " + q.o[q.a];
        answered++; if (ok) right++;
        score.textContent = `${right} / ${answered} correct` + (answered === quiz.length ? (right === quiz.length ? " · MashaAllah, full marks!" : " · review and try again") : "");
        if (answered === quiz.length) {
          retake.hidden = false;
          if (right === quiz.length && !doneLessons.has(id)) { $("#lDone").click(); }
        }
      }));
    });
    retake.onclick = () => openLesson(id);
  }

  /* ===========================================================
     FATIMA'S HAQ
     =========================================================== */
  function renderHaq() {
    $("#haqGrid").innerHTML = HAQ.map((h, i) => `<div class="haq-card reveal" style="transition-delay:${(i % 3) * 70}ms">
      <span class="hn">${i + 1}</span><span class="har" dir="rtl" lang="ar">${h.ar}</span><h4>${esc(h.t)}</h4><p>${esc(h.d)}</p>
      <a href="#story/${h.s}">Read: ${esc(storyById[h.s].title)} →</a></div>`).join("");
    $("#haqAnswer").innerHTML = HAQ_ANSWER.map((h, i) => `<div class="ha reveal" style="transition-delay:${i * 70}ms"><b>${esc(h.t)}</b><p>${esc(h.d)}</p></div>`).join("");
    if (typeof QA !== "undefined" && $("#haqQa")) $("#haqQa").innerHTML = QA.filter(x => x.id === "ali-fight" || x.id === "fadak-back").map(x => qaItem(x, false)).join("");
    $("#fadakTl").innerHTML = FADAK_HISTORY.map(f => `<li class="reveal"><b>${esc(f.who)}</b>${f.yr ? `<small>${esc(f.yr)}</small>` : ""}<p>${esc(f.t)}${f.s ? ` <a href="#story/${f.s}" style="color:var(--gold)">Read →</a>` : ""}</p></li>`).join("");
    observeReveals($("#haq"));
  }

  /* ===========================================================
     KARBALA
     =========================================================== */
  function renderKarbala(tab = "days") {
    $$("#kTabs .tab").forEach(t => t.classList.toggle("on", t.dataset.k === tab));
    const body = $("#kBody");
    if (tab === "days") body.innerHTML = `<ol class="k-days">${KARBALA_DAYS.map(d => `<li><a class="k-day reveal ${/Ashura\)/.test(d.d) ? "ashura" : ""}" href="#story/${d.s}"><time>${esc(d.d)}</time><span>${esc(d.t)}</span></a></li>`).join("")}</ol>`;
    if (tab === "martyrs") body.innerHTML = MARTYRS.map(g => `<div class="k-group"><h4>${esc(g.g)}</h4><div class="m-list">${g.items.map(m => `<div class="mt reveal"><b>${esc(m[0])}</b><p>${esc(m[1])}</p></div>`).join("")}</div></div>`).join("");
    if (tab === "after") body.innerHTML = typeof AFTER_KARBALA === "undefined" ? "" : `<p class="note-small">What happened to the family of Husayn after Ashura, in order. Tap any step to read its full story.</p><ol class="k-days">${AFTER_KARBALA.map(a => `<li><a class="k-day reveal" href="#story/${a[2]}"><time>${esc(a[0])}</time><span>${esc(a[1])}</span></a></li>`).join("")}</ol><p class="r-sources"><b>Sources:</b> ${esc(AFTER_KARBALA_SRC)}</p>`;
    if (tab === "women") body.innerHTML = `<div class="m-list">${KARBALA_WOMEN.map(m => `<div class="mt reveal"><b>${esc(m[0])}</b><p>${esc(m[1])}</p></div>`).join("")}</div>`;
    if (tab === "after") body.innerHTML += `<h4 class="pf-h">Read the full stories</h4><div class="k-after">${["night-11", "zaynab", "captives-damascus", "arbain", "after-karbala", "sajjad", "mourning"].map(id => { const st = storyById[id]; return `<a class="ka reveal" href="#story/${id}"><div class="ka-img"><div class="ph" data-wiki="${STORY_IMAGES[id]}"></div></div><div class="ka-b"><b>${esc(st.title)}</b><small>${esc(st.when)}</small></div></a>`; }).join("")}</div>`;
    if (tab === "killers") body.innerHTML = killersHTML() + `<p style="margin-top:1rem"><a href="#wronged" style="color:var(--gold)">See what each of the Fourteen endured →</a></p>`;
    $$("#kBody .ph").forEach(lazy);
    observeReveals(body);
  }
  $$("#kTabs .tab").forEach(t => t.addEventListener("click", () => renderKarbala(t.dataset.k)));

  /* ===========================================================
     DIVINE PEARLS
     =========================================================== */
  let pearlIdx = new Date().getDate() % PEARLS.length;
  function showPearl() {
    const p = PEARLS[pearlIdx];
    $("#pearlFeature").innerHTML = `<p class="pf-label">Pearl of the day</p><blockquote>“${esc(p.q)}”</blockquote><cite>${esc(p.who)} · ${esc(p.src)}</cite><br><button id="pearlNext">Another pearl ↻</button>`;
    $("#pearlNext").onclick = () => { pearlIdx = (pearlIdx + 1) % PEARLS.length; showPearl(); };
  }
  const PCATS = { k: "Knowledge & Wisdom", i: "Faith & Worship", c: "Character", s: "Speech", f: "People & Friendship", p: "Patience & Trials", w: "This World & the Next", m: "Wealth & Giving", j: "Justice & Leadership" };
  (function mergePearls() {
    const base = "fiiiikcffificfksckkpskcwkwkpcifpffikikiccifkkckiikikiwciifiiiip";
    PEARLS.forEach((p, i) => { if (!p.cat) p.cat = base[i] || "i"; });
    if (typeof NAHJ_PEARLS === "undefined") return;
    const extra = NAHJ_PEARLS.map(([n, c, ar, en]) => ({ who: "Imam Ali", q: en, ar, src: `Nahj al-Balagha, saying ${n}`, cat: c, nb: true }));
    let at = -1; PEARLS.forEach((p, i) => { if (p.who === "Imam Ali") at = i; });
    PEARLS.splice(at + 1, 0, ...extra);
  })();
  let pearlWho = "all", pearlCat = "all", pearlQ = "", pearlShown = 24;
  const pearlCard = p => `<div class="pg reveal">${favBtn("p:" + PEARLS.indexOf(p))}${p.ar ? `<p class="pg-ar" dir="rtl" lang="ar">${esc(p.ar)}</p>` : ""}<q>${esc(p.q)}</q><div class="pw">${esc(p.who)}</div><div class="ps">${esc(p.src)}</div></div>`;
  function pearlList() {
    const q = pearlQ.trim().toLowerCase();
    return PEARLS.filter(p => (pearlWho === "all" || p.who === pearlWho) && (pearlCat === "all" || p.cat === pearlCat) && (!q || (p.q + " " + p.src + " " + p.who).toLowerCase().includes(q) || (p.ar && p.ar.includes(pearlQ.trim()))));
  }
  function drawPearlGrid() {
    const list = pearlList();
    $("#pearlGrid").innerHTML = list.slice(0, pearlShown).map(pearlCard).join("") || `<p class="q-err">No pearls match. Try another word or topic.</p>`;
    const left = list.length - pearlShown;
    $("#pearlMore").innerHTML = left > 0 ? `<button class="pm-btn" id="pearlMoreBtn">Show more · ${left} left</button>` : (list.length ? `<p class="note-small">${list.length} pearl${list.length === 1 ? "" : "s"} shown</p>` : "");
    const mb = $("#pearlMoreBtn"); if (mb) mb.onclick = () => { pearlShown += 36; drawPearlGrid(); };
    observeReveals($("#pearlGrid"));
  }
  function renderPearls() {
    showPearl();
    $("#pearlCount").textContent = PEARLS.length;
    const whos = [...new Set(PEARLS.map(p => p.who))];
    const cnt = w => PEARLS.filter(p => p.who === w).length;
    $("#pearlChips").innerHTML = `<button class="chip ${pearlWho === "all" ? "on" : ""}" data-w="all">All (${PEARLS.length})</button>` + whos.map(w => `<button class="chip ${pearlWho === w ? "on" : ""}" data-w="${esc(w)}">${esc(w.replace("Imam ", ""))} · ${cnt(w)}</button>`).join("");
    $$("#pearlChips .chip").forEach(c => c.addEventListener("click", () => { pearlWho = c.dataset.w; pearlCat = "all"; pearlShown = 24; renderPearls(); }));
    const pool = PEARLS.filter(p => pearlWho === "all" || p.who === pearlWho);
    const cats = Object.keys(PCATS).filter(k => pool.some(p => p.cat === k));
    $("#pearlCats").innerHTML = `<button class="chip ${pearlCat === "all" ? "on" : ""}" data-c="all">Every topic</button>` + cats.map(k => `<button class="chip ${pearlCat === k ? "on" : ""}" data-c="${k}">${PCATS[k]} · ${pool.filter(p => p.cat === k).length}</button>`).join("");
    $$("#pearlCats .chip").forEach(c => c.addEventListener("click", () => { pearlCat = c.dataset.c; pearlShown = 24; $$("#pearlCats .chip").forEach(x => x.classList.toggle("on", x === c)); drawPearlGrid(); }));
    drawPearlGrid();
  }
  $("#pearlSearch").addEventListener("input", e => { pearlQ = e.target.value; pearlShown = 24; drawPearlGrid(); });
  function killersHTML() {
    return `<div class="kl-grid">${KILLERS.map(k => `<div class="kl reveal"><h4>${esc(k.n)}</h4><p>${esc(k.d)}</p><p class="kf"><b>Their end</b>${esc(k.f)}</p></div>`).join("")}</div>`;
  }
  function renderWronged() {
    $("#wrList").innerHTML = WRONGED.map(w => `<div class="wr reveal"><b>${esc(w.who)}</b><p>${esc(w.by)}</p><a href="#story/${w.s}">Read →</a></div>`).join("");
    $("#klGrid").outerHTML = killersHTML().replace('class="kl-grid"', 'class="kl-grid" id="klGrid"');
    observeReveals($("#wronged"));
  }
  function renderAbbas() {
    $("#abAr").textContent = ABBAS.ar; $("#abEn").textContent = ABBAS.en;
    $("#abTitles").innerHTML = ABBAS.titles.map((t, i) => `<span class="ab-t reveal" style="transition-delay:${i * 60}ms"><b>${esc(t[0])}</b>${esc(t[1])}</span>`).join("");
    $("#abFacts").innerHTML = ABBAS.facts.map(f => `<tr><td>${esc(f[0])}</td><td>${esc(f[1])}</td></tr>`).join("");
    $("#abMoments").innerHTML = ABBAS.moments.map(m => `<li class="reveal"><b>${esc(m[0])}</b><p>${esc(m[1])}</p></li>`).join("");
    observeReveals($("#abbas"));
  }

  /* ---------- Download the App (Android APK + PWA) ---------- */
  const APK_URL = "https://github.com/ansariSaalim/ahlulbayt-path/releases/download/android-latest/ahlulbayt-path.apk";
  const CX = window.capacitorExports || null;
  const CAP = (CX && CX.Capacitor) || window.Capacitor;
  const NATIVE = !!(CAP && ((typeof CAP.isNativePlatform === "function" && CAP.isNativePlatform()) || (typeof CAP.getPlatform === "function" && CAP.getPlatform() !== "web") || window.androidBridge));
  if (NATIVE) document.documentElement.classList.add("is-app", "app-installed");
  let LN = null;
  if (NATIVE) {
    try { LN = (CX && CX.registerPlugin && CX.registerPlugin("LocalNotifications")) || (CAP.registerPlugin && CAP.registerPlugin("LocalNotifications")) || null; } catch { LN = null; }
    if (!LN && CAP.Plugins) LN = CAP.Plugins.LocalNotifications || null;
  }
  let installEvt = null;
  const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (standalone()) document.documentElement.classList.add("app-installed");
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; });
  addEventListener("appinstalled", () => { document.documentElement.classList.add("app-installed"); closeAppModal(); toast("App installed ✓ Open it from your home screen"); });
  const modal = $("#appModal");
  function closeAppModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
  function openAppModal(html) { $("#amSteps").innerHTML = html; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); }
  $$("[data-am-close]", modal).forEach(b => b.addEventListener("click", closeAppModal));
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const inApp = /FBAN|FBAV|Instagram|Line\/|Snapchat|WhatsApp/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const apkSteps = `<a class="btn btn-gold am-apk" href="${APK_URL}" download>Download the Android app (APK)</a>
    <ol class="am-steps"><li>Tap the button above. The file <b>ahlulbayt-path.apk</b> downloads (a few MB).</li><li>Open it from the notification or your <b>Downloads</b>.</li><li>If Android asks, allow <b>Install unknown apps</b> for Chrome, then go back.</li><li>Tap <b>Install</b>, then <b>Open</b>. Allow notifications and location when the app asks.</li></ol>
    <p class="am-note">The Android app gives exact reminders for Fajr, Zuhr and Maghrib and daily du'as, even when it is closed. It is our own app, not from the Play Store, which is why Android asks you to allow it once.</p>`;
  async function install() {
    if (NATIVE) { toast("You're already using the app ✓"); return; }
    if (isAndroid && !inApp) return openAppModal(apkSteps + `<details class="am-more"><summary>Or install the lighter web app</summary><ol class="am-steps"><li>Tap the browser menu <span class="kb">⋮</span>.</li><li>Choose <b>Install app</b> or <b>Add to Home screen</b>.</li></ol><p class="am-note">The web app cannot remind you when it is closed.</p></details>`);
    if (standalone()) { toast("You're already using the app ✓"); return; }
    if (installEvt) {
      installEvt.prompt();
      const r = await installEvt.userChoice.catch(() => null);
      installEvt = null;
      if (r && r.outcome === "accepted") toast("Installing… ✓");
      return;
    }
    if (inApp) return openAppModal(`<ol class="am-steps"><li>This page is open inside another app. Tap <span class="kb">⋮</span> or <span class="kb">…</span> and choose <b>Open in browser</b> (Chrome or Safari).</li><li>Then tap <b>Download the App</b> again.</li></ol>`);
    if (isIOS) return openAppModal(`<ol class="am-steps"><li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button <span class="kb">⬆︎</span> at the bottom of the screen.</li><li>Scroll down and tap <b>Add to Home Screen</b> <span class="kb">＋</span>.</li><li>Tap <b>Add</b>. The Ahl al-Bayt icon appears on your home screen.</li></ol><p class="am-note">Opens full screen and works offline after your first visit.</p>`);
    openAppModal(`<ol class="am-steps"><li>Tap the browser menu <span class="kb">⋮</span> at the top right.</li><li>Choose <b>Install app</b> or <b>Add to Home screen</b>.</li><li>Tap <b>Install</b>. The Ahl al-Bayt icon appears with your other apps.</li></ol><p class="am-note">If you don't see the option, open this page in Chrome. The app opens full screen and works offline after your first visit.</p>`);
  }
  $$("[data-install]").forEach(b => b.addEventListener("click", install));

  /* ---------- "update available" notice (app only) ---------- */
  function showUpdateBanner(v) {
    if ($("#updBanner")) return;
    const a = document.createElement("a");
    a.id = "updBanner"; a.href = APK_URL; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = `<span>Update available (1.${v}) — tap to get the newest app</span><i aria-label="Dismiss">×</i>`;
    $("i", a).addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); a.remove(); });
    document.body.appendChild(a);
  }
  if (NATIVE) (async () => {
    try {
      const mine = await fetch("build.json", { cache: "no-store" }).then(r => r.json()).then(b => +b.build).catch(() => 0);
      const j = await fetch("https://api.github.com/repos/ansariSaalim/ahlulbayt-path/releases/latest", { headers: { Accept: "application/vnd.github+json" } }).then(r => r.json());
      const m = (j.name || "").match(/1\.(\d+)/);
      if (m && +m[1] > mine) showUpdateBanner(+m[1]);
    } catch { /* offline or rate-limited; ignore */ }
  })();

  /* ---------- Namaz & Dua ---------- */
  function renderDuas() {
    $("#duaList").innerHTML = DUAS.map((d, i) => `<div class="dua reveal">
      <button class="dua-h"><span><b>${esc(d.t)}</b><small>${esc(d.when)}</small></span><i class="chev"></i></button>${favBtn("d:" + i)}
      <div class="dua-body"><div><p class="dua-ar" dir="rtl" lang="ar">${d.ar}</p><p class="dua-tr">${esc(d.tr)}</p><p class="dua-en">${esc(d.en)}</p>${typeof DUA_SRC !== "undefined" && DUA_SRC[i] ? `<p class="p-src"><b>Source:</b> ${esc(DUA_SRC[i])}</p>` : ""}
      ${d.counter ? `<a href="#tasbih" class="dua-copy" style="text-decoration:none">Open the counter ↑</a>` : `<button class="dua-copy" data-i="${i}">Copy Arabic</button>`}</div></div></div>`).join("");
    $$("#duaList .dua").forEach(d => $(".dua-h", d).addEventListener("click", () => d.classList.toggle("open")));
    $$("#duaList .dua-copy[data-i]").forEach(b => b.addEventListener("click", () => {
      const t = DUAS[+b.dataset.i].ar;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Copied ✓"), () => toast("Copy not available"));
    }));
    $("#longDuas").innerHTML = LONG_DUAS.map(l => `<div class="ld reveal"><b>${esc(l[0])}</b><small>${esc(l[1])}</small><p>${esc(l[2])}</p>${typeof LONG_DUA_SRC !== "undefined" && LONG_DUA_SRC[l[0]] ? `<p class="p-src"><b>Source:</b> ${esc(LONG_DUA_SRC[l[0]])}</p>` : ""}</div>`).join("");
    observeReveals($("#namaz-dua"));
    // tasbih counter
    const phases = [["Allahu Akbar", "اللّٰهُ أَكْبَرُ", 34], ["Alhamdulillah", "الْحَمْدُ لِلّٰهِ", 33], ["Subhanallah", "سُبْحَانَ اللّٰهِ", 33]];
    let ph = 0, n = 0;
    const draw = () => {
      $("#tsPhase").textContent = ph < 3 ? phases[ph][0] : "Complete · may Allah accept";
      $("#tsAr").textContent = ph < 3 ? phases[ph][1] : "تَقَبَّلَ اللّٰهُ";
      $("#tsCount").textContent = ph < 3 ? n : "✓";
      $("#tsOf").textContent = ph < 3 ? "of " + phases[ph][2] : "100";
      const total = phases.slice(0, Math.min(ph, 3)).reduce((a, p) => a + p[2], 0) + (ph < 3 ? n : 0);
      $("#tsBar").style.width = total + "%";
    };
    $("#tsBtn").addEventListener("click", () => {
      if (ph >= 3) { ph = 0; n = 0; draw(); return; }
      n++;
      if (navigator.vibrate) try { navigator.vibrate(n === phases[ph][2] ? 60 : 12); } catch { /* ignore */ }
      if (n >= phases[ph][2]) { ph++; n = 0; }
      draw();
    });
    $("#tsReset").addEventListener("click", () => { ph = 0; n = 0; draw(); });
    draw();
  }

  /* ---------- Imam profiles ---------- */
  function openImam(i) {
    const m = MASUMIN[i]; if (!m) return;
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null; setMode("lesson");
    reader.style.setProperty("--c", "#b9822e");
    $("#rEra").textContent = i < 2 ? (i === 0 ? "The Prophet" : "Lady of the Worlds") : "Imam " + m.n;
    $("#rArabic").textContent = "";
    $("#rTitle").textContent = m.name + (i === 0 ? " ﷺ" : i === 1 ? " (SA)" : " (AS)");
    $("#rMeta").textContent = m.title;
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback"); $("#rCredit").textContent = "";
    paint(img, IMAM_IMAGES[m.name], $("#rCredit"), SZ.big);
    $("#rBack").hidden = false; $("#rBack").href = "#masumin"; $("#rBack").textContent = "← The Fourteen Ma'sumin";
    const lid = PROFILE.lessons[i], L = lid && LESSONS_LIB[lid], LS = LESSONS[m.name];
    const pearls = PEARLS.filter(p => p.who === PROFILE.pearlWho[i] && !p.nb);
    const wr = WRONGED.find(w => w.who.endsWith(m.name.split(" ").slice(-1)[0]) || w.who.includes(m.name.replace("Muhammad ", "")));
    const prev = MASUMIN[i - 1], next = MASUMIN[i + 1];
    const LF = typeof LIVES !== "undefined" && LIVES[i];
    const lifeHTML = LF ? `<p class="lf-intro">${esc(LF.intro)}</p>
      <ol class="lf-tl">${LF.ch.map((c, k) => `<li><span class="lf-dot">${k + 1}</span><h4>${esc(c[0])}</h4>${c[1]}</li>`).join("")}</ol>
      ${LF.teach ? `<h4 class="pf-h">The Prophet's teachings</h4><div class="lf-teach">${LF.teach.map(t => `<div><b>${esc(t[0])}</b><p>${esc(t[1])}</p><small>${esc(t[2])}</small></div>`).join("")}</div>` : ""}
      <h4 class="pf-h">What we learn</h4><ol class="lf-learn">${LF.learn.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
      <p class="r-sources"><b>Shia sources:</b> ${esc(LF.src)}</p>` : "";
    $("#rLessonView").innerHTML = `
      <table class="facts"><tr><td>Born</td><td>${esc(m.born)}</td></tr><tr><td>${i === 13 ? "Now" : "Died / martyred"}</td><td>${esc(m.died)}</td></tr><tr><td>Age</td><td>${esc(m.age)}</td></tr><tr><td>Rulers of the time</td><td>${esc(m.rulers)}</td></tr>${typeof SHRINES !== "undefined" && SHRINES[i] ? `<tr><td>${i === 13 ? "Grave" : "Resting place"}</td><td><b>${esc(SHRINES[i][0])}</b><br>${esc(SHRINES[i][1])}<br><a href="#lib/ziyarat/${SHRINES[i][2]}" style="color:var(--gold)">Recite the ziyarat →</a></td></tr>` : ""}</table>
      ${LF ? `<div class="q-top lf-seg"><div class="q-seg"><button data-lv="life" class="on">Life story</button><button data-lv="more">Lessons & pearls</button></div></div><div class="lf-pane" data-pane="life">${lifeHTML}</div><div class="lf-pane" data-pane="more" hidden>` : "<div>"}
      <p class="r-summary">${esc(m.note)}</p>
      ${L ? `<div class="r-content">${L.body.replace(/<table class="facts">[\s\S]*?<\/table>/, "")}</div>` : ""}
      ${LS ? `<h4 class="pf-h">What we learn</h4><p class="l-teach">${esc(LS.teach)}</p><div class="l-grid">${LS.items.map((it, k) => `<div class="l-item" style="animation-delay:${.1 + k * .1}s"><b><i>${k + 1}</i>${esc(it[0])}</b><p>${esc(it[1])}</p></div>`).join("")}</div>` : ""}
      ${pearls.length ? `<h4 class="pf-h">Divine pearls</h4>${pearls.map(pearlCard).join("").replace(/ reveal/g, "")}` : ""}
      <h4 class="pf-h">Stories</h4><div class="l-rel">${PROFILE.stories[i].map(sid => `<a href="#story/${sid}">${esc(storyById[sid].title)}</a>`).join("")}</div>
      ${wr && i > 0 ? `<h4 class="pf-h">Who wronged ${i === 1 ? "her" : "him"}</h4><p class="wr-p">${esc(wr.by)}</p>` : ""}
      ${L ? `<a class="btn btn-gold" href="#lesson/${lid}" style="margin-top:1rem">Take the lesson & quiz →</a>` : ""}
      </div>
      <nav class="r-nav">
        <button class="r-nav-btn" ${prev ? "" : "disabled"} onclick="location.hash='imam/${i - 1}'"><small>Previous</small><span>${prev ? esc(prev.name) : ""}</span></button>
        <button class="r-nav-btn" ${next ? "" : "disabled"} onclick="location.hash='imam/${i + 1}'"><small>Next</small><span>${next ? esc(next.name) : ""}</span></button>
      </nav>`;
    $$("#rLessonView .lf-seg button").forEach(b => b.onclick = () => {
      $$("#rLessonView .lf-seg button").forEach(x => x.classList.toggle("on", x === b));
      $$("#rLessonView .lf-pane").forEach(pn => pn.hidden = pn.dataset.pane !== b.dataset.lv);
    });
    showReader(m.name);
  }
  function paintBanners() {
    $$(".sec-banner[data-wiki]").forEach(b => {
      const credit = $(".photo-credit", b);
      new IntersectionObserver(([e], o) => {
        if (!e.isIntersecting) return; o.disconnect();
        wikiImage(b.dataset.wiki, SZ.big).then(info => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(info); im.onerror = rej; im.src = info.src; }))
          .then(info => { b.style.backgroundImage = `url("${info.src}")`; credit.innerHTML = `Photo: <a href="${esc(info.page)}" target="_blank" rel="noopener">${esc(info.name)}</a> · Wikimedia Commons`; }).catch(() => {});
      }, { rootMargin: "400px" }).observe(b);
    });
  }


  /* ===========================================================
     APP SHELL: tabs, screens, back
     =========================================================== */
  const TAB_TITLES = { home: "Home", prayer: "Prayer", prepare: "Preparing", quran: "The Holy Qur'an", duas: "Duas & Ziyarat", learn: "Learn" };
  const SUB_TITLES = { proofs: "The Proofs", timeline: "Timeline", stories: "Stories", battles: "Battles of Imam Ali", haq: "Fatima's Haq", karbala: "Karbala", abbas: "Moula Abbas", rulers: "The Caliphs", wronged: "Who Wronged Them", masumin: "The 14 Ma'sumin", lessons: "Lessons of the Fourteen", pearls: "Divine Pearls", companions: "Companions", dates: "Key Dates", reading: "Books", calendar: "Shia Calendar", settings: "Settings", "namaz-guide": "How to Pray", qa: "Q & A", favs: "Favourites", today: "Today", support: "Support & Charity" };
  const PARENT = { calendar: "home", settings: "home", "namaz-guide": "prayer", favs: "home", today: "home", support: "home" };
  const allSections = $$("section[data-screen]");
  const footerEl = $(".footer");
  let screenHash = "", appNav = 0;
  const scrollMem = {};
  function showScreen(tab, sub) {
    const nextHash = sub ? "#/s/" + sub : "#/" + tab;
    if (screenHash) scrollMem[screenHash] = window.scrollY;
    const changed = nextHash !== screenHash;
    screenHash = nextHash;
    allSections.forEach(sec => {
      const vis = sub ? sec.id === sub : sec.dataset.screen === tab;
      sec.hidden = !vis;
      if (vis && changed) { sec.classList.remove("screen-in"); void sec.offsetWidth; sec.classList.add("screen-in"); }
    });
    if (footerEl) footerEl.hidden = !!sub || tab !== "home";
    document.body.classList.toggle("scr-sub", !!sub);
    document.body.classList.toggle("scr-tab", !sub && tab !== "home");
    $("#abTitle").textContent = sub ? (SUB_TITLES[sub] || "") : TAB_TITLES[tab];
    const activeTab = sub ? (PARENT[sub] || "learn") : tab;
    $$("#tabbar a").forEach(a => a.classList.toggle("on", a.dataset.tab === activeTab));
    if (changed) window.scrollTo(0, scrollMem[screenHash] || 0);
    document.title = (sub ? SUB_TITLES[sub] : TAB_TITLES[tab]) + " · Musafir";
    onScreen(tab, sub);
    setTimeout(measure, 50);
  }
  function shellRoute(h) {
    if (!h || h === "#" || h === "#/" || h === "#top") { history.replaceState(history.state, "", location.pathname + location.search + "#/home"); return showScreen("home"); }
    if (h.startsWith("#/s/")) { const id = h.slice(4); if ($("#" + id)) return showScreen(PARENT[id] || "learn", id); return showScreen("home"); }
    if (h.startsWith("#/")) { const t = h.slice(2); return showScreen(TAB_TITLES[t] ? t : "home"); }
    const el = document.getElementById(h.slice(1));
    if (!el) return showScreen("home");
    const sec = el.closest("section[data-screen]");
    if (!sec) return showScreen("home");
    const canon = sec.dataset.screen === "sub" ? "#/s/" + sec.id : "#/" + sec.dataset.screen;
    history.replaceState(history.state, "", location.pathname + location.search + canon);
    if (sec.dataset.screen === "sub") showScreen(PARENT[sec.id] || "learn", sec.id); else showScreen(sec.dataset.screen);
    if (el !== sec) setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
  }
  /* ---------- Back navigation ----------
     Every in-app history entry is stamped {d: depth, b: depth of the last
     full screen}. So we always know whether "back" stays inside the app,
     and the reader's ✕ can return to the exact screen it was opened from
     instead of leaving duplicate entries behind. */
  const isOverlayHash = h => /^#(story|chapter|learn|lesson|imam|quran|lib)\//.test(decodeURIComponent(h || ""));
  let navDepth = 1, navBase = 1;
  const stampNav = () => { try { history.replaceState({ d: navDepth, b: navBase }, ""); } catch { /* ignore */ } };
  (() => { const st = history.state;
    if (st && st.d) { navDepth = st.d; navBase = st.b || 0; }
    else { navDepth = 1; navBase = isOverlayHash(location.hash) ? 0 : 1; stampNav(); } })();
  addEventListener("hashchange", () => {
    appNav++;
    const st = history.state;
    if (st && st.d) { navDepth = st.d; navBase = st.b || 0; return; }
    navDepth++; if (!isOverlayHash(location.hash)) navBase = navDepth; stampNav();
  });
  function closeReaderBack() {
    if (navBase >= 1 && navDepth > navBase && isOverlayHash(location.hash)) history.go(navBase - navDepth);
    else closeStory();
  }
  let exitAt = 0;
  function goBack(hardware) {
    if (modal.classList.contains("open")) return closeAppModal();
    if (!$("#qSheet").hidden) return qCloseSheet();
    const readerOpen = reader.classList.contains("open");
    if (hardware && !readerOpen && screenHash === "#/home") {
      if (Date.now() - exitAt < 2000 && APP_PLUGIN) return APP_PLUGIN.exitApp();
      exitAt = Date.now(); return toast("Press back again to exit");
    }
    if (navDepth > 1) return history.back();
    if (readerOpen) return closeStory();
    const sub = screenHash.startsWith("#/s/") ? screenHash.slice(4) : null;
    location.hash = sub ? "#/" + (PARENT[sub] || "learn") : "#/home";
  }
  $("#abBack").addEventListener("click", () => goBack(false));
  /* Android hardware/gesture back: without this listener Android closes the app */
  let APP_PLUGIN = null;
  if (NATIVE) {
    try { APP_PLUGIN = (CX && CX.registerPlugin && CX.registerPlugin("App")) || (CAP.registerPlugin && CAP.registerPlugin("App")) || (CAP.Plugins && CAP.Plugins.App) || null; } catch { APP_PLUGIN = null; }
    if (APP_PLUGIN) try { APP_PLUGIN.addListener("backButton", () => goBack(true)); } catch { /* plugin missing in an old build */ }
  }
  window.__goBack = goBack; /* for testing */
  const screenInit = {};
  function onScreen(tab, sub) {
    if (tab === "home" && !sub) renderHome();
    if (tab === "prayer" && !sub) renderPrayer();
    if (tab === "quran" && !sub) loadSurahList();
    if (sub === "calendar") renderCalendar();
    if (sub === "settings") renderSettings();
    if (sub === "namaz-guide" && window.NamazGuide) { NamazGuide.render(); store.set("abp-gs-ng", 1); markDay(); }
    if (sub === "qa") renderQA();
    if (sub === "favs") renderFavs();
    if (sub === "today") renderToday();
    if (sub === "support") renderSupport();
    if (tab === "duas" && !sub) { renderLibHome(); renderStreaks(); }
    if (tab === "prepare" && !sub) renderPrepare();
    if (sub === "timeline") tlProgress();
  }

  /* ---------- icons ---------- */
  const IC = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    book: '<path d="M4 5c3-1.5 5.5-1.5 8 0v15c-2.5-1.5-5-1.5-8 0zM20 5c-3-1.5-5.5-1.5-8 0v15c2.5-1.5 5-1.5 8 0z"/>',
    hands: '<path d="M7 11V6a2 2 0 0 1 4 0v4M11 10V5a2 2 0 0 1 4 0v6M15 11V8a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-1a6 6 0 0 1-6-6v-2a2 2 0 0 1 4 0"/>',
    beads: '<circle cx="12" cy="5" r="2"/><circle cx="6.5" cy="9" r="2"/><circle cx="17.5" cy="9" r="2"/><circle cx="8" cy="15.5" r="2"/><circle cx="16" cy="15.5" r="2"/><path d="M12 17.5v4"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    scroll: '<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2z"/><path d="M6 4a2 2 0 0 0-2 2v2h2M10 9h6M10 13h6"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    flag: '<path d="M5 21V4M5 4c4-2 7 2 11 0v8c-4 2-7-2-11 0"/>',
    star: '<path d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7L6.8 18l1-5.8L3.6 8.1l5.8-.8z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    gem: '<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 18 3-18"/>',
    sword: '<path d="M14 4l6 0 0 6-9 9-3-3z"/><path d="M5 16l3 3M4 20l2-2"/>',
    scale: '<path d="M12 3v18M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM8 21h8"/>',
    line: '<path d="M4 12h16M7 8v8M12 6v12M17 9v6"/>',
    users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2 1-4 4-4 2 0 3 1.5 3 4"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    lamp: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
    books: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 3 15-3.5 1z"/>',
    count: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M9 13h2M13 13h2M9 17h2M13 17h2"/>',
    pray: '<rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M9 21v-7a3 3 0 0 1 6 0v7M9 7h6"/>',
    qa: '<path d="M4 5h16v11H9l-4 4v-4H4z"/><path d="M10 9a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6 1v.4M12 14.2v.3"/>',
    heart: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>'
  };
  const ico = k => `<svg viewBox="0 0 24 24">${IC[k]}</svg>`;
  const tile = (href, icon, label, cls = "") => `<a class="tile ${cls}" href="${href}"><i>${ico(icon)}</i><span>${label}</span></a>`;


  /* ===========================================================
     DU'A & ZIYARAT LIBRARY (full Arabic texts, loaded on demand)
     =========================================================== */
  const libCache = {};
  const libCat = id => typeof LIB !== "undefined" && LIB.find(c => c.id === id);
  const libMins = n => Math.max(1, Math.round(n / 900));
  async function libData(cid) {
    if (libCache[cid]) return libCache[cid];
    const r = await fetch(`data/lib/${cid}.json?v=1`); if (!r.ok) throw new Error("load");
    return (libCache[cid] = await r.json());
  }
  function renderLibHome() {
    if (typeof LIB === "undefined" || !$("#libCats")) return;
    $("#libCats").innerHTML = LIB.map(c => `<a class="lib-cat" href="#lib/${c.id}"><span><b>${esc(c.name)}</b><small>${esc(c.desc)}</small></span><em>${c.items.length}</em></a>`).join("");
  }
  function libSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { $("#libResults").innerHTML = ""; $("#libCats").hidden = false; return; }
    const hits = [];
    LIB.forEach(c => c.items.forEach(it => { if ((it[1] + " " + it[2] + " " + c.name).toLowerCase().includes(q)) hits.push([c, it]); }));
    $("#libCats").hidden = true;
    $("#libResults").innerHTML = hits.length ? hits.slice(0, 40).map(([c, it]) => `<a class="lib-cat" href="#lib/${c.id}/${it[0]}"><span><b>${esc(it[1])}</b><small>${esc(c.name)}${c.arTitle ? " · " + esc(it[2]) : " · " + esc(it[2])}</small></span></a>`).join("") : `<p class="q-err">Nothing found. Try "Kumayl", "Ashura", "Friday" or "Sahifa".</p>`;
  }
  if ($("#libSearch")) $("#libSearch").addEventListener("input", e => libSearch(e.target.value));
  function openLib(cid) {
    const c = libCat(cid); if (!c) return;
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null; setMode("chapter");
    reader.style.setProperty("--c", "#1d6b4f");
    $("#rEra").textContent = "Du'a & Ziyarat";
    $("#rArabic").textContent = "";
    $("#rTitle").textContent = c.name;
    $("#rMeta").textContent = c.items.length + " texts · full Arabic";
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.add("ph-fallback"); $("#rCredit").textContent = "";
    $("#rBack").hidden = false; $("#rBack").href = "#/duas"; $("#rBack").textContent = "← Du'a library";
    $("#rChapter").innerHTML = `<p class="r-summary">${esc(c.desc)}</p>
      <ol class="ch-list lib-list">${c.items.map((it, k) => `<li style="animation-delay:${Math.min(k, 12) * .04}s"><a href="#lib/${c.id}/${it[0]}"><span class="ch-n">${k + 1}</span><span class="ch-t"><b>${esc(it[1])}</b><small>${c.arTitle ? `<span dir="rtl" lang="ar" class="lib-art">${esc(it[2])}</span>` : esc(it[2])} · ${libMins(it[3])} min</small></span></a></li>`).join("")}</ol>`;
    showReader(c.name);
  }
  async function openLibItem(cid, id) {
    const c = libCat(cid); if (!c) return;
    const k = c.items.findIndex(x => x[0] === id); if (k < 0) return;
    const it = c.items[k], prev = c.items[k - 1], next = c.items[k + 1];
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null; setMode("lesson");
    reader.style.setProperty("--c", "#1d6b4f");
    $("#rEra").textContent = c.name;
    $("#rArabic").textContent = c.arTitle ? it[2] : "";
    $("#rTitle").textContent = it[1];
    $("#rMeta").textContent = c.arTitle ? "Imam Zayn al-Abidin (AS)" : it[2];
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.add("ph-fallback"); $("#rCredit").textContent = "";
    $("#rBack").hidden = false; $("#rBack").href = "#lib/" + cid; $("#rBack").textContent = "← " + c.name;
    $("#rLessonView").innerHTML = `<p class="q-err">Loading…</p>`;
    showReader(it[1]);
    setLast(`#lib/${cid}/${id}`, "Du'a", it[1]);
    let data;
    try { data = await libData(cid); } catch { $("#rLessonView").innerHTML = `<p class="q-err">Could not load this text. Check your internet connection and try again. Once opened, it stays available offline.</p>`; return; }
    const x = data.items.find(y => y.id === id); if (!x) return;
    $("#rLessonView").innerHTML = `<div class="lib-bar"><button class="lib-btn" id="libSize">Aa</button><button class="lib-btn" id="libCopy">Copy</button>${favBtn("l:" + cid + "/" + id)}</div>
      <div class="lib-text" dir="rtl" lang="ar">${x.p.map(t => `<p>${esc(t)}</p>`).join("")}</div>
      <p class="note-small lib-src">Arabic text: ${esc(data.src)}.</p>
      <nav class="r-nav">
        <button class="r-nav-btn" ${prev ? "" : "disabled"} onclick="location.hash='lib/${cid}/${prev ? prev[0] : ""}'"><small>Previous</small><span>${prev ? esc(prev[1]) : ""}</span></button>
        <button class="r-nav-btn" ${next ? "" : "disabled"} onclick="location.hash='lib/${cid}/${next ? next[0] : ""}'"><small>Next</small><span>${next ? esc(next[1]) : ""}</span></button>
      </nav>`;
    $("#libSize").onclick = () => { const steps = [90, 100, 115, 130, 150], cur = store.get("abp-ar", 100), nx = steps[(steps.findIndex(v => v >= cur) + 1) % steps.length]; store.set("abp-ar", nx); applyArScale(); toast(`Arabic size ${nx}%`); };
    $("#libCopy").onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(it[1] + "\n\n" + x.p.join("\n\n")) : Promise.reject()).then(() => toast("Copied"), () => toast("Copy not available"));
  }

  /* ---------- favourites ---------- */
  var STAR = '<svg viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2-4.6-4.4 6.3-.9z"/></svg>';
  function favs() { return store.get("abp-favs", []); }
  function favBtn(key, label) { const on = favs().includes(key); return `<button class="fav ${on ? "on" : ""} ${label ? "fav-l" : ""}" data-fav="${key}" aria-label="${on ? "Remove from" : "Add to"} favourites">${STAR}${label ? `<span>${on ? "Saved" : label}</span>` : ""}</button>`; }
  document.addEventListener("click", e => {
    const b = e.target.closest(".fav"); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const k = b.dataset.fav, f = favs(), i = f.indexOf(k), on = i < 0;
    if (on) f.unshift(k); else f.splice(i, 1);
    store.set("abp-favs", f);
    $$(`.fav[data-fav="${k}"]`).forEach(x => { x.classList.toggle("on", on); const sp = $("span", x); if (sp) sp.textContent = on ? "Saved" : "Save"; });
    toast(on ? "Added to favourites" : "Removed from favourites");
    if (screenHash === "#/s/favs" && !on) renderFavs();
  }, true);
  function renderFavs() {
    const f = favs();
    const P = f.filter(k => k.startsWith("p:")).map(k => PEARLS[+k.slice(2)]).filter(Boolean);
    const D = f.filter(k => k.startsWith("d:")).map(k => [+k.slice(2), DUAS[+k.slice(2)]]).filter(x => x[1]);
    const LI = typeof LIB !== "undefined" ? f.filter(k => k.startsWith("l:")).map(k => { const [cid, id] = k.slice(2).split("/"), c = libCat(cid), it = c && c.items.find(x => x[0] === id); return it ? [c, it] : null; }).filter(Boolean) : [];
    const Q = typeof QA !== "undefined" ? f.filter(k => k.startsWith("q:")).map(k => QA.find(x => x.id === k.slice(2))).filter(Boolean) : [];
    $("#favBody").innerHTML = !f.length ? `<div class="fav-empty">${STAR}<p>Nothing saved yet.</p><p class="muted">Tap the star on any pearl, du'a or Q&A answer to keep it here.</p></div>` :
      (LI.length ? `<h3 class="sub-h">From the library</h3>${LI.map(([c, it]) => `<a class="lib-cat" href="#lib/${c.id}/${it[0]}"><span><b>${esc(it[1])}</b><small>${esc(c.name)}</small></span></a>`).join("")}` : "") +
      (D.length ? `<h3 class="sub-h">Du'as</h3>${D.map(([i, d]) => `<div class="dua open">${favBtn("d:" + i)}<div class="dua-h"><span><b>${esc(d.t)}</b><small>${esc(d.when)}</small></span></div><div class="dua-body" style="max-height:none"><div><p class="dua-ar" dir="rtl" lang="ar">${d.ar}</p><p class="dua-tr">${esc(d.tr)}</p><p class="dua-en">${esc(d.en)}</p></div></div></div>`).join("")}` : "") +
      (P.length ? `<h3 class="sub-h">Pearls</h3><div class="pearl-grid">${P.map(pearlCard).join("").replace(/ reveal/g, "")}</div>` : "") +
      (Q.length ? `<h3 class="sub-h">Questions & answers</h3><div class="qa-list">${Q.map(x => qaItem(x, false)).join("")}</div>` : "");
  }

  /* ---------- questions & answers ---------- */
  var qaCat = "all", qaQ = "";
  function qaItem(x, open) { return `<details class="qa-item" id="qa-${x.id}"${open ? " open" : ""}><summary><span>${esc(x.q)}</span><i></i></summary><div class="qa-a">${x.a}<p class="qa-src">Sources: ${esc(x.src)}</p>${favBtn("q:" + x.id, "Save")}</div></details>`; }
  function drawQA() {
    const q = qaQ.trim().toLowerCase();
    const list = QA.filter(x => (qaCat === "all" || x.c === qaCat) && (!q || (x.q + " " + x.a).toLowerCase().includes(q)));
    $("#qaList").innerHTML = list.map(x => qaItem(x, false)).join("") || `<p class="q-err">No question matches. Try another word.</p>`;
  }
  function renderQA() {
    if (typeof QA === "undefined") return;
    $("#qaCats").innerHTML = `<button class="chip ${qaCat === "all" ? "on" : ""}" data-c="all">All (${QA.length})</button>` + Object.keys(QA_CATS).map(k => `<button class="chip ${qaCat === k ? "on" : ""}" data-c="${k}">${QA_CATS[k]}</button>`).join("");
    $$("#qaCats .chip").forEach(c => c.onclick = () => { qaCat = c.dataset.c; renderQA(); });
    drawQA();
  }
  if ($("#qaSearch")) $("#qaSearch").addEventListener("input", e => { qaQ = e.target.value; drawQA(); });

  /* ---------- share ---------- */
  function shareText(title, text) {
    const url = location.href.split("#")[0] + (location.hash || "");
    if (navigator.share) navigator.share({ title, text, url }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text + "\n" + url).then(() => toast("Copied ✓"), () => {});
  }

  /* ===========================================================
     HIJRI DATE & SHIA CALENDAR
     =========================================================== */
  const HM = ["Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhul Qa'da", "Dhul Hijja"];
  const HM_AR = ["مُحَرَّم", "صَفَر", "رَبِيع الأَوَّل", "رَبِيع الثَّانِي", "جُمَادَى الأُولَى", "جُمَادَى الثَّانِيَة", "رَجَب", "شَعْبَان", "رَمَضَان", "شَوَّال", "ذُو القَعْدَة", "ذُو الحِجَّة"];
  const defaultAdj = 0;
  const hijriAdj = () => +store.get("abp-hadj", defaultAdj);
  let HF = null;
  try { HF = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { day: "numeric", month: "numeric", year: "numeric", timeZone: "UTC" }); if (!/islamic/.test(HF.resolvedOptions().calendar)) HF = null; } catch { HF = null; }
  if (!HF) try { HF = new Intl.DateTimeFormat("en-u-ca-islamic-nu-latn", { day: "numeric", month: "numeric", year: "numeric", timeZone: "UTC" }); } catch { HF = null; }
  function hijri(date) {
    if (!HF) return null;
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) + hijriAdj() * 864e5);
    const p = HF.formatToParts(d), g = t => parseInt((p.find(x => x.type === t) || {}).value, 10);
    return { d: g("day"), m: g("month"), y: g("year") || g("relatedYear") };
  }
  const SHIA_EVENTS = [
    [1, 1, "Islamic New Year; Muharram mourning begins", "grief", "husayn-departure"], [1, 2, "Imam Husayn arrives at Karbala", "grief", "hurr-karbala"], [1, 7, "Water of the Euphrates cut off", "grief", "hurr-karbala"],
    [1, 9, "Tasu'a: day of al-Abbas", "grief", "abbas"], [1, 10, "Ashura: martyrdom of Imam Husayn", "grief", "ashura"], [1, 25, "Martyrdom of Imam Zayn al-Abidin", "grief", "sajjad"],
    [2, 7, "Martyrdom of Imam Hasan (one report); birth of Imam al-Kazim", "grief", "hasan-poison"], [2, 20, "Arba'in", "grief", "arbain"], [2, 28, "Passing of the Prophet ﷺ and martyrdom of Imam Hasan", "grief", "usama"], [2, 29, "Martyrdom of Imam al-Rida (end of Safar)", "grief", "rida"],
    [3, 8, "Martyrdom of Imam al-Askari", "grief", "askari"], [3, 9, "Imamate of Imam al-Mahdi begins", "joy", "mahdi-birth"], [3, 17, "Birth of the Prophet ﷺ and Imam al-Sadiq", "joy", "sadiq"],
    [4, 8, "Birth of Imam al-Askari", "joy", "askari"],
    [5, 5, "Birth of Lady Zaynab", "joy", "zaynab"], [5, 13, "Martyrdom of Lady Fatima (75-day report)", "grief", "fatima-burial"],
    [6, 3, "Martyrdom of Lady Fatima (95-day report)", "grief", "fatima-burial"], [6, 13, "Passing of Umm al-Banin, mother of al-Abbas", "grief", "abbas"], [6, 20, "Birth of Lady Fatima al-Zahra", "joy", "marriage"],
    [7, 1, "Birth of Imam al-Baqir", "joy", "baqir"], [7, 3, "Martyrdom of Imam al-Hadi", "grief", "hadi-samarra"], [7, 10, "Birth of Imam al-Jawad", "joy", "jawad"], [7, 13, "Birth of Imam Ali, in the Ka'ba", "joy", "kaaba-birth"],
    [7, 25, "Martyrdom of Imam al-Kazim", "grief", "kazim"], [7, 27, "Mab'ath: the Prophet's mission begins", "joy", "dhul-ashira"],
    [8, 3, "Birth of Imam Husayn", "joy", "husayn-prophet"], [8, 4, "Birth of al-Abbas", "joy", "abbas"], [8, 5, "Birth of Imam Zayn al-Abidin", "joy", "sajjad"], [8, 15, "Birth of Imam al-Mahdi", "joy", "mahdi-birth"],
    [9, 1, "Ramadan begins", "worship", null], [9, 15, "Birth of Imam Hasan", "joy", "hasan-treaty"], [9, 19, "Imam Ali struck; first Night of Qadr", "grief", "ali-martyrdom"], [9, 21, "Martyrdom of Imam Ali", "grief", "ali-martyrdom"], [9, 23, "Night of Qadr", "worship", null],
    [10, 1, "Eid al-Fitr", "joy", null], [10, 8, "Demolition of al-Baqi (1926)", "grief", "fatima-burial"], [10, 25, "Martyrdom of Imam al-Sadiq", "grief", "sadiq"],
    [11, 11, "Birth of Imam al-Rida", "joy", "rida"], [11, 29, "Martyrdom of Imam al-Jawad", "grief", "jawad"],
    [12, 1, "Marriage of Imam Ali and Lady Fatima", "joy", "marriage"], [12, 7, "Martyrdom of Imam al-Baqir", "grief", "baqir"], [12, 9, "Day of 'Arafa", "worship", null], [12, 10, "Eid al-Adha", "joy", null],
    [12, 15, "Birth of Imam al-Hadi", "joy", "hadi-samarra"], [12, 18, "Eid al-Ghadir", "joy", "ghadir"], [12, 24, "Eid al-Mubahala", "joy", "mubahala"], [12, 25, "Revelation of Surat al-Insan", "joy", "marriage"]
  ];
  function upcomingEvents(days = 370) {
    const out = [], seen = new Set(), today = new Date(); today.setHours(0, 0, 0, 0);
    for (let i = 0; i < days; i++) {
      const dt = new Date(today.getTime() + i * 864e5), h = hijri(dt);
      if (!h) break;
      SHIA_EVENTS.forEach((e, k) => { if (e[0] === h.m && e[1] === h.d && !seen.has(k)) { seen.add(k); out.push({ e, dt, i, h }); } });
    }
    return out;
  }
  const inDays = i => i === 0 ? "Today" : i === 1 ? "Tomorrow" : `In ${i} days`;
  const gdate = d => d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  let calFilter = "all";
  let calM = 0, calSel = null;
  const evKind = e => /Eid/.test(e[2]) ? "eid" : e[3];
  function drawMonth() {
    const now = new Date(), first = new Date(now.getFullYear(), now.getMonth() + calM, 1);
    const y = first.getFullYear(), m = first.getMonth(), days = new Date(y, m + 1, 0).getDate(), start = first.getDay();
    const todayKey = now.toDateString();
    const hFirst = hijri(first), hLast = hijri(new Date(y, m, days));
    const hTitle = hFirst && hLast ? (hFirst.m === hLast.m ? `${HM[hFirst.m - 1]} ${hFirst.y}` : `${HM[hFirst.m - 1]} – ${HM[hLast.m - 1]} ${hLast.y}`) : "";
    let cells = "";
    for (let i = 0; i < start; i++) cells += `<span class="cm-cell empty"></span>`;
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d), hd = hijri(dt), evs = hd ? SHIA_EVENTS.filter(e => e[0] === hd.m && e[1] === hd.d) : [];
      const kind = evs.length ? evKind(evs[0]) : "";
      cells += `<button class="cm-cell ${kind ? "ev-" + kind : ""} ${dt.toDateString() === todayKey ? "today" : ""} ${calSel === dt.toDateString() ? "sel" : ""}" data-d="${d}"><b>${d}</b><small>${hd ? hd.d : ""}</small></button>`;
    }
    $("#calMonth").innerHTML = `<div class="cm-head"><button class="pt-arr" id="cmPrev" aria-label="Previous month">‹</button><div><b>${first.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</b><small>${hTitle}</small></div><button class="pt-arr" id="cmNext" aria-label="Next month">›</button></div>
      <div class="cm-grid">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(w => `<span class="cm-wd">${w}</span>`).join("")}${cells}</div>
      <div class="cm-legend"><span class="ev-grief">Martyrdom</span><span class="ev-joy">Birth / joy</span><span class="ev-eid">Eid</span><span class="ev-worship">Worship</span></div>
      <div class="cm-day" id="cmDay"></div>`;
    $("#cmPrev").onclick = () => { calM--; calSel = null; drawMonth(); };
    $("#cmNext").onclick = () => { calM++; calSel = null; drawMonth(); };
    const showDay = d => {
      const dt = new Date(y, m, d), hd = hijri(dt), evs = hd ? SHIA_EVENTS.filter(e => e[0] === hd.m && e[1] === hd.d) : [];
      $("#cmDay").innerHTML = `<p class="cm-dh">${dt.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}${hd ? ` · ${hd.d} ${HM[hd.m - 1]} ${hd.y}` : ""}</p>` + (evs.length ? evs.map(e => `<a class="cal-ev ${e[3]}" href="${e[4] ? "#story/" + e[4] : "#/s/calendar"}"><span class="ct"><b>${esc(e[2])}</b></span></a>`).join("") : `<p class="muted" style="font-size:.85rem">No special occasion on this day.</p>`);
    };
    $$("#calMonth .cm-cell[data-d]").forEach(c => c.onclick = () => { calSel = new Date(y, m, +c.dataset.d).toDateString(); $$("#calMonth .cm-cell.sel").forEach(x => x.classList.remove("sel")); c.classList.add("sel"); showDay(+c.dataset.d); });
    if (calM === 0) showDay(now.getDate());
  }
  function renderCalendar() {
    drawMonth();
    const h = hijri(new Date());
    $("#calToday").innerHTML = h ? `<p class="ct-ar" dir="rtl" lang="ar">${h.d} ${HM_AR[h.m - 1]} ${h.y}</p><p class="ct-h">${h.d} ${HM[h.m - 1]} ${h.y} AH</p><p class="ct-g">${new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>` : `<p class="ct-h">Hijri calendar not supported on this browser</p>`;
    $("#calChips").innerHTML = [["all", "All"], ["joy", "Celebrations"], ["grief", "Mourning"], ["worship", "Worship"]].map(c => `<button class="chip ${calFilter === c[0] ? "on" : ""}" data-f="${c[0]}">${c[1]}</button>`).join("");
    $$("#calChips .chip").forEach(c => c.onclick = () => { calFilter = c.dataset.f; renderCalendar(); });
    const ev = upcomingEvents().filter(x => calFilter === "all" || x.e[3] === calFilter);
    $("#calList").innerHTML = ev.map(x => `<li><a class="cal-ev ${x.e[3]} ${x.i === 0 ? "today" : ""}" href="${x.e[4] ? "#story/" + x.e[4] : "#/s/calendar"}">
      <span class="cd"><b>${x.e[1]}</b><small>${HM[x.e[0] - 1]}</small></span>
      <span class="ct"><b>${esc(x.e[2])}</b><small>${gdate(x.dt)}</small></span>
      <span class="cin">${inDays(x.i)}</span></a></li>`).join("");
  }

  /* ===========================================================
     PRAYER TIMES (Ja'fari: Fajr 16°, Maghrib 4°, Isha 14°)
     =========================================================== */
  const CITIES = [
    ["Mumbai", 19.076, 72.8777, 5.5], ["Delhi", 28.6139, 77.209, 5.5], ["Lucknow", 26.8467, 80.9462, 5.5], ["Hyderabad", 17.385, 78.4867, 5.5], ["Kolkata", 22.5726, 88.3639, 5.5],
    ["Bengaluru", 12.9716, 77.5946, 5.5], ["Chennai", 13.0827, 80.2707, 5.5], ["Pune", 18.5204, 73.8567, 5.5], ["Ahmedabad", 23.0225, 72.5714, 5.5], ["Kodinar (Gir Somnath)", 20.7943, 70.7032, 5.5], ["Jaipur", 26.9124, 75.7873, 5.5],
    ["Bhopal", 23.2599, 77.4126, 5.5], ["Nagpur", 21.1458, 79.0882, 5.5], ["Patna", 25.5941, 85.1376, 5.5], ["Srinagar", 34.0837, 74.7973, 5.5], ["Kargil", 34.5539, 76.1349, 5.5],
    ["Karachi", 24.8607, 67.0011, 5], ["Lahore", 31.5204, 74.3587, 5], ["Dhaka", 23.8103, 90.4125, 6], ["Dubai", 25.2048, 55.2708, 4], ["Muscat", 23.588, 58.3829, 4],
    ["Najaf", 32.0, 44.3392, 3], ["Karbala", 32.616, 44.0249, 3], ["Baghdad", 33.3152, 44.3661, 3], ["Kuwait City", 29.3759, 47.9774, 3], ["Medina", 24.4672, 39.6111, 3], ["Mecca", 21.3891, 39.8579, 3],
    ["Qom", 34.6399, 50.8759, 3.5], ["Mashhad", 36.2605, 59.6168, 3.5], ["Tehran", 35.6892, 51.389, 3.5]
  ];
  const D2R = Math.PI / 180;
  const sinD = d => Math.sin(d * D2R), cosD = d => Math.cos(d * D2R), tanD = d => Math.tan(d * D2R);
  const asinD = x => Math.asin(x) / D2R, acosD = x => Math.acos(x) / D2R, atan2D = (y, x) => Math.atan2(y, x) / D2R, acotD = x => Math.atan(1 / x) / D2R;
  const fixN = (a, b) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
  function julian(y, m, d) { if (m <= 2) { y -= 1; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; }
  function sunPos(jd) {
    const D = jd - 2451545, g = fixN(357.529 + 0.98560028 * D, 360), q = fixN(280.459 + 0.98564736 * D, 360);
    const L = fixN(q + 1.915 * sinD(g) + 0.02 * sinD(2 * g), 360), e = 23.439 - 0.00000036 * D;
    const RA = atan2D(cosD(e) * sinD(L), cosD(L)) / 15;
    return { decl: asinD(sinD(e) * sinD(L)), eqt: q / 15 - fixN(RA, 24) };
  }
  function prayerHours(y, m, d, lat, lng, tz) {
    const jd = julian(y, m, d) - lng / (15 * 24);
    const mid = t => fixN(12 - sunPos(jd + t).eqt, 24);
    const ang = (a, t, ccw) => { const dc = sunPos(jd + t).decl, noon = mid(t); const T = acosD((-sinD(a) - sinD(dc) * sinD(lat)) / (cosD(dc) * cosD(lat))) / 15; return noon + (ccw ? -T : T); };
    const asr = t => { const dc = sunPos(jd + t).decl; return ang(-acotD(1 + tanD(Math.abs(lat - dc))), t); };
    let t = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, sunset: 18, maghrib: 18, isha: 18 };
    for (let i = 0; i < 2; i++) {
      const p = {}; for (const k in t) p[k] = t[k] / 24;
      t = { fajr: ang(16, p.fajr, true), sunrise: ang(0.833, p.sunrise, true), dhuhr: mid(p.dhuhr), asr: asr(p.asr), sunset: ang(0.833, p.sunset), maghrib: ang(4, p.maghrib), isha: ang(14, p.isha) };
    }
    for (const k in t) t[k] += tz - lng / 15;
    t.midnight = t.sunset + fixN(t.fajr - t.sunset, 24) / 2;
    return t;
  }
  const getLoc = () => store.get("abp-loc", null);
  function locTz(loc) { return loc && loc.tz != null ? loc.tz : -new Date().getTimezoneOffset() / 60; }
  function dayTimes(loc, offsetDays = 0) {
    const tz = locTz(loc);
    const local = new Date(Date.now() + tz * 3600e3 + offsetDays * 864e5);
    const y = local.getUTCFullYear(), m = local.getUTCMonth() + 1, d = local.getUTCDate();
    const h = prayerHours(y, m, d, loc.lat, loc.lng, tz);
    const base = Date.UTC(y, m - 1, d);
    const ts = {}; for (const k in h) ts[k] = base + (h[k] - tz) * 3600e3;
    return { hours: h, ts };
  }
  const fmtH = hrs => { if (!isFinite(hrs)) return "—"; hrs = fixN(hrs + 0.5 / 60, 24); const H = Math.floor(hrs), M = Math.floor((hrs - H) * 60); const h12 = ((H + 11) % 12) + 1; return `${h12}:${String(M).padStart(2, "0")} ${H < 12 ? "am" : "pm"}`; };
  const PNAMES = [["fajr", "Fajr", "main"], ["sunrise", "Sunrise", "minor"], ["dhuhr", "Zuhr", "main"], ["asr", "Asr", "fadila"], ["sunset", "Sunset", "minor"], ["maghrib", "Maghrib", "main"], ["isha", "Isha", "fadila"], ["midnight", "Islamic midnight", "minor"]];
  function nextPrayer(loc) {
    const now = Date.now(), order = ["fajr", "sunrise", "dhuhr", "maghrib", "midnight"], label = { fajr: "Fajr", sunrise: "Sunrise (Fajr ends)", dhuhr: "Zuhr & Asr", maghrib: "Maghrib & Isha", midnight: "Midnight (Isha ends)" };
    for (const off of [0, 1]) { const t = dayTimes(loc, off); for (const k of order) if (t.ts[k] > now) return { k, name: label[k], ts: t.ts[k], h: t.hours[k] }; }
    return null;
  }
  const countdown = ms => { const m = Math.round(ms / 60000), h = Math.floor(m / 60); return h ? `in ${h} h ${m % 60} min` : `in ${m} min`; };
  let ptOff = 0; const IMSAK_MIN = 15;
  function renderPrayer() {
    const loc = getLoc(), box = $("#ptTimes");
    if (!loc) {
      box.innerHTML = `<h3>Prayer times</h3><p class="muted">Set your location to see today's prayer times and the Qibla (Ja'fari method).</p><div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.8rem"><button class="btn btn-gold" id="ptGeo">Use my location</button><a class="btn btn-ghost" href="#/s/settings" style="color:var(--gold);border-color:var(--gold)">Choose a city</a></div>`;
      $("#ptGeo").onclick = useGeo; $("#qbInfo").textContent = "Set your location to find the Qibla."; return;
    }
    const t = dayTimes(loc, ptOff), nx = ptOff === 0 ? nextPrayer(loc) : null, day = new Date(Date.now() + ptOff * 864e5), h = hijri(day);
    const imsak = t.hours.fajr - IMSAK_MIN / 60;
    box.innerHTML = `<div class="pt-top"><div class="pt-day"><button class="pt-arr" id="ptPrev" aria-label="Previous day">‹</button><div><h3 style="margin:0">${ptOff === 0 ? "Today" : day.toLocaleDateString(undefined, { weekday: "long" })}</h3><small>${day.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</small>${h ? `<small class="pt-hij">${h.d} ${HM[h.m - 1]} ${h.y}</small>` : ""}</div><button class="pt-arr" id="ptNext" aria-label="Next day">›</button></div><a class="pt-loc" href="#/s/settings">${esc(loc.name)} ›</a></div>
      ${ptOff !== 0 ? `<button class="pt-today" id="ptToday">Back to today</button>` : ""}
      <ul class="pt-list"><li class="minor imsak"><b>Imsak (Sehar)<small>stop eating</small></b><span>${fmtH(imsak)}</span></li>${PNAMES.map(([k, n, c]) => `<li class="${c === "minor" ? "minor" : c === "main" ? "main" : ""} ${nx && nx.k === k && nx.ts === t.ts[k] ? "next" : ""}"><b>${n}</b><span>${fmtH(t.hours[k])}</span></li>`).join("")}</ul>
      <p class="pt-foot">${nx ? `Next: <b style="color:var(--gold)">${nx.name}</b> ${countdown(nx.ts - Date.now())}. ` : ""}Ja'fari method (Fajr 16°, Maghrib 4°, Isha 14°). Imsak is ${IMSAK_MIN} minutes before Fajr: when fasting, stop eating a little before Fajr to be sure (Sayyid al-Sistani, Islamic Laws). Asr and Isha show their <b>best</b> time; you may pray Asr any time after Zuhr, and Isha any time after Maghrib, up to midnight — together or apart. Check against your marja's timetable.</p>`;
    const notifOn = store.get("abp-notify", false) && (LN || ("Notification" in window && Notification.permission === "granted"));
    box.insertAdjacentHTML("beforeend", `<div class="pt-extra">${loc.auto ? `<span class="pt-chip">Following your location</span>` : `<button class="pt-chip-b" id="ptUseGeo">Use my location instead</button>`}${(LN || "Notification" in window) ? (notifOn ? `<span class="pt-chip">Reminders on</span>` : `<button class="pt-chip-b" id="ptNotify">Turn on prayer reminders</button>`) : ""}</div>`);
    if ($("#ptUseGeo")) $("#ptUseGeo").onclick = useGeo;
    if ($("#ptNotify")) $("#ptNotify").onclick = enableReminders;
    $("#ptPrev").onclick = () => { ptOff--; renderPrayer(); };
    $("#ptNext").onclick = () => { ptOff++; renderPrayer(); };
    if ($("#ptToday")) $("#ptToday").onclick = () => { ptOff = 0; renderPrayer(); };
    updateQibla();
  }

  /* ---------- location ---------- */
  function setLoc(loc) { store.set("abp-loc", loc); renderPrayer(); renderHome(); if ($("#setLocNow")) $("#setLocNow").textContent = "Current: " + loc.name; scheduleReminders(); }
  const distKm = (a, b, c, d) => { const R = 6371, dLa = (c - a) * D2R, dLo = (d - b) * D2R, x = Math.sin(dLa / 2) ** 2 + Math.cos(a * D2R) * Math.cos(c * D2R) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
  function placeName(lat, lng) {
    let best = null, bd = 1e9;
    CITIES.forEach(c => { const d = distKm(lat, lng, c[1], c[2]); if (d < bd) { bd = d; best = c; } });
    return bd < 8 ? best[0] : bd < 60 ? "Near " + best[0] : "My location";
  }
  function geoLoc(p) { const lat = +p.coords.latitude.toFixed(4), lng = +p.coords.longitude.toFixed(4); return { name: placeName(lat, lng), lat, lng, tz: null, auto: true }; }
  function useGeo() {
    if (!navigator.geolocation) { toast("Location is not available on this device"); return; }
    toast("Finding your location…");
    navigator.geolocation.getCurrentPosition(p => {
      const l = geoLoc(p); setLoc(l);
      toast(`Location set: ${l.name}. It will update by itself when you travel.`);
    }, () => toast("Location permission denied. Choose a city in Settings."), { timeout: 12000, maximumAge: 6e5 });
  }
  /* when the user chose "Use my location", quietly follow them when they travel (no new permission prompt) */
  let lastAuto = 0;
  async function autoLocate(force) {
    const loc = getLoc();
    if (!loc || !loc.auto || !navigator.geolocation || (!force && Date.now() - lastAuto < 20 * 60e3)) return;
    lastAuto = Date.now();
    try { if (navigator.permissions) { const st = await navigator.permissions.query({ name: "geolocation" }); if (st.state !== "granted") return; } } catch { return; }
    navigator.geolocation.getCurrentPosition(p => {
      const l = geoLoc(p), cur = getLoc();
      if (cur && cur.auto && distKm(cur.lat, cur.lng, l.lat, l.lng) > 10) { setLoc(l); toast(`You are now in ${l.name.replace("Near ", "near ")}. Prayer times and Qibla updated.`); }
    }, () => {}, { timeout: 15000, maximumAge: 15 * 60e3 });
  }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") autoLocate(); });

  /* ---------- qibla & shrine compass ---------- */
  const KAABA = [21.4225, 39.8262];
  const QTARGETS = [
    ["qibla", "Qibla", "The Ka'ba, Mecca", 21.4225, 39.8262, ""],
    ["karbala", "Karbala", "Imam al-Husayn (AS)", 32.6164, 44.0324, "#lib/ziyarat/warith"],
    ["najaf", "Najaf", "Imam Ali (AS)", 31.9961, 44.3148, "#lib/ziyarat/amin-allah"],
    ["madinah", "Madinah", "The Prophet ﷺ and al-Baqi'", 24.4672, 39.6111, "#lib/ziyarat/prophet-far"],
    ["mashhad", "Mashhad", "Imam al-Rida (AS)", 36.2878, 59.6158, "#lib/ziyarat/rida"],
    ["kadhimiya", "Kadhimiya", "Imam al-Kazim & Imam al-Jawad (AS)", 33.3797, 44.3374, "#lib/ziyarat/kazim"],
    ["samarra", "Samarra", "Imam al-Hadi & Imam al-Askari (AS)", 34.1989, 43.8737, "#lib/ziyarat/askari"],
    ["qom", "Qom", "Lady Fatima al-Ma'suma (SA)", 34.6416, 50.8790, "#lib/ziyarat/masuma"],
    ["zaynab", "Damascus", "Lady Zaynab (SA)", 33.4447, 36.3411, ""]
  ];
  let qT = QTARGETS.find(t => t[0] === store.get("abp-qtarget", "qibla")) || QTARGETS[0];
  function bearingTo(lat, lng, tlat, tlng) {
    const p1 = lat * D2R, p2 = tlat * D2R, dl = (tlng - lng) * D2R;
    return (Math.atan2(Math.sin(dl), Math.cos(p1) * Math.tan(p2) - Math.sin(p1) * Math.cos(dl)) / D2R + 360) % 360;
  }
  function qiblaBearing(lat, lng) { return bearingTo(lat, lng, qT[3], qT[4]); }
  const KAABA_SVG = $("#qbNeedle .qb-kaaba") ? $("#qbNeedle .qb-kaaba").outerHTML : "";
  const DOME_SVG = `<svg viewBox="0 0 64 64" class="qb-kaaba qb-dome" aria-label="Shrine"><path d="M12 54h40v4H12z" fill="#a97c2a"/><path d="M16 54V38h32v16z" fill="#e9c46a"/><path d="M14 38c0-11 8-19 18-21 10 2 18 10 18 21z" fill="#2f9e6e"/><path d="M32 6v11" stroke="#d4a94f" stroke-width="2.4"/><circle cx="32" cy="6" r="2.6" fill="#d4a94f"/><path d="M28 54v-8a4 4 0 0 1 8 0v8z" fill="#7a5718"/><path d="M6 58V30h5v28zM53 58V30h5v28z" fill="#d4a94f"/></svg>`;
  function drawQChips() {
    const box = $("#qbChips"); if (!box) return;
    box.innerHTML = QTARGETS.map(t => `<button class="${t[0] === qT[0] ? "on" : ""}" data-qt="${t[0]}">${t[1]}</button>`).join("");
    $$("#qbChips button").forEach(b => b.onclick = () => { qT = QTARGETS.find(t => t[0] === b.dataset.qt); store.set("abp-qtarget", qT[0]); wasAligned = false; drawQChips(); updateQibla(); });
    $("#qbTitle").textContent = qT[0] === "qibla" ? "Qibla" : "Towards " + qT[1];
    const mk = $("#qbNeedle .qb-kaaba"); if (mk) mk.outerHTML = qT[0] === "qibla" ? KAABA_SVG : DOME_SVG;
    $("#qbZy").innerHTML = qT[5] ? `${esc(qT[2])} · <a href="${qT[5]}">Recite the ziyarat facing it →</a>` : qT[0] === "qibla" ? "" : esc(qT[2]);
  }
  let heading = null, compassOn = false;
  let wasAligned = false, smooth = null, roseDeg = 0, needleDeg = 0;
  /* move from cur to the same angle as target by the shortest way, so the dial never spins a full circle */
  const nearAngle = (cur, target) => cur + ((((target - cur) % 360) + 540) % 360 - 180);
  function updateQibla() {
    const loc = getLoc(); if (!loc) return;
    const b = qiblaBearing(loc.lat, loc.lng);
    const rose = $("#qbRose"), needle = $("#qbNeedle"), dial = $("#qbDial");
    if (heading == null) {
      roseDeg = nearAngle(roseDeg, 0); needleDeg = nearAngle(needleDeg, b);
      rose.style.transform = `rotate(${roseDeg}deg)`; needle.style.setProperty("--r", needleDeg + "deg"); dial.classList.remove("aligned");
      $("#qbInfo").innerHTML = `${qT[0] === "qibla" ? "Qibla" : esc(qT[1])} is <b>${b.toFixed(0)}°</b> from North (clockwise) at ${esc(loc.name)} · ${Math.round(distKm(loc.lat, loc.lng, qT[3], qT[4])).toLocaleString()} km away.`; return;
    }
    const rel = ((b - heading) % 360 + 360) % 360;
    /* the letters turn against the phone; the Ka'ba needle points to the Qibla relative to the top of the phone */
    roseDeg = nearAngle(roseDeg, -heading); needleDeg = nearAngle(needleDeg, rel);
    rose.style.transform = `rotate(${roseDeg}deg)`; needle.style.setProperty("--r", needleDeg + "deg");
    const diff = Math.abs(((rel + 180) % 360) - 180), aligned = diff < 5;
    dial.classList.toggle("aligned", aligned);
    const tgt = qT[0] === "qibla" ? "the Qibla" : esc(qT[1]), mark = qT[0] === "qibla" ? "the Ka'ba" : esc(qT[1]);
    $("#qbInfo").innerHTML = aligned ? `<b style="color:#2fbf86">You are facing ${tgt}</b>` : `Turn ${rel < 180 ? "right" : "left"} until ${mark} reaches the top · ${diff.toFixed(0)}° away<br><small>${qT[0] === "qibla" ? "Qibla" : esc(qT[1])} is ${b.toFixed(0)}° from North · ${Math.round(distKm(loc.lat, loc.lng, qT[3], qT[4])).toLocaleString()} km away</small>`;
    if (aligned && !wasAligned && navigator.vibrate) try { navigator.vibrate([40, 60, 40]); } catch { /* ignore */ }
    wasAligned = aligned;
  }
  let gotAbsolute = false;
  function onOrient(e) {
    let hd = null;
    if (typeof e.webkitCompassHeading === "number" && !isNaN(e.webkitCompassHeading)) hd = e.webkitCompassHeading; /* iPhone: already true heading */
    else if (e.alpha != null && (e.absolute || e.type === "deviceorientationabsolute")) {
      if (e.type === "deviceorientationabsolute") gotAbsolute = true;
      else if (gotAbsolute) return; /* prefer the absolute event when the phone gives both */
      hd = 360 - e.alpha;
    }
    if (hd == null) return;
    const so = (screen.orientation && typeof screen.orientation.angle === "number") ? screen.orientation.angle : (typeof window.orientation === "number" ? window.orientation : 0);
    hd = ((hd + so) % 360 + 360) % 360;
    smooth = smooth == null ? hd : ((nearAngle(smooth, hd) - smooth) * 0.35 + smooth + 360) % 360;
    heading = smooth; updateQibla();
  }
  $("#qbStart").addEventListener("click", async () => {
    if (!getLoc()) { useGeo(); return; }
    try { if (typeof DeviceOrientationEvent !== "undefined" && DeviceOrientationEvent.requestPermission) { const r = await DeviceOrientationEvent.requestPermission(); if (r !== "granted") { toast("Compass permission denied"); return; } } } catch { /* ignore */ }
    if (!compassOn) { addEventListener("deviceorientationabsolute", onOrient); addEventListener("deviceorientation", onOrient); compassOn = true; }
    $("#qbStart").textContent = "Compass on · hold phone flat";
    setTimeout(() => { if (heading == null) $("#qbInfo").innerHTML += "<br><small>No compass found on this device; use the degrees shown.</small>"; }, 2500);
  });

  /* ---------- qaza tracker ---------- */
  const QZ = [["fajr", "Fajr", 2], ["zuhr", "Zuhr", 4], ["asr", "Asr", 4], ["maghrib", "Maghrib", 3], ["isha", "Isha", 4], ["ayat", "Ayat", 2]];
  function qzDraw() {
    const q = store.get("abp-qaza", {}), tot = QZ.reduce((a, [k]) => a + (q[k] || 0), 0);
    $("#qzList").innerHTML = QZ.map(([k, n, r]) => `<div class="qz-row"><span><b>${n}</b><small>${r} rak'at</small></span><button data-k="${k}" data-v="-1" aria-label="Prayed one ${n}">−</button><output>${q[k] || 0}</output><button data-k="${k}" data-v="1" aria-label="Add a missed ${n}">+</button></div>`).join("") + `<p class="qz-tot">${tot ? `<b>${tot}</b> prayers left to make up` : "Nothing to make up. Alhamdulillah."}</p>`;
    $$("#qzList button").forEach(b => b.onclick = () => { const q2 = store.get("abp-qaza", {}); q2[b.dataset.k] = Math.max(0, (q2[b.dataset.k] || 0) + +b.dataset.v); store.set("abp-qaza", q2); qzDraw(); if (+b.dataset.v < 0 && navigator.vibrate) try { navigator.vibrate(25); } catch { /* ignore */ } });
  }
  if ($("#qzList")) {
    qzDraw();
    $("#qzDay").onclick = () => { const q = store.get("abp-qaza", {}); ["fajr", "zuhr", "asr", "maghrib", "isha"].forEach(k => q[k] = (q[k] || 0) + 1); store.set("abp-qaza", q); qzDraw(); toast("Added one full day (5 prayers)"); };
    $("#qzReset").onclick = () => { if (confirm("Clear the qaza tracker?")) { store.set("abp-qaza", {}); qzDraw(); } };
  }

  /* ---------- rak'at counter ---------- */
  let rkTotal = 4, rkS = 0; const rkHist = [];
  function rkDraw() {
    const done = rkS >= rkTotal * 2, k = Math.floor(rkS / 2), odd = rkS % 2 === 1;
    $("#rkRakat").textContent = done ? "✓" : String(k + 1);
    let sub = `Rak'at ${k + 1} · `, hint = "";
    if (done) { sub = "Prayer complete"; hint = "Recite the tashahhud and salam, then the Tasbih of Fatima."; }
    else if (odd) { sub += "now the second sajda"; hint = "Tap again after your second sajda."; }
    else if (rkS === 0) { sub += "tap after each sajda"; hint = "Place your phone beside your sajdagah and tap after every sajda."; }
    else if (k === 1) { sub += "stand for rak'at 2"; hint = rkTotal === 2 ? "" : ""; hint = rkTotal === 2 ? "" : ""; hint = "Stand up. Recite al-Fatiha and a sura, then qunut before ruku'."; }
    else if (k === 2) { sub = "Tashahhud, then rak'at 3"; hint = "Sit for tashahhud (no salam), then stand. Recite Tasbihat al-Arba'a."; }
    else if (k === 3) { sub = "Stand for rak'at 4"; hint = "Recite Tasbihat al-Arba'a. After this rak'at: tashahhud and salam."; }
    if (!done && k === 1 && rkTotal === 2 && !odd) { sub = "Rak'at 2"; }
    $("#rkSub").textContent = sub; $("#rkHint").textContent = hint;
    $("#rkTap").classList.toggle("alert", done || (!odd && rkS > 0 && k === 2));
  }
  $("#rkTap").addEventListener("click", () => { if (rkS >= rkTotal * 2) return; rkHist.push(rkS); rkS++; if (navigator.vibrate) try { navigator.vibrate(rkS % 2 ? 15 : 45); } catch { /* ignore */ } rkDraw(); });
  $("#rkUndo").addEventListener("click", () => { if (rkHist.length) rkS = rkHist.pop(); rkDraw(); });
  $("#rkReset").addEventListener("click", () => { rkS = 0; rkHist.length = 0; rkDraw(); });
  $$("#rkPick button").forEach(b => b.addEventListener("click", () => { $$("#rkPick button").forEach(x => x.classList.toggle("on", x === b)); rkTotal = +b.dataset.r; rkS = 0; rkHist.length = 0; rkDraw(); }));
  rkDraw();

  /* ---------- reminders ---------- */
  let remTimers = [];
  function scheduleReminders() {
    if (LN) { nativeSchedule(); return; }
    remTimers.forEach(clearTimeout); remTimers = [];
    if ("Notification" in window && Notification.permission === "granted") {
      const nowMs = Date.now();
      customReminders().forEach(r => { const [hh, mm] = r.t.split(":").map(Number); [0, 1].forEach(off => { const at = new Date(); at.setDate(at.getDate() + off); at.setHours(hh, mm, 0, 0); const ms = at - nowMs;
        if (ms > 0 && ms < 864e5) remTimers.push(setTimeout(() => { navigator.serviceWorker && navigator.serviceWorker.ready.then(reg => reg.showNotification(r.title, { body: r.body, icon: "icons/icon-192.png", tag: "rem-" + r.title, data: { route: r.route } })).catch(() => {}); }, ms)); }); });
    }
    const loc = getLoc();
    if (!loc || !store.get("abp-notify", false) || !("Notification" in window) || Notification.permission !== "granted") return;
    const now = Date.now();
    [0, 1].forEach(off => { const t = dayTimes(loc, off); [["fajr", "Fajr"], ["dhuhr", "Zuhr"], ["maghrib", "Maghrib"]].forEach(([k, n]) => {
      const ms = t.ts[k] - now;
      if (ms > 0 && ms < 864e5) remTimers.push(setTimeout(() => {
        const body = `It is time for ${n} in ${loc.name}.`;
        navigator.serviceWorker && navigator.serviceWorker.ready.then(r => r.showNotification(n + " · Musafir", { body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", tag: "prayer-" + k })).catch(() => new Notification(n, { body }));
      }, ms));
    }); });
  }

  /* ===========================================================
     TODAY: hadith, du'a, event and a story to learn, for any date
     =========================================================== */
  const dayNo = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  function dailyPearl(d) {
    const n = dayNo(d), others = PEARLS.filter(p => !p.nb), nahj = PEARLS.filter(p => p.nb);
    const pool = n % 2 && nahj.length ? nahj : others;   // alternate: the Fourteen, then Nahj al-Balagha
    return pool[(Math.floor(n / 2) * 37) % pool.length];
  }
  function dailyDua(d) {
    if (typeof LIB === "undefined") return null;
    const pool = [];
    ["munajat", "duas", "sahifa"].forEach(cid => { const c = LIB.find(x => x.id === cid); if (c) c.items.forEach(it => { if (cid !== "sahifa" || it[0] !== "s0") pool.push([c, it]); }); });
    const [c, it] = pool[dayNo(d) % pool.length];
    return { c, it, route: `#lib/${c.id}/${it[0]}` };
  }
  function dailyStory(d) { return STORIES[(dayNo(d) * 11) % STORIES.length]; }
  function dailyEvents(d) { const h = hijri(d); return h ? SHIA_EVENTS.filter(e => e[0] === h.m && e[1] === h.d) : []; }
  /* ===========================================================
     SUPPORT & CHARITY
     =========================================================== */
  function givingLabel(id) { const g = (typeof GIVING_TYPES !== "undefined") && GIVING_TYPES.find(x => x[0] === id); return g ? g[1] : "Sadaqah"; }
  function caseCard(c) {
    return `<div class="sup-case">
      <div class="sc-top"><div><b>${esc(c.name)}</b>${c.city ? `<small>${esc(c.city)}</small>` : ""}</div><span class="sc-type">${esc(givingLabel(c.type))}</span></div>
      <span class="sc-verified">✓ Verified by our team${c.verifiedOn ? " · " + esc(c.verifiedOn) : ""}</span>
      ${c.need ? `<p class="sc-need">${esc(c.need)}</p>` : ""}
      ${c.goal ? `<p class="sc-goal">Goal: <b>${esc(c.goal)}</b></p>` : ""}
      ${c.qr ? `<img class="sup-qr-img" src="${esc(c.qr)}" alt="Payment QR" loading="lazy">` : ""}
      ${c.upi ? `<button class="sup-upi" data-copy="${esc(c.upi)}">${esc(c.upi)} · tap to copy</button>` : ""}
      ${c.phone ? `<a class="sup-phone" href="tel:${esc(c.phone)}">Call ${esc(c.phone)}</a>` : ""}
    </div>`;
  }
  function renderSupport() {
    if (typeof APP_SUPPORT === "undefined") return;
    const b = $("#supBody");
    const cases = typeof SUPPORT_CASES !== "undefined" ? SUPPORT_CASES : [];
    const appBlock = APP_SUPPORT.comingSoon
      ? `<div class="sup-soon">Coming soon, inshaAllah</div><p class="sup-note">${esc(APP_SUPPORT.note)}</p>`
      : `${APP_SUPPORT.qr ? `<img class="sup-qr-img" src="${esc(APP_SUPPORT.qr)}" alt="Support QR">` : ""}${APP_SUPPORT.upi ? `<button class="sup-upi" data-copy="${esc(APP_SUPPORT.upi)}">${esc(APP_SUPPORT.upi)} · tap to copy</button>` : ""}`;
    b.innerHTML = `
      <div class="section-head"><p class="kicker">Support</p><h2>Support &amp; charity</h2><p>Support the app, or give to someone our team has checked. The app never takes or holds your money — you pay the person or charity directly.</p></div>
      <div class="sup-card"><div class="sup-ch"><span class="sup-ic">${ico("heart")}</span><div><b>Support this app</b><small>Help keep it running and growing</small></div></div>${appBlock}</div>
      <h3 class="sub-h">Support someone in need</h3>
      <p class="sup-verifyline"><span class="sc-verified">✓ Verified by our team</span> Every person below has been checked by the team before appearing here. Please still give thoughtfully.</p>
      ${cases.length ? cases.map(caseCard).join("") : `<div class="sup-empty">${ico("heart")}<p>No verified requests right now.</p><p class="muted">When a family in need is checked and approved, their cause appears here with a verified badge.</p></div>`}
      <div class="sup-card sup-req"><b>Need help, or know someone who does?</b><p class="sup-note">Reach the team. Every case is checked before it is shown, so please share real, honest details.</p>${APP_SUPPORT.contact ? `<a class="btn btn-gold" href="${esc(APP_SUPPORT.contact)}" target="_blank" rel="noopener">Contact the team</a>` : `<p class="sup-note"><em>A contact option will be added here soon.</em></p>`}</div>
      <h3 class="sub-h">Ways of giving</h3>
      <div class="sup-types">${(typeof GIVING_TYPES !== "undefined" ? GIVING_TYPES : []).map(g => `<div class="sup-type"><b>${esc(g[1])}</b><p>${esc(g[2])}</p></div>`).join("")}</div>
      <p class="sup-disc">The app only shows information. It does not process payments, take a cut, or guarantee any cause. You give directly, at your own discretion. Khums and zakat are best given through your marja' or his representative.</p>`;
    $$("#supBody .sup-upi").forEach(btn => btn.onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(btn.dataset.copy) : Promise.reject()).then(() => toast("UPI ID copied"), () => toast("Could not copy")));
  }
  function renderToday() {
    const d = new Date(), h = hijri(d), ev = dailyEvents(d), p = dailyPearl(d), du = dailyDua(d), st = dailyStory(d), wd = d.getDay();
    const next = ev.length ? null : upcomingEvents(60)[0];
    const wdName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][wd];
    $("#todayBody").innerHTML = `
      <div class="td-date">${h ? `<p class="td-ar" dir="rtl" lang="ar">${h.d} ${HM_AR[h.m - 1]} ${h.y}</p>` : ""}<h2>${d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</h2>${h ? `<p class="td-h">${h.d} ${HM[h.m - 1]} ${h.y} AH</p>` : ""}</div>
      <div class="td-card ${ev.length ? "ev-" + evKind(ev[0]) : ""}"><p class="td-k">${ev.length ? (ev[0][3] === "grief" ? "Today we remember" : "Today we celebrate") : "Coming up"}</p>
        ${ev.length ? ev.map(e => `<h3>${esc(e[2])}</h3>${e[4] && storyById[e[4]] ? `<p>${esc(storyById[e[4]].summary)}</p><a class="td-a" href="#story/${e[4]}">Read the story →</a>` : ""}`).join("") : next ? `<h3>${esc(next.e[2])}</h3><p>${inDays(next.i)} · ${HM[next.e[0] - 1]} ${next.e[1]}</p><a class="td-a" href="#/s/calendar">Open the calendar →</a>` : `<p>No special occasion today.</p>`}</div>
      <div class="td-card"><p class="td-k">Hadith of the day</p>${p.ar ? `<p class="td-har" dir="rtl" lang="ar">${esc(p.ar)}</p>` : ""}<blockquote>“${esc(p.q)}”</blockquote><p class="td-src">${esc(p.who)} · ${esc(p.src)}</p>${favBtn("p:" + PEARLS.indexOf(p), "Save")}</div>
      ${du ? `<div class="td-card"><p class="td-k">Du'a of the day</p><h3>${esc(du.it[1])}</h3><p>${esc(du.c.arTitle ? du.it[2] : du.it[2])}</p><a class="td-a" href="${du.route}">Recite it now →</a></div>` : ""}
      <div class="td-card"><p class="td-k">Today's du'as</p><ul class="td-list"><li><a href="#lib/daily/day-${wdName.toLowerCase()}">Du'a for ${wdName}</a></li><li><a href="#lib/daily/ahd">Du'a al-'Ahd</a></li>${wd === 4 ? `<li><a href="#lib/duas/kumayl">Du'a Kumayl (Thursday night)</a></li>` : ""}${wd === 5 ? `<li><a href="#lib/duas/nudba">Du'a al-Nudba (Friday morning)</a></li><li><a href="#quran/18">Surat al-Kahf (Friday)</a></li>` : ""}<li><a href="#lib/ziyarat/ashura">Ziyarat Ashura</a></li></ul></div>
      <div class="td-card"><p class="td-k">Learn today</p><h3>${esc(st.title)}</h3><p>${esc(st.summary)}</p><a class="td-a" href="#story/${st.id}">Read the story →</a></div>`;
  }

  /* ---------- Android app: exact reminders scheduled by the phone ---------- */
  const DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  async function nativeSchedule() {
    if (!LN) return;
    try {
      const perm = await LN.checkPermissions(); if (perm.display !== "granted") return;
      const pend = await LN.getPending();
      if (pend && pend.notifications && pend.notifications.length) await LN.cancel({ notifications: pend.notifications.map(n => ({ id: n.id })) });
      const loc = getLoc(), prayerOn = store.get("abp-notify", false), duasOn = store.get("abp-n-duas", true) && prayerOn, hadithOn = store.get("abp-n-hadith", true) && prayerOn, learnOn = store.get("abp-n-learn", true) && prayerOn, now = Date.now(), list = [];
      const hon = t => (window.__honor ? window.__honor(t) : t);
      const add = (id, at, title, body, route, ch) => { title = hon(title); body = hon(body); if (at > now + 30e3) list.push({ id, title, body, largeBody: body, schedule: { at: new Date(at), allowWhileIdle: true }, channelId: ch, sound: ch === "prayer2" ? "prayer_tone.wav" : "dua_tone.wav", smallIcon: "ic_stat_notify", iconColor: "#d4af6a", extra: { route } }); };
      for (let d = 0; d < 14; d++) {
        const day = new Date(now + d * 864e5), Y = day.getFullYear(), M = day.getMonth(), D = day.getDate(), wd = day.getDay();
        const t = loc ? dayTimes(loc, d) : null;
        if (t && prayerOn) {
          add(1000 + d * 10, t.ts.fajr, "Fajr · time to pray", `Fajr has begun in ${loc.name}. It lasts until sunrise.`, "#/prayer", "prayer2");
          add(1001 + d * 10, t.ts.dhuhr, "Zuhr & Asr · time to pray", `Zuhr has begun in ${loc.name}. You may pray Zuhr and then Asr.`, "#/prayer", "prayer2");
          add(1002 + d * 10, t.ts.maghrib, "Maghrib & Isha · time to pray", `Maghrib has begun in ${loc.name}. You may pray Maghrib and then Isha.`, "#/prayer", "prayer2");
        }
        if (duasOn) {
          const morning = t ? t.ts.fajr + 25 * 60e3 : new Date(Y, M, D, 6, 0).getTime();
          add(2000 + d * 10, morning, "Morning du'as", `Du'a al-'Ahd and the du'a for ${DAYNAMES[wd]}. Begin your day with the Imam of our Time.`, "#lib/daily/ahd", "duas2");
          if (wd === 4) add(2001 + d * 10, t ? t.ts.maghrib + 70 * 60e3 : new Date(Y, M, D, 20, 0).getTime(), "Thursday night: Du'a Kumayl", "The night of Kumayl. Recite it after Isha, alone or with family.", "#lib/duas/kumayl", "duas2");
          if (wd === 5) add(2002 + d * 10, new Date(Y, M, D, 8, 30).getTime(), "Friday: Du'a al-Nudba", "Friday morning, the day of Imam al-Mahdi (AS). Recite Du'a al-Nudba and Surat al-Kahf.", "#lib/duas/nudba", "duas2");
          const du = dailyDua(day);
          if (du) add(2004 + d * 10, new Date(Y, M, D, 16, 30).getTime(), "Du'a of the day: " + du.it[1], du.c.arTitle ? "From the Sahifa Sajjadiyya of Imam Zayn al-Abidin (AS). Tap to recite." : du.it[2], du.route, "duas2");
        }
        if (hadithOn) {
          const p = dailyPearl(day), q = p.q.length > 230 ? p.q.slice(0, 227) + "…" : p.q;
          add(2005 + d * 10, new Date(Y, M, D, 10, 0).getTime(), "Hadith of the day · " + p.who.replace(/^Imam /, "Imam "), q, "#/s/today", "daily2");
        }
        if (learnOn) {
          const ev = dailyEvents(day), st = dailyStory(day);
          if (ev.length) add(2003 + d * 10, new Date(Y, M, D, 7, 30).getTime(), ev[0][3] === "grief" ? "Today we remember" : "Today we celebrate", ev.map(e => e[2]).join(" · ") + ". Tap to learn more.", ev[0][4] ? "#story/" + ev[0][4] : "#/s/today", "daily2");
          add(2006 + d * 10, new Date(Y, M, D, 20, 30).getTime(), "Learn today: " + st.title, st.summary, "#story/" + st.id, "daily2");
        }
        customReminders().forEach((r, j) => { const [hh, mm] = r.t.split(":").map(Number); add(3000 + d * 50 + j, new Date(Y, M, D, hh, mm).getTime(), r.title, r.body, r.route, "duas2"); });
      }
      if (list.length) await LN.schedule({ notifications: list });
    } catch (e) { console.warn("schedule", e); }
  }
  async function nativeEnable() {
    if (!LN) return false;
    try {
      const p = await LN.requestPermissions();
      if (p.display !== "granted") { toast("Notifications are off. Allow them for this app in your phone settings."); return false; }
      try {
        await LN.createChannel({ id: "prayer2", name: "Prayer times", description: "Reminder at the start of each prayer time", importance: 5, visibility: 1, vibration: true, sound: "prayer_tone.wav" });
        await LN.createChannel({ id: "duas2", name: "Daily du'as", description: "Morning du'as, du'a of the day, Kumayl and Nudba", importance: 4, visibility: 1, vibration: true, sound: "dua_tone.wav" });
        await LN.createChannel({ id: "daily2", name: "Hadith & today", description: "Hadith of the day, today's occasion and a story to learn", importance: 4, visibility: 1, vibration: true, sound: "dua_tone.wav" });
        ["prayer", "duas", "daily"].forEach(id => { try { LN.deleteChannel({ id }); } catch { /* ignore */ } });
      } catch { /* older Android */ }
      try {
        if (LN.checkExactNotificationSetting) {
          const ex = await LN.checkExactNotificationSetting();
          if (ex && ex.exact_alarm && ex.exact_alarm !== "granted") { toast("Allow 'Alarms & reminders' so reminders come exactly on time"); await LN.changeExactNotificationSetting(); }
        }
      } catch { /* not needed on this Android */ }
      store.set("abp-notify", true);
      await nativeSchedule();
      return true;
    } catch (e) { toast("Could not turn on reminders"); return false; }
  }
  if (LN) {
    try { LN.addListener("localNotificationActionPerformed", a => { const r = a && a.notification && a.notification.extra && a.notification.extra.route; if (r) location.hash = r; }); } catch { /* ignore */ }
    if (store.get("abp-notify", false)) setTimeout(nativeSchedule, 1200);
    if (!store.get("abp-firstrun", false)) setTimeout(async () => {
      store.set("abp-firstrun", true);
      if (!getLoc()) useGeo();
      setTimeout(() => nativeEnable().then(ok => { if (ok) { renderPrayer(); toast("Reminders on: prayer times and daily du'as"); } }), getLoc() ? 300 : 6000);
    }, 1500);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && store.get("abp-notify", false)) nativeSchedule(); });
  }

  /* ===========================================================
     HOME DASHBOARD
     =========================================================== */
  /* days the user opened something to read, pray or recite: drives the streak */
  const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  function markDay() { const k = dayKey(new Date()), days = store.get("abp-days", []); if (!days.includes(k)) { days.push(k); store.set("abp-days", days.slice(-400)); } }
  function streaks() {
    const set = new Set(store.get("abp-days", [])); let cur = 0, best = 0, run = 0;
    const d = new Date(); if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
    for (const x = new Date(d); set.has(dayKey(x)); x.setDate(x.getDate() - 1)) cur++;
    [...set].sort().forEach((k, i, a) => { const prev = i && new Date(a[i - 1] + "T12:00"), now = new Date(k + "T12:00"); run = prev && (now - prev) / 864e5 < 1.5 ? run + 1 : 1; best = Math.max(best, run); });
    return { set, cur, best: Math.max(best, cur), total: set.size };
  }
  const setLast = (h, k, t) => { store.set("abp-last", { h, k, t }); markDay(); };
  let homeTimer = null;
  const AYAT = [
    ["رَّبِّ زِدْنِي عِلْمًا", "My Lord, increase me in knowledge.", "20:114"],
    ["أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", "Surely, in the remembrance of Allah do hearts find rest.", "13:28"],
    ["إِنَّ مَعَ الْعُسْرِ يُسْرًا", "Indeed, with hardship comes ease.", "94:6"],
    ["فَاذْكُرُونِي أَذْكُرْكُمْ", "So remember Me; I will remember you.", "2:152"],
    ["وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", "Whoever puts his trust in Allah, He is enough for him.", "65:3"],
    ["لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", "Do not despair of the mercy of Allah.", "39:53"],
    ["لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", "Allah does not burden a soul beyond what it can bear.", "2:286"],
    ["إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", "Indeed, Allah is with the patient.", "2:153"],
    ["قُل لَّا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ", "Say: I ask of you no reward for it except love for my near relatives.", "42:23"],
    ["إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ", "The most noble of you with Allah is the most God-conscious of you.", "49:13"]
  ];
  const PIC = {
    fajr: '<path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 4v5m-2.5-2.5L12 4l2.5 2.5"/>',
    sunrise: '<path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 7v2M5.6 11.6l1.4 1.4M18.4 11.6 17 13"/>',
    dhuhr: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/>',
    maghrib: '<path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 4v5m-2.5-2.5L12 9l2.5-2.5"/>',
    midnight: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/><path d="M18 3v3M16.5 4.5h3"/>'
  };
  const pico = k => `<svg viewBox="0 0 24 24">${PIC[k]}</svg>`;
  function renderHome() {
    const now = new Date(), h = hijri(now), ev = upcomingEvents(60)[0], p = dailyPearl(now);
    const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
    /* 1. sheet: name + pearl */
    $("#hmSheet").innerHTML = `<div class="hm-grab"></div><div class="hm-brand"><span class="hm-logo"><svg viewBox="0 0 100 100"><g><rect x="22" y="22" width="56" height="56"/><rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)"/></g><circle cx="50" cy="50" r="12"/></svg></span><b>Musafir.</b></div><p class="hm-tag"><span dir="rtl" lang="ar">مُسَافِر</span> · a traveller on the path of the Ahl al-Bayt</p>
      <p class="hm-quote">“${esc(p.q)}” <a href="#/s/pearls">${esc(p.who)}</a></p>`;
    /* 2. prayer times */
    const loc = getLoc();
    if (loc) {
      const nx = nextPrayer(loc), t = dayTimes(loc, 0).hours;
      const order = [["fajr", "Fajr"], ["sunrise", "Sunrise"], ["dhuhr", "Zuhr"], ["maghrib", "Maghrib"], ["midnight", "Midnight"]];
      const short = { fajr: "Fajr", sunrise: "Sunrise", dhuhr: "Zuhr", maghrib: "Maghrib", midnight: "Midnight" };
      $("#hmPrayer").innerHTML = `<div class="hm-row"><span class="hm-label">Prayer times</span><a class="hm-chip" href="#/s/settings">${ico("compass")}${esc(loc.name)} ›</a></div>
        ${nx ? `<a class="hm-next" href="#/prayer"><span class="hm-nico">${pico(nx.k)}</span><span class="hm-nl"><small class="hm-in">Next · ${countdown(nx.ts - Date.now())}</small><b>${short[nx.k]}</b></span><span class="hm-nt">${fmtH(nx.h)}</span></a>` : ""}
        <div class="hm-times">${order.map(([k, n]) => `<a href="#/prayer" class="${nx && nx.k === k ? "on" : ""}">${pico(k)}<span>${n}</span><b>${fmtH(t[k]).replace(/\s?[AP]M/i, "")}</b></a>`).join("")}</div>`;
    } else $("#hmPrayer").innerHTML = `<div class="hm-row"><span class="hm-label">Prayer times</span></div><p class="hm-sub">Set your location to see today's prayer times and the Qibla.</p><a class="hm-btn" href="#/prayer">Set location <span>→</span></a>`;
    /* 3. continue */
    const last = store.get("abp-last", null);
    $("#hdContinue").innerHTML = last ? `<a class="cont" href="${last.h}"><div><small>Continue · ${esc(last.k)}</small><b>${esc(last.t)}</b></div><span class="ca">›</span></a>` : "";
    /* 4. streak */
    const st = streaks(), week = [...Array(7)].map((_, i) => { const d = new Date(now); d.setDate(d.getDate() - 6 + i); return d; });
    $("#hmStreak").innerHTML = `<div class="hm-row"><div><h3>${st.cur ? `${st.cur}-day streak` : "Start a daily streak"}</h3><p class="hm-sub">${st.cur ? "Keep it going: read, pray or recite something today." : "Open a story, a lesson, the Qur'an or a du'a for a few minutes to begin."}</p></div></div>
      <div class="hm-week">${week.map((d, i) => `<span class="${st.set.has(dayKey(d)) ? "done" : ""} ${i === 6 ? "today" : ""}"><small>${d.toLocaleDateString(undefined, { weekday: "narrow" })}</small><b>${d.getDate()}</b></span>`).join("")}</div>
      <div class="hm-stats"><div>${ico("scroll")}<b>${readSet.size}</b><span>Stories read</span></div><div>${ico("cap")}<b>${doneLessons.size}</b><span>Lessons done</span></div><div>${ico("star")}<b>${st.best}</b><span>Best streak</span></div></div>`;
    /* 5. grid */
    const card = (kicker, title, sub, icon, href, btn) => `<a class="hm-tile" href="${href}"><small>${kicker}</small><b>${title}</b><span class="hm-ts">${sub}</span><span class="hm-art">${ico(icon)}</span><span class="hm-btn">${btn} <span>→</span></span></a>`;
    $("#hmGrid").innerHTML = card("Holy Qur'an", "Qur'an", "Arabic, mushaf style", "book", "#/quran", "Start reading")
      + card("Recite", "Du'as & Ziyarat", "Mafatih & Sahifa, offline", "hands", "#/duas", "Recite")
      + card("Calendar", h ? `${h.d} ${HM[h.m - 1]}` : "Shia calendar", ev ? `${esc(ev.e[2])} · ${inDays(ev.i)}` : "Occasions of the year", "cal", "#/s/calendar", "Open")
      + card("Namaz", "How to pray", "Wudu, every prayer, step by step", "pray", "#/s/namaz-guide", "Learn");
    /* 6. getting started */
    if (!store.get("abp-gs-off", 0)) {
      const steps = [[!!loc, "Set your location", "For prayer times, Qibla and reminders.", "#/prayer"],
        [!!store.get("abp-gs-ng", 0), "Learn how to pray", "Open the Namaz guide: wudu and every prayer, step by step.", "#/s/namaz-guide"],
        [favs().length > 0, "Save something you love", "Tap the star on any pearl, du'a or answer.", "#/s/pearls"]];
      const done = steps.filter(x => x[0]).length;
      $("#hmStart").hidden = done === 3;
      $("#hmStart").innerHTML = `<button class="hm-x" id="hmX" aria-label="Hide">×</button><h3>Getting started</h3><p class="hm-sub">Three small steps to get comfortable.</p>
        <div class="hm-prog"><i style="width:${done / 3 * 100}%"></i></div><p class="hm-pc">${done} of 3 done</p>
        <ol class="hm-steps">${steps.map(x => `<li class="${x[0] ? "done" : ""}"><a href="${x[3]}"><i></i><span><b>${x[1]}</b><small>${x[2]}</small></span></a></li>`).join("")}</ol>`;
      $("#hmX").onclick = () => { store.set("abp-gs-off", 1); $("#hmStart").hidden = true; };
    } else $("#hmStart").hidden = true;
    /* 7. ayah of the day */
    const a = AYAT[doy % AYAT.length];
    $("#hmAyah").innerHTML = `<p class="hm-label">❝ Ayah of the day</p><p class="hm-ar" dir="rtl" lang="ar">${a[0]}</p><p class="hm-en">${a[1]}</p><a href="#quran/${a[2]}">Qur'an ${a[2]}</a>`;
    /* 8. explore */
    $("#hdTiles").innerHTML = [
      tile("#tasbih", "beads", "Tasbih"), tile("#qibla", "compass", "Qibla &amp; shrines", "green"), tile("#rakat", "count", "Rak'at counter", "green"), tile("#/s/stories", "scroll", "Stories"),
      tile("#/s/karbala", "flag", "Karbala", "red"), tile("#/s/abbas", "flag", "Moula Abbas", "green"), tile("#/s/haq", "scale", "Fatima's Haq"), tile("#/s/masumin", "star", "14 Ma'sumin"),
      tile("#/s/qa", "qa", "Q&A", "green"), tile("#/s/pearls", "gem", "Pearls"), tile("#/s/favs", "star", "Saved"), tile("#/s/support", "heart", "Support", "green")
    ].join("");
    clearInterval(homeTimer); homeTimer = setInterval(() => { if (screenHash === "#/home" && getLoc()) { const nx = nextPrayer(getLoc()); const el = $("#hmPrayer .hm-in"); if (nx && el) el.textContent = "Next · " + countdown(nx.ts - Date.now()); } }, 30000);
  }
  function renderLearnTiles() {
    $("#learnTiles").innerHTML = [
      tile("#/s/stories", "scroll", "Stories"), tile("#/s/timeline", "line", "Timeline"), tile("#/s/proofs", "shield", "Proofs"), tile("#/s/battles", "sword", "Battles"),
      tile("#/s/haq", "scale", "Fatima's Haq"), tile("#/s/karbala", "flag", "Karbala", "red"), tile("#/s/abbas", "flag", "Moula Abbas", "green"), tile("#/s/masumin", "star", "14 Ma'sumin"),
      tile("#/s/lessons", "lamp", "Lessons"), tile("#/s/pearls", "gem", "Pearls"), tile("#/s/rulers", "crown", "Caliphs"), tile("#/s/wronged", "alert", "What they endured", "red"),
      tile("#/s/companions", "users", "Companions"), tile("#/s/dates", "cal", "Key dates"), tile("#/s/calendar", "cal", "Calendar"), tile("#/s/reading", "books", "Books"),
      tile("#/s/qa", "qa", "Q&A", "green"), tile("#/s/namaz-guide", "pray", "How to pray", "green"), tile("#/s/favs", "star", "Favourites"), tile("#/s/today", "cal", "Today", "green")
    ].join("");
  }

  /* ===========================================================
     QUR'AN READER (alquran.cloud)
     =========================================================== */
  const QAPI = "https://api.alquran.cloud/v1";
  let surahs = store.get("abp-surahs", null);
  async function loadSurahList() {
    const last = store.get("abp-qlast", null);
    $("#qrContinue").innerHTML = last ? `<a class="cont" href="#quran/${last.n}:${last.a}"><div><small>Continue reading</small><b>${esc(last.name)} · ayah ${last.a}</b></div><span class="ca">›</span></a>` : "";
    $("#qrQuick").innerHTML = [["Yasin", "36"], ["Ayat al-Kursi", "2:255"], ["al-Rahman", "55"], ["al-Waqi'a", "56"], ["al-Mulk", "67"], ["al-Kahf", "18"], ["al-Insan", "76"], ["al-Qadr", "97"], ["al-Fatiha", "1"]].map(q => `<a href="#quran/${q[1]}">${q[0]}</a>`).join("");
    if (!surahs) {
      try { const r = await fetch(QAPI + "/surah"); const j = await r.json(); surahs = j.data.map(s => [s.number, s.englishName, s.name, s.englishNameTranslation, s.numberOfAyahs, s.revelationType]); store.set("abp-surahs", surahs); }
      catch { $("#qrList").innerHTML = `<li class="q-err">Connect to the internet once to load the Qur'an. After that, the suras you open are saved for offline reading.</li>`; return; }
    }
    drawSurahs();
  }
  function drawSurahs() {
    const q = ($("#qrSearch").value || "").toLowerCase().replace(/[-' ]/g, "");
    $("#qrList").innerHTML = surahs.filter(s => !q || String(s[0]) === q || (s[1] + s[3]).toLowerCase().replace(/[-' ]/g, "").includes(q)).map(s => `<li><a href="#quran/${s[0]}"><span class="qr-n">${s[0]}</span><span class="qr-t"><b>${esc(s[1])}</b><small>${esc(s[3])} · ${s[4]} ayat · ${s[5]}</small></span><span class="qr-ar">${s[2].replace("سُورَةُ ", "")}</span></a></li>`).join("") || `<li class="q-err">No sura found.</li>`;
  }
  $("#qrSearch").addEventListener("input", () => surahs && drawSurahs());
  const qAudio = new Audio(); let qAyat = [], qPlayAll = false, qIdx = -1, qSel = -1, qSurah = null, qSaveT = 0;
  const arNum = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
  const PLAY_I = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>', PAUSE_I = '<svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
  const qPos = () => { const p = $("#qpPos"); if (p) p.textContent = `${Math.max(qIdx, qSel, 0) + 1} / ${qAyat.length || 1}`; };
  function qMark(i, cls) { $$(".q-ay." + cls).forEach(e => e.classList.remove(cls)); const el = i >= 0 && $(`.q-ay[data-i="${i}"]`); if (el) el.classList.add(cls); return el; }
  function qBtn(playing) { const b = $("#qpPlay"); if (!b) return; b.innerHTML = playing ? PAUSE_I : PLAY_I; b.classList.toggle("on", playing); b.setAttribute("aria-label", playing ? "Pause" : "Play"); }
  function stopQuran() { qAudio.pause(); qPlayAll = false; qMark(-1, "playing"); qBtn(false); }
  function playAyah(i) {
    if (!qAyat[i] || !qAyat[i].audio) { stopQuran(); return; }
    qIdx = i; qSel = i; qPos(); qMark(-1, "sel");
    const el = qMark(i, "playing"); if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
    qAudio.src = qAyat[i].audio; qBtn(true);
    qAudio.play().catch(() => { qBtn(false); toast("Tap play again to start audio"); });
    const nx = qAyat[i + 1]; if (nx && nx.audio) { const pre = new Audio(); pre.preload = "auto"; pre.src = nx.audio; }
  }
  qAudio.addEventListener("ended", () => { if (qPlayAll && qIdx + 1 < qAyat.length) playAyah(qIdx + 1); else { qPlayAll = false; qBtn(false); qMark(-1, "playing"); } });
  qAudio.addEventListener("pause", () => qBtn(false));
  qAudio.addEventListener("play", () => qBtn(true));
  function qCloseSheet() { $("#qSheet").hidden = true; qMark(-1, "sel"); }
  function qOpenSheet(i) {
    qSel = i; qPos(); qMark(i, "sel");
    $("#qsTitle").textContent = `${qSurah.name} · ayah ${qAyat[i].num}`;
    $("#qSheet").hidden = false;
  }
  $("#qsClose").onclick = qCloseSheet;
  $("#qsPlay").onclick = () => { const i = qSel; qCloseSheet(); qPlayAll = true; playAyah(i); };
  $("#qsCopy").onclick = () => { const x = qAyat[qSel]; if (!x) return; const t = `${x.ar}\n(Qur'an ${qSurah.n}:${x.num})`; (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Copied"), () => toast("Could not copy")); qCloseSheet(); };
  $("#qsShare").onclick = () => { const x = qAyat[qSel]; if (!x) return; shareText(`${qSurah.name} ${qSurah.n}:${x.num}`, `${x.ar}\n(Qur'an ${qSurah.n}:${x.num})`); qCloseSheet(); };
  $("#qpPlay").onclick = () => {
    if (!qAyat.length) return;
    if (!qAudio.paused) { qAudio.pause(); return; }
    qCloseSheet(); qPlayAll = true;
    if (qIdx >= 0 && qAudio.src && qAudio.currentTime > 0 && !qAudio.ended && qIdx === Math.max(qSel, 0)) { qAudio.play().catch(() => {}); qMark(qIdx, "playing"); }
    else playAyah(qSel >= 0 ? qSel : 0);
  };
  $("#qpPrev").onclick = () => { const i = Math.max(0, Math.max(qIdx, qSel, 0) - 1); qCloseSheet(); if (!qAudio.paused) playAyah(i); else { qSel = i; qIdx = -1; qPos(); const el = qMark(i, "sel"); if (el) el.scrollIntoView({ block: "center", behavior: "smooth" }); } };
  $("#qpNext").onclick = () => { const i = Math.min(qAyat.length - 1, Math.max(qIdx, qSel, 0) + 1); qCloseSheet(); if (!qAudio.paused) playAyah(i); else { qSel = i; qIdx = -1; qPos(); const el = qMark(i, "sel"); if (el) el.scrollIntoView({ block: "center", behavior: "smooth" }); } };
  const AR_STEPS = [90, 100, 115, 130, 150];
  $("#qpSize").onclick = () => { const cur = store.get("abp-ar", 100); const i = AR_STEPS.findIndex(v => v >= cur); const nx = AR_STEPS[(i + 1) % AR_STEPS.length]; store.set("abp-ar", nx); applyArScale(); toast(`Arabic size ${nx}%`); };
  function qSetView(v) {
    store.set("abp-qview", v);
    const page = $("#rLessonView .q-page"); if (page) page.classList.toggle("verse", v === "verse");
    $$("#rLessonView .q-seg button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
  }
  async function openSurah(ref) {
    const [n, a] = ref.split(":").map(Number);
    if (!n || n < 1 || n > 114) return;
    if (!reader.classList.contains("open")) lastFocus = document.activeElement;
    currentId = null; setMode("lesson"); stopQuran(); qAyat = []; qIdx = -1; qSel = -1;
    reader.classList.add("is-quran"); $("#qSheet").hidden = true;
    reader.style.setProperty("--c", "#1d6b4f");
    const meta = surahs && surahs.find(s => s[0] === n);
    $("#rEra").textContent = "Sura " + n;
    $("#rArabic").textContent = meta ? meta[2] : "";
    $("#rTitle").textContent = meta ? meta[1] : "Sura " + n;
    $("#rMeta").textContent = meta ? `${meta[3]} · ${meta[4]} ayat · ${meta[5]}` : "";
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.add("ph-fallback"); $("#rCredit").textContent = "";
    $("#rBack").hidden = false; $("#rBack").href = "#/quran"; $("#rBack").textContent = "← All suras";
    $("#rLessonView").innerHTML = `<p class="q-err">Loading sura…</p>`;
    $("#qPlayer").hidden = true;
    showReader(meta ? meta[1] : "Qur'an");
    let data = null;
    try { const r = await fetch(`${QAPI}/surah/${n}/editions/quran-uthmani,ar.alafasy`); const j = await r.json(); if (j.code === 200 && j.data && j.data.length === 2) data = { ar: j.data[0], au: j.data[1] }; } catch { /* offline */ }
    if (!data) { $("#rLessonView").innerHTML = `<p class="q-err">Could not load this sura. Check your internet connection and try again.</p>`; return; }
    qSurah = { n, name: data.ar.englishName };
    qAyat = data.ar.ayahs.map((x, i) => ({ ar: x.text, audio: data.au.ayahs[i] && data.au.ayahs[i].audio, num: x.numberInSurah }));
    if (n !== 1 && n !== 9 && qAyat[0]) { const w = qAyat[0].ar.split(" "); if (w[0] && w[0].startsWith("بِسْمِ") && w.length > 4) qAyat[0].ar = w.slice(4).join(" "); }
    const view = store.get("abp-qview", "page");
    $("#rLessonView").innerHTML = `<div class="q-top">
        <div class="q-seg" role="group" aria-label="View"><button data-v="page">Page</button><button data-v="verse">Verse by verse</button></div>
      </div>
      <div class="q-frame">
        <div class="q-band"><span>${data.ar.name}</span></div>
        ${n !== 1 && n !== 9 ? `<p class="q-bism" dir="rtl" lang="ar">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>` : ""}
        <div class="q-page ${view === "verse" ? "verse" : ""}" dir="rtl" lang="ar">${qAyat.map((x, i) => `<span class="q-ay" data-i="${i}" id="qa-${x.num}" role="button" tabindex="0">${x.ar}<span class="q-num" aria-label="ayah ${x.num}">${arNum(x.num)}</span></span>`).join(" ")}</div>
      </div>
      <p class="q-hint">Tap any ayah to play, copy or share it.</p>
      <p class="note-small q-src">Uthmani text and recitation (Mishary Alafasy) from alquran.cloud.</p>`;
    qSetView(view);
    $$("#rLessonView .q-seg button").forEach(b => b.onclick = () => qSetView(b.dataset.v));
    $$("#rLessonView .q-ay").forEach(el => {
      const go = () => qOpenSheet(+el.dataset.i);
      el.addEventListener("click", go);
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    $("#qPlayer").hidden = false; qPos(); qBtn(false);
    setLast(`#quran/${n}`, "Qur'an", data.ar.englishName);
    const save = num => store.set("abp-qlast", { n, a: num, name: data.ar.englishName });
    save(a || 1);
    const onScroll = () => {
      if (!reader.classList.contains("is-quran") || !qSurah || qSurah.n !== n) { rScroll.removeEventListener("scroll", onScroll); return; }
      clearTimeout(qSaveT); qSaveT = setTimeout(() => {
        const top = rScroll.getBoundingClientRect().top + 80;
        const first = $$("#rLessonView .q-ay").find(e => e.getBoundingClientRect().bottom > top);
        if (first) save(+first.id.slice(3));
      }, 250);
    };
    rScroll.addEventListener("scroll", onScroll, { passive: true });
    if (a) setTimeout(() => { const el = $("#qa-" + a); if (el) { el.scrollIntoView({ block: "center" }); qSel = a - 1; qPos(); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 2600); } }, 80);
  }

  /* ===========================================================
     SETTINGS
     =========================================================== */
  function applyArScale() { document.documentElement.style.setProperty("--ar", store.get("abp-ar", 100) / 100); }
  applyArScale();
  function renderSettings() {
    const loc = getLoc();
    $("#setLocNow").textContent = loc ? "Current: " + loc.name : "No location set yet.";
    $("#setCity").innerHTML = `<option value="">Choose…</option>` + CITIES.map((c, i) => `<option value="${i}" ${loc && loc.name === c[0] ? "selected" : ""}>${c[0]}</option>`).join("");
    $("#setAr").value = store.get("abp-ar", 100); $("#setArVal").textContent = store.get("abp-ar", 100) + "%";
    applyTheme(store.get("abp-theme", "light"));
    $("#setHijri").value = String(hijriAdj());
    if ($("#setNDuas")) $("#setNDuas").checked = !!store.get("abp-n-duas", true);
    if ($("#setNHadith")) $("#setNHadith").checked = !!store.get("abp-n-hadith", true);
    if ($("#setNLearn")) $("#setNLearn").checked = !!store.get("abp-n-learn", true);
    const h = hijri(new Date()); $("#setHijriNow").textContent = h ? `Today: ${h.d} ${HM[h.m - 1]} ${h.y} AH` : "";
    $("#setNotify").checked = !!store.get("abp-notify", false);
  }
  $("#setGeo").addEventListener("click", useGeo);
  $("#setCity").addEventListener("change", e => { const c = CITIES[+e.target.value]; if (c) { setLoc({ name: c[0], lat: c[1], lng: c[2], tz: c[3] }); toast(c[0] + " set ✓"); } });
  $("#setAr").addEventListener("input", e => { store.set("abp-ar", +e.target.value); $("#setArVal").textContent = e.target.value + "%"; applyArScale(); });
  $$("#setTheme .tp").forEach(b => b.addEventListener("click", () => applyTheme(b.dataset.v)));
  $("#setHijri").addEventListener("change", e => { store.set("abp-hadj", +e.target.value); renderSettings(); toast("Hijri date adjusted ✓"); });
  async function enableReminders() {
    if (LN) { const ok = await nativeEnable(); if (ok) { renderPrayer(); toast("Reminders on: prayer times and daily du'as"); } return ok; }
    if (!("Notification" in window)) { toast("Notifications are not supported on this browser"); return false; }
    const p = await Notification.requestPermission();
    if (p !== "granted") { toast("Notifications were blocked. Allow them in your phone's settings for this app."); return false; }
    store.set("abp-notify", true); scheduleReminders(); renderPrayer();
    toast("Prayer reminders on");
    if (!getLoc()) toast("Now set your location");
    return true;
  }
  [["#setNHadith", "abp-n-hadith", "Hadith of the day"], ["#setNLearn", "abp-n-learn", "Today's occasion and story"]].forEach(([id, k, n]) => { if ($(id)) $(id).addEventListener("change", e => { store.set(k, e.target.checked); if (LN) nativeSchedule(); toast(n + (e.target.checked ? " on" : " off")); }); });
  if ($("#setNDuas")) $("#setNDuas").addEventListener("change", e => { store.set("abp-n-duas", e.target.checked); if (LN) nativeSchedule(); toast(e.target.checked ? "Daily du'a reminders on" : "Daily du'a reminders off"); });
  $("#setNotify").addEventListener("change", async e => {
    if (LN) { if (e.target.checked) { e.target.checked = await nativeEnable(); } else { store.set("abp-notify", false); nativeSchedule(); } return; }
    if (e.target.checked) {
      if (!("Notification" in window)) { toast("Notifications not supported here"); e.target.checked = false; return; }
      const p = await Notification.requestPermission();
      if (p !== "granted") { toast("Notifications were blocked"); e.target.checked = false; return; }
      if (!getLoc()) toast("Now set your location");
    }
    store.set("abp-notify", e.target.checked); scheduleReminders();
  });
  $("#setReset").addEventListener("click", () => {
    if (!confirm("Reset all reading progress, lessons and quiz marks?")) return;
    ["abp-read", "abp-lessons", "abp-last", "abp-qlast"].forEach(k => { try { localStorage.removeItem(k); } catch { /* ignore */ } });
    readSet = new Set(); doneLessons = new Set(); refreshEraBars(); renderLearn(); renderStories(); toast("Progress reset");
  });


  /* ===========================================================
     PREPARING: daily deeds and letters to the Imam of our time
     =========================================================== */
  const DEEDS = [
    { id: "fajr", t: "Fajr prayer on time", d: "Pray Fajr at its time, with presence of heart.", i: "clock", href: "#/prayer" },
    { id: "ahd", t: "Du'a al-'Ahd", d: "Renew your pledge to the Imam of our time each morning.", i: "hands", href: "#lib/daily/ahd", btn: "Recite" },
    { id: "tasbih", t: "Tasbih of Lady Fatima (SA)", d: "34 Allahu Akbar, 33 Alhamdulillah, 33 Subhanallah after prayer.", i: "beads", href: "#tasbih", btn: "Open counter" },
    { id: "quran", t: "Qur'an reflection", d: "A page, or ten minutes of slow, thoughtful reading.", i: "book", href: "#/quran", btn: "Open Qur'an" },
    { id: "senses", t: "Guard your tongue and eyes", d: "No backbiting, no lies and no haram looks today.", i: "shield" },
    { id: "salawat", t: "Salawat", d: "Send blessings on Muhammad and his family, 100 times if you can.", i: "gem", href: "#tasbih" },
    { id: "sadaqa", t: "A small charity", d: "Even a little, given for the safety of the Imam of our time.", i: "heart" },
    { id: "parents", t: "Kindness to parents", d: "Call them, serve them or pray for them today.", i: "users" },
    { id: "zuhr-jamaat", t: "Prayer in congregation", d: "Pray at least one prayer in jama'at.", i: "pray" }
  ];
  const deedList = () => { const custom = store.get("abp-deeds-custom", []), all = [...DEEDS, ...custom]; const ids = store.get("abp-deeds-list", ["fajr", "ahd", "tasbih", "quran", "senses"]); return ids.map(id => all.find(x => x.id === id)).filter(Boolean); };
  const deedLog = () => store.get("abp-deeds-log", {});
  const fmt12 = hm => { if (!hm) return ""; const [H, M] = hm.split(":").map(Number); return `${((H + 11) % 12) + 1}:${String(M).padStart(2, "0")} ${H < 12 ? "AM" : "PM"}`; };
  let prTab = "deeds", prCustomize = false;
  function renderPrepare(tab) {
    if (tab) prTab = tab;
    $$("#prTabs .tab").forEach(b => { b.classList.toggle("on", b.dataset.p === prTab); b.onclick = () => renderPrepare(b.dataset.p); });
    if (prTab === "letters") return renderLetters();
    const list = deedList(), log = deedLog(), today = dayKey(new Date()), done = new Set(log[today] || []), rem = store.get("abp-deeds-rem", {});
    const n = list.filter(x => done.has(x.id)).length, tot = list.length || 1;
    const full = k => { const l = log[k] || []; return list.length && list.every(x => l.includes(x.id)); };
    let run = 0; { const d = new Date(); if (!full(dayKey(d))) d.setDate(d.getDate() - 1); for (; full(dayKey(d)); d.setDate(d.getDate() - 1)) run++; }
    const week = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d; });
    const msg = n === 0 ? "Nothing ticked yet. Start with one small deed." : n < list.length ? `${n} of ${list.length} done. Keep going.` : "Every deed done today. Alhamdulillah!";
    const C = 2 * Math.PI * 44;
    const intro = store.get("abp-pr-intro", 1) ? `<div class="pr-how"><button class="hm-x" id="prHowX" aria-label="Hide">×</button><h3>How this works</h3><ol><li>Do the deeds on your list during the day.</li><li>Tap a deed to tick it off. Finish them all to complete the day.</li><li>Tap "Remind" on any deed to get a daily reminder at a time you choose.</li><li>Use "Customise list" to add or remove deeds.</li></ol></div>` : "";
    $("#prBody").innerHTML = intro + `<div class="hm-card pr-today">
        <div class="pr-top"><div class="pr-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="44" class="pr-arc" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - n / tot)}"/></svg><b>${n}/${list.length}</b></div>
        <div><small>${new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</small><h3>${msg}</h3></div></div>
        <div class="hm-week pr-week">${week.map((d, i) => { const k = dayKey(d), l = (log[k] || []).length; return `<span class="${full(k) ? "done" : l ? "part" : ""} ${i === 6 ? "today" : ""}"><small>${d.toLocaleDateString(undefined, { weekday: "narrow" })}</small><b>${d.getDate()}</b></span>`; }).join("")}</div>
        <p class="pr-streak">${ico("star")}${run ? `<b>${run}-day streak.</b> Finish every deed today to keep it.` : "Finish every deed today to start a streak."}</p></div>
      <div class="hm-row pr-head"><span class="hm-label">Today's deeds</span><button class="pr-link" id="prCust">${prCustomize ? "Done" : "Customise list"}</button></div>
      ${prCustomize ? customiseHTML() : `<div class="hm-card pr-list">${list.map(x => `<div class="pr-deed ${done.has(x.id) ? "done" : ""}" data-id="${x.id}">
          <button class="pr-tick" data-tick="${x.id}" aria-label="Tick ${esc(x.t)}"><span class="pr-ic">${ico(x.i || "star")}</span></button>
          <div class="pr-txt" data-tick="${x.id}"><b>${esc(x.t)}</b><small>${esc(x.d || "")}</small>
            ${x.href ? `<a class="pr-open" href="${x.href}">${esc(x.btn || "Open")} →</a>` : ""}</div>
          <button class="pr-rem ${rem[x.id] ? "on" : ""}" data-rem="${x.id}">${ico("clock")}${rem[x.id] ? fmt12(rem[x.id]) : "Remind"}</button></div>`).join("")}</div>`}
      <blockquote class="hm-ayah pr-quote"><p class="hm-label">❝</p><p class="hm-en">"Let each of you do what brings him closer to our love, and keep away from what brings our displeasure."</p><a>Imam al-Mahdi (AS), letter to Shaykh al-Mufid · al-Tabrisi, al-Ihtijaj</a></blockquote>`;
    if ($("#prHowX")) $("#prHowX").onclick = () => { store.set("abp-pr-intro", 0); renderPrepare(); };
    $("#prCust").onclick = () => { prCustomize = !prCustomize; renderPrepare(); };
    $$("#prBody [data-tick]").forEach(el => el.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      const id = el.dataset.tick, L = deedLog(), cur = new Set(L[today] || []);
      cur.has(id) ? cur.delete(id) : cur.add(id); L[today] = [...cur];
      const keys = Object.keys(L).sort(); while (keys.length > 400) delete L[keys.shift()];
      store.set("abp-deeds-log", L); markDay();
      if (navigator.vibrate) try { navigator.vibrate(12); } catch { /* ignore */ }
      renderPrepare(); if (cur.size === list.length && list.length) toast("Every deed done today. Alhamdulillah!");
    }));
    $$("#prBody [data-rem]").forEach(b => b.onclick = () => askTime(store.get("abp-deeds-rem", {})[b.dataset.rem], t => { const r = store.get("abp-deeds-rem", {}); if (t) r[b.dataset.rem] = t; else delete r[b.dataset.rem]; store.set("abp-deeds-rem", r); renderPrepare(); remindersChanged(); }));
    if (prCustomize) bindCustomise();
  }
  function customiseHTML() {
    const ids = store.get("abp-deeds-list", ["fajr", "ahd", "tasbih", "quran", "senses"]), all = [...DEEDS, ...store.get("abp-deeds-custom", [])];
    return `<div class="hm-card pr-list pr-cust">${all.map(x => `<label class="pr-cu"><input type="checkbox" data-cu="${x.id}" ${ids.includes(x.id) ? "checked" : ""}><span><b>${esc(x.t)}</b><small>${esc(x.d || "")}</small></span>${x.custom ? `<button data-del="${x.id}" aria-label="Delete">×</button>` : ""}</label>`).join("")}
      <form class="pr-add" id="prAdd"><input id="prNew" maxlength="60" placeholder="Add your own deed, e.g. Visit a sick friend"><button class="hm-btn" type="submit">Add</button></form></div>`;
  }
  function bindCustomise() {
    $$("#prBody [data-cu]").forEach(c => c.onchange = () => { const all = [...DEEDS, ...store.get("abp-deeds-custom", [])]; const on = new Set($$("#prBody [data-cu]").filter(x => x.checked).map(x => x.dataset.cu)); store.set("abp-deeds-list", all.filter(x => on.has(x.id)).map(x => x.id)); });
    $$("#prBody [data-del]").forEach(b => b.onclick = e => { e.preventDefault(); store.set("abp-deeds-custom", store.get("abp-deeds-custom", []).filter(x => x.id !== b.dataset.del)); store.set("abp-deeds-list", store.get("abp-deeds-list", []).filter(x => x !== b.dataset.del)); renderPrepare(); });
    $("#prAdd").onsubmit = e => { e.preventDefault(); const t = $("#prNew").value.trim(); if (!t) return; const id = "c" + Date.now(); store.set("abp-deeds-custom", [...store.get("abp-deeds-custom", []), { id, t, d: "Your own deed", i: "star", custom: 1 }]); store.set("abp-deeds-list", [...store.get("abp-deeds-list", ["fajr", "ahd", "tasbih", "quran", "senses"]), id]); renderPrepare(); };
  }
  /* small time picker sheet: cb(time | null) */
  function askTime(cur, cb) {
    const box = document.createElement("div"); box.className = "tm-sheet";
    box.innerHTML = `<div class="tm-card"><h3>Daily reminder</h3><p class="hm-sub">Choose a time. You will get a reminder every day.</p><input type="time" id="tmIn" value="${cur || "06:00"}"><div class="tm-btns">${cur ? `<button class="tm-off" id="tmOff">Turn off</button>` : ""}<button class="tm-cancel" id="tmNo">Cancel</button><button class="hm-btn" id="tmOk">Save</button></div></div>`;
    document.body.appendChild(box); const close = () => box.remove();
    box.onclick = e => { if (e.target === box) close(); };
    $("#tmNo", box).onclick = close;
    if ($("#tmOff", box)) $("#tmOff", box).onclick = () => { close(); cb(null); };
    $("#tmOk", box).onclick = () => { const v = $("#tmIn", box).value; close(); if (!v) return; cb(v); toast("Reminder set for " + fmt12(v)); askNotify(); };
  }
  /* user reminders from deeds and recitation streaks */
  function customReminders() {
    const out = [], all = [...DEEDS, ...store.get("abp-deeds-custom", [])], r = store.get("abp-deeds-rem", {});
    Object.entries(r).forEach(([id, t]) => { const x = all.find(d => d.id === id); if (x) out.push({ t, title: "Reminder · " + x.t, body: x.d || "Tap to open your deeds.", route: "#/prepare" }); });
    store.get("abp-rstreaks", []).forEach(s => { if (s.time) out.push({ t: s.time, title: "Your streak · " + s.name, body: "Recite today to keep your streak going.", route: s.href || "#/duas" }); });
    return out.slice(0, 40);
  }
  function remindersChanged() { scheduleReminders(); }
  /* ask once for notification permission, then reschedule */
  async function askNotify() {
    try {
      if (LN) { if (await nativeEnable()) scheduleReminders(); }
      else if ("Notification" in window && Notification.permission === "default") { if (await Notification.requestPermission() === "granted") scheduleReminders(); }
    } catch { /* ignore */ }
  }

  /* ---------- letters ('arida) ---------- */
  function renderLetters() {
    const letters = store.get("abp-letters", []);
    $("#prBody").innerHTML = `<div class="pr-how pr-write"><h3>Write to your Imam</h3><p>Tell Imam al-Mahdi (AS) what is on your heart: your thanks, your worries, your promises.</p>
        <details class="pr-why"><summary>Why write?</summary><p>Writing a letter of need (<i>'arida</i>) to the Imam of our time is an old Shia practice. Mafatih al-Jinan gives the words of one, to be written and placed in flowing water. Writing also helps you be honest with yourself about where you stand. Your letters here are private: they stay only on this phone.</p></details></div>
      <div class="pr-paper"><p class="pr-dear">Dear Imam of our time,</p><textarea id="prLetter" rows="9" placeholder="Your letter starts here…">${esc(store.get("abp-letter-draft", ""))}</textarea>
        <div class="tm-btns"><button class="hm-btn" id="prSave">Save letter</button></div></div>
      ${letters.length ? `<h3 class="hm-h">Your letters</h3>${letters.slice().reverse().map(l => `<details class="hm-card pr-old"><summary><b>${new Date(l.at).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</b><small>${esc(l.text.slice(0, 60))}${l.text.length > 60 ? "…" : ""}</small></summary><p>${esc(l.text).replace(/\n/g, "<br>")}</p><button class="tm-off" data-dl="${l.at}">Delete</button></details>`).join("")}` : ""}`;
    $("#prLetter").oninput = e => store.set("abp-letter-draft", e.target.value);
    $("#prSave").onclick = () => { const t = $("#prLetter").value.trim(); if (!t) return toast("Write a few words first"); store.set("abp-letters", [...letters, { at: Date.now(), text: t }]); store.set("abp-letter-draft", ""); markDay(); toast("Letter saved"); renderLetters(); };
    $$("#prBody [data-dl]").forEach(b => b.onclick = () => { if (!confirm("Delete this letter?")) return; store.set("abp-letters", store.get("abp-letters", []).filter(l => String(l.at) !== b.dataset.dl)); renderLetters(); });
  }

  /* ===========================================================
     RECITATION STREAKS (e.g. 40 days of Ziyarat Ashura)
     =========================================================== */
  const RS_CHOICES = [["Ziyarat Ashura", "#lib/ziyarat/ashura"], ["Du'a al-'Ahd", "#lib/daily/ahd"], ["Du'a Kumayl", "#lib/duas/kumayl"], ["Du'a Tawassul", "#lib/duas/tawassul"], ["Ziyarat Warith", "#lib/ziyarat/warith"], ["Ziyarat Amin Allah", "#lib/ziyarat/amin-allah"], ["Ziyarat al-Jami'a al-Kabira", "#lib/ziyarat/jamia-kabira"], ["Surat Yasin", "#quran/36"], ["Surat al-Waqi'a", "#quran/56"], ["Salawat, 100 times", "#tasbih"]];
  function rsRun(s) { const set = new Set(s.days || []); let run = 0; const d = new Date(); if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1); for (; set.has(dayKey(d)); d.setDate(d.getDate() - 1)) run++; return run; }
  function renderStreaks() {
    const box = $("#rsBox"); if (!box) return;
    const list = store.get("abp-rstreaks", []), today = dayKey(new Date());
    const how = store.get("abp-rs-intro", 1) && !list.length ? `<div class="pr-how"><button class="hm-x" id="rsHowX" aria-label="Hide">×</button><h3>How streaks work</h3><ol><li>Tap "+ Streak" to start one, like 40 days of Ziyarat Ashura, and choose a reminder time.</li><li>Each day after reciting, tap "Mark done".</li><li>Recite at any time of the day. A streak only breaks if a whole day passes without "Mark done".</li><li>Tap "Edit" to change the reminder, rename or delete a streak.</li></ol></div>` : "";
    box.innerHTML = `<div class="hm-row rs-head"><div><h3>Your streaks</h3><p class="hm-sub">Keep a recitation steady, day after day.</p></div><button class="rs-add" id="rsAdd">+ Streak</button></div>${how}
      ${list.map(s => { const run = rsRun(s), doneToday = (s.days || []).includes(today), lastMiss = !run && (s.days || []).length; const pct = Math.min(100, run / s.target * 100), complete = run >= s.target;
        return `<div class="hm-card rs-card"><div class="hm-row"><div><small class="hm-label">${complete ? "Completed" : `Day ${Math.min(run + (doneToday ? 0 : 1), s.target)} of ${s.target}`}</small><h3>${esc(s.name)}</h3></div><button class="pr-link" data-rsedit="${s.id}">Edit</button></div>
          <div class="hm-prog"><i style="width:${pct}%"></i></div><p class="rs-meta">${complete ? `${s.target} days done. Alhamdulillah!` : lastMiss ? "A day was missed, so the count starts again. Begin today." : `${run} day${run === 1 ? "" : "s"} in a row`}${s.time ? ` · reminder ${fmt12(s.time)}` : ""}</p>
          <div class="rs-btns">${s.href ? `<a class="tm-cancel" href="${s.href}">Open</a>` : ""}${complete ? `<button class="hm-btn" data-rsagain="${s.id}">Start again</button>` : `<button class="hm-btn ${doneToday ? "rs-done" : ""}" data-rsdone="${s.id}">${doneToday ? "Done today ✓" : "Mark done"}</button>`}</div></div>`; }).join("")}`;
    if ($("#rsHowX")) $("#rsHowX").onclick = () => { store.set("abp-rs-intro", 0); renderStreaks(); };
    $("#rsAdd").onclick = () => editStreak(null);
    $$("#rsBox [data-rsedit]").forEach(b => b.onclick = () => editStreak(b.dataset.rsedit));
    $$("#rsBox [data-rsdone]").forEach(b => b.onclick = () => { const L = store.get("abp-rstreaks", []), s = L.find(x => x.id === b.dataset.rsdone); if (!s) return; s.days = s.days || []; if (s.days.includes(today)) s.days = s.days.filter(d => d !== today); else { s.days.push(today); markDay(); } s.days = s.days.slice(-120); store.set("abp-rstreaks", L); renderStreaks(); if (rsRun(s) >= s.target) toast(`${s.target} days of ${s.name}. Alhamdulillah!`); });
    $$("#rsBox [data-rsagain]").forEach(b => b.onclick = () => { const L = store.get("abp-rstreaks", []), s = L.find(x => x.id === b.dataset.rsagain); if (s) { s.days = []; store.set("abp-rstreaks", L); renderStreaks(); } });
  }
  function editStreak(id) {
    const L = store.get("abp-rstreaks", []), s = id ? L.find(x => x.id === id) : null;
    const box = document.createElement("div"); box.className = "tm-sheet";
    box.innerHTML = `<div class="tm-card"><h3>${s ? "Edit streak" : "New streak"}</h3>
      <label class="tm-l">Recitation<select id="rsPick">${RS_CHOICES.map(c => `<option value="${c[1]}" ${s && s.href === c[1] ? "selected" : ""}>${c[0]}</option>`).join("")}<option value="" ${s && !s.href ? "selected" : ""}>Something else…</option></select></label>
      <label class="tm-l" id="rsNameL">Name<input id="rsName" maxlength="50" value="${s ? esc(s.name) : ""}" placeholder="e.g. Ziyarat Ashura"></label>
      <label class="tm-l">How many days<select id="rsTarget">${[7, 14, 21, 40].map(n => `<option ${s ? (s.target === n ? "selected" : "") : n === 40 ? "selected" : ""}>${n}</option>`).join("")}</select></label>
      <label class="tm-l">Daily reminder (optional)<input type="time" id="rsTime" value="${s && s.time ? s.time : ""}"></label>
      <div class="tm-btns">${s ? `<button class="tm-off" id="rsDel">Delete</button>` : ""}<button class="tm-cancel" id="rsNo">Cancel</button><button class="hm-btn" id="rsOk">${s ? "Save" : "Start"}</button></div></div>`;
    document.body.appendChild(box); const close = () => box.remove();
    const pick = $("#rsPick", box), name = $("#rsName", box);
    const sync = () => { if (pick.value) name.value = pick.options[pick.selectedIndex].text; };
    if (!s) sync(); pick.onchange = sync;
    box.onclick = e => { if (e.target === box) close(); };
    $("#rsNo", box).onclick = close;
    if ($("#rsDel", box)) $("#rsDel", box).onclick = () => { if (!confirm("Delete this streak?")) return; store.set("abp-rstreaks", L.filter(x => x.id !== id)); close(); renderStreaks(); remindersChanged(); };
    $("#rsOk", box).onclick = async () => {
      const nm = name.value.trim() || (pick.value ? pick.options[pick.selectedIndex].text : ""); if (!nm) return toast("Give the streak a name");
      const data = { name: nm, href: pick.value, target: +$("#rsTarget", box).value, time: $("#rsTime", box).value };
      if (s) Object.assign(s, data); else L.push(Object.assign({ id: "r" + Date.now(), days: [] }, data));
      store.set("abp-rstreaks", L); close(); renderStreaks();
      remindersChanged(); toast(s ? "Streak updated" : "Streak started. Bismillah!");
      if (data.time) askNotify();
    };
  }

  drawQChips();
  scheduleReminders();   /* after DEEDS and streaks are defined */

  /* ===========================================================
     INIT
     =========================================================== */
  /* section-level sources: each <p class="sec-src" data-src="key"> in index.html */
  if (typeof SECTION_SRC !== "undefined") $$(".sec-src").forEach(p => {
    const k = p.dataset.src, t = k === "shrines" ? (typeof SHRINES_SRC !== "undefined" && SHRINES_SRC) : SECTION_SRC[k];
    if (t) p.innerHTML = `<b>Sources:</b> ${esc(t)}`;
  });
  /* Why we celebrate, why we mourn (Calendar) */
  function renderYearWhy(f = "all") {
    if (typeof YEAR_WHY === "undefined" || !$("#ywList")) return;
    $("#ywIntro").textContent = YEAR_WHY_INTRO;
    $("#ywChips").innerHTML = [["all", "All"], ["joy", "We celebrate"], ["grief", "We mourn"]].map(c => `<button class="chip ${c[0] === f ? "on" : ""}" data-f="${c[0]}">${c[1]}</button>`).join("");
    $$("#ywChips .chip").forEach(b => b.onclick = () => renderYearWhy(b.dataset.f));
    $("#ywList").innerHTML = YEAR_WHY.filter(y => f === "all" || y[3] === f).map(y => `<div class="yw ${y[3]}${/Fatimiyya/.test(y[2]) ? " big" : ""}">
      <span class="yw-k">${y[3] === "joy" ? "We celebrate" : "We mourn"}</span><time>${esc(y[1])}</time><h4>${esc(y[2])}</h4><p>${esc(y[4])}</p>
      ${y[5] ? `<a href="#story/${y[5]}">Read the story →</a>` : ""}<small><b>Source:</b> ${esc(y[6])}</small></div>`).join("");
    $("#ywSrc").innerHTML = `<b>Sources:</b> ${esc(YEAR_WHY_SRC)}`;
  }
  renderYearWhy();
  renderEras();
  renderLearn();
  renderLearnTiles();
  renderDuas();
  renderProofs();
  $("#proofCount").textContent = ["Twelve","Thirteen","Fourteen","Fifteen","Sixteen"][PROOFS.length - 12] || PROOFS.length;
  renderHaq();
  renderAbbas();
  renderWronged();
  renderKarbala();
  renderPearls();
  paintBanners();
  renderBattles();
  renderTimeline();
  renderStoryChips();
  renderStories();
  renderRulers();
  renderMasumin();
  renderLessonPicker();
  showLesson(lessonIdx, false);
  renderCompanions();
  renderDates();
  observeReveals();
  onScroll();
  route();
  setTimeout(() => autoLocate(true), 1500);

  /* ===========================================================
     HONORIFICS: (AS) after every Imam, (SA) after the Ladies.
     Applied to visible text, so every screen and reader gets it.
     =========================================================== */
  (function honorifics() {
    const IMAMS = ["Ali ibn Abi Talib", "Ali Zayn al-Abidin", "Ali ibn al-Husayn", "Ali ibn Musa", "Ali ibn Muhammad", "Ali al-Rida", "Ali al-Hadi", "Ali al-Naqi",
      "Ja'far al-Sadiq", "Ja'far ibn Muhammad", "Musa al-Kazim", "Musa ibn Ja'far", "Muhammad al-Baqir", "Muhammad ibn Ali", "Muhammad al-Jawad", "Muhammad al-Taqi",
      "Muhammad ibn al-Hasan", "Muhammad al-Mahdi", "Hasan al-Askari", "al-Hasan al-Askari", "al-Hasan ibn Ali", "al-Husayn ibn Ali", "Husayn ibn Ali",
      "Zayn al-Abidin", "Zayn al-'Abidin", "al-Sajjad", "al-Baqir", "al-Sadiq", "al-Kazim", "al-Rida", "al-Jawad", "al-Taqi", "al-Hadi", "al-Naqi", "al-Askari", "al-Mahdi",
      "al-Hasan", "al-Husayn", "Hasan", "Husayn", "Ali", "Mahdi", "Sadiq", "Baqir", "Rida", "Kazim"];
    const rx = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const HAS = String.raw`(?!\s*(?:\((?:AS|A\.S\.?|SA|S\.A\.?|as|sa|ع|عليه السلام|عليها السلام)\)|\(peace|ﷺ|\(pbuh))`;
    const R_IMAM = new RegExp(String.raw`\b(Imam )(${IMAMS.map(rx).join("|")})('s)?(?![\w'-])` + HAS, "g");
    const R_LADY = new RegExp(String.raw`\b((?:Lady|Sayyida) (?:Fatima(?: al-Zahra)?|Zaynab|Khadija|Umm al-Banin))('s)?(?![\w'-])` + HAS, "g");
    const R_ABBAS = new RegExp(String.raw`\b(Moula Abbas|Mawla Abbas|al-Abbas ibn Ali|Abbas ibn Ali|Abu al-Fadl al-Abbas)('s)?(?![\w'-])` + HAS, "g");
    const fix = t => t.replace(R_IMAM, (m, a, n, ps) => `${a}${n}${ps || ""} (AS)`).replace(R_LADY, (m, n, ps) => `${n}${ps || ""} (SA)`).replace(R_ABBAS, (m, n, ps) => `${n}${ps || ""} (AS)`);
    const SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|TITLE|SVG)$/;
    function walk(root) {
      if (!root) return;
      if (root.nodeType === 3) { const v = root.nodeValue; if (v && /Imam |Lady |Sayyida |Abbas/.test(v)) { const n = fix(v); if (n !== v) root.nodeValue = n; } return; }
      if (root.nodeType !== 1 || SKIP.test(root.nodeName.toUpperCase()) || root.closest && root.closest(".no-hon")) return;
      const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement && (SKIP.test(n.parentElement.nodeName.toUpperCase()) || n.parentElement.closest(".no-hon"))) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      const list = []; while (tw.nextNode()) list.push(tw.currentNode);
      list.forEach(walk);
    }
    walk(document.body);
    new MutationObserver(ms => ms.forEach(m => { if (m.type === "characterData") walk(m.target); else m.addedNodes.forEach(walk); }))
      .observe(document.body, { childList: true, subtree: true, characterData: true });
    window.__honor = fix;
  })();
})();
