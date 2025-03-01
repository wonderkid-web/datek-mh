<script lang="ts">
	import '../app.css';
	import Navbar from '../components/layout/Navbar.svelte';
	import Sidebar from '../components/layout/Sidebar.svelte';
	let { children } = $props();
</script>


<div class="container min-h-screen min-w-screen">
    <Sidebar />
    <Navbar />
	{@render children()}    
</div>
    





<style>
	.container {
		display: grid;
		grid-template-columns: 5vw repeat(11, 1fr);
		grid-template-rows: 75px repeat(11, 1fr);
		gap: 0px;
	}
</style>