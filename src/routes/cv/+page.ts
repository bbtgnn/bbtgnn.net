import { getCollection } from '$content/api';

export const load = async () => {
	const workshops = await getCollection('workshops');
	return { workshops };
};
