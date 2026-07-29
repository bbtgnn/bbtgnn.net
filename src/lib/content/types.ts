import type { Picture } from '@sveltejs/enhanced-img';

/** Raster images imported with `?enhanced` yield a Picture; SVGs stay as URL strings. */
export type ImageSrc = Picture | string;

export type MediaItem =
	| { type: 'image'; src: Picture; alt?: string }
	| {
			type: 'image-with-zoom';
			src: ImageSrc;
			width: number;
			height: number;
			alt?: string;
	  }
	| { type: 'video'; src: string };

export type ContentItem = {
	name: string;
	anno: number;
	url?: string;
	description?: string;
	media?: MediaItem[];
};

export type ContentSheet = {
	title: string;
	description: string;
	items: ContentItem[];
};

export function mediaSrcKey(media: MediaItem): string {
	if (media.type === 'video') return media.src;
	if (typeof media.src === 'string') return media.src;
	return media.src.img.src;
}

export function isPicture(src: ImageSrc): src is Picture {
	return typeof src === 'object' && src !== null && 'img' in src;
}
