import { Type as T } from '@sinclair/typebox';
import { Field as F } from '$lib/content';

//

export type Collection =
	| 'organizations'
	| 'workshops'
	| 'experiences_learning'
	| 'experiences_work';

//

export const Collections = {
	organizations: T.Composite([
		T.Object({
			name: T.String()
		}),
		F.LocationString(),
		F.Links()
	]),

	experiences_work: T.Composite([
		T.Object({
			employer: F.Relation('organizations'),
			roles: T.Array(T.String())
		}),
		F.DateSpan('yyyy-MM')
	]),

	experiences_learning: T.Composite([
		T.Object({
			title: T.String(),
			institution: F.Relation('organizations')
		}),
		F.DateSpan('yyyy-MM')
	]),

	workshops: T.Composite([
		T.Object({
			title: T.String(),
			organization: F.Relation('organizations'),
			topics: T.Array(T.String())
		}),
		F.DateSpan('yyyy-MM-dd'),
		F.TimeQuantity(),
		F.Links()
	])
};
