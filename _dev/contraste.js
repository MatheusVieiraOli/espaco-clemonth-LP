// Mede o contraste real de cada texto sobre imagem de fundo.
// Extrai os pixels da região exata atrás do texto, aplica a matemática do
// gradiente de sobreposição e calcula a razão de contraste WCAG.
const { execFileSync } = require('child_process');
const path = require('path');

const IMG = 'C:/Users/kinto/Desktop/kintech/Espaço Clemonth/site/media/img';

/* ---------- utilidades de cor ---------- */
const srgb = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum  = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (L1, L2) => (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

/* ---------- amostra os pixels de uma região ---------- */
function amostra(arquivo, cx, cy, cw, ch) {
  // devolve lista de pixels RGB da região recortada, reduzida para 40x40
  const buf = execFileSync('ffmpeg', [
    '-v', 'error', '-i', path.join(IMG, arquivo),
    '-vf', `crop=${Math.max(2,Math.round(cw))}:${Math.max(2,Math.round(ch))}:${Math.round(cx)}:${Math.round(cy)},scale=40:40`,
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-frames:v', '1', 'pipe:1'
  ], { maxBuffer: 1 << 24 });
  const px = [];
  for (let i = 0; i + 2 < buf.length; i += 3) px.push([buf[i], buf[i + 1], buf[i + 2]]);
  return px;
}

/* ---------- composição alpha ---------- */
const over = (fg, a, bg) => bg.map((c, i) => fg[i] * a + c * (1 - a));

/* interpola alpha do gradiente linear a partir de paradas [pos, alpha] */
function alphaEm(stops, p) {
  if (p <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i][0]) {
      const [p0, a0] = stops[i - 1], [p1, a1] = stops[i];
      return a0 + (a1 - a0) * (p - p0) / (p1 - p0);
    }
  }
  return stops[stops.length - 1][1];
}

/* ---------- HERÓI ---------- */
// container 1425x900, imagem 1800x1202, object-fit:cover, object-position 50% 58%
const HW = 1425, HH = 900, IW = 1800, IH = 1202;
const esc = Math.max(HW / IW, HH / IH);          // 0.7917
const sobraY = IH * esc - HH;                     // 51.6
const offY = sobraY * 0.58;
const paraNat = (xf, yf) => [ (xf * HW) / esc, (yf * HH + offY) / esc ];

// linear-gradient(to top, .93 0%, .72 30%, .28 62%, .5 100%)  → p medido do RODAPÉ
const HERO_STOPS = [[0, .93], [.30, .72], [.62, .28], [1, .50]];
const VEU = [11, 17, 13];

// Véu do cabeçalho: gradiente de 230% da altura do header (~86px) => ~198px,
// ou seja 22% da altura do herói de 900px.
const HDR_STOPS = [[0, .78], [.42, .52], [.74, .18], [1, 0]];
const HDR_FRAC = 198 / 900;

function fundoHero(xf0, xf1, yf0, yf1) {
  const [nx0, ny0] = paraNat(xf0, yf0), [nx1, ny1] = paraNat(xf1, yf1);
  const px = amostra('a-r-206-2.jpg', nx0, ny0, nx1 - nx0, ny1 - ny0);
  const yMid = (yf0 + yf1) / 2;
  const aHdr = yMid < HDR_FRAC ? alphaEm(HDR_STOPS, yMid / HDR_FRAC) : 0;
  const aLin = alphaEm(HERO_STOPS, 1 - yMid);
  // radial-gradient(120% 80% at 20% 100%, .6 → transparente em 70%)
  const cx = 0.20 * HW, cy = HH, rx = 1.2 * HW, ry = 0.8 * HH;
  const px2 = ((xf0 + xf1) / 2) * HW, py2 = yMid * HH;
  const d = Math.sqrt(((px2 - cx) / rx) ** 2 + ((py2 - cy) / ry) ** 2);
  const aRad = d >= 0.7 ? 0 : 0.6 * (1 - d / 0.7);
  // ordem de pintura: imagem → radial → linear → véu do header
  return px.map(p => over(VEU, aHdr, over(VEU, aLin, over(VEU, aRad, p))));
}

/* ---------- CTA ---------- */
// linear-gradient(105deg, .96 0%, .9 46%, .6 100%) — texto fica na metade esquerda
const CTA_STOPS = [[0, .96], [.46, .90], [1, .60]];
const VEU2 = [19, 28, 23];
const CW = 1425, CH = 940;

