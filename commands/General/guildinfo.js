const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Guildinfo extends Command {

    constructor (client) {
        super(client, {
            name: "guildinfo",
            description: (language) => language.get('GUILDINFO_DESCRIPTION'),
            dirname: __dirname,
            usage: "guildinfo",
            enabled: true,
            guildOnly: true,
            aliases: ["si","gi","serverinfo"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$guildinfo",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var guild = message.guild;

        var embed = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setThumbnail(guild.iconURL)
            .addField(message.language.get('GUILDINFO_FIELDS')[0], guild.name, true)
            .addField(message.language.get('GUILDINFO_FIELDS')[1], message.language.printDate(guild.createdAt), true)
            .addField(message.language.get('GUILDINFO_FIELDS')[2], message.language.get('GUILDINFO_MEMBERCOUNT', guild.members), true)
            .addField(message.language.get('GUILDINFO_FIELDS')[4], guild.afkChannel || message.language.get('GUILDINFO_NO_AFK'), true)
            .addField(message.language.get('GUILDINFO_FIELDS')[5], guild.id, true)
            .addField(message.language.get('GUILDINFO_FIELDS')[6], guild.owner, true)
            .addField(message.language.get('GUILDINFO_FIELDS')[3], message.language.get('GUILDINFO_CHANNELS', guild.channels), true)
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Guildinfo;