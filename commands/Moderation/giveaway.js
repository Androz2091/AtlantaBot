const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
giveaways = require("discord-giveaways"),
ms = require("ms");

class Giveaway extends Command {

    constructor (client) {
        super(client, {
            name: "giveaway",
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
            return message.error("moderation/giveaway:MISSING_STATUS");
        }

        if(status === "create"){
            let currentGiveaways = giveaways.fetch().filter((g) => g.guildID === message.guild.id && !g.ended).length;
            if(currentGiveaways > 3){
                return message.error("moderation/giveaway:MAX_COUNT");
            }
            let time = args[1];
            if(!time){
                return message.error("moderation/giveaway:INVALID_CREATE", {
                    prefix: data.guild.prefix
                });
            }
            if(isNaN(ms(time))){
                return message.error("misc:INVALID_TIME");
            }
            if(ms(time) > ms("15d")){
                return message.error("moderation/giveaway:MAX_DURATION");
            }
            let winnersCount = args[2];
            if(!winnersCount){
                return message.error("moderation/giveaway:INVALID_CREATE", {
                    prefix: data.guild.prefix
                });
            }
            if(isNaN(winnersCount) || winnersCount > 10 || winnersCount < 1){
                return message.error("misc:INVALID_NUMBER_RANGE", {
                    min: 1,
                    max: 10
                });
            }
            let prize = args.slice(3).join(" ");
            if(!prize){
                return message.error("moderation/giveaway:INVALID_CREATE", {
                    prefix: data.guild.prefix
                });
            }
            giveaways.start(message.channel, {
                time: ms(time),
                prize: prize,
                winnersCount: parseInt(winnersCount, 10),
                messages: {
                    giveaway: message.translate("moderation/giveaway:TITLE"),
                    giveawayEnded: message.translate("moderation/giveaway:ENDED"),
                    timeRemaining: message.translate("moderation/giveaway:TIME_REMAINING"),
                    inviteToParticipate: message.translate("moderation/giveaway:INVITE_PARTICIPATE"),
				    winMessage: message.translate("moderation/giveaway:WIN_MESSAGE"),
                    embedFooter: message.translate("moderation/giveaway:FOOTER"),
                    noWinner: message.translate("moderation/giveaway:NO_WINNER"),
                    winners: message.translate("moderation/giveaway:WINNERS"),
                    endedAt: message.translate("moderation/giveaway:END_AT"),
                    units: {
                        seconds: message.translate("time:SECONDS", { amount: "" }).trim(),
                        minutes: message.translate("time:MINUTES", { amount: "" }).trim(),
                        hours: message.translate("time:HOURS", { amount: "" }).trim(),
                        days: message.translate("time:DAYS", { amount: "" }).trim()
                    }	
                }
            }).then(() => {
                message.success("moderation/giveaway:GIVEAWAY_CREATED");
            });
        } else if(status === "reroll"){
            let messageID = args[1];
            if(!messageID){
                return message.error("moderation/giveaway:MISSING_ID_REROLL");
            }
            giveaways.reroll(messageID, {
                congrat: message.translate("moderation/giveaway:REROLL_CONGRAT"),
                error: message.translate("moderation/giveaway:REROLL_ERROR")
            }).then(() => {
                return message.success("moderation/giveaway:GIVEAWAY_REROLLED");
            }).catch((err) => {
                return message.error("moderation/giveaway:NOT_FOUND_ENDED", {
                    messageID
                });
            });
        } else if(status === "delete"){
            let messageID = args[1];
            if(!messageID){
                return message.error("moderation/giveaway:MISSING_ID_DELETE");
            }
            giveaways.delete(messageID).then(() => {
                return message.success("moderation/giveaway:GIVEAWAY_DELETED");
            }).catch((err) => {
                return message.error("moderation/giveaway:NOT_FOUND", {
                    messageID
                });
            });
        } else if(status === "end"){
            let messageID = args[1];
            if(!messageID){
                return message.error("moderation/giveaway:MISSING_ID_END");
            }
            try {
                giveaways.edit(messageID, {
                    setEndTimestamp: Date.now()
                });
                return message.success("moderation/giveaway:GIVEAWAY_ENDED");
            } catch(e){
                return message.error("moderation/giveaway:NOT_FOUND", {
                    messageID
                });
            }
        } else {
            return message.error("moderation/giveaway:MISSING_STATUS");
        }

    }

}

module.exports = Giveaway;