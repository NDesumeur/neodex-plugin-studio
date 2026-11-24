// Studio de plugins : crée tes petites applis sans écrire de code, à partir d'un modèle (fiches de révision, routine, minuteur d'étapes,
// suivi chiffré, tirage au sort, comptes à rebours, quiz, compteurs, liens). Une création s'épingle en widget sur l'accueil,
// envoie un rappel chaque jour, et se partage par un code à coller dans le studio d'un ami.
const HTML = `<div class="appWrap wide">
  <div class="agHead"><span class="label">Studio de plugins</span><div class="agNav"><button class="btn px main" id="stNew">+ NOUVEAU</button></div></div>
  <div class="stWrap"><div class="stSide sysCard px"><span class="label">Mes créations</span><div id="stList"></div></div><div id="stMain"></div></div>
</div>`;
const CSS = `.stWrap{display:grid;grid-template-columns:clamp(220px,17vw,300px) minmax(0,1fr);gap:clamp(14px,1.4vw,24px);align-items:start}.stSide{gap:6px}
.stItem{all:unset;display:flex;gap:8px;align-items:center;padding:8px;cursor:var(--cp,pointer);color:var(--lilac);font-size:14px;border:2px solid transparent}.stItem:hover{color:#fff}.stItem.on{border-color:var(--magenta);color:#fff}
.stItem i{font-style:normal;font-size:18px}
.stTpl{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(250px,16vw,320px),1fr));gap:clamp(14px,1.3vw,22px)}.stTpl .sysCard{cursor:var(--cp,pointer);gap:10px;padding:28px 20px 20px;min-height:clamp(170px,13vw,220px)}.stTpl .sysCard:hover{--c:var(--magenta)}.stTpl .big{font-size:34px}.stTpl b{color:#fff;font:clamp(15px,1.1vw,19px)/1.3 var(--title)}.stTpl .hint{font-size:clamp(15px,1vw,17px);line-height:1.45}
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
.mk .mkCount.past{opacity:.45}
.mk .mkHab{display:grid;gap:4px 6px;align-items:center}.mk .mkHab>span:not(.mkSub){overflow-wrap:anywhere;font-size:14px}.mk .mkHab .mkSub{text-align:center}.mk .mkHab b{font:12px var(--title,inherit);color:var(--k);text-align:right}
.mk .mkDot{all:unset;cursor:var(--cp,pointer);width:26px;height:26px;display:grid;place-items:center;background:#120c26;box-shadow:inset 0 0 0 2px #2a2050;font-size:14px}.mk .mkDot:hover{box-shadow:inset 0 0 0 2px var(--k)}
.mk .mkDot.on{background:var(--k);color:#05010b;box-shadow:inset -3px -3px 0 rgba(0,0,0,.25)}
.mk .mkTop{display:flex;gap:6px;flex-wrap:wrap}.mk .mkTop .mkBtn{padding:6px 10px;font-size:13px}.mk .mkTop .mkBtn.on{background:var(--k);color:#05010b}
.mk .mkMsg{padding:8px 12px;background:color-mix(in srgb,var(--k) 22%,#120c26);border-left:4px solid var(--k)}
.mk .mkLi{display:flex;gap:8px;align-items:center;padding:6px 10px;background:#120c26}.mk .mkLi span{flex:1;overflow-wrap:anywhere}.mk .mkLi.on span{text-decoration:line-through;opacity:.6}
.mk .mkLi button{all:unset;cursor:var(--cp,pointer);padding:2px 8px;color:#b8a8e0}.mk .mkLi button:hover{color:#fff}
.mk img.mkImg{max-width:100%;align-self:center}.mk hr{border:0;border-top:2px solid #2a2050;width:100%}
.mk .mkChk{display:flex;gap:10px;align-items:center;cursor:var(--cp,pointer)}.mk .mkChk input{width:20px;height:20px;accent-color:var(--k)}
.stScr{display:flex;gap:6px;flex-wrap:wrap}.stScr .btn{padding:6px 10px}
.stComp{border:2px solid var(--line2,#3a2f6a);padding:10px;display:flex;flex-direction:column;gap:6px;background:rgba(0,0,0,.15)}
.stComp>.stRow:first-child b{flex:1;color:#fff;font-size:13px;letter-spacing:.05em}
.stBlk{display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding:6px 8px;border-radius:6px;color:#fff;font-size:13px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.25)}
.stBlk input,.stBlk select{background:rgba(0,0,0,.35)!important;border:1px solid rgba(255,255,255,.35)!important;color:#fff;padding:3px 6px!important;font-size:13px!important;width:auto;min-width:60px}
.stBlk.ecran{background:#a0549c}.stBlk.ajoute,.stBlk.met,.stBlk.hasard{background:#e0752a}.stBlk.liste,.stBlk.vide{background:#c43a5c}.stBlk.si{background:#c99b1a;flex-direction:column;align-items:stretch}
.stBlk.message,.stBlk.son,.stBlk.lien{background:#4a7ad8}.stBlk .x{all:unset;cursor:var(--cp,pointer);margin-left:auto;padding:0 4px}
.stBlk.si>.stBlks{margin-left:14px;border-left:4px solid rgba(0,0,0,.3);padding-left:8px}.stBlks{display:flex;flex-direction:column;gap:5px}
.stPx{width:30px;height:30px;image-rendering:pixelated;flex:none}.stItem .stPx{width:20px;height:20px}
.stTpl .sysCard{position:relative}.stTpl .sysCard::before{content:'';position:absolute;left:0;right:0;top:0;height:6px;background:var(--tc,#ff4fa8);box-shadow:inset 0 -2px 0 rgba(0,0,0,.3)}
.stTpl .sysCard .stPx{width:clamp(56px,4.2vw,76px);height:clamp(56px,4.2vw,76px)}`;
// les icônes des modèles, en pixel art (# : couleur du modèle, w : blanc, k : contour sombre)
const PXI = {
  flash: ['.kkkkkkk..', 'kwwwwwwwk.', 'kw#####wkk', 'kwwwwwwwk#', 'kw###wwwk#', 'kwwwwwwwk#', 'kw##wwwwk#', 'kwwwwwwwk#', '.kkkkkkkk#', '..#######.'],
  routine: ['kkkkkkkkkk', 'kwwwwwwwwk', 'kwwwwwww#k', 'kwwwwww##k', 'k#wwww##wk', 'k##ww##wwk', 'kw####wwwk', 'kww##wwwwk', 'kwwwwwwwwk', 'kkkkkkkkkk'],
  steps: ['...kkkk...', '....kk....', '..kkkkkk..', '.kwwwwwwk.', 'kwwww#wwwk', 'kwwww#wwwk', 'kwwww##wwk', 'kwwwwwwwwk', '.kwwwwwwk.', '..kkkkkk..'],
  tracker: ['k.........', 'k.......#.', 'k......##.', 'k..#..#...', 'k.###.#...', 'k#...#....', 'k#........', 'k.........', 'kkkkkkkkkk', '..........'],
  wheel: ['...kkkk...', '.kk#ww#kk.', '.k##ww##k.', 'kwww##wwwk', 'kwww##wwwk', 'k##wwww##k', '.k#wwww#k.', '.kk####kk.', '...kkkk...', '....kk....'],
  countdown: ['.k..k..k..', 'kkkkkkkkkk', 'k########k', 'kkkkkkkkkk', 'kwwwwwwwwk', 'kwkwkwkwwk', 'kwwwwwwwwk', 'kwkwk##wwk', 'kwwww##wwk', 'kkkkkkkkkk'],
  quiz: ['..kkkkkk..', '.k######k.', 'k##kkkk##k', 'kkk...k##k', '.....k##k.', '....k##k..', '....k##k..', '.....kk...', '....k##k..', '....kkkk..'],
  counter: ['kkkkkkkkkk', 'kwwwwwwwwk', 'kww##wwwwk', 'kw####wwwk', 'kww##wwwwk', 'kwwwww###k', 'kwwwwwwwwk', 'kwwwww###k', 'kwwwwwwwwk', 'kkkkkkkkkk'],
  links: ['..........', '.kkkk.....', 'k####k....', 'k#kk#k....', 'k#k.kkkk..', '.kkkk###k.', '....k#kk#k', '....k#..#k', '.....k##k.', '......kk..'],
  habits: ['kkkkkkkkkk', 'k#k#kwkwkk', 'kkkkkkkkkk', 'kwk#k#kwkk', 'kkkkkkkkkk', 'k#k#k#k#kk', 'kkkkkkkkkk', 'kwkwk#k#kk', 'kkkkkkkkkk', '..........'],
  app: ['kkkkkkkkkk', 'k########k', 'kkkkkkkkkk', 'kwwwwwwwwk', 'kw###wwwwk', 'kwwwwwwwwk', 'kw######wk', 'kwwwwwwwwk', 'kww####wwk', 'kkkkkkkkkk'],
  check: ['kkk.......', 'k#k.######', 'kkk.......', '..........', 'kkk.......', 'k#k.######', 'kkk.......', '..........', 'kkk.......', 'kwk.######'],
};
const pxIco = (k, color) => {
  const rows = PXI[k] || PXI.check, pal = { '#': color || '#ff4fa8', w: '#f3eaff', k: '#140a26' };
  let r = ''; rows.forEach((row, y) => [...row].forEach((c, x) => { if (pal[c]) r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${pal[c]}"/>`; }));
  const i = document.createElement('img'); i.className = 'stPx'; i.alt = '';
  i.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" shape-rendering="crispEdges">${r}</svg>`); return i;
};
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
function mkHabits(root, cfg, api) {  // plusieurs habitudes, les 7 derniers jours en cases à cocher, et la série de chacune
  const items = mkLines(cfg.items), done = api.load('done') || {};  // done["habitude"] = ["2026-11-07", …]
  const days = Array.from({length: 7}, (_, i) => mkAddDays(mkDay(), i - 6));
  const streak = h => { const s = new Set(done[h] || []); let n = 0, d = mkDay(); if (!s.has(d)) d = mkAddDays(d, -1); while (s.has(d)) { n++; d = mkAddDays(d, -1); } return n; };
  function draw() {
    root.replaceChildren(mkE('h2', '', cfg.title || 'Mes habitudes'));
    if (!items.length) return root.append(mkE('div', 'mkSub', 'Ajoute des habitudes : une par ligne.'));
    const g = mkE('div', 'mkHab'); g.style.gridTemplateColumns = 'minmax(90px,1fr) repeat(7,26px) 40px';
    g.append(mkE('span'), ...days.map(d => mkE('span', 'mkSub', 'LMMJVSD'[(new Date(d + 'T12:00').getDay() + 6) % 7])), mkE('span', 'mkSub', 'série'));
    for (const h of items) {
      g.append(mkE('span', '', h));
      for (const d of days) {
        const on = (done[h] || []).includes(d), b = mkE('button', 'mkDot' + (on ? ' on' : ''), on ? '✓' : ''); b.title = d.split('-').reverse().join('/');
        b.onclick = () => { const s = new Set(done[h] || []); s.has(d) ? s.delete(d) : s.add(d); done[h] = [...s].filter(x => x >= mkAddDays(mkDay(), -400)).sort(); api.save('done', done); draw(); };
        g.append(b);
      }
      g.append(mkE('b', '', streak(h) + ' j'));
    }
    root.append(g);
  }
  draw();
}
function mkCheck(root, cfg, api) {  // une liste à cocher qui garde son état (courses, valise, à faire)
  const items = mkLines(cfg.items), on = new Set(api.load('on') || []);
  function draw() {
    root.replaceChildren(mkE('h2', '', cfg.title || 'Ma liste'));
    if (!items.length) return root.append(mkE('div', 'mkSub', 'Ajoute des éléments : un par ligne.'));
    const n = items.filter(t => on.has(t)).length, g = mkE('div', 'mkGoal'), f = mkE('i'); f.style.width = n / items.length * 100 + '%'; g.append(f);
    root.append(mkE('div', 'mkSub', n + ' / ' + items.length + ' coché' + (n > 1 ? 's' : '')), g);
    items.forEach(t => { const b = mkE('button', 'mkBtn mkTask' + (on.has(t) ? ' on' : ''), (on.has(t) ? '✓ ' : '○ ') + t); b.onclick = () => { on.has(t) ? on.delete(t) : on.add(t); api.save('on', [...on]); draw(); }; root.append(b); });
    const r = mkE('button', 'mkBtn', 'Tout décocher'); r.onclick = () => { on.clear(); api.save('on', []); draw(); }; root.append(r);
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
// l'appli à blocs : des écrans faits de composants ; les boutons lancent des blocs qui changent les variables (gardées) ou l'écran
const MK_OPS = {'>=': (a, b) => a >= b, '<=': (a, b) => a <= b, '=': (a, b) => String(a) === String(b), '≠': (a, b) => String(a) !== String(b), '>': (a, b) => a > b, '<': (a, b) => a < b};
function mkApp(root, cfg, api) {
  const vars = cfg.vars || [], screens = cfg.screens?.length ? cfg.screens : [{name: 'Accueil', items: []}];
  const init = () => Object.fromEntries(vars.map(v => [v.name, v.type === 'liste' ? [] : v.type === 'nombre' ? +v.init || 0 : String(v.init ?? '')]));
  const V = {...init(), ...(api.load('vars') || {})}; let scr = api.screen ?? api.load('screen') ?? 0, msg = '';
  if (scr >= screens.length) scr = 0;
  const keep = () => { api.save('vars', V); api.save('screen', scr); };
  const val = x => { const t = String(x ?? '').replace(/\{([^{}]+)\}/g, (m, n) => { n = n.trim(); const c = /^(.+) (taille|nombre)$/.exec(n); if (c && Array.isArray(V[c[1]])) return V[c[1]].length; const v = V[n]; return Array.isArray(v) ? v.join(', ') : v ?? m; }); return t; };
  const num = x => { const n = +val(x); return Number.isFinite(n) ? n : 0; };
  let ac = null; const beep = () => { try { ac ??= new AudioContext(); const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.06, ac.currentTime); g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .25); o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + .25); } catch {} };
  function run(blocks, depth = 0) {
    for (const b of blocks || []) {
      if (depth > 20) return;
      const isList = Array.isArray(V[b.v]);
      if (b.b === 'ecran') scr = Math.max(0, Math.min(screens.length - 1, +b.s || 0));
      else if (b.b === 'ajoute' && b.v in V && !isList) V[b.v] = (+V[b.v] || 0) + num(b.n);
      else if (b.b === 'met' && b.v in V && !isList) V[b.v] = vars.find(x => x.name === b.v)?.type === 'nombre' ? num(b.val) : val(b.val);
      else if (b.b === 'hasard' && b.v in V && !isList) { const a = Math.round(num(b.min)), z = Math.round(num(b.max)); V[b.v] = a + Math.floor(Math.random() * (Math.max(a, z) - a + 1)); }
      else if (b.b === 'liste' && isList) { const t = val(b.val).trim(); if (t) V[b.v].push(t); }
      else if (b.b === 'vide' && isList) V[b.v] = [];
      else if (b.b === 'si') { const a = Array.isArray(V[b.v]) ? V[b.v].length : V[b.v], n = vars.find(x => x.name === b.v)?.type === 'texte' ? val(b.n) : num(b.n); if ((MK_OPS[b.op] || MK_OPS['='])(a, n)) run(b.then, depth + 1); }
      else if (b.b === 'message') msg = val(b.val);
      else if (b.b === 'son') beep();
      else if (b.b === 'lien' && /^https?:\/\//.test(b.url || '')) api.open(b.url);
    }
  }
  function draw() {
    const S = screens[scr] || screens[0], out = [mkE('h2', '', cfg.title || 'Mon appli')];
    if (screens.length > 1 && cfg.tabs) { const top = mkE('div', 'mkTop'); screens.forEach((x, i) => { const b = mkE('button', 'mkBtn' + (i === scr ? ' on' : ''), x.name || 'Écran ' + (i + 1)); b.onclick = () => { scr = i; msg = ''; keep(); draw(); }; top.append(b); }); out.push(top); }
    if (msg) out.push(mkE('div', 'mkMsg', msg));
    for (const it of S.items || []) {
      if (it.t === 'titre') out.push(mkE('h2', '', val(it.text)));
      else if (it.t === 'texte') { const p = mkE('div', '', val(it.text)); p.style.whiteSpace = 'pre-wrap'; out.push(p); }
      else if (it.t === 'nombre') { const w = mkE('div'); if (it.label) w.append(mkE('div', 'mkSub', val(it.label))); w.append(mkE('div', 'mkBig', val('{' + it.v + '}'))); out.push(w); }
      else if (it.t === 'bouton') { const b = mkE('button', 'mkBtn', val(it.text) || 'Bouton'); b.onclick = () => { msg = ''; run(it.blocks); keep(); draw(); }; out.push(b); }
      else if (it.t === 'champ' && it.v in V) { const r = mkE('div', 'stRow mkIn'), i = mkE('input'); i.placeholder = val(it.label) || it.v; i.value = Array.isArray(V[it.v]) ? '' : V[it.v];
        if (Array.isArray(V[it.v])) { const add = mkE('button', 'mkBtn', '+'); const go = () => { const t = i.value.trim(); if (t) { V[it.v].push(t); keep(); draw(); } }; add.onclick = go; i.onkeydown = e => { if (e.key === 'Enter') go(); }; r.append(i, add); }
        else { i.oninput = () => { V[it.v] = vars.find(x => x.name === it.v)?.type === 'nombre' ? +i.value || 0 : i.value; keep(); }; i.onchange = () => draw(); r.append(i); }
        r.style.display = 'flex'; r.style.gap = '8px'; out.push(r); }
      else if (it.t === 'case' && it.v in V) { const l = mkE('label', 'mkChk'), c = mkE('input'); c.type = 'checkbox'; c.checked = !!+V[it.v] || V[it.v] === 'oui'; c.onchange = () => { V[it.v] = typeof V[it.v] === 'number' ? +c.checked : c.checked ? 'oui' : 'non'; keep(); draw(); }; l.append(c, mkE('span', '', val(it.label) || it.v)); out.push(l); }
      else if (it.t === 'liste' && Array.isArray(V[it.v])) { const box = mkE('div', 'mkHab'); box.style.display = 'flex'; box.style.flexDirection = 'column';
        if (!V[it.v].length) box.append(mkE('div', 'mkSub', val(it.empty) || 'Rien pour l\'instant.'));
        V[it.v].forEach((x, k) => { const on = /^✓ /.test(x), r = mkE('div', 'mkLi' + (on ? ' on' : '')), sp = mkE('span', '', x.replace(/^✓ /, ''));
          if (it.check) { const c = mkE('button', '', on ? '☑' : '☐'); c.title = 'Cocher'; c.onclick = () => { V[it.v][k] = on ? x.slice(2) : '✓ ' + x; keep(); draw(); }; r.append(c); }
          r.append(sp); const d = mkE('button', '', '✕'); d.title = 'Retirer'; d.onclick = () => { V[it.v].splice(k, 1); keep(); draw(); }; r.append(d); box.append(r); });
        out.push(box); }
      else if (it.t === 'image' && it.src) { const i = mkE('img', 'mkImg'); i.src = it.src; i.alt = ''; out.push(i); }
      else if (it.t === 'trait') out.push(mkE('hr'));
    }
    root.replaceChildren(...out);
  }
  draw();
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
  habits: {icon: '🗓️', name: 'Suivi d\'habitudes', what: 'Plusieurs habitudes, la semaine en cases à cocher et ta série pour chacune.', run: mkHabits, def: {title: 'Mes habitudes', color: '#7ee07a', items: 'Sport\nLecture\nPas d\'écran après 23 h'},
    sum: (cfg, m) => { const it = mkLines(cfg.items), d = mkDay(), n = it.filter(h => (m.done?.[h] || []).includes(d)).length; return [n + ' / ' + it.length + ' aujourd\'hui']; }},
  check: {icon: '☑️', name: 'Liste à cocher', what: 'Une liste qui garde ce que tu as coché : courses, valise, à faire.', run: mkCheck, def: {title: 'Liste de courses', color: '#5ec8ff', items: 'Pain\nLait\nŒufs\nPommes'},
    sum: (cfg, m) => { const it = mkLines(cfg.items), on = new Set(m.on || []); return [it.filter(t => on.has(t)).length + ' / ' + it.length + ' cochés']; }},
  app: {icon: '🧩', name: 'Appli à blocs', what: 'Ton appli à toi : des écrans, des boutons, des listes et des données, et des blocs pour dire ce que fait chaque bouton.', run: mkApp,
    def: {title: 'Mes points', color: '#ff8a3a', tabs: true, vars: [{name: 'points', type: 'nombre', init: 0}, {name: 'idées', type: 'liste', init: ''}],
      screens: [{name: 'Accueil', items: [{t: 'nombre', v: 'points', label: 'Mes points'}, {t: 'bouton', text: '+1 point', blocks: [{b: 'ajoute', v: 'points', n: 1}, {b: 'si', v: 'points', op: '>=', n: 10, then: [{b: 'message', val: 'Bravo, {points} points !'}, {b: 'son'}]}]}, {t: 'bouton', text: 'Remettre à zéro', blocks: [{b: 'met', v: 'points', val: 0}]}]},
        {name: 'Idées', items: [{t: 'texte', text: 'Note tes idées : {idées taille} pour l\'instant.'}, {t: 'champ', v: 'idées', label: 'Une idée'}, {t: 'liste', v: 'idées', check: true}]}]},
    sum: (cfg, m) => (cfg.vars || []).filter(v => v.type !== 'liste').slice(0, 3).map(v => v.name + ' : ' + (m.vars?.[v.name] ?? v.init ?? ''))},
  links: {icon: '🔗', name: 'Page de liens', what: 'Une grille de boutons vers tes sites préférés.', run: mkLinks, def: {title: 'Mes liens', color: '#7ee07a', text: '', links: [{label: 'NeoDex', url: 'https://github.com/NDesumeur', emoji: '⭐'}]},
    sum: cfg => [(cfg.links || []).length + ' liens']},
};
const stCRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }; })();
function stZip(files) {  // [{name, data: Uint8Array}] -> les octets d'un .zip
  const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
  const u16 = n => [n & 255, (n >> 8) & 255], u32 = n => [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >>> 24) & 255];
  for (const f of files) { const name = enc.encode(f.name), crc = stCRC(f.data), hd = new Uint8Array([0x50, 0x4b, 3, 4, 20, 0, 0, 8, 0, 0, 0, 0, 33, 0, ...u32(crc), ...u32(f.data.length), ...u32(f.data.length), ...u16(name.length), 0, 0]);
    parts.push(hd, name, f.data); cen.push({name, crc, size: f.data.length, off}); off += hd.length + name.length + f.data.length; }
  const cs = off; for (const c of cen) { const h = new Uint8Array([0x50, 0x4b, 1, 2, 20, 0, 20, 0, 0, 8, 0, 0, 0, 0, 33, 0, ...u32(c.crc), ...u32(c.size), ...u32(c.size), ...u16(c.name.length), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...u32(c.off)]); parts.push(h, c.name); off += h.length + c.name.length; }
  parts.push(new Uint8Array([0x50, 0x4b, 5, 6, 0, 0, 0, 0, ...u16(cen.length), ...u16(cen.length), ...u32(off - cs), ...u32(cs), 0, 0]));
  const out = new Uint8Array(parts.reduce((a, p) => a + p.length, 0)); let k = 0; for (const p of parts) { out.set(p, k); k += p.length; } return out;
}
const stSlug = t => String(t || 'appli').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '') .slice(0, 24) || 'appli';
// une création devient un vrai plugin : plugin.json, index.js (le moteur de son modèle et sa configuration), README, icône
const ST_HELPERS = [mkE, mkDay, mkAddDays, mkLines, mkCards, mkNextDate, mkDaysTo];
const ST_HELPER_NAMES = ['mkE', 'mkDay', 'mkAddDays', 'mkLines', 'mkCards', 'mkNextDate', 'mkDaysTo'];
function stPluginFiles(a, iconPng) {
  const t = TEMPLATES[a.tpl], title = (a.title || 'Mon appli').slice(0, 40), id = 'studio.' + stSlug(title) + '.' + a.id.replace(/[^a-z0-9]/g, '');
  const css = CSS.split('/* l\'aspect des créations */')[1].split('.stPx{')[0];
  const fns = [t.run];
  const code = '// ' + title + ' : fait avec le Studio de plugins de NeoDex (modèle « ' + t.name + ' »).\n' +
    'const CFG = ' + JSON.stringify(a.cfg, null, 1) + ';\n' + 'const CSS = ' + JSON.stringify(css + '.mk{padding:clamp(16px,2.2vw,36px);max-width:900px;margin:0 auto}') + ';\n' +
    ST_HELPERS.map((f, i) => 'const ' + ST_HELPER_NAMES[i] + ' = ' + f.toString() + ';').join('\n') + '\n' + (t.run === mkApp ? 'const MK_OPS = {\'>=\': (a, b) => a >= b, \'<=\': (a, b) => a <= b, \'=\': (a, b) => String(a) === String(b), \'≠\': (a, b) => String(a) !== String(b), \'>\': (a, b) => a > b, \'<\': (a, b) => a < b};\n' : '') +
    fns.map(f => f.toString()).join('\n') + '\n' +
    'export default async function (ctx) {\n  const view = ctx.view; ctx.host.addStyle(CSS);\n  let mem = {}; try { mem = (await ctx.folder.read(\'memoire\')) || {}; } catch {}\n' +
    '  let t = 0; const api = {load: k => mem[k], save: (k, v) => { mem[k] = v; clearTimeout(t); t = setTimeout(() => ctx.folder.write(\'memoire\', mem).catch(() => {}), 400); }, open: u => ctx.host.newTab(u)};\n' +
    '  const root = document.createElement(\'div\'); root.className = \'mk\'; root.style.setProperty(\'--k\', CFG.color || \'#ff4fa8\'); view.replaceChildren(root);\n  ' + t.run.name + '(root, CFG, api);\n}\n';
  const manifest = {id, name: title, version: '1.0.0', author: 'Studio de plugins', description: (t.what + ' Fait avec le Studio de plugins de NeoDex.').slice(0, 300), icon: 'icon.png', entry: 'index.js', view: 'studio-' + stSlug(title),
    neobase: '>=4.0.0', type: 'app', category: 'Outils', compatibility: ['windows', 'linux'], syncMode: 'fusion', syncInfo: 'Ce que tu notes dans l\'appli.', mobile: false, dependencies: {}, sdk: '2.1.0', permissions: ['storage']};
  const readme = '# ' + title + '\n\n' + t.what + '\n\nFait avec le **Studio de plugins** de NeoDex, modèle « ' + t.name + ' ».\n\n## Installer\n\nDans NeoDex : **NeoStore → Installés → INSTALLER UN FICHIER .ZIP…**, puis choisis ce fichier. Le plugin n\'est pas vérifié par NeoDex : il passe l\'antivirus et reste dans le bac à sable, avec la seule autorisation de garder ses données.\n\nPour le publier dans NeoStore : mets ces fichiers dans un dépôt GitHub avec le sujet « neodex-plugin » et joins le .zip à une Release.\n';
  const enc = new TextEncoder();
  return {id, files: [{name: 'plugin.json', data: enc.encode(JSON.stringify(manifest, null, 2) + '\n')}, {name: 'index.js', data: enc.encode(code)}, {name: 'README.md', data: enc.encode(readme)}, {name: 'icon.png', data: iconPng}]};
}
// l'icône du plugin : l'icône du modèle, en 64 × 64
async function stIconPng(tpl, color) {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'), rows = PXI[tpl] || PXI.check, pal = {'#': color || '#ff4fa8', w: '#f3eaff', k: '#140a26'};
  g.fillStyle = '#100a20'; g.fillRect(0, 0, 64, 64); rows.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(2 + x * 6, 2 + y * 6, 6, 6); } }));
  return new Uint8Array(await (await new Promise(ok => c.toBlob(ok, 'image/png'))).arrayBuffer());
}
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
    (a ? ctx.widget.set({title: a.title || 'Sans titre', lines: sumOf(a).length ? sumOf(a) : [TEMPLATES[a.tpl].name]}) : ctx.widget.clear()).catch(() => {});
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
    $('stList').replaceChildren(...data.apps.map(a => { const b = el('button', 'stItem' + (a === cur ? ' on' : '')); b.append(pxIco(a.tpl, a.cfg?.color), el('span', '', a.title || 'Sans titre'), el('small', '', (a.id === data.pin ? '📌' : '') + (a.remind ? '⏰' : ''))); b.onclick = () => { cur = a; mode = 'play'; draw(); }; return b; }));
    if (!data.apps.length) $('stList').append(el('div', 'hint', 'Rien pour l\'instant : clique sur + NOUVEAU.'));
  }
  const addApp = (tpl, title, cfg) => { cur = {id: Date.now().toString(36), tpl, title, cfg: JSON.parse(JSON.stringify(cfg))}; data.apps.push(cur); save(); };
  function draw() {
    list(); const main = $('stMain');
    if (!cur) {  // choisir un modèle, ou importer une création partagée
      const g = el('div', 'stTpl');
      for (const [k, t] of Object.entries(TEMPLATES)) { const c = el('div', 'sysCard px'); c.style.setProperty('--tc', t.def.color); c.append(pxIco(k, t.def.color), el('b', '', t.name.toUpperCase()), el('span', 'hint', t.what)); c.onclick = () => { addApp(k, t.def.title, t.def); mode = 'edit'; draw(); }; g.append(c); }
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
    b('⇩ VRAI PLUGIN', async () => { const {id, files} = stPluginFiles(cur, await stIconPng(cur.tpl, cur.cfg.color)), z = stZip(files), a = el('a'); a.href = URL.createObjectURL(new Blob([z], {type: 'application/zip'})); a.download = id + '-1.0.0.zip'; document.body.append(a); a.click(); a.remove();
      toast('Plugin .zip dans tes téléchargements : NeoStore → Installés → INSTALLER UN FICHIER .ZIP…'); }, false, 'Fabrique un vrai plugin NeoDex (.zip) : il s\'installe dans NeoStore, a son onglet et son icône, et se publie sur GitHub');
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
    const refresh = () => { stage.style.setProperty('--k', cur.cfg.color || '#ff4fa8'); TEMPLATES[cur.tpl].run(stage, cur.cfg, {load: k => data.mem[cur.id]?.[k], save() {}, open: u => newTab(u), screen: cur.tpl === 'app' ? edScr : undefined}); list(); save(); };
    draw.soft = () => refresh();
    const field = (label, obj, key, type = 'text', after) => { const l = el('label', '', label), i = el(type === 'area' ? 'textarea' : 'input'); if (type !== 'area') i.type = type; else i.rows = 6; if (type === 'checkbox') i.checked = !!obj[key]; else i.value = obj[key] ?? ''; i.oninput = () => { obj[key] = type === 'number' ? +i.value : type === 'checkbox' ? i.checked : i.value; if (obj === cur.cfg && key === 'title') cur.title = i.value; after?.(); refresh(); }; if (type === 'checkbox') { l.classList.add('stCheck'); l.prepend(i); } else l.append(i); return l; };
    const block = (arr, idx, fill) => { const bl = el('div', 'stBlock'), x = el('button', 'btn px x', '✕'); x.title = 'Retirer'; x.onclick = () => { arr.splice(idx, 1); draw(); }; bl.append(x); fill(bl); return bl; };
    const add = (t, f) => { const x = el('button', 'btn px', t); x.onclick = () => { f(); draw(); }; return x; };
    form.append(el('span', 'label', TEMPLATES[cur.tpl].name), field('Titre', cur.cfg, 'title'), field('Couleur', cur.cfg, 'color', 'color'),
      field('Rappel chaque jour à (vide : aucun)', cur, 'remind', 'time', () => startBg()));
    if (cur.tpl === 'flash') form.append(field('Fiches : une par ligne, « recto | verso »', cur.cfg, 'cards', 'area'));
    if (cur.tpl === 'routine') form.append(field('Tâches : une par ligne', cur.cfg, 'items', 'area'));
    if (cur.tpl === 'habits') form.append(field('Habitudes : une par ligne', cur.cfg, 'items', 'area'));
    if (cur.tpl === 'check') form.append(field('Éléments : un par ligne', cur.cfg, 'items', 'area'));
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
    if (cur.tpl === 'app') appEditor(form, field);
    prev.append(el('span', 'label', 'Aperçu'), stage); wrap.append(form, prev); main.replaceChildren(bar, wrap); bar.style.marginBottom = '14px'; refresh();
  }
  // ---- l'éditeur de l'appli à blocs : variables, écrans, composants, blocs ----
  let edScr = 0;
  const COMPS = [['titre', 'Titre'], ['texte', 'Texte'], ['bouton', 'Bouton'], ['nombre', 'Grand nombre'], ['champ', 'Champ à remplir'], ['case', 'Case à cocher'], ['liste', 'Liste'], ['image', 'Image'], ['trait', 'Trait']];
  const BLOCKS = [['ecran', 'Aller à l\'écran'], ['ajoute', 'Ajouter à une variable'], ['met', 'Mettre une variable à'], ['hasard', 'Nombre au hasard'], ['liste', 'Ajouter à une liste'], ['vide', 'Vider une liste'], ['si', 'Si … alors'], ['message', 'Afficher un message'], ['son', 'Jouer un bip'], ['lien', 'Ouvrir un site']];
  const move = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; draw(); };
  function appEditor(form, field) {
    const cfg = cur.cfg; cfg.vars ??= []; cfg.screens ??= [{name: 'Accueil', items: []}]; if (edScr >= cfg.screens.length) edScr = 0;
    const sel = (obj, key, opts, after) => { const x = el('select'); for (const [v, t] of opts) { const o = el('option', '', t); o.value = v; x.append(o); } x.value = obj[key] ?? opts[0]?.[0] ?? ''; if (obj[key] == null && opts.length) obj[key] = opts[0][0]; x.onchange = () => { obj[key] = typeof opts[0]?.[0] === 'number' ? +x.value : x.value; after ? after() : draw(); }; return x; };
    const inp = (obj, key, ph, type = 'text') => { const i = el('input'); i.type = type; i.placeholder = ph || ''; i.value = obj[key] ?? ''; i.oninput = () => { obj[key] = type === 'number' ? +i.value : i.value; draw.soft(); }; return i; };
    const varOpts = f => cfg.vars.filter(v => v.name && (!f || f(v))).map(v => [v.name, v.name + (v.type === 'liste' ? ' (liste)' : v.type === 'nombre' ? ' (nombre)' : ' (texte)')]);
    // les variables
    form.append(field('Onglets des écrans en haut de l\'appli', cfg, 'tabs', 'checkbox'));
    const vb = el('div', 'stComp'); vb.append(el('span', 'label', 'Variables (les données gardées)'));
    cfg.vars.forEach((v, i) => { const r = el('div', 'stRow'), x = el('button', 'btn px', '✕'); x.onclick = () => { cfg.vars.splice(i, 1); draw(); };
      const n = inp(v, 'name', 'nom'); n.onchange = () => draw(); r.append(n, sel(v, 'type', [['nombre', 'Nombre'], ['texte', 'Texte'], ['liste', 'Liste']]));
      if (v.type !== 'liste') r.append(inp(v, 'init', 'au départ', v.type === 'nombre' ? 'number' : 'text')); r.append(x); vb.append(r); });
    const av = el('button', 'btn px', '+ VARIABLE'); av.onclick = () => { cfg.vars.push({name: 'variable' + (cfg.vars.length + 1), type: 'nombre', init: 0}); draw(); }; vb.append(av); form.append(vb);
    // les écrans
    const sb = el('div', 'stComp'), tabs = el('div', 'stScr'); sb.append(el('span', 'label', 'Écrans'));
    cfg.screens.forEach((x, i) => { const b = el('button', 'btn px' + (i === edScr ? ' main' : ''), x.name || 'Écran ' + (i + 1)); b.onclick = () => { edScr = i; draw(); }; tabs.append(b); });
    const as = el('button', 'btn px', '+ ÉCRAN'); as.onclick = () => { cfg.screens.push({name: 'Écran ' + (cfg.screens.length + 1), items: [{t: 'titre', text: 'Écran ' + (cfg.screens.length + 1)}]}); edScr = cfg.screens.length - 1; draw(); }; tabs.append(as);
    const S = cfg.screens[edScr], sr = el('div', 'stRow'), sn = inp(S, 'name', 'nom de l\'écran'); sn.onchange = () => draw(); sr.append(sn);
    if (cfg.screens.length > 1) { const d = el('button', 'btn px', 'SUPPRIMER L\'ÉCRAN'); d.onclick = () => { cfg.screens.splice(edScr, 1); edScr = 0; draw(); }; sr.append(d); }
    sb.append(tabs, sr); form.append(sb);
    // les composants de l'écran
    S.items.forEach((it, i) => {
      const c = el('div', 'stComp'), head = el('div', 'stRow'), up = el('button', 'btn px', '▲'), dn = el('button', 'btn px', '▼'), x = el('button', 'btn px', '✕');
      up.onclick = () => move(S.items, i, -1); dn.onclick = () => move(S.items, i, 1); x.onclick = () => { S.items.splice(i, 1); draw(); };
      head.append(el('b', '', (COMPS.find(k => k[0] === it.t)?.[1] || it.t).toUpperCase()), up, dn, x); c.append(head);
      const r = el('div', 'stRow');
      if (it.t === 'titre' || it.t === 'texte') r.append(inp(it, 'text', 'texte ; {variable} pour sa valeur'));
      if (it.t === 'bouton') r.append(inp(it, 'text', 'texte du bouton'));
      if (it.t === 'nombre') r.append(sel(it, 'v', varOpts(v => v.type !== 'liste')), inp(it, 'label', 'légende'));
      if (it.t === 'champ') r.append(sel(it, 'v', varOpts()), inp(it, 'label', 'texte d\'aide'));
      if (it.t === 'case') r.append(sel(it, 'v', varOpts(v => v.type !== 'liste')), inp(it, 'label', 'texte'));
      if (it.t === 'liste') { const l = el('label', 'stCheck'), ck = el('input'); ck.type = 'checkbox'; ck.checked = !!it.check; ck.onchange = () => { it.check = ck.checked; draw.soft(); }; l.append(ck, 'cases à cocher'); r.append(sel(it, 'v', varOpts(v => v.type === 'liste')), l); }
      if (it.t === 'image') { const f = el('input'); f.type = 'file'; f.accept = 'image/*'; f.onchange = async () => { const fl = f.files[0]; if (!fl) return; const im = new Image(); im.src = URL.createObjectURL(fl); await im.decode(); const k = Math.min(1, 480 / Math.max(im.naturalWidth, im.naturalHeight)), cv = document.createElement('canvas'); cv.width = im.naturalWidth * k; cv.height = im.naturalHeight * k; cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); it.src = cv.toDataURL('image/jpeg', .85); draw(); }; r.append(f); }
      if (r.childNodes.length) c.append(r);
      if (it.t === 'bouton') { it.blocks ??= []; c.append(el('span', 'hint', 'Quand on clique :'), blockList(it.blocks)); }
      form.append(c);
    });
    const ar = el('div', 'stRow'), pick = el('select'); for (const [k, n] of COMPS) { const o = el('option', '', n); o.value = k; pick.append(o); }
    const go = el('button', 'btn px main', '+ AJOUTER À L\'ÉCRAN'); go.onclick = () => { const t = pick.value, v = cfg.vars[0]?.name; S.items.push({t, text: t === 'bouton' ? 'Bouton' : t === 'titre' ? 'Titre' : t === 'texte' ? 'Du texte' : undefined, v, blocks: t === 'bouton' ? [] : undefined}); draw(); };
    ar.append(pick, go); form.append(ar);
    function blockList(arr) {
      const box = el('div', 'stBlks');
      arr.forEach((b, i) => { const r = el('div', 'stBlk ' + b.b), x = el('button', 'x', '✕'); x.title = 'Retirer ce bloc'; x.onclick = () => { arr.splice(i, 1); draw(); };
        const line = b.b === 'si' ? el('div', 'stRow') : r, T = t => line.append(el('span', '', t));
        if (b.b === 'ecran') { T('Aller à l\'écran'); line.append(sel(b, 's', cfg.screens.map((x, k) => [k, x.name || 'Écran ' + (k + 1)]))); }
        if (b.b === 'ajoute') { T('Ajouter'); line.append(inp(b, 'n', '1')); T('à'); line.append(sel(b, 'v', varOpts(v => v.type === 'nombre'))); }
        if (b.b === 'met') { T('Mettre'); line.append(sel(b, 'v', varOpts(v => v.type !== 'liste'))); T('à'); line.append(inp(b, 'val', 'valeur ou {variable}')); }
        if (b.b === 'hasard') { T('Mettre'); line.append(sel(b, 'v', varOpts(v => v.type === 'nombre'))); T('au hasard entre'); line.append(inp(b, 'min', '1')); T('et'); line.append(inp(b, 'max', '6')); }
        if (b.b === 'liste') { T('Ajouter'); line.append(inp(b, 'val', 'texte ou {variable}')); T('à la liste'); line.append(sel(b, 'v', varOpts(v => v.type === 'liste'))); }
        if (b.b === 'vide') { T('Vider la liste'); line.append(sel(b, 'v', varOpts(v => v.type === 'liste'))); }
        if (b.b === 'message') { T('Afficher'); line.append(inp(b, 'val', 'message, {variable}')); }
        if (b.b === 'son') T('Jouer un bip');
        if (b.b === 'lien') { T('Ouvrir le site'); line.append(inp(b, 'url', 'https://…')); }
        if (b.b === 'si') { T('Si'); line.append(sel(b, 'v', varOpts()), sel(b, 'op', Object.keys(MK_OPS).map(o => [o, o])), inp(b, 'n', 'valeur')); T('alors'); line.append(x); b.then ??= []; r.append(line, blockList(b.then)); }
        else r.append(x);
        box.append(r); });
      const add = el('select'), o0 = el('option', '', '+ bloc…'); o0.value = ''; add.append(o0); for (const [k, n] of BLOCKS) { const o = el('option', '', n); o.value = k; add.append(o); }
      add.onchange = () => { const k = add.value; if (!k) return; const v = (k === 'liste' || k === 'vide' ? cfg.vars.find(x => x.type === 'liste') : k === 'met' || k === 'si' ? cfg.vars[0] : cfg.vars.find(x => x.type === 'nombre'))?.name;
        arr.push({b: k, v, n: k === 'ajoute' ? 1 : k === 'si' ? 0 : undefined, op: k === 'si' ? '>=' : undefined, s: k === 'ecran' ? 0 : undefined, min: k === 'hasard' ? 1 : undefined, max: k === 'hasard' ? 6 : undefined, then: k === 'si' ? [] : undefined}); draw(); };
      box.append(add); return box;
    }
  }
  view.__st = {stPluginFiles, stZip, stIconPng, TEMPLATES, data, open: a => { cur = a; mode = 'edit'; draw(); }};  // pour le test « local »
  $('stNew').onclick = () => { cur = null; draw(); };
  widget(); startBg();
  ctx.onOpen(() => draw());
}
