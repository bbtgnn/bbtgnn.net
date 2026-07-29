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
		background?: string;
		iconColor?: string;
		textColor?: string;
	};

	type GalleryItem = Image & {
		alt: string;
	};

	type CaptionSlide = {
		data: GalleryItem;
	};

	let {
		images,
		trigger,
		background = 'var(--background)',
		iconColor = 'var(--foreground)',
		textColor = 'var(--foreground)'
	}: Props = $props();

	let lightbox: PhotoSwipeLightbox | null = null;
	let captionPlugin: { destroy(): void } | null = null;

	function applyTheme(el: HTMLElement) {
		el.style.setProperty('--pswp-bg', background);
		el.style.setProperty('--pswp-placeholder-bg', background);
		el.style.setProperty('--pswp-icon-color', iconColor);
		el.style.setProperty('--pswp-icon-color-secondary', iconColor);
		el.style.setProperty('--pswp-icon-stroke-color', background);
		el.style.setProperty('--pswp-error-text-color', textColor);
		el.style.setProperty('--pswp-caption-color', textColor);
	}

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
			bgOpacity: 1,
			showHideAnimationType: 'fade',
			showAnimationDuration: 300,
			hideAnimationDuration: 300,
			easing: 'ease-out',
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

		lightbox.on('firstUpdate', () => {
			const el = lightbox?.pswp?.element;
			if (el) applyTheme(el);
		});

		lightbox.on('openingAnimationStart', () => {
			if (!lightbox?.pswp?.options.showAnimationDuration) return;
			lightbox.pswp.element?.classList.add('pswp--sheet-in');
			lightbox.pswp.element?.classList.remove('pswp--sheet-out');
		});

		lightbox.on('closingAnimationStart', () => {
			if (!lightbox?.pswp?.options.hideAnimationDuration) return;
			lightbox.pswp.element?.classList.add('pswp--sheet-out');
			lightbox.pswp.element?.classList.remove('pswp--sheet-in');
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

	$effect(() => {
		void background;
		void iconColor;
		void textColor;
		const el = lightbox?.pswp?.element;
		if (el) applyTheme(el);
	});
</script>

{@render trigger?.({ props: triggerProps })}

<style>
	:global {
		@keyframes pswp-sheet-in {
			from {
				transform: translate3d(0, 100%, 0);
			}
			to {
				transform: translate3d(0, 0, 0);
			}
		}

		@keyframes pswp-sheet-out {
			from {
				transform: translate3d(0, 0, 0);
			}
			to {
				transform: translate3d(0, 100%, 0);
			}
		}

		.pswp.pswp--sheet-in {
			animation: pswp-sheet-in 300ms ease-out both;
		}

		.pswp.pswp--sheet-out {
			animation: pswp-sheet-out 300ms ease-out both;
		}

		@media (prefers-reduced-motion: reduce) {
			.pswp.pswp--sheet-in,
			.pswp.pswp--sheet-out {
				animation: none;
			}
		}

		.pswp__dynamic-caption,
		.pswp__dynamic-caption a,
		.pswp__counter {
			color: var(--pswp-caption-color, var(--pswp-icon-color));
		}

		.pswp__dynamic-caption--mobile {
			background: color-mix(in oklab, var(--pswp-bg, #fff) 92%, transparent);
		}
	}
</style>
