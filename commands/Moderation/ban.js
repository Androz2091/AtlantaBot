const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Ban extends Command {

	constructor (client) {
		super(client, {
			name: "ban",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "BAN_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const user = await this.client.resolveUser(args[0]);
		if(!user){
			return interaction.reply({
				content: translate("moderation/ban:MISSING_MEMBER"),
				ephemeral: true
			});
		}
        
		const memberData = message.guild.members.cache.get(user.id) ? await this.client.findOrCreateMember({ id: user.id, guildID: interaction.guild.id }) : null;

		if(user.id === interaction.user.id){
			return interaction.reply({
				content: translate("moderation/ban:YOURSELF"),
				ephemeral: true
			});
		}

		// If the user is already banned
		const banned = await message.guild.fetchBans();
		if(banned.some((m) => m.user.id === user.id)){
			return message.error("moderation/ban:ALREADY_BANNED", {
				username: user.tag
			});
		}
        
		// Gets the ban reason
		let reason = args.slice(1).join(" ");
		if(!reason){
			reason = translate("misc:NO_REASON_PROVIDED");
		}

		const member = await message.guild.members.fetch(user.id).catch(() => {});
		if(member){
			const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerID !== interaction.user.id && !(moderationPosition > memberPosition)){
				return interaction.reply({
					content: translate("moderation/ban:SUPERIOR"),
					ephemeral: true
				});
			}
			if(!member.bannable) {
				return interaction.reply({
					content: translate("moderation/ban:MISSING_PERM"),
					ephemeral: true
				});
			}
		}
        
		await user.send(translate("moderation/ban:BANNED_DM", {
			username: user.tag,
			server: message.guild.name,
			moderator: interaction.user.tag,
			reason
		})).catch(() => {});

		// Ban the user
		message.guild.members.ban(user, { reason } ).then(() => {

			// Send a success message in the current channel
			message.sendT("moderation/ban:BANNED", {
				username: user.tag,
				server: message.guild.name,
				moderator: interaction.user.tag,
				reason
			});

			const caseInfo = {
				channel: message.channel.id,
				moderator: interaction.user.id,
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
				const channel = message.guild.channels.cache.get(data.guild.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(translate("moderation/ban:CASE", {
						count: data.guild.casesCount
					}))
					.addField(translate("common:USER"), `\`${user.tag}\` (${user.toString()})`, true)
					.addField(translate("common:MODERATOR"), `\`${interaction.user.tag}\` (${interaction.user.toString()})`, true)
					.addField(translate("common:REASON"), reason, true)
					.setColor("#e02316");
				channel.send({ embeds: [embed] });
			}

		}).catch((err) => {
			console.log(err);
			return interaction.reply({
				content: translate("moderation/ban:MISSING_PERM"),
				ephemeral: true
			});
		});

	}

}

module.exports = Ban;
