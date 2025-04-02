<script>
    import Test from "@components/test.svelte";
    import Logs from "./components/logs.svelte";

    import Listener from "eventemitter2";
    

    let socket = new WebSocket("ws://localhost:8080/ws", "ws")
    window.ws = socket;
    window.ServerListener = new Listener();
    console.log(window.ServerListener)

    ws.addEventListener("message", (data) => {
        console.log(data)
        let payload = JSON.parse(data.data);
        console.log(payload.type)
        window.ServerListener.emit(payload.type, payload.data);
    })

    // socket.addEventListener("message", console.log)
    // socket.onopen = () => {
    //     console.log(socket);
    //     int = setInterval(() => socket.send("test!!"), 1000)
    // }
    // socket.onclose = () => {
    //     console.log("Close!");
    //     clearInterval(int);
    // }
    // socket.onerror = (err) => console.warn(err);
    // socket.onmessage = (msg) => console.log(msg);
</script>

<main class="absolute">
    <Test test="gay" />
    <Logs />
</main>

<style>
    
</style>