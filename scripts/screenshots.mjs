import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";
import { resolve } from "path";

const BASE = "http://localhost:3000";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PAGES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "team", path: "/team" },
  { name: "blog", path: "/blog" },
  { name: "donate", path: "/donate" },
  { name: "contact", path: "/contact" },
  { name: "opportunities", path: "/opportunities" },
  { name: "university", path: "/universities/harvard-university" },
  { name: "retreats", path: "/retreats" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const label = process.argv[2] || "baseline";
const outDir = resolve("screenshots", label);
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

for (const vp of VIEWPORTS) {
  for (const page of PAGES) {
    const p = await browser.newPage();
    await p.setViewport({ width: vp.width, height: vp.height });
    try {
      await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle2", timeout: 15000 });
      await new Promise(r => setTimeout(r, 500));
      const filename = `${page.name}--${vp.name}.png`;
      await p.screenshot({ path: resolve(outDir, filename), fullPage: true });
      console.log(`✓ ${filename}`);
    } catch (e) {
      console.log(`✗ ${page.name}--${vp.name}: ${e.message.slice(0, 80)}`);
    }
    await p.close();
  }
}

await browser.close();
console.log(`\nDone → ${outDir}`);
