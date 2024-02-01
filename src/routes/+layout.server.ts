import { getCollection } from '$content/api';

export const prerender = true;

export const load = async () => {
	const organizations = await getCollection('organizations');
	return { organizations };
};
