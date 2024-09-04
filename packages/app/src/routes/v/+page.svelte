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

	import ExplorerLinks from '$lib/ExplorerLinks.svelte';

	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
	import { height } from '$lib/store.js';
	import { CashAddressNetworkPrefix } from '@bitauth/libauth';

	let couponAddress: string;
	let vaultAddress: string;
	let vaultPlainAddress: string;

	let provider: ElectrumNetworkProvider;

	let coupons: Utxo[];
	let threads: Utxo[];
	let walletThreads: Utxo[];

	let openCouponInterest: number;
	let couponTotal: number;
	let swapAmount = 0;

	let errorMessage = '';

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

	const handlePlacement = async function (coupon: Utxo) {
		let requests = [
			{
				placement: 100000000n,
				coupon: coupon,
				locktime: time
			}
		];

		try {
			await wallet.swap(requests);
			errorMessage = '';
		} catch (e: Error) {
			errorMessage = e;
			toast.push(`Error: ${e}`, {
				classes: ['warn']
			});
		}
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
		vaultPlainAddress = Vault.getAddress(time, CashAddressNetworkPrefix.mainnet, false);

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
					couponTotal = Number(coupons.reduce((acc, utxo) => acc + utxo.satoshis, 0n));
				}
			})
		]);

		vaultBalance = (Number(threads.reduce((acc, utxo) => acc + utxo.satoshis, 0n)) - 7000) / 1e8;
	});
</script>

<svelte:head>
	{#if time > 858000}
		<title>FBCH-{time}</title>
		<meta name="description" content="Future Vault Series" />
		<link rel="icon" type="image/svg" href="/FBCH-{time}.svg" />
	{:else}
		<title>FBCH</title>
		<meta name="description" content="Future Vault Series" />
		<link rel="icon" type="image/svg" href="/FBCH.svg" />
	{/if}
</svelte:head>
<div class="text-column">
	{#if time}
		<h1>Vault {time.toLocaleString()}<sub>■</sub></h1>
		<div style="display:flex;">
			<SeriesIcon {time} size="150" />
			<div>
				<ExplorerLinks address={vaultAddress}></ExplorerLinks>
			</div>
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
							<td></td>
							<td>place</td>
							<td>coupon</td>
							<td>rate </td>
							<td>apr* </td>
							<td>claim</td>
						</tr>
						<tr class="units">
							<td></td>
							<td>BCH</td>
							<td>sats</td>
							<td>spb</td>
							<td></td>
							<td> </td>
						</tr>
					</thead>

					<tbody>
						{#each coupons as c}
							<tr>
								<td>C<sub>0</sub></td>
								<td class="r">{Number(1).toFixed(2)}</td>
								<td class="r">{Number(c.satoshis).toLocaleString()} </td>
								<td class="r">{(Number(c.satoshis) / (time - heightValue)).toFixed(1)}</td>
								<td class="r">
									<i
										>{(Number(c.satoshis) / (time - heightValue) / (1e6 / 52596)).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 1,
												minimumFractionDigits: 1
											}
										)}%</i
									>
								</td>
								{#if walletBalance > 1e8}
									<td style="text-align:center;"><button class="action" on:click={() => handlePlacement(c)}>claim</button></td>
								{:else}
									<td style="text-align:center;"><button class="action" disabled>insufficient funds ☹️</button></td>
								{/if}
							</tr>
						{/each}
						<tr style="border-top: solid thin;">
							<td>∑</td>
							<td class="r"><i>{openCouponInterest.toFixed(2)} </i></td>
							<td class="r">
								<i>{couponTotal.toLocaleString()} </i>
							</td>
							<td></td>
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
					<tr class="header">
						<td>category </td>
						<td>BCH </td>
						<td>FBCH-{String(time).padStart(7, '0')} </td>
					</tr>
				</thead>

				<tbody>
					{#each threads as c}
						{#if c.token}
							<tr>
								<td
									><i>{c.token.category.substring(0, 4) + '...' + c.token.category.slice(-2)}</i
									></td
								>
								<td class="r">
									{(Number(c.satoshis) / 1e8).toLocaleString(undefined, {
										minimumFractionDigits: 3
									})}
									<img width="15" src={bch} alt="bchLogo" />
								</td>
								<td class="r"
									><i>
										{#if c.token}
											{(Number(c.token.amount) / 1e8).toLocaleString(undefined, {
												minimumFractionDigits: 3
											})}
										{/if}
									</i>
									<SeriesIcon time={CATEGORY_MAP.get(c.token?.category)} size="15" />
								</td>
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
	.walletHead button {
		border-radius: 30px;
	}
	.cashaddr {
		line-break: anywhere;
	}
	.couponTable {
		width: 100%;
		border-collapse: collapse;
	}
	.header {
		text-align: center;
		font-weight: 900;
	}

	.action {
		display: inline-block;
		border-radius: 10px;
		background-color: #fa1ad5;
		color: #fff;
		margin: 1px;
		padding: 0 10px 0 20px;
		font-weight: 900;
		font-size: small;
	}

	.action:disabled {
		display: inline-block;
		border-radius: 10px;
		background-color: #80748069;
		color: #ffffff;
		margin: 1px;
		padding: 0 10px 0 20px;
		font-weight: 900;
		font-size: small;
	}

	.units {
		text-align: center;
		font-style: italic;
		font-weight: 400;
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
