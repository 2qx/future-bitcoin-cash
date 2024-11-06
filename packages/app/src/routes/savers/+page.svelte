<script lang="ts">
	import { ElectrumClient, ElectrumTransport as Transport } from '@electrum-cash/network';
	import { onMount, onDestroy } from 'svelte';
	import {
		getAllBalances,
		Vault,
		getUnspentAddresses,
		getUnspentV1Addresses,
		getHodlAddresses
	} from '@fbch/lib';

	import Loading from '$lib/Loading.svelte';
	import ExplorerLinks from '$lib/ExplorerLinks.svelte';

	let electrum;
	let protocols = [];

	onMount(async () => {
		// Initialize an electrum client.
		electrum = new ElectrumClient(
			'FBCH/webapp',
			'1.4.1',
			'bch.imaginary.cash',
			Transport.WSS.Port,
			Transport.WSS.Scheme
		);
		await electrum.connect();

		let unspentAddresses = await getUnspentAddresses();
		let unspentV1Addresses = await getUnspentV1Addresses();
		let hodlAddresses = await getHodlAddresses();

		protocols = [
			{
				name: 'Hodl',
				src: 'https://github.com/mainnet-pat/hodl_ec_plugin/',
				docs: 'https://github.com/mainnet-pat/hodl_ec_plugin/blob/master/README.md',
				app: 'https://github.com/mainnet-pat/hodl_ec_plugin/releases',
				addresses: hodlAddresses,
				description: 'Timelock BCH with an Electron Cash Plugin',
				tlv: NaN
			},
			{
				name: 'Future Bitcoin Cash',
				addresses: Vault.getAllSeries(869000),
				docs: 'https://futurebitcoin.cash/contracts',
				app: 'https://futurebitcoin.cash/',
				src: 'https://gitlab.com/2qx/future-bitcoin-cash/',
				description: 'Tokenized timelocked BCH',
				tlv: NaN
			},
			{
				name: 'Unspent Cash',
				docs: 'https://unspent.cash/help',
				app: 'https://unspent.cash/',
				src: 'https://gitlab.com/2qx/unspent/',
				description: 'Get one percent of a fund monthly in perpetuity.',
				addresses: unspentAddresses,
				tlv: NaN
			},
			{
				name: 'Unspent Phi',
				docs: 'https://unspent.app/documentation',
				app: 'https://unspent.app/',
				src: 'https://gitlab.com/2qx/unspent/',
				description: 'Generic composable contracts with timelocking available.',
				addresses: unspentV1Addresses,
				tlv: NaN
			},
			{
				name: 'Emerald Dao',
				addresses: ['bitcoincash:pr43rx2gwdq6j2dpmrpxldftu7swfn7xvqga6vzmp3'],
				docs: 'https://emerald-dao.cash/',
				app: 'https://emerald-dao.vercel.app/',
				src: 'https://gitlab.com/0353F40E/emerald-dao/-/tree/main',
				description: 'A fixed-term deposit savings vault using NFTs with crowdfunded rewards.',
				tlv: NaN
			},
			{
				name: 'BadgerCoin',
				addresses: ['bitcoincash:pvgcl3xk6nwqlngkk09e7g67x5vxs57jv6v2q4qm4ct5yv4d3ppfgl3tq982v'],
				docs: 'https://badgers.cash/FAQ',
				app: 'https://badgers.cash',
				src: 'https://github.com/SayoshiNakamario/BadgersStake',
				description: 'A proof-of-ownership memecoin paying token rewards for time-locking BCH.',
				tlv: NaN
			},

			{
				name: 'Wrapped Bitcoin Cash',
				addresses: ['bitcoincash:p0ujgnc9jnyurzv99678fgac3fdrq8x3py9rlrg6dlnz96qxrdl02efwc0sf9'],
				docs: 'https://bitcoincashresearch.org/t/wbch-bch-wrapped-as-cash-token/1196',
				app: 'https://wrapped.cash/',
				src: 'https://gitlab.com/dagurval/wrapped-cash',
				description: 'Bitcoin Cash Tokenized 1:1 as fungible CashTokens.',
				tlv: NaN
			}
		];

		protocols.map(async (v, i) => {
			protocols[i].tlv =
				(await getAllBalances(electrum, v.addresses)).reduce((a, b) => a + b, 0) / 1e8;
		});
	});
</script>

<svelte:head>
	<title>Future BCH</title>
	<meta name="description" content="Future Bitcoin Cash" />
	<link rel="icon" type="image/svg" href="/FBCH.svg" />
</svelte:head>

<section>
	<h3>The Bitcoin Cash Savings Club</h3>
	<h4>Decentralized Financial Instruments based on wrapped and time locked BCH</h4>
	{#if protocols.length > 0}
		<table>
			<thead>
				<tr class="header">
					<td></td>
					<td style="font-size:small; font-weight:600">BCH</td>
				</tr>
			</thead>

			{#each protocols as p}
				<tr>
					<td>
						<a style="color:#333333; font-weight:600;" href={p.app} target="_blank">{p.name}</a><br
						/>
						<p style="font-size:small">
							{p.description}
							{#if p.docs}
								<a style="color:#333333;" target="_blank" href={p.docs}>[docs]</a>
							{/if}

							{#if p.src}
								<a style="color:#333333;" target="_blank" href={p.src}>[code]</a>
							{/if}
						</p>
					</td>

					<td style="text-align:right">
						{#if p.tlv}
							{p.tlv.toLocaleString(undefined, { maximumFractionDigits: 1 })}
						{:else}
							<Loading />
						{/if}
						<p style="font-size:small"></p>
					</td>
				</tr>
			{/each}
		</table>
	{:else}
		<p>Getting total amount locked by protocol</p>
		<Loading />
	{/if}
</section>

<style>
	td {
		font-size: large;
	}
</style>
