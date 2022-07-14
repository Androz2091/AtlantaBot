const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	canvacord = require("canvacord");

class Trash extends Command {
	constructor (client) {
		super(client, {
			name: "trash",
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
					name: "user",
					description: "the user you want to trash",
					required: true,
					type: "USER"
				}
			]
		});
	}

	async run (interaction) {

		const user = await interaction.options.getMember("user");
		const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const buffer = await canvacord.Canvas.trash(user.displayAvatarURL({ format: "png", size: 512 }));
		const attachment = new Discord.MessageAttachment(buffer, "trash.png");
		m.deleteReply();
		interaction.reply(attachment);

	}

}

module.exports = Trash;