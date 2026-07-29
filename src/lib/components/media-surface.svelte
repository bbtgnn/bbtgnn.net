<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		class: className,
		children
	}: {
		class?: ClassValue;
		children: Snippet;
	} = $props();

	let loaded = $state(false);

	function markLoaded() {
		loaded = true;
	}

	const checkCached: Attachment = (node) => {
		for (const img of node.querySelectorAll('img')) {
			if (img.complete && img.naturalWidth > 0) {
				markLoaded();
				return;
			}
		}
		for (const video of node.querySelectorAll('video')) {
			if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
				markLoaded();
				return;
			}
		}
	};
</script>

<div
	{@attach checkCached}
	class={['media-surface', !loaded && 'media-loading', className]}
	onloadcapture={markLoaded}
	onloadeddatacapture={markLoaded}
>
	{@render children()}
</div>
