const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Pause extends Command {

	constructor (client) {
		super(client, {
			name: "pause",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {

		const queue = this.client.player.getQueue(message.guild.id);

		const voice = message.member.voice.channel;
		if (!voice){
			return message.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return message.error("music:play:NOT_PLAYING");
		}

		// Gets the current song
		const song = await this.client.player.pause(message.guild.id);
        
		// Send the embed in the current channel
		message.sendT("music/pause:SUCCESS");
        
	}

}

module.exports = Pause;