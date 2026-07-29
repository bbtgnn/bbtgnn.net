import type { ContentSheet } from '$lib/content/types';
import assetIndex from './asset-index.webp?enhanced';
import assetTrackingHero from './asset-tracking-hero.webp?enhanced';
import typeAndCode from './IMG_4200.webp?enhanced';
import warmUp from './warmup.mp4';
import tcvideo from './type-coding-video.mp4';
import saad1 from './saad.jpg?enhanced';
import saad2 from './saad-2.jpg?enhanced';

const workshops: ContentSheet = {
	title: 'Workshop',
	description: 'Laboratori di programmazione e design generativo tenuti in giro per l’Italia.',
	items: [
		{
			name: 'Warmup',
			anno: 2026,
			url: 'https://www.abamc.it/mostre-e-eventi/item/warm-up-grande-piccolo',
			description:
				"Introduzione alla programmazione assistita dall'IA. La durata media per la produzione di un sito web interattivo è stata quella di mezza giornata.",
			media: [{ type: 'video', src: warmUp }]
		},
		{
			name: 'XYZ: Sapere, Fare, Diventare',
			anno: 2026,
			url: 'https://www.lascuolaopensource.xyz/it/attivita/xyz-sapere-fare-diventare',
			description:
				'Abbiamo personalizzato e configurato una piattaforma per la gestione delle risorse di un fablab',
			media: [
				{ type: 'image', src: assetIndex },
				{ type: 'image', src: assetTrackingHero }
			]
		},
		{
			name: 'Type and coding',
			anno: 2025,
			url: 'https://abaroma.it/workshops/type-coding-tipografia-parametrica-generativa/',
			description: 'Un workshop per imparare a programmare attraverso la tipografia generativa',
			media: [
				{ type: 'image', src: typeAndCode },
				{ type: 'video', src: tcvideo }
			]
		},
		{
			name: 'SAAD Workhop Week',
			anno: 2023,
			url: 'https://www.instagram.com/p/CyOTHjMIbjn/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
			description:
				"In questo workshop non c'era un tema iniziale: tramite un confronto aperto con gli studenti è emerso il desiderio di realizzare un'installazione immersiva sul tema del terremoto",
			media: [
				{ type: 'image', src: saad1 },
				{ type: 'image', src: saad2 }
			]
		}
	]
};

export default workshops;
