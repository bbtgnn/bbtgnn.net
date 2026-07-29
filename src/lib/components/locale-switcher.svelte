<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime';

	const flags: Record<string, string> = {
		it: '🇮🇹',
		en: '🇬🇧'
	};
</script>

<nav class="locale-switcher" aria-label={m.layout_locale_switcher_label()}>
	{#each locales as locale, i (locale)}
		{#if i > 0}
			<span class="separator" aria-hidden="true">/</span>
		{/if}
		<a
			href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
			class="locale-link"
			class:current={locale === getLocale()}
			hreflang={locale}
			aria-current={locale === getLocale() ? 'page' : undefined}
		>
			{locale}
			<span aria-hidden="true">{flags[locale] ?? ''}</span>
		</a>
	{/each}
</nav>

<style lang="postcss">
	@reference "../../routes/layout.css";

	.locale-switcher {
		@apply flex items-center gap-2 p-4 text-sm;
	}

	.separator {
		@apply text-stone-400;
	}

	.locale-link {
		@apply text-stone-700 no-underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 3px;
	}

	.locale-link:hover {
		@apply underline decoration-stone-400;
	}

	.locale-link.current {
		@apply underline decoration-stone-900;
	}
</style>
