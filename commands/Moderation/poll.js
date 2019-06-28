const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Poll extends Command {

    constructor (client) {
        super(client, {
            name: "poll",
            description: (language) => language.get("POLL_DESCRIPTION"),
            usage: (language) => language.get("POLL_USAGE"),
            examples: (language) => language.get("POLL_EXAMPLES"),
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
        
        let question = args.join(" ");
        if(!question){
            return message.channel.send(message.language.get("POLL_ERR_QUESTION"));
        }

        message.delete().catch((err) => {});

        let mention = "";
            
        let msg = await message.channel.send(message.language.get("POLL_FORM_MENTION"));

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
                let tmsg1 = await message.channel.send(message.language.get("POLL_FORM_MENTION_HE"));
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
                        return message.channel.send(message.language.get("POLL_ERR_TIMEOUT"));
                    }
                });
            }
        });
    
        collector.on("end", (collected, reason) => {
    
            if(reason === "time"){
                return message.channel.send(message.language.get("POLL_ERR_TIMEOUT"));
            }
    
            let success = message.client.config.emojis.success.split(":")[1];
            let error = message.client.config.emojis.error.split(":")[1];

            let emotes = [
                message.client.emojis.find((e) => e.name === success),
                message.client.emojis.find((e) => e.name === error)
            ];

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("POLL_HEADING"))
                .setColor(data.config.embed.color)
                .addField(question, message.language.get("POLL_REACT"));
            
            message.channel.send(mention, embed).then(async (m) => {
                await m.react(emotes[0]);
                await m.react(emotes[1]);
            });
        });

    }

}

module.exports = Poll;