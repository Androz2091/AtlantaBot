const Command = require("../../base/Command.js");

class Addemoji extends Command {

	constructor (client) {
		super(client, {
			name: "addemoji",
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
					name: "url",
					description: "the url of the emoji",
					required: true,
					type: "STRING"
				},
				{
					name: "name",
					description: "the name of the emoji",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction) {

		const URL = interaction.options.getString("url");
		if (!URL) {
			return interaction.error("administration/addemoji:MISSING_URL");
		}

		const name = interaction.options.getString("url").replace(/[^a-z0-9]/gi, "");
		if (!name) {
			return interaction.error("administration/addemoji:MISSING_NAME");
		}
		if (name.length < 2 || name > 32) {
			return interaction.error("administration/addemoji:INVALID_NAME");
		}

		interaction.guild.emojis
			.create(URL, name)
			.then(emoji => {
				interaction.success("administration/addemoji:SUCCESS", {
					emojiName: emoji.name
				});
			})
			.catch(() => {
				interaction.error("administration/addemoji:ERROR", {
					emojiName: name
				});
			});
	}

}

module.exports = Addemoji;