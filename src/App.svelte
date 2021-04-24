<script>
	import { Router, Route, link } from "svelte-navigator";
	import Loadable from "svelte-loadable";
	//
	import Header from "./components/Header.svelte";
	import Exception from "./components/Exception.svelte";
import Footer from "./components/Footer.svelte";
	//
</script>

<div id="app" class="font-default text-gray-700">
<Router primary="{false}">
	<Header />
	<Route path="/">
		<Loadable loader="{() => import("./pages/Home.svelte")}">
			<div slot="loading"><Exception on="loading" /></div>
		</Loadable>
	</Route>
	<Route path="/product">
		<Loadable loader="{() => import("./pages/Products/Home.svelte")}">
			<div slot="loading"><Exception on="loading" /></div>
		</Loadable>
	</Route>
	<Route path="/product/detail">
		<Loadable loader="{() => import("./pages/Products/Detail.svelte")}">
			<div slot="loading"><Exception on="loading" /></div>
		</Loadable>
	</Route>
	<Footer />
</Router>
</div>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>