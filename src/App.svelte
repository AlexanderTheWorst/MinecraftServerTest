<script>
    import Test from "@components/test.svelte";
    import Logs from "./components/logs.svelte";
    import Navbar from "./components/Navbar.svelte";

    import Listener from "eventemitter2";
    
    let socket = new WebSocket("ws://localhost:8080/ws", "ws")
    window.ws = socket;
    window.ServerListener = new Listener();

    window.ServerListener.on("server:send:start", () => {
        console.log("ATTEMPT!")
    })

    socket.onopen = () => {
        socket.send(JSON.stringify({
            type: "connection:ready",
            data: {}
        }));
    }

    socket.addEventListener("message", (data) => {
        let payload = JSON.parse(data.data);
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

<main class="absolute flex flex-col items-center w-screen min-h-screen bg-primary">
    <Navbar />
    <section>
        <Logs />
    </section>
</main>

<style>
    
</style>