const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "staff",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "stafflist", "staffliste" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
		await message.guild.members.fetch();
		const administrators = message.guild.members.cache.filter((m) => m.permissions.has("ADMINISTRATOR") && !m.user.bot);
		const moderators = message.guild.members.cache.filter((m) => !administrators.has(m.id) && m.permissions.has("MANAGE_MESSAGES") && !m.user.bot);
		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("general/staff:TITLE", {
				guild: message.guild.name
			}))
			.addField(translate("general/staff:ADMINS"), (administrators.size > 0 ? administrators.map((a) => `${this.client.customEmojis.status[a.presence.status]} | ${a.user.tag}`).join("\n") :translate("general/staff:NO_ADMINS")))
			.addField(translate("general/staff:MODS"), (moderators.size > 0 ? moderators.map((m) => `${this.client.customEmojis.status[m.presence.status]} | ${m.user.tag}`).join("\n") : translate("general/staff:NO_MODS")))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
		message.channel.send({ embeds: [embed] });
	}

};

