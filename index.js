// Studio de plugins : crée un petit plugin NeoDex sans écrire de code, à partir d'un modèle (jeu de quiz, compteur, page de liens).
// Tes créations s'utilisent ici même ; « Exporter » donne le plugin complet (plugin.json et index.js) à copier dans un dossier.
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
/* l'aspect des créations : le même dans le studio et dans le plugin exporté */
.mk{--k:#ff4fa8;display:flex;flex-direction:column;gap:14px;color:#fff;font-size:15px}.mk h2{font:18px var(--title,inherit);color:var(--k);margin:0}
.mk .mkBtn{all:unset;cursor:var(--cp,pointer);padding:10px 14px;background:#1a1236;border:2px solid var(--k);color:#fff;text-align:center;font-size:15px}.mk .mkBtn:hover{background:var(--k);color:#05010b}
.mk .mkBtn.good{background:#2a8a3a;border-color:#5ad05a}.mk .mkBtn.bad{background:#8a2a3a;border-color:#ff5a5a}
.mk .mkGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.mk .mkGrid .mkBtn{display:flex;flex-direction:column;gap:6px;align-items:center;padding:16px}.mk .mkGrid .e{font-size:28px}
.mk .mkCount{display:grid;grid-template-columns:1fr auto auto auto;gap:10px;align-items:center;padding:10px;background:#120c26;border-left:4px solid var(--k)}.mk .mkCount b{font:22px var(--title,inherit);min-width:60px;text-align:right}
.mk .mkGoal{grid-column:1/-1;height:6px;background:#2a2050}.mk .mkGoal i{display:block;height:100%;background:var(--k)}
.mk .mkQ{font-size:17px}.mk .mkSub{color:#b8a8e0;font-size:13px}`;
// ---- les modèles : chacun dessine sa création dans « root » à partir de sa configuration ; ces fonctions sont recopiées telles quelles dans le plugin exporté ----
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
const TEMPLATES = {
  quiz: {icon: '❓', name: 'Jeu de quiz', what: 'Des questions à choix multiples, un score et un record.', run: mkQuiz, def: {title: 'Mon quiz', color: '#ff4fa8', questions: [{q: 'Quelle est la capitale du Japon ?', a: ['Kyoto', 'Tokyo', 'Osaka', 'Sapporo'], ok: 1}]}},
  counter: {icon: '🔢', name: 'Compteur', what: 'Des compteurs avec + et −, un pas et un objectif.', run: mkCounter, def: {title: 'Mes compteurs', color: '#5ec8ff', items: [{name: 'Verres d’eau', step: 1, goal: 8}]}},
  links: {icon: '🔗', name: 'Page de liens', what: 'Une grille de boutons vers tes sites préférés.', run: mkLinks, def: {title: 'Mes liens', color: '#7ee07a', text: '', links: [{label: 'NeoDex', url: 'https://github.com/NDesumeur', emoji: '⭐'}]}},
};
// le plugin exporté : manifeste + code autonome (le modèle, sa configuration, le style)
function exportPlugin(app) {
  const slug = (app.title || 'creation').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'creation';
  const css = CSS.slice(CSS.indexOf('/* l\'aspect'));
  const manifest = {id: 'neodex.' + slug, name: app.title || 'Ma création', version: '1.0.0', author: '', description: TEMPLATES[app.tpl].name + ' créé avec le Studio de plugins de NeoDex.', entry: 'index.js', view: slug.replace(/-/g, ''), neobase: '>=4.0.0', type: 'app', category: 'Outils', sdk: '2.1.0', permissions: ['storage']};
  const code = `// ${manifest.name} : ${manifest.description}\nconst CSS = ${JSON.stringify(css)};\nconst CFG = ${JSON.stringify(app.cfg, null, 1)};\n${TEMPLATES[app.tpl].run.toString()}\nexport default async function (ctx) {\n  const view = ctx.view; if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }\n  ctx.host.addStyle(CSS);\n  let mem = {}; try { mem = (await ctx.folder.read('data')) || {}; } catch {}\n  const api = {load: k => mem[k], save: (k, v) => { mem[k] = v; ctx.folder.write('data', mem).catch(() => {}); }, open: u => ctx.host.newTab(u)};\n  const root = document.createElement('div'); root.className = 'mk'; root.style.cssText = 'padding:24px;--k:' + (CFG.color || '#ff4fa8'); view.replaceChildren(root);\n  ${TEMPLATES[app.tpl].run.name}(root, CFG, api);\n}\n`;
  return {manifest, code};
}
{  // vérification : un plugin exporté est du code valide qui garde le modèle et la configuration
  const {manifest, code} = exportPlugin({tpl: 'quiz', title: 'Été à Paris !', cfg: TEMPLATES.quiz.def});
  let ok = true; try { new Function(code.replace('export default async function', 'async function main')); } catch { ok = false; }
  console.assert(ok && manifest.id === 'neodex.ete-a-paris' && code.includes('function mkQuiz') && code.includes('Tokyo'), 'studio export', {ok, id: manifest.id});
}
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const { el, toast, newTab, confirm } = ctx.host, folder = ctx.folder;
  ctx.host.addStyle(CSS);
  view.innerHTML = HTML;
  const $ = id => view.querySelector('#' + id);
  let data = {apps: [], mem: {}}; try { data = Object.assign(data, await folder.read('studio')); } catch {}
  let saveT = null; const save = () => { clearTimeout(saveT); saveT = setTimeout(() => folder.write('studio', data).catch(() => {}), 400); };
  let cur = null, mode = 'edit';
  const apiFor = app => ({load: k => data.mem[app.id]?.[k], save: (k, v) => { (data.mem[app.id] ??= {})[k] = v; save(); }, open: u => newTab(u)});
  function list() {
    $('stList').replaceChildren(...data.apps.map(a => { const b = el('button', 'stItem' + (a === cur ? ' on' : '')); b.append(el('i', '', TEMPLATES[a.tpl].icon), el('span', '', a.title || 'Sans titre')); b.onclick = () => { cur = a; mode = 'play'; draw(); }; return b; }));
    if (!data.apps.length) $('stList').append(el('div', 'hint', 'Rien pour l\'instant : clique sur + NOUVEAU.'));
  }
  function draw() {
    list(); const main = $('stMain');
    if (!cur) {  // choisir un modèle
      const g = el('div', 'stTpl');
      for (const [k, t] of Object.entries(TEMPLATES)) { const c = el('div', 'sysCard px'); c.append(el('span', 'big', t.icon), el('b', '', t.name.toUpperCase()), el('span', 'hint', t.what)); c.onclick = () => { cur = {id: Date.now().toString(36), tpl: k, title: t.def.title, cfg: JSON.parse(JSON.stringify(t.def))}; data.apps.push(cur); save(); mode = 'edit'; draw(); }; g.append(c); }
      main.replaceChildren(el('div', 'hint', 'Choisis un modèle : tu le remplis, tu vois le résultat tout de suite.'), g); main.firstChild.style.marginBottom = '12px'; return;
    }
    const bar = el('div', 'stBar'), b = (t, f, on) => { const x = el('button', 'btn px' + (on ? ' on main' : ''), t); x.onclick = f; bar.append(x); };
    b('▶ UTILISER', () => { mode = 'play'; draw(); }, mode === 'play'); b('✎ MODIFIER', () => { mode = 'edit'; draw(); }, mode === 'edit'); b('⇪ EXPORTER', () => { mode = 'export'; draw(); }, mode === 'export');
    b('✕ SUPPRIMER', async () => { if (!(await confirm('Supprimer « ' + (cur.title || 'Sans titre') + ' » ?', {danger: true}).catch(() => false))) return; data.apps = data.apps.filter(a => a !== cur); delete data.mem[cur.id]; cur = null; save(); draw(); });
    const stage = el('div', 'mk'); stage.style.setProperty('--k', cur.cfg.color || '#ff4fa8');
    if (mode === 'play') { const box = el('div', 'sysCard px stPrev'); box.append(stage); main.replaceChildren(bar, box); TEMPLATES[cur.tpl].run(stage, cur.cfg, apiFor(cur)); bar.style.marginBottom = '14px'; return; }
    if (mode === 'export') {
      const {manifest, code} = exportPlugin(cur), box = el('div', 'sysCard px'), m = el('textarea', 'stCode'), c = el('textarea', 'stCode');
      m.value = JSON.stringify(manifest, null, 2); c.value = code; m.readOnly = c.readOnly = true; m.style.minHeight = '180px';
      const copy = (t, n) => { const x = el('button', 'btn px', 'COPIER ' + n); x.onclick = () => { t.select(); try { document.execCommand('copy'); toast(n + ' copié'); } catch { toast('Sélectionne le texte et copie-le (Ctrl+C)'); } }; return x; };
      box.append(el('span', 'label', 'Ton plugin'), el('div', 'hint', 'Crée un dossier, enregistre ces deux textes dedans sous les noms plugin.json et index.js (ajoute une image icon.png si tu veux). Pour le partager dans le NeoStore, suis le guide du SDK NeoDex : un dépôt GitHub avec le sujet neodex-plugin, puis l\'approbation.'),
        el('b', '', 'plugin.json'), m, copy(m, 'plugin.json'), el('b', '', 'index.js'), c, copy(c, 'index.js'));
      main.replaceChildren(bar, box); bar.style.marginBottom = '14px'; return;
    }
    // modifier : le formulaire à gauche, l'aperçu en direct à droite
    const form = el('div', 'sysCard px stForm'), prev = el('div', 'sysCard px stPrev'), wrap = el('div', 'stEdit');
    const refresh = () => { stage.style.setProperty('--k', cur.cfg.color || '#ff4fa8'); TEMPLATES[cur.tpl].run(stage, cur.cfg, {load: () => null, save() {}, open: u => newTab(u)}); list(); save(); };
    const field = (label, obj, key, type = 'text', after) => { const l = el('label', '', label), i = el(type === 'area' ? 'textarea' : 'input'); if (type !== 'area') i.type = type; i.value = obj[key] ?? ''; i.oninput = () => { obj[key] = type === 'number' ? +i.value : i.value; if (obj === cur.cfg && key === 'title') cur.title = i.value; after?.(); refresh(); }; l.append(i); return l; };
    const block = (arr, idx, fill) => { const bl = el('div', 'stBlock'), x = el('button', 'btn px x', '✕'); x.title = 'Retirer'; x.onclick = () => { arr.splice(idx, 1); draw(); }; bl.append(x); fill(bl); return bl; };
    const add = (t, f) => { const x = el('button', 'btn px', t); x.onclick = () => { f(); draw(); }; return x; };
    form.append(el('span', 'label', TEMPLATES[cur.tpl].name), field('Titre', cur.cfg, 'title'), field('Couleur', cur.cfg, 'color', 'color'));
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
  ctx.onOpen(() => draw());
}
