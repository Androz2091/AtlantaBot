const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setafk",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "afk" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false
		});
	}

	async run (interaction, translate, data) {

		const reason = args.join(" ");
		if(!reason){
			return interaction.reply({
				content: translate("general/setafk:MISSING_REASON"),
				ephemeral: true
			});
		}

		// Send success message
		message.success("general/setafk:SUCCESS", {
			reason
		});

		data.userData.afk = reason;
		data.userData.save();

	}

};
