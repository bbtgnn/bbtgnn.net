<script lang="ts">
	import ContentItem from '$lib/components/content-item.svelte';
	import Sheet from '$lib/components/sheet.svelte';
	import type { ContentSheet } from '$lib/content/types';
	import type { Snippet } from 'svelte';

	type Props = {
		sheet: ContentSheet;
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
	};

	let { sheet, trigger }: Props = $props();
</script>

<Sheet title={sheet.title} description={sheet.description} {trigger}>
	{#snippet content()}
		<div class="space-y-8">
			{#each sheet.items as item (`${item.name}-${item.anno}`)}
				<ContentItem {item} />
			{/each}
		</div>
	{/snippet}
</Sheet>
