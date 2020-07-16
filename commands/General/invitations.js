const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Invitations extends Command {

	constructor (client) {
		super(client, {
			name: "invitations",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		let member = await this.client.resolveMember(args[0], message.guild);
		if (!member) member = message.member;

		// Gets the invites
		const invites = await message.guild.fetchInvites().catch(() => {});
        
		const memberInvites = invites.filter((i) => i.inviter && i.inviter.id === member.user.id);

		if(memberInvites.size <= 0){
			if(member === message.member){
				return message.error("general/invitations:NOBODY_AUTHOR");
			} else {
				return message.error("general/invitations:NOBODY_MEMBER", {
					member: member.user.tag
				});
			}
		}

		const content = memberInvites.map((i) => {
			return message.translate("general/invitations:CODE", {
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
			.setAuthor(message.translate("general/invitations:TRACKER"))
			.setDescription(message.translate("general/invitations:TITLE", {
				member: member.user.tag,
				guild: message.guild.name
			}))
			.addField(message.translate("general/invitations:FIELD_INVITED"), message.translate("general/invitations:FIELD_MEMBERS", {
				total: index
			}))
			.addField(message.translate("general/invitations:FIELD_CODES"), content);

		message.channel.send(embed);
	}

}

module.exports = Invitations;
