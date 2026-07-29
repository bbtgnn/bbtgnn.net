<script lang="ts">
	import ActionMini from '$lib/components/action-mini.svelte';
	import LinkMini from '$lib/components/link-mini.svelte';
	import MediaImage from '$lib/components/media-image.svelte';
	import Sheet from '$lib/components/sheet.svelte';
	import abaPerugia from '$lib/content/aba-perugia/data';
	import conceptsUni from '$lib/content/concepts-uni/data';
	import restor from '$lib/content/restor/data';
	import type { ContentItem } from '$lib/content/types';
	import workshops from '$lib/content/workshops/data';
</script>

{#snippet contentItems(items: ContentItem[])}
	<div class="space-y-8">
		{#each items as item (`${item.name}-${item.anno}`)}
			<article class="space-y-3">
				<p>
					{#if item.url}
						<LinkMini href={item.url}>{item.name}</LinkMini>
					{:else}
						{item.name}
					{/if}
					<span class="text-muted-foreground"> · {item.anno}</span>
				</p>
				<p>{item.description}</p>
				{#each item.media ?? [] as media, i (media.src)}
					{#if media.type === 'image-with-zoom'}
						<MediaImage
							src={media.src}
							alt={media.alt ?? `${item.name} — ${i + 1}`}
							width={media.width}
							height={media.height}
						/>
					{:else if media.type === 'image'}
						<img src={media.src} alt={media.alt ?? `${item.name} — ${i + 1}`} class="w-full" />
					{:else}
						<video
							src={media.src}
							class="w-full"
							autoplay
							muted
							loop
							playsinline
							aria-label="{item.name} — {i + 1}"
						></video>
					{/if}
				{/each}
			</article>
		{/each}
	</div>
{/snippet}

<main>
	<div class="group">
		<p>Ciao! 👋</p>
		<p>Sono Giovanni Abbatepaolo 🌲</p>
	</div>

	<div class="group">
		<p>Mi occupo di:</p>
		<ul class="skills">
			<li class="u-didattica">Didattica 📚</li>
			<li class="u-architettura">Architettura dell'informazione 🏗️</li>
			<li class="u-sviluppo">Sviluppo web 👨‍💻</li>
			<li class="u-ui-ux-design">UI/UX design 🪢</li>
			<li class="u-graphic-design">Graphic design 🎨</li>
		</ul>
	</div>

	<div class="group">
		<p>Lavoro per:</p>
		<ul>
			<li>
				<p>
					<LinkMini href="https://www.abaperugia.com/author/abbatepaologiovanni/"
						>Accademia di Belle Arti di Perugia</LinkMini
					>
				</p>
				<ul>
					<li>
						<span class="u-didattica">Insegno</span> <span class="u-sviluppo">creative coding</span>
						<Sheet title="Creative coding">
							{#snippet trigger({ props })}
								<ActionMini {...props} aria-label="Apri esempi creative coding" />
							{/snippet}
							{#snippet content()}
								{@render contentItems(abaPerugia)}
							{/snippet}
						</Sheet>
					</li>
					<li>
						<span class="u-graphic-design">Visualizzo</span>
						<span class="u-architettura">concetti</span>
						<Sheet title="Concetti">
							{#snippet trigger({ props })}
								<ActionMini {...props} aria-label="Apri galleria concetti" />
							{/snippet}
							{#snippet content()}
								{@render contentItems(conceptsUni)}
							{/snippet}
						</Sheet>
					</li>
				</ul>
			</li>
			<li>
				<p>Dyne.org / Forkbomb</p>
				<ul>
					<li>
						<span class="u-ui-ux-design">Progetto</span> e <span class="u-sviluppo">sviluppo</span>
						<LinkMini href="https://credimi.io/">Credimi</LinkMini>
						e <LinkMini href="https://attesta.apps.forkbomb.eu/">Attesta</LinkMini>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	<div class="group">
		<p>Da freelance:</p>
		<ul>
			<li>
				Ho progettato una dashboard
				<Sheet title="Restor">
					{#snippet trigger({ props })}
						<ActionMini {...props} aria-label="Apri galleria dashboard Restor" />
					{/snippet}
					{#snippet content()}
						{@render contentItems(restor)}
					{/snippet}
				</Sheet>
				per <LinkMini href="https://restor.eco/">Restor, una ONG Svizzera</LinkMini>
			</li>
			<li>
				<span class="u-didattica">Insegno</span> <span class="u-sviluppo">programmazione</span> in
				workshop in giro per l'Italia
				<Sheet title="Workshop">
					{#snippet trigger({ props })}
						<ActionMini {...props} aria-label="Apri elenco workshop" />
					{/snippet}
					{#snippet content()}
						{@render contentItems(workshops)}
					{/snippet}
				</Sheet>
			</li>
		</ul>
	</div>

	<div class="group">
		<p>Di più:</p>
		<ul>
			<li>
				<LinkMini
					href="https://giovanniabbatepaolo.notion.site/458ab8fdff2742bd817fdd6ac820e188?v=cda461a173de48e9b30d487b7f741fd2"
				>
					portfolio <span class="u-graphic-design">creative</span>
					<span class="u-graphic-design">coding</span>
					<Sheet>
						{#snippet trigger({ props })}
							<button {...props}>Open</button>
						{/snippet}
						{#snippet content()}
							<p>Content</p>
						{/snippet}
					</Sheet>
				</LinkMini>
			</li>
			<li>
				<LinkMini href="https://www.instagram.com/bbt.gnn/">instagram</LinkMini>
			</li>
			<li>
				<LinkMini href="mailto:giovanniabb@gmail.com">email</LinkMini>
			</li>
		</ul>
	</div>
</main>

<style lang="postcss">
	@reference "./layout.css";

	main {
		@apply space-y-4 p-4;
	}

	ul {
		@apply list-outside list-disc pl-4;
	}

	.group > p:first-child {
		@apply font-bold;
	}

	.u-didattica {
		--u-color: var(--color-didattica);
		@apply underline decoration-didattica;
	}

	.u-architettura {
		--u-color: var(--color-architettura);
		@apply underline decoration-architettura;
	}

	.u-sviluppo {
		--u-color: var(--color-sviluppo);
		@apply underline decoration-sviluppo;
	}

	.u-ui-ux-design {
		--u-color: var(--color-ui-ux-design);
		@apply underline decoration-ui-ux-design;
	}

	.u-graphic-design {
		--u-color: var(--color-graphic-design);
		@apply underline decoration-graphic-design;
	}
</style>
