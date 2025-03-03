<script>
    let {link, name} = $props()
</script>

<ul>
    <li>
        <a href={link}>{name}</a>
    </li>
</ul>

<style>
    li{
        list-style: none;
        display: inline-block;
        padding: 8px 12px;
        position: relative;
    }
    a{
        text-decoration: none;
        font-size: 1em;
    }
    li::after{
        content: '';
        width: 100%;
        height: 2px;
        background: black;
        display: block;
        margin: auto;
    }
    li:hover{
        
    }
</style>