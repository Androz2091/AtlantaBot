const Command = require("../../base/Command.js");
class Ping extends Command {
	constructor (client) {
		super(client, {
			name: "ping",
			description: "Get the ping of the bot",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "MANAGE_MESSAGES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
		});
	}
	async run (interaction) {
		interaction.replyT("general/ping:CONTENT", {
			ping: "..."
		}, {
			ephemeral: true
		}).then(() => {
			const date = Date.now();
			interaction.replyT("general/ping:CONTENT", {
				ping: date - interaction.createdTimestamp
			}, {
				edit: true,
			});
		});

	}
}
module.exports = Ping;