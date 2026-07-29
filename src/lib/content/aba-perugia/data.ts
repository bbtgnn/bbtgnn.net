import type { ContentSheet } from '$lib/content/types';
import sito1 from './sito-1-9783.mp4';
import sito2 from './sito-2-9782.mp4';
import tool1 from './tool-1-9715.mp4';
import tool2 from './tool-2-9714.mp4';

const abaPerugia: ContentSheet = {
	title: 'Creative coding',
	description: 'Esempi di siti e tool realizzati dagli studenti in corso di creative coding.',
	items: [
		{
			name: 'Tracce minori',
			anno: 2026,
			url: 'https://alexandraaxinte9.github.io/tracce-minori/',
			description: 'Conosci il signor Francesco attraverso le sue passeggiate per Perugia',
			media: [{ type: 'video', src: sito2 }]
		},
		{
			name: 'La Bucata',
			anno: 2026,
			url: 'https://azzurrapi01-blip.github.io/la-bucata',
			description: "Da Porta Pesa al molino di Pretola, un'indagine del paesaggio Perugino",
			media: [{ type: 'video', src: sito1 }]
		},
		{
			name: 'Poster generator',
			anno: 2026,
			url: 'https://bereees.github.io/poster-generator/',
			description: 'Crea un poster combinando i risultati di una grande raccolta iconografica',
			media: [{ type: 'video', src: tool1 }]
		},
		{
			name: 'Agape',
			anno: 2026,
			url: 'https://matildepetrucci753-ctrl.github.io/agape-collage/',
			description: 'Un generatore di collage sul tema della violenza di genere',
			media: [{ type: 'video', src: tool2 }]
		}
	]
};

export default abaPerugia;
