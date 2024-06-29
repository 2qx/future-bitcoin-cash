<svelte:head>
	<title>Coupons</title>
	<meta name="description" content="Take Coupons" />
</svelte:head>

<script>
	//import { Vault } from "../../../../dist/src/vault"
	const series = [3,4,5,6];
</script>

<div class="text-column">
	<h1>Coupons</h1>
	<p>
		Coupons offer incentive to lock BCH. 
	</p>

	{#each series as e}
	<!-- {#each Vault.getSeries(e) as vault}
	{vault}
	{/each} -->
	{e}
	{/each}
</div>
