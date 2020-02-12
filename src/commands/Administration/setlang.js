const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setlang extends Command {

    constructor (client) {
        super(client, {
            name: "setlang",
            description: (language) => language.get("SETLANG_DESCRIPTION"),
            usage: (language) => language.get("SETLANG_USAGE"),
            examples: (language) => language.get("SETLANG_EXAMPLES"),
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

        if(!args[0]){
            return message.channel.send(message.language.get("SETLANG_ERR_LANG"));
        }

        if(args[0] === "french"){
            data.guild.language = "french";
            await data.guild.save();
            return message.channel.send(message.language.get("SETLANG_LANGS")[0]);
        }
        
        if(args[0] === "english"){
            data.guild.language = "english";
            await data.guild.save();
            return message.channel.send(message.language.get("SETLANG_LANGS")[1]);
        }
        
        return message.channel.send(message.language.get("SETLANG_ERR_LANG"));
        
    }

}

module.exports = Setlang;