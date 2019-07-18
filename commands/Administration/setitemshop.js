const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setitemshop extends Command {

    constructor (client) {
        super(client, {
            name: "setitemshop",
            description: (language) => language.get("SETITEMSHOP_DESCRIPTION"),
            usage: (language) => language.get("SETITEMSHOP_USAGE"),
            examples: (language) => language.get("SETITEMSHOP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "setshop" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let channel = message.mentions.channels.first() || message.channel;
        data.settings.plugins.itemshop = channel.id;
        data.settings.markModified("plugins.itemshop");
        data.settings.save();

        message.channel.send(message.language.get("SETITEMSHOP_SUCCESS", message.channel));

        let today = new Date();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        let date = today.getFullYear()+'-'+(mm>9 ? '' : '0') +mm+'-'+(dd>9 ? '' : '0')+dd
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("ITEMSHOP_TITLE"), this.client.user.displayAvatarURL())
            .setImage(`http://api.craftburg.net/fn-shop/atlanta/itemshop_${date}.png`)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        let msg = await channel.send(embed);

        await msg.react("😍");
        await msg.react("😐");
        await msg.react("😭");

    }

}

module.exports = Setitemshop;
