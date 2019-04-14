const Command = require("../../base/Command.js"),
Discord = require('discord.js');
var md5 = require('md5');

class Lovecalc extends Command {

    constructor (client) {
        super(client, {
            name: "lovecalc",
            description: (language) => language.get('LOVECALC_DESCRIPTION'),
            dirname: __dirname,
            usage: "lovecalc [@member1] [@member2]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$lovecalc @Androz#2091 @Atlanta#6770",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the first mentionned member
        var member1 = message.mentions.members.first();
        var other_members = message.mentions.members.filter(member => member.id !== member1.id);
        var member2 = other_members.first();
        if(!member1 || !member2) return message.channel.send(message.language.get('LOVECALC_MENTIONS'));

        // Generate string to hash
        var str = `${member1.id}${member2.user.username}${member1.user.username}${member2.id}`;
        var hash = md5(str); // example : 7873428afaa5676dccce98964dede49f

        // Gets the percent of love
        var total = 0;
        var string_array = hash.split('');
        var nb_string = '';
        string_array.forEach(element => {
            if(!isNaN(element)) nb_string += element;
        });
        var percent = nb_string.substr(0, 2);
        
        var embed = new Discord.RichEmbed()
            .setAuthor('❤️ LoveCalc')
            .setDescription(message.language.get('LOVECALC_TEXT', percent, member1.user.username, member2.user.username))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
        
        message.channel.send(embed);
        
    }

}

module.exports = Lovecalc;