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
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 10000
        });
    }

    async run (message, args, data) {

        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        if(member.user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        if(member.id === message.author.id){
            return message.channel.send(message.language.get("PAY_ERR_YOURSELF"));
        }

        let toPay = args[1];
        if(!toPay || parseInt(toPay, 10) <= 0){
            return message.channel.send(message.language.get("PAY_ERR_INVALID_AMOUNT", member.user.username));
        }
        if(isNaN(toPay)){
            return message.channel.send(message.language.get("ERR_INVALID_NUMBER", toPay));
        }

        if(toPay > data.memberData.money){
            return message.channel.send(message.language.get("PAY_ERR_AMOUNT_TOO_HIGH", toPay, member.user.username));
        }

        let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

        data.memberData.money = data.memberData.money - parseInt(toPay, 10);
        data.memberData.save();

        memberData.money = memberData.money + parseInt(toPay, 10);
        memberData.save();

        // Send a success message
        message.channel.send(message.language.get("PAY_SUCCESS", toPay, member.user.username));

    }

}

module.exports = Pay; 