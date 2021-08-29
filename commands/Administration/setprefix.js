const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setprefix",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		const prefix = args[0];
		if(!prefix){
			return interaction.reply({
				content: translate("administration/setprefix:MISSING_PREFIX"),
				ephemeral: true
			});
		}
		if(prefix.length > 5){
			return interaction.reply({
				content: translate("administration/setprefix:TOO_LONG"),
				ephemeral: true
			});
		}
        
		data.guildData.prefix = prefix;
		data.guildData.save();

		// Sucess
		return message.success("administration/setprefix:SUCCESS", {
			prefix
		});
        
	}

};
