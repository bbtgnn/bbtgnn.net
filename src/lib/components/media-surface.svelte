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
		if (loaded) return;
		loaded = true;
	}

	/** Wait two frames so opacity:0 paints before the fade starts (cached media). */
	function markLoadedAfterPaint() {
		requestAnimationFrame(() => {
			requestAnimationFrame(markLoaded);
		});
	}

	const checkCached: Attachment = (node) => {
		for (const img of node.querySelectorAll('img')) {
			if (img.complete && img.naturalWidth > 0) {
				markLoadedAfterPaint();
				return;
			}
		}
		for (const video of node.querySelectorAll('video')) {
			if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
				markLoadedAfterPaint();
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
