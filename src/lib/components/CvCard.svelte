<script lang="ts">
	import { Type as T, type Static } from '@sinclair/typebox';
	import { Field as F } from '$lib/content';
	import { format } from 'date-fns';

	const o = F.DateSpan();
</script>

<div>
	{#if $$slots.title}
		<p><slot name="title" /></p>
	{/if}
	{#if $$slots.subtitle}
		<p><slot name="subtitle" /></p>
	{/if}
	{#if $$slots.time}
		<p>
			<slot name="time" />
		</p>
	{/if}
</div>
