const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Report extends Command {

	constructor (client) {
		super(client, {
			name: "report",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "member",
					description: "the member you want to report",
					type: "USER",
					required: true
				},
				{
					name: "report",
					description: "the report you want to submit",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
		const repChannel = interaction.guild.channels.cache.get(data.guild.plugins.reports);
		if(!repChannel){
			return interaction.error("general/report:MISSING_CHANNEL");
		}

		const member = await interaction.options.getMember("member")

		if(member.id === interaction.member.user.id){
			return interaction.error("general/report:INVALID_USER");
		}

		const rep = interaction.options.getString("report")

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("general/report:TITLE", {
				user: member.user.tag
			}), interaction.member.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.addField(interaction.translate("common:AUTHOR"), interaction.member.user.tag, true)
			.addField(interaction.translate("common:DATE"), interaction.printDate(new Date(Date.now())), true)
			.addField(interaction.translate("common:REASON"), "**"+rep+"**", true)
			.addField(interaction.translate("common:USER"), `\`${interaction.member.user.tag}\` (${member.user.toString()})`, true)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		const success = Discord.Util.parseEmoji(this.client.customEmojis.success).id;
		const error = Discord.Util.parseEmoji(this.client.customEmojis.error).id;
        
		repChannel.send({ embeds: [embed] }).then(async (m) => {
			await m.react(success);
			await m.react(error);
		});

		interaction.success("general/report:SUCCESS", {
			channel: repChannel.toString()
		});
	}

}

module.exports = Report;
