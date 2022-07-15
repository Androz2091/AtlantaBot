const Command = require("../../base/Command.js");

class Deposit extends Command {

	constructor (client) {
		super(client, {
			name: "deposit",
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
					description: "the amount you want to deposit",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
        
		let amount = interaction.options.getString("amount")

		if(!(parseInt(data.memberData.money, 10) > 0)) {
			return interaction.error("economy/deposit:NO_CREDIT");
		}

		if(amount === "all"){
			amount = parseInt(data.memberData.money, 10);
		} else {
			if(isNaN(amount) || parseInt(amount, 10) < 1){
				return interaction.error("economy/deposit:MISSING_AMOUNT");
			}
			amount = parseInt(amount, 10);
		}
        
		if(data.memberData.money < amount){
			return interaction.error("economy/deposit:NOT_ENOUGH_CREDIT", {
				money: amount
			});
		}

		data.memberData.money = data.memberData.money - amount;
		data.memberData.bankSold = data.memberData.bankSold + amount;
		data.memberData.save();

		interaction.success("economy/deposit:SUCCESS", {
			money: amount
		});
	}

}

module.exports = Deposit;
