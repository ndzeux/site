<script>
    import { onDestroy } from "svelte";
    import { fade } from "svelte/transition";
    import { link } from "svelte-navigator";
    //
    // hero sections
    let slideshowchanging = "one";
    let heroH2, textHeroH2, i, j, first  = true, intervalNya;
    setInterval(()=>{
        if(j == 0){
            slideshowchanging = "two";
        } else if(j == 1){
            slideshowchanging = "";
        } else {
            slideshowchanging = "one";
        }
        j = (j == 0 ? 1:(j == 1 ? 2:0));
    }, 3700);
    $: if(heroH2 && first){
        first = false;
        textHeroH2 = "Shopping at the store is made easier and faster";
        heroH2.innerText = "";
        i = 0;
        function textTyped(){
            heroH2.innerHTML += textHeroH2[i];
            i++;
            if(i == textHeroH2.length){
                clearInterval(intervalNya);
                setTimeout(()=>{
                    heroH2.innerHTML = `Shopping at the store is made <span class="text-indigo-700 italic">easier</span> and <span class="text-indigo-700  italic">faster</span>`;
                    
                }, 300);
                setTimeout(()=>{
                    textHeroH2 = "Shopping at the store is made easier and faster";
                    heroH2.innerText = "";
                    i = 0;
                    intervalNya = setInterval(textTyped, 150);
                }, 5000);
            }
        }
        intervalNya = setInterval(textTyped, 150);
    }
    onDestroy(()=>{
        clearInterval(intervalNya);
    });
    //
</script>

<svelte:head>
    <title>QrcoStore</title>
</svelte:head>

<div>
    <div class="hero relative overflow-hidden flex items-center justify-center border-b-8 border-gray-100">
        <h2 bind:this="{heroH2}" class="absolute container max-w-5xl px-4 text-center filter drop-shadow-2xl z-20 top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 font-bold text-white text-2xl sm:text-4xl lg:text-6xl mt-5 sm:mt-0 typewriter">_</h2>
        <div class="overlay-hero absolute z-10 top-0 right-0 bottom-0 left-0"></div>
        {#if slideshowchanging == "one"}
        <div class="img1 absolute left-0 top-0 right-0 bottom-0" transition:fade|local={{ duration: 500 }}></div>
        {:else if slideshowchanging == "two"}
        <div class="img2 absolute left-0 top-0 right-0 bottom-0" transition:fade|local={{ duration: 500 }}></div>
        {:else}
        <div class="img3 absolute left-0 top-0 right-0 bottom-0" transition:fade|local={{ duration: 500 }}></div>
        {/if}
    </div>
    <div class="content container mx-auto p4">
        <div class="category">
            <div class="top p-4 pb-0 flex items-center justify-between">
                <h3 class="font-semibold text-2xl sm:text-3xl flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Category
                </h3>
                <a href="/products" class="flex items-center text-indigo-700" use:link>
                    view all
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
            <div class="flex flex-nowrap overflow-y-auto py-4 mx-5">
                {#each Array(4) as n, i}
                <div class="w-full md:w-6/12 xl:w-3/12 {(i == 3 ? '':'pr-4')}" style="min-width: 240px;">
                    <div class="min-h-full h-52 p-4 rounded-xl bg-indigo-50 overflow-hidden relative">
                        <h4 class="text-indigo-700 font-semibold text-2xl relative z-10">Cloth</h4>
                        <p class="text-gray-600 relative z-10">Lorem ipsum dolor sit amet consectetur adipisicing elitquas deserunt</p>
                        <button class="mt-2 py-2 px-8 rounded-2xl font-bold text-md bg-white text-indigo-600 bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-200 z-10 absolute bottom-4 left-4">
                            Shop Now
                        </button>
                        <svg class="absolute w-40 h-40 right-0 bottom-1 transform -rotate-12 z-0 opacity-10" fill="#4338ca" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path d="M62,4H42c-0.63,0-1.223,0.296-1.6,0.8L35,12h-6l-5.4-7.2C23.223,4.296,22.63,4,22,4H2C0.896,4,0,4.896,0,6v16   c0,1.104,0.896,2,2,2h10v34c0,1.104,0.896,2,2,2h36c1.104,0,2-0.896,2-2V24h10c1.104,0,2-0.896,2-2V6C64,4.896,63.104,4,62,4z    M60,20H50c-1.104,0-2,0.896-2,2v34H16V22c0-1.104-0.896-2-2-2H4V8h17l5.4,7.2c0.377,0.503,0.97,0.8,1.6,0.8h8   c0.63,0,1.223-0.296,1.6-0.8L43,8h17V20z"></path></g></svg>
                    </div>
                </div>
                {/each}
            </div>
        </div>
        <div class="discount">
            <div class="top p-4 pb-0 flex items-center justify-between">
                <h3 class="font-semibold text-2xl sm:text-3xl flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Discounts
                </h3>
                <a href="/products" class="flex items-center text-indigo-700" use:link>
                    view all
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
            <div class="flex flex-nowrap overflow-x-auto mx-5 py-4">
                {#each Array(12) as n, i}
                <div class="min-w-max w-6/12 sm:w-4/12 lg:w-w-3/12 {(i == 11 ? '':'pr-4')}">
                    <div class="bg-white p-4 rounded-2xl shadow-sm filter drop-shadow-sm space-y-3 w-80 border border-gray-50">
                        <div class="relative">
                            <span class="absolute top-2 left-2 inline-block py-1 px-2 bg-red-600 text-white text-xs rounded-lg">-40%</span>
                            <img src="/src/img/cloth.jpg" class="rounded-xl w-full object-cover object-center" style="height: 40vh;" alt="Cloth" />
                        </div>
                        <span class="inline-block text-gray-400">Ria Jaya</span>
                        <a href="/products/detail" class="font-medium text-indigo-700 text-xl" use:link>
                            <h4>Baju Apaan nih, kaga tau gua, Sueza Oey Loepa Koepoie</h4>
                        </a>
                        <div class="flex items-center">
                            <span class="font-bold text-3xl mr-2">Rp 300.000</span>
                            <s class="text-gray-300 text-sm">RP 500.000</s>
                        </div>
                        <div class="flex items-center">
                            <span class="inline-block w-20 mr-2 h-1 rounded-md bg-gray-100">
                                <span class="block bg-green-600 w-3/4 h-full rounded-md"></span>
                            </span>
                            <span class="text-green-600 text-sm">32 Available stock</span>
                        </div>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .hero{
        padding-top: 66.25%;
    }
    @media(min-width:1200px){
        .hero{
            padding-top: 0;
            height: 720px;
        }
    }
    .hero h2{
        --webkit-text-storke: 1px #555;
    }
    .hero .img1{
        background: url(/src/img/hero1.jpg) center top no-repeat;
        background-size: cover;
    }
    .hero .img2{
        background: url(/src/img/hero2.jpg) center top no-repeat;
        background-size: cover;
    }
    .hero .img3{
        background: url(/src/img/hero3.jpg) center top no-repeat;
        background-size: cover;
    }
    .hero .overlay-hero{
        background: linear-gradient(to bottom, rgb(55, 48, 163, .1), rgb(55, 48, 163, .1), rgb(55, 48, 163, .1), rgb(55, 48, 163, 0));
    }
    :global(.hero h2 span){
        -webkit-text-stroke: 1px #fff;
    }
    @media(max-width:340px){
        .hero h2{
            font-size: 20px;
        }
    }
</style>