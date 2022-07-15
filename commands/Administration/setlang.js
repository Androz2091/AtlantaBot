const Command = require("../../base/Command.js");

class Setlang extends Command {

	constructor (client) {
		super(client, {
			name: "setlang",
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
					name: "lang",
					required: true,
					description: "the lang you want for the bot",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
		const lang = interaction.options.getString("lang")
		const language = this.client.languages.find((l) => l.name === lang || l.aliases.includes(lang));

		if(!lang || !language){
			return interaction.error("administration/setlang:MISSING_LANG", {
				list: this.client.languages.map((l) => "`"+l.name+"`").join(", ")
			});
		}

		data.guild.language = language.name;
		await data.guild.save();
        
		return interaction.replyT("administration/setlang:SUCCESS");
        
	}

}

module.exports = Setlang;