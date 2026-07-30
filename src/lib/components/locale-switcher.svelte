<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import {
		getLocaleForUrl,
		getTextDirection,
		locales,
		localizeHref,
		setLocale,
		type Locale
	} from '$lib/paraglide/runtime';

	const flags: Record<string, string> = {
		it: '🇮🇹',
		en: '🇬🇧'
	};

	const currentLocale = $derived(getLocaleForUrl(page.url.href));

	function hrefFor(locale: Locale) {
		return resolve(localizeHref(page.url.pathname, { locale }) as Pathname);
	}

	async function switchLocale(event: MouseEvent, locale: Locale) {
		// Let modified clicks (new tab, etc.) follow the localized href.
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
			return;
		}

		event.preventDefault();
		if (locale === currentLocale) return;

		// Persist cookie without a document reload; URL update happens via goto.
		setLocale(locale, { reload: false });
		document.documentElement.lang = locale;
		document.documentElement.dir = getTextDirection(locale);

		await goto(hrefFor(locale), {
			invalidateAll: true,
			keepFocus: true,
			noScroll: true
		});
	}
</script>

<nav
	class="locale-switcher"
	aria-label={m.layout_locale_switcher_label({}, { locale: currentLocale })}
>
	{#each locales as locale, i (locale)}
		{#if i > 0}
			<span class="separator" aria-hidden="true">/</span>
		{/if}
		<a
			href={hrefFor(locale)}
			class="locale-link"
			class:current={locale === currentLocale}
			hreflang={locale}
			aria-current={locale === currentLocale ? 'page' : undefined}
			onclick={(event) => switchLocale(event, locale)}
		>
			{locale}
			<span aria-hidden="true">{flags[locale] ?? ''}</span>
		</a>
	{/each}
</nav>

<style lang="postcss">
	@reference "../../routes/layout.css";

	.locale-switcher {
		@apply gutter-x absolute top-0 right-0 z-10 flex items-center gap-2 pt-4 pb-8 text-sm sm:py-8;
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
