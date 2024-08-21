<script lang="ts">
	import { onMount } from 'svelte';
	import { getFutureBlockDate, Vault } from '@fbch/lib';
	import  SeriesIcon from "$lib/images/SeriesIcon.svelte"
	import { height } from '$lib/store.js';
	import { ElectrumClient, ElectrumTransport } from '@electrum-cash/network';

	export let data: any;
	let couponAddress: string;
	let vaultAddress: string;
	
	//@ts-ignore
	let coupons;
	//@ts-ignore
	let threads;

	let time: number;
	if (data.block) {
		time = Number(data.block);
		couponAddress = Vault.getCoupon(1e8, time);
		vaultAddress = Vault.getAddress(time);
	}

	let heightValue: number;

	height.subscribe((value: any) => {
		heightValue = value;
	});

	// Set up a callback function to handle new blocks.
	const handleNotifications = function (data: any) {
		console.log("electrum: ", data)
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
		electrum.on('notification', handleNotifications);
		
		await electrum.subscribe(
			'blockchain.address.subscribe',
			couponAddress
		);
		await electrum.subscribe(
			'blockchain.address.subscribe',
			vaultAddress
		);
		const vaultResponse = await electrum.request(
			'blockchain.address.listunspent',
			vaultAddress,
			'tokens_only'
		);
		if (vaultResponse instanceof Error) throw vaultResponse;
		threads = vaultResponse;
		const couponResponse = await electrum.request('blockchain.address.listunspent', couponAddress);
		if (couponResponse instanceof Error) throw couponResponse;
		coupons = couponResponse;
		// @ts-ignore
		if (coupons.length > 0) coupons.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
	});
</script>

<svelte:head>
	<title>FBCH-{time}</title>
	<meta name="description" content="Future Vault Series" />
	{#if time > 857000}
	<link rel="icon" type="image/svg" href="/FBCH-{time}.svg" />
	{/if}
</svelte:head>

<section>
	{#if time}
		<h2>Vault {time.toLocaleString()}</h2>
		<SeriesIcon {time} size=300/>
		<div class="cashaddr">{vaultAddress}</div>
		
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
		{#if coupons}
			{#if coupons.length>0}
			<table class="couponTable">
				<tr class="header">
					<td>series</td>
					<td>placement </td>
					<td>coupon </td>
					<td>spb </td>
					<td>apr </td>
				</tr>
				{#each coupons as c}
					<tr>
						<td class="r">C0</td>
						<td class="r">1 BCH</td>
						<td class="r">{c.value.toLocaleString()} </td>
						<td class="r">{(c.value / (time - heightValue)).toFixed(1)}</td>
						<td class="r"><i>{(c.value / (time - heightValue) / (1e6 / 52596)).toFixed(2)}%</i></td>
					</tr>
				{/each}
			</table>
			{:else}
			<p>no coupons available</p>
			{/if}
			{:else}
			<p>loading coupons...</p>
		{/if}
		<h2>Threads</h2>


		{#if threads && threads.length}
			<table class="couponTable">
				<tr class="header">
					<td>BCH </td>
					<td>FBCH-{time} </td>
					<td>Token Id </td>
				</tr>
				{#each threads as c}
					<tr>
						<td class="r">{(c.value / 1e8).toFixed(2)} </td>
						<td class="r"><i>{(c.token_data.amount / 1e8).toLocaleString()}</i></td>
						<td class="r"><i>{c.token_data.category.substring(0, 8) + '...' + c.token_data.category.slice(-4)}</i></td>
					</tr>
				{/each}
			</table>
		{:else}
		<p>loading threads...</p>
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
