const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Credits extends Command {

    constructor (client) {
        super(client, {
            name: "credits",
            description: (language) => language.get('CREDITS_DESCRIPTION'),
            dirname: __dirname,
            usage: "credits [@membre]",
            enabled: true,
            guildOnly: true,
            aliases: ["balance"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$credits\n$credits @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the guildMember whose profile you want to display
        var member = message.mentions.members.size > 0 ? message.mentions.members.first() : message.member;

        // Check if the member is a bot
        if(member.user.bot) return message.channel.send(message.language.get('IS_A_BOT'));

        // Gets the data of the guildMember whose profile you want to display
        var member_data = (message.member === member) ? membersdata[0] : membersdata[1]; 

        var embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('CREDITS_HEADING', member.user.username))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setDescription(message.language.get('CREDITS_CONTENT', member_data.credits, member.user.username))
        message.channel.send(embed);
    }

}

module.exports = Credits;