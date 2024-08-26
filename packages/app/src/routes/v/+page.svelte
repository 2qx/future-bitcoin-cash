<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { copy } from 'svelte-copy';
	import { toast } from '@zerodevx/svelte-toast';

	import { getFutureBlockDate, Vault } from '@fbch/lib';
	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { BaseWallet } from 'mainnet-js';
	import { FutureWallet } from '@fbch/lib';
	import { ElectrumNetworkProvider } from 'cashscript';
	import { type Utxo } from 'cashscript';

	import hot from '$lib/images/hot.svg';
	import { CATEGORY_MAP } from '$lib/catMap';
	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
	import { height } from '$lib/store.js';

	let couponAddress: string;
	let vaultAddress: string;

	let provider: ElectrumNetworkProvider;

	let coupons: Utxo[];
	let threads: Utxo[];
	let walletThreads: Utxo[];

	let swapAmount = 0;

	let block;

	let time: number;
	let vaultBalance: number;

	let heightValue: number;

	let wallet: FutureWallet;
	let walletBalance: number;
	let walletError;

	height.subscribe((value: any) => {
		heightValue = value;
	});

	const handlePlacement = async function (amount: number) {
		let requests = [
			{
				placement: Number(amount),
				locktime: time
			}
		];

		console.log(requests);
		let stub = walletThreads.pop()!;

		let state = {
			chain: [],
			provider: provider,
			vault: threads[0]!,
			requests: requests,
			wallet: walletThreads,
			walletStub: stub
		};

		await wallet.place(state);
	};

	onMount(async () => {
		try {
			BaseWallet.StorageProvider = IndexedDBProvider;
			wallet = await FutureWallet.named('hot');
			walletBalance = (await wallet.getBalance('sats')) as number;
		} catch (e) {
			walletError = true;
			throw e;
		}
		block = $page.url.searchParams.get('block') || undefined;
		time = Number(block);
		couponAddress = Vault.getCoupon(1e8, time);
		vaultAddress = Vault.getAddress(time);

		provider = new ElectrumNetworkProvider();

		threads = await provider.getUtxos(vaultAddress);
		walletThreads = await provider.getUtxos(wallet.getDepositAddress());
		vaultBalance = (Number(threads.reduce((acc, utxo) => acc + utxo.satoshis, 0n)) - 7000) / 1e8;
		coupons = await provider.getUtxos(couponAddress);
		// @ts-ignore
		if (coupons.length > 0) coupons.sort((a, b) => parseFloat(b.satoshis) - parseFloat(a.satoshis));
	});
</script>

