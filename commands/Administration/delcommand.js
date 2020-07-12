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
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const name = args[0];
		if(!name){
			return message.error("administration/delcommand:MISSING_NAME");
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
    
}

module.exports = Delcommand;