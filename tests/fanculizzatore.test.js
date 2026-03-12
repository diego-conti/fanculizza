const { test, expect } = require('@playwright/test');

test.describe('Fanculizzatore Landing Page', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html');
    await expect(page).toHaveTitle(/Fanculizzatore/);
  });

  test('contains Italian content', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html');
    await expect(page.locator('text=Scegli quando e quanto insultare')).toBeVisible();
    await expect(page.locator('text=Fanculizzatore è un\'applicazione')).toBeVisible();
  });

  test('displays all 4 screenshots', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html');
    const screenshots = [
      'assets/contactview.png',
      'assets/mainview.png',
      'assets/sent.png',
      'assets/settings.png'
    ];
    
    for (const screenshot of screenshots) {
      await expect(page.locator(`img[src="${screenshot}"]`)).toBeVisible();
    }
  });

  test('carousel navigation works', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html');
    
    // Check first screenshot is visible
    await expect(page.locator('img[src="assets/contactview.png"]')).toBeVisible();
    
    // Click next button
    await page.click('.carousel-button.next');
    
    // Check second screenshot is visible
    await expect(page.locator('img[src="assets/mainview.png"]')).toBeVisible();
    
    // Click next button again
    await page.click('.carousel-button.next');
    
    // Check third screenshot is visible
    await expect(page.locator('img[src="assets/sent.png"]')).toBeVisible();
  });

  test('download links exist', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html');
    
    const linuxLink = page.locator('a[href*="fanculizzatore"]:not([href*="deb"])');
    const debLink = page.locator('a[href*="fanculizzatore_1.0.0_amd64.deb"]');
    
    await expect(linuxLink).toHaveAttribute('href', /github\.com\/fanculizzatore\/fanculizzatore\/releases\/download\/v1\.0\.0\/fanculizzatore/);
    await expect(debLink).toHaveAttribute('href', /github\.com\/fanculizzatore\/fanculizzatore\/releases\/download\/v1\.0\.0\/fanculizzatore_1\.0\.0_amd64\.deb/);
  });

  test('page is responsive on mobile', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that content is visible and not overflowing
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    // Check that carousel buttons are visible
    await expect(page.locator('.carousel-button')).toBeVisible();
  });
});