import { mergeConfig } from '../helper';
import baseConfig, { Config } from '../defaultConfig';

describe('Configuration Merger', () => {
	test('should provide a new configuration instance', () => {
		const mergedConfig = mergeConfig(baseConfig, {});
		expect(mergedConfig).not.toBe(baseConfig);
	});

	test('should provide a new configuration instance with only baseConfig', () => {
		const mergedConfig = mergeConfig(baseConfig, undefined);
		expect(mergedConfig).not.toBe(baseConfig);
	});

	test('should merge root level key with extension', () => {
		const extensionConfig = {
			threshold: 50
		};
		const mergedConfig = mergeConfig(baseConfig, extensionConfig);
		expect(mergedConfig.threshold).toBe(50);
	});

	test('should merge arrayMerge specified configuration as unified configuration', () => {
		const extensionConfig = {
			subscribers: [() => {}]
		};
		const customBaseConfig = Object.assign({}, baseConfig, { subscribers: [function a() {}] });
		const mergedConfig = mergeConfig(customBaseConfig, extensionConfig);
		expect(mergedConfig.subscribers.length).toBe(2);
		extensionConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
		customBaseConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
	});

	test('should merge arrayMerge specified configuration for non-existent baseConfig keys', () => {
		const extensionConfig = {
			subscribers: [() => {}]
		};
		const mergedConfig = mergeConfig({} as Config, extensionConfig);
		expect(mergedConfig.subscribers.length).toBe(1);
		extensionConfig.subscribers.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
	});

	test('should merge arrayMerge specified configuration for non-array values', () => {
		const extensionConfig = {
			subscribers: () => {}
		};
		const customBaseConfig = { subscribers: function a() {} };

		const mergedConfig = mergeConfig(customBaseConfig as unknown as Config, extensionConfig as any);
		expect(mergedConfig.subscribers.length).toBe(2);
		const extSubs = Array.isArray(extensionConfig.subscribers) ? extensionConfig.subscribers : [extensionConfig.subscribers];
		const baseSubs = Array.isArray(customBaseConfig.subscribers) ? customBaseConfig.subscribers : [customBaseConfig.subscribers];
		extSubs.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
		baseSubs.forEach(s => {
			expect(mergedConfig.subscribers.includes(s)).toBe(true);
		});
	});

	test('should merge objectMerge specified configuration as unified configuration (object)', () => {
		const extensionConfig = {
			viewOffset: { top: 100, bottom: 100 }
		};
		const combinedViewOffset = Object.assign({}, baseConfig.viewOffset, extensionConfig.viewOffset);
		const mergedConfig = mergeConfig(baseConfig, extensionConfig);
		expect(Object.keys(mergedConfig.viewOffset).length).toBeGreaterThan(2);
		expect(mergedConfig.viewOffset).toMatchObject(combinedViewOffset);
	});

	test('should merge objectMerge specified configuration for non-existent keys', () => {
		const extensionConfig = {
			viewOffset: { top: 100, bottom: 100 }
		};
		const combinedViewOffset = Object.assign({}, extensionConfig.viewOffset);
		const mergedConfig = mergeConfig({} as Config, extensionConfig);
		expect(Object.keys(mergedConfig.viewOffset).length).toBe(2);
		expect(mergedConfig.viewOffset).toMatchObject(combinedViewOffset);
	});
});
