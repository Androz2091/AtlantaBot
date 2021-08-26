const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Qrcode extends Command {

	constructor (client) {
		super(client, {
			name: "qrcode",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "qr" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const text = args.join(" ");
		if(!text){
			return interaction.reply({
				content: translate("images/qrcode:MISSING_TEXT"),
				ephemeral: true
			});
		}
    
		const pleaseWait = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
        
		const embed = new Discord.MessageEmbed()
			.setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
			.setColor(data.config.embed.color);

		pleaseWait.edit({ embeds: [embed], content: message.translate("images/qrcode:SUCCESS") });
    
	}

}

module.exports = Qrcode;