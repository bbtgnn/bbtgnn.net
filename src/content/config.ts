import { Type as T } from '@sinclair/typebox';
import * as F from './fields';

//

export enum Collection {
	Organizations = 'organizations',
	Workshops = 'workshops',
	LearningExperiences = 'experiences_learning',
	WorkExperiences = 'experiences_work'
}

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
			employer: F.Relation(Collection.Organizations),
			roles: T.Array(T.String())
		}),
		F.DateSpan('yyyy-MM')
	]),

	experiences_learning: T.Composite([
		T.Object({
			title: T.String(),
			institution: F.Relation(Collection.Organizations)
		}),
		F.DateSpan('yyyy-MM')
	]),

	workshops: T.Composite([
		T.Object({
			title: T.String(),
			organization: F.Relation(Collection.Organizations),
			topics: T.Array(T.String())
		}),
		F.DateSpan('yyyy-MM-dd'),
		F.TimeQuantity(),
		F.Links()
	])
};
