const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Configuration extends Command {

    constructor (client) {
        super(client, {
            name: "configuration",
            description: (language) => language.get('CONFIGURATION_DESCRIPTION'),
            dirname: __dirname,
            usage: "configuration",
            enabled: true,
            guildOnly: true,
            aliases: ["conf"],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$configuration",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Creates new discord rich embed to display informations
        var embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .addField(message.language.get('PREFIX'), guild_data.prefix)
            .addField(message.language.get('IGNORED_CHANNELS'),
                (guild_data.ignored_channels.length > 0) ? 
                guild_data.ignored_channels.map(ch => '<#'+ch+'>').join(', ')
                : message.language.get('NO_IGNORED_CHANNELS')
            )
            .addField(message.language.get('AUTOROLE'), 
                (guild_data.autorole.status == 'on') ?
                    message.language.get('CONFIGURATION_AUTOROLE_ENABLED', guild_data.autorole)
                :   message.language.get('DISABLED_PLUGIN')

            )
            .addField(message.language.get('WELCOME'),
                (guild_data.welcome.status == 'on') ?
                    message.language.get('CONFIGURATION_WELCOME_ENABLED', guild_data.welcome)
                :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('LEAVE'),
                (guild_data.leave.status == 'on') ?
                    message.language.get('CONFIGURATION_LEAVE_ENABLED', guild_data.leave)
                :   message.language.get('DISABLED_PLUGIN')
            )
            .addField(message.language.get('SLOWMODE'),
                (Object.keys(guild_data.slowmode).length > 0) ? getSlowmodes(guild_data.slowmode) : message.language.get('NO_SLOWMODE')
            )
            .addField(message.language.get('CHANNELS'),
                message.language.get('CONF_LOGS', guild_data)+
                message.language.get('CONF_SUGG', guild_data)
            )
            .addField(message.language.get('CONF_WARNS'),
                getWarns()
            )
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
        
        // Then, send the embed in the current channel
        message.channel.send(embed);

        function getSlowmodes(obj){
            var str = '';
            for(var id in obj){
                var time = obj[id];
                str += `<#${id}> | ${message.language.convertMs(time)}\n`;
            }
            return str;
        }
        
        function getWarns(){
            var str = '';
            str += `Kick : ${guild_data.automod_warns['kick'] ? `**${guild_data.automod_warns['kick']}** warns` : message.language.get('UNDEFINED')}\n`;
            str += `Ban : ${guild_data.automod_warns['ban'] ? `**${guild_data.automod_warns['ban']}** warns` : message.language.get('UNDEFINED')}\n`;
            return str;
        }
    }

}

module.exports = Configuration;