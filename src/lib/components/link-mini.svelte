<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes & {
		children: Snippet;
	};

	let { class: className, target = '_blank', children, ...props }: Props = $props();
</script>

<span>
	{@render children?.()}
	<a
		class={[
			'-ml-1 inline-flex h-4 w-5 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-accent',
			className
		]}
		{target}
		{...props}
	>
		<ArrowUpRight size={12} />
	</a>
</span>
