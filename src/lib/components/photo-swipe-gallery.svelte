<script module lang="ts">
	export type Image = {
		src: string;
		width: number;
		height: number;
		alt?: string;
		caption?: string;
	};
</script>

<script lang="ts">
	import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css';
	import 'photoswipe/style.css';

	type Props = {
		images: Image[];
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
	};

	type GalleryItem = Image & {
		alt: string;
	};

	type CaptionSlide = {
		data: GalleryItem;
	};

	let { images, trigger }: Props = $props();

	let lightbox: PhotoSwipeLightbox | null = null;
	let captionPlugin: { destroy(): void } | null = null;

	const dataSource = $derived(
		images.map((image) => ({
			...image,
			alt: image.alt ?? ''
		}))
	);

	const triggerProps = $derived.by<Record<string, unknown>>(() => {
		const disabled = dataSource.length === 0;

		return {
			type: 'button',
			'aria-disabled': disabled,
			disabled,
			tabindex: disabled ? -1 : undefined,
			onclick: () => {
				if (disabled || !lightbox) return;
				lightbox.loadAndOpen(0);
			}
		};
	});

	onMount(() => {
		lightbox = new PhotoSwipeLightbox({
			dataSource,
			pswpModule: () => import('photoswipe'),
			paddingFn: (viewportSize) => {
				const narrow = viewportSize.x < 600;
				const edge = narrow ? 20 : 28;
				const side = narrow ? 20 : 56;

				return {
					top: edge,
					bottom: edge,
					left: side,
					right: side
				};
			}
		});

		captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
			captionContent: (slide) => {
				const image = (slide as CaptionSlide).data;
				return image.caption ?? image.alt;
			}
		});

		lightbox.init();

		return () => {
			captionPlugin?.destroy();
			captionPlugin = null;
			lightbox?.destroy();
			lightbox = null;
		};
	});

	$effect(() => {
		if (!lightbox) return;
		lightbox.options.dataSource = dataSource;
	});
</script>

{@render trigger?.({ props: triggerProps })}
