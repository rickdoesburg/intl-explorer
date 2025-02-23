<script lang="ts">
	import type { PlaygroundOption, PlaygroundSchema } from '$lib/playground/playground.schema';
	import type { FormatMethodsKeys } from '$lib/format-methods';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	import MdnLink from '$lib/components/ui/MDNLink.svelte';
	import Spacer from '$lib/components/ui/Spacer.svelte';
	import PlaygroundOptions from './PlaygroundOptions.svelte';
	import PlaygroundInput from './PlaygroundInput.svelte';
	import PlaygroundSecondaryFormatters from './PlaygroundSecondaryFormatters.svelte';
	import CopyButton from './CopyButton.svelte';

	import {
		schemaToCode,
		schemaToPrimaryFormatterOutput,
		schemaToResolvedOptions,
		schemaToSecondaryFormattersOutput
	} from '$lib/playground/format.utils';
	import { parseSchemaFromURL, setSchemaInURL } from '$lib/playground/url.utils';
	import { validateAndUpdateSchema } from '$lib/playground/schemas/validate';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { clampValue } from '$lib/utils/format-utils';
	import { schemas, type SchemaKeys } from '$lib/playground/schemas';
  import { onMount } from 'svelte';
  import { listFormatSchema } from '$lib/playground/schemas/listFormat.schema';

	export let data: { [key: string]: BrowserCompatData };
	export let locale: string;

	let schema = parseSchemaFromURL<'ListFormat'>();
	let secondaryFormatters = schema ? schemaToSecondaryFormattersOutput(schema, locale) : [];
	let browserCompatData = schema ? { ...data[schema.method] } : null;

	onMount(() => {
		if(!schema) {
			setSchemaInURL(listFormatSchema);
			schema = listFormatSchema;
		}
	})

	const onChangeOption = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!schema) return;
		const isRadioEvent = target.type === 'radio';
		const optionName = target.name;
		const optionValue = isRadioEvent
			? target.attributes.getNamedItem('group')?.nodeValue
			: target.value;
		const radioValue = optionValue === 'true' ? true : optionValue === 'false' ? false : undefined;
		const value = isRadioEvent ? radioValue : optionValue;
		const schemaOptions = schema.options.map((option) =>
			option.name === optionName
				? {
						...option,
						value: clampValue(option, value)
				  }
				: option
		);
		const newSchema: PlaygroundSchema<'ListFormat'> = {
			...schema,
			options: schemaOptions as unknown as PlaygroundOption<'ListFormat'>[]
		};
		const isRelativeTimeUnit =
			(schema.method as FormatMethodsKeys) === 'RelativeTimeFormat' && optionName === 'unit';
		if (isRelativeTimeUnit) {
			newSchema.inputValues[1] = optionValue;
		}
		schema = validateAndUpdateSchema(newSchema);
		setSchemaInURL(schema);
	};

	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		if (schema?.inputValueType === 'array') {
			const parsedValue = value.split(',');
			schema.inputValues[0] = parsedValue;
		}
		if (schema?.inputValueType === 'number') {
			const parsed = parseInt(value, 10);
			schema.inputValues[0] = isNaN(parsed) ? 0 : parsed;
		}
	};

	const onChangeDate = (datetime: string) => {
		if (schema?.inputValueType === 'date') {
			schema.inputValues[0] = datetime;
		}
	};

	const onChangeSchema = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		const newSchema = validateAndUpdateSchema(
			schemas[value as SchemaKeys] as unknown as PlaygroundSchema<'ListFormat'>
		);
		schema = newSchema;
		secondaryFormatters = schemaToSecondaryFormattersOutput(newSchema, locale);
		browserCompatData = { ...data[newSchema.method] };
		setSchemaInURL(newSchema);
	};

	const copy = async () => {
		if (!schema) return;
		await copyToClipboard(schemaToCode(schema, locale));
	};
</script>

{#if schema}
	<p><MdnLink header={schema.method} /></p>
	<Spacer />
	<PlaygroundInput bind:locale {schema} {onChangeSchema} {onChangeDate} {onInput} />
	<PlaygroundOptions {browserCompatData} {schema} {onChangeOption} />
	<details open id="output">
		<summary>
			<h2>Output</h2>
		</summary>
		<Highlight code={schemaToPrimaryFormatterOutput(schema, locale)} />
	</details>
	<details open id="code">
		<summary>
			<h2>Code</h2>
		</summary>
		<div>
			<Highlight language={typescript} code={schemaToCode(schema, locale)} />
			<CopyButton {copy} />
		</div>
	</details>
	<details open id="resolvedOptions">
		<summary>
			<h2>Resolved Options</h2>
		</summary>
		<div>
			<Highlight language={typescript} code={schemaToResolvedOptions(schema, locale)} />
		</div>
	</details>
	<PlaygroundSecondaryFormatters {secondaryFormatters} />
{/if}

<style>
	h2 {
		font-size: 1.25rem;
		display: inline-block;
		margin: 0.5rem 0;
	}
</style>
