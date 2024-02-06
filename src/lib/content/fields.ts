import { Type as T, type TSchema } from '@sinclair/typebox';
import { type Collection } from '$content/config';
import { format as formatDate } from 'date-fns/format';

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

//

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

export const Relation = <T extends Collection>(collection: T) =>
	T.Transform(T.String())
		.Decode((id) => ({ collection, id }))
		.Encode((entry) => entry.id);

//

export const Nullable = <T extends TSchema>(schema: T) =>
	T.Union([schema, T.Null(), T.Undefined()]);

//

type DateFormats = 'yyyy-MM' | 'yyyy-MM-dd';

export const DateString = (dateFormat: DateFormats) =>
	T.Transform(T.String()).Decode(stringToDate).Encode(dateToString(dateFormat));

export const DateSpan = (dateFormat: DateFormats = 'yyyy-MM-dd') =>
	T.Object({
		date_start: DateString(dateFormat),
		date_end: Nullable(DateString(dateFormat)),
		current: T.Optional(T.Boolean())
	});

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
