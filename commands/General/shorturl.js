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
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "url",
					description: "the url you want to short",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
    
		const url = interaction.options.getString("url")
		if(!url){
			return interaction.error("general/shorturl:MISSING_URL");
		}

		const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		const body = await res.text();

		if(body === "Error: Please enter a valid URL to shorten"){
			return interaction.error("general/shorturl:MISSING_URL");
		}

		const embed = new Discord.MessageEmbed()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer)
			.setDescription(body);
		interaction.reply({ embeds: [embed] });

	}

}

module.exports = ShortURL;