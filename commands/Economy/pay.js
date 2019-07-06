const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Pay extends Command {

    constructor (client) {
        super(client, {
            name: "pay",
            description: (language) => language.get("PAY_DESCRIPTION"),
            usage: (language) => language.get("PAY_USAGE"),
            examples: (language) => language.get("PAY_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 10000
        });
    }

    async run (message, args, data) {
        
        let user = message.mentions.users.first();
        if(!user){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        if(user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        if(user.id === message.author.id){
            return message.channel.send(message.language.get("PAY_ERR_YOURSELF"));
        }

        let toPay = args[1];
        if(!toPay || parseInt(toPay, 10) <= 0){
            return message.channel.send(message.language.get("PAY_ERR_INVALID_AMOUNT", user.username));
        }
        if(isNaN(toPay)){
            return message.channel.send(message.language.get("ERR_INVALID_NUMBER", toPay));
        }
       
        if(toPay > data.users[0].money){
            return message.channel.send(message.language.get("PAY_ERR_AMOUNT_TOO_HIGH", toPay, user.username));
        }

        data.users[0].money = data.users[0].money - parseInt(toPay, 10);
        data.users[0].save();

        data.users[1].money = data.users[1].money + parseInt(toPay, 10);
        data.users[1].save();

        // Send a success message
        message.channel.send(message.language.get("PAY_SUCCESS", toPay, user.username));

    }

}

module.exports = Pay;