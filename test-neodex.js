// lancé par le test « local » de NeoDex : la grille des modèles (cartes assez grandes, icône, nom, description), puis un modèle ouvert et rien qui déborde
module.exports = async ({ pj, sleep }) => {
  await sleep(800);
  const r = await pj(`(() => { const c = [...document.querySelectorAll('.stTpl .sysCard')]; if (!c.length) return null; const b = c[0].getBoundingClientRect(), i = c[0].querySelector('.stPx').getBoundingClientRect();
    return { n: c.length, w: Math.round(b.width), h: Math.round(b.height), ico: Math.round(i.width), font: parseFloat(getComputedStyle(c[0].querySelector('.hint')).fontSize) }; })()`);
  if (!r) return 'déjà des créations : grille des modèles non vue';
  if (r.w < 240 || r.ico < 56 || r.font < 15) throw new Error('cartes trop petites : ' + JSON.stringify(r));
  const over = await pj(`[...document.querySelectorAll('.appWrap *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).length`);
  if (over) throw new Error(over + ' élément(s) débordent à droite');
  // l'appli à blocs : +1 point dix fois → le bloc « si » affiche le message ; puis chaque modèle exporté en vrai plugin, exécuté hors du Studio
  const ap = await pj(`(async () => { const S = document.querySelector('.stWrap').closest('.appWrap').parentNode.__st, T = S.TEMPLATES;
    const a = {id: 'test1', tpl: 'app', title: 'Mes points', cfg: JSON.parse(JSON.stringify(T.app.def))}; S.data.apps.push(a); S.open(a);
    await new Promise(r => setTimeout(r, 100));
    const btn = [...document.querySelectorAll('.stPrev .mkBtn')].find(b => b.textContent === '+1 point'); if (!btn) return {err: 'pas de bouton +1'};
    for (let i = 0; i < 10; i++) [...document.querySelectorAll('.stPrev .mkBtn')].find(b => b.textContent === '+1 point').click();
    const msg = document.querySelector('.stPrev .mkMsg')?.textContent, big = document.querySelector('.stPrev .mkBig')?.textContent, blocks = document.querySelectorAll('.stBlk').length;
    const ran = [];
    for (const k of Object.keys(T)) { const b = {id: 'x' + k, tpl: k, title: 'Essai ' + k, cfg: JSON.parse(JSON.stringify(T[k].def))}, {id, files} = S.stPluginFiles(b, new Uint8Array([1]));
      const code = new TextDecoder().decode(files.find(f => f.name === 'index.js').data), man = JSON.parse(new TextDecoder().decode(files[0].data));
      if (!/^[a-z0-9]+(\\.[a-z0-9]+)+$/.test(man.id)) return {err: 'identifiant ' + man.id};
      const div = document.createElement('div'), mem = {}; let main;
      try { main = new Function(code.replace('export default async function', 'return async function'))(); } catch (e) { return {err: k + ' : ' + e.message}; }
      await main({view: div, host: {addStyle() {}, newTab() {}}, folder: {read: async () => null, write: async (n, d) => { mem[n] = d; }}});
      if (!div.querySelector('.mk h2')) return {err: k + ' : rien dessiné'}; ran.push(k); }
    const z = S.stZip([{name: 'a.txt', data: new TextEncoder().encode('bonjour')}]);
    return {msg, big, blocks, ran: ran.length, zip: z.length}; })()`);
  if (ap.err) throw new Error(ap.err);
  if (!/Bravo, 10 points/.test(ap.msg || '') || ap.big !== '10' || ap.blocks < 3) throw new Error('appli à blocs : ' + JSON.stringify(ap));
  return 'appli à blocs (' + ap.msg + ', ' + ap.blocks + ' blocs), ' + ap.ran + ' modèles exportés en plugin et lancés · ' + r.n + ' modèles, cartes de ' + r.w + '×' + r.h + ' px, icône ' + r.ico + ' px, texte ' + r.font + ' px';
};
