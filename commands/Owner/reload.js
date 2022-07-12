const Command = require("../../base/Command.js");

class Reload extends Command {

	constructor (client) {
		super(client, {
			name: "reload",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [],
			nsfw: false,
			ownerOnly: true,
			cooldown: 3000,
			options: [
				{
					name: "command",
					description: "the command you want to reload",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction) {
		const command = interaction.options.getString("command")
		const cmd = this.client.commands.get(command);
		if(!cmd){
			interaction.error("owner/reload:NOT_FOUND", {
				search: command
			});
		}
		await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
		await this.client.loadCommand(cmd.conf.location, cmd.help.name);
		interaction.success("owner/reload:SUCCESS", {
			command: cmd.help.name
		});
	}

}

module.exports = Reload;