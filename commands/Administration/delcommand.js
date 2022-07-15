const Command = require("../../base/Command.js");

class Delcommand extends Command {

	constructor (client) {
		super(client, {
			name: "delcommand",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "name",
					description: "the name of the command to delete",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {

		const name = interaction.options.getString("name");
		if(!name){
			return interaction.error("administration/delcommand:MISSING_NAME");
		}

		if(!data.guild.customCommands.find((c) => c.name === name)){
			return interaction.error("administration/delcommand:UNKNOWN_COMMAND", {
				commandName: name
			});
		}
        
		data.guild.customCommands = data.guild.customCommands.filter((c) => c.name !== name);
		data.guild.save();

		interaction.success("administration/delcommand:SUCCESS", {
			commandName: name
		});
	}
    
}

module.exports = Delcommand;