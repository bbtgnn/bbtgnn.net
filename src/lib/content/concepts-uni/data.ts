import type { ContentItem } from '$lib/content/types';
import codingIntroduction from './coding-introduction.svg';
import web from './web.gif';

const conceptsUni: ContentItem[] = [
	{
		name: 'Coding introduction',
		anno: 2024,
		description: 'Visualizzazione dei concetti introduttivi alla programmazione.',
		media: [
			{
				type: 'image-with-zoom',
				src: codingIntroduction,
				alt: 'Coding introduction',
				width: 3816,
				height: 3504
			}
		]
	},
	{
		name: 'Web',
		anno: 2024,
		description: 'Visualizzazione dei concetti fondamentali del web.',
		media: [
			{
				type: 'image',
				src: web,
				alt: 'Web'
			}
		]
	}
];

export default conceptsUni;
