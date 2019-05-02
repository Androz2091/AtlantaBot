const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Quote extends Command {

    constructor (client) {
        super(client, {
            name: "quote",
            description: (language) => language.get('QUOTE_DESCRIPTION'),
            dirname: __dirname,
            usage: "quote [message ID] (channel ID)",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$quote 573447254258745365 222081003253006336",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        // gets the message ID
        var msgID = args[0];
        if(isNaN(msgID)) return message.channel.send(message.language.get('INVALID_ID'));

        // Gets the channel ID
        var channelID = args[1];

        if(!channelID){
            message.channel.fetchMessage(msgID).catch(err => { 
                message.delete();
                return message.author.send(message.language.get('QUOTE_404'));
            }).then(msg => {
                var embed = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                    .setDescription(msg.content)
                    .setColor(msg.member.highestRole ? msg.member.highestRole.color : data.embed.color)
                    .setFooter(msg.guild.name+' | #'+msg.channel.name)
                    .setTimestamp(msg.createdTimestamp)
                if(msg.attachments.size > 0) embed.setImage(msg.attachments.first().url)
                message.channel.send(embed).then(()=> message.delete());
            });
        } else {
            var channel = this.client.channels.get(args[1]);
            if(!channel) return message.channel.send(message.language.get('QUOTE_404_1', args[1]));
            message.channel.fetchMessage(msgID).catch(err => {
                message.delete();
                return message.author.send(message.language.get('QUOTE_404'));
            }).then(msg => {
                var embed = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                    .setDescription(msg.content)
                    .setColor(msg.member.highestRole ? msg.member.highestRole.color : data.embed.color)
                    .setFooter(msg.guild.name+' | #'+msg.channel.name)
                    .setTimestamp(msg.createdTimestamp)
                if(msg.attachments.size > 0) embed.setImage(msg.attachments.first().url)
                message.channel.send(embed).then(()=> message.delete());
            });
        }
    }

}

module.exports = Quote;