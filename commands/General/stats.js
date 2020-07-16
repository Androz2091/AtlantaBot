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
			.addField(this.client.emotes.stats+" "+message.translate("general/stats:COUNTS_TITLE"), message.translate("general/stats:COUNTS_CONTENT", {
				servers: this.client.guilds.cache.size,
				users: this.client.users.cache.size
			}), true)
			.addField(this.client.emotes.version+" "+message.translate("general/stats:VERSIONS_TITLE"), `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\``, true)
			.addField(this.client.emotes.ram+" "+message.translate("general/stats:RAM_TITLE"), `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
			.addField(this.client.emotes.status.online+" "+message.translate("general/stats:ONLINE_TITLE"), message.translate("general/stats:ONLINE_CONTENT", {
				time: message.convertTime(Date.now()+this.client.uptime, "from", true)
			}))
			.addField(this.client.emotes.voice+" "+message.translate("general/stats:MUSIC_TITLE"), message.translate("general/stats:MUSIC_CONTENT", {
				count: this.client.voice.connections.size
			}))
			.addField(message.translate("general/stats:CREDITS_TITLE"), message.translate("general/stats:CREDITS_CONTENT"));

		statsEmbed.addField(this.client.emotes.link+" "+message.translate("general/stats:LINKS_TITLE"), message.translate("misc:STATS_FOOTER", {
			donateLink: "https://patreon.com/Androz2091",
			dashboardLink: "https://dashboard.atlanta-bot.fr",
			inviteLink: await this.client.generateInvite("ADMINISTRATOR"),
			githubLink: "https://github.com/Androz2091",
			supportLink: "https://discord.atlanta-bot.fr"
		})
		);
		message.channel.send(statsEmbed);

	}

}

module.exports = Stats;