<script lang="ts">
	import CvCard from '$lib/components/CvCard.svelte';

	export let data;
	let { workshops, experiences_work_current, experiences_work_past, experiences_learning } = data;
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<!-- <h3 class="text-xl font-bold">Formazione</h3>
{#each experiences_learning as l}
	<CvCard>
		<svelte:fragment slot="title">
			{l.title}
		</svelte:fragment>
		<svelte:fragment slot="subtitle">
			{JSON.stringify(l.institution)}
		</svelte:fragment>
	</CvCard>
{/each}
<h3 class="text-xl font-bold">Esperienze lavorative – Attuali</h3>
{#each workshops as workshop}
	<pre>{JSON.stringify(workshop, null, 2)}</pre>
{/each}
<h3 class="text-xl font-bold">Esperienze lavorative – Passate</h3>
{#each experiences_work_current as workshop}
	<pre>{JSON.stringify(workshop, null, 2)}</pre>
{/each}
<h3 class="text-xl font-bold">Insegnamento – Workshop</h3>
{#each experiences_work_past as workshop}
	<pre>{JSON.stringify(workshop, null, 2)}</pre>
{/each} -->
