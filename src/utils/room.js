import { LAYOUTS } from "../data/content";

// Cabinet footprint relative to its center point (see ArcadeCabinet.jsx).
const CAB_HALF_W = 100;
const CAB_ABOVE  = 130; // center -> top of the marquee
const CAB_BELOW  = 100; // center -> bottom of the base
const NEAR_RADIUS = 120;

// Precompute the "rows" of cabinets once per layout: the vertical band they occupy
// and the aisles (x positions) the sprite can walk through to get past them.
function withRows(layout) {
  const rowYs = [...new Set(layout.cabs.map(c => c.cy))];
  const rows = rowYs.map(cy => {
    const xs = layout.cabs.filter(c => c.cy === cy).map(c => c.cx).sort((a, b) => a - b);
    const first = xs[0] - CAB_HALF_W;
    const last  = xs[xs.length - 1] + CAB_HALF_W;
    const aisles = [];
    if (first >= 24) aisles.push(first / 2);
    for (let i = 1; i < xs.length; i++) aisles.push((xs[i - 1] + xs[i]) / 2);
    if (layout.w - last >= 24) aisles.push((last + layout.w) / 2);
    return { top: cy - CAB_ABOVE, bottom: cy + CAB_BELOW, aisles };
  });
  return { ...layout, rows };
}

const READY = {
  wide: withRows(LAYOUTS.wide),
  tall: withRows(LAYOUTS.tall),
};

// Portrait screens get the 2x2 room; everything else keeps the original row.
export function pickLayout(vw, vh) {
  return vw / vh < 0.85 ? READY.tall : READY.wide;
}

export function nearestCab(layout, x, y) {
  let best = null, bestD = NEAR_RADIUS;
  for (const c of layout.cabs) {
    const d = Math.hypot(x - c.cx, y - c.cy);
    if (d < bestD) { best = c.id; bestD = d; }
  }
  return best;
}

// Where the sprite stands to "play" a cabinet: just in front of its base.
export function standPoint(cab) {
  return { x: cab.cx, y: cab.cy + 112 };
}

// Walk path from `from` to `to` that goes around cabinets instead of over them:
// if a row of cabinets is in the way, step sideways into the nearest aisle,
// walk through it, then step over to the destination.
export function planPath(layout, from, to) {
  const lo = Math.min(from.y, to.y), hi = Math.max(from.y, to.y);
  const blocking = layout.rows.filter(r => hi >= r.top && lo <= r.bottom);
  if (!blocking.length || !blocking[0].aisles.length) return [to];
  const mid = (from.x + to.x) / 2;
  const ax = blocking[0].aisles.reduce((b, a) => (Math.abs(a - mid) < Math.abs(b - mid) ? a : b));
  return [{ x: ax, y: from.y }, { x: ax, y: to.y }, to];
}
