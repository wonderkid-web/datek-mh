<script lang="ts">
	import '../app.css';
	import Navbar from '../components/layout/Navbar.svelte';
	import Sidebar from '../components/layout/Sidebar.svelte';
	let { children } = $props();
</script>


<div class="container max-w-screen max-h-screen">
    <Sidebar />
    <Navbar />
	<main class="col-start-3 -col-end-1 row-start-2 -row-end-1 overflow-auto bg-red-200 p-4">
		{@render children()}    
	</main>
</div>
    





<style>
	.container {
		display: grid;
		grid-template-columns: 5vw repeat(11, 1fr);
		grid-template-rows: 75px repeat(11, 1fr);
		gap: 0px;
	}
</style>