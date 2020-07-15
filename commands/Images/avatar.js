const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Avatar extends Command {
	constructor (client) {
		super(client, {
			name: "avatar",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args) {

		let user = await this.client.resolveUser(args[0]);
		if(!user) user = message.author;
		const avatarURL = user.displayAvatarURL({ size: 512, dynamic: true }).replace(".webp", ".png");
		if(message.content.includes("-v")) message.channel.send("<"+avatarURL+">");
		const attachment = new Discord.MessageAttachment(avatarURL, `avatar.${avatarURL.split(".").pop().split("?")[0]}`);
		message.channel.send(attachment);

	}

}

module.exports = Avatar;