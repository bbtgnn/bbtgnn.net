import { Collections } from '../../content/config';
import { type StaticDecode, type TAnySchema } from '@sinclair/typebox';
import { Value, ValueErrorType, type ValueError } from '@sinclair/typebox/value';
import fm from 'front-matter';

import type { Relation } from './fields';

import * as A from 'effect/ReadonlyArray';
import * as E from 'effect/Either';
import * as O from 'effect/Option';
import { pipe } from 'effect/Function';

//

type CollectionKey = keyof typeof Collections;
type CollectionSchemaType<C extends CollectionKey> = (typeof Collections)[C];
type CollectionType<C extends CollectionKey> = StaticDecode<CollectionSchemaType<C>>;

type CollectionFieldValue<C extends CollectionKey> = CollectionType<C>[keyof CollectionType<C>];

type KeysWithValues<BaseType, CheckedType> = {
	[K in keyof BaseType]: BaseType[K] extends CheckedType ? K : never;
}[keyof BaseType];

type RelationType = StaticDecode<ReturnType<typeof Relation>>;

type K = CollectionType<'workshops'>['organization']['collection'];
type Z = CollectionType<K>;

//

export function getCollectionSchema<T extends CollectionKey>(
	collectionId: T
): CollectionSchemaType<T> {
	return Collections[collectionId];
}

//

//

export function parseFrontmatter<S extends TAnySchema>(
	schema: S,
	fileData: FileData
): E.Either<EntryDiagnosticsReport, StaticDecode<S>> {
	try {
		const frontmatterData = fm(fileData.content).attributes;

		const errors = Array.from(Value.Errors(schema, frontmatterData));
		if (errors.length)
			return E.left({
				filePath: fileData.path,
				errors
			});

		const decoded = Value.Decode(schema, frontmatterData);
		const cleaned = Value.Clean(schema, decoded) as StaticDecode<S>;
		return E.right(cleaned);
	} catch (e) {
		return E.left({
			filePath: fileData.path,
			errors: [
				{
					type: ValueErrorType.Undefined,
					path: '',
					value: e,
					schema: schema,
					message: 'Frontmatter parsing or Value.Decode error'
				}
			]
		});
	}
}

export async function processEntryRawFile<S extends TAnySchema>(
	schema: S,
	rawFile: RawFile
): Promise<E.Either<EntryDiagnosticsReport, StaticDecode<S>>> {
	const entryFileData = await pipe(rawFile, readRawFile);
	return pipe(entryFileData, (data) => parseFrontmatter(schema, data));
}

export function getEntry<C extends CollectionKey>(
	collectionId: C,
	recordId: string
): O.Option<Promise<E.Either<EntryDiagnosticsReport, CollectionType<C>>>> {
	const collectionSchema = getCollectionSchema(collectionId);
	return pipe(
		importEntryRawFile(collectionId, recordId),
		O.map((rawFile) => processEntryRawFile(collectionSchema, rawFile))
	);
}

export async function getCollection<T extends CollectionKey>(
	collectionId: T,
	expand: (keyof CollectionType<T>)[] = []
): Promise<Array<CollectionType<T>>> {
	const collectionSchema = getCollectionSchema(collectionId);
	const collectionDataPromises = pipe(
		collectionId,
		importCollectionRawFiles,
		A.map((rawFile) => processEntryRawFile(collectionSchema, rawFile))
	);
	expand;
	const collectionData = await Promise.all(collectionDataPromises);
	return pipe(collectionData, A.filter(E.isRight), A.map(E.getOrThrow));
}

export async function getCollectionDiagnostics<T extends CollectionKey>(
	collectionId: T
): Promise<CollectionDiagnosticsReport> {
	const collectionSchema = getCollectionSchema(collectionId);

	const collectionDataPromises = pipe(
		collectionId,
		importCollectionRawFiles,
		A.map((rawFile) => processEntryRawFile(collectionSchema, rawFile))
	);
	const collectionData = await Promise.all(collectionDataPromises);

	const totalEntriesNumber = collectionData.length;

	const invalidEntries = collectionData
		.filter(E.isLeft)
		.map(E.getLeft)
		.filter(O.isSome)
		.map(O.getOrThrow);
	const invalidEntriesNumber = invalidEntries.length;

	return {
		collectionId,
		totalEntriesNumber,
		invalidEntriesNumber,
		invalidEntries
	};
}

export interface EntryDiagnosticsReport {
	filePath: string;
	errors: ValueError[];
}

export interface CollectionDiagnosticsReport {
	collectionId: string;
	totalEntriesNumber: number;
	invalidEntriesNumber: number;
	invalidEntries: EntryDiagnosticsReport[];
}
