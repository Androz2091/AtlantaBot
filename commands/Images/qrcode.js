const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Qrcode extends Command {

	constructor (client) {
		super(client, {
			name: "qrcode",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "text",
					description: "the text you want to qrcode",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {

		const text = interaction.options.getString("text")
		if(!text){
			return interaction.error("images/qrcode:MISSING_TEXT");
		}
    
		const pleaseWait = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
        
		const embed = new Discord.MessageEmbed()
			.setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
			.setColor(data.config.embed.color);

		pleaseWait.editReply({ embeds: [embed], content: interaction.translate("images/qrcode:SUCCESS") });
    
	}

}

module.exports = Qrcode;