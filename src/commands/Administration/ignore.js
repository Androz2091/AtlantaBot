const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel:
                    Constants.PermissionsLevels.SERVER_MODERATOR
            },
            ...args
        );
    }

    async execute(message, args) {
        const channel = await Resolvers.resolveChannel({
            message,
            search: args.join(" "),
            channelType: "text"
        });
        if (!channel) {
            return message.error("administration/ignore:INVALID_CHANNEL");
        }

        const isIgnored = message.guild.settings.ignoredChannels.includes(
            channel.id
        );

        if (isIgnored) {
            await message.guild.settings.deleteIgnoredChannel(channel.id);
            return message.success("administration/ignore:SUCCESS_ENABLED", {
                channel: channel.toString()
            });
        } else {
            await message.guild.settings.addIgnoredChannel(channel.id);
            return message.success("administration/ignore:SUCCESS_DISABLED", {
                channel: channel.toString()
            });
        }
    }
};
