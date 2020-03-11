const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {

        const member = await Resolvers.resolveMember({
            message,
            search: args[0],
            useMessageContent: false
        });
        if(!member){
            return message.error("economy/pay:INVALID_MEMBER");
        }
        if(member.user.bot){
            return message.error("economy/pay:BOT_USER");
        }
        if(member.id === message.author.id){
            return message.error("economy/pay:YOURSELF");
        }
        const sentAmount = args[1];
        if(!sentAmount || isNaN(sentAmount) || parseInt(sentAmount, 10) <= 0){
            return message.error("economy/pay:INVALID_AMOUNT", {
                username: member.user.tag
            });
        }

        const amount = Math.ceil(parseInt(sentAmount, 10));
        const memberData = await this.client.handlers.database.fetchMember(message.member.id, message.guild.id);

        if(amount > memberData.money){
            return message.error("economy/pay:ENOUGH_MONEY", {
                amount,
                username: member.user.tag
            });
        }

        const secondMemberData = await this.client.handlers.database.fetchMember(member.id, message.guild.id);

        let baseTransaction = {
            action: "pay",
            date: new Date()
        };

        await memberData.createTransaction({
            ...baseTransaction,
            ...{
                credit: 0,
                debit: amount,
                relatedMemberID: member.id
            }
        });

        await secondMemberData.createTransaction({
            ...baseTransaction,
            ...{
                credit: amount,
                debit: 0,
                relatedMemberID: member.id
            }
        });

        // Send a success message
        message.success("economy/pay:SUCCESS", {
            amount,
            username: member.user.tag
        });

    }

}
