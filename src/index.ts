import * as Sentry from "@sentry/node";
import mongoose from "mongoose";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { DefaultExtractors } from "@discord-player/extractor";

import { config } from "./config.js";
import Atlanta from "./base/Atlanta.js";
import loadLanguages from "./helpers/languages.js";
import { Command } from "./base/Command.js";

if (config.apiKeys.sentryDSN) {
	try {
		Sentry.init({ dsn: config.apiKeys.sentryDSN });
	} catch (e) {
		console.log(e);
		console.log(
			chalk.yellow(
				"Looks like your Sentry DSN key is invalid. If you do not intend to use Sentry, please remove the key from the configuration file."
			)
		);
	}
}

const client = new Atlanta();

const eventMap: Record<string, string> = {
	ready: "ready",
	interactionCreate: "interactionCreate",
	guildCreate: "guildCreate",
	guildDelete: "guildDelete",
	guildMemberAdd: "guildMemberAdd",
	guildMemberRemove: "guildMemberRemove",
	guildMemberUpdate: "guildMemberUpdate",
};

async function init(): Promise<void> {
	const commandsDir = path.join(import.meta.dirname, "commands");
	const categories = await fs.readdir(commandsDir);

	client.logger.log(`Loading a total of ${categories.length} categories.`, "log");

	const isLoadable = (f: string) => f.endsWith(".js") && !f.endsWith(".d.ts");

	for (const category of categories) {
		const categoryPath = path.join(commandsDir, category);
		const stat = await fs.stat(categoryPath);
		if (!stat.isDirectory()) continue;

		const files = (await fs.readdir(categoryPath)).filter(isLoadable);
		for (const file of files) {
			try {
				const filePath = path.join(commandsDir, category, file);
				const imported = await import(filePath);
				const CommandClass = imported.default;
				const cmd: Command = new CommandClass(client);
				cmd.help.category = category;
				client.logger.log(`Loading Command: ${cmd.help.name}.`, "log");
				client.commands.set(cmd.help.name, cmd);
			} catch (e) {
				client.logger.log(`Unable to load command ${file}: ${e}`, "error");
			}
		}
	}

	const eventsDir = path.join(import.meta.dirname, "events");
	const eventFiles = (await fs.readdir(eventsDir)).filter(isLoadable);
	client.logger.log(`Loading a total of ${eventFiles.length} events.`, "log");

	for (const file of eventFiles) {
		const eventName = file.replace(/\.js$/, "");
		client.logger.log(`Loading Event: ${eventName}`);
		const imported = await import(path.join(eventsDir, file));
		const EventClass = imported.default;
		const event = new EventClass(client);
		client.on(eventName, (...args: unknown[]) => event.run(...args));
	}

	// discord-player v7 no longer auto-loads extractors; register the default set
	// so the music commands can resolve and stream sources.
	await client.player.extractors.loadMulti(DefaultExtractors);
	client.logger.log("Loaded discord-player default extractors.", "log");

	await client.login(config.token);

	await mongoose.connect(config.mongoDB);
	client.logger.log("Connected to the MongoDB database.", "log");

	client.translations = await loadLanguages();
}

init().catch((err) => {
	console.error("Failed to start:", err);
	process.exit(1);
});

client
	.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("error", (e) => client.logger.log(String(e), "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

process.on("unhandledRejection", (err) => {
	console.error(err);
});
