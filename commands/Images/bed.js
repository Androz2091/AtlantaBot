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
		try {
			const buffer = await canvacord.Canvas.bed(users[0].displayAvatarURL({ format: "png" }), users[1].displayAvatarURL({ format: "png" }));
			const attachment = new Discord.MessageAttachment(buffer, "bed.png");
			message.channel.send(attachment);
			m.delete();
		} catch(e){
			console.log(e);
			m.error("misc:ERROR_OCCURRED", null, {
				edit: true
			});
		}

	}

}

module.exports = Bed;