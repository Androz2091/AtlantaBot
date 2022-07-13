const Command = require("../../base/Command.js");
const ms = require("ms");

class Seek extends Command {

	constructor (client) {
		super(client, {
			name: "seek",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "time",
					description: "the amount of time",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		const queue = this.client.player.getQueue(interaction);

		const voice = interaction.member.voice.channel;
		if (!voice){
			return interaction.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return interaction.error("music/play:NOT_PLAYING");
		}

		const time = ms(interaction.options.getString("time"));
		if (isNaN(time)) {
			return interaction.error("music/seek:INVALID_TIME");
		}

		// Change the song position
		await this.client.player.setPosition(interaction, queue.currentStreamTime + time);
        
		// Send the embed in the current channel
		interaction.replyT("music/seek:SUCCESS");
	}

}

module.exports = Seek;