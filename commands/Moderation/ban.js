const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "ban",

			options: [
				{
					name: "user",
					type: "USER",
					required: true
				},
				{
					name: "reason",
					type: "STRING"
				}
			],

			enabled: true,
			guildOnly: true,
			memberPermissions: [ "BAN_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, data) {
        
		const user = interaction.options.getUser("user");
		const member = interaction.guild.members.cache.get(user.id) ?? await interaction.guild.members.fetch(user.id).catch(() => {});
		
		if (!member) {
			return void interaction.reply({
				content: translate("misc:USER_NOT_SERVER"),
				ephemeral: true
			});
		}

		const memberData = interaction.guild.members.cache.get(user.id) && await this.client.findOrCreateMember({ id: user.id, guildID: interaction.guild.id });

		if(user.id === interaction.user.id){
			return interaction.reply({
				content: translate("moderation/ban:YOURSELF"),
				ephemeral: true
			});
		}

		// If the user is already banned
		const banned = await interaction.guild.bans.fetch();
		if(banned.some((m) => m.user.id === user.id)){
			return interaction.reply({
				content: translate("moderation/ban:ALREADY_BANNED", {
					username: user.tag
				})
			});
		}
        
		// Gets the ban reason
		const reason = interaction.options.getString("reason") ?? translate("misc:NO_REASON_PROVIDED");

		if(member){
			const memberPosition = member.roles.highest.position;
			const moderationPosition = interaction.member.roles.highest.position;
			if(interaction.guild.ownerID !== interaction.user.id && !(moderationPosition > memberPosition)){
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
			server: interaction.guild.name,
			moderator: interaction.user.tag,
			reason
		})).catch(() => {});

		// Ban the user
		await interaction.guild.members.ban(user, {
			reason
		}).then(() => {

			// Send a success message in the current channel
			interaction.reply({
				content: translate("moderation/ban:BANNED", {
					username: user.tag,
					server: interaction.guild.name,
					moderator: interaction.user.tag,
					reason
				})
			});

			const caseInfo = {
				channel: interaction.channel.id,
				moderator: interaction.user.id,
				date: Date.now(),
				type: "ban",
				case: data.guildData.casesCount,
				reason
			};

			if(memberData){
				memberData.sanctions.push(caseInfo);
				memberData.save();
			}

			data.guildData.casesCount++;
			data.guildData.save();

			if(data.guildData.plugins.modlogs){
				const channel = interaction.guild.channels.cache.get(data.guildData.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(translate("moderation/ban:CASE", {
						count: data.guildData.casesCount
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

};
