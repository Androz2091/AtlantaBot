const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	ms = require("ms");

class Mute extends Command {

	constructor (client) {
		super(client, {
			name: "mute",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return interaction.reply({
				content: translate("moderation/mute:MISSING_MEMBER"),
				ephemeral: true
			});
		}

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

		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		const time = args[1];
		if(!time || isNaN(ms(time))){
			return interaction.reply({
				content: translate("misc:INVALID_TIME"),
				ephemeral: true
			});
		}

		let reason = args.slice(2).join(" ");
		if(!reason){
			reason = translate("misc:NO_REASON_PROVIDED");
		}

		message.guild.channels.cache.forEach((channel) => {
			channel.updateOverwrite(member.id, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
				CONNECT: false
			}).catch(() => {});
		});

		member.send(translate("moderation/mute:MUTED_DM", {
			username: member.user.username,
			server: message.guild.name,
			moderator: interaction.user.tag,
			time,
			reason
		}));

		message.success("moderation/mute:MUTED", {
			username: member.user.tag,
			server: message.guild.name,
			moderator: interaction.user.tag,
			time,
			reason
		});

		data.guild.casesCount++;

		const caseInfo = {
			channel: message.channel.id,
			moderator: interaction.user.id,
			date: Date.now(),
			type: "mute",
			case: data.guild.casesCount,
			reason,
			time
		};

		memberData.mute.muted = true;
		memberData.mute.endDate = Date.now()+ms(time);
		memberData.mute.case = data.guild.casesCount;
		memberData.sanctions.push(caseInfo);

		memberData.markModified("sanctions");
		memberData.markModified("mute");
		await memberData.save();

		await data.guild.save();

		this.client.databaseCache.mutedUsers.set(`${member.id}${interaction.guild.id}`, memberData);

		if(data.guild.plugins.modlogs){
			const channel = message.guild.channels.cache.get(data.guild.plugins.modlogs);
			if(!channel) return;
			const embed = new Discord.MessageEmbed()
				.setAuthor(translate("moderation/mute:CASE", {
					count: data.guild.casesCount
				}))
				.addField(translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
				.addField(translate("common:MODERATOR"), `\`${interaction.user.tag}\` (${interaction.user.toString()})`, true)
				.addField(translate("common:REASON"), reason, true)
				.addField(translate("common:DURATION"), time, true)
				.addField(translate("common:EXPIRY"), message.printDate(new Date(Date.now()+ms(time))), true)
				.setColor("#f44271");
			channel.send({ embeds: [embed] });
		}

	}

}

module.exports = Mute;