function fundoCta(xf0, xf1, yf0, yf1) {
  // img-3939 (1148x744 apos otimizacao) em cover
  const iw = 1138, ih = 732;
  const e = Math.max(CW / iw, CH / ih);
  const ox = (iw * e - CW) / 2, oy = (ih * e - CH) / 2;
  const nx0 = (xf0 * CW + ox) / e, ny0 = (yf0 * CH + oy) / e;
  const nx1 = (xf1 * CW + ox) / e, ny1 = (yf1 * CH + oy) / e;
  const px = amostra('img-3939.jpg', nx0, ny0, nx1 - nx0, ny1 - ny0);
  // projecao no eixo do gradiente de 105deg
  const ang = (105 - 90) * Math.PI / 180;
  const ux = Math.cos(ang), uy = Math.sin(ang);
  const L = Math.abs(CW * ux) + Math.abs(CH * uy);
  const xm = ((xf0 + xf1) / 2) * CW - CW / 2, ym = ((yf0 + yf1) / 2) * CH - CH / 2;
  const p = 0.5 + (xm * ux + ym * uy) / L;
  const a = alphaEm(CTA_STOPS, Math.min(1, Math.max(0, p)));
  return px.map(q => over(VEU2, a, q));
}

/* ---------- elementos ---------- */
const CASOS = [
  ['HERÓI  rótulo "ESPAÇO DE EVENTOS"', 'hero', [199,165,111], 11.2, 500, .11,.45, .262,.283],
  ['HERÓI  H1 branco',                  'hero', [255,255,255], 81.6, 400, .11,.574, .303,.50],
  ['HERÓI  H1 itálico dourado',         'hero', [196,185,151], 81.6, 400, .11,.574, .498,.596],
  ['HERÓI  subtítulo',                  'hero', [255,255,255], 18.0, 300, .11,.521, .623,.726],
  ['HERÓI  nota de horário',            'hero', [255,255,255], 12.5, 300, .11,.45,  .866,.890, .82],
  ['HERÓI  botão fantasma (borda)',     'hero', [255,255,255], 12.5, 500, .285,.481,.769,.832, .62],
  ['HERÓI  botão fantasma (texto)',     'hero', [255,255,255], 12.5, 500, .285,.481,.769,.832],
  ['HEADER links de navegação',         'hero', [255,255,255], 12.2, 400, .33,.75,  .05,.082],
  ['HEADER logo (branco)',              'hero', [255,255,255], 40,   400, .11,.211, .024,.107],
  ['CTA    título',                     'cta',  [247,243,235], 54.4, 400, .11,.475, .177,.24],
  ['CTA    parágrafo',                  'cta',  [184,191,182], 16.6, 300, .11,.40,  .26,.33],
  ['CTA    itens da lista',             'cta',  [247,243,235], 16.2, 300, .11,.475, .386,.437],
  ['CTA    telefone dourado',           'cta',  [196,185,151], 24,   300, .11,.475, .576,.62],
  ['CTA    endereço',                   'cta',  [184,191,182], 13.1, 300, .11,.475, .627,.651]
];

console.log('elemento                         | px  | pior | médio | veredito');
console.log('-'.repeat(78));

for (const [nome, ctx, cor, fs, fw, x0, x1, y0, y1, alpha] of CASOS) {
  const px = ctx === 'hero' ? fundoHero(x0, x1, y0, y1) : fundoCta(x0, x1, y0, y1);
  // se o texto tem alpha, ele mistura com o fundo
  const Ls = px.map(p => {
    const c = alpha ? over(cor, alpha, p) : cor;
    return ratio(lum(...c), lum(...p));
  }).sort((a, b) => a - b);
  const pior = Ls[Math.floor(Ls.length * 0.05)];   // percentil 5 (pior caso realista)
  const medio = Ls.reduce((a, b) => a + b) / Ls.length;
  // limite WCAG AA: 3.0 para texto grande (>=24px ou >=18.66px bold), senão 4.5
  const grande = fs >= 24 || (fs >= 18.66 && fw >= 700);
  const lim = grande ? 3.0 : 4.5;
  const ok = pior >= lim;
  console.log(
    nome.padEnd(32) + ' | ' + String(Math.round(fs)).padStart(3) +
    ' | ' + pior.toFixed(2).padStart(5) + ' | ' + medio.toFixed(2).padStart(5) +
    ' | ' + (ok ? 'ok' : 'FALHA (min ' + lim.toFixed(1) + ')')
  );
}
