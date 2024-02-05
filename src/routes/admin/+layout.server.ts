import { join } from 'node:path';

export const prerender = false;

export const load = async () => {
	const workingDirectoryPath = process.cwd();
	const contentDirectoryRelativePath = '/src/content';
	return { contentDirectoryPath: join(workingDirectoryPath, contentDirectoryRelativePath) };
};
