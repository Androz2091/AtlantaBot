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
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "member",
					description: "the member you want to mute",
					type: "USER",
					required: true
				},
				{
					name: "duration",
					description: "the duration of the mute",
					type: "NUMBER",
					required: true
				},
				{
					name: "reason",
					description: "the reason of the mute",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
        
		const member = await interaction.options.getMember("member")

		if(member.id === interaction.member.id){
			return interaction.error("moderation/ban:YOURSELF");
		}

		const memberPosition = member.roles.highest.position;
		const moderationPosition = interaction.member.roles.highest.position;
		if(!(moderationPosition > memberPosition)){
			return interaction.error("moderation/ban:SUPERIOR");
		}

		const memberData = await this.client.database.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		const time = interaction.options.getNumber("duration")
		if(isNaN(ms(time))){
			return interaction.error("misc:INVALID_TIME");
		}

		let reason = interaction.options.getString("reason")

		interaction.guild.channels.cache.forEach((channel) => {
			channel.updateOverwrite(member.id, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
				CONNECT: false
			}).catch(() => {});
		});

		interaction.reply(interaction.translate("moderation/mute:MUTED_DM", {
			username: member.user.username,
			server: interaction.guild.name,
			moderator: interaction.member.tag,
			time,
			reason
		}));

		interaction.success("moderation/mute:MUTED", {
			username: member.user.tag,
			server: interaction.guild.name,
			moderator: interaction.member.tag,
			time,
			reason
		});

		data.guild.casesCount++;

		const caseInfo = {
			channel: interaction.channel.id,
			moderator: interaction.member.id,
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

		this.client.database.mutedUsers.set(`${member.id}${interaction.guild.id}`, memberData);

		if(data.guild.plugins.modlogs){
			const channel = interaction.guild.channels.cache.get(data.guild.plugins.modlogs);
			if(!channel) return;
			const embed = new Discord.MessageEmbed()
				.setAuthor(interaction.translate("moderation/mute:CASE", {
					count: data.guild.casesCount
				}))
				.addField(interaction.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
				.addField(interaction.translate("common:MODERATOR"), `\`${interaction.member.tag}\` (${interaction.memer.toString()})`, true)
				.addField(interaction.translate("common:REASON"), reason, true)
				.addField(interaction.translate("common:DURATION"), time, true)
				.addField(interaction.translate("common:EXPIRY"), interaction.printDate(new Date(Date.now()+ms(time))), true)
				.setColor("#f44271");
			interaction.reply({ embeds: [embed] });
		}

	}

}

module.exports = Mute;
