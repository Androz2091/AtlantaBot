const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch"),
gamedig = require("gamedig");

class Minecraft extends Command {

    constructor (client) {
        super(client, {
            name: "minecraft",
            description: (language) => language.get("MINECRAFT_DESCRIPTION"),
            usage: (language) => language.get("MINECRAFT_USAGE"),
            examples: (language) => language.get("MINECRAFT_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "mc" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let ip = args[0];
        if(!ip){
            return message.channel.send(message.language.get("MINECRAFT_ERR_IP"));
        }

        let favicon = `https://eu.mc-api.net/v3/server/favicon/${ip}`;
        let options = {
            type: "minecraft",
            host: ip
        }

        if(ip.split(":").length > 1){
            options = {
                type: "minecraft",
                host: ip.split(":")[0],
                port: ip.split(":")[1]
            };
        }

        gamedig.query(options).then((json) => {
            
            let imgRes = await fetch("https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t="+ip);
            let imgAttachment = new Discord.MessageAttachment(await imgRes.buffer(), "success.png");
    
            let mcEmbed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("MINECRAFT_HEADINGS", ip)[0])
                .addField(message.language.get("MINECRAFT_HEADINGS", ip)[1], json.raw.version.name)
                .addField(message.language.get("MINECRAFT_HEADINGS", ip)[2], message.language.get("MINECRAFT_PLAYERS", json.raw.players.online))
                .addField(message.language.get("MINECRAFT_HEADINGS", ip)[3], message.language.get("MINECRAFT_PLAYERS", json.raw.players.max))
                .addField(message.language.get("MINECRAFT_HEADINGS", ip)[4], message.language.get("MINECRAFT_ONLINE", json.ping))
                .addField(message.language.get("MINECRAFT_HEADINGS", ip)[5], json.connect)
                .setColor(data.config.embed.color)
                .setThumbnail(favicon)
                .setFooter(data.config.embed.footer);
    
            message.channel.send([ mcEmbed, imgAttachment ]);

        }).catch((err) => {
            return message.channel.send(message.language.get("MINECRAFT_ERR_OFFLINE"));
        });

    }

}

module.exports = Minecraft;