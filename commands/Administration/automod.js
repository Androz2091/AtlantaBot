const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Automod extends Command {

    constructor (client) {
        super(client, {
            name: "automod",
            description: (language) => language.get('AUTOMOD_DESCRIPTION'),
            dirname: __dirname,
            usage: "automod [on/off] (#channel)",
            enabled: true,
            guildOnly: true,
            aliases: ["automoderation"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
            nsfw: false,
            examples: "$automod on\n$automod off\n$automod off #channel",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // gets the status 
        var status = args[0];
        if(!args[0] || (args[0] !== 'on' && args[0] !== 'off')) return message.channel.send(message.language.get('AUTOMOD_STATUS'))

        if(status === 'on'){
            // Update databases
            this.client.databases[1].set(`${message.guild.id}.deleteinvite.status`, 'enabled');
            // Send success message
            message.channel.send(message.language.get('AUTOMOD_SUCCESS', guild_data.prefix));
        } else if (status === 'off'){
            if(message.mentions.channels.first()){
                // Update db
                var channel = message.mentions.channels.first();
                guild_data.deleteinvite.channels.push(channel.id);
                this.client.databases[1].set(`${message.guild.id}.deleteinvite.channels`, guild_data.deleteinvite.channels);
                // Sens success message
                message.channel.send(message.language.get('AUTOMOD_SUCCESS1', channel));
            } else {
                // Update db
                this.client.databases[1].set(`${message.guild.id}.deleteinvite.channels`, []);
                this.client.databases[1].set(`${message.guild.id}.deleteinvite.status`, 'disabled');
                // Sens success message
                message.channel.send(message.language.get('AUTOMOD_SUCCESS2'));
            }
        }
    }

}

module.exports = Automod;