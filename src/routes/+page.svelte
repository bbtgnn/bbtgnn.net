<script lang="ts">
	import LinkMini from '$lib/components/link-mini.svelte';
</script>

<main>
	<div class="group">
		<p>Ciao! 👋</p>
		<p>Sono Giovanni Abbatepaolo 🌲</p>
	</div>

	<div class="group">
		<p>Mi occupo di</p>
		<ul class="skills">
			<li class="underline decoration-didattica">📚 Didattica</li>
			<li class="underline decoration-architettura">🏗️ Architettura dell'informazione</li>
			<li class="underline decoration-sviluppo">👨‍💻 Sviluppo web</li>
			<li class="underline decoration-ui-ux-design">🪢 UI/UX design</li>
			<li class="underline decoration-graphic-design">🎨 Graphic design</li>
		</ul>
	</div>

	<div class="group">
		<p>Dove lavoro</p>
		<ul>
			<li>
				<p>
					Accademia di Belle Arti di Perugia
					<LinkMini href="https://www.abaperugia.com/author/abbatepaologiovanni/" />
				</p>
			</li>
		</ul>
	</div>
</main>

<style lang="postcss">
	@reference "./layout.css";

	main {
		@apply space-y-4 font-mono;
	}

	.group p:first-child {
		@apply font-bold;
	}

	.underline {
		@apply underline-offset-2;
		text-decoration-thickness: 0.25rem;
	}
</style>
