import { Type as T } from '@sinclair/typebox';
import * as F from './fields';

//

// export const collectionID = {
// 	Organizations: 'organizations',
// 	Projects: 'projects',
// 	Workshops: 'workshops',
// 	LearningExperiences: 'experiences_learning',
// 	WorkExperiences: 'experiences_work'
// } as const;

// export type CollectionID = (typeof collectionID)[keyof typeof collectionID];

export enum CollectionID {
	Organizations = 'organizations',
	Workshops = 'workshops',
	LearningExperiences = 'experiences_learning',
	WorkExperiences = 'experiences_work'
}

//

export const Collections = {
	organizations: T.Intersect([
		F.ID(),
		T.Object({
			name: T.String()
		}),
		F.LocationString(),
		F.Links(),
		F.Markdown()
	]),

	experiences_work: T.Intersect([
		F.ID(),
		T.Object({
			employer: F.Relation(CollectionID.Organizations),
			roles: T.Array(T.String())
		}),
		F.DateSpan(),
		F.Markdown()
	]),

	experiences_learning: T.Intersect([
		F.ID(),
		T.Object({
			title: T.String(),
			institution: F.Relation(CollectionID.Organizations)
		}),
		F.DateSpan(),
		F.Markdown()
	]),

	workshops: T.Intersect([
		F.ID(),
		T.Object({
			title: T.String(),
			organization: F.Relation(CollectionID.Organizations),
			topics: T.Array(T.String())
		}),
		F.DateSpan(),
		F.TimeQuantity(),
		F.Links()
	])
} as const;
