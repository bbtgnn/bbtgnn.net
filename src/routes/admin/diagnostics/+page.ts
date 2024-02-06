import { getCollectionDiagnostics } from '$lib/content/api';
import { Collection } from '$content/config';

export const load = async () => {
	const collectionIds = Object.values(Collection);
	const collectionsDiagnosticsReportPromises = collectionIds.map(getCollectionDiagnostics);
	const collectionsDiagnosticsReports = await Promise.all(collectionsDiagnosticsReportPromises);
	return { collectionsDiagnosticsReports };
};
