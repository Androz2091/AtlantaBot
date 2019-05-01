const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Invite extends Command {

    constructor (client) {
        super(client, {
            name: "invite",
            description: (language) => language.get('INVITE_DESCRIPTION'),
            dirname: __dirname,
            usage: "invite",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$invite",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(args[0]) return message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`);

        var embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('INVITE_HEADING'))
            .setDescription(message.language.get('INVITE_DESC', guild_data.prefix))
            .addField(message.language.get('INVITE_FIELD1'), `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`)
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            
        this.client.functions.supportLink(this.client).then(url => {
            embed.addField(message.language.get('INVITE_FIELD3'), url)
            .addField(message.language.get('INVITE_FIELD2'), `https://discordbots.org/bot/${this.client.user.id}/vote`)
            message.channel.send(embed);
        });
           
    }

}

module.exports = Invite;