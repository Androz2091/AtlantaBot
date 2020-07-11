const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Poll extends Command {

    constructor (client) {
        super(client, {
            name: "poll",
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
            return message.error("moderation/poll:MISSING_QUESTION");
        }

        message.delete().catch((err) => {});

        let mention = "";
            
        let msg = await message.sendT("moderation/announcement:MENTION_PROMPT");

        const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 240000 });
            
        collector.on("collect", async (tmsg) => {
    
            if(tmsg.content.toLowerCase() === message.translate("common:NO").toLowerCase()){
                tmsg.delete();
                msg.delete();
                collector.stop(true);
            }
            
            if(tmsg.content.toLowerCase() === message.translate("common:YES").YES.toLowerCase()){
                tmsg.delete();
                msg.delete();
                let tmsg1 = await message.sendT("moderation/announcement:MENTION_TYPE_PROMPT");
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
                        return message.error("misc:TIMES_UP");
                    }
                });
            }
        });
    
        collector.on("end", (collected, reason) => {
    
            if(reason === "time"){
                return message.error("misc:TIMES_UP");
            }
    
            let success = message.client.config.emojis.success.split(":")[1];
            let error = message.client.config.emojis.error.split(":")[1];

            let emotes = [
                message.client.emojis.find((e) => e.name === success),
                message.client.emojis.find((e) => e.name === error)
            ];

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.translate("moderation/poll:TITLE"))
                .setColor(data.config.embed.color)
                .addField(question, message.translate("moderation/poll:REACT", {
                    success: emotes[0],
                    error: emotes[1]
                }));
            
            message.channel.send(mention, embed).then(async (m) => {
                await m.react(emotes[0]);
                await m.react(emotes[1]);
            });
        });

    }

}

module.exports = Poll;