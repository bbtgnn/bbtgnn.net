<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';

	type Props = {
		href: string;
	};

	let { href }: Props = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} class="inline-flex">
	<ArrowUpRight size={12} />
</a>
