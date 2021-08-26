const Command = require("../../base/Command.js");

class Setbio extends Command {

	constructor (client) {
		super(client, {
			name: "setbio",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "biography", "setdesc" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {
		const newBio = args.join(" ");
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

}

module.exports = Setbio;