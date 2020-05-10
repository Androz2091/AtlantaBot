const Command = require("../../base/Command.js"),
fs = require("fs"),
Discord = require("discord.js");

class Setfortniteshop extends Command {

    constructor(client) {
        super(client, {
            name: "setfortniteshop",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["setfnshop"],
            memberPermissions: ["MANAGE_GUILD"],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run(message, args, data) {

        if (!data.config.apiKeys.fortniteFNBR || data.config.apiKeys.fortniteFNBR.length === "") {
            return message.error("misc:COMMAND_DISABLED");
        }

        let fortniteShop = require("../../helpers/fortniteShop.js"),
        path = `./assets/img/fortnite/shop/${data.guild.language}/${fortniteShop.getFileName()}.png`;

        if (data.guild.plugins.fortniteshop && !message.mentions.channels.first() || message.mentions.channels.first() && data.guild.plugins.fortniteshop === message.mentions.channels.first().id) {
            data.guild.plugins.fortniteshop = false;
            data.guild.markModified("plugins.fortniteshop");
            data.guild.save();
            return message.success("administration/setfortniteshop:DISABLED");
        }

        let channel = message.mentions.channels.first() || message.channel;
        data.guild.plugins.fortniteshop = channel.id;
        data.guild.markModified("plugins.fortniteshop");
        data.guild.save();

        message.success("administration/setfortniteshop:ENABLED", {
            channel: channel.toString()
        });

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
        let msg = await channel.send(embed);
        await msg.react("😍");
        await msg.react("😐");
        await msg.react("😭");
        return;

    }

}

module.exports = Setfortniteshop;