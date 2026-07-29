import type { ContentItem } from '$lib/content/types';
import sito1 from './sito-1-9783.mp4';
import sito2 from './sito-2-9782.mp4';
import tool1 from './tool-1-9715.mp4';
import tool2 from './tool-2-9714.mp4';

const abaPerugia: ContentItem[] = [
	{
		name: 'Tool 1',
		anno: 2024,
		url: 'https://www.abaperugia.com/',
		description: 'Placeholder description for tool 1.',
		media: [{ type: 'video', src: tool1 }]
	},
	{
		name: 'Tool 2',
		anno: 2024,
		url: 'https://www.abaperugia.com/',
		description: 'Placeholder description for tool 2.',
		media: [{ type: 'video', src: tool2 }]
	},
	{
		name: 'Sito 1',
		anno: 2024,
		url: 'https://www.abaperugia.com/',
		description: 'Placeholder description for sito 1.',
		media: [{ type: 'video', src: sito1 }]
	},
	{
		name: 'Sito 2',
		anno: 2024,
		url: 'https://www.abaperugia.com/',
		description: 'Placeholder description for sito 2.',
		media: [{ type: 'video', src: sito2 }]
	}
];

export default abaPerugia;
