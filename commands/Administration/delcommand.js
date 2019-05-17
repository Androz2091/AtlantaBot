const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Delcommand extends Command {

    constructor (client) {
        super(client, {
            name: "delcommand",
            description: (language) => language.get('DELCOMMAND_DESCRIPTION'),
            dirname: __dirname,
            usage: "delcommand [name]",
            enabled: true,
            guildOnly: true,
            aliases: ["pong",],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$delcommand ip",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets command name
        var name = args[0];
        if(!name) return message.channel.send(message.language.get('DELCOMMAND_NAME'));

        // If the command already exist
        if(!guild_data.commands[name]) return message.channel.send(message.language.get('DELCOMMAND_EXIST', name));

        var commands = {};
        for(var cmd in guild_data.commands){
            if(cmd !== name){
                var rep = guild_data.commands[cmd];
                commands[cmd] = rep;
            }
        }

        this.client.databases[1].set(`${message.guild.id}.commands`, commands);

        message.channel.send(message.language.get('DELCOMMAND_SUCCESS', name));
    }
    
}

module.exports = Delcommand;