<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { copy } from 'svelte-copy';
	import { toast } from '@zerodevx/svelte-toast';


	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { BaseWallet } from 'mainnet-js';
	import { ElectrumNetworkProvider } from 'cashscript';
	import { ElectrumCluster, ClusterOrder, ElectrumTransport } from 'electrum-cash';
	import { type Utxo } from 'cashscript';

	import { getFutureBlockDate, Vault } from '@fbch/lib';
	import { CATEGORY_MAP } from '@fbch/lib';
	import { FutureWallet } from '@fbch/lib';


	import hot from '$lib/images/hot.svg';
	import bch from '$lib/images/bch.svg';

	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
	import { height } from '$lib/store.js';

	let couponAddress: string;
	let vaultAddress: string;

	let provider: ElectrumNetworkProvider;

	let coupons: Utxo[];
	let threads: Utxo[];
	let walletThreads: Utxo[];

	let openCouponInterest: number;
	let couponTotal: number;
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

		let cluster = new ElectrumCluster('@fbch/app', '1.4.3', 1, 1, ClusterOrder.RANDOM, 2000);
		cluster.addServer('bch.imaginary.cash', 50004, ElectrumTransport.WSS.Scheme, false);
		provider = new ElectrumNetworkProvider('mainnet', cluster, false);
		await Promise.all([
			provider.getUtxos(vaultAddress).then((v) => (threads = v)),
			provider.getUtxos(wallet.getDepositAddress()).then((v) => (walletThreads = v)),
			provider.getUtxos(couponAddress).then((v) => {
				coupons = v;
				if (coupons.length > 0) {
					coupons.sort((a, b) => parseFloat(b.satoshis) - parseFloat(a.satoshis));
					openCouponInterest = coupons.length;
					couponTotal = (Number(coupons.reduce((acc, utxo) => acc + utxo.satoshis, 0n))) / 1e8;
				}
			})
		]);

		
		vaultBalance = (Number(threads.reduce((acc, utxo) => acc + utxo.satoshis, 0n)) - 7000) / 1e8;
	});
</script>

<svelte:head>
	<title>FBCH-{time}</title>
	<meta name="description" content="Future Vault Series" />
	{#if time > 858000}
		<link rel="icon" type="image/svg" href="/FBCH-{time}.svg" />
	{/if}
</svelte:head>
<div class="text-column">
	{#if time}
		<h1>Vault {time.toLocaleString()}<sub>■</sub></h1>
		<div>
			<SeriesIcon {time} size="150" />
		</div>


		{#if heightValue}
			{#if time - heightValue > 0}
				<h2>T&#8196; -{(time - heightValue).toLocaleString()}<sub>■</sub></h2>
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
			<p><b>C<sub>0</sub></b>:{couponAddress}</p>
		</div>
		{#if coupons}
			{#if coupons.length > 0}
				<table class="couponTable">
					<thead>
						<tr class="header">
							<td>Series</td>
							<td>Placement </td>
							<td>Coupon (sats)</td>
							<td>spb </td>
							<td>apr* </td>
						</tr>
					</thead>

					<tbody>
						{#each coupons as c}
							<tr>
								<td>C<sub>0</sub></td>
								<td class="r">1 BCH</td>
								<td class="r">{Number(c.satoshis).toLocaleString()} </td>
								<td class="r">{(Number(c.satoshis) / (time - heightValue)).toFixed(1)}</td>
								<td class="r"
									><i>{(Number(c.satoshis) / (time - heightValue) / (1e6 / 52596)).toFixed(2)}%</i
									></td
								>
							</tr>
						{/each}
						<tr>
							<td><i>Total</i></td>
							<td class="r"><i>{openCouponInterest} BCH </i></td>
							<td class="r"><i>{couponTotal.toFixed(5)} BCH </i></td>
							<td></td>
							<td></td>
						</tr>
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
						<td>FBCH-{String(time).padStart(7, '0')} </td>
					</tr>
				</thead>

				<tbody>
					{#each threads as c}
						{#if c.token}
							<tr>
								<td
									><i>{c.token.category.substring(0, 6) + '...' + c.token.category.slice(-6)}</i
									></td
								>
								<td class="r">
									{(Number(c.satoshis) / 1000000000).toLocaleString(undefined, {minimumFractionDigits: 3})} 
									<img width="15" src={bch} alt="bchLogo" />
								</td>
								<td class="r"
									><i>
										{#if c.token}
											{(Number(c.token.amount) / 100000000).toLocaleString(undefined, {minimumFractionDigits: 3})}
										{/if}
									</i>
									<SeriesIcon time={CATEGORY_MAP.get(c.token?.category)} size="15" />
									</td
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

	.walletHead {
		display: flex;
		justify-content: space-between;
	}
	.walletHead button{
		border-radius: 30px;
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
	tbody tr:nth-child(even) {
		background-color: #e495e41a;
	}
	.r {
		text-align: right;
	}
	tbody tr td {
	}

</style>
