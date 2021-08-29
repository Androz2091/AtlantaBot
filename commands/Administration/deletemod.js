const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "deletemod",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
		const status = args[0];
		if(!status || status !== "on" && status !== "off"){
			return interaction.reply({
				content: translate("administration/deletemod:MISSING_STATUS"),
				ephemeral: true
			});
		}
		if(status === "on"){
			data.guildData.autoDeleteModCommands = true;
			data.guildData.save();
			interaction.reply({
				content: translate("administration/deletemod:ENABLED")
			});
		} else {
			data.guildData.autoDeleteModCommands = false;
			data.guildData.save();
			interaction.reply({
				content: translate("administration/deletemod:DISABLED")
			});
		}
	}

};
