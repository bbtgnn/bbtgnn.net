<script lang="ts">
	import * as Sheet from '$lib/shadcn/ui/sheet/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		content: Snippet;
		title?: string;
	};

	let { trigger, content, title, ...rest }: Props = $props();
</script>

<Sheet.Root {...rest}>
	<Sheet.Trigger>
		{#snippet child({ props })}
			{@render trigger?.({ props })}
		{/snippet}
	</Sheet.Trigger>

	<Sheet.Content
		side="bottom"
		class={[
			'rounded-t-xl data-[side=bottom]:h-[calc(100vh-2rem)]',
			'duration-300 ease-out',
			'data-open:fade-in-100 data-[side=bottom]:data-open:slide-in-from-bottom',
			'data-closed:fade-out-100 data-[side=bottom]:data-closed:slide-out-to-bottom'
		]}
	>
		<Sheet.Header>
			{#if title}
				<Sheet.Title>{title}</Sheet.Title>
			{/if}
			{@render content?.()}
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
