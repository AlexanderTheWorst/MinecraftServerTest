<script>
  import Collapse from "@components/Icons/Collapse.svelte";
  export let app_data;

  let pages = [
    {
      Title: "System",
      Collapsed: false,
      Subpages: [
        { name: "Console", key: "console" },
        { name: "Server Details", key: "server_details" },
      ],
    },
    {
      Title: "Management",
      Collapsed: false,
      Subpages: [
        { name: "Plugin Manager", key: "plugin_manager" },
        { name: "Configuration", key: "configuration" },
        { name: "Scheduler", key: "scheduler" },
      ],
    },
  ];

  function togglePage(page) {
    page.Collapsed = !page.Collapsed;
    pages = [...pages]; // force reactivity
  }

  function selectPage(key) {
    app_data.update((data) => ({ ...data, current_page: key }));
  }
</script>

<main class="bg-secondary min-w-[300px] min-h-screen border-r border-primary">
  <!-- Server Details -->
  <section class="details p-[15px] flex gap-[15px]">
    <img
      src="public//images/DefaultServerIcon.png"
      alt="Server"
      class="image rounded-[6px]"
    />
    <div>
      <p class="!font-medium text-primary">My cool server!</p>
      <p>74.125.193.138:25565</p>
    </div>
  </section>

  <!-- Sidebar Page List -->
  <section class="list">
    {#each pages as page}
      <div class="pl-[5px] pr-[5px] bg-primary border-t border-primary">
        <!-- Page Header -->
        <section
          role="button"
          tabindex="0"
          aria-pressed={!page.Collapsed}
          class="page_header p-[10px] flex justify-between text-primary cursor-pointer"
          on:click={() => togglePage(page)}
          on:keydown={(e) => e.key === "Enter" && togglePage(page)}
        >
          <p>{page.Title}</p>
          <Collapse active={page.Collapsed} />
        </section>

        <!-- Subpages -->
        {#if !page.Collapsed}
          <section
            class="page_subpages flex flex-col items-start pl-[10px] pb-[15px] w-full"
          >
            {#each page.Subpages as subpage}
              <button
                class="pl-[15px] pt-[5px] pb-[5px] w-full border-l border-[#FFFFFF33] text-left cursor-pointer"
                on:click={() => selectPage(subpage.key)}
              >
                <p class={$app_data.current_page === subpage.key ? "text-primary" : ""}>{subpage.name}</p>
              </button>
            {/each}
          </section>
        {/if}
      </div>
    {/each}
  </section>
</main>

<style>
  .image {
    max-width: 75px;
    max-height: 75px;
    width: 10vw;
  }

  .list:last-child {
    border-bottom: 1px solid var(--BORDER-PRIMARY);
  }
</style>
