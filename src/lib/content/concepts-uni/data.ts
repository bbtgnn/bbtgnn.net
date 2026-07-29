import type { ContentSheet } from '$lib/content/types';
import * as m from '$lib/paraglide/messages';
import codingIntroduction from './coding-introduction.svg';
import web from './web.mp4';

export function getConceptsUniSheet(): ContentSheet {
	return {
		title: m.content_concepts_title(),
		description: m.content_concepts_description(),
		items: [
			{
				name: m.content_concepts_intro_name(),
				anno: 2024,
				description: m.content_concepts_intro_description(),
				media: [
					{
						type: 'image-with-zoom',
						src: codingIntroduction,
						alt: m.content_concepts_intro_alt(),
						width: 3816,
						height: 3504
					}
				]
			},
			{
				name: m.content_concepts_client_name(),
				anno: 2024,
				description: m.content_concepts_client_description(),
				media: [
					{
						type: 'video',
						src: web
					}
				]
			}
		]
	};
}
