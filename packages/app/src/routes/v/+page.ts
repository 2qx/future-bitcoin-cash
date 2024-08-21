export const prerender = true;

export async function load({ url }) {
	let block = url.searchParams.get('block') || undefined;
	return { block };
}
