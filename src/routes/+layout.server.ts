import { getCollection } from '$content/api';

export const load = async () => {
	const organizations = await getCollection('organizations');
	return { organizations };
};
