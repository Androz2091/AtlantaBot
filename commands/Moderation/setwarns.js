const Command = require("../../base/Command.js");

class Setwarns extends Command {

	constructor (client) {
		super(client, {
			name: "setwarns",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS", "KICK_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "sanction",
					description: "the sanction you want to attribute",
					type: "STRING",
					required: true
				},
				{
					name: "number",
					description: "the number of sanction the user has",
					type: "NUMBER",
					required: false
				}
			]
		});
	}

	async run (interaction, data) {
        
		const sanction = interaction.options.getString("sanction")
		if((sanction !== "kick" && sanction !== "ban")){
			return interaction.error("moderation/setwarns:MISSING_TYPE");
		}

		const number = interaction.options.getNumber("number")

		if(number.toString() === "reset"){
			if(sanction === "kick"){
				data.guild.plugins.warnsSanctions.kick = false;
				data.guild.markModified("plugins.warnsSanctions");
				data.guild.save();
				return interaction.success("moderation/setwarns:SUCCESS_KICK_RESET", {
					prefix: data.guild.prefix,
					count: number
				});
			}
			if(sanction === "ban"){
				data.guild.plugins.warnsSanctions.ban = false;
				data.guild.markModified("plugins.warnsSanctions");
				data.guild.save();
				return interaction.success("moderation/setwarns:SUCCESS_BAN_RESET", {
					prefix: data.guild.prefix,
					count: number
				});
			}
		}

		if(!(isNaN(number) || number === "reset")){
			return interaction.error("misc:INVALID_NUMBER");
		}
		if(number < 1 || number > 10){
			return interaction.error("misc:INVALID_NUMBER_RANGE", 1, 10);
		}

		if(sanction === "kick"){
			data.guild.plugins.warnsSanctions.kick = number;
			data.guild.markModified("plugins.warnsSanctions");
			data.guild.save();
			return interaction.success("moderation/setwarns:SUCCESS_KICK", {
				prefix: data.guild.prefix,
				count: number
			});
		}

		if(sanction === "ban"){
			data.guild.plugins.warnsSanctions.ban = number;
			data.guild.markModified("plugins.warnsSanctions");
			data.guild.save();
			return interaction.success("moderation/setwarns:SUCCESS_BAN", {
				prefix: data.guild.prefix,
				count: number
			});
		}

	}

}

module.exports = Setwarns;