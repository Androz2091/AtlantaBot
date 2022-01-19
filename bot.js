const { ShardingManager } = require('discord.js');
const { token } = require('./config.js')

const manager = new ShardingManager('./bot.js', { token: token });

manager.on('shardCreate', shard => console.log(`New Shard Launched: Shard ${shard.id}`));

manager.spawn();
