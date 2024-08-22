<script lang="ts">
	import { Vault, getFutureBlockDate } from '@fbch/lib';
	import SeriesIcon from '$lib/images/SeriesIcon.svelte';
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

<div class="wrapper">
	{#each series as e}
		<div>
			V<sub>{e}</sub> Series<br />
			{#if heightValue}
				<div>
					{#each Vault.getSeriesTimes(heightValue, e, e == 6 ? 4 : undefined) as time}
						<div class="vaultPreview">
							<a href="/v?block={time}">
								<SeriesIcon {time} size="80" />
							</a>

								{#if time}
									<span>
										<b>{time.toLocaleString()}</b><br />
										{getFutureBlockDate(heightValue, time).toLocaleDateString()}
									</span>
								{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.wrapper div div {
		margin: 1dvw;
		display: grid;
	}

</style>
