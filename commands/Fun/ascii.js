const Command = require("../../base/Command.js"),
	figlet = require("figlet"),
	util = require("util"),
	figletAsync = util.promisify(figlet);

class Ascii extends Command {

	constructor (client) {
		super(client, {
			name: "ascii",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "text",
					description: "the text you want to render in ascii",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {
		const text = interaction.options.getString("text")
		if (text.length > 20) {
			return interaction.error("fun/ascii:TEXT_MISSING");
		}

		const rendered = await figletAsync(text);
		interaction.reply("```" + rendered + "```");

	}

}

module.exports = Ascii;