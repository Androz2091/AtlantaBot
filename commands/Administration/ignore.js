const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Ignore extends Command {

    constructor (client) {
        super(client, {
            name: "ignore",
            description: (language) => language.get('IGNORE_DESCRIPTION'),
            dirname: __dirname,
            usage: "ignore [#channel]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$ignore #général",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the first mentionned channel
        var channel = message.mentions.channels.first();
        if(!channel) return message.channel.send(message.language.get('MENTION_CHANNEL'));

        var ignored = guild_data.ignored_channels.includes(channel.id);

        // If the channel is already ignored
        if(ignored){
            var new_channels = [];
            guild_data.ignored_channels.forEach(element => {
                if(element !== channel.id) new_channels.push(element);
            });
            // Then save the new channels
            this.client.databases[1].set(`${message.guild.id}.ignored_channels`, new_channels);
            // Success
            return message.channel.send(message.language.get('UNIGNORE_SUCESS', (channel)));
        } else if(!ignored){
            var new_channels = guild_data.ignored_channels;
            new_channels.push(channel.id);
            // Then save the new channels
            this.client.databases[1].set(`${message.guild.id}.ignored_channels`, new_channels);
            // Success
            return message.channel.send(message.language.get('IGNORE_SUCESS', (channel)));
        }
        
    }

}

module.exports = Ignore;