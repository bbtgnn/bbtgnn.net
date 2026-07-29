<script lang="ts">
	import LocaleSwitcher from '$lib/components/locale-switcher.svelte';
	import { page } from '$app/state';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative">
	<LocaleSwitcher />
	{#key page.url.pathname}
		{@render children()}
	{/key}
</div>
