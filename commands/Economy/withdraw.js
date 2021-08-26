const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "withdraw",

			options: [
				{
					name: "amount",
					type: "INTEGER",
					required: true
				}
			],

			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, data) {
        
		const amount = interaction.options.getInteger("amount");

		if(!(parseInt(data.memberData.bankSold, 10) > 0)) {
			return interaction.reply({
				content: translate("economy/withdraw:NO_CREDIT"),
				ephemeral: true
			});
		}

		if(data.memberData.bankSold < amount){
			return interaction.reply({
				content: translate("economy/withdraw:NOT_ENOUGH", {
					money: amount
				}),
				ephemeral: true
			});
		}

		data.memberData.money = data.memberData.money + amount;
		data.memberData.bankSold = data.memberData.bankSold - amount;
		data.memberData.save();

		interaction.reply({
			content: translate("economy/withdraw:SUCCESS", {
				money: amount
			})
		});
	}

};
