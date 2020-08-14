const Command = require("../../base/Command.js");

class Resume extends Command {

	constructor (client) {
		super(client, {
			name: "resume",
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

	async run (message) {

		const queue = this.client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if (!voice){
			return message.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return message.error("music:play:NOT_PLAYING");
		}

		// Gets the current song
		await this.client.player.resume(message);
        
		// Send the embed in the current channel
		message.sendT("music/resume:SUCCESS");
	}

}

module.exports = Resume;