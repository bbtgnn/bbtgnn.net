import { Type as T, type TSchema } from '@sinclair/typebox';
import { type CollectionID } from './config';

// TODO - Valutare l'utilizzo di Effect.Schema

export const create = <Key extends string, Schema extends TSchema>(key: Key, schema: Schema) =>
	T.Const({ [key]: schema } as const);

//

export const ID = () =>
	T.Object({
		id: T.String()
	});

export const Links = () => T.Object({ links: T.Optional(T.Array(T.String({ format: 'uri' }))) });

export const Markdown = () => T.Object({ markdown: T.String() });

export const Relation = (collection: CollectionID) =>
	T.Object({
		collection: T.Literal(collection),
		records: T.Array(ID())
	});

export const DateString = () =>
	T.Transform(T.String())
		.Decode((v) => new Date(v))
		.Encode((v) => v.toISOString());

export const DateSpan = () =>
	T.Object({
		date_start: DateString(),
		date_end: T.Optional(DateString()),
		current: T.Optional(T.Boolean())
	});

export const TimeQuantity = () =>
	T.Object({
		days: T.Optional(T.Number()),
		hours: T.Optional(T.Number())
	});

export const LocationString = () =>
	T.Object({
		location: T.Optional(T.String())
	});
