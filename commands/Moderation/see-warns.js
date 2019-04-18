const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class SeeWarns extends Command {

    constructor (client) {
        super(client, {
            name: "warns",
            description: (language) => language.get('SEEWARNS_DESCRIPTION'),
            dirname: __dirname,
            usage: "warns [@member]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$warns @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the first mentionned member
        var member = message.mentions.members.first();
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));

        var embed = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);

        var memberSanctions = guild_data.warns_sanctions[member.id];

        if(!memberSanctions){
            embed.setDescription(message.language.get('SEEWARNS_NO_WARN'));
            return message.channel.send(embed);
        } else {
            memberSanctions.forEach(warn => {
                embed.addField(message.language.get('SEEWARNS_HEADER', warn.case),
                    `${message.language.get('SEEWARNS_MODERATOR', warn)}\n${message.language.get('SEEWARNS_REASON', warn)}`
                ,true);
            });
            message.channel.send(embed);
        }
    }

}

module.exports = SeeWarns;