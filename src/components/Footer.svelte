<script>
    import { link } from "svelte-navigator";
</script>

<footer class="px-4 py-6 bg-white dark:bg-dbluegray border-t border-gray-100 dark:border-vdpink text-base">
    <div class="container mx-auto md:flex items-center justify-between">
        <div class="text-center order-last">
            <span class="text-red-500">👨🏻‍🔧</span> created using <a href="https://svelte.dev" target="_blank" rel="noreferrer">svelte.js</a> and <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">tailwind.css</a>
        </div>
        <div class="text-center mt-1">
            &copy {new Date().getFullYear()} <a href="/" use:link>Ndzeux</a>
        </div>
    </div>
</footer>