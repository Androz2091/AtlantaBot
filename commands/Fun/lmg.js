const Command = require("../../base/Command.js");

class Lmg extends Command {

	constructor (client) {
		super(client, {
			name: "lmg",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000,
			options: [
				{
					name: "question",
					description: "the question you want to encode",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {
		const question = interaction.options.getString("question")
		const encodedQuestion = question.replace(/[' '_]/g, "+");
		await interaction.reply(`http://lmgtfy.com/?q=${encodedQuestion}`);
	}

}

module.exports = Lmg;