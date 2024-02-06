import { getCollection } from '$lib/content/api';
import { compareAsc } from 'date-fns';

export const load = async () => {
	const workshops = await getCollection('workshops');

	const experiences_work = (await getCollection('experiences_work')).sort((a, b) =>
		compareAsc(a.date_start, b.date_start)
	);

	const experiences_work_current = experiences_work.filter((e) => e.current);
	const experiences_work_past = experiences_work.filter((e) => !e.current);

	const experiences_learning = await getCollection('experiences_learning');
	return { workshops, experiences_work_current, experiences_work_past, experiences_learning };
};
