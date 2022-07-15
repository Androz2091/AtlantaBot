const Command = require("../../base/Command.js");

class Deletemod extends Command {

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
			cooldown: 3000,
			options: [
				{
					name: "status",
					required: true,
					description: "the status (on/off)",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
		const status = interaction.options.getString("status");
		if(!status || status !== "on" && status !== "off"){
			return interaction.error("administration/deletemod:MISSING_STATUS");
		}
		if(status === "on"){
			data.guild.autoDeleteModCommands = true;
			data.guild.save();
			interaction.success("administration/deletemod:ENABLED");
		} else {
			data.guild.autoDeleteModCommands = false;
			data.guild.save();
			interaction.success("administration/deletemod:DISABLED");
		}
	}

}

module.exports = Deletemod;