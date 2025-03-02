<script>
    let {link, names} = $props()
</script>

<a href={link}>{names}</a>

<style>
    a{
        gap: 1;
        font-size: 1em;
        font-family: '', cursive;
    }

    a:hover{
        background-color: white;
    }
</style>
