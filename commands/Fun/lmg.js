const Command = require("../../base/Command.js");

module.exports = class extends Command {

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
			cooldown: 1000
		});
	}

	async run (interaction, translate) {
		const question = args.join(" ");
		if (!question) return interaction.reply({
			content: translate("fun/lmg:MISSING"),
			ephemeral: true
		});
		const encodedQuestion = question.replace(/[' '_]/g, "+");
		await message.channel.send(`http://lmgtfy.com/?q=${encodedQuestion}`);
		message.delete().catch(() => {});
	}

};
