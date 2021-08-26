const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setbio",

			options: [
				{
					name: "bio",
					type: "STRING"
				}
			],

			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, data) {
		const newBio = interaction.options.getString("bio");
		if(!newBio){
			return interaction.reply({
				content: translate("economy/setbio:MISSING"),
				ephemeral: true
			});
		}
		if(newBio.length > 100){
			return interaction.reply({
				content: translate("economy/setbio:MAX_CHARACT"),
				ephemeral: true
			});
		}
		data.userData.bio = newBio;
		interaction.reply({
			content: translate("economy/setbio:SUCCESS")
		});
		await data.userData.save();
	}

};
