<script lang="ts">
	import LinkMini from '$lib/components/link-mini.svelte';
	import MediaImage from '$lib/components/media-image.svelte';
	import MediaSurface from '$lib/components/media-surface.svelte';
	import { mediaSrcKey, type ContentItem } from '$lib/content/types';

	/** Matches sheet content max width (~62.5rem / 1000px). */
	const SHEET_IMAGE_SIZES = 'min(1000px, 100vw)';

	let { item }: { item: ContentItem } = $props();
</script>

<article class="">
	<p class="font-bold">
		{#if item.url}
			<LinkMini href={item.url}>{item.name}</LinkMini>
		{:else}
			{item.name}
		{/if}
		<span class="text-muted-foreground"> · {item.anno}</span>
	</p>
	{#if item.description}
		<p>{item.description}</p>
	{/if}

	<div class="mt-2">
		{#each item.media ?? [] as media, i (mediaSrcKey(media))}
			{#if media.type === 'image-with-zoom'}
				<MediaImage
					src={media.src}
					alt={media.alt ?? `${item.name} — ${i + 1}`}
					width={media.width}
					height={media.height}
					zoomVariant="prominent"
				/>
			{:else if media.type === 'image'}
				<MediaSurface class="overflow-hidden rounded-lg border border-stone-200">
					<enhanced:img
						src={media.src}
						alt={media.alt ?? `${item.name} — ${i + 1}`}
						class="w-full"
						sizes={SHEET_IMAGE_SIZES}
						loading="lazy"
						decoding="async"
					/>
				</MediaSurface>
			{:else}
				<MediaSurface class="overflow-hidden rounded-lg border border-stone-200">
					<video
						src={media.src}
						class="w-full"
						autoplay
						muted
						loop
						playsinline
						preload="none"
						aria-label="{item.name} — {i + 1}"
					></video>
				</MediaSurface>
			{/if}
		{/each}
	</div>
</article>
