const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Setmodlogs extends Command {

	constructor (client) {
		super(client, {
			name: "setmodlogs",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "setmodlogs" ],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        
		const areModLogsEnabled = Boolean(data.guild.plugins.modlogs);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "text"
		});

		if (!sentChannel && areModLogsEnabled) {
			data.guild.plugins.modlogs = null;
			data.guild.markModified("plugins.modlogs");
			await data.guild.save();
			return message.success(
				"administration/setmodlogs:SUCCESS_DISABLED"
			);
		} else {
			const channel = sentChannel || message.channel;
			data.guild.plugins.modlogs = channel.id;
			data.guild.markModified("plugins.modlogs");
			await data.guild.save();
			return message.success(
				"administration/setmodlogs:SUCCESS_ENABLED",
				{
					channel: channel.toString()
				}
			);
		}
	}

}

module.exports = Setmodlogs;