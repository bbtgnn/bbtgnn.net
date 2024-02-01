<script lang="ts">
	export let data;
	let { organizations } = data;
</script>

{#each organizations as organization}
	<pre>{JSON.stringify(organization, null, 2)}</pre>
{/each}
