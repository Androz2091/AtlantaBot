const Command = require("../../base/Command.js");

module.exports = class extends Command {

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
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		const name = args[0];
		if(!name){
			return interaction.reply({
				content: translate("administration/delcommand:MISSING_NAME"),
				ephemeral: true
			});
		}

		if(!data.guild.customCommands.find((c) => c.name === name)){
			return message.error("administration/delcommand:UNKNOWN_COMMAND", {
				commandName: name
			});
		}
        
		data.guild.customCommands = data.guild.customCommands.filter((c) => c.name !== name);
		data.guild.save();

		message.success("administration/delcommand:SUCCESS", {
			commandName: name
		});
	}
    
};

