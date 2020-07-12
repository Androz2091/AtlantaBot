const Command = require("../../base/Command.js");

class Lmg extends Command {

	constructor (client) {
		super(client, {
			name: "lmg",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "lmgtfy" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message, args) {
		const question = args.join(" ");
		if (!question) return message.error("fun/lmg:MISSING");
		const encodedQuestion = question.replace(/[' '_]/g, "+");
		await message.channel.send(`http://lmgtfy.com/?q=${encodedQuestion}`);
		message.delete().catch(() => {});
	}

}

module.exports = Lmg;