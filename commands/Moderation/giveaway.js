const Command = require("../../base/Command.js"),
	ms = require("ms");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "giveaway",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "gway" ],
			memberPermissions: [ "MENTION_EVERYONE" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {
        
		const status = args[0];
		if(!status){
			return interaction.reply({
				content: translate("moderation/giveaway:MISSING_STATUS"),
				ephemeral: true
			});
		}

		if(status === "create"){
			const currentGiveaways = this.client.giveawaysManager.giveaways.filter((g) => g.guildID === interaction.guild.id && !g.ended).length;
			if(currentGiveaways > 3){
				return interaction.reply({
					content: translate("moderation/giveaway:MAX_COUNT"),
					ephemeral: true
				});
			}
			const time = args[1];
			if(!time){
				return message.error("moderation/giveaway:INVALID_CREATE", {
					prefix: data.guild.prefix
				});
			}
			if(isNaN(ms(time))){
				return interaction.reply({
					content: translate("misc:INVALID_TIME"),
					ephemeral: true
				});
			}
			if(ms(time) > ms("15d")){
				return interaction.reply({
					content: translate("moderation/giveaway:MAX_DURATION"),
					ephemeral: true
				});
			}
			const winnersCount = args[2];
			if(!winnersCount){
				return message.error("moderation/giveaway:INVALID_CREATE", {
					prefix: data.guild.prefix
				});
			}
			if(isNaN(winnersCount) || winnersCount > 10 || winnersCount < 1){
				return message.error("misc:INVALID_NUMBER_RANGE", {
					min: 1,
					max: 10
				});
			}
			const prize = args.slice(3).join(" ");
			if(!prize){
				return message.error("moderation/giveaway:INVALID_CREATE", {
					prefix: data.guild.prefix
				});
			}
			this.client.giveawaysManager.start(message.channel, {
				time: ms(time),
				prize: prize,
				winnerCount: parseInt(winnersCount, 10),
				messages: {
					giveaway: translate("moderation/giveaway:TITLE"),
					giveawayEnded: translate("moderation/giveaway:ENDED"),
					timeRemaining: translate("moderation/giveaway:TIME_REMAINING"),
					inviteToParticipate: translate("moderation/giveaway:INVITE_PARTICIPATE"),
					winMessage: translate("moderation/giveaway:WIN_MESSAGE"),
					embedFooter: translate("moderation/giveaway:FOOTER"),
					noWinner: translate("moderation/giveaway:NO_WINNER"),
					winners: translate("moderation/giveaway:WINNERS"),
					endedAt: translate("moderation/giveaway:END_AT"),
					units: {
						seconds: translate("time:SECONDS", { amount: "" }).trim(),
						minutes: translate("time:MINUTES", { amount: "" }).trim(),
						hours: translate("time:HOURS", { amount: "" }).trim(),
						days: translate("time:DAYS", { amount: "" }).trim()
					}	
				}
			}).then(() => {
				interaction.reply({
					content: translate("moderation/giveaway:GIVEAWAY_CREATED")
				});
			});
		} else if(status === "reroll"){
			const messageID = args[1];
			if(!messageID){
				return interaction.reply({
					content: translate("moderation/giveaway:MISSING_ID"),
					ephemeral: true
				});
			}
			this.client.giveawaysManager.reroll(messageID, {
				congrat: translate("moderation/giveaway:REROLL_CONGRAT"),
				error: translate("moderation/giveaway:REROLL_ERROR")
			}).then(() => {
				return interaction.reply({
					content: translate("moderation/giveaway:GIVEAWAY_REROLLED")
				});
			}).catch(() => {
				return message.error("moderation/giveaway:NOT_FOUND_ENDED", {
					messageID
				});
			});
		} else if(status === "delete"){
			const messageID = args[1];
			if(!messageID){
				return interaction.reply({
					content: translate("moderation/giveaway:MISSING_ID"),
					ephemeral: true
				});
			}
			this.client.giveawaysManager.delete(messageID).then(() => {
				return interaction.reply({
					content: translate("moderation/giveaway:GIVEAWAY_DELETED")
				});
			}).catch(() => {
				return message.error("moderation/giveaway:NOT_FOUND", {
					messageID
				});
			});
		} else if(status === "end"){
			const messageID = args[1];
			if(!messageID){
				return interaction.reply({
					content: translate("moderation/giveaway:MISSING_ID"),
					ephemeral: true
				});
			}
			try {
				this.client.giveawaysManager.edit(messageID, {
					setEndTimestamp: Date.now()
				});
				return interaction.reply({
					content: translate("moderation/giveaway:GIVEAWAY_ENDED")
				});
			} catch(e){
				return message.error("moderation/giveaway:NOT_FOUND", {
					messageID
				});
			}
		} else {
			return interaction.reply({
				content: translate("moderation/giveaway:MISSING_STATUS"),
				ephemeral: true
			});
		}

	}

};
