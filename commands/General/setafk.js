const Command = require("../../base/Command.js");

class Setafk extends Command {

	constructor (client) {
		super(client, {
			name: "setafk",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			options: [
				{
					name: "reason",
					description: "the reason of the afk",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
		const reason = interaction.options.getString("reason");

		// Send success message
		interaction.success("general/setafk:SUCCESS", {
			reason
		});

		data.userData.afk = reason;
		data.userData.save();

	}

}

module.exports = Setafk;