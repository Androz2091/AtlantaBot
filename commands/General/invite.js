const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

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

	async run (interaction, translate, data) {

		const inviteLink = this.client.config.inviteURL || `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`;
		const voteURL = this.client.config.voteURL || `https://discordbots.org/bot/${this.client.user.id}/vote`;
		const supportURL = this.client.config.supportURL || await this.client.functions.supportLink(this.client);

		if(args[0] && args[0] === "copy"){
			return message.channel.send(inviteLink);
		}
        
		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("general/invite:LINKS"))
			.setDescription(translate("general/invite:TIP", {
				prefix: data.guild.prefix
			}))
			.addField(translate("general/invite:ADD"), inviteLink)
			.addField(translate("general/invite:VOTE"), voteURL)
			.addField(translate("general/invite:SUPPORT"), supportURL)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
        
		message.channel.send({ embeds: [embed] });
           
	}

};
