const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Unmute extends Command {

    constructor (client) {
        super(client, {
            name: "unmute",
            description: (language) => language.get('UNMUTE_DESCRIPTION'),
            dirname: __dirname,
            usage: "unmute [@member]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES", "MANAGE_CHANNELS" ],
            nsfw: false,
            examples: "$unmute @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the first mentionned member
        var member = message.mentions.members.first();
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));
        
        // update db
        if(guild_data.muted[member.id]){
            guild_data.muted[member.id] = Date.now()+1000;
            this.client.databases[1].set(`${message.guild.id}.muted`, guild_data.muted);
        }

        // Send success message
        message.channel.send(message.language.get('UNMUTE_SUCCESS', member));

    }

}

module.exports = Unmute;