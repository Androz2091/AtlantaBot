const Command = require("../../base/Command.js");

class Addemoji extends Command {

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

	async run (message, args) {

		const URL = args[0];
		if (!URL) {
			return message.error("administration/addemoji:MISSING_URL");
		}

		const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
		if (!name) {
			return message.error("administration/addemoji:MISSING_NAME");
		}
		if (name.length < 2 || name > 32) {
			return message.error("administration/addemoji:INVALID_NAME");
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

}

module.exports = Addemoji;