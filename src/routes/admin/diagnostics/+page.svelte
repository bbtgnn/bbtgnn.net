<script lang="ts">
	import type { ValueError } from '@sinclair/typebox/errors';
	import * as A from 'effect/ReadonlyArray';
	import * as R from 'effect/ReadonlyRecord';
	import { pipe } from 'effect/Function';
	import { cons } from 'effect/List';

	export let data;
	let { collectionsDiagnosticsReports, contentDirectoryPath } = data;

	function groupErrors(errors: ValueError[]) {
		return pipe(
			errors,
			A.groupBy((error) => error.path),
			R.map((fileErrors) => fileErrors.map((e) => e.message)),
			R.toEntries
		);
	}

	function openFileInVSCodeUrl(filePath: string) {
		return `vscode://file/${filePath}`;
	}

	function vscode(filePath: string) {
		return openFileInVSCodeUrl(`${contentDirectoryPath}${filePath}`);
	}
</script>

<div class="divide-y divide-gray-200">
	{#each collectionsDiagnosticsReports as { collectionId, totalEntriesNumber, invalidEntriesNumber, invalidEntries }}
		<div class="space-y-4 p-8">
			<p class="text-2xl font-bold">{collectionId}</p>
			<table>
				<tr><td>Total entries</td><td>{totalEntriesNumber}</td></tr>
				<tr><td>Invalid entries</td><td>{invalidEntriesNumber}</td></tr>
			</table>
			{#each invalidEntries as entry}
				{@const errors = groupErrors(entry.errors)}
				{@const fileName = entry.filePath.split('/').at(-1)}
				{@const fileLink = vscode(entry.filePath.slice(1))}
				<div class="leading-relaxed">
					<a href={fileLink} class="text-blue-700 underline hover:text-blue-500">{fileName}</a>
					<ul class="list-disc pl-4">
						{#each errors as [errorPath, errorMessages]}
							<li>
								<span class="font-bold">{errorPath}</span>
								<span>–</span>
								<span class="text-gray-400">{errorMessages.join(', ')}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	td {
		@apply border border-gray-200 p-2;
	}
</style>
