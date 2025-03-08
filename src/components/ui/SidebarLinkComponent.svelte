<script>
	import { Button } from '$lib/components/ui/button';

	let { link, names } = $props();
</script>

<Button>test</Button>

<style>
	a {
		gap: 1;
		font-size: 1em;
	}

	a:hover {
		background-color: white;
	}
</style>
