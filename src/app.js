const { spawn } = require("child_process");
const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let cmd = spawn("C:\\Program Files\\Java\\jdk-24\\bin\\java", ["-Xmx1024M", "-Xms1024M", "-jar", "C:\\Users\\alexander.backman3\\Downloads\\Server\\server.jar", "nogui"], {
    stdio: "pipe",
    detached: false,
    cwd: "C:\\Users\\alexander.backman3\\Downloads\\Server"
});

cmd.stdout.addListener("data", (buffer) => {
    console.log(buffer.toString());
})

cmd.stderr.addListener("data", (buffer) => {
    console.log(buffer.toString());
})

const askQuestion = (query) => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

const main = async () => {
    while (true) {
        const input = await askQuestion(""); // Wait for input
        cmd.stdin.write(`${input}\n`);
    }
};

main();