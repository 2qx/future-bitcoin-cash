<script lang="ts">
	import { onMount } from 'svelte';
	import hot from '$lib/images/hot.svg';
	import bch from '$lib/images/bch.svg';
	import walletIcon from '$lib/images/wallet.svg';
	import { receiptAddress, height } from '$lib/store.js';
	import SeriesIcon from '$lib/images/SeriesIcon.svelte';

	import { copy } from 'svelte-copy';
	import { toast } from '@zerodevx/svelte-toast';
	import { ElectrumCluster, ClusterOrder, ElectrumTransport } from 'electrum-cash';
	import { ElectrumNetworkProvider } from 'cashscript';
	import { IndexedDBProvider } from '@mainnet-cash/indexeddb-storage';
	import { BaseWallet } from 'mainnet-js';
	import { FutureWallet, isTokenAddress } from '@fbch/lib';
	import { CATEGORY_MAP } from '@fbch/lib';

	let receiptAddressValue: string;
	let receiptAddressRaw: string;
	let receiptError = false;
	let walletError = false;
	let showInfo = false;
	let wallet: FutureWallet;
	let walletThreads;
	let balance;
	let provider;
	let heightValue;

	receiptAddress.subscribe((value: any) => {
		console.log(receiptAddressRaw);
		receiptAddressValue = value;
	});

	height.subscribe((value: any) => {
		console.log(heightValue);
		heightValue = value;
	});

	function updateReceiptAddress(newVal: any) {
		console.log(receiptAddressValue);
		receiptAddress.set(newVal);
	}

	async function sendMaxTokens() {
		await wallet.sendMaxFungibleTokens(receiptAddressValue);u
		await updateWallet()
	}
	async function sendMax() {
		await wallet.sendMax(receiptAddressValue);
		await updateWallet();
	}

	async function updateWallet() {
		await Promise.all([
			provider.getUtxos(wallet.getDepositAddress()).then((v) => (walletThreads = v))
		]);
	}

	
	onMount(async () => {
		try {
			let cluster = new ElectrumCluster('@fbch/app', '1.4.3', 1, 1, ClusterOrder.RANDOM, 2000);

			cluster.addServer('bch.imaginary.cash', 50004, ElectrumTransport.WSS.Scheme, false);
			provider = new ElectrumNetworkProvider('mainnet', cluster, false);

			BaseWallet.StorageProvider = IndexedDBProvider;
			wallet = await FutureWallet.named('hot');
			balance = await wallet.getBalance('bch');
			let cancelWatch = wallet.watchBalance(()=>{
				cancelWatch();
				updateWallet();
			})
			await updateWallet();
		} catch (e) {
			walletError = true;
			throw e;
		}
	});

	const toggleSeed = () => {
		showInfo = !showInfo;
	};
	const validateReceiptAddress = async () => {
		if (isTokenAddress(receiptAddressRaw)) {
			receiptAddressValue = receiptAddressRaw;
			updateReceiptAddress(receiptAddressValue);
		} else {
			receiptError = true;
		}
	};
</script>

