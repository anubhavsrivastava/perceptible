/**
 * @jest-environment node
 */

const path = require('path');
const puppeteer = require('puppeteer');

describe('Perceptible Automated Browser E2E Tests', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
	}, 30000);

	afterAll(async () => {
		if (browser) {
			await browser.close();
		}
	});

	beforeEach(async () => {
		page = await browser.newPage();
		await page.setViewport({ width: 1024, height: 768 });
	});

	afterEach(async () => {
		if (page) {
			await page.close();
		}
	});

	test('should initialize Perceptor and inject #dreporter in a real browser', async () => {
		const samplePath = path.resolve(__dirname, '../sample/basicExample.html');
		await page.goto(`file://${samplePath}`, { waitUntil: 'load' });

		// Verify Perceptor instance exists on window
		const perceptorDefined = await page.evaluate(() => typeof window.Perceptor === 'function');
		expect(perceptorDefined).toBe(true);

		// Verify DOM subscriber inserted #dreporter
		await page.waitForSelector('#dreporter');
		const dreporterExists = await page.evaluate(() => !!document.getElementById('dreporter'));
		expect(dreporterExists).toBe(true);

		// Wait for initial interval scheduler tick (500ms default)
		await new Promise(resolve => setTimeout(resolve, 600));

		// Verify reported viewability contents in #dreporter
		const reporterText = await page.evaluate(() => document.getElementById('dreporter').innerText);
		expect(reporterText).toContain('"isVisible": true');
		expect(reporterText).toContain('"surface": 100');
	}, 15000);

	test('should update visibility state when scrolled out of viewport', async () => {
		const samplePath = path.resolve(__dirname, '../sample/basicExample.html');
		await page.goto(`file://${samplePath}`, { waitUntil: 'load' });

		// Scroll viewport down past the target element (height: 2000px on body)
		await page.evaluate(() => window.scrollTo(0, 1000));

		// Wait for next scheduler interval tick (default 500ms)
		await new Promise(resolve => setTimeout(resolve, 800));

		const reporterText = await page.evaluate(() => document.getElementById('dreporter').innerText);
		expect(reporterText).toContain('"isVisible": false');
	}, 15000);

	test('should handle click interactions in browser', async () => {
		const samplePath = path.resolve(__dirname, '../sample/clicktrack.html');
		await page.goto(`file://${samplePath}`, { waitUntil: 'load' });

		// Click on target element #testDiv
		await page.click('#testDiv');

		// Wait briefly for handler execution
		await new Promise(resolve => setTimeout(resolve, 300));

		const countText = await page.evaluate(() => document.getElementById('count').innerText.trim());
		expect(countText).toBe('1');
	}, 15000);
});
