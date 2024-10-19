<script>
	import { asTokenUnawareP2sh } from '@fbch/lib';

	export let address;

	const unAwareAddress = asTokenUnawareP2sh(address);
</script>

<div>
	{#if address}
		<a target="_blank" href="https://explorer.salemkode.com/address/{address}">salemkode</a>
		<a target="_blank" href="https://3xpl.com/bitcoin-cash/address/{unAwareAddress.split(':')[1]}"
			>3xpl</a
		>
		<a target="_blank" href="https://explorer.electroncash.de/address/{address}">electroncash.de</a>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-end;
		justify-content: flex-end;
	}
	div a {
		display: inline-block;
		border-radius: 5px;
		background-color: #52254873;
		color: #eee;
		margin: 2px;
		padding: 2px;
		font-weight: 400;
		font-size: small;
	}
</style>
