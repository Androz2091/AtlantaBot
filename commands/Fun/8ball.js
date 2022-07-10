const Command = require("../../base/Command.js");

class Eightball extends Command {

	constructor (client) {
		super(client, {
			name: "8ball",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "question",
					description: "the question you want to ask",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {
		const question = interaction.options.getString("question")
        
		if (!question.endsWith("?")) {
			return interaction.error("fun/8ball:ERR_QUESTION");
		}

		const answerNO = parseInt(Math.floor(Math.random() * 10), 10);
		const answer = interaction.translate(`fun/8ball:RESPONSE_${answerNO + 1}`);

		interaction.reply(`${message.author.username}, ${answer}`);
	}

}

module.exports = Eightball;