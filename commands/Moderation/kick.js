const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "kick",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [ "KICK_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return interaction.reply({
				content: translate("moderation/kick:MISSING_MEMBER"),
				ephemeral: true
			});
		}

		if(member.id === interaction.user.id){
			return interaction.reply({
				content: translate("moderation/ban:YOURSELF"),
				ephemeral: true
			});
		}
        
		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });
        
		// Gets the kcik reason
		let reason = args.slice(1).join(" ");
		if(!reason){
			reason = translate("misc:NO_REASON_PROVIDED");
		}
        
		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(message.member.ownerID !== interaction.user.id && !(moderationPosition > memberPosition)){
			return interaction.reply({
				content: translate("moderation/ban:SUPERIOR"),
				ephemeral: true
			});
		}

		if(!member.kickable) {
			return interaction.reply({
				content: translate("moderation/kick:MISSING_PERM"),
				ephemeral: true
			});
		}

		await member.send(translate("moderation/kick:KICKED_DM", {
			username: member.user.tag,
			server: message.guild.name,
			moderator: interaction.user.tag,
			reason
		})).catch(() => {});

		// Kick the user
		member.kick(reason).then(() => {

			// Send a success message in the current channel
			message.sendT("moderation/kick:KICKED", {
				username: member.user.tag,
				server: message.guild.name,
				moderator: interaction.user.tag,
				reason
			});

			data.guild.casesCount++;
			data.guild.save();

			const caseInfo = {
				channel: message.channel.id,
				moderator: interaction.user.id,
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
					.setAuthor(translate("moderation/kick:CASE", {
						count: data.guild.casesCount
					}))
					.addField(translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
					.addField(translate("common:MODERATOR"), `\`${interaction.user.tag}\` (${interaction.user.toString()})`, true)
					.addField(translate("common:REASON"), reason, true)
					.setColor("#e88709");
				channel.send({ embeds: [embed] });
			}

		}).catch(() => {
			return interaction.reply({
				content: translate("moderation/kick:MISSING_PERM"),
				ephemeral: true
			});
		});

	}

};
