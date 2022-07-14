const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Avatar extends Command {
	constructor (client) {
		super(client, {
			name: "avatar",
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
					description: "the user you want the avatar",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		let user = await interaction.options.getMember("user")
		if(!user) user = interaction.member;
		const avatarURL = user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' });
		if(interaction.content.includes("-v")) interaction.reply("<"+avatarURL+">");
		const attachment = new Discord.MessageAttachment(avatarURL, `avatar.${avatarURL.split(".").pop().split("?")[0]}`);
		interaction.reply(attachment);

	}

}

module.exports = Avatar;
