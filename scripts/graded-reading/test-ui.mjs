/**
 * UI visual test script for graded reading
 */
import { chromium } from 'playwright';
import fs from 'fs';

const OUT_DIR = 'screenshots';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

async function screenshot(name, waitMs = 1000) {
  await page.waitForTimeout(waitMs);
  const path = `${OUT_DIR}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`Screenshot: ${path}`);
}

// 1. Load page and wait for content
try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
} catch (e) {
  console.log('Navigation timeout (expected for SPA), continuing...');
  await page.waitForTimeout(5000);
}
await screenshot('01-home', 2000);

// 2. Click "跟读" nav item first
const followNav = await page.locator('a, button').filter({ hasText: /跟读/ }).first();
if (followNav) {
  await followNav.click();
  await screenshot('01b-reading-section', 2000);
}

// 3. Find and click "分级跟读" tab
await page.waitForSelector('button:has-text("分级跟读")', { timeout: 10000 });
const gradedTab = await page.locator('button:has-text("分级跟读")').first();

if (gradedTab) {
  await gradedTab.click();
  await screenshot('02-graded-levels', 2000);

  // 3. Click Level 1
  const l1Btn = await page.locator('button', { hasText: /Level 1|幼儿版/ }).first();
  if (l1Btn) {
    await l1Btn.click();
    await screenshot('03-bookshelf-l1', 2000);

    // 4. Click Book 1
    const book1 = await page.locator('button', { hasText: /Book 1|January|一月/ }).first();
    if (book1) {
      await book1.click();
      await screenshot('04-story-list', 2000);

      // 5. Click first story (Day 1)
      const firstStory = await page.locator('[role="button"], button, a').filter({ hasText: /Day 1/ }).first();
      if (firstStory) {
        await firstStory.click();
        await screenshot('05-story-player', 3000);
      }
    }
  }
} else {
  console.log('分级跟读 tab not found, dumping page text:');
  const text = await page.textContent('body');
  console.log(text.substring(0, 2000));
}

await browser.close();
console.log('UI test complete');
