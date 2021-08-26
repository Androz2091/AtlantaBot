const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "invitations",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		let member = await this.client.resolveMember(args[0], message.guild);
		if (!member) member = message.member;

		// Gets the invites
		const invites = await message.guild.fetchInvites().catch(() => {});
		if (!invites) return interaction.reply({
			content: translate("misc:ERR_OCCURRED"),
			ephemeral: true
		});
        
		const memberInvites = invites.filter((i) => i.inviter && i.inviter.id === member.user.id);

		if(memberInvites.size <= 0){
			if(member === message.member){
				return interaction.reply({
					content: translate("general/invitations:NOBODY_AUTHOR"),
					ephemeral: true
				});
			} else {
				return message.error("general/invitations:NOBODY_MEMBER", {
					member: member.user.tag
				});
			}
		}

		const content = memberInvites.map((i) => {
			return translate("general/invitations:CODE", {
				uses: i.uses,
				code: i.code,
				channel: i.channel.toString()
			});
		}).join("\n");
		let index = 0;
		memberInvites.forEach((invite) => index += invite.uses);
        
		const embed = new Discord.MessageEmbed()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer)
			.setAuthor(translate("general/invitations:TRACKER"))
			.setDescription(translate("general/invitations:TITLE", {
				member: member.user.tag,
				guild: message.guild.name
			}))
			.addField(translate("general/invitations:FIELD_INVITED"), translate("general/invitations:FIELD_MEMBERS", {
				total: index
			}))
			.addField(translate("general/invitations:FIELD_CODES"), content);

		message.channel.send({ embeds: [embed] });
	}

};


