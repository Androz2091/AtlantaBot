const Command = require("../../base/Command.js");

class Automod extends Command {

	constructor (client) {
		super(client, {
			name: "automod",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "status",
					required: true,
					description: "the status (on/off)",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction,data) {

		const status = interaction.options.getString("status");
		if(!status || (status !== "on" && status !== "off")){
			return interaction.error("administration/automod:MISSING_STATUS");
		}

		if(status === "on"){
			data.guild.plugins.automod = { enabled: true, ignored: [] };
			data.guild.markModified("plugins.automod");
			data.guild.save();
			interaction.success("administration/automod:ENABLED", {
				prefix: data.guild.prefix
			});
		} else if (status === "off"){
			if(interaction.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === interaction.guild.id).first()){
				const channel = interaction.mentions.channels.first();
				data.guild.plugins.automod.ignored.push(channel);
				data.guild.markModified("plugins.automod");
				data.guild.save();
				interaction.success("administration/automod:DISABLED_CHANNEL", {
					channel: channel.toString()
				});
			} else {
				data.guild.plugins.automod = { enabled: false, ignored: [] };
				data.guild.markModified("plugins.automod");
				data.guild.save();
				interaction.success("administration/automod:DISABLED");
			}
		}
	}

}

module.exports = Automod;