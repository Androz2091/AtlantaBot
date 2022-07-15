const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Autorole extends Command {

	constructor (client) {
		super(client, {
			name: "autorole",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
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
		if(status !== "on" && status !== "off"){
			return interaction.error("administration/autorole:MISSING_STATUS");
		}
        
		if(status === "on"){

			const role = await Resolvers.resolveRole({
				interaction,
				search: status.slice(1).join(" ")
			});
			if(!role){
				return interaction.error("administration/autorole:MISSING_ROLE");
			}

			data.guild.plugins.autorole = {
				enabled: true,
				role: role.id
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();

			interaction.success("administration/autorole:SUCCESS_ENABLED", {
				roleName: role.name
			});
		}

		if(status === "off"){

			if(!data.guild.plugins.autorole.enabled){
				return interaction.success("administration/autorole:ALREADY_DISABLED", {
					prefix: data.guild.prefix
				});
			}

			data.guild.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();
            
			interaction.success("administration/autorole:SUCCESS_DISABLED", {
				prefix: data.guild.prefix
			});

		}
        
	}

}

module.exports = Autorole;