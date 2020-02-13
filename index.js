const { Client } = require("veza");
const Cluster = require("./src");
const config = require("./config");

if (!config.clustered) new Cluster(undefined);
else {
    const node = new Client(`atlantabot-shard-${process.env.SHARDS}`)
        .on("error", (error, client) =>
            console.error(`[IPC] Error from ${client.name}:`, error)
        )
        .on("disconnect", client =>
            console.error(`[IPC] Disconnected from ${client.name}`)
        )
        .on("ready", async client => {
            console.log(`[IPC] Connected to: ${client.name}`)
        });

    node.connectTo(config.nodePort).catch(error =>
        console.error("[IPC] Disconnected!", error)
    );

    const client = new Cluster(node);

    node.on("message", async message => {
        if (message.data.event === "collectData") {
            message.reply(eval(`client.${message.data.data}`));
        } else if (message.data.event === "shardCount") {
            message.reply(client.shardCount);
        }
    });
}
