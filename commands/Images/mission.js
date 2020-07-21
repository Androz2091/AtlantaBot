const Command = require("../../base/Command.js"),
	{MessageAttachment} = require("discord.js");

class Mission extends Command {
	constructor (client) {
		super(client, {
			name: "mission",
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
		const m = await message.sendT("images/mission:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const buffer = await this.client.AmeAPI.generate("missionpassed", { url: user.displayAvatarURL({ format: "png", size: 2048 }) });
		const attachment = new MessageAttachment(buffer, "mission.png");
		m.delete();
		message.channel.send(attachment);

	}

}

module.exports = Mission;