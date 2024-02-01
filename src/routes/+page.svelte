<script lang="ts">
	import Comp from './comp.svelte';
	import { Value } from '@sinclair/typebox/value';

	export let data;
	let { organizations } = data;
</script>

{#each organizations as organization}
	<Comp data={organization}></Comp>
	<pre>{JSON.stringify(organization, null, 2)}</pre>
{/each}
