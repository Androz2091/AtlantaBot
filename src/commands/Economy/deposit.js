const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

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
        
        const sentAmount = args[0];
        if(!sentAmount){
            return message.error("economy/deposit:INVALID_AMOUNT");
        }

        const memberData = await this.client.handlers.database.fetchMember(message.member.id, message.guild.id);

        let amount;

        if(sentAmount === "all"){
            amount = parseInt(memberData.cash, 10);
        } else {
            if(isNaN(sentAmount) || parseInt(sentAmount, 10) < 1){
                return message.error("economy/deposit:INVALID_AMOUNT");
            }
            amount = parseInt(sentAmount, 10);
        }
        
        if(memberData.cash < amount){
            return message.error("economy/deposit:ENOUGH_MONEY", {
                amount
            });
        }

        await memberData.createTransaction({
            credit: 0,
            debit: amount,
            action: "bank",
            date: new Date()
        });

        message.success("economy/deposit:SUCCESS", {
            amount
        });
    }

}
