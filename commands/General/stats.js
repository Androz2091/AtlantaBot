const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Stats extends Command {

	constructor (client) {
		super(client, {
			name: "stats",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "statistics", "infobot", "botinfos", "bot-infos", "bot-info", "infos-bot", "info-bot" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const statsEmbed = new Discord.MessageEmbed()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer)
			.setAuthor(message.translate("common:STATS"))
			.setDescription(message.translate("general/stats:MADE"))
			.addField(this.client.config.emojis.stats+" "+message.translate("general/stats:COUNTS_TITLE"), message.translate("general/stats:COUNTS_CONTENT", {
				servers: message.client.guilds.cache.size,
				users: message.client.users.cache.size
			}), true)
			.addField(this.client.config.emojis.version+" "+message.translate("general/stats:VERSIONS_TITLE"), `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\``, true)
			.addField(this.client.config.emojis.ram+" "+message.translate("general/stats:RAM_TITLE"), `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
			.addField(this.client.config.emojis.status.online+" "+message.translate("general/stats:ONLINE_TITLE"), message.translate("general/stats:ONLINE_CONTENT", {
				time: message.convertTime(Date.now()+message.client.uptime, "from", true)
			}))
			.addField(this.client.config.emojis.voice+" "+message.translate("general/stats:MUSIC_TITLE"), message.translate("general/stats:MUSIC_CONTENT", {
				count: message.client.voice.connections.size
			}))
			.addField(message.translate("general/stats:CREDITS_TITLE"), message.translate("general/stats:CREDITS_CONTENT"));

		statsEmbed.addField(this.client.config.emojis.link+" "+message.translate("general/stats:LINKS_TITLE"), message.translate("misc:STATS_FOOTER", {
			donateLink: "https://patreon.com/Androz2091",
			dashboardLink: "https://dashboard.atlanta-bot.fr",
			inviteLink: await message.client.generateInvite("ADMINISTRATOR"),
			githubLink: "https://github.com/Androz2091",
			supportLink: "https://discord.atlanta-bot.fr"
		})
		);
		message.channel.send(statsEmbed);

	}

}

module.exports = Stats;