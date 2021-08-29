const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "pay",

			options: [
				{
					name: "user",
					type: "USER",
					required: true
				},
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

		const member = interaction.options.getUser("user");
		if(member.user.bot){
			return interaction.reply({
				content: translate("economy/pay:BOT_USER"),
				ephemeral: true
			});
		}
		if(member.id === interaction.user.id){
			return interaction.reply({
				content: translate("economy/pay:YOURSELF"),
				ephemeral: true
			});
		}
		const sentAmount = interaction.options.getInteger("amount");
		if(parseInt(sentAmount, 10) <= 0){
			return interaction.reply({
				content: translate("economy/pay:POSITIVE_INT_AMOUNT"),
				ephemeral: true
			});
		}

		const amount = Math.ceil(parseInt(sentAmount, 10));

		if(amount > data.memberData.money){
			return interaction.reply({
				content: translate("economy/pay:ENOUGH_MONEY", {
					amount,
					username: member.user.tag
				}),
				ephemeral: true
			});
		}

		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		data.memberData.money = data.memberData.money - parseInt(amount, 10);
		data.memberData.save();

		memberData.money = memberData.money + parseInt(amount, 10);
		memberData.save();

		// Send a success message
		interaction.reply({
			content: translate("economy/pay:SUCCESS", {
				amount,
				username: member.user.tag
			})
		});

	}

};

 
