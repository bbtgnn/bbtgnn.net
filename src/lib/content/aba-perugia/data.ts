import type { ContentSheet } from '$lib/content/types';
import * as m from '$lib/paraglide/messages';
import sito1 from './sito-1-9783.mp4';
import sito2 from './sito-2-9782.mp4';
import tool1 from './tool-1-9715.mp4';
import tool2 from './tool-2-9714.mp4';

export function getAbaPerugiaSheet(): ContentSheet {
	return {
		title: m.content_aba_title(),
		description: m.content_aba_description(),
		items: [
			{
				name: m.content_aba_tracce_name(),
				anno: 2026,
				url: 'https://alexandraaxinte9.github.io/tracce-minori/',
				description: m.content_aba_tracce_description(),
				media: [{ type: 'video', src: sito2 }]
			},
			{
				name: m.content_aba_bucata_name(),
				anno: 2026,
				url: 'https://azzurrapi01-blip.github.io/la-bucata',
				description: m.content_aba_bucata_description(),
				media: [{ type: 'video', src: sito1 }]
			},
			{
				name: m.content_aba_poster_name(),
				anno: 2026,
				url: 'https://bereees.github.io/poster-generator/',
				description: m.content_aba_poster_description(),
				media: [{ type: 'video', src: tool1 }]
			},
			{
				name: m.content_aba_agape_name(),
				anno: 2026,
				url: 'https://matildepetrucci753-ctrl.github.io/agape-collage/',
				description: m.content_aba_agape_description(),
				media: [{ type: 'video', src: tool2 }]
			}
		]
	};
}
