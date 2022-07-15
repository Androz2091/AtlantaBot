const Command = require("../../base/Command.js");

class Pay extends Command {

	constructor (client) {
		super(client, {
			name: "pay",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000,
			options: [
				{
					name: "member",
					description: "the member you want to pay",
					required: true,
					type: "USER"
				},
				{
					name: "amount",
					description: "the amount you want to pay",
					required: true,
					type: "NUMBER"
				}
			]
		});
	}

	async run (interaction, data) {

		const member = await interaction.options.getMember("member");
		if(!member){
			return interaction.error("economy/pay:INVALID_MEMBER");
		}
		if(member.user.bot){
			return interaction.error("economy/pay:BOT_USER");
		}
		if(member.id === interaction.member.user.id){
			return interaction.error("economy/pay:YOURSELF");
		}
		const sentAmount = interaction.options.getNumber("member");
		if(!sentAmount || isNaN(sentAmount) || parseInt(sentAmount, 10) <= 0){
			return interaction.error("economy/pay:INVALID_AMOUNT", {
				username: member.user.tag
			});
		}

		const amount = Math.ceil(parseInt(sentAmount, 10));

		if(amount > data.memberData.money){
			return interaction.error("economy/pay:ENOUGH_MONEY", {
				amount,
				username: member.user.tag
			});
		}

		const memberData = await this.client.database.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		data.memberData.money = data.memberData.money - parseInt(amount, 10);
		data.memberData.save();

		memberData.money = memberData.money + parseInt(amount, 10);
		memberData.save();

		// Send a success message
		interaction.success("economy/pay:SUCCESS", {
			amount,
			username: member.user.tag
		});

	}

}

module.exports = Pay; 