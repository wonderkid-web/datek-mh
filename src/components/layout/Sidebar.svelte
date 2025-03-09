<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
</script>

<Sidebar.Provider>
	<aside class="col-start-1 col-end-3 row-span-12 max-w-full">
		<AppSidebar />
	</aside>
</Sidebar.Provider>
