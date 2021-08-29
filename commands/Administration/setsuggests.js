const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setsuggests",
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
        
		const areSuggestsEnabled = Boolean(data.guildData.plugins.suggestions);
		const sentChannel = await Resolvers.resolveChannel({
			message,
			search: args.join(" "),
			channelType: "text"
		});

		if (!sentChannel && areSuggestsEnabled) {
			data.guildData.plugins.suggestions = null;
			data.guildData.markModified("plugins.suggestions");
			await data.guildData.save();
			return message.success(
				"administration/setsuggests:SUCCESS_DISABLED"
			);
		} else {
			const channel = sentChannel || message.channel;
			data.guildData.plugins.suggestions = channel.id;
			data.guildData.markModified("plugins.suggestions");
			await data.guildData.save();
			return message.success(
				"administration/setsuggests:SUCCESS_ENABLED",
				{
					channel: channel.toString()
				}
			);
		}
        
	}

};
