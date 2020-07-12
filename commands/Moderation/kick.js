const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Kick extends Command {

	constructor (client) {
		super(client, {
			name: "kick",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "KICK_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("moderation/kick:MISSING_MEMBER");
		}

		if(member.id === message.author.id){
			return message.error("moderation/ban:YOURSELF");
		}
        
		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });
        
		// Gets the kcik reason
		let reason = args.slice(1).join(" ");
		if(!reason){
			reason = message.translate("misc:NO_REASON_PROVIDED");
		}
        
		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)){
			return message.error("moderation/ban:SUPERIOR");
		}

		if(!member.kickable) {
			return message.error("moderation/kick:MISSING_PERM");
		}

		await member.send(message.translate("moderation/kick:KICKED_DM", {
			username: member.user.tag,
			server: message.guild.name,
			moderator: message.author.tag,
			reason
		})).catch(() => {});

		// Kick the user
		member.kick(reason).then(() => {

			// Send a success message in the current channel
			message.sendT("moderation/kick:KICKED", {
				username: member.user.tag,
				server: message.guild.name,
				moderator: message.author.tag,
				reason
			});

			data.guild.casesCount++;
			data.guild.save();

			const caseInfo = {
				channel: message.channel.id,
				moderator: message.author.id,
				date: Date.now(),
				type: "kick",
				case: data.guild.casesCount,
				reason,
			};
            
			memberData.sanctions.push(caseInfo);
			memberData.save();
            
			if(data.guild.plugins.modlogs){
				const channel = message.guild.channels.cache.get(data.guild.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(message.translate("moderation/kick:CASE", {
						count: data.guild.casesCount
					}))
					.addField(message.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
					.addField(message.translate("common:MODERATOR"), `\`${message.author.tag}\` (${message.author.toString()})`, true)
					.addField(message.translate("common:REASON"), reason, true)
					.setColor("#e88709");
				channel.send(embed);
			}

		}).catch(() => {
			return message.error("moderation/kick:MISSING_PERM");
		});

	}

}

module.exports = Kick;
