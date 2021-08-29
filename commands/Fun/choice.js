const Command = require("../../base/Command.js");

module.exports = class extends Command {

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
			cooldown: 5000
		});
	}

	async run (interaction, translate) {

		// Gets the answers by spliting on "/"
		const answers = args.join(" ").split("/");
		if (answers.length < 2) return interaction.reply({
			content: translate("fun/choice:MISSING"),
			ephemeral: true
		});
		if (answers.some(answer => !answer))
			return interaction.reply({
				content: translate("fun/choice:EMPTY"),
				ephemeral: true
			});

		const m = await message.sendT(
			"fun/choice:PROGRESS",
			null,
			false,
			false,
			"loading"
		);

		setTimeout(() => {
			m.success("fun/choice:DONE", null, {
				edit: true
			});
			const result =
                answers[parseInt(Math.floor(Math.random() * answers.length))];
			message.channel.send("```" + result + "```");
		}, 1500);
        
	}

};
