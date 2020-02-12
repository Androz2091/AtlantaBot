const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Withdraw extends Command {

    constructor (client) {
        super(client, {
            name: "withdraw",
            description: (language) => language.get("WITHDRAW_DESCRIPTION"),
            usage: (language) => language.get("WITHDRAW_USAGE"),
            examples: (language) => language.get("WITHDRAW_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "wd" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        
        let amount = args[0];

        if(!(parseInt(data.memberData.bankSold, 10) > 0)) {
            return message.channel.send(message.language.get("WITHDRAW_ERR_NO_MONEY"));
        }

        if(args[0] === "all"){
            amount = parseInt(data.memberData.bankSold, 10);
        } else {
            if(isNaN(amount) || parseInt(amount, 10) < 1){
                return message.channel.send(message.language.get("WITHDRAW_ERR_AMOUNT"));
            }
            amount = parseInt(amount, 10);
        }
        
        if(data.memberData.bankSold < amount){
            return message.channel.send(message.language.get("WITHDRAW_ERR_AMOUNT_TOO_HIGH", amount));
        }

        data.memberData.money = data.memberData.money + amount;
        data.memberData.bankSold = data.memberData.bankSold - amount;
        data.memberData.save();

        message.channel.send(message.language.get("WITHDRAW_SUCCESS", amount));
    }

}

module.exports = Withdraw;