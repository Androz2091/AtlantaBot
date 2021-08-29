const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "addcommand",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		if (!args[0])
			return interaction.reply({
				content: translate("administration/addcommand:MISSING_NAME"),
				ephemeral: true
			});

		const name = args[0].split("\n")[0];

		if (
			this.client.commands.get(name) ||
            this.client.aliases.get(name) ||
            data.guildData.customCommands.find((c) => c.name === name)
		) {
			return message.error(
				"administration/addcommand:COMMAND_ALREADY_EXISTS"
			);
		}

		const answer = (args[0].split("\n")[1] || "") + args.slice(1).join(" ");
		if (!answer) {
			return interaction.reply({
				content: translate("administration/addcommand:MISSING_ANSWER"),
				ephemeral: true
			});
		}

		data.guildData.customCommands.push({
			name: name.toLowerCase(),
			answer: answer
		});
		data.guildData.save();

		message.success("administration/addcommand:SUCCESS", {
			commandName: name,
			prefix: data.guildData.prefix
		});
	}
    
};
