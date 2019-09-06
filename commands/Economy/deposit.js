const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Deposit extends Command {

    constructor (client) {
        super(client, {
            name: "deposit",
            description: (language) => language.get("DEPOSIT_DESCRIPTION"),
            usage: (language) => language.get("DEPOSIT_USAGE"),
            examples: (language) => language.get("DEPOSIT_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "bank", "banque", "dep" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        
        let amount = args[0];

        if(!(parseInt(data.memberData.money, 10) > 0)) {
            return message.channel.send(message.language.get("DEPOSIT_ERR_NO_MONEY"));
        }

        if(args[0] === "all"){
            amount = parseInt(data.memberData.money, 10);
        } else {
            if(isNaN(amount) || parseInt(amount, 10) < 1){
                return message.channel.send(message.language.get("DEPOSIT_ERR_AMOUNT"));
            }
            amount = parseInt(amount, 10);
        }
        
        if(data.memberData.money < amount){
            return message.channel.send(message.language.get("DEPOSIT_ERR_AMOUNT_TOO_HIGH", amount));
        }

        data.memberData.money = data.memberData.money - amount;
        data.memberData.bankSold = data.memberData.bankSold + amount;
        data.memberData.save();

        message.channel.send(message.language.get("DEPOSIT_SUCCESS", amount));
    }

}

module.exports = Deposit;
