import { getCollection } from '$content/api';
import { Collection } from '$content/config';

export const load = async () => {
	const collectionList = Object.values(Collection);
	const dataPromise = collectionList.map((collection) => getCollection(collection));
	const data = await Promise.all(dataPromise);
	const labelledData = data.map((o, i) => ({
		collection: collectionList[i],
		entries: o
	}));
	return labelledData;
};
