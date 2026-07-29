<script lang="ts">
	import LinkMini from '$lib/components/link-mini.svelte';
</script>

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
					</li>
					<li>
						<span class="u-graphic-design">Visualizzo</span>
						<span class="u-architettura">concetti</span>
					</li>
				</ul>
			</li>
			<li>
				<p>Dyne.org / Forkbomb</p>
				<ul>
					<li>
						<span class="u-ui-ux-design">Progetto</span> e <span class="u-sviluppo">sviluppo</span>
						<LinkMini href="https://credimi.io/">Credimi</LinkMini>
						e <LinkMini href="https://attesta.io/">Attesta</LinkMini>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	<div class="group">
		<p>Da freelance:</p>
		<ul>
			<li>
				<a href="https://x.com/gabbattepaolo">Applico </a>
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
		@apply space-y-4 p-4 font-mono;
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

	li[class*='u-'] {
		list-style: none;
		position: relative;
	}

	li[class*='u-']::before {
		content: '';
		position: absolute;
		left: -0.875rem;
		top: 0.55em;
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 9999px;
		background-color: var(--u-color);
	}
</style>
