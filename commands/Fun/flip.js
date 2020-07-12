const Command = require("../../base/Command.js");

class Flip extends Command {

	constructor (client) {
		super(client, {
			name: "flip",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "dice" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message) {
		const isHeads = Math.random() > 0.5;
		isHeads
			? message.sendT("fun/flip:HEADS")
			: message.sendT("fun/flip:TAILS");
	}

}

module.exports = Flip;