const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        const currentSuggestionsChannel =
            message.guild.settings.specialChannels.reports;
        const sentChannel = await Resolvers.resolveChannel({
            message,
            search: args.join(" "),
            channelType: "text"
        });

        if (!sentChannel && currentSuggestionsChannel) {
            await message.guild.settings.setSpecialChannel("reports", null);
            return message.success(
                "administration/setreports:SUCCESS_DISABLED"
            );
        } else {
            const channel = sentChannel || message.channel;
            await message.guild.settings.setSpecialChannel(
                "reports",
                channel.id
            );
            return message.success(
                "administration/setreports:SUCCESS_ENABLED",
                {
                    channel: channel.toString()
                }
            );
        }
    }
};
