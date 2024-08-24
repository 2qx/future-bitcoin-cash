<script lang="ts">
	import { onMount } from 'svelte';
	import hot from '$lib/images/hot.svg';
	import { height } from '$lib/store.js';
	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { FutureWallet } from '@fbch/lib';
	import { BaseWallet } from 'mainnet-js';

	let externalWallet;
	let walletError = false;
	let wallet;
	let balance;
	onMount(async () => {
		try {
			BaseWallet.StorageProvider = IndexedDBProvider;
			wallet = await FutureWallet.named('hot');
			balance = await wallet.getBalance('bch');
		} catch (e) {
			walletError = true;
			throw e;
		}
	});
</script>

<p>
	This FBCH app uses an <b>temporary</b> hot web wallet. It is <b>NOT</b> suitable nor recommended for long term storage of assets.
</p>
<p>
	For long-term storage of assets, please select a <a href="https://cashtokens.org">CashToken</a> enabled
	Bitcoin Cash (BCH) wallet below.
</p>
{#if !externalWallet}

{:else if wallet}
	<qr-code
		id="qr1"
		contents={wallet.getDepositAddress()}
		module-color="#000"
		position-ring-color="#88338A"
		position-center-color="#FF00EA"
		mask-x-to-y-ratio="1.2"
		style="width: 250px;
	height: 250px;
	margin: 1em auto;
	background-color: #fff;"
	>
		<img src={hot} slot="icon" />
	</qr-code>
{/if}
<h3>CashToken Wallets:</h3>
<ul>
	<li>
		Desktop
		<ul>
			<li>
				<a target="_blank" href="https://electroncash.org/">Electron Cash</a>
			</li>
			<li>
				<a target="_blank" href="https://github.com/cashonize/cashonize-quasar/releases"
					>Cashonize Quasar</a
				>
			</li>
		</ul>
	</li>
	<li>
		Web
		<ul>
			<li>
				<a target="_blank" href="https://cashonize.com/">Cashonize</a>
			</li>
			<li>
				<a
					target="_blank"
					href="https://chromewebstore.google.com/detail/paytaca/pakphhpnneopheifihmjcjnbdbhaaiaa"
					>Paytaca Chrome Extension</a
				>
			</li>
		</ul>
	</li>
	<li>
		Mobile
		<ul>
			<li>
				<a target="_blank" href="https://www.paytaca.com/#wallet">Paytaca</a>
			</li>
			<li>
				<a target="_blank" href="https://zapit.io/#/">Zapit</a>
			</li>
		</ul>
	</li>
</ul>

<style>
	ul {
		list-style: none;
	}
</style>
