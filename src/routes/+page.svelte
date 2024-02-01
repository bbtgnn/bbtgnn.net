<script lang="ts">
	import Comp from './comp.svelte';

	export let data;
	let { organizations } = data;
</script>

<h1>Work in prooooooog</h1>
<!-- {#each organizations as organization}
	<Comp data={organization}></Comp>
	<pre>{JSON.stringify(organization, null, 2)}</pre>
{/each} -->
