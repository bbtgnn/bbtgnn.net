export type MediaItem =
	| { type: 'image'; src: string; alt?: string }
	| {
			type: 'image-with-zoom';
			src: string;
			width: number;
			height: number;
			alt?: string;
	  }
	| { type: 'video'; src: string };

export type ContentItem = {
	name: string;
	anno: number;
	url?: string;
	description: string;
	media?: MediaItem[];
};
