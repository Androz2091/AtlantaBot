const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", {
    token: require("./config").token,
    totalShards: require("./config").shardCount,
    shardArgs: [ ...process.argv, ...[ '--sharded' ] ]
});

manager.spawn();