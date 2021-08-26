const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

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
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const user = await this.client.resolveUser(args[0]);
		if(!user){
			return interaction.reply({
				content: translate("moderation/sanctions:MISSING_MEMBER"),
				ephemeral: true
			});
		}
		const memberData = await this.client.findOrCreateMember({ id: user.id, guildID: interaction.guild.id });

		const embed = new Discord.MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		if(memberData.sanctions.length < 1){
			embed.setDescription(translate("moderation/sanctions:NO_SANCTION", {
				username: user.tag
			}));
			return message.channel.send({ embeds: [embed] });
		} else {
			memberData.sanctions.forEach((s) => {
				embed.addField(s.type+" | #"+s.case, `${translate("common:MODERATOR")}: <@${s.moderator}>\n${translate("common:REASON")}: ${s.reason}`, true);
			});
		}

		message.channel.send({ embeds: [embed] });
	}

};
