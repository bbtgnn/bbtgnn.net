import { Collections } from './config';
import { type Static, type TAnySchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import fm from 'front-matter';
// import _ from 'lodash';
import { Maybe } from '$lib/maybe';
import { ajv } from '$lib/ajv';

//

type CollectionKey = keyof typeof Collections;
type CollectionSchemaType<T extends CollectionKey> = (typeof Collections)[T];
type CollectionType<T extends CollectionKey> = Static<CollectionSchemaType<T>>;

//

export function getCollectionSchema<T extends CollectionKey>(
	collectionId: T
): CollectionSchemaType<T> {
	return Collections[collectionId];
}

//

type RawFile = {
	path: string;
	contentPromise: () => Promise<string>;
};

type FileData = {
	path: string;
	content: string;
};

export async function readRawFile({ path, contentPromise }: RawFile): Promise<FileData> {
	return {
		path,
		content: await contentPromise()
	};
}

export function isCollectionPath<C extends CollectionKey>(collectionId: C, path: string): boolean {
	return path.startsWith(`./${collectionId}`);
}

export function importCollectionRawFiles<C extends CollectionKey>(collectionId: C): RawFile[] {
	const rawFilesRecord = import.meta.glob('./**/*.md', { as: 'raw' });
	const rawFiles = Object.entries(rawFilesRecord).map(([path, contentPromise]) => ({
		path,
		contentPromise
	}));
	const collectionRawFiles = rawFiles.filter(({ path }) => isCollectionPath(collectionId, path));
	return collectionRawFiles;
}

export function importEntryRawFile<C extends CollectionKey>(
	collectionId: C,
	entryId: string
): Maybe.Maybe<RawFile> {
	return importCollectionRawFiles(collectionId)
		.filter((rawFile) => rawFile.path.endsWith(`${entryId}.md`))
		.at(0);
}

//

function ajvValidate<S extends TAnySchema>(schema: S, data: unknown) {
	// @ts-expect-error Here says that type infer is possibly infinite, but i don't care about types here
	const validate = ajv.compile(schema);
	validate(data);
	return validate.errors;
}

export function parseFrontmatter<S extends TAnySchema>(
	schema: S,
	fileData: FileData
): Maybe.Maybe<Static<S>> {
	try {
		const frontmatterData = fm(fileData.content).attributes;
		const validationErrors = ajvValidate(schema, frontmatterData);
		if (validationErrors) console.log(validationErrors);
		return Value.Decode(schema, frontmatterData);
	} catch (e) {
		console.log(e);
		console.log(`Failed to parse: ${fileData.path}`);
		return undefined;
	}
}

export async function processEntryRawFile<S extends TAnySchema>(
	schema: S,
	rawFile: RawFile
): Promise<Maybe.Maybe<Static<S>>> {
	const entryFileData = await Maybe.runAsync(rawFile, readRawFile);
	const entryData = Maybe.run(entryFileData, (v) => parseFrontmatter(schema, v));
	return entryData;
}

export async function getEntry<T extends CollectionKey>(
	collectionId: T,
	recordId: string
): Promise<Maybe.Maybe<CollectionType<T>>> {
	const collectionSchema = getCollectionSchema(collectionId);
	const entryRawFile = importEntryRawFile(collectionId, recordId);
	const entryData = Maybe.runAsync(entryRawFile, (entryRawFile) =>
		processEntryRawFile(collectionSchema, entryRawFile)
	);
	return entryData;
}

export async function getCollection<T extends CollectionKey>(
	collectionId: T
): Promise<Array<CollectionType<T>>> {
	const collectionSchema = getCollectionSchema(collectionId);
	const collectionRawFiles = importCollectionRawFiles(collectionId);
	const collectionDataPromises = collectionRawFiles.map((rawFile) =>
		processEntryRawFile(collectionSchema, rawFile)
	);
	const collectionData = cleanArray(await Promise.all(collectionDataPromises));
	return collectionData;
}

function cleanArray<T>(array: (T | undefined)[]): T[] {
	const newArray: T[] = [];
	for (const item of array) {
		if (item) newArray.push(item);
	}
	return newArray;
}

// TODO - List invalid files and the reason why
