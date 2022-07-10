const Command = require("../../base/Command.js");

class Choice extends Command {

	constructor (client) {
		super(client, {
			name: "choice",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "answer1",
					description: "the first answer",
					type: "STRING",
					required: true
				},
				{
					name: "answer2",
					description: "the second answer",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		// Gets the answers by spliting on "/"
		const answers = [
			interaction.options.getString("answer1"),
			interaction.options.getString("answer2")
		] 
		const i = await interaction.replyT(
			"fun/choice:PROGRESS",
			null,
			false,
			false,
			"loading"
		);

		setTimeout(() => {
			i.success("fun/choice:DONE", null, {
				edit: true
			});
			const result =
                answers[parseInt(Math.floor(Math.random() * answers.length))];
			interaction.reply("```" + result + "```");
		}, 1500);
        
	}

}

module.exports = Choice;