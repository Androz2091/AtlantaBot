const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {
	constructor (client) {
		super(client, {
			name: "dictator",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate) {

		const user = await this.client.resolveUser(args[0]) || interaction.user;
		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const buffer = await this.client.AmeAPI.generate("dictator", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
		const attachment = new Discord.MessageAttachment(buffer, "dictator.png");
		m.delete();
		message.channel.send(attachment);

	}

};
