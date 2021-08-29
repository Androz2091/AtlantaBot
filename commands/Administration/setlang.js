const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setlang",
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

		const language = this.client.languages.find((l) => l.name === args[0] || l.aliases.includes(args[0]));

		if(!args[0] || !language){
			return message.error("administration/setlang:MISSING_LANG", {
				list: this.client.languages.map((l) => "`"+l.name+"`").join(", ")
			});
		}

		data.guildData.language = language.name;
		await data.guildData.save();
        
		return interaction.reply({
			content: translate("administration/setlang:SUCCESS")
		});
        
	}

};
