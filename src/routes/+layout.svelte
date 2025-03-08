<script lang="ts">
	import '../app.postcss';
	import Navbar from '../components/layout/Navbar.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';

	let { children } = $props();
</script>

<div class="flex max-h-screen w-full">
	<aside>
		<Sidebar.Provider>
			<AppSidebar />
		</Sidebar.Provider>
	</aside>

	<div class="flex flex-col w-full overflow-auto h-1/2">
		<Navbar />
		<main class="h-[95vh] overflow-auto">
			{@render children()}
		</main>
	</div>
</div>
