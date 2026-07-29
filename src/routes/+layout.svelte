<script lang="ts">
	import LocaleSwitcher from '$lib/components/locale-switcher.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<LocaleSwitcher />
{@render children()}
