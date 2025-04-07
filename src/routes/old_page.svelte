<script lang="js">
  import Logs from "@components/logs.svelte";

  import Listener from "eventemitter2";
  import { onMount } from "svelte";

  import { ws, listener } from "@stores/store"; // import the stores
  let socket = new WebSocket("ws://localhost:8080/ws", "ws");
  let eventListener = new Listener();

  ws.set(socket);
  listener.set(eventListener);

  eventListener.on("server:send:start", () => {
    console.log("ATTEMPT!");
  });

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "connection:ready",
        data: {},
      })
    );
  };

  socket.addEventListener("message", (data) => {
    let payload = JSON.parse(data.data);
    eventListener.emit(payload.type, payload.data);
  });
</script>

<main>
  <Logs {socket} {eventListener} />
</main>
