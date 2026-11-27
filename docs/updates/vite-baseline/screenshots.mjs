import { createRequire } from 'module';
const require = createRequire(process.env.PW + '/');
const { chromium } = require('playwright');
const [base, out] = process.argv.slice(2);
const routes = [
  '/home',
  '/info-for-vendors',
  '/statutes',
  '/hall',
  '/vendor/statute',
  '/vendor/apply',
  '/workshops/apply',
  '/admin'
];
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const browser = await chromium.launch();
const report = [];
for (const [vpName, viewport] of Object.entries(viewports)) {
  for (const r of routes) {
    const page = await browser.newPage({ viewport, serviceWorkers: 'block' });
    const msgs = [];
    page.on('console', (m) => {
      if (m.type() === 'error') msgs.push(m.text().slice(0, 160));
    });
    page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 160)));
    const failed = [];
    page.on('requestfailed', (q) => failed.push(q.url().slice(0, 120)));
    await page.goto(base + r, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2500);
    const name = `${vpName}${r.replaceAll('/', '_')}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const imgs = await page.evaluate(
      () => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length
    );
    report.push({
      vp: vpName,
      route: r,
      finalUrl: page.url().replace(base, ''),
      height: h,
      brokenImgs: imgs,
      errors: [...new Set(msgs)],
      failed: [...new Set(failed)]
    });
    await page.close();
  }
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
