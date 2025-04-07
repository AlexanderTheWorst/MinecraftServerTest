<script>
    let pages = [
        {
            Title: "System",
            Collapsed: false,
            Subpages: [
                {Name: "Server details", Active: true},
                {Name: "Server details", Active: false},
                {Name: "Server details", Active: false}
            ]
        },
        {
            Title: "System",
            Collapsed: false,
            Subpages: [
                {Name: "Server details", Active: true},
                {Name: "Server details", Active: false},
                {Name: "Server details", Active: false}
            ]
        }
    ]
</script>

<main class="bg-secondary w-[300px] min-h-screen border-r border-primary">
    <section class="details">

    </section>

    <section class="list">
        {#each pages as page} 
            <div class="pl-[5px] pr-[5px] pb-[15px] bg-primary border-b border-t border-primary">
                <section class="page_header p-[10px]">
                    <p>{page.Title}</p>
                </section>
                <section class="page_subpages pl-[10px]">
                    {#each page.Subpages as subpage} 
                        <div class="pl-[15px] pt-[5px] pb-[5px] border-l border-[#FFFFFF33]">
                            <p>{subpage.Name}</p>
                        </div>
                    {/each}
                </section>
            </div>
        {/each} 
    </section>
</main>