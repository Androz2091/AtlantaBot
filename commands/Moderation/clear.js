const Command = require("../../base/Command.js");

class Clear extends Command {

	constructor (client) {
		super(client, {
			name: "clear",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "amount",
					description: "the amount of messages you want to delete",
					type: "NUMBER",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		let amount = interaction.options.getNumber("amount")
		if(!amount || isNaN(amount) || parseInt(amount) < 1){
			return interaction.error("moderation/clear:MISSING_AMOUNT");
		}

		let messages = await interaction.channel.messages.fetch({limit:100});
		messages = messages.array();
		if(messages.length > amount){
			messages.length = parseInt(amount, 10);
		}
		messages = messages.filter((m) => !m.pinned);
		amount++;

		interaction.channel.bulkDelete(messages, true);

		let toDelete = await interaction.success("moderation/clear:CLEARED", {
				amount: --amount
			});

		setTimeout(function(){
			toDelete.delete();
		}, 2000);
        
	}

}

module.exports = Clear;
