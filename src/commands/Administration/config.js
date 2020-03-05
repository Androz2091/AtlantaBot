const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel:
                    Constants.PermissionsLevels.SERVER_MODERATOR,
                clientPermissions: ["EMBED_LINKS"]
            },
            ...args
        );
    }

    async execute(message, args) {

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer);

        // Guild prefix
        embed.addField(message.translate("administration/config:PREFIX_TITLE"), message.guild.settings.prefix);

        // Ignored channels
        embed.addField(message.translate("administration/config:IGNORED_CHANNELS_TITLE"),
            (message.guild.settings.ignoredChannels.length > 0) ?
                message.guild.settings.ignoredChannels.map((ch) => `<#${ch}>`).join(", ")
            :   message.translate("administration/config:NO_IGNORED_CHANNELS")
        );
    
        // Autorole plugin
        embed.addField(message.translate("administration/config:AUTOROLE_TITLE"), 
            (message.guild.settings.plugins.autorole.enabled) ?
                message.translate("administration/config:AUTOROLE_CONTENT", {
                    roleName: `<@&${message.guild.settings.plugins.autorole.roleID}>`
                })
            :   message.translate("administration/config:AUTOROLE_DISABLED")
        );
        
        // Welcome plugin
        embed.addField(message.translate("administration/config:WELCOME_TITLE"),
            (message.guild.settings.plugins.welcome.enabled) ?
                message.translate("administration/config:WELCOME_CONTENT", {
                    channel: `<#${message.guild.settings.plugins.welcome.channelID}>`,
                    withImage: message.guild.settings.plugins.welcome.withImage ? message.translate("common:YES") : message.translate("common:NO")
                })
            :   message.translate("administration/config:WELCOME_DISABLED")
        );
            
        // Goodbye plugin
        embed.addField(message.translate("administration/config:GOODBYE_TITLE"),
            (message.guild.settings.plugins.goodbye.enabled) ?
                message.translate("administration/config:GOODBYE_CONTENT", {
                    channel: `<#${message.guild.settings.plugins.goodbye.channelID}>`,
                    withImage: message.guild.settings.plugins.goodbye.withImage ? message.translate("common:YES") : message.translate("common:NO")
                })
            :   message.translate("administration/config:GOODBYE_DISABLED")
        );

        // Special channels
        embed.addField(message.translate("administration/config:SPECIAL_CHANNELS"),
            message.translate("administration/config:MODLOGS", {
                channel:    message.guild.settings.specialChannels.modlogs
                            ? `<#${message.guild.settings.specialChannels.modlogs}>`
                            : message.translate("common:NOT_DEFINED")
            }) + "\n" +
            message.translate("administration/config:FORTNITESHOP", {
                channel:    message.guild.settings.specialChannels.fortniteshop
                            ? `<#${message.guild.settings.specialChannels.fortniteshop}>`
                            : message.translate("common:NOT_DEFINED")
            }) + "\n" +
            message.translate("administration/config:SUGGESTIONS", {
                channel:    message.guild.settings.specialChannels.suggestions
                            ? `<#${message.guild.settings.specialChannels.suggestions}>`
                            : message.translate("common:NOT_DEFINED")
            }) + "\n" +
            message.translate("administration/config:REPORTS", {
                channel:    message.guild.settings.specialChannels.reports
                            ? `<#${message.guild.settings.specialChannels.reports}>`
                            : message.translate("common:NOT_DEFINED")
            })
        );
        
        // Automod plugin
        embed.addField(message.translate("administration/config:AUTOMOD_TITLE"),
            (message.guild.settings.plugins.automod.enabled) ?
                message.translate("administration/config:AUTOMOD_CONTENT", {
                    channels: message.guild.settings.plugins.automod.ignored.map((ch) => `<#${ch}>`)
                })
            :   message.translate("administration/config:AUTOMOD_DISABLED")
        );

        // Dashboard link
        embed.addField(message.translate("administration/config:DASHBOARD_TITLE"), `[${message.translate("administration/config:DASHBOARD_CONTENT")}](${Constants.Links.DASHBOARD})`);

        message.channel.send(embed);
    }

}

/*embed.addField(headings[8][0],
    (!guildData.plugins.autoDeleteModCommands) ?
        message.language.get("CONFIGURATION_AUTODELETEMOD")
    :   headings[8][1]
);*/

/*embed.addField(headings[4][0],
    (guildData.slowmode.channels.length > 0) ?
        guildData.slowmode.channels.map((ch) => `<#${ch.id}> (${message.language.convertMs(ch.time)})\n`)
    :   headings[4][1]
);*/

/*embed.addField(headings[6][0],
    message.language.get("CONFIGURATION_WARNS", guildData.plugins.warnsSanctions.kick, guildData.plugins.warnsSanctions.ban)
);*/
