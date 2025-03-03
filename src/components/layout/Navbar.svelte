<script>
	import { NavLinks } from "$lib";
	import NavbarLinkComponent from "../ui/NavbarLinkComponent.svelte";

</script>
<nav class="col-span-12 col-start-3 bg-yellow-400">
    <div class="nav">
        <div class="nav-links flex">
            {#each NavLinks as {link,name}}
                <NavbarLinkComponent link={link} name={name}/>
            {/each}
        </div>
    </div>
</nav>