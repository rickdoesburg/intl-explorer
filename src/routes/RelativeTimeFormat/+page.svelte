<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import RelativeTimeFormat from '$lib/components/pages/RelativeTimeFormat.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
  import Spacer from '$lib/components/ui/Spacer.svelte';

	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<CompatData optionsType="support" {data} />
<Spacer />

{#if browser}
	<RelativeTimeFormat browserCompatData={data}  bind:locale={$selectedLocale} />
{:else}
	<RelativeTimeFormat browserCompatData={data}  {locale} />
{/if}
