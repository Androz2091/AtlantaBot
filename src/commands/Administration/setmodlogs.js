const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: [],
                permission: Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        const currentSuggestionsChannel =
            message.guild.settings.specialChannels.modlogs;
        const sentChannel = await Resolvers.resolveChannel({
            message,
            search: args.join(" "),
            channelType: "text"
        });

        if (!sentChannel && currentSuggestionsChannel) {
            await message.guild.settings.setSpecialChannel("modlogs", null);
            return message.success(
                "administration/setmodlogs:SUCCESS_DISABLED"
            );
        } else {
            const channel = sentChannel || message.channel;
            await message.guild.settings.setSpecialChannel(
                "modlogs",
                channel.id
            );
            return message.success(
                "administration/setmodlogs:SUCCESS_ENABLED",
                {
                    channel: channel.toString()
                }
            );
        }
    }
};
