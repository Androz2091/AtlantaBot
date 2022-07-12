const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Kick extends Command {

	constructor (client) {
		super(client, {
			name: "kick",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "KICK_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "user",
					description: "the user you want to kick",
					type: "MEMBER",
					required: true
				},
				{
					name: "reason",
					description: "the reason for the kick",
					type: "STRING",
					required: false
				}
			]
		});
	}

	async run (interaction, data) {

		const member = interaction.options.getMember("user")
        
		const memberData = await this.client.database.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });
        
		// Gets the kcik reason
		let reason = interaction.options.getString("reason")
		if(!reason){
			reason = interaction.translate("misc:NO_REASON_PROVIDED");
		}
        
		const memberPosition = member.roles.highest.position;
		const moderationPosition = interaction.member.roles.highest.position;
		if(!(moderationPosition > memberPosition)){
			return interaction.error("moderation/ban:SUPERIOR");
		}

		if(!member.kickable) {
			return interaction.error("moderation/kick:MISSING_PERM");
		}

		await member.send(interaction.translate("moderation/kick:KICKED_DM", {
			username: member.user.tag,
			server: interaction.guild.name,
			moderator: interaction.member.tag,
			reason
		})).catch(() => {});

		// Kick the user
		member.kick(reason).then(() => {

			// Send a success message in the current channel
			interaction.replyT("moderation/kick:KICKED", {
				username: member.user.tag,
				server: interaction.guild.name,
				moderator: interaction.member.tag,
				reason
			});

			data.guild.casesCount++;
			data.guild.save();

			const caseInfo = {
				channel: interaction.channel.id,
				moderator: interaction.member.id,
				date: Date.now(),
				type: "kick",
				case: data.guild.casesCount,
				reason,
			};
            
			memberData.sanctions.push(caseInfo);
			memberData.save();
            
			if(data.guild.plugins.modlogs){
				const channel = interaction.guild.channels.cache.get(data.guild.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(interaction.translate("moderation/kick:CASE", {
						count: data.guild.casesCount
					}))
					.addField(interaction.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
					.addField(interaction.translate("common:MODERATOR"), `\`${interaction.author.tag}\` (${interaction.member.name.toString()})`, true)
					.addField(interaction.translate("common:REASON"), reason, true)
					.setColor("#e88709");
				interaction.reply({ embeds: [embed] });
			}

		}).catch(() => {
			return interaction.error("moderation/kick:MISSING_PERM");
		});

	}

}

module.exports = Kick;
