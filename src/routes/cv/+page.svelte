<script lang="ts">
	export let data;
	let { workshops } = data;
</script>

{#each workshops as workshop}
	<pre>{JSON.stringify(workshop, null, 2)}</pre>
{/each}
