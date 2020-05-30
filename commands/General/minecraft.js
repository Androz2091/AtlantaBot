const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch"),
gamedig = require("gamedig");

class Minecraft extends Command {

    constructor (client) {
        super(client, {
            name: "minecraft",
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
            return message.error("general/minecraft:MISSING_IP");
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

        let json = null;
        
        await gamedig.query(options).then((res) => {
            json = res;
        }).catch((err) => {});

        if(!json){
            options.type = "minecraftpe";
            await gamedig.query(options).then((res) => {
                json = res;
            }).catch((err) => {});
        }

        if(!json){
            return message.error("general/minecraft:FAILED");
        }

        let imgRes = await fetch("https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t="+ip);
        let imgAttachment = new Discord.MessageAttachment(await imgRes.buffer(), "success.png");

        let mcEmbed = new Discord.MessageEmbed()
            .setAuthor(message.translate("general/minecraft:FIELD_NAME", {
                ip
            }))
            .addField(message.translate("general/minecraft:FIELD_VERSION"),
                json.raw.version.name || json.raw.server_engine
            )
            .addField(message.translate("general/minecraft:FIELD_CONNECTED"),
                message.translate("general/minecraft:PLAYERS", {
                    count: (json.raw.players ? json.raw.players.online : json.players.length)
                })
            )
            .addField(message.translate("general/minecraft:FIELD_MAX"),
                message.translate("general/minecraft:PLAYERS", {
                    count: (json.raw.players ? json.raw.players.max : json.maxplayers)
                })
            )
            .addField(message.translate("general/minecraft:FIELD_STATUS"), message.translate("general/minecraft:ONLINE"))
            .addField(message.translate("general/minecraft:FIELD_IP"), json.connect)
            .setColor(data.config.embed.color)
            .setThumbnail(favicon)
            .setFooter(data.config.embed.footer);

        message.channel.send([ mcEmbed, imgAttachment ]);

    }

}

module.exports = Minecraft;