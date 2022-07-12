const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Ban extends Command {

	constructor (client) {
		super(client, {
			name: "ban",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "BAN_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "user",
					description: "the user you want to ban",
					type: "MEMBER",
					required: true
				},
				{
					name: "reason",
					description: "the reason for the ban",
					type: "STRING",
					required: false
				}
			]
		});
	}

	async run (interaction, data) {
        
		const user = await interaction.options.getMember("user")
        
		const memberData = interaction.guild.members.cache.get(user.id) ? await this.client.database.findOrCreateMember({ id: user.id, guildID: interaction.guild.id }) : null;

		if(user.id === interaction.member.id){
			return interaction.error("moderation/ban:YOURSELF");
		}
        
		// Gets the ban reason
		let reason = interaction.options.getString("reason")
		if(!reason){
			reason = interaction.translate("misc:NO_REASON_PROVIDED");
		}

		const member = await interaction.guild.members.fetch(user.id).catch(() => {});
		if(member){
			const memberPosition = member.roles.highest.position;
			const moderationPosition = interaction.member.roles.highest.position;
			if(!(moderationPosition > memberPosition)){
				return interaction.error("moderation/ban:SUPERIOR");
			}
			if(!member.bannable) {
				return interaction.error("moderation/ban:MISSING_PERM");
			}
		}
        
		await user.send(interaction.translate("moderation/ban:BANNED_DM", {
			username: user.tag,
			server: interaction.guild.name,
			moderator: interaction.member,
			reason
		})).catch(() => {});

		// Ban the user
		interaction.guild.members.ban(user, { reason } ).then(() => {

			// Send a success message in the current channel
			interaction.replyT("moderation/ban:BANNED", {
				username: user.tag,
				server: interaction.guild.name,
				moderator: interction.member,
				reason
			});

			const caseInfo = {
				channel: interaction.channel.id,
				moderator: interaction.member,
				date: Date.now(),
				type: "ban",
				case: data.guild.casesCount,
				reason
			};

			if(memberData){
				memberData.sanctions.push(caseInfo);
				memberData.save();
			}

			data.guild.casesCount++;
			data.guild.save();

			if(data.guild.plugins.modlogs){
				const channel = interaction.guild.channels.cache.get(data.guild.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(interaction.translate("moderation/ban:CASE", {
						count: data.guild.casesCount
					}))
					.addField(interaction.translate("common:USER"), `\`${user.tag}\` (${user.toString()})`, true)
					.addField(interaction.translate("common:MODERATOR"), `\`${interaction.member}\` (${interaction.member.toString()})`, true)
					.addField(interaction.translate("common:REASON"), reason, true)
					.setColor("#e02316");
				interaction.reply({ embeds: [embed] });
			}

		}).catch((err) => {
			console.log(err);
			return interaction.error("moderation/ban:MISSING_PERM");
		});

	}

}

module.exports = Ban;
