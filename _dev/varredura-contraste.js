/* Varredura de contraste no DOM ao vivo.
 * Cole no console do navegador com a página aberta. Lista todo texto que fica
 * abaixo do mínimo WCAG AA (4.5 corrido, 3.0 grande).
 *
 * Herói e bloco de orçamento ficam de fora: o fundo deles é fotografia e é
 * medido por pixel em _dev/contraste.js.
 *
 * Rode duas vezes: uma em desktop e outra em 375px de largura, porque a barra
 * fixa e o menu mobile não existem no desktop.
 */
(() => {
  const srgb = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum  = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  const R    = (a, b) => { const [L1, L2] = [lum(a), lum(b)].sort((x, y) => y - x); return (L1 + .05) / (L2 + .05); };
  const parse = s => { const m = (s || '').match(/[\d.]+/g); return m ? m.slice(0, 4).map(Number) : null; };
  const over = (fg, a, bg) => bg.map((c, i) => fg[i] * a + c * (1 - a));

  // sobe a árvore compondo camadas semitransparentes até achar cor opaca
  function fundo(el) {
    let n = el, pilha = [];
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c) {
        const a = c.length === 4 ? c[3] : 1;
        if (a > 0) { pilha.push([c.slice(0, 3), a]); if (a >= .999) break; }
      }
      n = n.parentElement;
    }
    let base = [255, 255, 255];
    for (let i = pilha.length - 1; i >= 0; i--) base = over(pilha[i][0], pilha[i][1], base);
    return base;
  }

  const abriu = document.querySelector('#mnav').hidden;
  if (abriu && getComputedStyle(document.querySelector('#burger')).display !== 'none') {
    document.querySelector('#burger').click();
  }

  const reprovados = [];
  let testados = 0;

  document.querySelectorAll('body *').forEach(el => {
    if (el.closest('.hero') || el.closest('.cta-final')) return;
    const txt = [...el.childNodes]
      .filter(n => n.nodeType === 3 && n.textContent.trim())
      .map(n => n.textContent.trim()).join(' ');
    if (!txt) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden') return;

    let fg = parse(cs.color); if (!fg) return;
    let fa = fg.length === 4 ? fg[3] : 1;
    // numeral vazado: quem carrega a cor é o traço, não o preenchimento
    if (fa === 0 && cs.webkitTextStrokeColor) {
      const s = parse(cs.webkitTextStrokeColor);
      if (s) { fg = s; fa = s.length === 4 ? s[3] : 1; }
    }
    if (fa === 0) return;

    testados++;
    const bg  = fundo(el);
    const cor = fa < 1 ? over(fg.slice(0, 3), fa, bg) : fg.slice(0, 3);
    const c   = R(cor, bg);
    const fs  = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight) || 400;
    const lim = (fs >= 24 || (fs >= 18.66 && fw >= 700)) ? 3 : 4.5;

    if (c < lim) reprovados.push({
      elemento: el.tagName + '.' + (el.className || '').split(' ').slice(0, 2).join('.'),
      texto: txt.slice(0, 40),
      cor: cs.color,
      fundo: 'rgb(' + bg.map(Math.round).join(',') + ')',
      px: Math.round(fs),
      contraste: +c.toFixed(2),
      minimo: lim
    });
  });

  if (abriu && !document.querySelector('#mnav').hidden) document.querySelector('#burger').click();

  console.log(`largura ${innerWidth}px — ${testados} elementos testados, ${reprovados.length} reprovados`);
  if (reprovados.length) console.table(reprovados); else console.log('tudo em AA');
  return reprovados;
})();
