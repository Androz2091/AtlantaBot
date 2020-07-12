const Command = require("../../base/Command.js");

class Ignore extends Command {

	constructor (client) {
		super(client, {
			name: "ignore",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "disableChannel" ],
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

		const ignored = data.guild.ignoredChannels.includes(channel.id);

		if(ignored){
			data.guild.ignoredChannels = data.guild.ignoredChannels.filter((ch) => ch !== channel.id);
			data.guild.save();
			return message.success("administration/ignore:ALLOWED", {
				channel: channel.toString()
			});
		} else if(!ignored){
			data.guild.ignoredChannels.push(channel.id);
			data.guild.save();
			return message.success("administration/ignore:IGNORED", {
				channel: channel.toString()
			});
		}
        
	}

}

module.exports = Ignore;