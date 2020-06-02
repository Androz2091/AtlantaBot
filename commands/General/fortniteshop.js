const Command = require("../../base/Command.js"),
fs = require("fs"),
Discord = require("discord.js"),
Canvas = require('discord-canvas')

class Fortniteshop extends Command {
    constructor (client) {
        super(client, {
            name: "fortniteshop",
            description: (language) => language.get("FORTNITESHOP_DESCRIPTION"),
            usage: (language) => language.get("FORTNITESHOP_USAGE"),
            examples: (language) => language.get("FORTNITESHOP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "fnshop" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 500
        });
    }

    async run(message, args, data) {

        if(!data.config.apiKeys.fortniteFNBR || data.config.apiKeys.fortniteFNBR.length === "") {
            return message.error("misc:COMMAND_DISABLED");
        }

        let m = await message.sendT("misc:PLEASE_WAIT", null, false, false, "loading");

        const shop = new Canvas.FortniteShop();
        let image = await shop
        .setToken(data.config.apiKeys.fortniteFNBR)
        .setText("header", message.translate("general/fortniteshop:HEADER").replace("{{date}}", "{date}"))
        .setText("daily", message.translate("general/fortniteshop:DAILY"))
        .setText("featured", message.translate("general/fortniteshop:FEATURED"))
        .setText("date", message.translate("general/fortniteshop:DATE"))
        .setText("footer", message.translate("general/fortniteshop:FOOTER"))
        .toAttachment();
        let attachment = new Discord.MessageAttachment(image, "shop.png");

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.translate("general/fortniteshop:HEADER", {
            date: message.language.printDate(new Date(Date.now()))
        }), this.client.user.displayAvatarURL())
        .attachFiles(attachment)
        .setImage(`attachment://shop.png`)
        .setColor(this.client.config.embed.color)
        .setFooter(this.client.config.embed.footer);
        await message.channel.send(embed);
        await m.delete();
        return;
        
    }
}

module.exports = Fortniteshop;
