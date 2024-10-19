<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';

	import { copy } from 'svelte-copy';
	import { toast } from '@zerodevx/svelte-toast';

	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { BaseWallet } from 'mainnet-js';
	import { ElectrumNetworkProvider } from 'cashscript';
	import { ElectrumClient, ElectrumTransport as Transport } from '@electrum-cash/network';
	import { type Utxo } from 'cashscript';

	import { getFutureBlockDate, Vault } from '@fbch/lib';
	import { CATEGORY_MAP, TIMELOCK_MAP, COUPON_SERIES } from '@fbch/lib';
	import { FutureWallet } from '@fbch/lib';

	import bch from '$lib/images/bch.svg';

	import ExplorerLinks from '$lib/ExplorerLinks.svelte';

	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
	import { height } from '$lib/store.js';
	import { CashAddressNetworkPrefix } from '@bitauth/libauth';

	let couponAddress: string;
	let vaultAddress: string;
	let vaultPlainAddress: string;

	let couponState: string;
	let vaultState: string;
	let walletState: string;

	let provider: ElectrumNetworkProvider;
	let electrum: ElectrumClient;

	let coupons: any[];
	let requests: any[] = [];

	let threads: Utxo[];
	let walletThreads: Utxo[];

	let openCouponInterest: number;
	let couponTotal: number;
	let swapAmount = 0;

	let errorMessage = '';

	let block;

	let time: number;

	let heightValue: number;

	let wallet: FutureWallet;
	let walletBalance: number;
	let walletError;

	height.subscribe((value: any) => {
		heightValue = value;
	});

	const updateVault = async function (provider: any) {
		await provider.getUtxos(vaultAddress).then((v: any) => (threads = v));
	};
	const updateWallet = async function (provider: any) {
		await provider.getUtxos(wallet.getDepositAddress()).then((v: any) => (walletThreads = v));
	};
	const updateCoupons = async function () {
		console.log('time:', time);
		coupons = await Vault.getAllCouponUtxos(electrum, heightValue, [time]);
		if (coupons.length > 0) {
			coupons.sort((a: any, b: any) => parseFloat(b.utxo.satoshis) - parseFloat(a.utxo.satoshis));
			openCouponInterest = coupons.length;
			couponTotal = Number(coupons.reduce((acc, c) => acc + c.utxo.satoshis, 0n));
		}
	};

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
		console.log(requests);
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

	const handlePlacement = async function (coupon: any, id: string) {
		walletBalance -= coupon.placement;
		requests.push({
			placement: BigInt(coupon.placement),
			coupon: coupon.utxo,
			locktime: coupon.locktime
		});
		console.log(requests);
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
		block = $page.url.searchParams.get('block') || undefined;
		time = Number(block);
		couponAddress = Vault.getCoupon(1e8, time);
		vaultAddress = Vault.getAddress(time);
		vaultPlainAddress = Vault.getAddress(time, CashAddressNetworkPrefix.mainnet, false);
		provider = new ElectrumNetworkProvider();
		
		// Initialize an electrum client.
		electrum = new ElectrumClient(
			'FBCH/webapp',
			'1.4.1',
			'bch.imaginary.cash',
			Transport.WSS.Port,
			Transport.WSS.Scheme
		);

		// Wait for the client to connect
		await electrum.connect().then(() => {
			// Listen for notifications.
			updateCoupons();
			updateVault(provider);
		});
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
		<div style="display:flex; flex-direction:column; align-items:flex-end;">
			<h1>Vault {time.toLocaleString()}<sub>■</sub></h1>
			{#if heightValue}
				{#if time - heightValue > 0}
					<h2>T&#8196; -{(time - heightValue).toLocaleString()}<sub>■</sub></h2>
				{/if}
			{/if}
		</div>
		{#if heightValue}
			<p>
				<b>
					{#if time - heightValue >= 2000}
						Unlocking around
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
				</b>
			</p>
		{/if}
		<p>
			Vault locking Bitcoin Cash (BCH) for CashTokens until opening redemptions after block {time.toLocaleString()}―in
			{(time - heightValue).toLocaleString()} blocks.
		</p>
		<div style="display:flex;">
			<SeriesIcon {time} size="75" />
		</div>

		{#if heightValue}{/if}

		<h4>Spot Coupons</h4>
		
		<p>
			Coupons discount placement of <i>P</i> BCH into the vault; limit one coupon per transaction.
		</p>

		{#if coupons}
			{#if coupons.length > 0}
				<table class="couponTable">
					<thead>
						<tr class="header">
							<td></td>
							<td><i>P</i></td>
							<td>coupon</td>
							<td colspan="3">coupon rate </td>

							<td>action</td>
						</tr>
						<tr class="units">
							<td></td>
							<td class="r"><img width="15" src={bch} alt="bchLogo" /></td>
							<td class="r">sats</td>
							<td class="r">spb</td>
							<td>per annum</td>
							<td>to maturity</td>
							<td> </td>
						</tr>
					</thead>

					<tbody>
						{#each coupons as c}
							<tr>
								<td>C<sub>{c.order}</sub></td>
								<td class="r">{Number(c.placement / 1e8)}</td>
								<td class="sats">{Number(c.utxo.satoshis).toLocaleString()} </td>
								<td class="sats">{c.locale.spb}</td>
								<td class="r">
									<i>{c.locale.ypa}%</i>
								</td>
								<td class="r">
									<i>{c.locale.ytm}%</i>
								</td>
								{#if walletBalance + Number(c.utxo.satoshis) > c.placement}
									<td style="text-align:center;"
										><button class="action" on:click={() => handlePlacement(c, c.id)}>claim</button
										></td
									>
								{:else}
									<td style="text-align:center;"
										><button class="action" disabled style="font-size:x-small;">low bal.</button
										></td
									>
								{/if}
							</tr>
						{/each}
						<tr style="border-top: solid thin;">
							<td>∑</td>
							<td class="r"><b>{openCouponInterest.toFixed(0)} </b></td>
							<td class="r">
								<b>{couponTotal.toLocaleString()} </b>
							</td>
							<td></td>
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

		<div style="display:flex;">
			{#each COUPON_SERIES as c}
			<div>
				<pre style="font-size:small">C<sub>{c}</sub></pre>
				<ExplorerLinks address={Vault.getCoupon(Math.pow(10, c) * 1e8, time)}></ExplorerLinks><br />

			</div>
				
			{/each}
		</div>

		<h4>Vault Threads</h4>
		<div style="display:flex">
			<ExplorerLinks address={vaultAddress}></ExplorerLinks>
		</div>
		<p>
			Seven (7) unspent transaction outputs control swapping of coins and tokens on a 1:1 basis with
			the vault unlocking script.
		</p>
		<p class="cashaddr">
			Category/pre-genesis: <a
				target="_blank"
				href="https://explorer.electroncash.de/tx/{TIMELOCK_MAP.get(time)}"
			>
				{TIMELOCK_MAP.get(time)}</a
			>
		</p>

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
									{(Number(c.satoshis) / 1e8).toLocaleString(undefined, {})}
									<img width="15" src={bch} alt="bchLogo" />
								</td>
								<td class="r"
									><i>
										{#if c.token}
											{(Number(c.token.amount) / 1e8).toLocaleString(undefined, {})}
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
		<hr />
		<p style="font-size:small">
			<i>sats (satoshis)</i>: one 100,000,000<sup>th</sup> of a whole coin.<br />
			<i>spb</i>: rate in sats per coin per block of time remaining to maturation.<br />
			<i>coupon rate per annum</i>: effective non-compounding rate of annual return.
		</p>
	{:else}
		<p>loading...</p>
	{/if}
</div>

<style>
	h1 {
		margin: 2px;
	}
	h2 {
		margin: 2px;
	}
	p {
		text-overflow: ellipsis;
		margin: 2px;
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
