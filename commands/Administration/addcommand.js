const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Addcommand extends Command {

    constructor (client) {
        super(client, {
            name: "addcommand",
            description: (language) => language.get('ADDCOMMAND_DESCRIPTION'),
            dirname: __dirname,
            usage: "addcommand [nom] [réponse]",
            enabled: true,
            guildOnly: true,
            aliases: ["pong",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$addcommand ip 192.168.1.1",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets command name
        var name = args[0];
        if(!name) return message.channel.send(message.language.get('ADDCOMMAND_NAME'));

        // If the command already exist
        if(this.client.commands.get(name) || this.client.aliases.get(name) || guild_data.commands[name]) return message.channel.send(message.language.get('ADDCOMMAND_ALREADY', name));

        // Gets the command answer
        var answer = args.slice(1).join(' ');
        if(!answer) return message.channel.send(message.language.get('ADDCOMMAND_ANSWER'));


        var commands = {};
        for(var cmd in guild_data.commands){
            var rep = guild_data.commands[cmd];
            commands[cmd] = rep;
        }
        commands[name] = answer;

        this.client.databases[1].set(`${message.guild.id}.commands`, commands);

        message.channel.send(message.language.get('ADDCOMMAND_SUCCESS', name));
    }
    
}

module.exports = Addcommand;