<script>
    import Sidebar from "@components/core/Sidebar.svelte";
    import { browser } from "$app/environment"
    import { onDestroy, onMount } from "svelte";

    import { writable } from "svelte/store";

    let app_data = writable({
        current_page: "server_details",
    });

    let current_page;
    let loaded_pages = {};
    const pages = import.meta.glob("@components/pages/*.svelte");

    for (let page in pages) {
        (pages[page]()).then((mod) => {
            if (mod.meta && mod.meta.key) {
                let key = mod.meta.key;
                loaded_pages[key] = mod.default;
            }
        })
    }

    $: if ($app_data.current_page) {
        if (loaded_pages[$app_data.current_page]) current_page = loaded_pages[$app_data.current_page];
        else {
            current_page = loaded_pages["404"];
        }
    } else {
        current_page = undefined;
    }

    onMount(() => {
        if (browser) {
            console.log("Client!");
        }

        onDestroy(() => {})
    })
</script>

<div class="w-screen min-h-screen bg-primary flex">
    <Sidebar {app_data} />
    <section class="container w-full min-h-screen flex flex-col">
        {#if current_page}
            <svelte:component
                this={current_page}
                {app_data}
                class="flex-1"
            />
        {/if}
    </section>
</div>
