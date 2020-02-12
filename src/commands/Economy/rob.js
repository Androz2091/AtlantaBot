const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Rob extends Command {

    constructor (client) {
        super(client, {
            name: "rob",
            description: (language) => language.get("ROB_DESCRIPTION"),
            usage: (language) => language.get("ROB_USAGE"),
            examples: (language) => language.get("ROB_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "steal" ],
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
            return message.channel.send(message.language.get("ROB_ERR_YOURSELF"));
        }

        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });
        let isInCooldown = memberData.cooldowns.rob || 0;
        if(isInCooldown){
            if(isInCooldown > Date.now()){
                return message.channel.send(message.language.get("ROB_ERR_CLDWN", member));
            }
        }

        let amountToRob = args[1];
        if(!amountToRob || isNaN(amountToRob) || parseInt(amountToRob, 10) <= 0){
            return message.channel.send(message.language.get("ROB_ERR_AMOUNT", member));
        }
        amountToRob = Math.floor(parseInt(amountToRob, 10));

        if(amountToRob > memberData.money){
            return message.channel.send(message.language.get("ROB_ERR_AMOUNT_MEMBER", member, amountToRob));
        }

        let potentiallyLose = Math.floor(amountToRob*1.5);
        if(potentiallyLose > data.memberData.money){
            return message.channel.send(message.language.get("ROB_ERR_NO_MONEY", potentiallyLose));
        }

        let itsAWon = Math.floor(this.client.functions.randomNum(0, 100) < 25);
        
        if(itsAWon){
            let toWait = Date.now() + 6*(60*60000);
            memberData.cooldowns.rob = toWait;
            memberData.markModified("cooldowns");
            await memberData.save();
            let messages = message.language.get("ROB_WON", amountToRob, member);
            message.channel.send(messages[Math.floor(this.client.functions.randomNum(0, messages.length))]);
            data.memberData.money += amountToRob;
            memberData.money -= amountToRob, 10;
            memberData.save();
            data.memberData.save();
        } else {
            let won = Math.floor(0.9*amountToRob);
            let messages = message.language.get("ROB_LOSE", potentiallyLose, member, won)
            message.channel.send(messages[Math.floor(this.client.functions.randomNum(0, messages.length))]);
            data.memberData.money -= potentiallyLose;
            memberData.money += won;
            memberData.save();
            data.memberData.save();
        }


    }

}

module.exports = Rob;
