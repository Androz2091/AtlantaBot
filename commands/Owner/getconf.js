const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Getconf extends Command {

    constructor (client) {
        super(client, {
            name: "getconf",
            description: (language) => language.get('GETCONF_DESCRIPTION'),
            dirname: __dirname,
            usage: "getconf [ID]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$getconf 565048515357835264",
            owner: true
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the id provided
        var id = args[0];
        if(!id) return message.channel.send(message.language.get('INVALID_ID'));

        // Gets the conf
        var conf = this.client.databases[1].get(id);
        // if the conf doesn't exists but the bot is on the server, create them
        if(!conf){
            if(this.client.guilds.get(id)){
                this.client.functions.createGuild(this.client.guilds.get(id));
                conf = this.client.databases[1].get(id);
            } else return message.channel.send(message.language.get('GETCONF_NO_CONF'));
        } else {

            var guild_name = this.client.guilds.get(id) ? this.client.guilds.get(id).name : conf.name;

            // Creates new discord rich embed to display informations
            var embed = new Discord.RichEmbed()
                .setAuthor(guild_name)
                .addField(message.language.get('PREFIX'), conf.prefix)
                .addField(message.language.get('IGNORED_CHANNELS'),
                    (conf.ignored_channels.length > 0) ? 
                    conf.ignored_channels.map(ch => '<#'+ch+'>').join(', ')
                    : message.language.get('NO_IGNORED_CHANNELS')
                )
                .addField(message.language.get('AUTOROLE'), 
                    (conf.autorole.status == 'on') ?
                        message.language.get('CONFIGURATION_AUTOROLE_ENABLED', conf.autorole)
                    :   message.language.get('DISABLED_PLUGIN')

                )
                .addField(message.language.get('WELCOME'),
                    (conf.welcome.status == 'on') ?
                        message.language.get('CONFIGURATION_WELCOME_ENABLED', conf.welcome)
                    :   message.language.get('DISABLED_PLUGIN')
                )
                .addField(message.language.get('LEAVE'),
                    (conf.leave.status == 'on') ?
                        message.language.get('CONFIGURATION_LEAVE_ENABLED', conf.leave)
                    :   message.language.get('DISABLED_PLUGIN')
                )
                .addField(message.language.get('SLOWMODE'),
                    (Object.keys(conf.slowmode).length > 0) ? getSlowmodes(conf.slowmode) : message.language.get('NO_SLOWMODE')
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
        }
    }

}

module.exports = Getconf;