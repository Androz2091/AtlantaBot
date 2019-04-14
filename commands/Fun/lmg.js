const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Lmg extends Command {

    constructor (client) {
        super(client, {
            name: "lmg",
            description: (language) => language.get('LMG_DESCRIPTION'),
            dirname: __dirname,
            usage: "lmg [search]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "MANAGE_MESSAGES" ],
            nsfw: false,
            examples: "$lmg Is the sky blue ?",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(!args[0]) return message.channel.send(message.language.get('LMG_SEARCH'))
        message.delete();
        var the_request = args.join(' ');
        the_request = the_request.replace(/[' '_]/g,'+');
        the_request = 'http://lmgtfy.com/?q=' + the_request;
        message.channel.send(the_request);
        
    }

}

module.exports = Lmg;