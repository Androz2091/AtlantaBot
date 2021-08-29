const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {
	constructor (client) {
		super(client, {
			name: "jail",
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
		const buffer = await this.client.AmeAPI.generate("jail", { url: user.displayAvatarURL({ format: "png", size: 1024 }) });
		const attachment = new Discord.MessageAttachment(buffer, "jail.png");
		m.delete();
		message.channel.send(attachment);

	}

};
