<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import hot from '$lib/images/hot.svg';
	import { height } from '$lib/store.js';
	import { ElectrumClient, ElectrumTransport } from '@electrum-cash/network';
	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { FutureWallet } from '@fbch/lib';
	import { BaseWallet } from 'mainnet-js';

	let heightValue: number;
	let walletError = false;
	let wallet;
	let balance;

	height.subscribe((value: any) => {
		console.log(heightValue);
		heightValue = value;
	});

	function updateHeight(newHeight: any) {
		console.log(heightValue);
		height.set(newHeight);
	}

	// Set up a callback function to handle new blocks.
	const handleNotifications = function (data: any) {
		if (data.method === 'blockchain.headers.subscribe') {
			let d = data.params[0];
			if (d.height && d.height > 1) updateHeight(d.height);
		}
	};

	onMount(async () => {
		try {
			BaseWallet.StorageProvider = IndexedDBProvider;
			wallet = await FutureWallet.named('hot');
			balance = await wallet.getBalance('bch');
		} catch (e) {
			walletError = true;
			throw e;
		}

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
		electrum.on('notification', handleNotifications);
		await electrum.subscribe('blockchain.headers.subscribe');
	});
</script>

<div class="warn">
	Pre-alpha pre-release. Use at your own risk.<br />
	Bugs and usability issues may result in loss of funds.
</div>

<div class="wallet">
	{#if wallet}
		{#if walletError}
			⚠️
		{/if}
		{#if typeof balance !== 'undefined'}
			{balance} BCH
		{/if}
		
			<a href="/wallet">
				<img width=30 src={hot} alt="wallet" />
			</a>
		
		
		
	{/if}
	
</div>

<header>
	<div class="corner">
		<a href="/">
			<img src="/FBCH.svg" alt="Home" />
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
			<li aria-current={$page.url.pathname === '/vaults' ? 'page' : undefined}>
				<a href="/vaults">Vaults</a>
			</li>
			<li aria-current={$page.url.pathname === '/write' ? 'page' : undefined}>
				<a href="/write">Write</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div class="status">
		{#if heightValue}
			{heightValue.toLocaleString()} &nbsp;■
		{/if}
	</div>
</header>



<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	.wallet {
		position: sticky;
		top: 0px;
		display: flex;
		align-items: center;
		justify-content: right;
		height: 32px;
		padding: 1em;
		background-color: #ffffff88;
	}

	.wallet a{
		padding: 1em;
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
		padding: 0 0.3em;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.warn {
		font-weight: 900;
		font-size: smaller;
		padding: 0.2em;
		background-color: #ffe13e;
	}
</style>
