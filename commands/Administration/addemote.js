const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Addemote extends Command {

    constructor (client) {
        super(client, {
            name: "addemote",
            description: (language) => language.get("ADDEMOTE_DESCRIPTION"),
            usage: (language) => language.get("ADDEMOTE_USAGE"),
            examples: (language) => language.get("ADDEMOTE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let url = args[0];
        if(!url){
            return message.channel.send(message.language.get("ADDEMOTE_ERR_URL"));
        }

        let name = args[1];
        if(!name){
            return message.channel.send(message.language.get("ADDEMOTE_ERR_NAME"));
        }

        message.guild.emojis.create(url, name).then((emote) => {
            message.channel.send(message.language.get("ADDEMOTE_SUCCESS", emote));
        }).catch((err) => {
            return message.channel.send(message.language.get("ADDEMOTE_ERROR"));
        });
    }

}

module.exports = Addemote;