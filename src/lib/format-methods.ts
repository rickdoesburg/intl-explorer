export const formatMethods = [
	'DateTimeFormat',
	'NumberFormat',
	'ListFormat',
	'RelativeTimeFormat',
	'PluralRules',
	'Collator',
	'Segmenter'
] as const;

export type FormatMethodsKeys =
	| 'DateTimeFormat'
	| 'NumberFormat'
	| 'ListFormat'
	| 'RelativeTimeFormat'
	| 'PluralRules'
	| 'Collator'
	| 'Segmenter';
