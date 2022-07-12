const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Sanctions extends Command {

	constructor (client) {
		super(client, {
			name: "sanctions",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "user",
					description: "the user you want to see the sanctions",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
        
		const user = await interaction.options.getMember("user")

		const memberData = await this.client.database.findOrCreateMember({ id: user.id, guildID: interaction.guild.id });

		const embed = new Discord.MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		if(memberData.sanctions.length < 1){
			embed.setDescription(interaction.translate("moderation/sanctions:NO_SANCTION", {
				username: user.tag
			}));
			return interaction.reply({ embeds: [embed] });
		} else {
			memberData.sanctions.forEach((s) => {
				embed.addField(s.type+" | #"+s.case, `${interaction.translate("common:MODERATOR")}: <@${s.moderator}>\n${interaction.translate("common:REASON")}: ${s.reason}`, true);
			});
		}

		interaction.reply({ embeds: [embed] });
	}

}

module.exports = Sanctions;
