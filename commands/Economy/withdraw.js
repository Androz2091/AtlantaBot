const Command = require("../../base/Command.js");

class Withdraw extends Command {

	constructor (client) {
		super(client, {
			name: "withdraw",
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
			return message.error("economy/withdraw:NO_CREDIT");
		}

		if(args[0] === "all"){
			amount = parseInt(data.memberData.bankSold, 10);
		} else {
			if(isNaN(amount) || parseInt(amount, 10) < 1){
				return message.error("economy/withdraw:MISSING_AMOUNT");
			}
			amount = parseInt(amount, 10);
		}
        
		if(data.memberData.bankSold < amount){
			return message.error("economy/withdraw:NOT_ENOUGH", {
				money: amount
			});
		}

		data.memberData.money = data.memberData.money + amount;
		data.memberData.bankSold = data.memberData.bankSold - amount;
		data.memberData.save();

		message.success("economy/withdraw:SUCCESS", {
			money: amount
		});
	}

}

module.exports = Withdraw;