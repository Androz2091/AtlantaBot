const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Staff extends Command {

	constructor (client) {
		super(client, {
			name: "staff",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, data) {
		await interaction.guild.members.fetch();
		const administrators = interaction.guild.members.cache.filter((m) => m.permissions.has("ADMINISTRATOR") && !m.user.bot);
		const moderators = interaction.guild.members.cache.filter((m) => !administrators.has(m.id) && m.permissions.has("MANAGE_MESSAGES") && !m.user.bot);
		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("general/staff:TITLE", {
				guild: interaction.guild.name
			}))
			.addField(interaction.translate("general/staff:ADMINS"), (administrators.size > 0 ? administrators.map((a) => `${this.client.customEmojis.status[a.presence.status]} | ${a.user.tag}`).join("\n") :interaction.translate("general/staff:NO_ADMINS")))
			.addField(interaction.translate("general/staff:MODS"), (moderators.size > 0 ? moderators.map((m) => `${this.client.customEmojis.status[m.presence.status]} | ${m.user.tag}`).join("\n") : interaction.translate("general/staff:NO_MODS")))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
		interaction.reply({ embeds: [embed] });
	}

}

module.exports = Staff;