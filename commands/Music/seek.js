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
			return interaction.reply({
				content: translate("music/play:NO_VOICE_CHANNEL"),
				ephemeral: true
			});
		}

		if(!queue){
			return interaction.reply({
				content: translate("music/play:NOT_PLAYING"),
				ephemeral: true
			});
		}

		const time = ms(args[0]);
		if (isNaN(time)) {
			return interaction.reply({
				content: translate("music/seek:INVALID_TIME"),
				ephemeral: true
			});
		}

		// Change the song position
		await this.client.player.setPosition(message, queue.currentStreamTime + time);
        
		// Send the embed in the current channel
		interaction.reply({
			content: translate("music/seek:SUCCESS")
		});
	}

}

module.exports = Seek;