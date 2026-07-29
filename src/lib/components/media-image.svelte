<script lang="ts">
	import { ZoomIn } from '@lucide/svelte';
	import MediaSurface from '$lib/components/media-surface.svelte';
	import { isPicture, type ImageSrc } from '$lib/content/types';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import type { ClassValue } from 'svelte/elements';
	import { onMount } from 'svelte';
	import 'photoswipe/style.css';

	/** Matches sheet content max width (~62.5rem / 1000px). */
	const SHEET_IMAGE_SIZES = 'min(1000px, 100vw)';

	let {
		src,
		alt,
		width,
		height,
		zoomSrc: zoomSrcProp,
		zoomVariant = 'default',
		class: className
	}: {
		src: ImageSrc;
		alt: string;
		width: number;
		height: number;
		/** Full-resolution URL for the lightbox; defaults to the preview `src`. */
		zoomSrc?: string;
		zoomVariant?: 'default' | 'prominent';
		class?: ClassValue;
	} = $props();

	const zoomSrc = $derived(
		zoomSrcProp ?? (isPicture(src) ? src.img.src : src)
	);
	const zoomWidth = $derived(isPicture(src) && !zoomSrcProp ? src.img.w : width);
	const zoomHeight = $derived(isPicture(src) && !zoomSrcProp ? src.img.h : height);
	const zoomButtonClass = $derived(
		zoomVariant === 'prominent'
			? 'inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-foreground text-background hover:opacity-80'
			: 'inline-flex h-4 w-5 cursor-pointer items-center justify-center rounded-full bg-secondary text-foreground hover:bg-accent'
	);
	const zoomIconSize = $derived(zoomVariant === 'prominent' ? 20 : 12);

	let lightbox: PhotoSwipeLightbox | null = null;

	onMount(() => {
		lightbox = new PhotoSwipeLightbox({
			dataSource: [{ src: zoomSrc, width: zoomWidth, height: zoomHeight, alt }],
			pswpModule: () => import('photoswipe')
		});

		lightbox.init();

		return () => {
			lightbox?.destroy();
			lightbox = null;
		};
	});

	$effect(() => {
		if (!lightbox) return;
		lightbox.options.dataSource = [{ src: zoomSrc, width: zoomWidth, height: zoomHeight, alt }];
	});
</script>

<MediaSurface class={['relative overflow-hidden rounded-lg border border-stone-200', className]}>
	{#if isPicture(src)}
		<enhanced:img
			{src}
			{alt}
			class="w-full"
			sizes={SHEET_IMAGE_SIZES}
			loading="lazy"
			decoding="async"
		/>
	{:else}
		<img {src} {alt} class="w-full" loading="lazy" decoding="async" />
	{/if}
	<div class="absolute right-2 bottom-2">
		<button
			type="button"
			class={zoomButtonClass}
			aria-label="Ingrandisci immagine"
			onclick={() => lightbox?.loadAndOpen(0)}
		>
			<ZoomIn size={zoomIconSize} />
		</button>
	</div>
</MediaSurface>

<style>
	/* Sheet sets pointer-events:none on body and only re-enables the dialog.
	   PhotoSwipe mounts on body, so restore events while open. */
	:global(.pswp.pswp--open) {
		pointer-events: auto;
	}
</style>
