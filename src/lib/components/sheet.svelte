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
		side="right"
		class={[
			'overflow-hidden',
			'data-[side=right]:w-3/4 data-[side=right]:sm:max-w-[62.5rem]',
			'duration-300 ease-out',
			'data-open:fade-in-100 data-[side=right]:data-open:slide-in-from-right',
			'data-closed:fade-out-100 data-[side=right]:data-closed:slide-out-to-right'
		]}
		onInteractOutside={(e) => {
			// PhotoSwipe mounts outside the dialog; keep the sheet open while it is.
			if (document.querySelector('.pswp--open')) {
				e.preventDefault();
			}
		}}
		onEscapeKeydown={(e) => {
			if (document.querySelector('.pswp--open')) {
				e.preventDefault();
			}
		}}
	>
		<Sheet.Header class="min-h-0 flex-1 overflow-y-auto">
			{#if title}
				<Sheet.Title>{title}</Sheet.Title>
			{/if}
			{@render content?.()}
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>

<style>
	:global([data-slot='sheet-overlay']) {
		background: transparent;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}
</style>
