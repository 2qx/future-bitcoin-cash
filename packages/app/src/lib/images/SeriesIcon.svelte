<script lang="ts">
	export let time;
	export let size;

	const xmlCodes = [
		'#000000',
		'#966424',
		'#ff0000',
		'#ff7500',
		'#ffff00',
		'#00ff00',
		'#0000ff',
		'#ff00ff',
		'#888888',
		'#ffffff'
	];

	function getColor(time:number, idx:number){
		let place = [...Math.floor(time / 1000)
				.toString()
				.padStart(4, '0')
		].map((a, i) => Number(a))[idx]
		return xmlCodes[place]
	};



</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6528 6528" style="width:{size}px; height:{size}px;">
	<path
		d="M 408 408 L 408 6120 6120 6120 6120 408 Z"
		style="stroke-width:204;stroke-linejoin:miter;stroke-linecap:butt;stroke:#ffffff;fill:none;"
	></path>
	<path
		d="M 408 408 L 408 6120 6120 6120 6120 408 Z"
		style="fill:{getColor(time,0)};stroke:none;"
	></path>
	<path
		d="M 816 816 L 2040 816 2040 1224 1224 1224 1224 1632 1632 1632 1632 2040 1224 2040 1224 2856 816 2856 Z"
		style="fill:#ffffff;stroke:none;"
	></path>
	<path
		d="M 816 3264 L 816 6120 2040 6120 2040 3264 Z"
		style="fill:{getColor(time,1)};stroke:none;"
	></path>
	<path
		d="M 2448 2856 L 2448 6120 5712 6120 5712 2856 Z"
		style="fill:{getColor(time,3)};stroke:none;"
	></path>
	<path
		d="M 2448 816 L 2448 2448 5712 2448 5712 816 Z"
		style="fill:{getColor(time,2)};stroke:none;"
	></path>
</svg>
