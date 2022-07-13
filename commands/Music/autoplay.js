const Command = require("../../base/Command.js");

class AutoPlay extends Command {

	constructor (client) {
		super(client, {
			name: "autoplay",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction) {

		const queue = this.client.player.getQueue(interaction);

		const voice = interaction.member.voice.channel;
		if (!voice){
			return interaction.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return interaction.error("music:play:NOT_PLAYING");
		}

		// Gets the current song
		await this.client.player.setAutoPlay(interaction, !queue.autoPlay);
        
		// Send the embed in the current channel
		interaction.replyT(`music/autoplay:SUCCESS_${queue.autoPlay ? "ENABLED" : "DISABLED"}`);
        
	}

}

module.exports = AutoPlay;