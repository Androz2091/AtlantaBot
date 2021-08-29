const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "automod",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate,data) {

		const status = args[0];
		if(!status || (status !== "on" && status !== "off")){
			return interaction.reply({
				content: translate("administration/automod:MISSING_STATUS"),
				ephemeral: true
			});
		}

		if(status === "on"){
			data.guildData.plugins.automod = { enabled: true, ignored: [] };
			data.guildData.markModified("plugins.automod");
			data.guildData.save();
			message.success("administration/automod:ENABLED", {
				prefix: data.guildData.prefix
			});
		} else if (status === "off"){
			if(message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === interaction.guild.id).first()){
				const channel = message.mentions.channels.first();
				data.guildData.plugins.automod.ignored.push(channel);
				data.guildData.markModified("plugins.automod");
				data.guildData.save();
				message.success("administration/automod:DISABLED_CHANNEL", {
					channel: channel.toString()
				});
			} else {
				data.guildData.plugins.automod = { enabled: false, ignored: [] };
				data.guildData.markModified("plugins.automod");
				data.guildData.save();
				interaction.reply({
					content: translate("administration/automod:DISABLED")
				});
			}
		}
	}

};
