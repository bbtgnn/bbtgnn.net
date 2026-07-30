<script lang="ts">
	import ActionMini from '$lib/components/action-mini.svelte';
	import ContentSheet from '$lib/components/content-sheet.svelte';
	import LinkMini from '$lib/components/link-mini.svelte';
	import { getContentSheets } from '$lib/content';
	import * as m from '$lib/paraglide/messages';

	const sheets = $derived(getContentSheets());
</script>

<main class="mx-auto max-w-7xl">
	<div class="group">
		<p>{m.home_greeting()}</p>
		<p>{m.home_intro()}</p>
	</div>

	<div class="group">
		<p>{m.home_skills_heading()}</p>
		<ul class="skills">
			<li class="u-didattica">{m.home_skill_teaching()}</li>
			<li class="u-architettura">{m.home_skill_info_arch()}</li>
			<li class="u-sviluppo">{m.home_skill_web_dev()}</li>
			<li class="u-ui-ux-design">{m.home_skill_uiux()}</li>
			<li class="u-graphic-design">{m.home_skill_graphic()}</li>
		</ul>
	</div>

	<div class="group">
		<p>{m.home_work_heading()}</p>
		<ul class="space-y-2">
			<li>
				<p>
					<LinkMini href="https://www.abaperugia.com/author/abbatepaologiovanni/">
						{m.home_aba_name()}
					</LinkMini>
				</p>
				<ul class="font-light">
					<li>
						<span class="u-didattica">{m.home_aba_teach()}</span>
						<span class="u-sviluppo">{m.home_aba_creative_coding()}</span>
						<ContentSheet sheet={sheets.abaPerugia}>
							{#snippet trigger({ props })}
								<ActionMini {...props} aria-label={m.home_aria_aba_sheet()} />
							{/snippet}
						</ContentSheet>
					</li>
					<li>
						<span class="u-graphic-design">{m.home_aba_visualize()}</span>
						<span class="u-architettura">{m.home_aba_concepts()}</span>
						<ContentSheet sheet={sheets.conceptsUni}>
							{#snippet trigger({ props })}
								<ActionMini {...props} aria-label={m.home_aria_concepts_sheet()} />
							{/snippet}
						</ContentSheet>
					</li>
				</ul>
			</li>
			<li>
				<p>{m.home_dyne_org()}</p>
				<ul class="font-light">
					<li>
						<span class="u-ui-ux-design">{m.home_dyne_design()}</span>
						{m.home_dyne_and()}
						<span class="u-sviluppo">{m.home_dyne_develop()}</span>
						<LinkMini href="https://credimi.io/">Credimi</LinkMini>
						{m.home_dyne_and_between_products()}
						<LinkMini href="https://attesta.apps.forkbomb.eu/">Attesta</LinkMini>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	<div class="group">
		<p>{m.home_freelance_heading()}</p>
		<ul>
			<li>
				<span class="u-didattica">{m.home_freelance_teach()}</span>
				<span class="u-sviluppo">{m.home_freelance_programming()}</span>
				{m.home_freelance_workshops_rest()}
				<ContentSheet sheet={sheets.workshops}>
					{#snippet trigger({ props })}
						<ActionMini {...props} aria-label={m.home_aria_workshops_sheet()} />
					{/snippet}
				</ContentSheet>
			</li>
			<li>
				{m.home_freelance_designed_prefix()}
				<span class="u-ui-ux-design">{m.home_freelance_designed()}</span>
				{m.home_freelance_a()}
				<span class="u-architettura">{m.home_freelance_dashboard()}</span>
				<ContentSheet sheet={sheets.restor}>
					{#snippet trigger({ props })}
						<ActionMini {...props} aria-label={m.home_aria_restor_sheet()} />
					{/snippet}
				</ContentSheet>
				{m.home_freelance_for()}
				<LinkMini href="https://restor.eco/">{m.home_freelance_restor_org()}</LinkMini>
			</li>
		</ul>
	</div>

	<div class="group">
		<p>{m.home_more_heading()}</p>
		<ul>
			<li>
				<LinkMini
					href="https://giovanniabbatepaolo.notion.site/458ab8fdff2742bd817fdd6ac820e188?v=cda461a173de48e9b30d487b7f741fd2"
				>
					{m.home_more_portfolio()}
					<span class="u-graphic-design">{m.home_more_creative()}</span>
					<span class="u-sviluppo">{m.home_more_coding()}</span>
				</LinkMini>
			</li>
			<li>
				<LinkMini href="https://www.instagram.com/bbt.gnn/">{m.home_more_instagram()}</LinkMini>
			</li>
			<li>
				<LinkMini href="mailto:giovanniabb@gmail.com">{m.home_more_email()}</LinkMini>
			</li>
			<li>
				<LinkMini href="/curriculum-vitae.pdf">{m.home_more_cv()}</LinkMini>
			</li>
		</ul>
	</div>
</main>

<style lang="postcss">
	@reference "./layout.css";

	main {
		@apply space-y-6 gutter-x py-8;
	}

	ul {
		@apply list-outside list-disc pl-4 marker:text-stone-300;
	}

	.group > p:first-child {
		@apply mb-1 font-bold;
	}

	.u-didattica {
		@apply underline decoration-didattica decoration-wavy decoration-2 underline-offset-2;
	}

	.u-architettura {
		@apply underline decoration-architettura decoration-dotted decoration-2 underline-offset-2;
	}

	.u-sviluppo {
		@apply underline decoration-sviluppo decoration-dashed decoration-2 underline-offset-2;
	}

	.u-ui-ux-design {
		text-decoration: overline;
		@apply underline decoration-ui-ux-design decoration-2 underline-offset-2;
	}

	.u-graphic-design {
		@apply underline decoration-graphic-design decoration-2 underline-offset-2;
	}
</style>
