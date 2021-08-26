const Command = require("../../base/Command.js");

class AutoPlay extends Command {

	constructor (client) {
		super(client, {
			name: "autoplay",
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
			return interaction.reply({
				content: translate("music/play:NO_VOICE_CHANNEL"),
				ephemeral: true
			});
		}

		if(!queue){
			return interaction.reply({
				content: translate("music:play:NOT_PLAYING"),
				ephemeral: true
			});
		}

		// Gets the current song
		await this.client.player.setAutoPlay(message, !queue.autoPlay);
        
		// Send the embed in the current channel
		interaction.reply({
			content: translate(`music/autoplay:SUCCESS_${queue.autoPlay ? "ENABLED" : "DISABLED"}`)
		});
        
	}

}

module.exports = AutoPlay;