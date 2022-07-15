const Command = require("../../base/Command.js");

class Setprefix extends Command {

	constructor (client) {
		super(client, {
			name: "setprefix",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "prefix",
					required: true,
					description: "the new prefix",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {

		const prefix = interaction.options.getString("prefix")
		if(!prefix){
			return interaction.error("administration/setprefix:MISSING_PREFIX");
		}
		if(prefix.length > 5){
			return interaction.error("administration/setprefix:TOO_LONG");
		}
        
		data.guild.prefix = prefix;
		data.guild.save();

		// Sucess
		return interaction.success("administration/setprefix:SUCCESS", {
			prefix
		});
        
	}

}

module.exports = Setprefix;