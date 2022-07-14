const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	canvacord = require("canvacord");

class Bed extends Command {
	constructor (client) {
		super(client, {
			name: "bed",
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
					name: "firstuser",
					description: "the first user",
					type: "USER",
					required: true
				},
				{
					name: "seconduser",
					description: "the user user",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction) {
        
		const users = [
			await interaction.options.getMember("firstuser"),
			await interaction.options.getMember("seconduser")
		];

		const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		try {
			const buffer = await canvacord.Canvas.bed(users[0].displayAvatarURL({ format: "png" }), users[1].displayAvatarURL({ format: "png" }));
			const attachment = new Discord.MessageAttachment(buffer, "bed.png");
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

module.exports = Bed;