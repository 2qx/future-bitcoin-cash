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
							}
						)
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
	<h1>Write coupons</h1>
	<div id="control">
		<div>Placement: 1 BCH</div>
		<div>
			<label>
				Rate: {rate} spb<br />
				<input
					type="range"
					on:change={() => updateCoupons()}
					bind:value={rate}
					min="1"
					step="0.2"
					max="50"
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
	#dataTable{
		max-width: fit-content;
	}
	#total {
		text-align: right;
	}
</style>
