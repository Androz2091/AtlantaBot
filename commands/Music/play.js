const Command = require("../../base/Command.js");

class Play extends Command {

	constructor (client) {
		super(client, {
			name: "play",
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
					name: "name",
					description: "the name of the song",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		const name = interaction.options.getString("name")
		if(!name){
			return interaction.error("music/play:MISSING_SONG_NAME");
		} 

		const voice = interaction.member.voice.channel;
		if(!voice){
			return interaction.error("music/play:NO_VOICE_CHANNEL");
		}

		// Check my permissions
		const perms = voice.permissionsFor(this.client.user);
		if(!perms.has("CONNECT") || !perms.has("SPEAK")){
			return interaction.error("music/play:VOICE_CHANNEL_CONNECT");
		}

		await this.client.player.play(interaction, name);
	}

}

module.exports = Play; 