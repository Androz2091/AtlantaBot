const Command = require("../../base/Command.js");

module.exports = class extends Command {

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
			cooldown: 3000
		});
	}

	async run (interaction, translate) {
        
		if (!args[0] || !message.content.endsWith("?")) {
			return interaction.reply({
				content: translate("fun/8ball:ERR_QUESTION"),
				ephemeral: true
			});
		}

		const answerNO = parseInt(Math.floor(Math.random() * 10), 10);
		const answer = translate(`fun/8ball:RESPONSE_${answerNO + 1}`);

		message.channel.send(`${interaction.user.username}, ${answer}`);
	}

};
