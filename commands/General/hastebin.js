const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

class Hastebin extends Command {

	constructor (client) {
		super(client, {
			name: "hastebin",
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
					name: "content",
					description: "the content you want to paste",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {

		const content = interaction.options.getString("content")

		try {
			const res = await fetch("https://hastebin.com/documents", {
				method: "POST",
				body: content,
				headers: { "Content-Type": "text/plain" }
			});
            
			const json = await res.json();
			if(!json.key){
				return interaction.error("misc:ERR_OCCURRED");
			}
			const url = "https://hastebin.com/"+json.key+".js";

			const embed = new Discord.MessageEmbed()
				.setAuthor(interaction.translate("general/hastebin:SUCCESS"))
				.setDescription(url)
				.setColor(data.config.embed.color);
			interaction.reply({ embeds: [embed] });
		} catch(e){
			interaction.error("misc:ERR_OCCURRED");
		}
        
	}

}

module.exports = Hastebin;
