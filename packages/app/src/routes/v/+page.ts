export async function load({ url }) {
	let time = url.searchParams.get('time') || undefined;
	return { time };
}
