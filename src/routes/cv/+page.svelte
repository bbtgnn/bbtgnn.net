<script lang="ts">
	export let data;
	let { workshops } = data;
</script>

{#each workshops as workshop}
	<pre>{workshop}</pre>
{/each}
