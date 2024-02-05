import { getCollection } from '$content/api';
import { Collection } from '$content/config';

import * as E from 'effect/Either';
import * as O from 'effect/Option';

export const load = async () => {
	const collectionIds = Object.values(Collection);
	const collectionsDiagnosticsReportPromises = collectionIds.map(getCollectionDiagnosticsReport);
	const collectionsDiagnosticsReports = await Promise.all(collectionsDiagnosticsReportPromises);
	return { collectionsDiagnosticsReports };
};

async function getCollectionDiagnosticsReport(collectionId: Collection) {
	const entries = await getCollection(collectionId);
	const totalEntriesNumber = entries.length;
	const invalidEntries = entries.filter(E.isLeft).map(E.getLeft).filter(O.isSome).map(O.getOrThrow);
	const invalidEntriesNumber = invalidEntries.length;

	return {
		collectionId,
		totalEntriesNumber,
		invalidEntriesNumber,
		invalidEntries
	};
}
