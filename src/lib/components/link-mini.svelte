<script lang="ts">
	import ActionMini from '$lib/components/action-mini.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes & {
		href: string;
		children: Snippet;
	};

	let { class: className, target = '_blank', children, ...props }: Props = $props();
</script>

<span>
	{@render children?.()}
	<ActionMini class={className ?? undefined} {target} {...props} />
</span>
