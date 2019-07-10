const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
giveaways = require("discord-giveaways"),
ms = require("ms");

class Giveaway extends Command {

    constructor (client) {
        super(client, {
            name: "giveaway",
            description: (language) => language.get("GIVEAWAY_DESCRIPTION"),
            usage: (language) => language.get("GIVEAWAY_USAGE"),
            examples: (language) => language.get("GIVEAWAY_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "gway" ],
            memberPermissions: [ "MENTION_EVERYONE" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        
        let status = args[0];
        if(!status){
            return message.channel.send(message.language.get("GIVEAWAY_ERR_STATUS"));
        }

        if(status === "create"){
            let currentGiveaways = giveaways.fetch().filter((g) => g.guildID === message.guild.id).length;
            if(currentGiveaways > 3){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_MAX"));
            }
            let time = args[1];
            if(!time){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_CREATE", data.settings.prefix));
            }
            if(isNaN(ms(time))){
                return message.channel.send(message.language.get("ERR_INVALID_TIME"));
            }
            if(ms(time) > 1,296e+9){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_15_DAYS"))
            }
            let winnersCount = args[2];
            if(!winnersCount){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_CREATE", data.settings.prefix));
            }
            if(isNaN(winnersCount) || winnersCount > 10 || winnersCount < 1){
                return message.channel.send(message.language.get("ERR_INVALID_NUMBER_MM", 1, 10));
            }
            let prize = args.slice(3).join(" ");
            if(!prize){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_CREATE", data.settings.prefix)); 
            }
            giveaways.start(message.channel, {
                time: ms(time),
                prize: prize,
                winnersCount: parseInt(winnersCount, 10),
                messages: message.language.get("GIVEAWAY_CREATE_MESSAGES")
            }).then(() => {
                message.channel.send(message.language.get("GIVEAWAY_CREATED", message.channel));
            });
        } else if(status === "reroll"){
            let messageID = args[1];
            if(!messageID){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_REROLL"));
            }
            giveaways.reroll(messageID, message.language.get("GIVEAWAY_REROLL_MESSAGES")).then(() => {
                return message.channel.send(message.language.get("GIVEAWAY_REROLLED"));
            }).catch((err) => {
                return message.channel.send(message.language.get("GIVEAWAY_ERR_REROLL_MSG_ENDED", messageID));
            });
        } else if(status === "delete"){
            let messageID = args[1];
            if(!messageID){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_DELETE"));
            }
            giveaways.delete(messageID).then(() => {
                return message.channel.send(message.language.get("GIVEAWAY_DELETED"));
            }).catch((err) => {
                return message.channel.send(message.language.get("GIVEAWAY_ERR_MESSAGE_NOT_FOUND", messageID));
            });
        } else if(status === "end"){
            let messageID = args[1];
            if(!messageID){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_END"));
            }
            try {
                giveaways.edit(messageID, {
                    setEndTimestamp: Date.now()
                });
                return message.channel.send(message.language.get("GIVEAWAY_ENDED"));
            } catch(e){
                return message.channel.send(message.language.get("GIVEAWAY_ERR_MESSAGE_NOT_FOUND", messageID));
            }
        } else {
            return message.channel.send(message.language.get("GIVEAWAY_ERR_STATUS"));
        }

    }

}

module.exports = Giveaway;