const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "rob",

			options: [
				{
					name: "user",
					type: "USER"
				},
				{
					name: "amount",
					type: "INTEGER"
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

		const user = interaction.options.getUser("user");
		if(!user){
			return interaction.reply({
				content: translate("economy/rob:MISSING_MEMBER"),
				ephemeral: true
			});
		}

		if(user.id === interaction.user.id){
			return interaction.reply({
				content: translate("economy/rob:YOURSELF"),
				ephemeral: true
			});
		}

		const memberData = await this.client.findOrCreateMember({ id: user.id, guildID: interaction.guild.id });
		const isInCooldown = memberData.cooldowns.rob || 0;
		if(isInCooldown){
			if(isInCooldown > Date.now()){
				return interaction.reply({
					content: translate("economy/rob:COOLDOWN", {
						username: user.tag
					}),
					ephemeral: true
				});
			}
		}

		let amountToRob = interaction.options.getInteger("amount");
		if(!amountToRob || isNaN(amountToRob) || parseInt(amountToRob, 10) <= 0){
			return interaction.reply({
				content: translate("economy/rob:MISSING_AMOUNT", {
					username: user.username
				}),
				ephemeral: true
			});
		}
		amountToRob = Math.floor(parseInt(amountToRob, 10));

		if(amountToRob > memberData.money){
			return interaction.reply({
				content: translate("economy/rob:NOT_ENOUGH_MEMBER", {
					username: user.username,
					money: amountToRob
				})
			});
		}

		const potentiallyLose = Math.floor(amountToRob*1.5);
		if(potentiallyLose > data.memberData.money){
			return interaction.reply({
				content: translate("economy/rob:NOT_ENOUGH_AUTHOR", {
					moneyMin: potentiallyLose,
					moneyCurrent: data.memberData.money
				}),
				ephemeral: true
			});
		}

		const itsAWon = Math.floor(this.client.functions.randomNum(0, 100) < 25);
        
		if(itsAWon){
			const toWait = Date.now() + 6*(60*60000);
			memberData.cooldowns.rob = toWait;
			memberData.markModified("cooldowns");
			await memberData.save();
			const randomNum = Math.floor(this.client.functions.randomNum(1, 3));
			interaction.reply({
				content: translate("economy/rob:ROB_WON_"+randomNum, {
					money: amountToRob,
					username: user.username
				})
			});
			data.memberData.money += amountToRob;
			memberData.money -= amountToRob, 10;
			memberData.save();
			data.memberData.save();
		} else {
			const won = Math.floor(0.9*amountToRob);
			const randomNum = Math.floor(this.client.functions.randomNum(1, 3));
			interaction.reply({
				content: translate("economy/rob:ROB_LOSE_"+randomNum, {
					fine: potentiallyLose,
					offset: won,
					username: user.username
				})
			});
			data.memberData.money -= potentiallyLose;
			memberData.money += won;
			memberData.save();
			data.memberData.save();
		}


	}

};
