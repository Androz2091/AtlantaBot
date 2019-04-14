const Command = require("../../base/Command.js"),
Discord = require('discord.js');

const fetch = require('node-superfetch');

class Hastebin extends Command {

    constructor (client) {
        super(client, {
            name: "hastebin",
            description: (language) => language.get('HASTEBIN_DESCRIPTION'),
            dirname: __dirname,
            usage: "hastebin [text]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$hastebin Hello World",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var content = args.join(' ');
        if(!content) return message.channel.send(message.language.get('HASTEBIN_TEXT'))

        fetch.post(`https://hastebin.com/documents`).send(content).then(body => {
            message.channel.send(message.language.get('HASTEBIN_SUCCESS', `https://hastebin.com/${body.body.key}`));
        }).catch(err => message.channel.send(message.language.get('AN_ERROR_OCCURENCED')));
        
    }

}

module.exports = Hastebin;