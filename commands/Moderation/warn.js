const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Warn extends Command {

	constructor (client) {
		super(client, {
			name: "warn",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("moderation/warn:MISSING_MEMBER");
		}
		if(member.user.bot){
			return message.error("misc:BOT_USER");
		}
		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

		if(member.id === message.author.id){
			return message.error("moderation/ban:YOURSELF");
		}

		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)){
			return message.error("moderation/ban:SUPERIOR");
		}

		const reason = args.slice(1).join(" ");
		if(!reason){
			return message.error("moderation/warn:MISSING_REASON");
		}

		// Gets current member sanctions
		const sanctions = memberData.sanctions.filter((s) => s.type === "warn").length;
		const banCount = data.guild.plugins.warnsSanctions.ban;
		const kickCount = data.guild.plugins.warnsSanctions.kick;
        
		data.guild.casesCount++;
		data.guild.save();

		const caseInfo = {
			channel: message.channel.id,
			moderator: message.author.id,
			date: Date.now(),
			type: "warn",
			case: data.guild.casesCount,
			reason
		};

		const embed = new Discord.MessageEmbed()
			.addField(message.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`)
			.addField(message.translate("common:MODERATOR"), `\`${message.author.tag}\` (${message.author.toString()}`)
			.addField(message.translate("common:REASON"), reason, true);

		if(banCount){
			if(sanctions >= banCount){
				member.send(message.translate("moderation/ban:BANNED_DM", {
					username: member.user,
					moderator: message.author.tag,
					server: message.guild.name,
					reason
				}));
				caseInfo.type = "ban";
				embed.setAuthor(message.translate("moderation/ban:CASE", {
					count: data.guild.casesCount
				}))
					.setColor("#e02316");
				message.guild.members.ban(member).catch(() => {});
				message.success("moderation/setwarns:AUTO_BAN", {
					username: member.tag,
					count: banCount
				});
			}
		} else if(kickCount){
			if(sanctions >= kickCount){
				member.send(message.translate("moderation/kick:KICKED_DM", {
					username: member.user,
					moderator: message.author.tag,
					server: message.guild.name,
					reason
				}));
				caseInfo.type = "kick";
				embed.setAuthor(message.translate("moderation/kick:CASE", {
					count: data.guild.casesCount
				}))
					.setColor("#e88709");
				message.guild.members.kick(member).catch(() => {});
				message.success("moderation/setwarns:AUTO_KICK", {
					username: member.tag,
					count: banCount
				});
			}
		} else {
			member.send(message.translate("moderation/warn:WARNED_DM", {
				username: member.user.tag,
				server: message.guild.name,
				moderator: message.author.tag,
				reason
			}));
			caseInfo.type = "warn";
			embed.setAuthor(message.translate("moderation/warn:CASE", {
				count: data.guild.casesCount
			}))
				.setColor("#8c14e2");
			message.success("moderation/warn:WARNED", {
				username: member.user.tag,
				reason
			});
		}

		memberData.sanctions.push(caseInfo);
		memberData.save();

		if(data.guild.plugins.modlogs){
			const channel = message.guild.channels.cache.get(data.guild.plugins.modlogs);
			if(!channel) return;
			channel.send(embed);
		}
	}

}

module.exports = Warn;
