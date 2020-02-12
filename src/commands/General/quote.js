const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Quote extends Command {

    constructor (client) {
        super(client, {
            name: "quote",
            description: (language) => language.get("QUOTE_DESCRIPTION"),
            usage: (language) => language.get("QUOTE_USAGE"),
            examples: (language) => language.get("QUOTE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "quoter" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        function embed(m){
            let embed = new Discord.MessageEmbed()
                .setAuthor(m.author.tag, m.author.displayAvatarURL())
                .setDescription(m.content)
                .setColor(m.member ? m.member.roles.highest ? m.member.roles.highest.color : data.config.embed.color : data.config.embed.color)
                .setFooter(m.guild.name+" | #"+m.channel.name)
                .setTimestamp(m.createdTimestamp);
            if(m.attachments.size > 0){
                embed.setImage(m.attachments.first().url);
            }
            return embed;
        }
        
        let msgID = args[0];
        if(isNaN(msgID)){
            return message.channel.send(message.language.get("ERR_INVALID_ID"));
        }

        let channel = message.mentions.channels.first();
        if(args[1] && !channel){
            channel = message.client.channels.get(args[1]);
            if(!channel){
                return message.language.get("QUOTE_ERR_NOT_FOUND_CHANNEL", args[1]);
            }
        }

        if(!channel){
            message.channel.messages.fetch(msgID).catch((err) => { 
                message.delete();
                return message.author.send(message.language.get("QUOTE_ERR_NOT_FOUND"));
            }).then((msg) => {
                message.delete();
                message.channel.send(embed(msg));
            });
        } else {
            channel.messages.fetch(msgID).catch((err) => {
                message.delete();
                return message.author.send(message.language.get("QUOTE_ERR_NOT_FOUND"));
            }).then((msg) => {
                message.delete();
                message.channel.send(embed(msg));
            });
        }
    }

}

module.exports = Quote;