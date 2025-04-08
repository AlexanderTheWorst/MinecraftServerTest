<script>
    import Sidebar from "@components/core/Sidebar.svelte";

    import { writable } from "svelte/store";

    let app_data = writable({
        current_page: "server_details",
    });

    let current_page;
    const pages = import.meta.glob("@components/pages/*.svelte");
    $: if ($app_data.current_page) {
        let target = Object.keys(pages).find((path) =>
            path.toLowerCase().includes(`${$app_data.current_page}.svelte`),
        );

        if (target) pages[target]().then((mod) => (current_page = mod.default));
        else {
            import("@components/pages/404.svelte").then(
                (mod) => (current_page = mod.default),
            );
        }
    } else {
        current_page = undefined;
    }
</script>

<div class="w-screen min-h-screen bg-primary flex">
    <Sidebar {app_data} />
    <section class="container w-full min-h-screen flex flex-col">
        {#if current_page}
            <svelte:component
                this={current_page}
                app_data="{app_data};"
                class="flex-1"
            />
        {/if}
    </section>
</div>
