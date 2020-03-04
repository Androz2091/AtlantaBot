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
        if (!this.client.config.apiKeys.fortniteFNBR)
            return message.error("misc:COMMAND_DISABLED");

        const currentFortniteShopChannel =
            message.guild.settings.specialChannels.fortniteshop;
        const sentChannel = await Resolvers.resolveChannel({
            message,
            search: args.join(" "),
            channelType: "text"
        });

        if (!sentChannel && currentFortniteShopChannel) {
            await message.guild.settings.setSpecialChannel(
                "fortniteshop",
                null
            );
            return message.success(
                "administration/setfortniteshop:SUCCESS_DISABLED"
            );
        } else {
            const channel = sentChannel || message.channel;
            await message.guild.settings.setSpecialChannel(
                "fortniteshop",
                channel.id
            );
            return message.success(
                "administration/setfortniteshop:SUCCESS_ENABLED",
                {
                    channel: channel.toString()
                }
            );
        }
    }
};
