const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Ascii extends Command {

    constructor (client) {
        super(client, {
            name: "ascii",
            description: (language) => language.get('ASCII_DESCRIPTION'),
            dirname: __dirname,
            usage: "ascii [text]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$ascii Hello World !",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the text 
        var text = args.join(' ');
        if(!text || text.length > 20) return message.channel.send(message.language.get('ASCII_TEXT'));

        var Ascii = require('ascii-art');
    
        Ascii.font(text, 'Doom', function(rendered){
            message.channel.send('```'+rendered+'```');
        });
        
    }

}

module.exports = Ascii;