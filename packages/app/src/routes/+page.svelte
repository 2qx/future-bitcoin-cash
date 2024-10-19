<script lang="ts">
	import { onMount } from 'svelte';
	import { height } from '$lib/store.js';
	import { ElectrumClient, ElectrumTransport } from '@electrum-cash/network';
	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { BaseWallet } from 'mainnet-js';
	import { type Utxo } from 'cashscript';

	import { toast } from '@zerodevx/svelte-toast';

	import { Vault } from '@fbch/lib';
	import bch from '$lib/images/bch.svg';
	import { CATEGORY_MAP, TIMELOCK_MAP } from '@fbch/lib';
	import { FutureWallet } from '@fbch/lib';

	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
	let errorMessage = '';

	let heightValue: number;
	let coupons: any[];
	let requests: any[] = [];
	let electrum: ElectrumClient;

	let wallet: FutureWallet;
	let walletBalance: number;
	let walletError;

	height.subscribe((value: any) => {
		console.log(heightValue);
		heightValue = value;
		updateCoupons();
	});

	async function updateCoupons() {
		if (electrum && heightValue > 1000)
			coupons = await Vault.getAllCouponUtxos(electrum, heightValue);
	}

	function debounce(func, timeout = 2000) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	async function doSwaps() {
		console.log('processing que data');
		console.log(requests)
		try {
			await wallet.swap(requests);
			errorMessage = '';
		} catch (e: Error) {
			errorMessage = e;
			toast.push(`Error: ${e}`, {
				classes: ['warn']
			});
		}
		requests = [];
	}

	const processQueue = debounce(() => doSwaps());

	const handlePlacement = async function (coupon: any, id:string) {
		walletBalance -= coupon.placement;
		requests.push({
			placement: BigInt(coupon.placement),
			coupon: coupon.utxo,
			locktime: coupon.locktime
		});
		console.log(requests)
		coupons = coupons.filter((c) => c.id !== id);
		processQueue();
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

		// Initialize an electrum client.
		electrum = new ElectrumClient(
			'FBCH',
			'1.4.1',
			'bch.imaginary.cash',
			ElectrumTransport.WSS.Port,
			ElectrumTransport.WSS.Scheme
		);
		await electrum.connect().then(() => {
			// Listen for notifications.
			updateCoupons();
		});
	});
</script>

<svelte:head>
	<title>Future BCH</title>
	<meta name="description" content="Future Bitcoin Cash" />
	<link rel="icon" type="image/svg" href="/FBCH.svg" />
</svelte:head>

<section>
	<p>
		FBCH are series of fungible tokens, with an incentive market for locking and unlocking Bitcoin
		Cash.
	</p>
	{#if coupons}
		{#if coupons.length > 0}
			<table class="couponTable">
				<thead>
					<tr class="header">
						<td><i>P</i></td>
						<td>locktime</td>
						<td>coupon</td>
						<td colspan="2">coupon rate </td>
						<td>action</td>
					</tr>
					<tr class="units">
						<td>BCH</td>
						<td>series</td>
						<td class="r">sats</td>
						<td class="r">spb</td>
						<td>per annum</td>
						<td> </td>
					</tr>
				</thead>

				<tbody>
					{#each coupons as c (c.id)}
						<tr>
							<td class="r"
								>{Number(c.placement / 1e8)}<img width="15" src={bch} alt="bchLogo" /></td
							>
							<td class="r"
								><a href="/v?block={c.locktime}"
									>{c.locktime.toLocaleString()}<SeriesIcon time={c.locktime} size="15" /></a
								></td
							>
							<td class="sats">{Number(c.utxo.satoshis).toLocaleString()} </td>
							<td class="sats">{c.locale.spb}</td>
							<td class="r">
								<i>{c.locale.ypa}%</i>
							</td>
							{#if walletBalance + Number(c.utxo.satoshis) > c.placement}
								<td style="text-align:center;"
									><button class="action" on:click={() => handlePlacement(c, c.id)}>claim</button
									></td
								>
							{:else}
								<td style="text-align:center;"
									><button class="action" disabled style="font-size:x-small;">low bal.</button></td
								>
							{/if}
						</tr>
					{/each}
					<!-- <tr style="border-top: solid thin;">
							<td>∑</td>
							<td class="r"><b>{openCouponInterest.toFixed(0)} </b></td>
							<td class="r">
								<b>{couponTotal.toLocaleString()} </b>
							</td>
							<td></td>
							<td></td>
							<td></td>
						</tr> -->
				</tbody>
			</table>
		{:else}
			<p>no coupons available</p>
		{/if}
	{:else}
		<p>loading coupons...</p>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.cashaddr {
		line-break: anywhere;
	}
	.couponTable {
		width: 100%;
		border-collapse: collapse;
	}
	thead tr td {
		border: 2px ridge rgba(247, 202, 248, 0.6);
		background-color: #ffffff5b;
	}

	thead tr:nth-child(odd) {
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
		font-weight: 200;
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
	.sats {
		text-align: right;
		font-weight: 300;
		font-style: italic;
	}

	tbody tr td {
		border: 2px ridge rgba(247, 202, 248, 0.6);
	}
</style>
