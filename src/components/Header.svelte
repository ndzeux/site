<script>
    import { link, useLocation } from "svelte-navigator";
    //
    const location = useLocation();
    let path;
    $: path = $location.pathname;
    //
    let posY = window.scrollY;
    window.addEventListener("scroll", () => {
        posY = window.scrollY;
    });
    //
    let heroHeight = 100;
    window.addEventListener("load", ()=>{
        if(path == '/'){
            setTimeout(()=>{
                let hero = document.querySelector(".hero");
                heroHeight = hero.offsetHeight;
                window.addEventListener("resize", () => {
                    heroHeight = hero.offsetHeight;
                });
            }, 50);
        }
    });
    //
</script>


<header class="bg-indigo-800 {(posY < 10 && path == '/' ? 'bg-opacity-0':(posY < heroHeight - 72 && path == '/' ? 'bg-opacity-60':''))} fixed top-0 left-0 right-0 z-40 {(path == '/' ? 'transition-all duration-500':'')}">
    <div class="h-16 sm:h-20 container mx-auto px-4 flex items-center justify-between text-white">
        <a href="/" use:link class="logo flex items-center relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 sm:h-14 sm:w-14 mr-1 filter drop-shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2 sm:h-4 sm:w-4 absolute left-4 -mb-3 sm:left-5 sm:-mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <h1 class="font-semibold text-lg leading-4 sm:text-3xl sm:leading-7 font-berait tracking-wider filter drop-shadow-2xl">Qrco<br>Store</h1>
        </a>
        <div class="menu flex items-center justify-center">
            <button aria-label="search button" class="text-indigo-700 bg-indigo-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow flex items-center justify-center filter drop-shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <button aria-label="qrcode scanner" class="text-indigo-700 bg-indigo-50 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow flex items-center justify-center filter drop-shadow-2xl ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
            </button>
        </div>
    </div>
</header>