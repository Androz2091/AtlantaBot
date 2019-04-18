const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Invitations extends Command {

    constructor (client) {
        super(client, {
            name: "invitations",
            description: (language) => language.get('INVITATIONS_DESCRIPTION'),
            dirname: __dirname,
            usage: "invitations (@member)",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD" ],
            nsfw: false,
            examples: "$invitations\n$invitations @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the member
        var member = (message.mentions.members.first()) ? message.mentions.members.first() : message.member;

        // Gets the invites
        let invites = await message.guild.fetchInvites();
        
        // Gets the invites of the member
        var tinvites = invites.filter(i => i.inviter === member.user);

        if(tinvites.size <= 0) return message.channel.send(message.language.get('INVITATIONS_NOBODY'));

        let index = 0;

        var str = '';
        tinvites.forEach(element => {
            index += element.uses;
            str += message.language.get('INVITATIONS_CODE', element);
        });
        
        const embed = new Discord.RichEmbed()
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setAuthor('Invites Tracker')
            .setDescription(message.language.get('INVITATIONS_HEADING', member, message))
            .addField(message.language.get('INVITATIONS_FIELDS')[0], `${index} ${message.language.get('INVITATIONS_FIELDS')[2]}`)
            .addField(message.language.get('INVITATIONS_FIELDS')[1], str) // This 

        message.channel.send(embed);
    }

}

module.exports = Invitations;