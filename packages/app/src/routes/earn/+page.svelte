<script lang="ts">
	import { Vault, getHvifIconHex, getFutureBlockDate } from '@fbch/lib';
	import { height } from '$lib/store.js';

	const series = [3, 4, 5, 6];

	let heightValue: number;

	height.subscribe((value: any) => {
		heightValue = value;
	});
</script>

<svelte:head>
	<title>Coupons</title>
	<meta name="description" content="Take Coupons" />
</svelte:head>

<div class="text-column">
	<div class="wrapper">
		{#each series as e}
			<div>
				E{e}<br />
				{#if heightValue}
					<div>
						{#each Vault.getSeriesTimes(heightValue, e) as time}
							<div>
								{#if time}
									<span>
										<a href="/v/?time={time}">
											<icon-hvif data={getHvifIconHex(time)} alt="FBCH" />
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
		margin:1em;
	}

</style>
