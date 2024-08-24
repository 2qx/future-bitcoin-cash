<script lang="ts">
	import { onMount } from 'svelte';
	import { Vault, getFutureBlockDate } from '@fbch/lib';
	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
	import { height } from '$lib/store.js';
	const series = [3, 4, 5, 6];
	let s = 4;
	let coupons = [];
	let duplicateCoupons = 1;
	let placement = 1;
	let rate = 20;
	let totalSpend = 0;
	let totalPlacement = 0;
	let heightValue = 857000;

	height.subscribe((value: any) => {
		heightValue = value;
	});

	function updateCoupons() {
		let addresses = Vault.getCouponSeries(heightValue, placement * 1e8, s, s == 6 ? 4 : undefined);
		let times = Vault.getSeriesTimes(heightValue, s, s == 6 ? 4 : undefined);

		coupons = addresses
			.map(function (a, i) {
				if ((times[i] - heightValue) * rate > 543) {
					return [
						...Array(duplicateCoupons).fill({
							time: times[i],
							address: a,
							placement: placement,
							amount: Math.floor((times[i] - heightValue) * rate) / 1e8
						})
					];
				} else {
					return [];
				}
			})
			.flat();

		totalPlacement = coupons.reduce(function (acc, obj) {
			return acc + obj.placement;
		}, 0);

		totalSpend = coupons.reduce(function (acc, obj) {
			return acc + obj.amount;
		}, 0);
		totalSpend = Math.floor(totalSpend * 1e8) / 1e8;
	}

	onMount(async () => {
		updateCoupons();
	});
</script>

<svelte:head>
	<title>Write</title>
	<meta name="description" content="Write Coupons" />
</svelte:head>

<div class="text-column">
	<h1>Let's write some coupons!</h1>
	<p>
		Coupons incentivize money being spent 1) at a specific destination, 2) above some minimum
		amount, and 3) with restrictions like: limit one per customer.
	</p>
	<p>
		Future vault coupons are plain bitcoin cash unspent transaction outputs (UTXOs) that have been
		sent to, and are then locked by a <a href="/contracts#coupon">simple contract</a> to incentivize
		spending money at a specific destination (a FBCH token vault). For example, an output of 100k sats
		can be sent to a coupon contract to be used for locking at least 1 BCH (min. value) into 1 FBCH at
		a vault contract (destination).
	</p>
	<p>
		Coupons values are denoted in BCH sats, where the value of the coupon is the value of the
		unspent output. A whole BCH could be split into 1000 coupons each offering 100k sats for
		placement, or 1 BCH coin could be sent to the coupon contract in one single output to let anyone
		lock a "free" FBCH.
	</p>
	<p>
		At this time, all coupons incentivize the same placement amount of 1 BCH (or 100M sats) into an
		FBCH vault. These "C<sub>0</sub>" series coupons are to lock 1 x 10^0 BCH, but there may be
		smaller and larger amounts later (i.e C<sub>2</sub> for 100 BCH placements and C<sub>-2</sub> for 0.01 BCH vault placements).
	</p>
	<p>
		<b>Coupons are not refundable.</b>
		Money sent to a coupon holding contract can only be redeemed in a transaction that sends the required
		amount of value to a second predefined contract (i.e. a future vault).
	</p>
	<p>
		Below is a simple tool for use with the <a href="https://electroncash.org/">Electron Cash</a> pay-to-many
		feature:
	</p>

	<div id="control">
		<div>Placement: 1 BCH</div>
		<div>
			<label>
				Rate: {rate} spb , <i>~{(rate / 20.0).toPrecision(2)}% </i><br />
				<input
					type="range"
					on:change={() => updateCoupons()}
					bind:value={rate}
					min="1"
					step="0.2"
					max="100"
				/>
			</label>
		</div>
		<div>
			<label>
				Copies: {duplicateCoupons}<br />
				<input
					type="range"
					on:change={() => updateCoupons()}
					bind:value={duplicateCoupons}
					min="1"
					max="40"
				/>
			</label>
		</div>

		<div id="dataTable">
			{#each series as number}
				<label>
					<input
						type="radio"
						name="s"
						value={number}
						bind:group={s}
						on:change={() => updateCoupons()}
					/>
					V{number} Series - {Math.pow(10, number).toLocaleString()} <br />
				</label>
			{/each}
		</div>
	</div>

	<div>
		Lock up to {totalPlacement} FBCH
	</div>
	<div id="total">
		Total: {totalSpend} BCH<br />
	</div>
	<hr />
	<div id="mono">
		{#each coupons as c}
			{c.address}, {c.amount}<br />
		{/each}
	</div>
</div>

<style>
	#control {
		display: flex;
		flex-wrap: wrap;
	}
	#control div {
		flex: 1 0 50%;
		border: 1px solid black;
		padding: 0.2em;
	}
	#mono {
		font-family: monospace;
		word-break: break-all;
	}
	#dataTable {
		max-width: fit-content;
	}
	#total {
		text-align: right;
	}
</style>
