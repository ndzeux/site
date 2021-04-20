<script>
    import { fade } from "svelte/transition";
    import { link, useLocation } from "svelte-navigator";
    
    export let themeMode;
    //
    const location = useLocation();
    let url;
    $: url = $location.pathname;
    //
    const toggleThemeMode = () => {
        if(themeMode){
            localStorage.theme = '';
            themeMode = '';
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark';
            themeMode = 'dark';
        }
    }
    //
    const showblb = e => {
        e.target.classList.add("hover");
    }
    const hideblb = e => {
        if(url != e.target.pathname){
            e.target.classList.remove("hover");
        }
    }
    //
    let shownav, windowSize = window.innerWidth;
    window.addEventListener("resize", () => {
        windowSize = window.innerWidth;
    });
    let process;
    const showNav = (e) => {
        if(typeof e == 'undefined' || window.innerWidth > 767 || process || (e == "true" && !shownav)){
            return false;
        }
        process = true;
        shownav = !shownav;
        if(shownav){
            document.body.style.overflow = "hidden";
            location.hash = "mwo";
        } else {
            document.body.style.overflow = "";
            location.hash = "";
        }
        setTimeout(()=>{
            process = false;
        }, 300);
    }
    window.addEventListener("hashchange", () => {
        if(location.hash == ""){
            shownav = false;
            document.body.style.overflow = "";
            location.hash = "";
        }
    });
</script>

<header class="border-b border-gray-200 dark:border-vdpink bg-white text-dbluegray dark:bg-dbluegray dark:text-white fixed top-0 right-0 left-0 z-40">
    <div class="container flex items-center justify-between mx-auto p-4 h-16 sm:h-20" on:click="{(e) => {
        if(e.target.tagName != "BUTTON"){
            showNav("true");
        }
    }}">
        <a href="/" use:link><h2 class="text-3xl sm:text-4xl font-bold font-berait">ndzeux</h2></a>
        <div class="flex items-center justify-end w-full">
            {#if shownav || windowSize > 767}
            <nav class="items-center fixed z-10 top-16 sm:top-20 left-0 right-0 -bottom-16 pt-10 bg-white dark:bg-dbluegray md:bg-transparent md:dark:bg-transparent md:pt-0 md:static md:flex" on:mouseover="{showblb}" on:mouseout="{hideblb}" on:click="{showNav}" transition:fade="{{ duration: 200 }}">
                <a use:link href="/" class="h-20 px-4 lg:px-8 max-w-max mx-auto md:max-w-none flex items-center justify-center relative {(url == '/' ? 'hover':'')}">Home</a>
                <a use:link href="/about" class="h-20 px-4 lg:px-8 max-w-max mx-auto md:max-w-none flex items-center justify-center relative {(url == '/about' ? 'hover':'')}">About</a>
                <a use:link href="/writing" class="h-20 px-4 lg:px-8 max-w-max mx-auto md:max-w-none flex items-center justify-center relative {(url.indexOf('/writing') > -1 ? 'hover':'')}">Writing</a>
                <a use:link href="/projects" class="h-20 px-4 lg:px-8 max-w-max mx-auto md:max-w-none flex items-center justify-center relative {(url.indexOf('/projects') > -1 ? 'hover':'')}">Projects</a>
                <a use:link href="/portofolio" class="h-20 px-4 lg:px-8 max-w-max mx-auto md:max-w-none flex items-center justify-center relative {(url.indexOf('/portofolio') > -1 ? 'hover':'')}">Portofolio</a>
            </nav>
            {/if}
            <button on:click="{toggleThemeMode}" class="text-dbluegray bg-gray-100 dark:text-white dark:bg-yellow-400 rounded-full w-12 h-12 ml-4 lg:ml-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-yellow-400 focus:ring-offset-2 ring:offset-gray-100">
                {#if themeMode}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        ad06e2      </svg>
                {/if}
            </button>
            <button on:click="{showNav}"
            class="text-dbluegray dark:text-white ml-4 bg-gray-100 dark:bg-mbluegray rounded-md w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-mbluegray focus:ring-offset-2 ring:offset-gray-100 dark:ring-offset-dbluegray md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </button>
        </div>
    </div>
</header>

<style>
    @media(max-width: 767px){
        nav{
            margin-top: 1px;
            animation: muncul .3s;
        }
    }
    nav a::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        border-radius: 6px;
        background: var(--blb);
        transform: scale(0);
        transition: transform .3s;
    }
    :global(nav .hover::after){
        transform: scale(1)!important;
    }
</style>