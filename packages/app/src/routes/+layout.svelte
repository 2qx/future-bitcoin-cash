<script>
	import Header from './Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<SvelteToast />
	<main>
		<slot />
	</main>

	<footer>
		<p class="links">
			<a target="_blank" href="https://t.me/Future_Bitcoin_Cash">telegram</a> ■
			<a href="/savers">savers club</a>
		</p>
		<div class="dev">
			<p>
				<a href="/audit">audit</a> ■
				<a href="/code">code of conduct</a> ■
				<a href="/contracts">contracts</a> ■
				<a href="/flipstarter">initial flipstarter</a> ■
				<a target="_blank" href="https://github.com/2qx/future-bitcoin-cash">source</a> ■
				<a href="/vm-limits">vm limits</a>
			</p>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.links {
		font-weight: 800;
	}

	.dev {
		width: 50%;
		text-align: center;
		font-weight: 200;
		font-weight: normal;
		font-size: small;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 40rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
