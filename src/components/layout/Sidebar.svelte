<script>
	import SidebarLinkComponent from "../ui/SidebarLinkComponent.svelte";
	import SidebarSectionComponent from "../ui/SidebarSectionComponent.svelte";
    import { SectionLinks } from "$lib";

</script>
<aside class="row-span-12 col-start-1 col-end-3 bg-green-600">
    <h3 class="mt-6 font-semibold flex justify-center">Dashboard</h3><hr class="mt-7"><br>

    <div class="nav pl-4">
        <div class="nav-links flex gap-1 flex-col">
            <!-- {#each Section as {name}}
                <SidebarSectionComponent name={name} />
            {/each} -->
            {#each $SectionLinks as sections}
            <SidebarSectionComponent name={sections.section}/>    
                {#each sections.links as {link, names}}
                <SidebarLinkComponent link={link} names={names}/>
                {/each}
            {/each}
        </div>
    </div>
</aside>