const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Jail extends Command {
	constructor (client) {
		super(client, {
			name: "jail",
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

		const user = await this.client.resolveUser(args[0]) || message.author;
		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const buffer = await this.client.AmeAPI.generate("jail", { url: user.displayAvatarURL({ format: "png", size: 1024 }) });
		const attachment = new Discord.MessageAttachment(buffer, "jail.png");
		m.delete();
		message.channel.send(attachment);

	}

}

module.exports = Jail;