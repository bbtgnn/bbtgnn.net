import type { Collection } from '$content/config';
import * as O from 'effect/Option';
import * as Record from 'effect/ReadonlyRecord'
import * as Array from 'effect/ReadonlyArray'
import {pipe} from 'effect/Function'

//

export type ViteF = {
	path: string;
	contentPromise: () => Promise<string>;
};

function getAllDocumentsImportData(): Promise<FileImportData[]> {
	return 
}

export type EntryFile = {
	path: string;
	content: string;
};

//

const CONTENT_PATH = '../../content/**/*.md' as const;




export function importCollectionEntryFiles<C extends Collection>(collectionId: C): Promise<DocumentImportEntry[]> {
	return pipe (
		getCollectionsEntries(),
		Record.toEntries,

	)
	// const rawFilesRecord = 
	// const rawFiles = Object.entries(rawFilesRecord).map(([path, contentPromise]) => ({
	// 	path,
	// 	contentPromise
	// }));
	// const collectionRawFiles = rawFiles.filter(({ path }) => isCollectionPath(collectionId, path));
	// return collectionRawFiles;
}

export async function readRawFile({ path, contentPromise }: DocumentImportEntry): Promise<EntryFile> {
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
): O.Option<DocumentImportEntry> {
	return O.fromNullable(
		importCollectionEntryFiles(collectionId)
			.filter((rawFile) => rawFile.path.endsWith(`${entryId}.md`))
			.at(0)
	);
}
