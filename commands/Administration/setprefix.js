const Command = require("../../base/Command.js");

class Setprefix extends Command {

	constructor (client) {
		super(client, {
			name: "setprefix",
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

		const prefix = args[0];
		if(!prefix){
			return message.error("administration/setprefix:MISSING_PREFIX");
		}
		if(prefix.length > 5){
			return message.error("administration/setprefix:TOO_LONG");
		}
        
		data.guild.prefix = prefix;
		data.guild.save();

		// Sucess
		return message.success("administration/setprefix:SUCCESS", {
			prefix
		});
        
	}

}

module.exports = Setprefix;