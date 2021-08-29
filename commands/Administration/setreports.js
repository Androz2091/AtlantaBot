const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setreports",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "setreport"],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const areReportsEnabled = Boolean(data.guildData.plugins.reports);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "text"
		});

		if (!sentChannel && areReportsEnabled) {
			data.guildData.plugins.reports = null;
			data.guildData.markModified("plugins.reports");
			await data.guildData.save();
			return message.success(
				"administration/setreports:SUCCESS_DISABLED"
			);
		} else {
			const channel = sentChannel || message.channel;
			data.guildData.plugins.reports = channel.id;
			data.guildData.markModified("plugins.reports");
			await data.guildData.save();
			return message.success(
				"administration/setreports:SUCCESS_ENABLED",
				{
					channel: channel.toString()
				}
			);
		}
        
	}

};
