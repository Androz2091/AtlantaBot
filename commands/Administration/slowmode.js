const Command = require("../../base/Command.js"),
	ms = require("ms");

class Slowmode extends Command {

	constructor (client) {
		super(client, {
			name: "slowmode",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "slowmotion" ],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first();
		if(!channel){
			return message.error("misc:INVALID_CHANNEL");
		}
		const time = args[1];
		if(!time){
			if(!data.guild.slowmode.channels.find((ch) => ch.id === channel.id)){
				return message.error("misc:INVALID_TIME");
			}
			data.guild.slowmode.channels = data.guild.slowmode.channels.filter((ch) => ch.id !== channel.id);
			data.guild.markModified("slowmode.channels");
			data.guild.save();
			message.success("administration/slowmode:DISABLED", {
				channel: channel.toString()
			});
		} else {
			if(isNaN(ms(time))){
				return message.error("misc:INVALID_TIME");
			}
			if(data.guild.slowmode.channels.find((ch) => ch.id === channel.id)){
				data.guild.slowmode.channels = data.guild.slowmode.channels.filter((ch) => ch.id !== channel.id);
			}
			data.guild.slowmode.channels.push({
				id: channel.id,
				time: ms(time)
			});
			data.guild.markModified("slowmode.channels");
			data.guild.save();
			message.success("administration/slowmode:ENABLED", {
				channel: channel.toString(),
				time: this.client.functions.convertTime(message.guild, ms(time))
			});
		}
	}
}

module.exports = Slowmode;
