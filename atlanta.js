require("./helpers/extenders");

const { ShardingManager } = require('discord.js');
const { token } = require('./config.js');

/* const Sentry = require("@sentry/node");
const chalk = require("chalk");

const config = require("./config");
 if(config.apiKeys.sentryDSN){
	try {
		Sentry.init({ dsn: config.apiKeys.sentryDSN });
	} catch (e) {
		console.log(e);
		console.log(chalk.yellow("Looks like your Sentry DSN key is invalid. If you do not intend to use Sentry, please remove the key from the configuration file."));
	}
} */

// Load Atlanta class
const Atlanta = require("./base/Atlanta"),
	client = new Atlanta();

client.init().catch(console.error);


const manager = new ShardingManager('./atlanta.js', { token: token });

manager.on('shardCreate', shard => console.log(`New Shard Launched: Shard ${shard.id}`));

manager.spawn();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
	console.error(err);
});
