const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class BatSlap extends Command {
	constructor (client) {
		super(client, {
			name: "batslap",
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

		const users = [
			await this.client.resolveUser(args[0]) || message.author,
			await this.client.resolveUser(args[1]) || message.author
		];
		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const buffer = await this.client.AmeAPI.generate("batslap", { avatar: users[0].displayAvatarURL({ format: "png", size: 512 }), url: users[1].displayAvatarURL({ format: "png", size: 512 }) });
		const attachment = new Discord.MessageAttachment(buffer, "batslap.png");
		m.delete();
		message.channel.send(attachment);

	}

}

module.exports = BatSlap;
