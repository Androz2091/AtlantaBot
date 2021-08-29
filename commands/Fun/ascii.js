const Command = require("../../base/Command.js"),
	figlet = require("figlet"),
	util = require("util"),
	figletAsync = util.promisify(figlet);

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "ascii",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate) {
		const text = args.join(" ");
		if (!text || text.length > 20) {
			return interaction.reply({
				content: translate("fun/ascii:TEXT_MISSING"),
				ephemeral: true
			});
		}

		const rendered = await figletAsync(text);
		message.channel.send("```" + rendered + "```");

	}

};
