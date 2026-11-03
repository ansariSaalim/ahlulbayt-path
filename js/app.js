/* ===========================================================
   The Path of the Ahl al-Bayt — interactions
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
  root.dataset.theme = store.get("abp-theme", "dark");
  $("#themeBtn").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("abp-theme", root.dataset.theme);
  });

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
    document.title = s.title + " · The Path of the Ahl al-Bayt";
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
    document.title = title + " · The Path of the Ahl al-Bayt";
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
    document.title = e.name + " · The Path of the Ahl al-Bayt";
  }
  function closeStory(fromHash) {
    if (!reader.classList.contains("open")) return;
    reader.classList.remove("open"); reader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    document.title = "The Path of the Ahl al-Bayt · History & Stories for Learning Shia Islam";
    currentId = null;
    if (!fromHash && /^#(story|chapter|learn|lesson|imam|quran)\//.test(location.hash)) history.replaceState(null, "", location.pathname + location.search + (screenHash || "#/home"));
    if (typeof stopQuran === "function") stopQuran();
    reader.classList.remove("is-quran"); $("#qPlayer").hidden = true; $("#qSheet").hidden = true;
    if (!fromHash && screenHash) setTimeout(() => shellRoute(screenHash), 0);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$("[data-close]", reader).forEach(b => b.addEventListener("click", () => closeStory()));
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
    const overlay = /^#(story|chapter|learn|lesson|imam|quran)\//.test(h);
    if (overlay && !screenHash) showScreen("home");
    if (h.startsWith("#quran/")) openSurah(h.slice(7));
    else if (h.startsWith("#story/")) openStory(h.slice(7));
    else if (h.startsWith("#chapter/")) openChapter(h.slice(9));
    else if (h.startsWith("#learn/")) openCategory(h.slice(7));
    else if (h.startsWith("#lesson/")) openLesson(h.slice(8));
    else if (h.startsWith("#imam/")) openImam(+h.slice(6));
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
            <h3>${esc(m.name)} ${m.n === "ﷺ" ? "" : "<span style='color:#f0d28c;font-size:.75em'>(ع)</span>"}</h3>
            <div class="t">${esc(m.title)}</div>
            <div class="hint">Tap to turn ↻</div>
          </div>
          <div class="m-face m-back">
            <h4>${esc(m.name)}</h4>
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
    if (tab === "women") body.innerHTML = `<div class="m-list">${KARBALA_WOMEN.map(m => `<div class="mt reveal"><b>${esc(m[0])}</b><p>${esc(m[1])}</p></div>`).join("")}</div>`;
    if (tab === "after") body.innerHTML = `<div class="k-after">${["night-11", "zaynab", "captives-damascus", "arbain", "after-karbala", "sajjad", "mourning"].map(id => { const st = storyById[id]; return `<a class="ka reveal" href="#story/${id}"><div class="ka-img"><div class="ph" data-wiki="${STORY_IMAGES[id]}"></div></div><div class="ka-b"><b>${esc(st.title)}</b><small>${esc(st.when)}</small></div></a>`; }).join("")}</div>`;
    if (tab === "killers") body.innerHTML = killersHTML() + `<p style="margin-top:1rem"><a href="#wronged" style="color:var(--gold)">See who wronged each of the Fourteen →</a></p>`;
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
  const pearlCard = p => `<div class="pg reveal">${p.ar ? `<p class="pg-ar" dir="rtl" lang="ar">${esc(p.ar)}</p>` : ""}<q>${esc(p.q)}</q><div class="pw">${esc(p.who)}</div><div class="ps">${esc(p.src)}</div></div>`;
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
    return `<div class="kl-grid">${KILLERS.map(k => `<div class="kl reveal"><h4>${esc(k.n)}</h4>${k.ln ? `<span class="ln-tag" dir="rtl" lang="ar">لَعْنَةُ اللّٰهِ عَلَيْهِ</span>` : ""}<p>${esc(k.d)}</p><p class="kf"><b>Their end</b>${esc(k.f)}</p></div>`).join("")}</div>`;
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
    $("#gzStats").innerHTML = ABBAS_GENZ.stats.map(s => `<div class="gz-stat"><b>${s[1]}</b><span>${esc(s[0])}</span></div>`).join("");
    $("#gzGrid").innerHTML = ABBAS_GENZ.cards.map((c, i) => `<div class="gz-card"><span class="gn">${String(i + 1).padStart(2, "0")}</span><h4>${esc(c.h)}</h4><p>${esc(c.p)}</p></div>`).join("");
    $("#gzTags").innerHTML = ABBAS_GENZ.tags.map(t => `<span>${t}</span>`).join("");
    let salams = store.get("abp-salam-abbas", 0);
    const showCount = () => { $("#gzCount").textContent = salams ? `You've sent ${salams} salam${salams > 1 ? "s" : ""} to Moula Abbas` : "Tap to send your salam"; };
    showCount();
    $("#gzBtn").addEventListener("click", () => {
      salams++; store.set("abp-salam-abbas", salams); showCount();
      if (navigator.vibrate) try { navigator.vibrate(15); } catch { /* ignore */ }
      if (reduceMotion) return;
      const box = $("#gzFloat");
      const n = salams % 10 === 0 ? 9 : 4;
      for (let k = 0; k < n; k++) {
        const el = document.createElement("i");
        const txt = k === 0;
        el.className = txt ? "txt" : "dot";
        if (txt) el.textContent = salams % 10 === 0 ? "Ya Abul Fadl al-Abbas" : "Ya Abbas";
        el.style.left = (txt ? 50 : 30 + Math.random() * 40) + "%";
        el.style.setProperty("--dx", (txt ? 0 : (Math.random() - .5) * 110) + "px");
        el.style.animationDelay = (k * .07) + "s";
        box.appendChild(el);
        setTimeout(() => el.remove(), 2200);
      }
    });
    observeReveals($("#abbas"));
  }

  /* ---------- Download the App (PWA) ---------- */
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
  async function install() {
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

  /* ---------- Namaz & Dua ---------- */
  function renderDuas() {
    $("#duaList").innerHTML = DUAS.map((d, i) => `<div class="dua reveal">
      <button class="dua-h"><span><b>${esc(d.t)}</b><small>${esc(d.when)}</small></span><i class="chev"></i></button>
      <div class="dua-body"><div><p class="dua-ar" dir="rtl" lang="ar">${d.ar}</p><p class="dua-tr">${esc(d.tr)}</p><p class="dua-en">${esc(d.en)}</p>
      ${d.counter ? `<a href="#tasbih" class="dua-copy" style="text-decoration:none">Open the counter ↑</a>` : `<button class="dua-copy" data-i="${i}">Copy Arabic</button>`}</div></div></div>`).join("");
    $$("#duaList .dua").forEach(d => $(".dua-h", d).addEventListener("click", () => d.classList.toggle("open")));
    $$("#duaList .dua-copy[data-i]").forEach(b => b.addEventListener("click", () => {
      const t = DUAS[+b.dataset.i].ar;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Copied ✓"), () => toast("Copy not available"));
    }));
    $("#longDuas").innerHTML = LONG_DUAS.map(l => `<div class="ld reveal"><b>${esc(l[0])}</b><small>${esc(l[1])}</small><p>${esc(l[2])}</p></div>`).join("");
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
    $("#rTitle").textContent = m.name + (i === 0 ? " ﷺ" : " (ع)");
    $("#rMeta").textContent = m.title;
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback"); $("#rCredit").textContent = "";
    paint(img, IMAM_IMAGES[m.name], $("#rCredit"), SZ.big);
    $("#rBack").hidden = false; $("#rBack").href = "#masumin"; $("#rBack").textContent = "← The Fourteen Ma'sumin";
    const lid = PROFILE.lessons[i], L = lid && LESSONS_LIB[lid], LS = LESSONS[m.name];
    const pearls = PEARLS.filter(p => p.who === PROFILE.pearlWho[i] && !p.nb);
    const wr = WRONGED.find(w => w.who.endsWith(m.name.split(" ").slice(-1)[0]) || w.who.includes(m.name.replace("Muhammad ", "")));
    const prev = MASUMIN[i - 1], next = MASUMIN[i + 1];
    $("#rLessonView").innerHTML = `
      <table class="facts"><tr><td>Born</td><td>${esc(m.born)}</td></tr><tr><td>${i === 13 ? "Now" : "Died / martyred"}</td><td>${esc(m.died)}</td></tr><tr><td>Age</td><td>${esc(m.age)}</td></tr><tr><td>Rulers of the time</td><td>${esc(m.rulers)}</td></tr></table>
      <p class="r-summary">${esc(m.note)}</p>
      ${L ? `<div class="r-content">${L.body.replace(/<table class="facts">[\s\S]*?<\/table>/, "")}</div>` : ""}
      ${LS ? `<h4 class="pf-h">What we learn</h4><p class="l-teach">${esc(LS.teach)}</p><div class="l-grid">${LS.items.map((it, k) => `<div class="l-item" style="animation-delay:${.1 + k * .1}s"><b><i>${k + 1}</i>${esc(it[0])}</b><p>${esc(it[1])}</p></div>`).join("")}</div>` : ""}
      ${pearls.length ? `<h4 class="pf-h">Divine pearls</h4>${pearls.map(pearlCard).join("").replace(/ reveal/g, "")}` : ""}
      <h4 class="pf-h">Stories</h4><div class="l-rel">${PROFILE.stories[i].map(sid => `<a href="#story/${sid}">${esc(storyById[sid].title)}</a>`).join("")}</div>
      ${wr && i > 0 ? `<h4 class="pf-h">Who wronged ${i === 1 ? "her" : "him"}</h4><p class="wr-p">${esc(wr.by)}</p>` : ""}
      ${L ? `<a class="btn btn-gold" href="#lesson/${lid}" style="margin-top:1rem">Take the lesson & quiz →</a>` : ""}
      <nav class="r-nav">
        <button class="r-nav-btn" ${prev ? "" : "disabled"} onclick="location.hash='imam/${i - 1}'"><small>Previous</small><span>${prev ? esc(prev.name) : ""}</span></button>
        <button class="r-nav-btn" ${next ? "" : "disabled"} onclick="location.hash='imam/${i + 1}'"><small>Next</small><span>${next ? esc(next.name) : ""}</span></button>
      </nav>`;
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
  const TAB_TITLES = { home: "Home", prayer: "Prayer", quran: "The Holy Qur'an", duas: "Duas & Ziyarat", learn: "Learn" };
  const SUB_TITLES = { proofs: "The Proofs", timeline: "Timeline", stories: "Stories", battles: "Battles of Imam Ali", haq: "Fatima's Haq", karbala: "Karbala", abbas: "Moula Abbas", rulers: "The Caliphs", wronged: "Who Wronged Them", masumin: "The 14 Ma'sumin", lessons: "Lessons of the Fourteen", pearls: "Divine Pearls", companions: "Companions", dates: "Key Dates", reading: "Books", calendar: "Shia Calendar", settings: "Settings", "namaz-guide": "How to Pray" };
  const PARENT = { calendar: "home", settings: "home", "namaz-guide": "prayer" };
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
    document.title = (sub ? SUB_TITLES[sub] : TAB_TITLES[tab]) + " · The Path of the Ahl al-Bayt";
    onScreen(tab, sub);
    setTimeout(measure, 50);
  }
  function shellRoute(h) {
    if (!h || h === "#" || h === "#/" || h === "#top") { history.replaceState(null, "", location.pathname + location.search + "#/home"); return showScreen("home"); }
    if (h.startsWith("#/s/")) { const id = h.slice(4); if ($("#" + id)) return showScreen(PARENT[id] || "learn", id); return showScreen("home"); }
    if (h.startsWith("#/")) { const t = h.slice(2); return showScreen(TAB_TITLES[t] ? t : "home"); }
    const el = document.getElementById(h.slice(1));
    if (!el) return showScreen("home");
    const sec = el.closest("section[data-screen]");
    if (!sec) return showScreen("home");
    const canon = sec.dataset.screen === "sub" ? "#/s/" + sec.id : "#/" + sec.dataset.screen;
    history.replaceState(null, "", location.pathname + location.search + canon);
    if (sec.dataset.screen === "sub") showScreen(PARENT[sec.id] || "learn", sec.id); else showScreen(sec.dataset.screen);
    if (el !== sec) setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
  }
  addEventListener("hashchange", () => { appNav++; });
  $("#abBack").addEventListener("click", () => {
    if (appNav > 0 && history.length > 1) history.back();
    else { const sub = screenHash.startsWith("#/s/") ? screenHash.slice(4) : null; location.hash = "#/" + (PARENT[sub] || "learn"); }
  });
  const screenInit = {};
  function onScreen(tab, sub) {
    if (tab === "home" && !sub) renderHome();
    if (tab === "prayer" && !sub) renderPrayer();
    if (tab === "quran" && !sub) loadSurahList();
    if (sub === "calendar") renderCalendar();
    if (sub === "settings") renderSettings();
    if (sub === "namaz-guide" && window.NamazGuide) NamazGuide.render();
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
    heart: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>'
  };
  const ico = k => `<svg viewBox="0 0 24 24">${IC[k]}</svg>`;
  const tile = (href, icon, label, cls = "") => `<a class="tile ${cls}" href="${href}"><i>${ico(icon)}</i><span>${label}</span></a>`;

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
  const defaultAdj = /Kolkata|Calcutta|Karachi|Dhaka/.test(Intl.DateTimeFormat().resolvedOptions().timeZone || "") ? -1 : 0;
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
    [6, 3, "Martyrdom of Lady Fatima (95-day report)", "grief", "fatima-burial"], [6, 20, "Birth of Lady Fatima al-Zahra", "joy", "marriage"],
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
  function renderCalendar() {
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
    ["Bengaluru", 12.9716, 77.5946, 5.5], ["Chennai", 13.0827, 80.2707, 5.5], ["Pune", 18.5204, 73.8567, 5.5], ["Ahmedabad", 23.0225, 72.5714, 5.5], ["Jaipur", 26.9124, 75.7873, 5.5],
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
  function renderPrayer() {
    const loc = getLoc(), box = $("#ptTimes");
    if (!loc) {
      box.innerHTML = `<h3>Prayer times</h3><p class="muted">Set your location to see today's prayer times and the Qibla (Ja'fari method).</p><div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.8rem"><button class="btn btn-gold" id="ptGeo">Use my location</button><a class="btn btn-ghost" href="#/s/settings" style="color:var(--gold);border-color:var(--gold)">Choose a city</a></div>`;
      $("#ptGeo").onclick = useGeo; $("#qbInfo").textContent = "Set your location to find the Qibla."; return;
    }
    const t = dayTimes(loc), nx = nextPrayer(loc), h = hijri(new Date());
    box.innerHTML = `<div class="pt-top"><div><h3 style="margin:0">Prayer times</h3><small>${new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}${h ? " · " + h.d + " " + HM[h.m - 1] + " " + h.y : ""}</small></div><a class="pt-loc" href="#/s/settings">${esc(loc.name)} ›</a></div>
      <ul class="pt-list">${PNAMES.map(([k, n, c]) => `<li class="${c === "minor" ? "minor" : c === "main" ? "main" : ""} ${nx && nx.k === k && nx.ts === t.ts[k] ? "next" : ""}"><b>${n}${c === "fadila" ? "<small>preferred time</small>" : ""}</b><span>${fmtH(t.hours[k])}</span></li>`).join("")}</ul>
      <p class="pt-foot">${nx ? `Next: <b style="color:var(--gold)">${nx.name}</b> ${countdown(nx.ts - Date.now())}. ` : ""}Ja'fari method (Fajr 16°, Maghrib 4°, Isha 14°). Zuhr–Asr and Maghrib–Isha may be combined. Check against your marja's local timetable.</p>`;
    updateQibla();
  }

  /* ---------- location ---------- */
  function setLoc(loc) { store.set("abp-loc", loc); renderPrayer(); renderHome(); if ($("#setLocNow")) $("#setLocNow").textContent = "Current: " + loc.name; scheduleReminders(); }
  function useGeo() {
    if (!navigator.geolocation) { toast("Location is not available on this device"); return; }
    toast("Finding your location…");
    navigator.geolocation.getCurrentPosition(p => {
      setLoc({ name: "My location", lat: +p.coords.latitude.toFixed(4), lng: +p.coords.longitude.toFixed(4), tz: null });
      toast("Location set ✓");
    }, () => toast("Location permission denied. Choose a city in Settings."), { timeout: 12000, maximumAge: 6e5 });
  }

  /* ---------- qibla ---------- */
  const KAABA = [21.4225, 39.8262];
  function qiblaBearing(lat, lng) {
    const p1 = lat * D2R, p2 = KAABA[0] * D2R, dl = (KAABA[1] - lng) * D2R;
    return (Math.atan2(Math.sin(dl), Math.cos(p1) * Math.tan(p2) - Math.sin(p1) * Math.cos(dl)) / D2R + 360) % 360;
  }
  let heading = null, compassOn = false;
  let wasAligned = false;
  function updateQibla() {
    const loc = getLoc(); if (!loc) return;
    const b = qiblaBearing(loc.lat, loc.lng);
    const rose = $("#qbRose"), needle = $("#qbNeedle"), dial = $("#qbDial");
    if (heading == null) { rose.style.transform = "rotate(0deg)"; needle.style.setProperty("--r", b + "deg"); dial.classList.remove("aligned"); $("#qbInfo").innerHTML = `Qibla is <b>${b.toFixed(0)}°</b> from North (clockwise) at ${esc(loc.name)}.`; return; }
    const rel = ((b - heading) % 360 + 360) % 360;
    rose.style.transform = `rotate(${-heading}deg)`; needle.style.setProperty("--r", rel + "deg");
    const diff = Math.abs(((rel + 180) % 360) - 180), aligned = diff < 5;
    dial.classList.toggle("aligned", aligned);
    $("#qbInfo").innerHTML = aligned ? `<b style="color:#2fbf86">You are facing the Qibla</b>` : `Turn ${rel < 180 ? "right" : "left"} until the Ka'ba reaches the top · ${diff.toFixed(0)}° away`;
    if (aligned && !wasAligned && navigator.vibrate) try { navigator.vibrate([40, 60, 40]); } catch { /* ignore */ }
    wasAligned = aligned;
  }
  function onOrient(e) {
    let hd = null;
    if (typeof e.webkitCompassHeading === "number") hd = e.webkitCompassHeading;
    else if (e.absolute && e.alpha != null) hd = 360 - e.alpha;
    if (hd == null) return;
    heading = hd; updateQibla();
  }
  $("#qbStart").addEventListener("click", async () => {
    if (!getLoc()) { useGeo(); return; }
    try { if (typeof DeviceOrientationEvent !== "undefined" && DeviceOrientationEvent.requestPermission) { const r = await DeviceOrientationEvent.requestPermission(); if (r !== "granted") { toast("Compass permission denied"); return; } } } catch { /* ignore */ }
    if (!compassOn) { addEventListener("deviceorientationabsolute", onOrient); addEventListener("deviceorientation", onOrient); compassOn = true; }
    $("#qbStart").textContent = "Compass on · hold phone flat";
    setTimeout(() => { if (heading == null) $("#qbInfo").innerHTML += "<br><small>No compass found on this device; use the degrees shown.</small>"; }, 2500);
  });

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
    remTimers.forEach(clearTimeout); remTimers = [];
    const loc = getLoc();
    if (!loc || !store.get("abp-notify", false) || !("Notification" in window) || Notification.permission !== "granted") return;
    const now = Date.now();
    [0, 1].forEach(off => { const t = dayTimes(loc, off); [["fajr", "Fajr"], ["dhuhr", "Zuhr"], ["maghrib", "Maghrib"]].forEach(([k, n]) => {
      const ms = t.ts[k] - now;
      if (ms > 0 && ms < 864e5) remTimers.push(setTimeout(() => {
        const body = `It is time for ${n} in ${loc.name}.`;
        navigator.serviceWorker && navigator.serviceWorker.ready.then(r => r.showNotification(n + " · Ahl al-Bayt", { body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", tag: "prayer-" + k })).catch(() => new Notification(n, { body }));
      }, ms));
    }); });
  }

  /* ===========================================================
     HOME DASHBOARD
     =========================================================== */
  const setLast = (h, k, t) => store.set("abp-last", { h, k, t });
  let homeTimer = null;
  function renderHome() {
    const h = hijri(new Date()), ev = upcomingEvents(60)[0];
    $("#hdToday").outerHTML = `<a class="hd-today" id="hdToday" href="#/s/calendar"><div>${h ? `<p class="ht-h" dir="rtl" lang="ar">${h.d} ${HM_AR[h.m - 1]} ${h.y}</p><p class="ht-g">${h.d} ${HM[h.m - 1]} ${h.y} · ${new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}</p>` : `<p class="ht-g">${new Date().toDateString()}</p>`}</div>
      ${ev ? `<div class="ht-ev"><small>${inDays(ev.i)}</small><b>${esc(ev.e[2])}</b></div>` : ""}</a>`;
    const loc = getLoc();
    if (loc) {
      const nx = nextPrayer(loc);
      $("#hdNext").innerHTML = nx ? `<a class="np" href="#/prayer"><div class="np-l"><small>Next · ${esc(loc.name)}</small><b>${nx.name}</b></div><div><div class="np-t">${fmtH(nx.h)}</div><div class="np-in">${countdown(nx.ts - Date.now())}</div></div></a>` : "";
    } else $("#hdNext").innerHTML = `<a class="np-set" href="#/prayer">Set your location for prayer times & Qibla →</a>`;
    $("#hdTiles").innerHTML = [
      tile("#/prayer", "clock", "Prayer times", "green"), tile("#qibla", "compass", "Qibla", "green"), tile("#/quran", "book", "Qur'an"), tile("#/duas", "hands", "Duas"),
      tile("#tasbih", "beads", "Tasbih"), tile("#rakat", "count", "Rak'at counter", "green"), tile("#/s/calendar", "cal", "Calendar"), tile("#/s/namaz-guide", "pray", "How to pray", "green"),
      tile("#/s/stories", "scroll", "Stories"), tile("#/s/karbala", "flag", "Karbala", "red"), tile("#/s/abbas", "flag", "Moula Abbas", "green"), tile("#/s/haq", "scale", "Fatima's Haq"),
      tile("#/s/masumin", "star", "14 Ma'sumin"), tile("#/s/proofs", "shield", "Proofs"), tile("#/s/pearls", "gem", "Pearls"), tile("#/s/battles", "sword", "Battles")
    ].join("");
    const last = store.get("abp-last", null);
    $("#hdContinue").innerHTML = last ? `<a class="cont" href="${last.h}"><div><small>Continue · ${esc(last.k)}</small><b>${esc(last.t)}</b></div><span class="ca">›</span></a>` : "";
    const p = PEARLS[new Date().getDate() % PEARLS.length];
    $("#hdPearl").innerHTML = `<div class="pearl-feature"><p class="pf-label">Pearl of the day</p><blockquote>“${esc(p.q)}”</blockquote><cite>${esc(p.who)} · ${esc(p.src)}</cite><br><a href="#/s/pearls" style="display:inline-block;margin-top:.8rem;font-size:.82rem;color:var(--gold)">More pearls ›</a></div>`;
    clearInterval(homeTimer); homeTimer = setInterval(() => { if (screenHash === "#/home" && getLoc()) { const nx = nextPrayer(getLoc()); const el = $("#hdNext .np-in"); if (nx && el) el.textContent = countdown(nx.ts - Date.now()); } }, 30000);
  }
  function renderLearnTiles() {
    $("#learnTiles").innerHTML = [
      tile("#/s/stories", "scroll", "Stories"), tile("#/s/timeline", "line", "Timeline"), tile("#/s/proofs", "shield", "Proofs"), tile("#/s/battles", "sword", "Battles"),
      tile("#/s/haq", "scale", "Fatima's Haq"), tile("#/s/karbala", "flag", "Karbala", "red"), tile("#/s/abbas", "flag", "Moula Abbas", "green"), tile("#/s/masumin", "star", "14 Ma'sumin"),
      tile("#/s/lessons", "lamp", "Lessons"), tile("#/s/pearls", "gem", "Pearls"), tile("#/s/rulers", "crown", "Caliphs"), tile("#/s/wronged", "alert", "Who wronged", "red"),
      tile("#/s/companions", "users", "Companions"), tile("#/s/dates", "cal", "Key dates"), tile("#/s/calendar", "cal", "Calendar"), tile("#/s/reading", "books", "Books")
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
    $("#setTheme").value = root.dataset.theme;
    $("#setHijri").value = String(hijriAdj());
    const h = hijri(new Date()); $("#setHijriNow").textContent = h ? `Today: ${h.d} ${HM[h.m - 1]} ${h.y} AH` : "";
    $("#setNotify").checked = !!store.get("abp-notify", false);
  }
  $("#setGeo").addEventListener("click", useGeo);
  $("#setCity").addEventListener("change", e => { const c = CITIES[+e.target.value]; if (c) { setLoc({ name: c[0], lat: c[1], lng: c[2], tz: c[3] }); toast(c[0] + " set ✓"); } });
  $("#setAr").addEventListener("input", e => { store.set("abp-ar", +e.target.value); $("#setArVal").textContent = e.target.value + "%"; applyArScale(); });
  $("#setTheme").addEventListener("change", e => { root.dataset.theme = e.target.value; store.set("abp-theme", e.target.value); });
  $("#setHijri").addEventListener("change", e => { store.set("abp-hadj", +e.target.value); renderSettings(); toast("Hijri date adjusted ✓"); });
  $("#setNotify").addEventListener("change", async e => {
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
  scheduleReminders();

  /* ===========================================================
     INIT
     =========================================================== */
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
})();
