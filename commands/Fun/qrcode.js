const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Qrcode extends Command {

    constructor (client) {
        super(client, {
            name: "qrcode",
            description: (language) => language.get('QRCODE_DESCRIPTION'),
            dirname: __dirname,
            usage: "qrcode [word]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$qrcode Vache",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var word = args[0];
        if(!word) return message.channel.send(message.language.get('QRCODE_TEXT'));
    
        message.channel.send(message.language.get('PLEASE_WAIT')).then(m => {
            message.channel.send({
                files: [{
                  attachment: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${word}`,
                  name: `${word}.png` //.gif si c'est un gif
                }]
            }).then( () => m.delete());
        });
    
    }

}

module.exports = Qrcode;