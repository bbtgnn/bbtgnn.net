import type { ContentItem } from '$lib/content/types';
import dashboard1 from './dashboard-1.svg';
import dashboard2 from './dashboard-2.svg';

const restor: ContentItem[] = [
	{
		name: 'Dashboard',
		anno: 2024,
		url: 'https://restor.eco/',
		description: 'Dashboard progettata per Restor, una ONG Svizzera.',
		media: [
			{
				type: 'image-with-zoom',
				src: dashboard1,
				alt: 'Restor dashboard 1',
				width: 1440,
				height: 900
			},
			{
				type: 'image-with-zoom',
				src: dashboard2,
				alt: 'Restor dashboard 2',
				width: 1440,
				height: 900
			}
		]
	}
];

export default restor;
