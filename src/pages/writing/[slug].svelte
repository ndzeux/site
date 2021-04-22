<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import axios from "axios";
    import { link, navigate } from "svelte-navigator"
    import { setTime2 } from "../../libs/Time";
    import Exception from "../../components/Exception.svelte";
    //
    export let on;
    export let slug;
    // 
    window.scrollTo(0,0);
    //
    let themeMode = document.querySelector("html").className || 'light';
    document.body.addEventListener("click", e => {
        if(location.pathname.indexOf(slug) > -1){
            if(e.target.getAttribute("aria-label") == "toggle-mode-btn"){
                themeMode = document.querySelector("html").className;
            }
        }
    });
    //
    let writing = "memuat...";
    let tags = [];
    axios.get(`/src/data/${on}/${slug}.json`).then(res => {
        if(res.status == 200){
            writing = res.data;
            tags = writing.tags;         
        } else {
            writing = "error";
        }
    }).catch(err => {
        writing = "error";
        console.log(err);
    });
    //
    let  rwriting = "memuat...", random, checker, first = true, temp;
    $: if(typeof writing == "object" && first){
        first = false;
        axios.get("/src/data/" + on + "/all-" + on + ".json").then(res => {
            if(res.status == 200){
                let start = new Date().getTime();
                rwriting = [], checker = [];
                //
                writing.title.split(" ").forEach(title => {
                    temp = res.data.filter(function(d, z) {
                        return (d.title.indexOf(title) != -1 && d.title != writing.title);
                    });
                    temp.forEach(t => {
                        rwriting.push(t);
                    });
                });
                writing.tags.forEach(tag => {
                    temp = res.data.filter(function(d, z) {
                        return d.tags.indexOf(tag) != -1 && d.title != writing.title;
                    });
                    temp.forEach(t => {
                        rwriting.push(t);
                    });
                });
                for(let i = 0; i < rwriting.length; i++){
                    for(let j = 0; j < rwriting.length; j++){
                        if(rwriting[i] == rwriting[j] && i != j){
                            rwriting.splice(i, 1);
                        }
                    }
                }
                // pick 4
                temp = rwriting;
                rwriting = [];
                for(let i = 0; i < 4;){
                    random = Math.floor(Math.random() * (temp.length < 4 ? 4:temp.length));
                    if(checker.indexOf(random) != -1){
                        continue;
                    }
                    checker.push(random);
                    rwriting.push(temp[random]);
                    i++;
                }
                if(rwriting.every(s => !s)){
                    rwriting = [];
                }
            } else {
                rwriting = "error";
            }
        }).catch(err => {
            console.log(err);
            rwriting = "error";
        });
    }
    //
    let showtitle = (window.pageYOffset > 200 ? false:true);
    window.addEventListener("scroll", () => {
        if(window.pageYOffset > 50){
            showtitle = false;
        } else {
            showtitle = true;
        }
    });
    // styling js
    $: if(writing != "memuat" && writing != "error"){
        setTimeout(()=>{
            document.querySelectorAll(".post__content img").forEach(img => {
                // `element` is the element you want to wrap
                let parent = img.parentNode;
                let wrapper = document.createElement('div');
                wrapper.className = "bg-gray-100 dark:bg-mbluegray rounded-md py-2";
                wrapper.style = "min-height: 200px";
                parent.replaceChild(wrapper, img);
                wrapper.appendChild(img);
            });
        }, 10);
    }
    const startHighlight = () => {
        setTimeout(()=>{
            hljs.highlightAll();
        }, 100);
    }
    //
</script>

