import type { ContentSheet } from '$lib/content/types';
import * as m from '$lib/paraglide/messages';
import assetIndex from './asset-index.webp?enhanced';
import assetTrackingHero from './asset-tracking-hero.webp?enhanced';
import typeAndCode from './IMG_4200.webp?enhanced';
import warmUp from './warmup.mp4';
import tcvideo from './type-coding-video.mp4';
import saad1 from './saad.jpg?enhanced';
import saad2 from './saad-2.jpg?enhanced';

export function getWorkshopsSheet(): ContentSheet {
	return {
		title: m.content_workshops_title(),
		description: m.content_workshops_description(),
		items: [
			{
				name: m.content_workshops_warmup_name(),
				anno: 2026,
				url: 'https://www.abamc.it/mostre-e-eventi/item/warm-up-grande-piccolo',
				description: m.content_workshops_warmup_description(),
				media: [{ type: 'video', src: warmUp }]
			},
			{
				name: m.content_workshops_xyz_name(),
				anno: 2026,
				url: 'https://www.lascuolaopensource.xyz/it/attivita/xyz-sapere-fare-diventare',
				description: m.content_workshops_xyz_description(),
				media: [
					{ type: 'image', src: assetIndex },
					{ type: 'image', src: assetTrackingHero }
				]
			},
			{
				name: m.content_workshops_type_name(),
				anno: 2025,
				url: 'https://abaroma.it/workshops/type-coding-tipografia-parametrica-generativa/',
				description: m.content_workshops_type_description(),
				media: [
					{ type: 'image', src: typeAndCode },
					{ type: 'video', src: tcvideo }
				]
			},
			{
				name: m.content_workshops_saad_name(),
				anno: 2023,
				url: 'https://www.instagram.com/p/CyOTHjMIbjn/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
				description: m.content_workshops_saad_description(),
				media: [
					{ type: 'image', src: saad1 },
					{ type: 'image', src: saad2 }
				]
			}
		]
	};
}
