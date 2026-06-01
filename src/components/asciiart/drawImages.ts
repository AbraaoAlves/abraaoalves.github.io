
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * US MAP  –  drawn directly onto the grid (no image, no taint)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const US_POLY = [
  [10, 46], [10, 20], [150, 16], [300, 14], [440, 14], [560, 16],
  [650, 22], [710, 34], [748, 54], [802, 54],
  [892, 62], [956, 84], [980, 110], [982, 142],
  [968, 182], [948, 212], [926, 252], [896, 296],
  [860, 336], [826, 378], [792, 420],
  [768, 452], [778, 488], [784, 524], [780, 560],
  [764, 584], [746, 596], [730, 580], [725, 546], [720, 510], [710, 476],
  [686, 456], [648, 452], [610, 458], [582, 450], [556, 460], [520, 452], [488, 470],
  [456, 510], [452, 548], [418, 512], [378, 494],
  [330, 470], [268, 440], [198, 420], [150, 408],
  [120, 400], [100, 360], [54, 300], [20, 236], [10, 180], [10, 96],
];

export function drawUSMap(ctx: CanvasRenderingContext2D, cols: number, rows: number) {
  const NW = 1000, NH = 600, CELL = 0.6; // monospace cell aspect
  const sc = Math.min((cols * CELL) / NW, rows / NH);
  const drawW = (NW * sc) / CELL, drawH = NH * sc;
  ctx.save();
  ctx.translate((cols - drawW) / 2, (rows - drawH) / 2);
  ctx.scale(drawW / NW, drawH / NH);
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(US_POLY[0][0], US_POLY[0][1]);
  for (let i = 1; i < US_POLY.length; i++) ctx.lineTo(US_POLY[i][0], US_POLY[i][1]);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ABRAÃO ALVES LOGO  –  isometric "A" monogram in two-tone blue
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const LOGO_OUTER = [[374, 565], [684.4, 27.3], [995, 565]];
const LOGO_INNER = [[684.4, 207.3], [477.9, 565], [891.1, 565]];
const LOGO_DARK_1 = [[995.8, 562.4], [837.4, 471.8], [685.2, 210.1], [684.8, 27.7]];
const LOGO_DARK_2 = [[550, 565.7], [653.1, 566.5], [738.2, 420.3], [686.6, 330.9]];
const LOGO_DARK_3 = [[999.6, 562.5], [891.5, 563.8], [836.5, 470.6]];

export function drawLogo(ctx: CanvasRenderingContext2D, cols: number, rows: number) {
  const NW = 680, NH = 680, CELL = 0.6; // monospace cell aspect
  const sc = Math.min((cols * CELL) / NW, rows / NH);
  const drawW = (NW * sc) / CELL, drawH = NH * sc;
  ctx.save();
  ctx.translate((cols - drawW) / 2, (rows - drawH) / 2);
  ctx.scale(drawW / NW, drawH / NH);
  ctx.translate(-344, 44); // SVG viewBox offset: viewBox="344 -44 680 680"

  // Light face (#5B9BD5) — outer triangle with inner hole (even-odd fill rule)
  ctx.fillStyle = "#5B9BD5";
  ctx.beginPath();
  ctx.moveTo(LOGO_OUTER[0][0], LOGO_OUTER[0][1]);
  for (let i = 1; i < LOGO_OUTER.length; i++)
    ctx.lineTo(LOGO_OUTER[i][0], LOGO_OUTER[i][1]);
  ctx.closePath();
  // Inner hole
  ctx.moveTo(LOGO_INNER[0][0], LOGO_INNER[0][1]);
  for (let i = 1; i < LOGO_INNER.length; i++)
    ctx.lineTo(LOGO_INNER[i][0], LOGO_INNER[i][1]);
  ctx.closePath();
  ctx.fill("evenodd");

  // Dark facets (#1F4E79) — isometric shading
  ctx.fillStyle = "#1F4E79";
  
  // Facet 1: right leg and upper shading
  ctx.beginPath();
  ctx.moveTo(LOGO_DARK_1[0][0], LOGO_DARK_1[0][1]);
  for (let i = 1; i < LOGO_DARK_1.length; i++)
    ctx.lineTo(LOGO_DARK_1[i][0], LOGO_DARK_1[i][1]);
  ctx.closePath();
  ctx.fill();

  // Facet 2: inner chevron left side
  ctx.beginPath();
  ctx.moveTo(LOGO_DARK_2[0][0], LOGO_DARK_2[0][1]);
  for (let i = 1; i < LOGO_DARK_2.length; i++)
    ctx.lineTo(LOGO_DARK_2[i][0], LOGO_DARK_2[i][1]);
  ctx.closePath();
  ctx.fill();

  // Facet 3: right edge accent
  ctx.beginPath();
  ctx.moveTo(LOGO_DARK_3[0][0], LOGO_DARK_3[0][1]);
  for (let i = 1; i < LOGO_DARK_3.length; i++)
    ctx.lineTo(LOGO_DARK_3[i][0], LOGO_DARK_3[i][1]);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
