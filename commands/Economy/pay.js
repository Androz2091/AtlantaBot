const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Pay extends Command {

    constructor (client) {
        super(client, {
            name: "pay",
            description: (language) => language.get('PAY_DESCRIPTION'),
            dirname: __dirname,
            usage: "pay [@member] [amount]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$pay @Androz#2091 10",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the first mentionned member
        var member = message.mentions.members.first();
        // if doesn't exist, display an error message
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));

        // if the user is a bot, cancel
        if(member.user.bot) return message.channel.send(message.language.get('IS_A_BOT'));

        // check if the receiver is the sender
        if(member.id === message.author.id) return message.channel.send(message.language.get('PAY_SELF'))

        // gets the amount of credits to send
        var amount_to_pay = args[1];
        // if the member has not entered a valid amount, display an error message
        if(!amount_to_pay || parseInt(amount_to_pay) < 0) return message.channel.send(message.language.get('PAY_AMOUNT', member.user.username));
        if(isNaN(amount_to_pay)) return message.channel.send(message.language.get('NAN', amount_to_pay));
        // if the member does not have enough credits
        if(amount_to_pay > membersdata[0].credits) return message.channel.send(message.language.get('PAY_AMOUNT_TO_HIGH', amount_to_pay, member.user.username));

        // Adding credits to the receiver
        this.client.databases[0].add(`${member.id}.credits`, amount_to_pay);
        // Removes credits from the sender
        this.client.databases[0].subtract(`${message.author.id}.credits`, amount_to_pay);

        // Send a success message
        message.channel.send(message.language.get('PAY_SUCCESS', amount_to_pay, member.user.username))

    }

}

module.exports = Pay;