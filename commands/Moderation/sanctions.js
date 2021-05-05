const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Sanctions extends Command {

	constructor (client) {
		super(client, {
			name: "sanctions",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "warns", "see-warns", "view-warns", "see-sanctions", "view-sanctions", "infractions", "view-infractions", "see-infractions" ],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        
		const user = await this.client.resolveUser(args[0]);
		if(!user){
			return message.error("moderation/sanctions:MISSING_MEMBER");
		}
		const memberData = await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id });

		const embed = new Discord.MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		if(memberData.sanctions.length < 1){
			embed.setDescription(message.translate("moderation/sanctions:NO_SANCTION", {
				username: user.tag
			}));
			return message.channel.send(embed);
		} else {
			memberData.sanctions.forEach((s) => {
				embed.addField(s.type+" | #"+s.case, `${message.translate("common:MODERATOR")}: <@${s.moderator}>\n${message.translate("common:REASON")}: ${s.reason}`, true);
			});
		}

		message.channel.send(embed);
	}

}

module.exports = Sanctions;
