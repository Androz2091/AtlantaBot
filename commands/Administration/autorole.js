const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

module.exports = class extends Command {

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
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {

		const status = args[0];
		if(status !== "on" && status !== "off"){
			return interaction.reply({
				content: translate("administration/autorole:MISSING_STATUS"),
				ephemeral: true
			});
		}
        
		if(status === "on"){

			const role = await Resolvers.resolveRole({
				message,
				search: args.slice(1).join(" ")
			});
			if(!role){
				return interaction.reply({
					content: translate("administration/autorole:MISSING_ROLE"),
					ephemeral: true
				});
			}

			data.guild.plugins.autorole = {
				enabled: true,
				role: role.id
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();

			message.success("administration/autorole:SUCCESS_ENABLED", {
				roleName: role.name
			});
		}

		if(status === "off"){

			if(!data.guild.plugins.autorole.enabled){
				return message.success("administration/autorole:ALREADY_DISABLED", {
					prefix: data.guild.prefix
				});
			}

			data.guild.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();
            
			message.success("administration/autorole:SUCCESS_DISABLED", {
				prefix: data.guild.prefix
			});

		}
        
	}

};
