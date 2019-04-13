const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Getinvite extends Command {

    constructor (client) {
        super(client, {
            name: "getinvite",
            description: (language) => language.get('GETINVITE_DESCRIPTION'),
            dirname: __dirname,
            usage: "getinvite [ID]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$getinvite 565048515357835264",
            owner: true
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var id = args[0];
        if(!id) return message.channel.send(message.language.get('INVALID_ID'));

        var guild = this.client.guilds.get(id);
        if(guild){
            var the_channel = guild.channels.filter(channel => channel.type === "text");
            the_channel.first().createInvite({ maxAge : '0', reason : "getinvite"  }).then(i => message.channel.send(i.url)).catch(err => message.channel.send(message.language.get('GETINVITE_ERROR')));
        } else return message.channel.send(message.language.get('GETINVITE_NO_GUILD'));
    }

}

module.exports = Getinvite;