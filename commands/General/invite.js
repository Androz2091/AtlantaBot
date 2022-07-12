const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Invite extends Command {

	constructor (client) {
		super(client, {
			name: "invite",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, data) {

		const inviteLink = this.client.config.inviteURL || `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`;
		const supportURL = this.client.config.supportURL || await this.client.functions.supportLink(this.client);
        
		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("general/invite:LINKS"))
			.setDescription(interaction.translate("general/invite:TIP", {
				prefix: data.guild.prefix
			}))
			.addField(interaction.translate("general/invite:ADD"), inviteLink)
			.addField(interaction.translate("general/invite:SUPPORT"), supportURL)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
        
		interaction.reply({ embeds: [embed] });
           
	}

}

module.exports = Invite;