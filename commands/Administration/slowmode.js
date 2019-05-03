const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Slowmode extends Command {

    constructor (client) {
        super(client, {
            name: "slowmode",
            description: (language) => language.get('SLOWMODE_DESCRIPTION'),
            dirname: __dirname,
            usage: "slowmode [#channel] (temps)",
            enabled: true,
            guildOnly: true,
            aliases: ["slow"],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$slowmode #général 10m\n$slowmode #général",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var ms = require('ms');

        var channel = message.mentions.channels.first();
        if(!channel) return message.channel.send(message.language.get('MENTION_CHANNEL'));

        var time = args[1];

        if(!time){

            if(!guild_data.slowmode[channel.id]) return message.channel.send(message.language.get('INVALID_TIME'));

            message.channel.send(message.language.get('SLOWMODE_DISABLED', channel.id));

            // Creates new object without the channel
            var new_slowmode = {};
            for(var id in guild_data.slowmode){
                if(id !== channel.id){
                    var _time = guild_data.slowmde[id];
                    new_slowmode[id] = _time;
                }
            }

            // Updates the database
            this.client.databases[1].set(`${message.guild.id}.slowmode`, new_slowmode);
        } else {
            if(isNaN(ms(time))) return message.channel.send(message.language.get('INVALID_TIME'));
            message.channel.send(message.language.get('SLOWMODE_ENABLED', channel.id, time));

            // Creates new object without the channel
            var new_slowmode = {};
            for(var id in guild_data.slowmode){
                if(id !== channel.id){
                    var _time = guild_data.slowmode[id];
                    new_slowmode[id] = _time;
                }
            }
            // Then add the channel
            new_slowmode[channel.id] = ms(time);

            // Updates the database
            this.client.databases[1].set(`${message.guild.id}.slowmode`, new_slowmode);
        }
    }
}

module.exports = Slowmode;