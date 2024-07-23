<script lang="ts">
	import { onMount } from 'svelte';
	import { getHvifIconHex, getFutureBlockDate, Vault } from '@fbch/lib';
	import { height } from '$lib/store.js';
	import { ElectrumClient, ElectrumTransport } from 'electrum-cash';

	export let data: any;
	let couponAddress: string;
	let vaultAddress: string;

	//@ts-ignore
	let coupons;
	let time: number;
	if (data.time) {
		time = Number(data.time);
		couponAddress = Vault.getCoupon(1e8, time);
		vaultAddress = Vault.getAddress(time);
	}

	let heightValue: number;

	height.subscribe((value: any) => {
		heightValue = value;
	});

	// Set up a callback function to handle new blocks.
	const handleCouponNotifications = function (data: any) {
		console.log('coupon');
		console.log(data);
	};
	// Set up a callback function to handle new blocks.
	const handleVaultNotifications = function (data: any) {
		console.log(data);
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
		await electrum.subscribe(
			handleCouponNotifications,
			'blockchain.address.subscribe',
			couponAddress
		);
		await electrum.subscribe(
			handleVaultNotifications,
			'blockchain.address.subscribe',
			vaultAddress
		);
		const couponResponse = await electrum.request('blockchain.address.listunspent', couponAddress);
		if (couponResponse instanceof Error) throw couponResponse;
		coupons = couponResponse;
		// @ts-ignore
		if (coupons.length > 0) coupons.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
	});
</script>

<svelte:head>
	<title>Vault Series</title>
	<meta name="description" content="Future Vault Series" />
</svelte:head>

<section>
	{#if time}
		<h2>Vault {time.toLocaleString()}</h2>
		<icon-hvif size="300" data={getHvifIconHex(time)} alt="FBCH" />
		{#if heightValue}
			<p>{getFutureBlockDate(heightValue, time).toLocaleDateString()}</p>

			{#if time - heightValue < 2000}
				<p>{getFutureBlockDate(heightValue, time).toLocaleTimeString()}</p>
			{/if}
			{#if time - heightValue > 0}
				<p>T&#8196;-{(time - heightValue).toLocaleString()}&#8196;█</p>
			{/if}
		{/if}

		<h2>Coupons</h2>

		<div class="cashaddr">{couponAddress}</div>
		<p>100M sat placement</p>
		{#if coupons && coupons.length}
			<table class="couponTable">
				<tr class="header">
					<td>sats </td>
					<td>spb </td>
					<td>apr </td>
				</tr>
				{#each coupons as c}
					<tr>
						<td class="r">{c.value.toLocaleString()} </td>
						<td class="r">{(c.value / (time - heightValue)).toFixed(1)}</td>
						<td class="r"><i>{(c.value / (time - heightValue) / (1e6 / 52596)).toFixed(2)}%</i></td>
					</tr>
				{/each}
			</table>
		{/if}
	{/if}
</section>

<style>
	p {
		text-overflow: ellipsis;
	}

	.cashaddr {
		line-break: anywhere;
		font-size: small;
	}

	.header td {
		text-align: right;
		font-style: italic;
	}
	.r {
		text-align: right;
	}
	.couponTable {
		width: 100%;
	}
</style>
