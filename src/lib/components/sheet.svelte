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

	<Sheet.Content side="bottom" class="data-[side=bottom]:h-[calc(100vh-2rem)]">
		<Sheet.Header>
			{#if title}
				<Sheet.Title>{title}</Sheet.Title>
			{/if}
			{@render content?.()}
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
