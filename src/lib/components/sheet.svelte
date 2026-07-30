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

	let scrolled = $state(false);

	function onContentScroll(e: Event) {
		const target = e.currentTarget as HTMLDivElement;
		scrolled = target.scrollTop > 0;
	}
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
			'overflow-hidden text-base',
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
		<div class="min-h-0 flex-1 overflow-y-auto" onscroll={onContentScroll}>
			<Sheet.Header
				class={[
					'sticky top-0 z-10 gap-0 bg-popover gutter-x pt-8 pb-4 transition-[border-color] duration-300 ease-out',
					scrolled ? 'border-b border-stone-200' : 'border-b border-transparent',
					!description && 'pb-8'
				]}
			>
				{#if title}
					<Sheet.Title class="text-base leading-tight tracking-normal normal-case">
						{title}
					</Sheet.Title>
				{/if}
			</Sheet.Header>

			{#if description}
				<div class="gutter-x pb-8">
					<Sheet.Description class="mt-0 text-base leading-normal text-foreground">
						{description}
					</Sheet.Description>
				</div>
			{/if}

			<div class="gutter-x pb-8">
				{@render content?.()}
			</div>
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
