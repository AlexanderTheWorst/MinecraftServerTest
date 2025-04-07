<script>
  import Collapse from "@components/Icons/Collapse.svelte";

  let pages = [
    {
      Title: "System",
      Collapsed: false,
      Subpages: [
        { Name: "Server details", Active: true },
        { Name: "Server details", Active: false },
        { Name: "Server details", Active: false },
      ],
    },
    {
      Title: "System",
      Collapsed: false,
      Subpages: [
        { Name: "Server details", Active: false },
        { Name: "Server details", Active: false },
        { Name: "Server details", Active: false },
      ],
    },
  ];
</script>

<main class="bg-secondary min-w-[300px] min-h-screen border-r border-primary">
  <section class="details p-[15px] flex gap-[15px]">
    <img
      src="public/images/DefaultServerIcon.png"
      alt="Server"
      class="image rounded-[6px]"
    />
    <div>
      <p class="!font-medium text-primary">My cool server!</p>
      <p>74.125.193.138:25565</p>
    </div>
  </section>

  <section class="list">
    {#each pages as page}
      <div
        class="pl-[5px] pr-[5px] bg-primary border-t border-primary"
      >
        <section
          role="button"
          tabindex="0"
          aria-pressed={!page.Collapsed}
          on:click={() => {
            page.Collapsed = !page.Collapsed;
            pages = [...pages];
          }}
          on:keydown={() => {}}
          class="page_header p-[10px] flex justify-between text-primary"
        >
          <p>{page.Title}</p>
          <Collapse />
        </section>
        {#if !page.Collapsed}
          <section class="page_subpages pl-[10px] pb-[15px]">
            {#each page.Subpages as subpage}
              <div
                class="pl-[15px] pt-[5px] pb-[5px] border-l border-[#FFFFFF33]"
              >
                <p class={subpage.Active ? "text-primary" : ""}>
                  {subpage.Name}
                </p>
              </div>
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
