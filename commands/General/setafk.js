const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Setafk extends Command {

    constructor (client) {
        super(client, {
            name: "setafk",
            description: (language) => language.get("SETAFK_DESCRIPTION"),
            usage: (language) => language.get("SETAFK_USAGE"),
            examples: (language) => language.get("SETAFK_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "afk" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false
        });
    }

    async run (message, args, data) {

        let reason = args.join(" ");
        if(!reason){
            return message.channel.send(message.language.get("SETAFK_ERR_REASON"));
        }

        // Send success message
        message.channel.send(message.language.get("SETAFK_SUCCESS", reason));

        data.users[0].afk = reason;
        data.users[0].save();

    }

}

module.exports = Setafk;