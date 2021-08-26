const Command = require("../../base/Command.js");

module.exports = class extends Command {

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
			? interaction.reply({
content: translate("fun/flip:HEADS")
});
			: interaction.reply({
content: translate("fun/flip:TAILS")
});;
	}

}

