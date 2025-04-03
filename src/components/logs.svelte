<script>
  import { onMount } from "svelte";

  let { ws, ServerListener } = window;
  let logs = [];

  ServerListener.on("data:log", (data) => {
    logs = [...logs, data];
  });

  onMount(() => {
    let input = document.querySelector("#input");

    // Handle selectionchange event
    document.addEventListener("selectionchange", (ev) => {
      let selection = window.getSelection();
      if (
        (selection.anchorNode.parentElement == input ||
          selection.anchorNode == input) &&
        selection.type == "Caret"
      ) {
        let pre_cursor = selection.anchorNode.textContent
          .substr(0, selection.focusOffset)
          .split("").length;
        let on_cursor = selection.anchorNode.textContent
          .substr(0, selection.focusOffset + 1)
          .split("")[selection.focusOffset];
        input.style.setProperty("--PRE_CURSOR_TEXT", `${pre_cursor}`);
        input.style.setProperty(
          "--CURSOR_TEXT",
          `"${on_cursor || ""}"`
        );
      }
    });

    // Prevent adding new lines when pressing Enter
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        ws.send(JSON.stringify({
          type: "data:send",
          data: input.textContent
        }));
        input.textContent = "";
        input.style.setProperty("--PRE_CURSOR_TEXT", `${0}`);
        input.style.setProperty(
          "--CURSOR_TEXT",
          `""`
        );
      }
    });
  });
</script>

<main class="bg-[black] text-[white]">
  {#each logs as log}
    <p>{log}</p>
  {/each}
  <span id="input" contenteditable="true">asdsad</span>
</main>

<style>
  main {
    background-color: black;
    width: 500px;
    min-height: 500px;
    padding: 10px;
  }

  #input {
    font-family: monospace;
    font-size: 1.25rem;
    position: relative; /* Keeps caret within the bounds of the input */
    caret-color: transparent; /* Hides default caret */
    height: fit-content;
    display: flex;
  }

  #input::before {
    display: block;
    content: "█"; /* var(--PRE_CURSOR_TEXT); */ /* Custom text before the cursor */
    position: absolute; /* Absolute position to lay over the text */
    left: 0; /* Align at the left */
    height: 100%; /* Same height as the parent input */
    width: fit-content; /* Dynamically adjusts to content length */
    color: white; /* Or any color for the caret */
    z-index: 1; /* Ensures the caret stays on top of the text */
    pointer-events: none; /* Prevents caret from interfering with input */
    white-space: nowrap; /* Prevent wrapping */
    display: inline-block;
    padding-left: calc(var(--PRE_CURSOR_TEXT) * 1ch);
  }

  #input::after {
    display: block;
    content: var(--CURSOR_TEXT); /* var(--PRE_CURSOR_TEXT); */ /* Custom text before the cursor */
    position: absolute; /* Absolute position to lay over the text */
    left: 0; /* Align at the left */
    height: 100%; /* Same height as the parent input */
    width: fit-content; /* Dynamically adjusts to content length */
    color: black; /* Or any color for the caret */
    z-index: 1; /* Ensures the caret stays on top of the text */
    pointer-events: none; /* Prevents caret from interfering with input */
    white-space: nowrap; /* Prevent wrapping */
    display: inline-block;
    padding-left: calc(var(--PRE_CURSOR_TEXT) * 1ch);
  }
</style>
