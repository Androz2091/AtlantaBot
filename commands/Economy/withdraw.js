const Command = require("../../base/Command.js");

class Withdraw extends Command {

	constructor (client) {
		super(client, {
			name: "withdraw",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000,
			options: [
				{
					name: "amount",
					description: "the amount to withdraw",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
        
		let amount = interaction.options.getString("amount");

		if(!(parseInt(data.memberData.bankSold, 10) > 0)) {
			return interaction.error("economy/withdraw:NO_CREDIT");
		}

		if(amount === "all"){
			amount = parseInt(data.memberData.bankSold, 10);
		} else {
			if(isNaN(amount) || parseInt(amount, 10) < 1){
				return interaction.error("economy/withdraw:MISSING_AMOUNT");
			}
			amount = parseInt(amount, 10);
		}
        
		if(data.memberData.bankSold < amount){
			return interaction.error("economy/withdraw:NOT_ENOUGH", {
				money: amount
			});
		}

		data.memberData.money = data.memberData.money + amount;
		data.memberData.bankSold = data.memberData.bankSold - amount;
		data.memberData.save();

		interaction.success("economy/withdraw:SUCCESS", {
			money: amount
		});
	}

}

module.exports = Withdraw;