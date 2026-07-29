<script lang="ts">
	import { ArrowUpRight, Eye } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		class: className,
		href,
		...props
	}: {
		class?: ClassValue;
		href?: string;
		[key: string]: unknown;
	} = $props();

	const classes = $derived([
		'inline-flex h-4 w-5 items-center justify-center rounded-full bg-stone-200 text-foreground cursor-pointer',
		'hover:bg-sky-300 transition-colors duration-300 ease-in-out',
		className
	]);
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class={classes} {href} {...props}>
		<ArrowUpRight size={12} />
	</a>
{:else}
	<button class={classes} {...props} type="button">
		<Eye size={12} />
	</button>
{/if}
