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
</script>

{#if href}
	<a
		class={[
			'-ml-1 inline-flex h-4 w-5 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-accent',
			className
		]}
		{href}
		{...props}
	>
		<ArrowUpRight size={12} />
	</a>
{:else}
	<button
		class={[
			'-ml-1 inline-flex h-4 w-5 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-accent',
			className
		]}
		{...props}
		type="button"
	>
		<Eye size={12} />
	</button>
{/if}
