import { Type as T, type TSchema } from '@sinclair/typebox';
import { type Collection } from './config';
import { format as formatDate } from 'date-fns/format';

// TODO - Valutare l'utilizzo di Effect.Schema

export const create = <Key extends string, Schema extends TSchema>(key: Key, schema: Schema) =>
	T.Const({ [key]: schema } as const);

//

export const ID = () =>
	T.Object({
		id: T.String()
	});

export const Links = () =>
	T.Object({
		links: T.Optional(T.Array(T.String()))
	});

export const Markdown = () =>
	T.Object({
		markdown: T.String()
	});

export const Relation = (collection: Collection) =>
	T.Object({
		relation: T.Literal(collection),
		records: T.Array(T.String())
	});

// export const DateString = () => T.String();
export const DateString = (dateFormat = 'yyyy-MM') =>
	T.Transform(T.String()).Decode(stringToDate).Encode(dateToString(dateFormat));

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

//

function stringToDate(v: string): Date | string {
	try {
		return new Date(v);
	} catch (e) {
		return v;
	}
}

function dateToString(dateFormat: string) {
	return (v: string | Date) => {
		if (typeof v === 'string') return v;
		else return formatDate(v, dateFormat);
	};
}
