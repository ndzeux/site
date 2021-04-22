<script>
    import { onMount } from "svelte";
    import { link, navigate } from "svelte-navigator";
    import { scale, fade, fly } from "svelte/transition"
    import axios from "axios";
    import { setTime2 } from "../libs/Time";
    import Exception from "../components/Exception.svelte";
    //
    let  writings = "memuat...", projects = "memuat...", random, checker;
    async function getData(y, z){
        await axios.get("/src/data/" + y + "/all-" + y + ".json").then(res => {
            if(res.status == 200){
                z = [], checker = [];
                for(let i = 0; i < 4;){
                    random = Math.floor(Math.random() * (res.data.length < 4 ? 4:res.data.length));
                    if(checker.indexOf(random) != -1){
                        continue;
                    }
                    checker.push(random);
                    z.push(res.data[random]);
                    i++;
                }
            } else {
                z = "error";
            }
        }).catch(err => {
            console.log(err);
            z = "error";
        });
        if(y == "writing" && !z.every(s => !s)) writings = z;
        else if (y == "writing") writings = [];
        //
        if(y == "projects" && !z.every(s => !s)) projects = z;
        else if (y == "projects") projects = [];

    }   
    getData("writing", writings);
    getData("projects", projects);
    //
    let windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
        windowWidth = window.innerWidth;
    });
</script>

<svelte:head>
    <title>Welcome | Ndzeux</title>
</svelte:head>

<div class="container mx-auto p-4">
    <div class="hero flex flex-wrap justify-center md:items-center md:justify-around">
        <div class="space-y-4 md:space-y-6 md:pr-4 w-full text-center md:text-left sm:w-7/12 md:-mt-16" aos="true" aos-on="{(windowWidth <= 767 ? 'fade-up':'fade-right')}">
            <h1 class="font-bold text-3xl lg:text-4xl xl:text-5xl">Welcome 🕵️‍♂️</h1>
            <h2 class="font-bold text-5xl lg:text-7xl xl:text-8xl">I'm Harry H.</h2>
            <p class="sm:text-lg lg:text-xl xl:text-2xl">
                A Software Developer, who wants to be an Entrepreneur
            </p>
        </div>
        <div class="order-first md:order-last p-4 pb-8 md:p-0 md:-mt-16">
            <img src="/src/photo/avatar.svg" alt="avatar" class="w-56 h-56 sm:w-72 sm:h-72 xl:w-96 xl:h-96 rounded-full bg-gray-200 dark:bg-dpink border-8 border-gray-300 dark:border-vdpink shadow duration-500" aos="true" aos-on="zoom-in">
        </div>
    </div>
    <div class="mt-8 max-w-7xl mx-auto">
        <div class="bg-white dark:bg-dbluegray border border-gray-100 dark:border-vdpink rounded-3xl p-4 duration-700" aos="true" aos-on="fade-up" aos-tolerance="third">
            <div class="header flex items-center justify-between">
                <h2 class="text-xl sm:text-2xl sm:text-left flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="margin-bottom: -1px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Featured Writing
                </h2>
                <a use:link href="/writing" class="flex items-center">
                    see all
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
            <div class="relative flex flex-wrap mt-1" style="min-height: 256px;">
                {#if writings == "memuat..."}
                <Exception on="loading" margin="mt-8 sm:mt-0" />
                {:else if writings != "error"}
                {#each writings as data, i}
                {#if data}
                <div class="w-full md:w-6/12 lg:w-4/12 p-2">
                    <div class="relative bg-white border-gray-100 dark:bg-dbluegray p-4 pb-10 rounded-lg border dark:border-vdpink h-full" in:fly="{{ y: 25, delay: (25*(i+1)) }}">
                        {#if data.thumbnail}
                        <div class="w-full h-56 relative overflow-hidden border border-gray-100 dark:border-mbluegray rounded-lg bg-gray-300 dark:bg-vdpink">
                            <img src="{data.thumbnail}" alt="{data.title}" class="w-0 object-cover h-full" on:load="{(e) => {e.target.classList.remove("w-0");e.target.classList.add("w-full")}}">
                        </div>
                        {/if}
                        <a use:link href="/writing/{data.slug}" class="block mt-2"><h3 class="font-bold text-xl md:text-2xl">{data.title}</h3></a>
                        <p class="md:text-lg">{data.description}</p>
                        <div>
                            {#each data.tags as tag}
                            <span on:click="{() => navigate("/writing/#" + (tag ? tag:'other'))}" class="inline-block mt-2 mr-2 py-1 px-2 bg-gray-100 dark:bg-mbluegray rounded cursor-pointer text-sm lg:text-base">{(tag ? tag:'other')}</span>
                            {/each}
                        </div>
                        <span class="text-xs sm:text-sm opacity-80 absolute right-4 bottom-3">{setTime2(data.time)}</span>
                    </div>
                </div>
                {/if}
                {:else}
                <Exception on="empty" margin="mt-8 sm:mt-0" />
                {/each}
                {:else}
                <Exception on="error" margin="mt-8 sm:mt-0" />
                {/if}
            </div>
            <hr class="my-4 border-0 bg-gray-100 dark:bg-vdpink" style="height:1px" />
            <div class="header flex items-center justify-between">
                <h2 class="text-xl sm:text-2xl sm:text-left flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="margin-bottom: -1px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Featured Projects
                </h2>
                <a use:link href="/projects" class="flex items-center">
                    see all
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
            <div class="relative flex flex-wrap mt-1" style="min-height: 256px;">
                {#if projects == "memuat..."}
                <Exception on="loading" margin="mt-8 sm:mt-0" />
                {:else if projects != "error"}
                {#each projects as data, i}
                {#if data}
                <div class="w-full sm:w-6/12 xl:w-3/12 p-2">
                    <div class="relative bg-white border-gray-100 dark:bg-dbluegray p-4 pb-10 rounded-lg border dark:border-vdpink h-full" in:fly="{{ y: 25, delay: (25*(i+1)) }}">
                        {#if data.thumbnail}
                        <div class="w-full h-56 relative overflow-hidden border border-gray-100 dark:border-mbluegray rounded-lg bg-gray-300 dark:bg-vdpink">
                            <img src="{data.thumbnail}" alt="{data.title}" class="w-0 object-cover h-full" on:load="{(e) => {e.target.classList.remove("w-0");e.target.classList.add("w-full")}}">
                        </div>
                        {/if}
                        <a use:link href="/projects/{data.slug}" class="block mt-2"><h3 class="font-bold text-xl md:text-2xl">{data.title}</h3></a>
                        <p class="md:text-lg">{data.description}</p>
                        <div>
                            {#each data.tags as tag}
                            <span on:click="{() => navigate("/projects")}" class="inline-block mt-2 mr-2 py-1 px-2 bg-gray-100 dark:bg-mbluegray rounded cursor-pointer text-sm lg:text-base">{(tag ? tag:'other')}</span>
                            {/each}
                        </div>
                        <span class="text-xs sm:text-sm opacity-80 absolute right-4 bottom-3">{setTime2(data.time)}</span>
                    </div>
                </div>
                {/if}
                {:else}
                <Exception on="empty" margin="mt-8 sm:mt-0" />
                {/each}
                {:else}
                <Exception on="error" margin="mt-8 sm:mt-0" />
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .hero{
        min-height: calc(100vh - 97px);
    }
    @media(max-width: 768px){
        .hero{
            min-height: auto;
        }
    }
</style>