<svelte:head>
    <title>{(typeof writing == "object" ? `${writing.title} - `:'')}{on[0].toUpperCase()}{on.slice(1).toLowerCase()} | Ndzeux</title>
    <style>
        .post__content p {
            line-height: 1.75em;
            font-size: 1.125rem
        }

        .post__content>*+*, .post__content p > *+div {
            margin-top: 1rem!important
        }
        .post__content > *:first-child{
            margin-top:0!important;
        }
        .post__content h1 {
            position: relative;
            font-size: 2rem;
            line-height: 1.75em;
        }

        .post__content h2::after, .post__content h3::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
            border-radius: 4px;
            background: var(--bbgc)
        }

        .post__content h2 {
            position: relative;
            line-height: 1.5em;
            padding-bottom: 8px;
            width: max-content;
            font-size: 1.625rem;
        }

        .post__content h3 {
            position: relative;
            font-size: 1.5rem;
            padding-bottom: 4px;
            width: max-content;
            line-height: 2em;
        }

        .post__content img {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
            border-radius: 16px
        }

        .post__content a {
            position: relative;
            display: inline-block;
            text-decoration: none;
            z-index: 5
        }

        .post__content a:hover {
            text-decoration: underline
        }

        .post__content code:not(.post__content pre code) {
            /* font-family: monospace; */
            color: var(--code);
            padding: .125rem .25rem;
            background-color: var(--bgcode);
        }

        .post__content pre {
            font-family: "Monda"!important;
            font-weight: 400;
            border-radius: 4px;
            word-break: break-all;
            word-wrap: break-word;
            border: 1px solid var(--bgcode);
            box-shadow: none;
            color: var(--code)
        }
        .post__content pre > code{
            font-family: "Monda"!important;
            white-space: pre-wrap;
            font-size:16px;
        }

        .post__content ol {
            list-style: auto;
        }

        .post__content ul {
            list-style: none
        }

        .post__content ul li,
        .post__content ol li {
            position: relative;
            font-size: 1.125rem;
            line-height: 1.75em;
            padding-left: 1rem
        }

        .post__content ul li::before {
            content: "\203A";
            font-size: 1.5rem;
            line-height: 1.5em;
            margin-right: .5rem
        }

        .post__content ol li {
            counter-increment: step-counter
        }

        .post__content ol li::before {
            content: counter(step-counter)'.';
            line-height: 1.5em;
            margin-right: .5rem;
        }

        .post__content ul li p,
        .post__content ol li p {
            display: inline-block;
            margin: 0
        }

        .post__content ul li>ul *,
        .post__content ol li>ol * {
            font-size: 1.125rem
        }

        .post__content table {
            width: 100%;
            border-radius: .2rem;
            overflow: hidden;
        }

        .post__content table a {
            transition: all ease-out .2s;
            font-weight: 600;
            line-height: 1.25em;
            font-style: italic
        }

        .post__content table tr {
            /* background-color: var(--bg) */
        }
        .post__content table tr:nth-child(odd) {
            /* background-color: var(--bgcode) */
        }

        .post__content table th {
            background-color: var(--bgcode);
            font-size: 1.25rem;
            border:0!important;
        }

        .post__content table td,
        .post__content table th {
            padding: .75rem 1rem;
            border: 1px solid var(--bgcode);
        }

        .post__content blockquote p {
            font-size: 1.125rem;
            letter-spacing: .02em;
            font-style: italic;
            margin: 1rem 0
        }

        .post__content blockquote p::before {
            content: "“	"
        }

        .post__content blockquote p::after {
            content: " ”"
        }

        .post__content del,
        .post__content del * {
            color: var(--code) !important;
            font-style: italic;
            text-decoration: line-through
        }
        .post__content hr{
            border: 0;
            height: 1px;
            background: var(--bbgc)
        }
        .post__content mark{
            display: inline-block;
            background: #ffc400;
            color: #444;
            padding: 1px 4px;
        }
    </style>
    {#if themeMode == 'dark'}
    <style>
        .hljs{display:block;overflow-x:auto;padding:.5em;color:#abb2bf;background:#304b6a}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,
        .hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-built_in,.hljs-class .hljs-title{color:#e6c07b}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
    </style>
    {:else}
    <style>
        .hljs{display:block;overflow-x:auto;padding:.5em;color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#a626a4}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#50a14f}.hljs-built_in,.hljs-class .hljs-title{color:#c18401}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#986801}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#4078f2}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
    </style>
    {/if}
    <script src="/src/libs/highlight.js" on:load="{startHighlight}"></script>
</svelte:head>

<div class="py-4 pt-60 lg:pt-88">
    {#if writing == "memuat..."}
    <Exception on="loading" />
    {:else if writing != "error"}
    <div class="fixed md:absolute top-16 sm:top-20 left-0 right-0 w-full max-w-6xl rounded-b-3xl mx-auto h-80 lg:h-96 object-cover shadow-md flex items-center justify-center bg-gray-300 dark:bg-vdpink duration-0 md:duration-500" aos="true" aos-on="fade-down">
        <img src="{writing.thumbnail}" alt="hero" class="object-cover w-full h-full absolute rounded-b-3xl left-0 top-0 right-0 bottom-0 z-10" loading="lazy" />
        {#if showtitle}
        <div class="relative z-20 text-center px-4" style="text-shadow: 0 2px 4px #000000f0;">
            <h1 class="-mt-16 lg:-mt-32 font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-snug sm:leading-snug lg:leading-snug" in:fade out:fade|local>{writing.title}</h1>
            <span class="text-sm lg:text-base text-white" in:fade out:fade|local>{setTime2(writing.time)}</span>
            <div in:fade out:fade|local>
                {#each tags as tag}
                <span on:click="{() => navigate(`/${on}#` + (tag ? tag:'other'))}" class="inline-block mt-2 mr-2 py-1 px-2 bg-mbluegray text-white rounded cursor-pointer text-sm lg:text-base">{(tag ? tag:'other')}</span>
                {/each}
            </div>
        </div>
        {/if}
    </div>
    <div class="bg-white dark:bg-dbluegray p-4 border-0 border-t border-b border-gray-100 dark:border-vdpink rounded-3xl md:border md:max-w-3xl mx-auto relative z-10 duration-500" aos="true" aos-on="fade-up">
        <div class="post__content">
            {@html writing.body}
            <hr>
        </div>
        <div class="mt-4 relative" style="min-height: 200px;">
            <h3 class="font-bold pr-6">Related Writing</h3>
            {#if rwriting == "memuat..."}
            <Exception on="loading" />
            {:else if rwriting != "error"}
            {#each rwriting as data, i}
            {#if data}
            <div class="w-full sm:w-6/12 p-2">
                <div class="relative bg-white border-gray-100 dark:bg-dbluegray p-4 pb-10 rounded-lg border dark:border-vdpink h-full" in:fly="{{ y: 25, delay: (25*(i+1)) }}">
                    {#if data.thumbnail}
                    <div class="w-full h-56 relative overflow-hidden border border-gray-100 dark:border-mbluegray rounded-lg bg-gray-300 dark:bg-vdpink">
                        <img src="{data.thumbnail}" alt="{data.title}" class="w-0 object-cover h-full" on:load="{(e) => {e.target.classList.remove("w-0");e.target.classList.add("w-full")}}">
                    </div>
                    {/if}
                    <a href="/{on}/{data.slug}" on:click|preventDefault="{() => {
                        navigate(`/${on}`);
                        setTimeout(()=>{
                            navigate(`/${on}/${data.slug}`)
                        }, 5);
                    }}" class="block mt-2"><h3 class="font-bold text-xl md:text-2xl">{data.title}</h3></a>
                    <p class="md:text-lg">{data.description}</p>
                    <div>
                        {#each data.tags as tag}
                        <span on:click="{() => navigate("/writing#" + (tag ? tag:'other'))}" class="inline-block mt-2 mr-2 py-1 px-2 bg-gray-100 dark:bg-mbluegray rounded cursor-pointer text-sm lg:text-base">{(tag ? tag:'other')}</span>
                        {/each}
                    </div>
                    <span class="text-xs sm:text-sm opacity-80 absolute right-4 bottom-3">{setTime2(data.time)}</span>
                </div>
            </div>
            {/if}
            {:else}
            <Exception on="empty" />
            {/each}
            {:else}
            <Exception on="error" />
            {/if}
        </div>
        <br>
        <div>
            <h3 class="font-bold pr-6">Comments</h3>
            <div class="relative" style="min-height: 200px;">
                {#if themeMode == 'dark'}
                <div>
                    <Exception on="loading" />
                    <script src="https://utteranc.es/client.js"
                        repo="ndzeux/comments"
                        issue-term="pathname"
                        label="💬 utterances bot"
                        theme="icy-dark"
                        crossorigin="anonymous"
                        async>
                    </script>
                </div>
                {:else}
                <div>
                    <Exception on="loading" />
                    <script src="https://utteranc.es/client.js"
                        repo="ndzeux/comments"
                        issue-term="pathname"
                        label="💬 utterances bot"
                        theme="github-light"
                        crossorigin="anonymous"
                        async>
                    </script>
                </div>
                {/if}
            </div>
        </div>
    </div>
    {:else}
    <Exception on="empty" />
    {/if}
</div>