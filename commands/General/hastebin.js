const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Hastebin extends Command {

    constructor (client) {
        super(client, {
            name: "hastebin",
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
            return message.error("general/hastebin:MISSING_TEXT");
        }

        try {
            let res = await fetch("https://hasteb.in/documents", {
                method: "POST",
                body: content,
                headers: { "Content-Type": "text/plain" }
            });
            
            let json = await res.json();
            if(!json.key){
                return message.error("misc:ERR_OCCURRED");
            }
            let url = "https://hasteb.in/"+json.key+".js";

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.translate("general/hastebin:SUCCESS"))
                .setDescription(url)
                .setColor(data.config.embed.color);
            message.channel.send(embed);
        } catch(e){
            message.error("misc:ERR_OCCURRED");
        }
        
    }

}

module.exports = Hastebin;