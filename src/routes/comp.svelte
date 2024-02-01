<script lang="ts">
	import { Type, type Static } from '@sinclair/typebox';

	const c = Type.Object({
		name: Type.String()
	});

	export let data: Static<typeof c>;
</script>

<pre>{data.name}</pre>

<style>
	pre {
		font-size: 40px;
	}
</style>
