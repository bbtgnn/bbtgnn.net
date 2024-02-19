import { importMarkdown } from '$content/importMarkdown';

export const load = async () => {
	const entries = await importMarkdown();
	return { entries };
};
