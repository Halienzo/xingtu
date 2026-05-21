import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const PORT = 3457;
const DIST = 'E:\\xsc\\app\\dist';

// Simple static server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
  if (!existsSync(filePath) || !readFileSync(filePath)) {
    filePath = join(DIST, 'index.html');
  }
  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Try to skip loading animation
  const skipBtn = page.locator('text=跳过').first();
  if (await skipBtn.isVisible().catch(() => false)) {
    await skipBtn.click();
    await page.waitForTimeout(500);
  }

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-main.png', fullPage: false });

  // Find and click 跟读
  let btn = page.locator('button:has-text("跟读")').first();
  if (await btn.count() === 0) {
    btn = page.locator('text=跟读').first();
  }
  if (await btn.count() > 0 && await btn.isVisible().catch(() => false)) {
    await btn.click();
    await page.waitForTimeout(1500);
    
    // Click 分级跟读 tab
    const gradedTab = page.locator('text=分级跟读').first();
    if (await gradedTab.count() > 0 && await gradedTab.isVisible().catch(() => false)) {
      await gradedTab.click();
      await page.waitForTimeout(1500);
    }
    await page.screenshot({ path: 'screenshot-graded-levels.png', fullPage: false });
    
    // Click Level 1
    const l1 = page.locator('text=Level 1').first();
    if (await l1.count() > 0 && await l1.isVisible().catch(() => false)) {
      await l1.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: 'screenshot-graded-books.png', fullPage: false });
      
      // Click first book (January)
      const firstBook = page.locator('button:has-text("January")').first();
      if (await firstBook.count() > 0) {
        await firstBook.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'screenshot-graded-stories.png', fullPage: false });
        
        // Click first story (Day 1)
        const firstStory = page.locator('button:has-text("Day 1")').first();
        if (await firstStory.count() > 0) {
          await firstStory.click();
          await page.waitForTimeout(1500);
          await page.screenshot({ path: 'screenshot-graded-player.png', fullPage: false });
        }
      }
    }
  } else {
    console.log('分级跟读 button not found');
    const buttons = await page.locator('button').all();
    for (const b of buttons.slice(0, 20)) {
      console.log('Button:', (await b.textContent())?.trim());
    }
  }

  await browser.close();
  server.close();
  console.log('Done');
});
