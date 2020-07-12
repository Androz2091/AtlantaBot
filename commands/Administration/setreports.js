const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Setreports extends Command {

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

	async run (message, args, data) {
        
		const areReportsEnabled = Boolean(data.guild.plugins.reports);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "text"
		});

		if (!sentChannel && areReportsEnabled) {
			data.guild.plugins.reports = null;
			data.guild.markModified("plugins.reports");
			await data.guild.save();
			return message.success(
				"administration/setreports:SUCCESS_DISABLED"
			);
		} else {
			const channel = sentChannel || message.channel;
			data.guild.plugins.reports = channel.id;
			data.guild.markModified("plugins.reports");
			await data.guild.save();
			return message.success(
				"administration/setreports:SUCCESS_ENABLED",
				{
					channel: channel.toString()
				}
			);
		}
        
	}

}

module.exports = Setreports;
