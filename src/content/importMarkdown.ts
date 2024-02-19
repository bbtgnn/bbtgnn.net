// import * as A from 'fp-ts/Array';
// import * as R from 'fp-ts/Record';
// import * as T from 'fp-ts/Task';
// import { pipe } from 'fp-ts/function';

export async function importMarkdown() {
	const fileRecord = import.meta.glob('./**/*.md', { as: 'raw' });
	const filePromiseList = Object.entries(fileRecord).map(async ([path, loader]) => ({
		path,
		content: await loader()
	}));
	const fileList = await Promise.all(filePromiseList);
	return fileList;
}
