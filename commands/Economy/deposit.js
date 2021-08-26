const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "deposit",

			options: [
				{
					name: "amount",
					type: "INTEGER"
				}
			],

			enabled: true,
			guildOnly: true,
			aliases: [ "bank", "banque", "dep" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, { memberData }) {
        
		const amount = interaction.options.getInteger("amount");

		if(!(parseInt(memberData.money, 10) > 0)) {
			return interaction.reply({
				content: translate("economy/deposit:NO_CREDIT"),
				ephemeral: true
			});
		}
        
		if(memberData.money < amount){
			return interaction.reply({
				content: translate("economy/deposit:NOT_ENOUGH_CREDIT", {
					money: amount
				})
			});
		}

		memberData.money = memberData.money - amount;
		memberData.bankSold = memberData.bankSold + amount;
		memberData.save();

		interaction.reply({
			content: translate("economy/deposit:SUCCESS", {
				money: amount
			})
		});
	}

};
