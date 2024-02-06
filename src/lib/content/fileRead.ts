import type { Collection } from '$content/config';
import * as O from 'effect/Option';

//

export type RawFile = {
	path: string;
	contentPromise: () => Promise<string>;
};

export type ReadFile = {
	path: string;
	content: string;
};

//

const CONTENT_PATH = '../../content/**/*.md' as const;

export function importCollectionRawFiles<C extends Collection>(collectionId: C): RawFile[] {
	const rawFilesRecord = import.meta.glob(CONTENT_PATH, { as: 'raw' });
	const rawFiles = Object.entries(rawFilesRecord).map(([path, contentPromise]) => ({
		path,
		contentPromise
	}));
	const collectionRawFiles = rawFiles.filter(({ path }) => isCollectionPath(collectionId, path));
	return collectionRawFiles;
}

export async function readRawFile({ path, contentPromise }: RawFile): Promise<ReadFile> {
	return {
		path,
		content: await contentPromise()
	};
}

export function isCollectionPath<C extends Collection>(collectionId: C, path: string): boolean {
	return path.startsWith(`./${collectionId}`);
}

export function importEntryRawFile<C extends Collection>(
	collectionId: C,
	entryId: string
): O.Option<RawFile> {
	return O.fromNullable(
		importCollectionRawFiles(collectionId)
			.filter((rawFile) => rawFile.path.endsWith(`${entryId}.md`))
			.at(0)
	);
}
