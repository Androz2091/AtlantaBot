const Command = require("../../base/Command.js");

class Setbio extends Command {

	constructor (client) {
		super(client, {
			name: "setbio",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "bio",
					description: "the bio that you want to set",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
		const newBio = interaction.options.getString("bio")
		if(!newBio){
			return interaction.error("economy/setbio:MISSING");
		}
		if(newBio.length > 100){
			return interaction.error("economy/setbio:MAX_CHARACT");
		}
		data.userData.bio = newBio;
		interaction.success("economy/setbio:SUCCESS");
		await data.userData.save();
	}

}

module.exports = Setbio;