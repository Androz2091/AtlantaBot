const Command = require("../../base/Command.js"),
c = require("../../config.js"),
Canvas = require("canvas"),
fs = require("fs"),
Discord = require("discord.js"),
fortnite = require("fortnite-9812");
const { resolve } = require("path");
// Register assets fonts
Canvas.registerFont(resolve("./assets/fonts/Burbank-Big-Condensed-Bold-Font.otf"), { family: "Burbank" });
const applyItemName = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 40;

    do {
        // Assign the font
        ctx.font = `${fontSize -= 5}px Burbank`;
        // Compare pixel width
    } while (ctx.measureText(text).width > 260);

    // Return the result
    return ctx.font;
};

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
            return message.channel.send(message.language.get("ERR_COMMAND_DISABLED"));
        }
        let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        let fortniteShop = require("../../utils/fortniteShop.js");
        let path = await fortniteShop.checkImage(this.client);
        let attachment = new Discord.MessageAttachment(`./assets/img/fortnite/shop/${message.language.getLang()}/${fortniteShop.getFileName()}.png`, `${fortniteShop.getFileName()}.png`),
        embed = new Discord.MessageEmbed()
        .setAuthor(message.language.get("FORTNITESHOP_TITLE", message.language.printDate(new Date(Date.now())), this.client.user.displayAvatarURL()))
        .attachFiles(attachment)
        .setImage(`attachment://${fortniteShop.getFileName()}.png`)
        .setColor(this.client.config.embed.color)
        .setFooter(this.client.config.embed.footer);
        let msg = await message.channel.send(embed);
        await m.delete();
        await msg.react("😍");
        await msg.react("😐");
        await msg.react("😭");
    }
}

module.exports = Fortniteshop;