<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
    import Loadable from "svelte-loadable";
	import { Router, Link, Route } from "svelte-navigator";
	import { aosinit } from "./libs/AOS";
	//
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Exception from "./components/Exception.svelte";
	//
	let webReady;
	//
	window.onload = () => {
		setTimeout(()=>{
			document.body.style.overflow = "";
			webReady = true;
		}, 1000);
	}
	//
	// theme mode
	let themeMode = localStorage.theme;
	//
	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark');
		themeMode = 'dark';
	} else {
		document.documentElement.classList.remove('dark');
		themeMode = '';
	}
	//
	let headerHeight = 0, footerHeight = 0;
	function getHeight(elm){
		return document.querySelector(elm).offsetHeight;
	}
	onMount(()=>{
		headerHeight = getHeight("header");
		footerHeight = getHeight("footer");
		window.addEventListener("resize", () => {
			headerHeight = getHeight("header");
			footerHeight = getHeight("footer");
		})
		//
	});
	//
</script>

<div id="app" class="relative font-default text-base sm:text-lg lg:text-xl bg-gray-50 dark:bg-mbluegray text-gray-600 dark:text-pink-50 min-h-screen" style="min-width: 280px;">
	{#if !webReady}
	<div class="flex justify-center items-center fixed z-50 top-0 right-0 bottom-0 left-0 bg-dbluegray" transition:fade>
		<div class="logoicon w-20 h-20 md:w-28 md:h-28 md:rounded-3xl shadow-xl bg-mbluegray animate-bounce relative" style="border-radius: 24px;">
			<img on:load="{(e) => e.target.style = "width:100%;height:auto"}" src="/src/logo/192.png" alt="Ndzeux" class="relative z-10" style="width:0" />
			<span class="absolute z-0 top-0 right-0 bottom-0 left-0 text-6xl text-white font-bold flex items-center justify-center" style="font-family: sans-serif;">N</span>
		</div>
	</div>
	{/if}
	<Router primary="{false}">
		<Header {themeMode} />
		<div class="pt-16 sm:pt-20" style="min-height: calc(100vh - {footerHeight}px);">
			<Route path="*">
				<Exception on="error" />
			</Route>
			<Route path="/">
				<Loadable loader="{() => import("./pages/Home.svelte")}">
					<div slot="loading"><Exception on="loading" /></div>
				</Loadable>
			</Route>
			<Route path="about">
				<Loadable loader="{() => import("./pages/About.svelte")}">
					<div slot="loading"><Exception on="loading" /></div>
				</Loadable>
			</Route>
			<Route path="writing/*">
				<Route path="/">
					<Loadable loader="{() => import("./pages/writing/Home.svelte")}" on="writing">
						<div slot="loading"><Exception on="loading" /></div>
					</Loadable>
				</Route>
				<Route path=":slug" let:params>
					<Loadable loader="{() => import("./pages/writing/[slug].svelte")}" slug="{params.slug}">
						<div slot="loading"><Exception on="loading" /></div>
					</Loadable>
				</Route>
			</Route>
			<Route path="projects/*">
				<Route path="/">
					<Loadable loader="{() => import("./pages/writing/Home.svelte")}" on="projects">
						<div slot="loading"><Exception on="loading" /></div>
					</Loadable>
				</Route>
				<Route path=":slug" let:params>
					<Loadable loader="{() => import("./pages/writing/[slug].svelte")}" slug="{params.slug}">
						<div slot="loading"><Exception on="loading" /></div>
					</Loadable>
				</Route>
			</Route>
			<Route path="portofolio/*">
				<Route path="/">
					<Loadable loader="{() => import("./pages/writing/Home.svelte")}" on="portofolio">
						<div slot="loading"><Exception on="loading" /></div>
					</Loadable>
				</Route>
				<Route path=":slug" let:params>
					<Loadable loader="{() => import("./pages/writing/[slug].svelte")}" slug="{params.slug}">
						<div slot="loading"><Exception on="loading" /></div>
					</Loadable>
				</Route>
			</Route>
		</div>
		<Footer />
	</Router>
</div>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>