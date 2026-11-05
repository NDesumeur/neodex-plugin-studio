// Studio de plugins : crée tes petites applis sans écrire de code, à partir d'un modèle (fiches de révision, routine, minuteur d'étapes,
// suivi chiffré, tirage au sort, comptes à rebours, quiz, compteurs, liens). Une création s'épingle en widget sur l'accueil,
// envoie un rappel chaque jour, et se partage par un code à coller dans le studio d'un ami.
const HTML = `<div class="appWrap">
  <div class="agHead"><span class="label">Studio de plugins</span><div class="agNav"><button class="btn px main" id="stNew">+ NOUVEAU</button></div></div>
  <div class="stWrap"><div class="stSide sysCard px"><span class="label">Mes créations</span><div id="stList"></div></div><div id="stMain"></div></div>
</div>`;
const CSS = `.stWrap{display:grid;grid-template-columns:240px 1fr;gap:18px;align-items:start}.stSide{gap:6px}
.stItem{all:unset;display:flex;gap:8px;align-items:center;padding:8px;cursor:var(--cp,pointer);color:var(--lilac);font-size:14px;border:2px solid transparent}.stItem:hover{color:#fff}.stItem.on{border-color:var(--magenta);color:#fff}
.stItem i{font-style:normal;font-size:18px}
.stTpl{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}.stTpl .sysCard{cursor:var(--cp,pointer);gap:8px}.stTpl .sysCard:hover{--c:var(--magenta)}.stTpl .big{font-size:34px}.stTpl b{color:#fff;font:13px var(--title)}
.stEdit{display:grid;grid-template-columns:minmax(320px,1fr) minmax(320px,1fr);gap:18px;align-items:start}
.stForm{gap:10px}.stForm label{display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--muted)}
.stForm input,.stForm textarea,.stForm select{background:var(--bg2,#14102a);color:#fff;border:2px solid var(--line2,#3a2f6a);font:14px var(--body,inherit);padding:6px 8px}
.stBlock{border:2px dashed var(--line2,#3a2f6a);padding:10px;display:flex;flex-direction:column;gap:6px;position:relative}.stBlock .x{position:absolute;top:4px;right:4px}
.stRow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.stRow input{flex:1;min-width:80px}
.stBar{display:flex;gap:8px;flex-wrap:wrap}.stPrev{min-height:320px}
.stCode{width:100%;min-height:260px;background:#05010b;color:#c8f8ff;border:2px solid var(--line2,#3a2f6a);font:12px monospace;padding:8px;white-space:pre}
.stItem small{margin-left:auto;font-size:12px}.stImp{margin-top:16px;gap:8px}.stImp input{flex:1;min-width:200px;background:var(--bg2,#14102a);color:#fff;border:2px solid var(--line2,#3a2f6a);padding:6px 8px;font:13px monospace}
.stForm label.stCheck{flex-direction:row;align-items:center;gap:8px}
/* l'aspect des créations */
.mk{--k:#ff4fa8;display:flex;flex-direction:column;gap:14px;color:#fff;font-size:15px}.mk h2{font:18px var(--title,inherit);color:var(--k);margin:0}
.mk .mkBtn{all:unset;cursor:var(--cp,pointer);padding:10px 14px;background:#1a1236;border:2px solid var(--k);color:#fff;text-align:center;font-size:15px}.mk .mkBtn:hover{background:var(--k);color:#05010b}
.mk .mkBtn.good{background:#2a8a3a;border-color:#5ad05a}.mk .mkBtn.bad{background:#8a2a3a;border-color:#ff5a5a}
.mk .mkGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.mk .mkGrid .mkBtn{display:flex;flex-direction:column;gap:6px;align-items:center;padding:16px}.mk .mkGrid .e{font-size:28px}
.mk .mkCount{display:grid;grid-template-columns:1fr auto auto auto;gap:10px;align-items:center;padding:10px;background:#120c26;border-left:4px solid var(--k)}.mk .mkCount b{font:22px var(--title,inherit);min-width:60px;text-align:right}
.mk .mkGoal{grid-column:1/-1;height:6px;background:#2a2050}.mk .mkGoal i{display:block;height:100%;background:var(--k)}
.mk .mkQ{font-size:17px}.mk .mkSub{color:#b8a8e0;font-size:13px}
.mk .mkCard{padding:28px 18px;background:#120c26;border:2px solid var(--k);font-size:22px;text-align:center}.mk .mkCard.back{border-style:dashed;color:var(--k)}
.mk .mkTask{text-align:left}.mk .mkTask.on{background:color-mix(in srgb,var(--k) 25%,#1a1236);color:#cfc4ee;text-decoration:line-through}
.mk .mkBig{font:56px var(--title,inherit);color:var(--k);text-align:center;font-variant-numeric:tabular-nums}
.mk .mkIn input{flex:1;background:#120c26;color:#fff;border:2px solid var(--k);padding:8px;font-size:15px}
.mk .mkChart{width:100%;height:auto;background:#0b0718}.mk .mkChart polyline{fill:none;stroke:var(--k);stroke-width:2}.mk .mkChart rect{fill:#fff}.mk .mkChart .g{stroke:#7ee07a;stroke-dasharray:4 4}
.mk .mkWheel{align-self:center;width:260px;height:260px}
.mk .mkCount.past{opacity:.45}`;
// ---- les modèles : chacun dessine sa création dans « root » à partir de sa configuration ; api : load / save (sa mémoire), open (un site) ----
function mkQuiz(root, cfg, api) {
  const qs = (cfg.questions || []).filter(q => q.q && q.a?.filter(Boolean).length >= 2);
  const E = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
  let i = 0, score = 0;
  const start = () => { i = 0; score = 0; ask(); };
  function ask() {
    root.replaceChildren(); const h = E('h2', '', cfg.title || 'Quiz'); root.append(h);
    if (!qs.length) { root.append(E('div', 'mkSub', 'Ajoute des questions (au moins deux réponses chacune).')); return; }
    if (i >= qs.length) {
      const best = Math.max(score, api.load('best') || 0); api.save('best', best);
      root.append(E('div', 'mkQ', 'Score : ' + score + ' / ' + qs.length), E('div', 'mkSub', score === qs.length ? 'Sans faute !' : 'Meilleur score : ' + best + ' / ' + qs.length));
      const b = E('button', 'mkBtn', 'Rejouer'); b.onclick = start; root.append(b); return;
    }
    const q = qs[i]; root.append(E('div', 'mkSub', 'Question ' + (i + 1) + ' / ' + qs.length), E('div', 'mkQ', q.q));
    const box = E('div', 'mkGrid');
    q.a.forEach((a, k) => { if (!a) return; const b = E('button', 'mkBtn', a); b.onclick = () => {
      if (box.dataset.done) return; box.dataset.done = 1; const ok = k === (+q.ok || 0); if (ok) score++;
      b.classList.add(ok ? 'good' : 'bad'); if (!ok) box.children[[...q.a.keys()].filter(j => q.a[j]).indexOf(+q.ok || 0)]?.classList.add('good');
      setTimeout(() => { i++; ask(); }, 900); }; box.append(b); });
    root.append(box);
  }
  start();
}
function mkCounter(root, cfg, api) {
  const E = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
  const vals = api.load('vals') || {};
  const draw = () => {
    root.replaceChildren(E('h2', '', cfg.title || 'Compteurs'));
    for (const [k, c] of (cfg.items || []).entries()) {
      if (!c.name) continue; const key = k + ':' + c.name, v = vals[key] || 0, step = +c.step || 1, row = E('div', 'mkCount');
      const minus = E('button', 'mkBtn', '−' + step), plus = E('button', 'mkBtn', '+' + step), zero = E('button', 'mkBtn', '0');
      const set = n => { vals[key] = n; api.save('vals', vals); draw(); };
      minus.onclick = () => set(v - step); plus.onclick = () => set(v + step); zero.onclick = () => set(0); zero.title = 'Remettre à zéro';
      const name = E('span', '', c.name); if (+c.goal) name.append(E('div', 'mkSub', 'objectif ' + c.goal));
      row.append(name, minus, E('b', '', String(v)), plus);
      if (+c.goal) { const g = E('div', 'mkGoal'), f = E('i'); f.style.width = Math.max(0, Math.min(100, v / +c.goal * 100)) + '%'; g.append(f); row.append(g); }
      row.append(zero); root.append(row);
    }
    if (!(cfg.items || []).some(c => c.name)) root.append(E('div', 'mkSub', 'Ajoute un compteur.'));
  };
  draw();
}
function mkLinks(root, cfg, api) {
  const E = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
  root.replaceChildren(E('h2', '', cfg.title || 'Mes liens'));
  if (cfg.text) root.append(E('div', 'mkSub', cfg.text));
  const grid = E('div', 'mkGrid');
  for (const l of cfg.links || []) {
    if (!l.url) continue; const url = /^https?:\/\//.test(l.url) ? l.url : 'https://' + l.url, b = E('button', 'mkBtn');
    b.append(E('span', 'e', l.emoji || '🔗'), E('span', '', l.label || url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0])); b.title = url; b.onclick = () => api.open(url); grid.append(b);
  }
  root.append(grid.childNodes.length ? grid : E('div', 'mkSub', 'Ajoute des liens.'));
}
// ---- les nouveaux modèles (2.0) : des outils de tous les jours ----
const mkE = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
const mkDay = (d = new Date()) => d.toLocaleDateString('sv');  // AAAA-MM-JJ, à l'heure locale
const mkAddDays = (day, n) => { const d = new Date(day + 'T12:00'); d.setDate(d.getDate() + n); return mkDay(d); };
const mkLines = s => String(s || '').split('\n').map(x => x.trim()).filter(Boolean);
const mkCards = cfg => mkLines(cfg.cards).map(l => { const [f, ...b] = l.split('|'); return {f: f.trim(), b: b.join('|').trim()}; }).filter(c => c.f && c.b);
function mkFlash(root, cfg, api) {  // fiches de révision, boîtes de Leitner : su → revue 2, 4, 8… jours plus tard ; raté → revue aujourd'hui
  const cards = mkCards(cfg), box = api.load('box') || {};
  let queue = [], cur = null, shown = false, all = false;
  const start = force => { all = force; queue = cards.filter(c => force || (box[c.f]?.due || '') <= mkDay()).sort(() => Math.random() - .5); next(); };
  const next = () => { cur = queue.shift() || null; shown = false; draw(); };
  const grade = ok => { const b = ok ? Math.min(6, (box[cur.f]?.b || 0) + 1) : 0; box[cur.f] = {b, due: ok ? mkAddDays(mkDay(), 2 ** b) : mkDay()}; api.save('box', box); if (!ok) queue.push(cur); next(); };
  function draw() {
    root.replaceChildren(mkE('h2', '', cfg.title || 'Révisions'));
    if (!cards.length) return root.append(mkE('div', 'mkSub', 'Ajoute des fiches : une par ligne, « recto | verso ».'));
    if (!cur) {
      const due = cards.filter(c => (box[c.f]?.due || '') <= mkDay()).length, known = cards.filter(c => (box[c.f]?.b || 0) >= 3).length;
      root.append(mkE('div', 'mkQ', due ? due + ' fiche' + (due > 1 ? 's' : '') + ' à réviser' : 'Fini pour aujourd\'hui !'), mkE('div', 'mkSub', cards.length + ' fiches · ' + known + ' bien sues'));
      const b = mkE('button', 'mkBtn', due ? 'Réviser' : 'Tout revoir quand même'); b.onclick = () => start(!due); root.append(b); return;
    }
    root.append(mkE('div', 'mkSub', (queue.length + 1) + ' restante' + (queue.length ? 's' : '') + (all ? ' · révision libre' : '')), mkE('div', 'mkCard', cur.f));
    if (!shown) { const b = mkE('button', 'mkBtn', 'Voir la réponse'); b.onclick = () => { shown = true; draw(); }; return root.append(b); }
    const a = mkE('div', 'mkCard back', cur.b), row = mkE('div', 'mkGrid'), y = mkE('button', 'mkBtn good', 'Je savais'), n = mkE('button', 'mkBtn bad', 'À revoir');
    y.onclick = () => grade(true); n.onclick = () => grade(false); row.append(n, y); root.append(a, row);
  }
  draw();
}
function mkRoutine(root, cfg, api) {  // une liste qui se remet à zéro chaque jour, avec la série de jours complets
  const items = mkLines(cfg.items);
  const st = () => { const s = api.load('st') || {}; if (s.day !== mkDay()) Object.assign(s, {day: mkDay(), done: []}); return s; };
  function draw() {
    const s = st(); root.replaceChildren(mkE('h2', '', cfg.title || 'Ma routine'));
    if (!items.length) return root.append(mkE('div', 'mkSub', 'Ajoute des tâches : une par ligne.'));
    const n = items.filter((_, i) => s.done.includes(i)).length, g = mkE('div', 'mkGoal'), f = mkE('i'); f.style.width = n / items.length * 100 + '%'; g.append(f);
    root.append(mkE('div', 'mkSub', n + ' / ' + items.length + ' aujourd\'hui · série : ' + (s.streak || 0) + ' jour' + ((s.streak || 0) > 1 ? 's' : '')), g);
    items.forEach((t, i) => { const b = mkE('button', 'mkBtn mkTask' + (s.done.includes(i) ? ' on' : ''), (s.done.includes(i) ? '✓ ' : '○ ') + t); b.onclick = () => {
      s.done = s.done.includes(i) ? s.done.filter(x => x !== i) : [...s.done, i];
      if (items.every((_, k) => s.done.includes(k)) && s.last !== s.day) { s.streak = s.last === mkAddDays(s.day, -1) ? (s.streak || 0) + 1 : 1; s.last = s.day; }
      api.save('st', s); draw(); }; root.append(b); });
  }
  draw();
}
function mkSteps(root, cfg, api) {  // un minuteur d'étapes (sport, cuisine, pomodoro) : un bip à chaque étape, des tours
  const steps = (cfg.steps || []).filter(s => s.name && +s.sec > 0), rounds = Math.max(1, +cfg.rounds || 1);
  let i = 0, r = 1, left = steps[0]?.sec || 0, timer = null;
  const beep = (f = 880, d = .18) => { try { const a = mkSteps.ac ??= new AudioContext(), o = a.createOscillator(), g = a.createGain(); o.frequency.value = f; g.gain.setValueAtTime(.25, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + d); o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + d); } catch {} };
  const mmss = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const stop = () => { clearInterval(timer); timer = null; };
  const tick = () => {
    if (!root.isConnected) return stop();
    if (--left > 0) { if (left <= 3) beep(660, .08); return draw(); }
    if (++i >= steps.length) { i = 0; if (++r > rounds) { stop(); r = rounds; i = steps.length - 1; left = 0; beep(523, .5); api.save('done', (api.load('done') || 0) + 1); return draw(true); } }
    left = +steps[i].sec; beep(); draw();
  };
  function draw(end) {
    root.replaceChildren(mkE('h2', '', cfg.title || 'Minuteur'));
    if (!steps.length) return root.append(mkE('div', 'mkSub', 'Ajoute des étapes avec leur durée.'));
    const s = steps[i], next = steps[i + 1] || (r < rounds ? steps[0] : null);
    root.append(mkE('div', 'mkSub', 'Tour ' + r + ' / ' + rounds + ' · étape ' + (i + 1) + ' / ' + steps.length), mkE('div', 'mkQ', end ? 'Terminé !' : s.name), mkE('div', 'mkBig', end ? '✓' : mmss(left)),
      mkE('div', 'mkSub', end ? 'Séances finies : ' + (api.load('done') || 0) : next ? 'Ensuite : ' + next.name : 'Dernière étape'));
    const row = mkE('div', 'mkGrid'), go = mkE('button', 'mkBtn', timer ? 'Pause' : end ? 'Recommencer' : 'Démarrer'), skip = mkE('button', 'mkBtn', 'Passer'), reset = mkE('button', 'mkBtn', 'Remettre à zéro');
    go.onclick = () => { if (end) { i = 0; r = 1; left = +steps[0].sec; } if (timer) stop(); else { beep(); timer = setInterval(tick, 1000); } draw(); };
    skip.onclick = () => { left = 1; tick(); }; reset.onclick = () => { stop(); i = 0; r = 1; left = +steps[0].sec; draw(); };
    row.append(go, skip, reset); root.append(row);
  }
  draw();
}
function mkTracker(root, cfg, api) {  // un suivi chiffré au jour le jour (poids, sommeil, pas…) : courbe, moyenne, objectif
  const vals = api.load('vals') || {}, unit = cfg.unit ? ' ' + cfg.unit : '';
  function draw() {
    root.replaceChildren(mkE('h2', '', cfg.title || 'Mon suivi'));
    const days = Object.keys(vals).sort(), last = days.slice(-30), wk = days.filter(d => d > mkAddDays(mkDay(), -7)).map(d => vals[d]);
    const row = mkE('div', 'stRow mkIn'), inp = mkE('input'); inp.type = 'number'; inp.step = 'any'; inp.placeholder = (cfg.label || 'Valeur') + ' du jour'; inp.value = vals[mkDay()] ?? '';
    const ok = mkE('button', 'mkBtn', 'Noter'); ok.onclick = () => { if (inp.value === '') return; vals[mkDay()] = +inp.value; api.save('vals', vals); draw(); }; inp.onkeydown = e => e.key === 'Enter' && ok.click();
    row.append(inp, ok); root.append(row);
    if (!days.length) return root.append(mkE('div', 'mkSub', 'Note ta première valeur.'));
    const avg = wk.length ? Math.round(wk.reduce((a, b) => a + b, 0) / wk.length * 10) / 10 : null;
    root.append(mkE('div', 'mkSub', 'Dernière : ' + vals[days.at(-1)] + unit + (avg != null ? ' · moyenne 7 j : ' + avg + unit : '') + (+cfg.goal ? ' · objectif : ' + cfg.goal + unit : '')));
    const ys = last.map(d => vals[d]).concat(+cfg.goal ? [+cfg.goal] : []), lo = Math.min(...ys), hi = Math.max(...ys), W = 300, H = 110, y = v => H - 8 - (hi === lo ? .5 : (v - lo) / (hi - lo)) * (H - 16), x = k => last.length < 2 ? W / 2 : 8 + k * (W - 16) / (last.length - 1);
    const svg = `<svg viewBox="0 0 ${W} ${H}" class="mkChart">${+cfg.goal ? `<line x1="0" x2="${W}" y1="${y(+cfg.goal)}" y2="${y(+cfg.goal)}" class="g"/>` : ''}<polyline points="${last.map((d, k) => x(k) + ',' + y(vals[d])).join(' ')}"/>${last.map((d, k) => `<rect x="${x(k) - 2}" y="${y(vals[d]) - 2}" width="4" height="4"><title>${d} : ${vals[d]}${unit}</title></rect>`).join('')}</svg>`;
    const c = mkE('div'); c.innerHTML = svg; root.append(c);
    for (const d of days.slice(-5).reverse()) { const r = mkE('div', 'mkCount'), del = mkE('button', 'mkBtn', '✕'); del.title = 'Effacer'; del.onclick = () => { delete vals[d]; api.save('vals', vals); draw(); }; r.append(mkE('span', '', d.split('-').reverse().join('/')), mkE('span'), mkE('b', '', vals[d] + unit), del); root.append(r); }
  }
  draw();
}
function mkWheel(root, cfg, api) {  // le tirage au sort : une roue qui tourne et s'arrête sur un choix
  const items = mkLines(cfg.items), cols = ['#ff4fa8', '#5ec8ff', '#7ee07a', '#ffd84a', '#b06bff', '#ff8a3a'];
  let left = items.slice(), ang = 0, spin = false;
  function draw(res) {
    root.replaceChildren(mkE('h2', '', cfg.title || 'Tirage au sort'));
    if (items.length < 2) return root.append(mkE('div', 'mkSub', 'Ajoute au moins deux choix : un par ligne.'));
    const cv = mkE('canvas', 'mkWheel'); cv.width = cv.height = 260; root.append(cv);
    const paint = () => { const g = cv.getContext('2d'), n = left.length, R = 120; g.clearRect(0, 0, 260, 260); g.save(); g.translate(130, 130); g.rotate(ang);
      left.forEach((t, k) => { g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R, k * 2 * Math.PI / n, (k + 1) * 2 * Math.PI / n); g.fillStyle = cols[k % cols.length]; g.fill(); g.save(); g.rotate((k + .5) * 2 * Math.PI / n); g.fillStyle = '#05010b'; g.font = 'bold 13px sans-serif'; g.textAlign = 'right'; g.fillText(t.slice(0, 16), R - 10, 4); g.restore(); });
      g.restore(); g.fillStyle = '#fff'; g.beginPath(); g.moveTo(250, 130); g.lineTo(232, 120); g.lineTo(232, 140); g.fill(); };
    paint();
    root.append(mkE('div', 'mkQ', res ? '→ ' + res : left.length + ' choix'));
    const b = mkE('button', 'mkBtn', 'Lancer'); b.onclick = () => {
      if (spin) return; spin = true; const t0 = performance.now(), from = ang, by = 8 * Math.PI + Math.random() * 2 * Math.PI;
      const step = now => { const k = Math.min(1, (now - t0) / 3200); ang = from + by * (1 - (1 - k) ** 3); paint(); if (k < 1 && cv.isConnected) return requestAnimationFrame(step);
        spin = false; const n = left.length, a = ((-ang % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), pick = left[Math.floor(a / (2 * Math.PI / n)) % n];
        api.save('hist', [pick, ...(api.load('hist') || [])].slice(0, 10)); if (cfg.remove && left.length > 2) left = left.filter(x => x !== pick); draw(pick); };
      requestAnimationFrame(step); };
    root.append(b);
    const h = api.load('hist') || []; if (h.length) root.append(mkE('div', 'mkSub', 'Derniers tirages : ' + h.slice(0, 5).join(', ')));
    if (cfg.remove && left.length < items.length) { const r = mkE('button', 'mkBtn', 'Remettre tous les choix'); r.onclick = () => { left = items.slice(); draw(); }; root.append(r); }
  }
  draw();
}
const mkNextDate = e => { if (!e.date) return null; if (!e.yearly) return e.date; const t = mkDay(); let d = t.slice(0, 4) + e.date.slice(4); if (d < t) d = (+t.slice(0, 4) + 1) + e.date.slice(4); return d; };
const mkDaysTo = d => Math.round((new Date(d + 'T12:00') - new Date(mkDay() + 'T12:00')) / 864e5);
function mkCountdown(root, cfg) {  // les comptes à rebours : examens, voyages, anniversaires (chaque année)
  root.replaceChildren(mkE('h2', '', cfg.title || 'Comptes à rebours'));
  const evs = (cfg.events || []).filter(e => e.name && e.date).map(e => ({...e, d: mkNextDate(e)})).sort((a, b) => a.d.localeCompare(b.d));
  if (!evs.length) return root.append(mkE('div', 'mkSub', 'Ajoute un événement avec sa date.'));
  for (const e of evs) { const n = mkDaysTo(e.d), r = mkE('div', 'mkCount' + (n < 0 ? ' past' : ''));
    r.append(mkE('span', '', (e.emoji || '📅') + ' ' + e.name), mkE('span', 'mkSub', e.d.split('-').reverse().join('/')), mkE('b', '', n === 0 ? 'aujourd\'hui !' : n < 0 ? 'passé' : n + ' j'), mkE('span')); root.append(r); }
}
const TEMPLATES = {
  flash: {icon: '🃏', name: 'Fiches de révision', what: 'Recto / verso, et chaque fiche revient au bon moment (boîtes de Leitner).', run: mkFlash, def: {title: 'Vocabulaire anglais', color: '#5ec8ff', cards: 'chat | cat\nchien | dog\nmaison | house'},
    sum: (cfg, m) => { const c = mkCards(cfg), due = c.filter(x => (m.box?.[x.f]?.due || '') <= mkDay()).length; return [due ? due + ' fiche(s) à réviser' : 'Rien à réviser aujourd\'hui', c.length + ' fiches']; }},
  routine: {icon: '✅', name: 'Routine du jour', what: 'Une liste qui se remet à zéro chaque matin, et ta série de jours complets.', run: mkRoutine, def: {title: 'Ma routine', color: '#7ee07a', items: 'Boire un grand verre d\'eau\n10 min de lecture\nRanger le bureau'},
    sum: (cfg, m) => { const n = mkLines(cfg.items).length, s = m.st?.day === mkDay() ? m.st : {done: [], streak: m.st?.streak}; return [(s.done?.length || 0) + ' / ' + n + ' fait aujourd\'hui', 'Série : ' + (s.streak || 0) + ' j']; }},
  steps: {icon: '⏱️', name: 'Minuteur d\'étapes', what: 'Des étapes chronométrées qui s\'enchaînent avec un bip : sport, cuisine, pomodoro.', run: mkSteps, def: {title: 'Pomodoro', color: '#ff8a3a', rounds: 4, steps: [{name: 'Travail', sec: 1500}, {name: 'Pause', sec: 300}]},
    sum: (cfg, m) => [(cfg.steps || []).length + ' étapes × ' + (cfg.rounds || 1) + ' tours', 'Séances finies : ' + (m.done || 0)]},
  tracker: {icon: '📈', name: 'Suivi chiffré', what: 'Note une valeur par jour : courbe, moyenne de la semaine et objectif.', run: mkTracker, def: {title: 'Sommeil', color: '#b06bff', label: 'Heures', unit: 'h', goal: 8},
    sum: (cfg, m) => { const d = Object.keys(m.vals || {}).sort(); return d.length ? ['Dernière : ' + m.vals[d.at(-1)] + (cfg.unit ? ' ' + cfg.unit : ''), m.vals[mkDay()] == null ? 'Pas encore noté aujourd\'hui' : 'Noté aujourd\'hui'] : ['Rien de noté']; }},
  wheel: {icon: '🎡', name: 'Tirage au sort', what: 'Une roue qui choisit pour toi : repas, film, qui commence…', run: mkWheel, def: {title: 'On mange quoi ?', color: '#ffd84a', remove: false, items: 'Pizza\nSushis\nPâtes\nBurger\nSalade'},
    sum: (cfg, m) => [m.hist?.[0] ? 'Dernier tirage : ' + m.hist[0] : mkLines(cfg.items).length + ' choix']},
  countdown: {icon: '📅', name: 'Comptes à rebours', what: 'Les jours qui restent avant tes dates : examens, voyages, anniversaires.', run: mkCountdown, def: {title: 'Mes dates', color: '#ff4fa8', events: [{name: 'Nouvel an', date: mkDay().slice(0, 4) + '-12-31', emoji: '🎆', yearly: true}]},
    sum: cfg => (cfg.events || []).filter(e => e.name && e.date).map(e => ({e, n: mkDaysTo(mkNextDate(e))})).filter(x => x.n >= 0).sort((a, b) => a.n - b.n).slice(0, 3).map(x => (x.e.emoji || '📅') + ' ' + x.e.name + ' : ' + (x.n ? x.n + ' j' : 'aujourd\'hui'))},
  quiz: {icon: '❓', name: 'Jeu de quiz', what: 'Des questions à choix multiples, un score et un record.', run: mkQuiz, def: {title: 'Mon quiz', color: '#ff4fa8', questions: [{q: 'Quelle est la capitale du Japon ?', a: ['Kyoto', 'Tokyo', 'Osaka', 'Sapporo'], ok: 1}]},
    sum: (cfg, m) => [(cfg.questions || []).length + ' questions', 'Record : ' + (m.best || 0)]},
  counter: {icon: '🔢', name: 'Compteur', what: 'Des compteurs avec + et −, un pas et un objectif.', run: mkCounter, def: {title: 'Mes compteurs', color: '#5ec8ff', items: [{name: 'Verres d’eau', step: 1, goal: 8}]},
    sum: (cfg, m) => (cfg.items || []).filter(c => c.name).slice(0, 4).map((c, k) => c.name + ' : ' + (m.vals?.[k + ':' + c.name] || 0) + (+c.goal ? ' / ' + c.goal : ''))},
  links: {icon: '🔗', name: 'Page de liens', what: 'Une grille de boutons vers tes sites préférés.', run: mkLinks, def: {title: 'Mes liens', color: '#7ee07a', text: '', links: [{label: 'NeoDex', url: 'https://github.com/NDesumeur', emoji: '⭐'}]},
    sum: cfg => [(cfg.links || []).length + ' liens']},
};
// le partage : une création (sans ses scores) tient dans un code à copier, que le studio d'un ami importe
const shareCode = a => 'NEOSTUDIO:' + btoa(unescape(encodeURIComponent(JSON.stringify({tpl: a.tpl, title: a.title, cfg: a.cfg}))));
const readShare = s => { const j = JSON.parse(decodeURIComponent(escape(atob(String(s).trim().replace(/^NEOSTUDIO:/, ''))))); if (!TEMPLATES[j.tpl] || typeof j.cfg !== 'object') throw new Error('code inconnu'); return j; };
{  // vérifications : le partage fait l'aller-retour, la roue des jours et les fiches se lisent
  const a = {tpl: 'flash', title: 'Été à Paris !', cfg: TEMPLATES.flash.def};
  console.assert(JSON.stringify(readShare(shareCode(a))) === JSON.stringify({tpl: a.tpl, title: a.title, cfg: a.cfg}), 'studio partage');
  console.assert(mkAddDays('2026-12-31', 1) === '2027-01-01' && mkCards({cards: 'a | b\nsans verso\nc|d|e'}).length === 2, 'studio dates / fiches');
}
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const { el, toast, newTab, confirm } = ctx.host, folder = ctx.folder;
  ctx.host.addStyle(CSS);
  view.innerHTML = HTML;
  const $ = id => view.querySelector('#' + id);
  let data = {apps: [], mem: {}, pin: '', fired: {}}; try { data = Object.assign(data, await folder.read('studio')); } catch {}
  let saveT = null; const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { folder.write('studio', data).catch(() => {}); widget(); }, 400); };
  let cur = null, mode = 'edit';
  const apiFor = app => ({load: k => data.mem[app.id]?.[k], save: (k, v) => { (data.mem[app.id] ??= {})[k] = v; save(); }, open: u => newTab(u)});
  const sumOf = a => { try { return TEMPLATES[a.tpl].sum?.(a.cfg, data.mem[a.id] || {}) || []; } catch { return []; } };
  // le widget de l'accueil : la création épinglée, en résumé
  function widget() {
    const a = data.apps.find(x => x.id === data.pin);
    (a ? ctx.widget.set({title: TEMPLATES[a.tpl].icon + ' ' + (a.title || 'Sans titre'), lines: sumOf(a).length ? sumOf(a) : [TEMPLATES[a.tpl].name]}) : ctx.widget.clear()).catch(() => {});
  }
  // les rappels : chaque jour à l'heure choisie, une notification de NeoDex (vérifié chaque minute, même onglet fermé)
  let bg = false;
  const remindTick = () => {
    const now = new Date(), hm = now.toTimeString().slice(0, 5), day = mkDay(now);
    for (const a of data.apps) if (a.remind && a.remind <= hm && data.fired[a.id] !== day && hm < a.remind.slice(0, 2) + ':59') {
      data.fired[a.id] = day; save();
      ctx.notifications.send({title: '⏰ ' + (a.title || 'Studio'), body: sumOf(a)[0] || 'C\'est l\'heure !', open: 'plugin:neodex.studio'}).catch(() => {});
    }
  };
  const startBg = async () => { if (bg || !data.apps.some(a => a.remind)) return; bg = await ctx.background.every(1, remindTick).catch(() => false); if (bg) remindTick(); };
  function list() {
    $('stList').replaceChildren(...data.apps.map(a => { const b = el('button', 'stItem' + (a === cur ? ' on' : '')); b.append(el('i', '', TEMPLATES[a.tpl].icon), el('span', '', a.title || 'Sans titre'), el('small', '', (a.id === data.pin ? '📌' : '') + (a.remind ? '⏰' : ''))); b.onclick = () => { cur = a; mode = 'play'; draw(); }; return b; }));
    if (!data.apps.length) $('stList').append(el('div', 'hint', 'Rien pour l\'instant : clique sur + NOUVEAU.'));
  }
  const addApp = (tpl, title, cfg) => { cur = {id: Date.now().toString(36), tpl, title, cfg: JSON.parse(JSON.stringify(cfg))}; data.apps.push(cur); save(); };
  function draw() {
    list(); const main = $('stMain');
    if (!cur) {  // choisir un modèle, ou importer une création partagée
      const g = el('div', 'stTpl');
      for (const [k, t] of Object.entries(TEMPLATES)) { const c = el('div', 'sysCard px'); c.append(el('span', 'big', t.icon), el('b', '', t.name.toUpperCase()), el('span', 'hint', t.what)); c.onclick = () => { addApp(k, t.def.title, t.def); mode = 'edit'; draw(); }; g.append(c); }
      const imp = el('div', 'sysCard px stImp'), code = el('input'), go = el('button', 'btn px', 'IMPORTER');
      code.placeholder = 'Colle ici le code NEOSTUDIO:… qu\'on t\'a envoyé';
      go.onclick = () => { try { const j = readShare(code.value); addApp(j.tpl, j.title, j.cfg); mode = 'play'; draw(); toast('Création importée'); } catch { toast('Ce code n\'est pas un partage du Studio', true); } };
      imp.append(el('span', 'label', 'Importer un partage'), el('div', 'stRow'));
      imp.lastChild.append(code, go);
      main.replaceChildren(el('div', 'hint', 'Choisis un modèle : tu le remplis, tu vois le résultat tout de suite. Épingle-le sur l\'accueil, ajoute un rappel, partage-le.'), g, imp); main.firstChild.style.marginBottom = '12px'; return;
    }
    const bar = el('div', 'stBar'), b = (t, f, on, tip) => { const x = el('button', 'btn px' + (on ? ' on main' : ''), t); x.onclick = f; if (tip) x.title = tip; bar.append(x); };
    b('▶ UTILISER', () => { mode = 'play'; draw(); }, mode === 'play'); b('✎ MODIFIER', () => { mode = 'edit'; draw(); }, mode === 'edit');
    b(data.pin === cur.id ? '📌 DÉSÉPINGLER' : '📌 ÉPINGLER', () => { data.pin = data.pin === cur.id ? '' : cur.id; save(); widget(); toast(data.pin ? 'Épinglée sur l\'accueil (widget)' : 'Retirée de l\'accueil'); draw(); }, data.pin === cur.id, 'Son résumé dans un widget de l\'accueil de NeoDex');
    b('⇪ PARTAGER', () => { mode = 'share'; draw(); }, mode === 'share');
    b('⧉ DUPLIQUER', () => { addApp(cur.tpl, (cur.title || 'Sans titre') + ' (copie)', cur.cfg); mode = 'edit'; draw(); });
    b('✕ SUPPRIMER', async () => { if (!(await confirm('Supprimer « ' + (cur.title || 'Sans titre') + ' » ?', {danger: true}).catch(() => false))) return; data.apps = data.apps.filter(a => a !== cur); delete data.mem[cur.id]; if (data.pin === cur.id) data.pin = ''; cur = null; save(); draw(); });
    const stage = el('div', 'mk'); stage.style.setProperty('--k', cur.cfg.color || '#ff4fa8');
    if (mode === 'play') { const box = el('div', 'sysCard px stPrev'); box.append(stage); main.replaceChildren(bar, box); TEMPLATES[cur.tpl].run(stage, cur.cfg, apiFor(cur)); bar.style.marginBottom = '14px'; return; }
    if (mode === 'share') {
      const box = el('div', 'sysCard px'), c = el('textarea', 'stCode'), copy = el('button', 'btn px main', 'COPIER LE CODE');
      c.value = shareCode(cur); c.readOnly = true; c.style.minHeight = '120px'; c.style.whiteSpace = 'pre-wrap'; c.style.wordBreak = 'break-all';
      copy.onclick = () => { navigator.clipboard.writeText(c.value).then(() => toast('Code copié'), () => { c.select(); document.execCommand('copy'); toast('Code copié'); }); };
      box.append(el('span', 'label', 'Partager « ' + (cur.title || 'Sans titre') + ' »'), el('div', 'hint', 'Envoie ce code à un ami : dans son Studio de plugins, + NOUVEAU → Importer un partage. Il reçoit la création sans tes scores ni tes notes.'), c, copy);
      main.replaceChildren(bar, box); bar.style.marginBottom = '14px'; return;
    }
    // modifier : le formulaire à gauche, l'aperçu en direct à droite
    const form = el('div', 'sysCard px stForm'), prev = el('div', 'sysCard px stPrev'), wrap = el('div', 'stEdit');
    const refresh = () => { stage.style.setProperty('--k', cur.cfg.color || '#ff4fa8'); TEMPLATES[cur.tpl].run(stage, cur.cfg, {load: k => data.mem[cur.id]?.[k], save() {}, open: u => newTab(u)}); list(); save(); };
    const field = (label, obj, key, type = 'text', after) => { const l = el('label', '', label), i = el(type === 'area' ? 'textarea' : 'input'); if (type !== 'area') i.type = type; else i.rows = 6; if (type === 'checkbox') i.checked = !!obj[key]; else i.value = obj[key] ?? ''; i.oninput = () => { obj[key] = type === 'number' ? +i.value : type === 'checkbox' ? i.checked : i.value; if (obj === cur.cfg && key === 'title') cur.title = i.value; after?.(); refresh(); }; if (type === 'checkbox') { l.classList.add('stCheck'); l.prepend(i); } else l.append(i); return l; };
    const block = (arr, idx, fill) => { const bl = el('div', 'stBlock'), x = el('button', 'btn px x', '✕'); x.title = 'Retirer'; x.onclick = () => { arr.splice(idx, 1); draw(); }; bl.append(x); fill(bl); return bl; };
    const add = (t, f) => { const x = el('button', 'btn px', t); x.onclick = () => { f(); draw(); }; return x; };
    form.append(el('span', 'label', TEMPLATES[cur.tpl].name), field('Titre', cur.cfg, 'title'), field('Couleur', cur.cfg, 'color', 'color'),
      field('Rappel chaque jour à (vide : aucun)', cur, 'remind', 'time', () => startBg()));
    if (cur.tpl === 'flash') form.append(field('Fiches : une par ligne, « recto | verso »', cur.cfg, 'cards', 'area'));
    if (cur.tpl === 'routine') form.append(field('Tâches : une par ligne', cur.cfg, 'items', 'area'));
    if (cur.tpl === 'wheel') form.append(field('Choix : un par ligne', cur.cfg, 'items', 'area'), field('Retirer le choix tiré (jusqu\'à ce qu\'il en reste deux)', cur.cfg, 'remove', 'checkbox'));
    if (cur.tpl === 'tracker') { const r = el('div', 'stRow'); r.append(field('Ce qu\'on note', cur.cfg, 'label'), field('Unité', cur.cfg, 'unit'), field('Objectif (0 = aucun)', cur.cfg, 'goal', 'number')); form.append(r); }
    if (cur.tpl === 'steps') {
      form.append(field('Nombre de tours', cur.cfg, 'rounds', 'number'));
      cur.cfg.steps.forEach((s, i) => form.append(block(cur.cfg.steps, i, bl => { const r = el('div', 'stRow'); r.append(field('Étape', s, 'name'), field('Durée (secondes)', s, 'sec', 'number')); bl.append(r); })));
      form.append(add('+ ÉTAPE', () => cur.cfg.steps.push({name: '', sec: 60})));
    }
    if (cur.tpl === 'countdown') {
      cur.cfg.events.forEach((e, i) => form.append(block(cur.cfg.events, i, bl => { const r = el('div', 'stRow'); r.append(field('Émoji', e, 'emoji'), field('Événement', e, 'name'), field('Date', e, 'date', 'date')); bl.append(r, field('Revient chaque année (anniversaire)', e, 'yearly', 'checkbox')); })));
      form.append(add('+ DATE', () => cur.cfg.events.push({name: '', date: '', emoji: '📅', yearly: false})));
    }
    if (cur.tpl === 'quiz') {
      cur.cfg.questions.forEach((q, i) => form.append(block(cur.cfg.questions, i, bl => {
        bl.append(field('Question ' + (i + 1), q, 'q'));
        const ok = el('select'); ok.title = 'La bonne réponse';
        for (let k = 0; k < 4; k++) { const r = el('div', 'stRow'); r.append(el('span', 'hint', String.fromCharCode(65 + k)), field('', q.a, k)); bl.append(r); const o = el('option', '', 'Bonne réponse : ' + String.fromCharCode(65 + k)); o.value = k; ok.append(o); }
        ok.value = q.ok || 0; ok.onchange = () => { q.ok = +ok.value; refresh(); }; bl.append(ok);
      })));
      form.append(add('+ QUESTION', () => cur.cfg.questions.push({q: '', a: ['', '', '', ''], ok: 0})));
    }
    if (cur.tpl === 'counter') { cur.cfg.items.forEach((c, i) => form.append(block(cur.cfg.items, i, bl => { const r = el('div', 'stRow'); r.append(field('Nom', c, 'name'), field('Pas', c, 'step', 'number'), field('Objectif (0 = aucun)', c, 'goal', 'number')); bl.append(r); }))); form.append(add('+ COMPTEUR', () => cur.cfg.items.push({name: '', step: 1, goal: 0}))); }
    if (cur.tpl === 'links') { form.append(field('Texte d\'introduction', cur.cfg, 'text', 'area')); cur.cfg.links.forEach((l, i) => form.append(block(cur.cfg.links, i, bl => { const r = el('div', 'stRow'); r.append(field('Émoji', l, 'emoji'), field('Nom', l, 'label')); bl.append(r, field('Adresse', l, 'url')); }))); form.append(add('+ LIEN', () => cur.cfg.links.push({label: '', url: '', emoji: '🔗'}))); }
    prev.append(el('span', 'label', 'Aperçu'), stage); wrap.append(form, prev); main.replaceChildren(bar, wrap); bar.style.marginBottom = '14px'; refresh();
  }
  $('stNew').onclick = () => { cur = null; draw(); };
  widget(); startBg();
  ctx.onOpen(() => draw());
}
