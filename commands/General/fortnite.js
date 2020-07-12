const Command = require("../../base/Command.js"),
	Canvas = require("discord-canvas"),
	Discord = require("discord.js");

class Fortnite extends Command {
	constructor (client) {
		super(client, {
			name: "fortnite",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "fn" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 500
		});
	}
 
	async run (message, args, data) {

		if(!data.config.apiKeys.fortniteTRN || data.config.apiKeys.fortniteTRN.length === ""){
			return message.success("misc:COMMAND_DISABLED");
		}

		const stats = new Canvas.FortniteStats();

		const platform = args[0];
		if(!platform || (platform !== "pc" && platform !== "xbl" && platform !== "psn")){
			return message.error("general/fortnite:MISSING_PLATFORM");
		}

		const user = args.slice(1).join(" ");
		if(!user){
			return message.error("general/fortnite:MISSING_USERNAME");
		}

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});

		const statsImage = await stats
			.setToken(data.config.apiKeys.fortniteTRN)
			.setUser(user)
			.setPlatform(platform)
			.setText("averageKills", message.translate("general/fortnite:AVERAGE_KILLS"))
			.setText("averageKill", message.translate("general/fortnite:AVERAGE_KILL"))
			.setText("wPercent", message.translate("general/fortnite:W_PERCENT"))
			.setText("winPercent", message.translate("general/fortnite:WIN_PERCENT"))
			.setText("kD", message.translate("general/fortnite:KD"))
			.setText("wins", message.translate("general/fortnite:WINS"))
			.setText("win", message.translate("general/fortnite:WIN"))
			.setText("kills", message.translate("general/fortnite:KILLS"))
			.setText("kill", message.translate("general/fortnite:KILL"))
			.setText("matches", message.translate("general/fortnite:MATCHES"))
			.setText("match", message.translate("general/fortnite:MATCH"))
			.setText("footer", message.translate("general/fortnite:FOOTER"))
			.toAttachment();
        
		if(!statsImage){
			m.delete();
			return message.error("general/fortnite:NOT_FOUND", {
				platform,
				search: user
			});
		}

		// Send embed
		const attachment = new Discord.MessageAttachment(statsImage.toBuffer(), "fortnite-stats-image.png"),
			embed = new Discord.MessageEmbed()
				.setDescription(message.translate("general/fortnite:TITLE", {
					username: `[${stats.data.username}](${stats.data.url.replace(new RegExp(" ", "g"), "%20")})`
				}))
				.attachFiles(attachment)
				.setImage("attachment://fortnite-stats-image.png")
				.setColor(data.config.embed.color)
				.setFooter(data.config.embed.footer);
		message.channel.send(embed);
		m.delete();
	}
}

module.exports = Fortnite;
