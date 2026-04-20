import { chromium } from 'playwright';
import fs from 'fs';
import https from 'https';
import path from 'path';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  
  console.log('Navigating to TikTok...');
  await page.goto('https://www.tiktok.com/@yisakshoesstore', { waitUntil: 'networkidle' });
  
  console.log('Waiting for images...');
  await page.waitForTimeout(5000); // give it some time to load the React app
  
  // Try to find image tags inside the video feed
  const locators = await page.locator('img').all();
  
  let count = 0;
  for (const loc of locators) {
    if (count >= 4) break;
    const src = await loc.getAttribute('src');
    if (src && src.includes('p16-sign')) { // TikTok thumbnails usually have p16-sign
      count++;
      console.log(`Found image ${count}: ${src}`);
      
      const file = fs.createWriteStream(`public/tiktok/post-${count}.png`);
      https.get(src, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        res.pipe(file);
      });
    }
  }
  
  if (count === 0) {
    console.log('Did not find any p16-sign images, dumping page content...');
    await page.screenshot({ path: 'tiktok-page.png' });
  } else {
    console.log(`Downloaded ${count} images.`);
  }

  await browser.close();
})();
