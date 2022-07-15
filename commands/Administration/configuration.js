const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Configuration extends Command {

	constructor (client) {
		super(client, {
			name: "configuration",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, data) {

		const guildData = data.guild;

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.guild.name, interaction.guild.iconURL())
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);

		// Guild prefix
		embed.addField(interaction.translate("administration/configuration:PREFIX_TITLE"), guildData.prefix);

		// Ignored channels
		embed.addField(interaction.translate("administration/configuration:IGNORED_CHANNELS_TITLE"),
			(guildData.ignoredChannels.length > 0) ?
				guildData.ignoredChannels.map((ch) => `<#${ch}>`).join(", ")
				:   interaction.translate("administration/configuration:NO_IGNORED_CHANNELS")
		);
    
		// Autorole plugin
		embed.addField(interaction.translate("administration/configuration:AUTOROLE_TITLE"), 
			(guildData.plugins.autorole.enabled) ?
				interaction.translate("administration/configuration:AUTOROLE_CONTENT", {
					roleName: `<@&${guildData.plugins.autorole.role}>`
				})
				:   interaction.translate("administration/configuration:AUTOROLE_DISABLED")
		);
        
		// Welcome plugin
		embed.addField(interaction.translate("administration/configuration:WELCOME_TITLE"),
			(guildData.plugins.welcome.enabled) ?
				interaction.translate("administration/configuration:WELCOME_CONTENT", {
					channel: `<#${guildData.plugins.welcome.channel}>`,
					withImage: guildData.plugins.welcome.withImage ? interaction.translate("common:YES") : interaction.translate("common:NO")
				})
				:   interaction.translate("administration/configuration:WELCOME_DISABLED")
		);
            
		// Goodbye plugin
		embed.addField(interaction.translate("administration/configuration:GOODBYE_TITLE"),
			(guildData.plugins.goodbye.enabled) ?
				interaction.translate("administration/configuration:GOODBYE_CONTENT", {
					channel: `<#${guildData.plugins.goodbye.channelID}>`,
					withImage: guildData.plugins.goodbye.withImage ? interaction.translate("common:YES") : interaction.translate("common:NO")
				})
				:   interaction.translate("administration/configuration:GOODBYE_DISABLED")
		);

		// Special channels
		embed.addField(interaction.translate("administration/configuration:SPECIAL_CHANNELS"),
			interaction.translate("administration/configuration:MODLOGS", {
				channel:    guildData.plugins.modlogs
					? `<#${guildData.plugins.modlogs}>`
					: interaction.translate("common:NOT_DEFINED")
			}) + "\n" +
			interaction.translate("administration/configuration:FORTNITESHOP", {
				channel:    guildData.plugins.fortniteshop
					? `<#${guildData.plugins.fortniteshop}>`
					: interaction.translate("common:NOT_DEFINED")
			}) + "\n" +
			interaction.translate("administration/configuration:SUGGESTIONS", {
				channel:    guildData.plugins.suggestions
					? `<#${guildData.plugins.suggestions}>`
					: interaction.translate("common:NOT_DEFINED")
			}) + "\n" +
			interaction.translate("administration/configuration:REPORTS", {
				channel:    guildData.plugins.reports
					? `<#${guildData.plugins.reports}>`
					: interaction.translate("common:NOT_DEFINED")
			})
		);
        
		// Auto sanctions
		embed.addField(interaction.translate("administration/configuration:AUTO_SANCTIONS"),
			((guildData.plugins.warnsSanctions.kick) ?
				interaction.translate("administration/configuration:KICK_CONTENT", {
					count: guildData.plugins.warnsSanctions.kick
				})
				:   interaction.translate("administration/configuration:KICK_NOT_DEFINED")) + "\n" +
			((guildData.plugins.warnsSanctions.ban) ?
				interaction.translate("administration/configuration:BAN_CONTENT", {
					count: guildData.plugins.warnsSanctions.ban
				})
				:   interaction.translate("administration/configuration:BAN_NOT_DEFINED"))
		);

		// Automod plugin
		embed.addField(interaction.translate("administration/configuration:AUTOMOD_TITLE"),
			(guildData.plugins.automod.enabled) ?
				interaction.translate("administration/configuration:AUTOMOD_CONTENT", {
					channels: guildData.plugins.automod.ignored.map((ch) => `<#${ch}>`)
				})
				:   interaction.translate("administration/configuration:AUTOMOD_DISABLED")
		);

		// Auto-delete mod commands
		embed.addField(interaction.translate("administration/configuration:AUTODELETEMOD"),
			(!interaction.guild.autoDeleteModCommands) ?
				interaction.translate("administration/configuration:AUTODELETEMOD_ENABLED")
				:   interaction.translate("administration/configuration:AUTODELETEMOD_DISABLED")
		);

		// Dashboard link
		embed.addField(interaction.translate("administration/configuration:DASHBOARD_TITLE"), `[${interaction.translate("administration/configuration:DASHBOARD_CONTENT")}](${this.client.config.supportURL})`);

		interaction.reply({ embeds: [embed] });
	}

}

module.exports = Configuration;