<div class="text-column">
	{#if !receiptAddressValue}
		<p>
			This FBCH app uses a <b>temporary</b> hot web wallet to swap Future tokens and BCH.
		</p>
		<p>
			Please enter an external wallet address where your tokens and BCH change will be sent for long
			term storage:
		</p>
		{#if receiptError}
			<b
				>Your long-term address must be a valid <i>CashToken</i> Bitcoin Cash (BCH) cash address―like
				"bitcoincash:zq ..."</b
			>
		{/if}
		<div style="display:flex;">
			<img src={walletIcon} alt="wallet" />
			<textarea
				id="addr"
				rows="3"
				style="line-break:anywhere;"
				bind:value={receiptAddressRaw}
				on:change={validateReceiptAddress}
				placeholder="bitcoincash:zq... ..."
			/>
		</div>
		<div>
			<p>
				If you do not have a <a target="_blank" href="https://cashtokens.org">CashToken</a> wallet, select
				one below:
			</p>
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
		</div>
	{:else if wallet}
		<h4>FBCH hot wallet</h4>
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
			<img width="52" src={hot} slot="icon" />
		</qr-code>
		<div
			use:copy={wallet.getTokenDepositAddress()}
			on:svelte-copy={(event) => toast.push('OK 📋🗸: ' + event.detail)}
			on:svelte-copy:error={(event) =>
				toast.push(`Error, no access to clipboard?: ${event.detail.message}`, {
					classes: ['warn']
				})}
		>
			<div style="display:flex;">
				<img width="52px" src={hot} alt="hot wallet" />
				<div>
					<button class="styled">
						{wallet.getTokenDepositAddress()}
					</button>
				</div>
			</div>
		</div>
		<div>
			<p>This is your FBCH hot wallet deposit address.</p>
			<p>Send money here to swap futures, then sweep assets back to your wallet.</p>
		</div>

		<div on:click={toggleSeed}>Show/hide backup</div>
		{#if showInfo}
			<div
				use:copy={wallet.toDbString()}
				on:svelte-copy={(event) => toast.push('OK - backup copied')}
				on:svelte-copy:error={(event) =>
					toast.push(`Error, no access to clipboard?: ${event.detail.message}`, {
						classes: ['warn']
					})}
			>
				{wallet.toDbString()}
			</div>
		{/if}

		{#if walletThreads}
			{#if walletThreads.length > 0}
				<div class="walletHead">
					<img width="15" src={hot} alt="hotWallet" />
					<button on:click={() => wallet.preparePlacementOutpoints()}> Shape</button>
					<button on:click={() => sendMaxTokens()}> Sweep FBCH</button>
					<button on:click={() => wallet.sendMax(receiptAddressValue)}> Sweep BCH</button>
				</div>

				<table class="wallet">
					<thead>
						<tr class="header">
							<td>BCH </td>
							<td>FBCH</td>
							<td>Series</td>
							<td>action</td>
						</tr>
					</thead>

					<tbody>
						{#each walletThreads as c, i (i)}
							<tr>
								<td class="r">
									{#if Number(c.satoshis) > 800}
										{(Number(c.satoshis) / 100000000).toLocaleString(undefined, {
											minimumFractionDigits: 3
										})}
										<img width="15" src={bch} alt="bchLogo" />
									{/if}
								</td>
								<td class="r">
									<i>
										{#if c.token}
											{(Number(c.token.amount) / 100000000).toLocaleString(undefined, {
												minimumFractionDigits: 3
											})}
											<SeriesIcon time={CATEGORY_MAP.get(c.token?.category)} size="15" />
										{/if}
									</i>
								</td>
								<td class="r">
									{#if c.token}
										{#if CATEGORY_MAP.has(c.token.category)}
											<a href="/v?block={CATEGORY_MAP.get(c.token?.category)}">
												{String(CATEGORY_MAP.get(c.token?.category)).padStart(7, '0')}
											</a>
										{/if}
									{/if}
								</td>

								<td style="width:30px; text-align:center;">
									{#if CATEGORY_MAP.get(c.token?.category) < Number(heightValue)}
										<button
											on:click={() =>
												wallet.swap({ future: c, locktime: CATEGORY_MAP.get(c.token?.category) })}
											>redeem</button
										>
									{:else}
										-
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
	{/if}
</div>

<style>
	ul {
		list-style: none;
	}
	textarea {
		width: 90%;
		border-radius: 10px;
		background: #f4ffee;
		border-width: 5px;
		font-weight: 500;
	}

	.styled {
		border-color: #000;
		font-size: 1rem;
		line-break: anywhere;
		text-align: center;
		color: #000;
		border-radius: 10px;
		background-color: #ffe2ff;
		font-weight: 700;
		padding: 5px;
		box-shadow:
			inset 2px 2px 3px rgba(255, 255, 255, 0.6),
			inset -2px -2px 3px rgba(0, 0, 0, 0.6);
	}

	.styled:hover {
		background-color: rgb(238, 54, 255);
	}

	.styled:active {
		box-shadow:
			inset -2px -2px 3px rgba(255, 255, 255, 0.6),
			inset 2px 2px 3px rgba(0, 0, 0, 0.6);
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
		vertical-align: middle;
	}
</style>
