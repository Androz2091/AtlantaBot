require("./helpers/extenders");

const Sentry = require("@sentry/node"),
	util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir),
	mongoose = require("mongoose"),
	chalk = require("chalk"),
	synchronizeSlashCommands = require("discord-sync-commands");

const config = require("./config");
if(config.apiKeys.sentryDSN){
	try {
		Sentry.init({ dsn: config.apiKeys.sentryDSN });
	} catch (e) {
		console.log(e);
		console.log(chalk.yellow("Looks like your Sentry DSN key is invalid. If you do not intend to use Sentry, please remove the key from the configuration file."));
	}
}

// Load Atlanta class
const Atlanta = require("./base/Atlanta"),
	client = new Atlanta();

const init = async () => {

	const languages = require("./helpers/languages");
	client.translations = await languages();

	// Search for all commands
	const directories = await readdir("./commands/");
	client.logger.log(`Loading a total of ${directories.length} categories.`, "log");
	await Promise.all(directories.map(async (dir) => {
		const commands = await readdir("./commands/"+dir+"/");
		commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
			const response = client.loadCommand("./commands/"+dir, cmd);
			if(response){
				client.logger.log(response, "error");
			}
		});
	}));

	const slashCommands = client.commands.filter((c) => c.conf.options);
	synchronizeSlashCommands(client, slashCommands.map((command) => ({
		name: command.help.name,
		type: "CHAT_INPUT",
		description: client.translations.get("en-US")(`${command.help.category.toLowerCase()}/${command.help.name}:DESCRIPTION`),
		options: command.conf.options.map((opt) => ({
			...opt,
			type: opt.type,
			description: client.translations.get("en-US")(`${command.help.category.toLowerCase()}/${command.help.name}:OPT_${opt.name.toUpperCase()}_DESCRIPTION`),
			options: opt.options?.map((o) => ({
				...o,
				type: opt.type,
				description: client.translations.get("en-US")(`${command.help.category.toLowerCase()}/${command.help.name}:OPT_${o.name.toUpperCase()}_DESCRIPTION`)
			})
			)
		})
		)
	})), {
		debug: true,
		guildId: config.support.id
	});

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
	evtFiles.forEach((file) => {
		const eventName = file.split(".")[0];
		client.logger.log(`Loading Event: ${eventName}`);
		const event = new (require(`./events/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
    
	client.login(client.config.token); // Log in to the discord api

	// connect to mongoose database
	mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
		client.logger.log("Connected to the Mongodb database.", "log");
	}).catch((err) => {
		client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
	});
    
	const autoUpdateDocs = require("./helpers/autoUpdateDocs.js");
	autoUpdateDocs.update(client);

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
	console.error(err);
});
