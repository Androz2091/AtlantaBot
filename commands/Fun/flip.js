const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Flip extends Command {

    constructor (client) {
        super(client, {
            name: "flip",
            description: (language) => language.get('FLIP_DESCRIPTION'),
            dirname: __dirname,
            usage: "flip",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$flip",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var pile = this.client.functions.randomNum(0, 2) === 1;
        if(pile) return message.channel.send(message.language.get('FLIP_PILE'))
        else return message.channel.send(message.language.get('FLIP_FACE'));

    }

}

module.exports = Flip;