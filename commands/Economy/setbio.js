const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setbio extends Command {

    constructor (client) {
        super(client, {
            name: "setbio",
            description: (language) => language.get("BIOGRAPHY_DESCRIPTION"),
            usage: (language) => language.get("BIOGRAPHY_USAGE"),
            examples: (language) => language.get("BIOGRAPHY_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "biography", "setdesc" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        let bio = args.join(" ");
        if(!bio){
            return message.channel.send(message.language.get("SETBIO_ERR_NO_BIO"));
        }
        if(bio.length > 100){
            return message.channel.send(message.language.get("SETBIO_ERR_CARACT"));
        }
        data.users[0].bio = bio;
        data.users[0].save();
        message.channel.send(message.language.get("SETBIO_SUCCESS"));
    }

}

module.exports = Setbio;