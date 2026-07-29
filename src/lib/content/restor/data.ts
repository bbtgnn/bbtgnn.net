import type { ContentSheet } from '$lib/content/types';
import dashboard1 from './dashboard-1.svg';
import dashboard2 from './dashboard-2.svg';

const restor: ContentSheet = {
	title: 'Dashboard Restor',
	description: 'Dashboard progettata per Restor, una ONG Svizzera che si occupa di riforestazione.',
	items: [
		{
			name: 'Dashboard design',
			anno: 2021,
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
	]
};

export default restor;
