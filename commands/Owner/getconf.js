const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Getconf extends Command {

    constructor (client) {
        super(client, {
            name: "getconf",
            description: (language) => language.get("GETCONF_DESCRIPTION"),
            usage: (language) => language.get("GETCONF_USAGE"),
            examples: (language) => language.get("GETCONF_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let guildID = args[0];
        if(!guildID){
            return message.channel.send(message.language.get("GETCONF_ERR_ID"));
        }

        let guild = message.client.guilds.get(guildID);
        if(!guild){
            return message.channel.send(message.language.get("GETCONF_ERR_GUILD_NOT_FOUND"));
        }

        const headings = message.language.get("CONFIGURATION_HEADINGS"),
        settings = await message.client.functions.getSettings(message.client, guild);
        
        let embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        embed.addField(message.language.get("UTILS").PREFIX, settings.prefix);

        embed.addField(headings[0][0],
            (settings.ignoredChannels.length > 0) ?
            settings.ignoredChannels.map((ch) => "<#"+ch+">").join(", ")
            : headings[0][1]
        );
    
        embed.addField(headings[1][0], 
            (settings.plugins.autorole.enabled) ?
                message.language.get("CONFIGURATION_AUTOROLE", settings.plugins.autorole.role)
            :   headings[1][1]
        );
        
        embed.addField(headings[2][0],
            (settings.plugins.welcome.enabled) ?
                message.language.get("CONFIGURATION_WELCOME", settings.plugins.welcome.image.enabled, settings.plugins.welcome.image.color, settings.plugins.welcome.channel)
            :   headings[2][1]
        );
            
        embed.addField(headings[3][0],
            (settings.plugins.goodbye.enabled) ?
                message.language.get("CONFIGURATION_GOODBYE", settings.plugins.goodbye.image.enabled, settings.plugins.goodbye.image.color, settings.plugins.goodbye.channel)
            :   headings[3][1]
        );

        embed.addField(headings[4][0],
            (settings.slowmode.channels.length > 0) ?
                settings.slowmode.channels.map((ch) => `<#${ch.id}> (${message.language.convertMs(ch.time)})\n`)
            :   headings[4][1]
        );

        embed.addField(headings[5][0],
            message.language.get("CONFIGURATION_MODLOGS", settings.plugins.modlogs)+"\n"+
            message.language.get("CONFIGURATION_SUGGESTIONS", settings.plugins.suggestions)
        );
        
        embed.addField(headings[6][0],
            message.language.get("CONFIGURATION_WARNS", settings.plugins.warnsSanctions.kick, settings.plugins.warnsSanctions.ban)
        );
        
        embed.addField(headings[7][0],
            (settings.plugins.automod.enabled) ?
                message.language.get("CONFIGURATION_AUTOMOD", settings.plugins.automod.ignored)
            :   headings[7][1]
        );

        // Then, send the embed in the current channel
        message.channel.send(embed);
    }

}

module.exports = Getconf;