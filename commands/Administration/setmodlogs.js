const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setmodlogs",
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
        
		const areModLogsEnabled = Boolean(data.guildData.plugins.modlogs);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "text"
		});

		if (!sentChannel && areModLogsEnabled) {
			data.guildData.plugins.modlogs = null;
			data.guildData.markModified("plugins.modlogs");
			await data.guildData.save();
			return message.success(
				"administration/setmodlogs:SUCCESS_DISABLED"
			);
		} else {
			const channel = sentChannel || message.channel;
			data.guildData.plugins.modlogs = channel.id;
			data.guildData.markModified("plugins.modlogs");
			await data.guildData.save();
			return message.success(
				"administration/setmodlogs:SUCCESS_ENABLED",
				{
					channel: channel.toString()
				}
			);
		}
	}

};
