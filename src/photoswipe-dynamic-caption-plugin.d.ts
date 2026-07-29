declare module 'photoswipe-dynamic-caption-plugin' {
	const PhotoSwipeDynamicCaption: new (
		lightbox: unknown,
		options?: {
			captionContent?: (slide: unknown) => string | undefined;
		}
	) => {
		destroy(): void;
	};

	export default PhotoSwipeDynamicCaption;
}
