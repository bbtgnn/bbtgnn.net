import type { ContentItem } from '$lib/content/types';
import assetIndex from './asset-index.webp';
import assetTrackingHero from './asset-tracking-hero.webp';
import typeAndCode from './IMG_4200.webp';
import warmUp from './warmup.mp4';
import tcvideo from './type-coding-video.mp4';
import saad1 from './saad.jpg';
import saad2 from './saad-2.jpg';

const workshops: ContentItem[] = [
	{
		name: 'Warmup',
		anno: 2026,
		url: 'https://www.abamc.it/mostre-e-eventi/item/warm-up-grande-piccolo',
		description:
			'Un workshop per imparare a programmare e a creare tipografie parametriche generative',
		media: [{ type: 'video', src: warmUp }]
	},
	{
		name: 'XYZ: Sapere, Fare, Diventare',
		anno: 2026,
		url: 'https://www.lascuolaopensource.xyz/it/attivita/xyz-sapere-fare-diventare',
		description: 'Sviluppo piattaforma gestionale per organizzazione risorse',
		media: [
			{ type: 'image', src: assetIndex },
			{ type: 'image', src: assetTrackingHero }
		]
	},
	{
		name: 'Type and coding',
		anno: 2025,
		url: 'https://abaroma.it/workshops/type-coding-tipografia-parametrica-generativa/',
		description:
			'Un workshop per imparare a programmare e a creare tipografie parametriche generative',
		media: [
			{ type: 'image', src: typeAndCode },
			{ type: 'video', src: tcvideo }
		]
	},
	{
		name: 'SAAD Workhop Week',
		anno: 2023,
		url: 'https://www.instagram.com/p/CyOTHjMIbjn/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
		description: 'Workshop, grafica generativa, installazione',
		media: [
			{ type: 'image', src: saad1 },
			{ type: 'image', src: saad2 }
		]
	}
];

export default workshops;
