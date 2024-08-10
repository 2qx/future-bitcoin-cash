export async function load({ params }) {
	let time = params.time || undefined;
	return { time };
}
