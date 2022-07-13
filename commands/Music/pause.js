const Command = require("../../base/Command.js");

class Pause extends Command {

	constructor (client) {
		super(client, {
			name: "pause",
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
		await this.client.player.pause(interaction);
        
		// Send the embed in the current channel
		interaction.replyT("music/pause:SUCCESS");
        
	}

}

module.exports = Pause;