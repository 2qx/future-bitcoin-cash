<script lang="ts">
	import { Vault, getFutureBlockDate } from '@fbch/lib';
	import  SeriesIcon from "$lib/images/SeriesIcon.svelte";
	import { height } from '$lib/store.js';
	const series = [3, 4, 5, 6];

	let heightValue = 857000;

	height.subscribe((value: any) => {
		heightValue = value;
	});
</script>

<svelte:head>
	<title>Coupons</title>
	<meta name="description" content="Take Coupons" />
	<link rel="icon" type="image/svg" href="/FBCH.svg" />
</svelte:head>

<div class="text-column">
	<div class="wrapper">
		{#each series as e}
			<div>
				E{e}<br />
				{#if heightValue}
					<div>
						{#each Vault.getSeriesTimes(heightValue, e, e==6? 4: undefined) as time}
							<div>
								{#if time}
									<span>
										<a href="/v?block={time}">
											
											<SeriesIcon {time} size=80/>
										</a><b>{time.toLocaleString()}</b>
									</span>
									{getFutureBlockDate(heightValue, time).toLocaleDateString()}
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(12, [col-start] 1fr);
	}

	.wrapper div div {
		margin: 2dvw;
	}

</style>
