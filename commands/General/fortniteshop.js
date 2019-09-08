const Command = require("../../base/Command.js"),
fs = require("fs"),
Discord = require("discord.js");


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

        let fortniteShop = require("../../utils/fortniteShop.js"),
        path = `./assets/img/fortnite/shop/${message.language.getLang()}/${fortniteShop.getFileName()}.png`,
        m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);

        if(!fs.existsSync(path)) {
            await fortniteShop.writeImage(this.client);
        }

        let attachment = new Discord.MessageAttachment(path, `${fortniteShop.getFileName()}.png`),
        embed = new Discord.MessageEmbed()
        .setAuthor(message.language.get("FORTNITESHOP_TITLE", message.language.printDate(new Date(Date.now())), this.client.user.displayAvatarURL()))
        .attachFiles(attachment)
        .setImage(`attachment://${fortniteShop.getFileName()}.png`)
        .setColor(this.client.config.embed.color)
        .setFooter(this.client.config.embed.footer);
        await message.channel.send(embed);
        await m.delete();
        return;
        
    }
}

module.exports = Fortniteshop;
