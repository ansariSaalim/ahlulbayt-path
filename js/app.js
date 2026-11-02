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
  menuBtn.addEventListener("click", () => { menuBtn.classList.toggle("open"); navLinks.classList.toggle("open"); });
  $$("a", navLinks).forEach(a => a.addEventListener("click", () => { menuBtn.classList.remove("open"); navLinks.classList.remove("open"); }));

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
  function wikiImage(title) {
    if (imgCache.has(title)) return imgCache.get(title);
    const p = (async () => {
      let cached = null;
      try { cached = JSON.parse(sessionStorage.getItem("wk:" + title)); } catch { /* ignore */ }
      if (cached) return cached;
      const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title), { headers: { "Accept": "application/json" } });
      if (!r.ok) throw new Error("no page");
      const j = await r.json();
      const orig = j.originalimage, thumb = j.thumbnail;
      if (!orig && !thumb) throw new Error("no image");
      let src;
      if (thumb && orig && orig.width > 1400) src = thumb.source.replace(/\/\d+px-/, "/1400px-");
      else src = (orig || thumb).source;
      const out = { src, page: (j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page) || ("https://en.wikipedia.org/wiki/" + title), name: j.title };
      try { sessionStorage.setItem("wk:" + title, JSON.stringify(out)); } catch { /* ignore */ }
      return out;
    })();
    imgCache.set(title, p);
    return p;
  }
  function paint(el, title, creditEl) {
    if (!title) { el.classList.add("ph-fallback"); return; }
    el.classList.add("shimmer");
    wikiImage(title).then(info => new Promise((res, rej) => {
      const im = new Image();
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
      paint(el, el.dataset.wiki);
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
  wikiImage("Imam_Husayn_Shrine").then(info => new Promise((res, rej) => {
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
    let w, h, dpr, parts = [], running = true;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      parts = Array.from({ length: n }, () => spawn(true));
    }
    function spawn(any) {
      return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, r: Math.random() * 2.2 + .4,
        vy: Math.random() * .35 + .1, vx: (Math.random() - .5) * .15, a: Math.random() * .6 + .2, t: Math.random() * 6.28 };
    }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += .02; p.y -= p.vy; p.x += p.vx + Math.sin(p.t) * .15;
        if (p.y < -10) Object.assign(p, spawn(false));
        const tw = p.a * (.6 + .4 * Math.sin(p.t * 1.7));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `rgba(250,220,150,${tw})`); g.addColorStop(1, "rgba(250,220,150,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    size(); window.addEventListener("resize", size);
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) frame(); }).observe(c);
    frame();
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
  function onScroll() {
    const y = window.scrollY, H = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("solid", y > 40);
    bar.style.width = (H > 0 ? (y / H) * 100 : 0) + "%";
    let cur = "";
    for (const s of sections) if (s.offsetTop - 120 <= y) cur = s.id;
    $$("a", navLinks).forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
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
    $$("#eras .era").forEach(b => b.addEventListener("click", () => { setStoryFilter(b.dataset.era); $("#stories").scrollIntoView(); }));
    $$("#eras .era-img").forEach(el => { if (el.dataset.wiki) lazy(el); else el.classList.add("ph-fallback"); });
    observeReveals($("#eras"));
    const all = STORIES.length, read = STORIES.filter(s => readSet.has(s.id)).length;
    $("#overallFill").style.width = (read / all) * 100 + "%";
    $("#overallText").textContent = `${read} of ${all} stories read`;
  }
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
    reader.style.setProperty("--c", e.color);
    $("#rEra").textContent = e.name;
    $("#rArabic").textContent = s.arabic;
    $("#rTitle").textContent = s.title;
    $("#rMeta").textContent = `${s.when} · ${s.where}`;
    $("#rSummary").textContent = s.summary;
    $("#rContent").innerHTML = s.body;
    $("#rLesson").innerHTML = `<b>Lesson</b>${esc(s.lesson)}`;
    const differ = $("#rDiffer");
    if (s.differ) { differ.hidden = false; differ.innerHTML = `<b>Where accounts differ</b>${esc(s.differ)}`; } else differ.hidden = true;
    $("#rSources").innerHTML = `<b>Sources:</b> ${esc(s.sources)}`;
    const img = $("#rHeroImg"); img.style.backgroundImage = ""; img.classList.remove("ph-fallback");
    img.style.setProperty("--c", e.color);
    $("#rCredit").textContent = "";
    paint(img, STORY_IMAGES[id], $("#rCredit"));
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
  function closeStory(fromHash) {
    if (!reader.classList.contains("open")) return;
    reader.classList.remove("open"); reader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    document.title = "The Path of the Ahl al-Bayt · History & Stories for Learning Shia Islam";
    currentId = null;
    if (!fromHash && location.hash.startsWith("#story/")) history.replaceState(null, "", location.pathname + location.search);
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
    saveRead(); refreshEraBars();
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
            <a class="btn btn-gold" href="#story/${m.story}">Read the story</a>
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
     INIT
     =========================================================== */
  renderEras();
  renderTimeline();
  renderStoryChips();
  renderStories();
  renderRulers();
  renderMasumin();
  renderCompanions();
  renderDates();
  observeReveals();
  onScroll();
  route();
})();
