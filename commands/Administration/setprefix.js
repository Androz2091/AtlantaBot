const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setprefix extends Command {

    constructor (client) {
        super(client, {
            name: "setprefix",
            description: (language) => language.get("SETPREFIX_DESCRIPTION"),
            usage: (language) => language.get("SETPREFIX_USAGE"),
            examples: (language) => language.get("SETPREFIX_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let prefix = args[0];
        if(!prefix){
            return message.channel.send(message.language.get("SETPREFIX_ERR_PREFIX"));
        }
        if(prefix.length > 5){
            return message.channel.send(message.language.get("SETPREFIX_ERR_CARACT"));
        }
        
        data.settings.prefix = prefix;
        data.settings.save();

        // Sucess
        return message.channel.send(message.language.get("SETPREFIX_SUCCESS", prefix));
        
    }

}

module.exports = Setprefix;