const Command = require("../../base/Command.js");
const ms = require("ms");

class Seek extends Command {

	constructor (client) {
		super(client, {
			name: "seek",
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

	async run (message, args) {

		const queue = this.client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if (!voice){
			return message.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return message.error("music/play:NOT_PLAYING");
		}

		const time = ms(args[0]);
		if (isNaN(time)) {
			return message.error("music/seek:INVALID_TIME");
		}

		// Change the song position
		await this.client.player.setPosition(message, queue.currentStreamTime + time);
        
		// Send the embed in the current channel
		message.sendT("music/seek:SUCCESS");
	}

}

module.exports = Seek;