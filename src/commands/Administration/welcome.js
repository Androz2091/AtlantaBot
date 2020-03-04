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
        if (
            args[0] === "test" &&
            message.guild.settings.plugins.welcome.enabled
        ) {
            this.client.emit("guildMemberAdd", message.member);
            return message.success("administration/welcome:TEST_SUCCESS");
        }

        if (
            (!args[0] || !["edit", "off"].includes(args[0])) &&
            message.guild.settings.plugins.welcome.enabled
        )
            return message.error("administration/welcome:MISSING_STATUS");

        if (args[0] === "off") {
            Object.assign(message.guild.settings.plugins.welcome, {
                enabled: false,
                message: null,
                channelID: null,
                withImage: null
            });
            await message.guild.settings.plugins.welcome.updateData();
            return message.error("administration/welcome:DISABLED", {
                prefix: message.guild.settings.prefix
            });
        } else {
            const welcomeData = {
                enabled: true,
                channelID: null,
                message: null,
                withImage: null
            };

            message.sendT("administration/welcome:FORM_1", {
                author: message.author.toString()
            });
            const collector = message.channel.createMessageCollector(
                m => m.author.id === message.author.id,
                {
                    time: 120000 // 2 minutes
                }
            );

            collector.on("collect", async msg => {
                // If the message is filled, it means the user sent yes or no for the image
                if (welcomeData.message) {
                    if (
                        msg.content.toLowerCase() ===
                        message.translate("common:YES").toLowerCase()
                    ) {
                        welcomeData.withImage = true;
                    } else if (
                        msg.content.toLowerCase() ===
                        message.translate("common:NO").toLowerCase()
                    ) {
                        welcomeData.withImage = false;
                    } else {
                        return message.error("misc:INVALID_YES_NO");
                    }
                    Object.assign(
                        message.guild.settings.plugins.welcome,
                        welcomeData
                    );
                    await message.guild.settings.plugins.welcome.updateData();
                    message.sendT("administration/welcome:FORM_SUCCESS", {
                        prefix: message.guild.settings.prefix,
                        channel: `<#${welcomeData.channelID}>`
                    });
                    return collector.stop();
                }

                // If the channel is filled and the message is not, it means the user sent the message
                if (welcomeData.channelID && !welcomeData.message) {
                    if (msg.content.length < 1800) {
                        welcomeData.message = msg.content;
                        return message.sendT("administration/welcome:FORM_3");
                    }
                    return message.error("administration/welcome:MAX_CHARACT");
                }

                // If the channel is not filled, it means the user sent it
                if (!welcomeData.channelID) {
                    const channel = await Resolvers.resolveChannel({
                        message: msg,
                        channelType: "text"
                    });
                    if (!channel) {
                        return message.error("misc:INVALID_CHANNEL");
                    }
                    welcomeData.channelID = channel.id;
                    message.sendT("administration/welcome:FORM_2", {
                        channel: channel.toString(),
                        author: msg.author.toString(),
                        guildName: msg.guild.name,
                        memberCount: msg.guild.memberCount
                    });
                }
            });

            collector.on("end", (_, reason) => {
                if (reason === "time") {
                    return message.error("misc:TIMEOUT");
                }
            });
        }
    }
};
