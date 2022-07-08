require("./helpers/extenders");

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

// sometimes, application commands don't load when the client is initialized, so we'll try again
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.js');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slash/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands }
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
	console.error(err);
});
