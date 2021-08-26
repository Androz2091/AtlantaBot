const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "addemoji",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate) {

		const URL = args[0];
		if (!URL) {
			return interaction.reply({
				content: translate("administration/addemoji:MISSING_URL"),
				ephemeral: true
			});
		}

		const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
		if (!name) {
			return interaction.reply({
				content: translate("administration/addemoji:MISSING_NAME"),
				ephemeral: true
			});
		}
		if (name.length < 2 || name > 32) {
			return interaction.reply({
				content: translate("administration/addemoji:INVALID_NAME"),
				ephemeral: true
			});
		}

		message.guild.emojis
			.create(URL, name)
			.then(emoji => {
				message.success("administration/addemoji:SUCCESS", {
					emojiName: emoji.name
				});
			})
			.catch(() => {
				message.error("administration/addemoji:ERROR", {
					emojiName: name
				});
			});
	}

};

