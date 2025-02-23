import { currencies } from '$lib/locale-data/currencies';
import { units } from '$lib/locale-data/units';
import { defaultNumberRange } from '$lib/utils/format-utils';
import { localeMatcher } from './locale-matcher';

export const numberFormatOptionsCommon = {
	style: ['currency', 'unit'],
	signDisplay: ['auto', 'never', 'always', 'exceptZero', undefined],
	useGrouping: [true, false, undefined],
	minimumIntegerDigits: [...defaultNumberRange, undefined],
	minimumFractionDigits: [...defaultNumberRange, undefined],
	maximumFractionDigits: [...defaultNumberRange, undefined],
	minimumSignificantDigits: [...defaultNumberRange, undefined],
	maximumSignificantDigits: [...defaultNumberRange, undefined],
	...localeMatcher
} as const;

export const numberFormatOptionsCurrency = {
	currencySign: ['standard', 'accounting', undefined],
	currencyDisplay: ['code', 'symbol', 'narrowSymbol', 'name', undefined],
	currency: Object.keys(currencies)
} as const;

export const numberFormatOptionsUnit = {
	unit: units,
	unitDisplay: ['short', 'long', 'narrow', undefined],
	compactDisplay: ['short', 'long', undefined],
	notation: ['standard', 'scientific', 'engineering', 'compact', undefined]
} as const;
