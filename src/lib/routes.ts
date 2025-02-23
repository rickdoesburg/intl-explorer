export type Route = {
	path: string;
	name: string;
	sublink?: boolean;
	ariaLabel?: string;
	ariaHidden?: boolean;
};

export const routes: Route[] = [
	{
		path: 'DateTimeFormat',
		name: 'DateTimeFormat'
	},
	{
		path: 'RelativeTimeFormat',
		name: 'RelativeTimeFormat'
	},
	{
		path: 'NumberFormat/Currency',
		name: 'NumberFormat'
	},
	{
		path: 'NumberFormat/Currency',
		name: 'Currency',
		sublink: true,
		ariaLabel: 'NumberFormat Currency Style'
	},
	{
		path: 'NumberFormat/Unit',
		name: 'Unit',
		sublink: true,
		ariaLabel: 'NumberFormat Unit Style'
	},
	{
		path: 'ListFormat',
		name: 'ListFormat'
	},
	{
		path: 'PluralRules',
		name: 'PluralRules'
	},
	{
		path: 'Collator',
		name: 'Collator'
	},
	{
		path: 'Segmenter',
		name: 'Segmenter'
	}
];
