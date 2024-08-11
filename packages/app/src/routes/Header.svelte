<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
	import  SeriesIcon from "$lib/images/SeriesIcon.svelte"
	import { height } from '$lib/store.js';
	import { ElectrumClient, ElectrumTransport } from 'electrum-cash';

	let heightValue: number;

	height.subscribe((value: any) => {
		heightValue = value;
	});

	function updateHeight(newHeight: any) {
		console.log(heightValue);
		height.set(newHeight);
	}

	// Set up a callback function to handle new blocks.
	const handleBlockNotifications = function (data: any) {
		console.log(data);
		if (data.height && data.height > 1) updateHeight(data.height);
	};

	onMount(async () => {
		// Initialize an electrum client.
		const electrum = new ElectrumClient(
			'FBCH',
			'1.4.1',
			'bch.imaginary.cash',
			ElectrumTransport.WSS.Port,
			ElectrumTransport.WSS.Scheme
		);

		// Wait for the client to connect
		await electrum.connect();
		// Listen for notifications.
		//electrum.on('blockchain.headers.subscribe', handleNotifications);
		await electrum.subscribe(handleBlockNotifications, 'blockchain.headers.subscribe');
	});
</script>

<header>
	<div class="corner">
		<a href="https://futurebitcoin.cash">
			{#if heightValue}
			<SeriesIcon time={heightValue} size=30/>
			{/if}
		</a>
	</div>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li style="font-weight: 900;" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a style="font-size: larger" href="/"><b>&#9432</b></a>
			</li>
			<li aria-current={$page.url.pathname === '/earn' ? 'page' : undefined}>
				<a href="/earn">Earn</a>
			</li>
			<li aria-current={$page.url.pathname === '/make' ? 'page' : undefined}>
				<a href="/make">Make</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div class="status">
		{#if heightValue}
			{heightValue.toLocaleString()} &nbsp;&nbsp; █
		{/if}
	</div>
	<div class="corner">
		<a href="https://github.com/2qx/future-bitcoin-cash">
			<img src={github} alt="Source Code" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.status {
		display: flex;
		justify-content: center;
		font-weight: 900;
		font-size: small;
		margin: auto;
		color: rgba(255, 255, 255, 0.7);
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		margin: auto;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
