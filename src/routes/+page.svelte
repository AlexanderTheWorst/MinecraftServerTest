<script>
    import Sidebar from "@components/core/Sidebar.svelte";

    let current_page;
    const pages = import.meta.glob("@components/pages/*.svelte");
    $: if ($app_data.current_page) {
        let target = Object.keys(pages).find((path) =>
            path.toLowerCase().includes(`${$app_data.current_page}.svelte`),
        );

        if (target) pages[target]().then((mod) => (current_page = mod.default));
        else {
            target = Object.keys(pages).find((path) =>
                path.toLowerCase().includes(`404.svelte`),
            );
            pages[target]().then((mod) => (current_page = mod.default));
            console.warn("Error! Target page does not exist in src/Pages");
        }
    } else {
        current_page = undefined;
    }

    import { writable } from "svelte/store";

    let app_data = writable({
        current_page: "system_details",
    });
</script>

<div class="w-screen min-h-screen bg-primary flex">
    <Sidebar {app_data} />
    <section class="container w-full min-h-screen flex flex-col">
        <h2>{$app_data.current_page}</h2>
        {#if current_page}
            <svelte:component this={current_page} app_data={app_data}; class="flex-1" />
        {/if}
        <!-- {#each Object.keys(loaded_pages) as page}
            <svelte:component this={loaded_pages[page]} />
        {/each} -->
    </section>
</div>
