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
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {

        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("STEAL_ERR_YOURSELF"));
        }

        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });
        let isInCooldown = memberData.cooldowns.steal;
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

        if(amountToSteal > memberData.money){
            return message.channel.send(message.language.get("STEAL_ERR_AMOUNT_MEMBER", member, amountToSteal));
        }

        let potentiallyLose = Math.floor(amountToSteal*1.5);
        if(potentiallyLose > data.memberData.money){
            return message.channel.send(message.language.get("STEAL_ERR_NO_MONEY", potentiallyLose));
        }

        let itsAWon = Math.floor(this.client.functions.randomNum(0, 100) < 25);
        
        if(itsAWon){
            let toWait = Date.now() + 6*(60*60000);
            memberData.cooldowns.steal = toWait;
            memberData.markModified("cooldowns");
            await memberData.save();
            let messages = message.language.get("STEAL_WON", amountToSteal, member);
            message.channel.send(messages[Math.floor(this.client.functions.randomNum(0, messages.length))]);
            data.memberData.money += amountToSteal;
            memberData.money -= amountToSteal, 10;
            memberData.save();
            data.memberData.save();
        } else {
            let won = Math.floor(0.9*amountToSteal);
            let messages = message.language.get("STEAL_LOSE", potentiallyLose, member, won)
            message.channel.send(messages[Math.floor(this.client.functions.randomNum(0, messages.length))]);
            data.memberData.money -= potentiallyLose;
            memberData.money += won;
            memberData.save();
            data.memberData.save();
        }


    }

}

module.exports = Steal;
