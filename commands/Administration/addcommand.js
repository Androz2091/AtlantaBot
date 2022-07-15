const Command = require("../../base/Command.js");

class Addcommand extends Command {

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
			cooldown: 3000,
			options: [
				{
					name: "name",
					description: "the name of the command",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
    const name = interaction.options.getString("name").split("\n")[0];

		if (
			this.client.commands.get(name) ||
            data.guild.customCommands.find((c) => c.name === name)
		) {
			return interaction.error(
				"administration/addcommand:COMMAND_ALREADY_EXISTS"
			);
		}

		const answer = (name.split("\n")[1] || "") + name.slice(1).join(" ");
		if (!answer) {
			return interaction.error("administration/addcommand:MISSING_ANSWER");
		}

		data.guild.customCommands.push({
			name: name.toLowerCase(),
			answer: answer
		});
		data.guild.save();

		interaction.success("administration/addcommand:SUCCESS", {
			commandName: name,
			prefix: data.guild.prefix
		});
	}
    
}

module.exports = Addcommand;
