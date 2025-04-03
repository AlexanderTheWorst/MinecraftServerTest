<script>
  import { onMount } from "svelte";

  let { ws, ServerListener } = window;
  let logs = [];
  let server_data = {};

  ServerListener.on("data:log", (data) => {
    console.log(data);
    logs = [...logs, data];
  });

  ServerListener.on("data:status", (status) => {
    console.log(status);
  });

  onMount(() => {
    let main = document.querySelector("#LOGS_MAIN");
    let input = document.querySelector("#LOGS_INPUT");

    main.addEventListener("click", (ev) => {
      console.log(document.hasFocus(input))
        // Ensure clicks anywhere inside `main` focus the input
        if (document.activeElement !== input) {
            input.focus();
        }
    });

    input.addEventListener("mousedown", (ev) => {
        // Allow focus behavior for clicks inside the input itself
        ev.stopPropagation();
    });

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
        input.style.setProperty("--CURSOR_TEXT", `"${on_cursor || ""}"`);
      }
    });

    // Prevent adding new lines when pressing Enter
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        ws.send(
          JSON.stringify({
            type: "data:send",
            data: input.textContent,
          }),
        );
        input.textContent = "";
        input.style.setProperty("--PRE_CURSOR_TEXT", `${0}`);
        input.style.setProperty("--CURSOR_TEXT", `""`);
      }
    });
  });
</script>

<main id="LOGS_MAIN" class="bg-[black] text-[white]">
  <!-- {#each logs as log}
    <p>{log}</p>
  {/each} -->
  <pre>{logs.join("")}</pre>
  <span id="LOGS_INPUT" contenteditable="true">asdsad</span>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap');

  :root {
    font-family: 'Noto Sans Mono', monospace;
  }

  #LOGS_MAIN {
    background-color: black;
    width: 100vw;
    height: 90vh;
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    overflow-y: scroll;
    user-select: none;
  }

  #LOGS_MAIN > pre {
    user-select: text;
  }

  #LOGS_INPUT {
    /* font-size: 1.25rem; */
    position: relative; /* Keeps caret within the bounds of the input */
    caret-color: transparent; /* Hides default caret */
    display: flex;
    align-items: center;
    outline: none;
    border: none;
  }

  #LOGS_INPUT:focus::before {
    /* content: "█"; */
    background-color: white;
  }

  #LOGS_INPUT::before {
    display: block;
    content: ""; /* var(--PRE_CURSOR_TEXT); */ /* Custom text before the cursor */
    position: absolute; /* Absolute position to lay over the text */
    left: 0; /* Align at the left */
    height: 100%; /* Same height as the parent input */
    border: 1px solid white;
    background-color: transparent;
    z-index: 1; /* Ensures the caret stays on top of the text */
    pointer-events: none; /* Prevents caret from interfering with input */
    white-space: nowrap; /* Prevent wrapping */
    display: inline-block;
    width: 1ch;
    height: 2ch;
    margin-left: calc(var(--PRE_CURSOR_TEXT) * 1ch);
  }

  #LOGS_INPUT:focus:after {
    display: block;
    content: var(
      --CURSOR_TEXT
    ); /* var(--PRE_CURSOR_TEXT); */ /* Custom text before the cursor */
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
