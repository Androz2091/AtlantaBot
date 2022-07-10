const Command = require("../../base/Command.js");

class Flip extends Command {

	constructor (client) {
		super(client, {
			name: "flip",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (interaction) {
		const isHeads = Math.random() > 0.5;
		isHeads
			? interaction.replyT("fun/flip:HEADS")
			: interaction.replyT("fun/flip:TAILS");
	}

}

module.exports = Flip;