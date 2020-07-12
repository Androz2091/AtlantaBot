const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

class Ascii extends Command {

	constructor (client) {
		super(client, {
			name: "ascii",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {
		const text = args.join(" ");
		if (!text || text.length > 20) {
			return message.error("fun/ascii:TEXT_MISSING");
		}

		const rendered = await figletAsync(text);
		message.channel.send("```" + rendered + "```");

	}

}

module.exports = Ascii;