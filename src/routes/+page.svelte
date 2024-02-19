<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
	let { entries } = data;
</script>

<pre>{JSON.stringify(entries)}</pre>

{#each entries as entry}
	<SvelteMarkdown source={entry.content} />
{/each}
