// Generates 1200x630 Open Graph preview cards, one per project, each in that
// project's palette with a "throughline" motif echoing the site. Pure Node +
// zlib (no native deps), rendered at 2x then box-downsampled for clean edges.
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630, SS = 2;
const W2 = W * SS, H2 = H * SS;

function hex(h) {
  h = h.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

function Canvas() {
  const buf = new Float32Array(W2 * H2 * 3);
  return {
    buf,
    fillGradient(top, bottom) {
      for (let y = 0; y < H2; y++) {
        const c = mix(top, bottom, y / (H2 - 1));
        for (let x = 0; x < W2; x++) {
          const i = (y * W2 + x) * 3;
          buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2];
        }
      }
    },
    blend(x, y, col, a) {
      if (x < 0 || y < 0 || x >= W2 || y >= H2 || a <= 0) return;
      if (a > 1) a = 1;
      const i = (y * W2 + x) * 3;
      buf[i] = col[0] * a + buf[i] * (1 - a);
      buf[i + 1] = col[1] * a + buf[i + 1] * (1 - a);
      buf[i + 2] = col[2] * a + buf[i + 2] * (1 - a);
    },
    glow(cx, cy, r, col, maxA) {
      const x0 = Math.max(0, (cx - r) | 0), x1 = Math.min(W2 - 1, (cx + r) | 0);
      const y0 = Math.max(0, (cy - r) | 0), y1 = Math.min(H2 - 1, (cy + r) | 0);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d > r) continue;
        const t = 1 - d / r;
        this.blend(x, y, col, maxA * t * t);
      }
    },
    disc(cx, cy, r, col, a) {
      const x0 = Math.max(0, (cx - r - 1) | 0), x1 = Math.min(W2 - 1, (cx + r + 1) | 0);
      const y0 = Math.max(0, (cy - r - 1) | 0), y1 = Math.min(H2 - 1, (cy + r + 1) | 0);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const d = Math.hypot(x - cx, y - cy);
        const cov = Math.max(0, Math.min(1, r - d + 0.5)); // soft edge
        if (cov > 0) this.blend(x, y, col, a * cov);
      }
    },
    rect(x0, y0, w, h, col, a) {
      for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) this.blend(x, y, col, a);
    },
  };
}

// y of the throughline at column x
function curveY(x) {
  const mid = H2 * 0.60;
  const amp = H2 * 0.135;
  return mid + amp * Math.sin((x / W2) * Math.PI * 1.7 + 0.6);
}

function draw(p) {
  const c = Canvas();
  const bg = hex(p.bg), bg2 = hex(p.bg2), accent = hex(p.accent);
  c.fillGradient(bg, bg2);

  // soft corner glow
  c.glow(W2 * 0.16, H2 * 0.20, H2 * 0.9, accent, p.light ? 0.10 : 0.16);

  // the throughline: a glowing accent curve across the card
  const core = 3 * SS, glowR = 16 * SS;
  for (let x = 0; x < W2; x++) {
    const cy = curveY(x);
    for (let dy = -glowR; dy <= glowR; dy++) {
      const ad = Math.abs(dy);
      let a;
      if (ad <= core) a = p.light ? 0.85 : 0.92;
      else a = (1 - (ad - core) / (glowR - core)) * (p.light ? 0.16 : 0.22);
      if (a > 0) c.blend(x, Math.round(cy) + dy, accent, a);
    }
  }
  // nodes on the curve
  [0.20, 0.45, 0.68, 0.88].forEach((fx) => {
    const x = W2 * fx, y = curveY(x);
    c.glow(x, y, 26 * SS, accent, p.light ? 0.22 : 0.32);
    c.disc(x, y, 9 * SS, accent, 1);
    c.disc(x, y, 4.5 * SS, p.light ? bg : [255, 255, 255], 0.9);
  });

  // a small "mark" bar top-left + thin baseline
  c.rect((64 * SS) | 0, (56 * SS) | 0, 9 * SS, 64 * SS, accent, 1);
  for (let x = 0; x < W2; x++) c.blend(x, (H2 * 0.88) | 0, accent, p.light ? 0.10 : 0.14);

  return downsample(c.buf);
}

function downsample(buf) {
  const out = Buffer.alloc(W * H * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let r = 0, g = 0, b = 0;
    for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
      const i = ((y * SS + sy) * W2 + (x * SS + sx)) * 3;
      r += buf[i]; g += buf[i + 1]; b += buf[i + 2];
    }
    const n = SS * SS, o = (y * W + x) * 3;
    out[o] = Math.round(r / n); out[o + 1] = Math.round(g / n); out[o + 2] = Math.round(b / n);
  }
  return out;
}

// --- minimal PNG encoder (RGB, filter 0) ---
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const tb = Buffer.from(type, 'ascii');
  const body = Buffer.concat([tb, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(rgb) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc(H * (W * 3 + 1));
  for (let y = 0; y < H; y++) {
    raw[y * (W * 3 + 1)] = 0;
    rgb.copy(raw, y * (W * 3 + 1) + 1, y * W * 3, (y + 1) * W * 3);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

const projects = {
  thebrief:          { bg: '#f5f2ec', bg2: '#e7e1d4', accent: '#2a5a3c', light: true },
  chapel:            { bg: '#0d0d0d', bg2: '#161616', accent: '#d4b478', light: false },
  sima:              { bg: '#f5f2ec', bg2: '#e7e1d4', accent: '#2a5a3c', light: true },
  vendetta:          { bg: '#2a1828', bg2: '#1b0f18', accent: '#c47888', light: false },
  cahoots:           { bg: '#0e0b13', bg2: '#16121e', accent: '#a87ce0', light: false },
  comprice:          { bg: '#ffffff', bg2: '#eeeeee', accent: '#b45309', light: true },
  throughline:       { bg: '#15120e', bg2: '#1c1812', accent: '#d4a85f', light: false },
  'hoovu-dashboard': { bg: '#fbfaf4', bg2: '#efe9db', accent: '#f7941d', light: true },
  'hoovu-ai-agents': { bg: '#fbfaf4', bg2: '#efe9db', accent: '#7c3aed', light: true },
  home:              { bg: '#faf7f2', bg2: '#ece3d3', accent: '#8b5a3c', light: true },
};

const outDir = path.join(__dirname);
for (const [key, p] of Object.entries(projects)) {
  const png = encodePNG(draw(p));
  fs.writeFileSync(path.join(outDir, key + '.png'), png);
  console.log('wrote og/' + key + '.png (' + png.length + ' bytes)');
}
