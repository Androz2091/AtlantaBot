const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Invitations extends Command {

	constructor (client) {
		super(client, {
			name: "invitations",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "member",
					description: "the member you want to check the invite",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {

		let member = await interaction.options.getMember("member")

		// Gets the invites
		const invites = await interaction.guild.fetchInvites().catch(() => {});
		if (!invites) return interaction.error("misc:ERR_OCCURRED");
        
		const memberInvites = invites.filter((i) => i.inviter && i.inviter.id === interaction.member.user.id);

		if(memberInvites.size <= 0){
			if(member === interaction.member){
				return interaction.error("general/invitations:NOBODY_AUTHOR");
			} else {
				return interaction.error("general/invitations:NOBODY_MEMBER", {
					member: interaction.member.user.tag
				});
			}
		}

		const content = memberInvites.map((i) => {
			return interaction.translate("general/invitations:CODE", {
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
			.setAuthor(interaction.translate("general/invitations:TRACKER"))
			.setDescription(interaction.translate("general/invitations:TITLE", {
				member: member.user.tag,
				guild: interaction.guild.name
			}))
			.addField(interaction.translate("general/invitations:FIELD_INVITED"), interaction.translate("general/invitations:FIELD_MEMBERS", {
				total: index
			}))
			.addField(interaction.translate("general/invitations:FIELD_CODES"), content);

		interaction.reply({ embeds: [embed] });
	}

}

module.exports = Invitations;
