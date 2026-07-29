import { describe, it, expect, afterEach } from 'vitest';
import { overwriteGetLocale, baseLocale } from '$lib/paraglide/runtime';
import { getContentSheets } from './index';

describe('getContentSheets', () => {
	afterEach(() => {
		overwriteGetLocale(() => baseLocale);
	});

	it('returns Italian sheet titles for it locale', () => {
		overwriteGetLocale(() => 'it');
		const sheets = getContentSheets();
		expect(sheets.workshops.title).toBe('Workshop');
		expect(sheets.abaPerugia.items[0]?.name).toBe('Tracce minori');
		expect(sheets.conceptsUni.items).toHaveLength(2);
		expect(sheets.restor.items[0]?.media).toHaveLength(2);
	});

	it('returns English sheet titles and translated names for en locale', () => {
		overwriteGetLocale(() => 'en');
		const sheets = getContentSheets();
		expect(sheets.workshops.title).toBe('Workshops');
		expect(sheets.abaPerugia.items[0]?.name).toBe('Minor Traces');
		expect(sheets.conceptsUni.title).toContain('Visual explanations');
	});
});
