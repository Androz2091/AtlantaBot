const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Ping extends Command {

    constructor (client) {
        super(client, {
            name: "ping",
            description: (language) => language.get('PING_DESCRIPTION'),
            dirname: __dirname,
            usage: "ping",
            enabled: true,
            guildOnly: false,
            aliases: ["pong",],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$ping",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        message.channel.send(message.language.get('PING', 0.0000)).then(m => m.edit(message.language.get('PING', Date.now()-m.createdTimestamp)));
    }

}

module.exports = Ping;