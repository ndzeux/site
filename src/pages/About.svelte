<script>
    import { fade, fly } from "svelte/transition";

    let showtitle = (window.pageYOffset > 24 ? false:true);
    window.addEventListener("scroll", () => {
        if(window.pageYOffset > 72){
            showtitle = false;
        } else {
            showtitle = true;
        }
    });
</script>

<svelte:head>
    <title>About Me | Ndzeux</title>
</svelte:head>

<div class="py-4 pt-60 lg:pt-88">
    <div class="fixed md:absolute top-16 sm:top-20 left-0 right-0 w-full max-w-6xl rounded-b-3xl mx-auto h-80 lg:h-96 object-cover shadow-md flex items-center justify-center bg-gray-300 dark:bg-vdpink">
        <img src="/src/img/hero-j1.jpg" alt="hero" class="object-cover w-full h-full absolute rounded-b-3xl left-0 top-0 right-0 bottom-0 z-10" loading="lazy" />
        {#if showtitle}
        <h1 class="-mt-16 lg:-mt-32 font-bold text-3xl sm:text-4xl lg:text-5xl text-white relative z-20" style="text-shadow: 0 2px 4px #000000f0;" in:fade out:fade|local>About Me</h1>
        {/if}
    </div>
    <div class="bg-white dark:bg-dbluegray p-4 border-0 border-t border-b border-gray-100 dark:border-vdpink rounded-3xl space-y-1 md:border md:max-w-3xl mx-auto relative z-10" aos="true" aos-on="fade-up" aos-offset="100">
        <h2 class="text-xl sm:text-2xl inline-block pr-8 pb-2 bbg">🏄🏻‍♂️ Hi There,</h2>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat.
        </p>
        <h2 class="text-xl sm:text-2xl inline-block pr-8 pb-2 mt-1 bbg">🚣🏻‍♂️ Background</h2>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, distinctio temporibus iste soluta nihil assumenda, laboriosam consequatur magnam eligendi ipsam praesentium dolor fugiat repellendus. Laudantium dicta quo at velit repellat. 
        </p>
        <h2 class="text-xl sm:text-2xl inline-block pr-8 pb-2 mt-1 bbg">🏊🏻‍♂️ Skill</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere officia sit iusto. Cupiditate, temporibus natus fuga alias libero obcaecati sequi beatae modi. Ipsam doloremque dolorem rem nobis, molestias eligendi non!
        </p>
        <h2 class="text-xl sm:text-2xl inline-block pr-8 pb-2 mt-1 bbg">🚴🏻‍♂️ Setup</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia ut error maiores earum fugit, quos et cum asperiores dignissimos, iure quisquam omnis quidem cupiditate repellendus obcaecati tempore, sequi accusantium?
        </p>
        <h2 class="text-xl sm:text-2xl inline-block pr-8 pb-2 mt-1 bbg">🧗🏻‍♂️ Speak</h2>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, illum voluptates praesentium debitis sapiente nam nisi aliquid perferendis nulla ab error quasi labore mollitia consectetur, vel ipsam temporibus quo incidunt.
        </p>
        <h2 class="text-xl sm:text-2xl inline-block pr-8 pb-2 mt-1 bbg">🤸🏻‍♂️ Social</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit reiciendis sunt id neque dolorum quas quos. Reprehenderit itaque accusantium rem libero, labore explicabo dignissimos culpa sit molestias, dicta necessitatibus saepe?
        </p>
    </div>
    <button class="fixed z-20 bottom-4 left-4 flex items-center justify-center text-xs bg-mbluegray dark:bg-vdpink text-pink-50 w-16 h-16 rounded-full shadow focus:outline-none focus:ring-4 focus:ring-dbluegray dark:focus:ring-dpink animate-bounce" in:fly="{{ y: 200, delay: 3000 }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 absolute left-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span class="block -mb-1">CV</span>
    </button>
</div>