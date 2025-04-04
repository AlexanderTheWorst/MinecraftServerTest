<script>
  import { onMount } from "svelte";

  import { ws, listener } from "@stores/store";

  export let socket;
  export let eventListener;

  let logs = [];
  let server_data = {};

  let main, input;

  onMount(() => {
    console.log(socket, eventListener)

    if (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      typeof input !== "undefined" &&
      typeof main !== "undefined"
    ) {
      console.log(eventListener);
      eventListener.on("server:log", (data) => {
        console.log("Received server:log data:", data);
        logs = [...logs, data];
      });

      eventListener.on("connection:status:reveal", (status) => {
        console.log("Connection status:", status);
        for (let i in status) {
          server_data = { ...server_data, [i]: status[i] };
        }
      });

      if (main) {
        main.addEventListener("click", (ev) => {
          if (document.activeElement !== input) {
            input.focus();
          }
        });
      }

      if (input && socket) {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            console.log(socket);
            socket.send(
              JSON.stringify({
                type: "server:send:command",
                data: input.textContent,
              })
            );
            input.textContent = "";
            input.style.setProperty("--PRE_CURSOR_TEXT", `${0}`);
            input.style.setProperty("--CURSOR_TEXT", `""`);
          }
        });
      }

      if (document) {
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
      }
    }
  });

  function inputLoad() {
    console.log("LOAD");
  }

  // onMount(() => {
  //   // Check if the code is running in the browser
  //   if (

  //   ) {

  //     if (eventListener) {
  //       console.log(eventListener);

  //       eventListener.on("server:log", (data) => {
  //         logs = [...logs, data];
  //         console.log(logs);
  //       });

  //       eventListener.on("connection:status:reveal", (status) => {
  //         for (let i in status) {
  //           server_data = { ...server_data, [i]: status[i] };
  //         }
  //       });
  //     }

  //     if (document) {

  //     }
  //   }
  // });
</script>

<main id="LOGS_MAIN" class="text-[white]" bind:this={main}>
  <section
    id="LOGS_STATUS"
    class="bg-secondary log-status sticky w-full top-[0] p-[10px] flex justify-between"
  >
    <div class="flex items-center gap-[8px]">
      <div
        class="rounded-[10px] w-[10px] h-[10px] bg-[{server_data.alive
          ? 'green'
          : 'red'}]"
      ></div>
      <p>{server_data.alive ? "Active" : "Inactive"}</p>
    </div>
    {#if !server_data.alive}
      <button
        on:click={() => {
          eventListener.emit("server:send:start");
        }}
        id="LOGS_CONTROLS_STATUS">Start</button
      >
    {/if}
  </section>

  <section class="w-100 h-100 p-[10px] bg-secondary overflow-y-scroll">
    <pre class="flex-[1]">{logs.join("")}</pre>
    <div class="flex items-center gap-[1ch]">
      <span>$ </span>
      <span id="LOGS_INPUT" bind:this={input} contenteditable="true"
        >asdsad</span
      >
    </div>
  </section>
</main>

<style lang="scss">
  :root {
  }

  #LOGS_STATUS {
    font-family: "Open Sans", sans-serif;
    font-weight: 500;
    font-size: larger;

    button {
      padding: 10px;
      padding-left: 15px;
      padding-right: 15px;
      background-color: rgb(255 255 255 / 0.075);
      border-radius: 8px;
    }
  }

  #LOGS_MAIN {
    /* background-color: black; */
    width: 100vw;
    height: 90vh;
    position: relative;
    box-sizing: border-box;
    /* overflow-y: hidden; */
    user-select: none;
    font-family: "Noto Sans Mono", monospace;

    gap: 32px;
    display: flex;
    flex-direction: column;

    section {
      width: 100%;
    }

    section:nth-child(2) {
      flex: 1;
    }
  }

  pre {
    user-select: text;
  }

  #LOGS_INPUT {
    /* font-size: 1.25rem; */
    position: relative; /* Keeps caret within the bounds of the input */
    caret-color: transparent; /* Hides default caret */
    display: inline-flex;
    align-items: center;
    outline: none;
    border: none;
    user-select: text;
    min-width: 1ch;
    height: 2ch;
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
