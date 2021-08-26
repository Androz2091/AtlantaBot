const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

class ShortURL extends Command {

	constructor (client) {
		super(client, {
			name: "shorturl",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "minimize" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {
    
		const url = args[0];
		if(!url){
			return interaction.reply({
				content: translate("general/shorturl:MISSING_URL"),
				ephemeral: true
			});
		}

		const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		const body = await res.text();

		if(body === "Error: Please enter a valid URL to shorten"){
			return interaction.reply({
				content: translate("general/shorturl:MISSING_URL"),
				ephemeral: true
			});
		}

		const embed = new Discord.MessageEmbed()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer)
			.setDescription(body);
		message.channel.send({ embeds: [embed] });

	}

}

module.exports = ShortURL;