const Command = require("../../base/Command.js"),
	{MessageEmbed, version} = require("discord.js");

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

		const statsEmbed = new MessageEmbed()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer)
			.setAuthor(message.translate("common:STATS"))
			.setDescription(message.translate("general/stats:MADE"))
			.addField(this.client.customEmojis.stats+" "+message.translate("general/stats:COUNTS_TITLE"), message.translate("general/stats:COUNTS_CONTENT", {
				servers: this.client.guilds.cache.size,
				users: this.client.users.cache.size
			}), true)
			.addField(this.client.customEmojis.version+" "+message.translate("general/stats:VERSIONS_TITLE"), `\`Discord.js : v${version}\`\n\`Nodejs : v${process.versions.node}\``, true)
			.addField(this.client.customEmojis.ram+" "+message.translate("general/stats:RAM_TITLE"), `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
			.addField(this.client.customEmojis.status.online+" "+message.translate("general/stats:ONLINE_TITLE"), message.translate("general/stats:ONLINE_CONTENT", {
				time: message.convertTime(Date.now()+this.client.uptime, "from", true)
			}))
			.addField(this.client.customEmojis.voice+" "+message.translate("general/stats:MUSIC_TITLE"), message.translate("general/stats:MUSIC_CONTENT", {
				count: this.client.voice.connections.size
			}))
			.addField(message.translate("general/stats:CREDITS_TITLE"), message.translate("general/stats:CREDITS_CONTENT", {
				donators: [ "`Marty#0303` (**GOD**)", "`Reese's Cup#9637` (**SUPPORTER**)", "`\"</Synaro/>\"#2020` (**SUPPORTER**)", "`✰Donjͥบaͣnͫ✰#7777` (**SUPPORTER**)" ].join("\n"),
				translators: [ "`Lil Ethan. 💤#1337` (:flag_fr:)", "`Mizuki#2477` (:flag_fr:)", "`shaynlink#9070` (:flag_fr:)", "`Androz#2091` (:flag_fr:)", "`kevinava#4941` (:flag_es:)" ].join("\n")
			}));

		statsEmbed.addField(this.client.customEmojis.link+" "+message.translate("general/stats:LINKS_TITLE"), message.translate("misc:STATS_FOOTER", {
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