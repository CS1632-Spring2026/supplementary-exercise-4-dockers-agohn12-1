import { test, expect } from '@playwright/test';

// TODO: Fill in with test cases.
test('TEST-1-RESET', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
      });
    await page.getByRole('link', { name: 'Reset' }).click();
    await expect(page.locator('//*[@id="listing"]/ul/li[1]')).toHaveText('ID 1. Jennyanydots');
    await expect(page.locator('//*[@id="listing"]/ul/li[2]')).toHaveText('ID 2. Old Deuteronomy');
    await expect(page.locator('//*[@id="listing"]/ul/li[3]')).toHaveText('ID 3. Mistoffelees');
  });

  test('TEST-2-CATALOG', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
      });
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page.locator('xpath=/html/body/div/main/div[1]/ol/li[2]/img')).toHaveAttribute('src', '/images/cat2.jpg');
});

test('TEST-3-LISTING', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
      });
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page.locator('//*[@id="listing"]/ul').getByRole('listitem')).toHaveCount(3);
    await expect(page.locator('//*[@id="listing"]/ul/li[3]')).toHaveText('ID 3. Mistoffelees');
    
});

test('TEST-4-RENT-A-CAT', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
      });
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await expect(page.getByRole('button', {name: 'Rent'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Return'})).toBeVisible();
});

test('TEST-5-RENT', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
      });
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).fill('1');
    await page.getByRole('button', { name: 'Rent' }).click();
    await expect(page.locator('//*[@id="listing"]/ul/li[1]')).toHaveText('Rented out');
    await expect(page.locator('//*[@id="listing"]/ul/li[2]')).toHaveText('ID 2. Old Deuteronomy');
    await expect(page.locator('//*[@id="listing"]/ul/li[3]')).toHaveText('ID 3. Mistoffelees');
    await expect(page.locator('//*[@id="rentResult"]')).toHaveText('Success!');
});

test('TEST-6-RETURN', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=false";
        document.cookie = "2=true";
        document.cookie = "3=true";
      });
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).fill('2');
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(page.locator('//*[@id="listing"]/ul/li[1]')).toHaveText('ID 1. Jennyanydots');
    await expect(page.locator('//*[@id="listing"]/ul/li[2]')).toHaveText('ID 2. Old Deuteronomy');
    await expect(page.locator('//*[@id="listing"]/ul/li[3]')).toHaveText('Rented out');
    await expect(page.locator('//*[@id="returnResult"]')).toHaveText('Success!');
});

test('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page }) => {
    await page.goto('http://localhost:8080/greet-a-cat/Jennyanydots');
    await page.evaluate(async () => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    });
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await expect(page.locator('xpath=/html/body')).toHaveScreenshot();
});


test('DEFECT1-FUN-GREET-A-CAT', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
      });
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).fill('1');
    await page.getByRole('button', { name: 'Rent' }).click();
    await page.getByRole('link', { name: 'Greet-A-Cat' }).click();
    await expect(page.locator('//*[@id="greeting"]/h4')).toHaveText('Meow!Meow!');
});