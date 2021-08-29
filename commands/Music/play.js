const Command = require("../../base/Command.js");

module.exports = class extends Command {

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
			cooldown: 5000
		});
	}

	async run (interaction, translate) {

		const name = args.join(" ");
		if(!name){
			return interaction.reply({
				content: translate("music/play:MISSING_SONG_NAME"),
				ephemeral: true
			});
		} 

		const voice = message.member.voice.channel;
		if(!voice){
			return interaction.reply({
				content: translate("music/play:NO_VOICE_CHANNEL"),
				ephemeral: true
			});
		}

		// Check my permissions
		const perms = voice.permissionsFor(this.client.user);
		if(!perms.has("CONNECT") || !perms.has("SPEAK")){
			return interaction.reply({
				content: translate("music/play:VOICE_CHANNEL_CONNECT"),
				ephemeral: true
			});
		}

		await this.client.player.play(interaction, translate.join(" "));
	}

};

 
