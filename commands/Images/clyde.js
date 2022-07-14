const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

class Clyde extends Command {
	constructor (client) {
		super(client, {
			name: "clyde",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "text",
					description: "the text you want to echo to clyde",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		const text = interaction.options.getString("text")

		if(!text){
			return interaction.error("images/clyde:MISSING_TEXT");
		}

		const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, "clyde.png");
			interaction.reply(attachment);
			m.deleteReply();
		} catch(e){
			console.log(e);
			m.error("misc:ERROR_OCCURRED", null, {
				edit: true
			});
		}

	}

}

module.exports = Clyde;