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
			aliases: [ "pastebin" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {

		const content = args.join(" ");
		if(!content){
			return interaction.reply({
				content: translate("general/hastebin:MISSING_TEXT"),
				ephemeral: true
			});
		}

		try {
			const res = await fetch("https://hastebin.com/documents", {
				method: "POST",
				body: content,
				headers: { "Content-Type": "text/plain" }
			});
            
			const json = await res.json();
			if(!json.key){
				return interaction.reply({
					content: translate("misc:ERR_OCCURRED"),
					ephemeral: true
				});
			}
			const url = "https://hastebin.com/"+json.key+".js";

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.translate("general/hastebin:SUCCESS"))
				.setDescription(url)
				.setColor(data.config.embed.color);
			message.channel.send({ embeds: [embed] });
		} catch(e){
			interaction.reply({
				content: translate("misc:ERR_OCCURRED"),
				ephemeral: true
			});
		}
        
	}

}

module.exports = Hastebin;
