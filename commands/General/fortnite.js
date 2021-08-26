const Command = require("../../base/Command.js"),
	Canvas = require("discord-canvas"),
	Discord = require("discord.js");

module.exports = class extends Command {
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
 
	async run (interaction, translate, data) {

		if(!data.config.apiKeys.fortniteTRN || data.config.apiKeys.fortniteTRN.length === ""){
			return interaction.reply({
				content: translate("misc:COMMAND_DISABLED")
			});
		}

		const stats = new Canvas.FortniteStats();

		const platform = args[0];
		if(!platform || (platform !== "pc" && platform !== "xbl" && platform !== "psn")){
			return interaction.reply({
				content: translate("general/fortnite:MISSING_PLATFORM"),
				ephemeral: true
			});
		}

		const user = args.slice(1).join(" ");
		if(!user){
			return interaction.reply({
				content: translate("general/fortnite:MISSING_USERNAME"),
				ephemeral: true
			});
		}

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});

		const statsImage = await stats
			.setToken(data.config.apiKeys.fortniteTRN)
			.setUser(user)
			.setPlatform(platform)
			.setText("averageKills", translate("general/fortnite:AVERAGE_KILLS"))
			.setText("averageKill", translate("general/fortnite:AVERAGE_KILL"))
			.setText("wPercent", translate("general/fortnite:W_PERCENT"))
			.setText("winPercent", translate("general/fortnite:WIN_PERCENT"))
			.setText("kD", translate("general/fortnite:KD"))
			.setText("wins", translate("general/fortnite:WINS"))
			.setText("win", translate("general/fortnite:WIN"))
			.setText("kills", translate("general/fortnite:KILLS"))
			.setText("kill", translate("general/fortnite:KILL"))
			.setText("matches", translate("general/fortnite:MATCHES"))
			.setText("match", translate("general/fortnite:MATCH"))
			.setText("footer", translate("general/fortnite:FOOTER"))
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
				.setDescription(translate("general/fortnite:TITLE", {
					username: `[${stats.data.username}](${stats.data.url.replace(new RegExp(" ", "g"), "%20")})`
				}))
				.attachFiles(attachment)
				.setImage("attachment://fortnite-stats-image.png")
				.setColor(data.config.embed.color)
				.setFooter(data.config.embed.footer);
		message.channel.send({ embeds: [embed] });
		m.delete();
	}
};
