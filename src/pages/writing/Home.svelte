<script>
    import { fly } from "svelte/transition";
    import axios from "axios";
    import { link } from "svelte-navigator"
    import { setTime2 } from "../../libs/Time";
    import Exception from "../../components/Exception.svelte";
    //
    export let on;
    //
    let writings = "memuat...", dbWritings;
    axios.get(`/src/data/${on}/all-${on}.json`).then(res => {
        if(res.statusText == "OK"){
            writings = res.data;
            dbWritings = writings;
        } else {
            console.log(res);
            writings = "error";
        }
    }).catch(err => {
        console.log(err);
        writings = "error";
    }).finally(()=>{
        //
    });
    //
    let search = "", tags = "";
    let temp;
    const queryWriting = () => {
        // writings = "memuat...";
        setTimeout(()=>{
            if(tags){
                window.scrollTo(0,0);
            }
            if(search[0] == "#"){
                tags = search.slice(1).toLowerCase();
            }
            writings = dbWritings;
            writings = writings.reduce((a, o) => (((o.title.toLowerCase().indexOf(search.toLowerCase()) > -1 && tags == "") || (o.tags.indexOf(tags) > -1 && tags != "")) && a.push(o), a), []);
            if(JSON.stringify(temp) != JSON.stringify(writings)){
                temp = writings;
                writings = "memuat..."
                setTimeout(()=>{
                    writings = temp;
                }, 300);
            } else {
                temp = writings;
            }
        }, 25);
    }
    //
</script>

<svelte:head>
    <title>Writing | Ndzeux</title>
</svelte:head>

<div class="container mx-auto p-4" style="min-height: 320px;">
    <div class="header sm:flex items-center justify-between text-center">
        <h1 class="inline-block font-bold text-3xl pb-4 px-8 bbg">{on[0].toUpperCase()}{on.slice(1)}</h1>
        <form class="mt-4 sm:mt-0 w-full sm:w-7/12 text-center sm:text-right">
            <input on:input="{queryWriting}" type="text" autocomplete="off" placeholder="🔍 Search... (# for hashtags)" class="text-base bg-gray-100 border-gray-200 focus:ring-gray-300 dark:bg-vdpink py-2 px-4 rounded-md border dark:border-dpink dark:text-pink-50 dark:placeholder-pink-200 dark:placeholder-opacity-50 focus:outline-none focus:ring-2 dark:focus:ring-dpink w-full max-w-xs" bind:value="{search}" />
        </form>
    </div>
    {#if tags || search}
    <div class="flex flex-wrap items-center justify-center mt-4 sm:mt-0" transition:fly|local="{{ y: -10, duration: 50 }}">
        <span>Showing items by</span>
        {#if search && search[0] != "#"}
        <span class="flex items-center ml-1">
            Search: {search}
            <button class="bg-white rounded-full inline-flex items-center justify-center focus:outline-none w-5 h-5 lg:w-7 lg:h-7 relative ml-2 mr-1" on:click="{() => {
                search = "";
                queryWriting();
            }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute -top-1 -left-1 h-7 w-7 lg:h-9 lg:w-9 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </button>
        </span>
        {/if}
        {#if tags || search[0] == "#"}
        <span class="flex items-center ml-1">
            Tag: {(tags == "" ? 'empty':tags)}
            <button class="bg-white rounded-full inline-flex items-center justify-center focus:outline-none w-5 h-5 lg:w-7 lg:h-7 relative ml-2" on:click="{() => {
                tags = "";
                if(search[0] == "#"){
                    search = "";
                }
                queryWriting();
            }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute -top-1 -left-1 h-7 w-7 lg:h-9 lg:w-9 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </button>
        </span>
        {/if}
    </div>
    {/if}
    <div class="lists flex flex-wrap pt-2 pb-4 -mx-2">
        {#if writings == "memuat..."}
        <Exception on="loading" margin="mt-8 sm:mt-0" />
        {:else if writings != "error"}
        {#each writings as data, i}
        <div class="w-6/12 lg:w-4/12 xl:w-3/12 p-2">
            <div class="relative bg-white border-gray-100 dark:bg-dbluegray p-4 pb-10 rounded-lg border dark:border-vdpink h-full duration-500" aos="true" aos-offset="50" aos-on="fade-up" aos-tolerance="third">
                {#if data.thumbnail}
                <div class="w-full relative overflow-hidden border border-gray-100 dark:border-mbluegray rounded-lg bg-gray-300 dark:bg-vdpink">
                    <img src="{data.thumbnail}" alt="{data.title}" class="w-0 object-cover max-h-60" on:load="{(e) => {e.target.classList.remove("w-0");e.target.classList.add("w-full")}}">
                </div>
                {/if}
                <a use:link href="/{on}/{data.slug}" class="block mt-2"><h3 class="font-bold text-xl md:text-2xl">{data.title}</h3></a>
                <p class="md:text-lg">{data.description}</p>
                <div>
                    {#each data.tags as tag}
                    <span on:click="{() => { tags = (tag ? tag:""); queryWriting() }}" class="inline-block mt-2 mr-2 py-1 px-2 bg-gray-100 dark:bg-mbluegray rounded cursor-pointer text-sm lg:text-base">{(tag ? tag:'other')}</span>
                    {/each}
                </div>
                <span class="text-xs sm:text-sm opacity-80 absolute right-4 bottom-3">{setTime2(data.time)}</span>
            </div>
        </div>
        {:else}
        <Exception on="empty" margin="mt-8 sm:mt-0" />
        {/each}
        {:else}
        <Exception on="error" margin="mt-8 sm:mt-0" />
        {/if}
    </div>  
</div>

<style>
    @media(max-width: 500px){
        .lists > div{
            width: 100%!important;
        }
    }
</style>