<svelte:head>
	<title>FBCH-{time}</title>
	<meta name="description" content="Future Vault Series" />
	{#if time > 857000}
		<link rel="icon" type="image/svg" href="/FBCH-{time}.svg" />
	{/if}
</svelte:head>
<div class="text-column">
{#if time}
	<h1>Vault {time.toLocaleString()}</h1>
	<div>
		<SeriesIcon {time} size="150" />
	</div>

	{#if walletThreads}
		{#if walletThreads.length > 0}
			<img width="52" src={hot} />
			<button on:click={() => wallet.preparePlacementOutpoints()}> Shape</button>
			<table class="wallet">
				<thead>
					<tr class="header">
						<td></td>

						<td>BCH </td>
						<td>FBCH</td>
						<td></td>
						<td>Series </td>
					</tr>
				</thead>

				<tbody>
					{#each walletThreads as c, i (i)}
						<tr>
							<td style="width=50px;">
								{#if Number(c.satoshis) > 800 && Math.log10(Number(c.satoshis - 800n)) >= 6}
									<button on:click={() => handlePlacement(Number(c.satoshis) - 800)}>place</button>
								{:else}
									-
								{/if}
							</td>
							<td class="r">
								{#if Number(c.satoshis) > 800}
									{(Number(c.satoshis) / 1000000000).toFixed(10)}
								{/if}
							</td>
							<td class="r">
								<i>
									{#if c.token}
										{(Number(c.token.amount) / 100000000).toLocaleString()}
									{/if}
								</i>
							</td>
							<td class="r">
								{#if c.token}
									{#if CATEGORY_MAP.has(c.token.category)}
										<SeriesIcon time={CATEGORY_MAP.get(c.token?.category)} size="30" />
									{/if}
								{/if}
							</td>
							<td class="r">
								{#if c.token}
									{#if CATEGORY_MAP.has(c.token.category)}
										{'FBCH-' + String(CATEGORY_MAP.get(c.token?.category)).padStart(7, '0')}
									{/if}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>no wallet utxos available</p>
		{/if}
	{:else}
		<p>loading wallet...</p>
	{/if}

	{#if heightValue}
		{#if time - heightValue > 0}
			<h2>T&#8196; -{(time - heightValue).toLocaleString()}&#8196;■</h2>
		{/if}
		<h3>
			{#if time - heightValue >= 2000}
				Unlocks around
				{getFutureBlockDate(heightValue, time).toLocaleDateString()}
			{:else if time - heightValue >= 0}
				Unlocks around
				{getFutureBlockDate(heightValue, time).toLocaleDateString()}
				{getFutureBlockDate(heightValue, time).toLocaleTimeString()}
			{:else if time - heightValue < 0}
				Redemptions are open
			{:else}
				-
			{/if}
		</h3>
	{/if}

	<h4>Coupons</h4>
	<div
	class="cashaddr"
		use:copy={couponAddress}
		on:svelte-copy={(event) => toast.push('Coupon Addr 📋🗸: ' + event.detail)}
		on:svelte-copy:error={(event) =>
			toast.push(`Error, no access to clipboard?: ${event.detail.message}`, {
				classes: ['warn']
			})}
	>
		<p>{couponAddress}</p>
	</div>
	{#if coupons}
		{#if coupons.length > 0}
			<table class="couponTable">
				<thead>
					<tr class="header">
						<td>Series</td>
						<td>Placement </td>
						<td>Coupon </td>
						<td>spb </td>
						<td>apr* </td>
					</tr>
				</thead>

				<tbody>
					{#each coupons as c}
						<tr>
							<td>C<sub>0</sub></td>
							<td>1 BCH</td>
							<td class="r">{Number(c.satoshis).toLocaleString()} </td>
							<td class="r">{(Number(c.satoshis) / (time - heightValue)).toFixed(1)}</td>
							<td class="r"
								><i>{(Number(c.satoshis) / (time - heightValue) / (1e6 / 52596)).toFixed(2)}%</i
								></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>no coupons available</p>
		{/if}
	{:else}
		<p>loading coupons...</p>
	{/if}
	<h4>Vault Threads</h4>

	{#if threads && threads.length}
		<table class="couponTable">
			<thead>
				<tr>
					<td>Token Id </td>
					<td>BCH </td>
					<td>FBCH-{time} </td>
				</tr>
			</thead>

			<tbody>
				{#each threads as c}
					{#if c.token}
						<tr>
							<td><i>{c.token.category.substring(0, 8) + '...' + c.token.category.slice(-8)}</i></td
							>
							<td class="r">{(Number(c.satoshis) / 1000000000).toFixed(3)} </td>
							<td class="r"
								><i>
									{#if c.token}
										{(Number(c.token.amount) / 100000000).toLocaleString()}
									{/if}
								</i></td
							>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	{:else}
		<p>loading threads...</p>
	{/if}
{:else}
	<p>loading...</p>
{/if}
</div>
<style>
	p {
		text-overflow: ellipsis;
	}

	.cashaddr {
		line-break: anywhere;
	}
	.couponTable {
		width: 100%;
	}
	thead tr {
		text-align: center;
		font-weight: 900;
	}
	tbody tr:nth-child(odd) {
		background-color: #ff33cc1f;
	}

	.r {
		text-align: right;
	}
	tbody tr td {
	}
	tbody tr:nth-child(even) {
		background-color: #e495e41a;
	}
</style>
