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

  /* ---------- menu ---------- */
  const menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  const scrim = $("#navScrim");
  const setMenu = open => { menuBtn.classList.toggle("open", open); navLinks.classList.toggle("open", open); scrim.classList.toggle("open", open); document.documentElement.style.overflow = open ? "hidden" : ""; };
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  scrim.addEventListener("click", () => setMenu(false));
  $$("a", navLinks).forEach(a => a.addEventListener("click", () => setMenu(false)));

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
    if (cur !== lastActive) { lastActive = cur; $$("a", navLinks).forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur)); }
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
    $("#rSources").innerHTML = `<b>Sources:</b> ${esc(s.sources)}`;
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
    setTimeout(() => $(".reader-close").focus({ preventScroll: true }), 50);
  }
  function setMode(mode) {
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
    if (!fromHash && /^#(story|chapter|learn|lesson|imam)\//.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
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
    if (h.startsWith("#story/")) openStory(h.slice(7));
    else if (h.startsWith("#chapter/")) openChapter(h.slice(9));
    else if (h.startsWith("#learn/")) openCategory(h.slice(7));
    else if (h.startsWith("#lesson/")) openLesson(h.slice(8));
    else if (h.startsWith("#imam/")) openImam(+h.slice(6));
    else closeStory(true);
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
    const rel = [...(L.links || []).map(sid => `<a href="#story/${sid}">📜 ${esc(storyById[sid].title)}</a>`),
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
    $$("#rLessonView .l-rel a[data-sec]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); closeStory(); setTimeout(() => $("#" + a.dataset.sec).scrollIntoView(), 80); }));
    $("#lDone").onclick = () => {
      const on = !doneLessons.has(id); if (on) doneLessons.add(id); else doneLessons.delete(id);
      store.set("abp-lessons", [...doneLessons]);
      $("#lDone").classList.toggle("done", on); $("#lDone").textContent = on ? "✓ Lesson complete · tap to undo" : "Mark lesson complete";
      renderLearn(); if (on) toast("Lesson complete ✓");
    };
    if (quizHTML) setupQuiz(L.quiz, id);
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
  let pearlWho = "all";
  const pearlCard = p => `<div class="pg reveal"><q>${esc(p.q)}</q><div class="pw">${esc(p.who)}</div><div class="ps">📖 ${esc(p.src)}</div></div>`;
  function renderPearls() {
    showPearl();
    $("#pearlCount").textContent = PEARLS.length;
    const whos = [...new Set(PEARLS.map(p => p.who))];
    $("#pearlChips").innerHTML = `<button class="chip ${pearlWho === "all" ? "on" : ""}" data-w="all">All (${PEARLS.length})</button>` + whos.map(w => `<button class="chip ${pearlWho === w ? "on" : ""}" data-w="${esc(w)}">${esc(w.replace("Imam ", ""))}</button>`).join("");
    $$("#pearlChips .chip").forEach(c => c.addEventListener("click", () => { pearlWho = c.dataset.w; renderPearls(); }));
    $("#pearlGrid").innerHTML = PEARLS.filter(p => pearlWho === "all" || p.who === pearlWho).map(pearlCard).join("");
    observeReveals($("#pearlGrid"));
  }
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
    $("#gzStats").innerHTML = ABBAS_GENZ.stats.map(s => `<div class="gz-stat"><b>${s[1]}</b><span>${esc(s[0])}</span></div>`).join("");
    $("#gzGrid").innerHTML = ABBAS_GENZ.cards.map(c => `<div class="gz-card"><span class="ge">${c.e}</span><h4>${esc(c.h)}</h4><p>${esc(c.p)}</p></div>`).join("");
    $("#gzTags").innerHTML = ABBAS_GENZ.tags.map(t => `<span>${t}</span>`).join("");
    let salams = store.get("abp-salam-abbas", 0);
    const showCount = () => { $("#gzCount").textContent = salams ? `You've sent ${salams} salam${salams > 1 ? "s" : ""} to Moula Abbas 💚` : "Tap to send your salam"; };
    showCount();
    const bits = ["💚", "🤍", "🫡", "✨", "🌙", "💧"];
    $("#gzBtn").addEventListener("click", () => {
      salams++; store.set("abp-salam-abbas", salams); showCount();
      if (navigator.vibrate) try { navigator.vibrate(15); } catch { /* ignore */ }
      if (reduceMotion) return;
      const box = $("#gzFloat");
      const n = salams % 10 === 0 ? 10 : 4;
      for (let k = 0; k < n; k++) {
        const el = document.createElement("i");
        const txt = k === 0 && (salams % 5 === 0);
        el.className = txt ? "txt" : "";
        el.textContent = txt ? "Ya Abbas 💚" : bits[Math.floor(Math.random() * bits.length)];
        el.style.left = (40 + Math.random() * 20) + "%";
        el.style.setProperty("--dx", ((Math.random() - .5) * 90) + "px");
        el.style.animationDelay = (k * .08) + "s";
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
    const pearls = PEARLS.filter(p => p.who === PROFILE.pearlWho[i]);
    const wr = WRONGED.find(w => w.who.endsWith(m.name.split(" ").slice(-1)[0]) || w.who.includes(m.name.replace("Muhammad ", "")));
    const prev = MASUMIN[i - 1], next = MASUMIN[i + 1];
    $("#rLessonView").innerHTML = `
      <table class="facts"><tr><td>Born</td><td>${esc(m.born)}</td></tr><tr><td>${i === 13 ? "Now" : "Died / martyred"}</td><td>${esc(m.died)}</td></tr><tr><td>Age</td><td>${esc(m.age)}</td></tr><tr><td>Rulers of the time</td><td>${esc(m.rulers)}</td></tr></table>
      <p class="r-summary">${esc(m.note)}</p>
      ${L ? `<div class="r-content">${L.body.replace(/<table class="facts">[\s\S]*?<\/table>/, "")}</div>` : ""}
      ${LS ? `<h4 class="pf-h">What we learn</h4><p class="l-teach">${esc(LS.teach)}</p><div class="l-grid">${LS.items.map((it, k) => `<div class="l-item" style="animation-delay:${.1 + k * .1}s"><b><i>${k + 1}</i>${esc(it[0])}</b><p>${esc(it[1])}</p></div>`).join("")}</div>` : ""}
      ${pearls.length ? `<h4 class="pf-h">Divine pearls</h4>${pearls.map(pearlCard).join("").replace(/ reveal/g, "")}` : ""}
      <h4 class="pf-h">Stories</h4><div class="l-rel">${PROFILE.stories[i].map(sid => `<a href="#story/${sid}">📜 ${esc(storyById[sid].title)}</a>`).join("")}</div>
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
     INIT
     =========================================================== */
  renderEras();
  renderLearn();
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
