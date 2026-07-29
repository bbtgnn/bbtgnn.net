<script lang="ts">
	import { ZoomIn } from '@lucide/svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import type { ClassValue } from 'svelte/elements';
	import { onMount } from 'svelte';
	import 'photoswipe/style.css';

	let {
		src,
		alt,
		width,
		height,
		class: className
	}: {
		src: string;
		alt: string;
		width: number;
		height: number;
		class?: ClassValue;
	} = $props();

	let lightbox: PhotoSwipeLightbox | null = null;

	onMount(() => {
		lightbox = new PhotoSwipeLightbox({
			dataSource: [{ src, width, height, alt }],
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
		lightbox.options.dataSource = [{ src, width, height, alt }];
	});
</script>

<div class={['relative overflow-hidden rounded-lg border border-stone-200', className]}>
	<img {src} {alt} class="w-full" />
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
