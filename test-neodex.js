// lancé par le test « local » de NeoDex : la grille des modèles (cartes assez grandes, icône, nom, description), puis un modèle ouvert et rien qui déborde
module.exports = async ({ pj, sleep }) => {
  await sleep(800);
  const r = await pj(`(() => { const c = [...document.querySelectorAll('.stTpl .sysCard')]; if (!c.length) return null; const b = c[0].getBoundingClientRect(), i = c[0].querySelector('.stPx').getBoundingClientRect();
    return { n: c.length, w: Math.round(b.width), h: Math.round(b.height), ico: Math.round(i.width), font: parseFloat(getComputedStyle(c[0].querySelector('.hint')).fontSize) }; })()`);
  if (!r) return 'déjà des créations : grille des modèles non vue';
  if (r.w < 240 || r.ico < 56 || r.font < 15) throw new Error('cartes trop petites : ' + JSON.stringify(r));
  const over = await pj(`[...document.querySelectorAll('.appWrap *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).length`);
  if (over) throw new Error(over + ' élément(s) débordent à droite');
  return r.n + ' modèles, cartes de ' + r.w + '×' + r.h + ' px, icône ' + r.ico + ' px, texte ' + r.font + ' px';
};
