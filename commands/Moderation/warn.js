const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Warn extends Command {

	constructor (client) {
		super(client, {
			name: "warn",
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
					name: "member",
					description: "the member you want to warn",
					type: "USER",
					required: true
				},
				{
					name: "reason",
					description: "the reason of the warn",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
        
		const member = await interaction.options.getMember("member")
		if(member.user.bot){
			return message.error("misc:BOT_USER");
		}
		const memberData = await this.client.database.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		if(member.id === interaction.member.id){
			return message.error("moderation/ban:YOURSELF");
		}

		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(!(moderationPosition > memberPosition)){
			return interaction.error("moderation/ban:SUPERIOR");
		}

		const reason = interaction.options.getString("reason")

		// Gets current member sanctions
		const sanctions = memberData.sanctions.filter((s) => s.type === "warn").length;
		const banCount = data.guild.plugins.warnsSanctions.ban;
		const kickCount = data.guild.plugins.warnsSanctions.kick;
        
		data.guild.casesCount++;
		data.guild.save();

		const caseInfo = {
			channel: interaction.channel.id,
			moderator: interaction.member.id,
			date: Date.now(),
			type: "warn",
			case: data.guild.casesCount,
			reason
		};

		const embed = new Discord.MessageEmbed()
			.addField(interaction.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`)
			.addField(interaction.translate("common:MODERATOR"), `\`${interaction.member.user.tag}\` (${interaction.member.toString()}`)
			.addField(interaction.translate("common:REASON"), reason, true);

		if(banCount){
			if(sanctions >= banCount){
				member.send(interaction.translate("moderation/ban:BANNED_DM", {
					username: member.user,
					moderator: interaction.member.user.tag,
					server: interaction.guild.name,
					reason
				}));
				caseInfo.type = "ban";
				embed.setAuthor(interaction.translate("moderation/ban:CASE", {
					count: data.guild.casesCount
				}))
					.setColor("#e02316");
				interaction.guild.members.ban(member).catch(() => {});
				interaction.success("moderation/setwarns:AUTO_BAN", {
					username: member.user.tag,
					count: banCount
				});
			}
		}
		
		if(kickCount){
			if(sanctions >= kickCount){
				member.send(interaction.translate("moderation/kick:KICKED_DM", {
					username: member.user,
					moderator: interaction.member.user.tag,
					server: interaction.guild.name,
					reason
				}));
				caseInfo.type = "kick";
				embed.setAuthor(interaction.translate("moderation/kick:CASE", {
					count: data.guild.casesCount
				}))
					.setColor("#e88709");
				member.kick().catch(() => {});
				interaction.success("moderation/setwarns:AUTO_KICK", {
					username: member.user.tag,
					count: kickCount
				});
			}
		}

		member.send(interaction.translate("moderation/warn:WARNED_DM", {
			username: member.user.tag,
			server: interaction.guild.name,
			moderator: interaction.member.user.tag,
			reason
		}));
		caseInfo.type = "warn";
		embed.setAuthor(interaction.translate("moderation/warn:CASE", {
			caseNumber: data.guild.casesCount
		}))
			.setColor("#8c14e2");
		interaction.success("moderation/warn:WARNED", {
			username: interaction.member.user.tag,
			reason
		});

		memberData.sanctions.push(caseInfo);
		memberData.save();

		if(data.guild.plugins.modlogs){
			const channel = interaction.guild.channels.cache.get(data.guild.plugins.modlogs);
			if(!channel) return;
			interaction.reply({ embeds: [embed] });
		}
	}

}

module.exports = Warn;
