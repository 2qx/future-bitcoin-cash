<script>
	import Header from './Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import './styles.css';
	import github from '$lib/images/github.svg';
	import conduct from '$lib/images/conduct.svg';
</script>

<div class="app">
	<Header />
	<SvelteToast />
	<main>
		<slot />
	</main>

	<footer>
		<p>
			<a href="/audit">audit</a>
			■
			<a href="/code">
				code of conduct
			</a>
			■

			<a href="/contracts">contracts</a>
			■
			<a href="/flipstarter">flipstarter</a>
			■
			<a target="_blank" href="https://github.com/2qx/future-bitcoin-cash">
				source
				<img width="20px" src={github} alt="GitHub" />
			</a>
		</p>
		<p>
			<a href="/chip/vm-limits">Future Bitcoin Cash supports CHIP-2021-05 VM Limits (Targeted Virtual Machine Limits) for the May 2025 BCH Upgrade.</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
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

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
