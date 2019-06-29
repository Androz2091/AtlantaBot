const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Flip extends Command {

    constructor (client) {
        super(client, {
            name: "flip",
            description: (language) => language.get("FLIP_DESCRIPTION"),
            usage: (language) => language.get("FLIP_USAGE"),
            examples: (language) => language.get("FLIP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "dice" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {

        let isFace = message.client.functions.randomNum(0, 2) === 1;
        if(isFace){
            return message.channel.send(message.language.get("FLIP_FACE"))
        } else {
            return message.channel.send(message.language.get("FLIP_PILE"));
        }

    }

}

module.exports = Flip;