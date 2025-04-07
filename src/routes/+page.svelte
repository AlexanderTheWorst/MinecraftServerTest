<script>
    import Sidebar from "@components/Reusable/Sidebar.svelte";
    
    import { writable } from "svelte/store";

    let app_data = writable({
        current_page: "system_details"
    });
</script>

<div class="w-screen min-h-screen bg-primary flex">
    <Sidebar app_data={app_data} />
    <section class="container w-full min-h-screen">
        <h2>{$app_data.current_page}</h2>
    </section>
</div>