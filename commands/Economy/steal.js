const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Steal extends Command {

    constructor (client) {
        super(client, {
            name: "steal",
            description: (language) => language.get("STEAL_DESCRIPTION"),
            usage: (language) => language.get("STEAL_USAGE"),
            examples: (language) => language.get("STEAL_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {

        let member = message.mentions.members.first();
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("STEAL_ERR_YOURSELF"));
        }

        if(!data.users[0].stats.steal){
            data.users[0].stats.steal = { successful: 0, fails: 0, stolen: 0 };
            data.users[0].markModified("stats.steal");
            await data.users[0].save();
        }
        if(!data.users[1].stats.steal){
            data.users[1].stats.steal = { successful: 0, fails: 0, stolen: 0 };
            data.users[1].markModified("stats.steal");
            await data.users[1].save();
        }

        let isInCooldown = data.users[1].cooldowns.steal;
        if(isInCooldown){
            if(isInCooldown > Date.now()){
                return message.channel.send(message.language.get("STEAL_ERR_CLDWN", member));
            }
        }

        let amountToSteal = args[1];
        if(!amountToSteal || isNaN(amountToSteal) || parseInt(amountToSteal, 10) <= 0){
            return message.channel.send(message.language.get("STEAL_ERR_AMOUNT", member));
        }
        amountToSteal = Math.floor(parseInt(amountToSteal, 10));

        if(amountToSteal > data.users[1].money){
            return message.channel.send(message.language.get("STEAL_ERR_AMOUNT_MEMBER", member, amountToSteal));
        }

        let potentiallyLose = Math.floor(amountToSteal*1.5);
        if(potentiallyLose > data.users[0].money){
            return message.channel.send(message.language.get("STEAL_ERR_NO_MONEY", potentiallyLose));
        }

        let itsAWon = Math.floor(this.client.functions.randomNum(0, 100) < 25);
        
        if(itsAWon){
            let toWait = Date.now() + 6*(60*60000);
            data.users[1].cooldowns.steal = toWait;
            await data.users[1].save();
            data.users[0].stats.steal.successful++;
            data.users[0].markModified("stats.steal");
            await data.users[0].save();
            data.users[1].stats.steal.stolen++;
            data.users[1].markModified("stats.steal");
            await data.users[1].save();
            let messages = message.language.get("STEAL_WON", amountToSteal, member);
            message.channel.send(messages[Math.floor(this.client.functions.randomNum(0, messages.length))]);
            data.users[0].money += amountToSteal;
            data.users[1].money -= amountToSteal, 10;
            data.users[0].save();
            data.users[1].save();
        } else {
            data.users[0].stats.steal.fails++;
            data.users[0].markModified("stats.steal");
            await data.users[0].save();
            let won = Math.floor(0.9*amountToSteal);
            let messages = message.language.get("STEAL_LOSE", potentiallyLose, member, won)
            message.channel.send(messages[Math.floor(this.client.functions.randomNum(0, messages.length))]);
            data.users[0].money -= potentiallyLose;
            data.users[1].money += won;
            data.users[0].save();
            data.users[1].save();
        }


    }

}

module.exports = Steal;
