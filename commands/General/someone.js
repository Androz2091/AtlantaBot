const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Someone extends Command {

    constructor (client) {
        super(client, {
            name: "someone",
            description: (language) => language.get('SOMEONE_DESCRIPTION'),
            dirname: __dirname,
            usage: "someone",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$someone",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var member = message.guild.members.random(1)[0];
        
        var embed = new Discord.RichEmbed()
            .addField('Pseudo', member.user.username, true)
            .addField('Tag', member.user.discriminator, true)
            .addField('ID', member.user.id, true)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(data.embed.color);
        message.channel.send(embed);
        
    }

}

module.exports = Someone;