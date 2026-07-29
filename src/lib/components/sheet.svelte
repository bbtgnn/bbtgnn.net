<script lang="ts">
	import * as Sheet from '$lib/shadcn/ui/sheet/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		content: Snippet;
		title?: string;
		description?: string;
	};

	let { trigger, content, title, description, ...rest }: Props = $props();
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
			'overflow-y-auto',
			'data-[side=right]:w-full data-[side=right]:sm:w-3/4 data-[side=right]:sm:max-w-250',
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
		<Sheet.Header class="gap-0 p-4 sm:p-8">
			{#if title}
				<Sheet.Title class="tracking-normal normal-case">{title}</Sheet.Title>
			{/if}
			{#if description}
				<Sheet.Description class="mt-0 leading-normal text-foreground">
					{description}
				</Sheet.Description>
			{/if}
		</Sheet.Header>

		<div class="p-4 pt-0! sm:p-8">
			{@render content?.()}
		</div>
	</Sheet.Content>
</Sheet.Root>

<style>
	:global([data-slot='sheet-overlay']) {
		background: transparent;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}
</style>
