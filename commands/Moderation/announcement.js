const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Announcement extends Command {

    constructor (client) {
        super(client, {
            name: "announcement",
            description: (language) => language.get("ANNOUNCEMENT_DESCRIPTION"),
            usage: (language) => language.get("ANNOUNCEMENT_USAGE"),
            examples: (language) => language.get("ANNOUNCEMENT_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MENTION_EVERYONE" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let text = args.join(" ");
        if(!text){
            return message.channel.send(message.language.get("ANNOUNCEMENT_ERR_TEXT"));
        }
        if(text.length > 1030){
            return message.channel.send(message.language.get("ANNOUNCEMENT_ERR_TEXT_LENGTH"));
        }

        message.delete().catch((err) => {});

        let mention = "";
            
        let msg = await message.channel.send(message.language.get("ANNOUNCEMENT_FORM_MENTION"));

        const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 240000 });
            
        collector.on("collect", async (tmsg) => {
    
            if(tmsg.content.toLowerCase() === message.language.get("UTILS").NO.toLowerCase()){
                tmsg.delete();
                msg.delete();
                collector.stop(true);
            }
            
            if(tmsg.content.toLowerCase() === message.language.get("UTILS").YES.toLowerCase()){
                tmsg.delete();
                msg.delete();
                let tmsg1 = await message.channel.send(message.language.get("ANNOUNCEMENT_FORM_MENTION_HE"));
                let c = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 60000 });
                c.on("collect", (m) => {
                    if(m.content.toLowerCase() === "here"){
                        mention = "@here";
                        tmsg1.delete();
                        m.delete();
                        collector.stop(true);
                        c.stop(true);
                    } else if(m.content.toLowerCase() === "every"){
                        mention = "@everyone";
                        tmsg1.delete();
                        m.delete();
                        collector.stop(true);
                        c.stop(true);
                    }
                });
                c.on("end", (collected, reason) => {
                    if(reason === "time"){
                        return message.channel.send(message.language.get("ANNOUNCEMENT_ERR_TIMEOUT"));
                    }
                });
            }
        });
    
        collector.on("end", (collected, reason) => {
    
            if(reason === "time"){
                return message.channel.send(message.language.get("ANNOUNCEMENT_ERR_TIMEOUT"));
            }

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("ANNOUNCEMENT_HEADING"))
                .setColor(data.config.embed.color)
                .setFooter(message.author.tag)
                .setTimestamp()
                .setDescription(text);
            
            message.channel.send(mention, embed);
        });

    }

}

module.exports = Announcement;