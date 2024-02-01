import { Collections } from './config';
import { type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import fm from 'front-matter';
import _ from 'lodash';

type CollectionKey = keyof typeof Collections;
type CollectionSchemaType<T extends CollectionKey> = (typeof Collections)[T];
type CollectionType<T extends CollectionKey> = Static<CollectionSchemaType<T>>;

export function getCollectionSchema<T extends CollectionKey>(
	collection: T
): CollectionSchemaType<T> {
	return Collections[collection];
}

export async function getCollection<T extends CollectionKey>(
	collectionId: T
): Promise<Array<CollectionType<T>>> {
	const collectionSchema = getCollectionSchema<T>(collectionId);

	const fileEntries = import.meta.glob('./**/*.md', { as: 'raw' });
	const collectionEntries = Object.entries(fileEntries).filter((entry) =>
		entry[0].startsWith(`./${collectionId}`)
	);

	const fileContentPromises = collectionEntries.map((entry) => entry[1]());
	const fileContents = await Promise.all(fileContentPromises);

	const fileData = fileContents
		.map((content) => fm(content).attributes)
		.map((data, i) => _.set(data, 'id', collectionEntries[i][0]))
		.map((data, i) => _.set(data, 'markdown', fileContents[i]))
		.filter((data) => Value.Check(collectionSchema, data));

	return fileData as CollectionType<T>[];
}
