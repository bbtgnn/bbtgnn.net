import type { ContentSheet } from '$lib/content/types';
import * as m from '$lib/paraglide/messages';
import dashboard1 from './dashboard-1.webp?enhanced';
import dashboard1Full from './dashboard-1.svg';
import dashboard2 from './dashboard-2.webp?enhanced';
import dashboard2Full from './dashboard-2.svg';

export function getRestorSheet(): ContentSheet {
	return {
		title: m.content_restor_title(),
		description: m.content_restor_description(),
		items: [
			{
				name: m.content_restor_item_name(),
				anno: 2021,
				media: [
					{
						type: 'image-with-zoom',
						src: dashboard1,
						zoomSrc: dashboard1Full,
						alt: m.content_restor_alt_1(),
						width: 1440,
						height: 900
					},
					{
						type: 'image-with-zoom',
						src: dashboard2,
						zoomSrc: dashboard2Full,
						alt: m.content_restor_alt_2(),
						width: 1440,
						height: 900
					}
				]
			}
		]
	};
}
