// Renders each page in headless Chromium and saves a faithful 1200x630
// Open Graph capture of the top of the page. Run by .github/workflows.
const { chromium } = require('playwright');
const path = require('path');

const targets = [
  ['index.html', 'og/home.png'],
  ['projects.html', 'og/projects.png'],
  ['sessions.html', 'og/sessions.png'],
  ['projects/thebrief.html', 'og/thebrief.png'],
  ['projects/chapel.html', 'og/chapel.png'],
  ['projects/sima.html', 'og/sima.png'],
  ['projects/vendetta.html', 'og/vendetta.png'],
  ['projects/cahoots.html', 'og/cahoots.png'],
  ['projects/comprice.html', 'og/comprice.png'],
  ['projects/throughline.html', 'og/throughline.png'],
  ['projects/hoovu-dashboard.html', 'og/hoovu-dashboard.png'],
  ['projects/hoovu-ai-agents.html', 'og/hoovu-ai-agents.png'],
  ['projects/vanaja.html', 'og/vanaja.png'],
  ['projects/ai-cmo.html', 'og/ai-cmo.png'],
];

// Neutralise scroll-reveal + looping animations so the capture is static and
// nothing is stuck at opacity:0 above the fold.
const FREEZE = `*{animation:none !important; transition:none !important}
  .reveal{opacity:1 !important; transform:none !important}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  // Skip slow third-party embeds (tweets/videos) — they sit below the fold.
  await page.route('**/*', (route) => {
    const u = route.request().url();
    if (/platform\.twitter\.com|syndication\.twitter|\.youtube|youtube-nocookie|ytimg|x\.com\/widgets/.test(u)) {
      return route.abort();
    }
    return route.continue();
  });

  let failed = 0;
  for (const [file, out] of targets) {
    const url = 'file://' + path.resolve(file);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.addStyleTag({ content: FREEZE });
      try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}
      await page.waitForTimeout(2000);
      await page.screenshot({ path: out });
      console.log('captured', out);
    } catch (e) {
      failed++;
      console.error('FAILED', file, e.message);
    }
  }

  await browser.close();
  if (failed) process.exit(1);
})();
