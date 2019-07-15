const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Hastebin extends Command {

    constructor (client) {
        super(client, {
            name: "hastebin",
            description: (language) => language.get("HASTEBIN_DESCRIPTION"),
            usage: (language) => language.get("HASTEBIN_USAGE"),
            examples: (language) => language.get("HASTEBIN_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "pastebin" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let content = args.join(" ");
        if(!content){
            return message.channel.send(message.language.get("HASTEBIN_ERR_TEXT"));
        }

        try {
            let res = await fetch("https://www.hastebin.com/documents", {
                method: "POST",
                body: content,
                headers: { "Content-Type": "text/plain" }
            });
            
            let json = res.json();
            if(!json.key){
                return message.channel.send(message.language.get("ERR_OCCURENCED"));
            }
            let url = "https://hastebin.com/"+json.key+".js";

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("HASTEBIN_TITLE"))
                .setDescription(url)
                .setColor(data.config.embed.color);
            message.channel.send(embed);
        } catch(e){
            message.channel.send(message.language.get("ERR_OCCURENCED"));
        }
        
    }

}

module.exports = Hastebin;