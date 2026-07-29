import type { ContentSheet } from '$lib/content/types';
import codingIntroduction from './coding-introduction.svg';
import web from './web.mp4';

const conceptsUni: ContentSheet = {
	title: 'Spiegazioni visuali',
	description:
		'Realizzo diagrammi e animazioni per rendere più accessibili concetti di programmazione e web',
	items: [
		{
			name: 'Introduzione alla programmazione',
			anno: 2024,
			description:
				'Scomposizione dei principi fondamentali della programmazione: scrittura, variabili, funzioni',
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
			name: 'Client e server',
			anno: 2024,
			description:
				'Animazione che spiega la comunicazione tra client e server per il caricamento di una pagina web',
			media: [
				{
					type: 'video',
					src: web
				}
			]
		}
	]
};

export default conceptsUni;
