const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "warn",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return interaction.reply({
				content: translate("moderation/warn:MISSING_MEMBER"),
				ephemeral: true
			});
		}
		if(member.user.bot){
			return interaction.reply({
				content: translate("misc:BOT_USER"),
				ephemeral: true
			});
		}
		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		if(member.id === interaction.user.id){
			return interaction.reply({
				content: translate("moderation/ban:YOURSELF"),
				ephemeral: true
			});
		}

		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(message.member.ownerID !== interaction.user.id && !(moderationPosition > memberPosition)){
			return interaction.reply({
				content: translate("moderation/ban:SUPERIOR"),
				ephemeral: true
			});
		}

		const reason = args.slice(1).join(" ");
		if(!reason){
			return interaction.reply({
				content: translate("moderation/warn:MISSING_REASON"),
				ephemeral: true
			});
		}

		// Gets current member sanctions
		const sanctions = memberData.sanctions.filter((s) => s.type === "warn").length;
		const banCount = data.guildData.plugins.warnsSanctions.ban;
		const kickCount = data.guildData.plugins.warnsSanctions.kick;
        
		data.guildData.casesCount++;
		data.guildData.save();

		const caseInfo = {
			channel: message.channel.id,
			moderator: interaction.user.id,
			date: Date.now(),
			type: "warn",
			case: data.guildData.casesCount,
			reason
		};

		const embed = new Discord.MessageEmbed()
			.addField(translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`)
			.addField(translate("common:MODERATOR"), `\`${interaction.user.tag}\` (${interaction.user.toString()}`)
			.addField(translate("common:REASON"), reason, true);

		if(banCount){
			if(sanctions >= banCount){
				member.send(translate("moderation/ban:BANNED_DM", {
					username: member.user,
					moderator: interaction.user.tag,
					server: message.guild.name,
					reason
				}));
				caseInfo.type = "ban";
				embed.setAuthor(translate("moderation/ban:CASE", {
					count: data.guildData.casesCount
				}))
					.setColor("#e02316");
				message.guild.members.ban(member).catch(() => {});
				message.success("moderation/setwarns:AUTO_BAN", {
					username: member.user.tag,
					count: banCount
				});
			}
		}
		
		if(kickCount){
			if(sanctions >= kickCount){
				member.send(translate("moderation/kick:KICKED_DM", {
					username: member.user,
					moderator: interaction.user.tag,
					server: message.guild.name,
					reason
				}));
				caseInfo.type = "kick";
				embed.setAuthor(translate("moderation/kick:CASE", {
					count: data.guildData.casesCount
				}))
					.setColor("#e88709");
				member.kick().catch(() => {});
				message.success("moderation/setwarns:AUTO_KICK", {
					username: member.user.tag,
					count: kickCount
				});
			}
		}

		member.send(translate("moderation/warn:WARNED_DM", {
			username: member.user.tag,
			server: message.guild.name,
			moderator: interaction.user.tag,
			reason
		}));
		caseInfo.type = "warn";
		embed.setAuthor(translate("moderation/warn:CASE", {
			caseNumber: data.guildData.casesCount
		}))
			.setColor("#8c14e2");
		message.success("moderation/warn:WARNED", {
			username: member.user.tag,
			reason
		});

		memberData.sanctions.push(caseInfo);
		memberData.save();

		if(data.guildData.plugins.modlogs){
			const channel = message.guild.channels.cache.get(data.guildData.plugins.modlogs);
			if(!channel) return;
			channel.send({ embeds: [embed] });
		}
	}

};
