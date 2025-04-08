<script context="module">
    export const meta = {
        key: "console",
    };
</script>

<script>
    import { onMount } from "svelte";

    let input_container;

    onMount(() => {
        if (input_container) {
            input_container.addEventListener("change", (e) => console.log)
        }
    });
</script>

<svelte:head>
    <title>Console</title>
</svelte:head>

<main class="h-full">
    <section
        id="__console_window"
        class="border-primary border bg-secondary h-full rounded-[10px] p-[20px] flex flex-col"
    >
        <div id="__console_window_output" class="flex-1"></div>
        <div
            id="__console_window_input"
            class="flex gap-[10px] p-[16px] rounded-[10px] border border-[#272643]"
        >
            <div>
                <p class="text-primary">$</p>
            </div>
            <span
                id="__console_window_input:input"
                bind:this={input_container}
                contenteditable="true">Send command</span
            >
        </div>
    </section>
</main>

<style>
    #__console_window_input {
        background-color: rgb(255 255 255 / 2.5%);

        span {
            height: 100%;
            display: block;
        }

        * {
            user-select: none;
            outline: none;
            border: none;
        }
    }
</style>
