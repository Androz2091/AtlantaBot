const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class ShortURL extends Command {

    constructor (client) {
        super(client, {
            name: "shorturl",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "minimize" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
    
        let url = args[0];
        if(!url){
            return message.error("general/shorturl:MISSING_URL");
        }

        let res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
        let body = await res.text();

        if(body === "Error: Please enter a valid URL to shorten"){
            return message.error("general/shorturl:MISSING_URL");
        }

        let embed = new Discord.MessageEmbed()
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setDescription(body);
        message.channel.send(embed);

    }

}

module.exports = ShortURL;