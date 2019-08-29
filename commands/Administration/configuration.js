const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Configuration extends Command {

    constructor (client) {
        super(client, {
            name: "configuration",
            description: (language) => language.get("CONFIGURATION_DESCRIPTION"),
            usage: (language) => language.get("CONFIGURATION_USAGE"),
            examples: (language) => language.get("CONFIGURATION_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "conf", "config" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        const headings = message.language.get("CONFIGURATION_HEADINGS"),
        guildData = data.guild;
        
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        embed.addField(message.language.get("UTILS").PREFIX, data.guild.prefix);

        embed.addField(headings[0][0],
            (guildData.ignoredChannels.length > 0) ?
            guildData.ignoredChannels.map((ch) => "<#"+ch+">").join(", ")
            : headings[0][1]
        );
    
        embed.addField(headings[1][0], 
            (guildData.plugins.autorole.enabled) ?
                message.language.get("CONFIGURATION_AUTOROLE", guildData.plugins.autorole.role)
            :   headings[1][1]
        );
        
        embed.addField(headings[2][0],
            (guildData.plugins.welcome.enabled) ?
                message.language.get("CONFIGURATION_WELCOME", guildData.plugins.welcome.withImage, guildData.plugins.welcome.channel)
            :   headings[2][1]
        );
            
        embed.addField(headings[3][0],
            (guildData.plugins.goodbye.enabled) ?
                message.language.get("CONFIGURATION_GOODBYE", guildData.plugins.goodbye.withImage, guildData.plugins.goodbye.channel)
            :   headings[3][1]
        );

        embed.addField(headings[4][0],
            (guildData.slowmode.channels.length > 0) ?
                guildData.slowmode.channels.map((ch) => `<#${ch.id}> (${message.language.convertMs(ch.time)})\n`)
            :   headings[4][1]
        );

        embed.addField(headings[5][0],
            message.language.get("CONFIGURATION_MODLOGS", guildData.plugins.modlogs)+"\n"+
            message.language.get("CONFIGURATION_SUGGESTIONS", guildData.plugins.suggestions)+"\n"+
            message.language.get("CONFIGURATION_FORTNITESHOP", guildData.plugins.fortniteshop)
        );
        
        embed.addField(headings[6][0],
            message.language.get("CONFIGURATION_WARNS", guildData.plugins.warnsSanctions.kick, guildData.plugins.warnsSanctions.ban)
        );
        
        embed.addField(headings[7][0],
            (guildData.plugins.automod.enabled) ?
                message.language.get("CONFIGURATION_AUTOMOD", guildData.plugins.automod.ignored)
            :   headings[7][1]
        );

        embed.addField(headings[8][0],
            (!guildData.plugins.autoDeleteModCommands) ?
                message.language.get("CONFIGURATION_AUTODELETEMOD")
            :   headings[8][1]
        );
        

        embed.addField(headings[9][0], headings[9][1]);

        // Then, send the embed in the current channel
        message.channel.send(embed);
    }

}

module.exports = Configuration;