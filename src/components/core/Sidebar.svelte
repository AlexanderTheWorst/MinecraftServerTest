<script>
  import Collapse from "@components/Icons/Collapse.svelte";
  export let app_data;

  let pages = [
    {
      title: "System",
      collapsed: false,
      subpages: [
        { label: "Console", key: "console" },
        { label: "Server Details", key: "server_details" },
      ],
    },
    {
      title: "Management",
      collapsed: false,
      subpages: [
        { label: "Plugin Manager", key: "plugin_manager" },
        { label: "Configuration", key: "configuration" },
        { label: "Scheduler", key: "scheduler" },
      ],
    },
  ];

  function togglePage(page) {
    page.collapsed = !page.collapsed;
    pages = [...pages];
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
          aria-pressed={!page.collapsed}
          class="page_header p-[10px] flex justify-between text-primary cursor-pointer"
          on:click={() => togglePage(page)}
          on:keydown={(e) => e.key === "Enter" && togglePage(page)}
        >
          <p>{page.title}</p>
          <Collapse active={page.collapsed} />
        </section>

        <!-- Subpages -->
        {#if !page.collapsed}
          <section
            class="page_subpages flex flex-col items-start pl-[10px] pb-[15px] w-full"
          >
            {#each page.subpages as subpage}
              <button
                class="pl-[15px] pt-[5px] pb-[5px] w-full border-l {$app_data.current_page ===
                subpage.key
                  ? 'border-[#FFFFFF]'
                  : 'border-[#FFFFFF33]'} text-left cursor-pointer"
                on:click={() => selectPage(subpage.key)}
              >
                <p
                  class={$app_data.current_page === subpage.key
                    ? "text-primary"
                    : ""}
                >
                  {subpage.label}
                </p>
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

  .list > * {
    user-select: none;
  }
</style>
