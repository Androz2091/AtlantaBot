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
        const status = args[0];
        if(!status || (status !== "on" && status !== "off")){
            return message.error("administration/automod:MISSING");
        }

        const sentChannel = await Resolvers.resolveChannel({
            message,
            search: args.slice(1).join(" "),
            channelType: "text"
        });

        if(status === "on"){
            message.guild.settings.plugins.automod.enabled = true;
            message.guild.settings.plugins.automod.ignored = [];
            await message.guild.settings.plugins.automod.updateData();
            message.success("administration/automod:ENABLED", {
                prefix: message.guild.settings.prefix
            });
        } else if (status === "off"){
            if(sentChannel){
                message.guild.settings.plugins.automod.ignored.push(sentChannel.id);
                await message.guild.settings.plugins.automod.updateData();
                message.success("administration/automod:DISABLED_CHANNEL", {
                    channel: sentChannel.toString()
                });
            } else {
                message.guild.settings.plugins.automod.enabled = false;
                message.guild.settings.plugins.automod.ignored = [];
                await message.guild.settings.plugins.automod.updateData();
                message.success("administration/automod:DISABLED", {
                    prefix: message.guild.settings.prefix
                });
            }
        }
    }

}
