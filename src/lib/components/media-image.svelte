<script lang="ts">
	import { ZoomIn } from '@lucide/svelte';
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
		class: className
	}: {
		src: ImageSrc;
		alt: string;
		width: number;
		height: number;
		class?: ClassValue;
	} = $props();

	const zoomSrc = $derived(isPicture(src) ? src.img.src : src);
	const zoomWidth = $derived(isPicture(src) ? src.img.w : width);
	const zoomHeight = $derived(isPicture(src) ? src.img.h : height);

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

<div class={['relative overflow-hidden rounded-lg border border-stone-200', className]}>
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
			class="inline-flex h-4 w-5 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-accent"
			aria-label="Ingrandisci immagine"
			onclick={() => lightbox?.loadAndOpen(0)}
		>
			<ZoomIn size={12} />
		</button>
	</div>
</div>

<style>
	/* Sheet sets pointer-events:none on body and only re-enables the dialog.
	   PhotoSwipe mounts on body, so restore events while open. */
	:global(.pswp.pswp--open) {
		pointer-events: auto;
	}
</style>
