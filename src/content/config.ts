import { Type as T } from '@sinclair/typebox';
import * as F from './fields';

//

export enum Collection {
	Organizations = 'organizations',
	Workshops = 'workshops',
	LearningExperiences = 'experiences_learning',
	WorkExperiences = 'experiences_work'
}

//

export const Collections = {
	organizations: T.Intersect([
		T.Object({
			name: T.String()
		}),
		F.LocationString(),
		F.Links()
	]),

	experiences_work: T.Intersect([
		T.Object({
			employer: F.Relation(Collection.Organizations),
			roles: T.Array(T.String())
		}),
		F.DateSpan()
	]),

	experiences_learning: T.Intersect([
		T.Object({
			title: T.String(),
			institution: F.Relation(Collection.Organizations)
		}),
		F.DateSpan()
	]),

	workshops: T.Intersect([
		T.Object({
			title: T.String(),
			organization: F.Relation(Collection.Organizations),
			topics: T.Array(T.String())
		}),
		F.DateSpan(),
		F.TimeQuantity(),
		F.Links()
	])
} as const;
