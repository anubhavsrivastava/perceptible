import { mergeConfig } from '../helper';
import baseConfig from '../defaultConfig';

describe('Configuration Merger ', () => {
	test('should provide a new configuration instance', () => {
		let mergedConfig = mergeConfig(baseConfig, {});
		expect(mergedConfig).not.toBe(baseConfig);
	});

	test('should provide a new configuration instance with only baseConfig', () => {
		let mergedConfig = mergeConfig(baseConfig);
		expect(mergedConfig).not.toBe(baseConfig);
	});

	test('should merge root level key with extension', () => {
		let extensionConfig = {
			threshold: 50
		};
		let mergedConfig = mergeConfig(baseConfig, extensionConfig);
		expect(mergedConfig.threshold).toBe(50);
	});

	test('should merge arrayMerge specified configuration as unified configuration', () => {
		let extensionConfig = {
			subscribers: [() => {}]
		};
		let customBaseConfig = Object.assign(baseConfig, { subscribers: [function a() {}] });
		let mergedConfig = mergeConfig(customBaseConfig, extensionConfig);
		expect(mergedConfig.subscribers.length).toBe(2);
		extensionConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
		customBaseConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
	});

	test('should merge arrayMerge specified configuration for non-existent baseConfig keys', () => {
		let extensionConfig = {
			subscribers: [() => {}]
		};
		let mergedConfig = mergeConfig({}, extensionConfig);
		expect(mergedConfig.subscribers.length).toBe(1);
		extensionConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
	});

	test('should merge arrayMerge specified configuration for non-array values', () => {
		let extensionConfig = {
			subscribers: () => {}
		};
		let customBaseConfig = { subscribers: function a() {} };

		let mergedConfig = mergeConfig(customBaseConfig, extensionConfig);
		expect(mergedConfig.subscribers.length).toBe(2);
		extensionConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
		customBaseConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
	});

	test('should merge objectMerge specified configuration as unified configuration (object)', () => {
		let extensionConfig = {
			viewOffset: { top: 100, bottom: 100 }
		};
		let combinedViewOffset = Object.assign(baseConfig.viewOffset, extensionConfig.viewOffset);
		let mergedConfig = mergeConfig(baseConfig, extensionConfig);
		expect(Object.keys(mergedConfig.viewOffset).length).toBeGreaterThan(2);
		expect(mergedConfig.viewOffset).toMatchObject(combinedViewOffset);
	});

	test('should merge objectMerge specified configuration for non-existent keys', () => {
		let extensionConfig = {
			viewOffset: { top: 100, bottom: 100 }
		};
		let combinedViewOffset = Object.assign({}, extensionConfig.viewOffset);
		let mergedConfig = mergeConfig({}, extensionConfig);
		expect(Object.keys(mergedConfig.viewOffset).length).toBe(2);
		expect(mergedConfig.viewOffset).toMatchObject(combinedViewOffset);
	});
});
