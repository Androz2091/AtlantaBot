const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Configuration extends Command {

	constructor (client) {
		super(client, {
			name: "configuration",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "conf", "config" ],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const guildData = data.guild;

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);

		// Guild prefix
		embed.addField(message.translate("administration/configuration:PREFIX_TITLE"), guildData.prefix);

		// Ignored channels
		embed.addField(message.translate("administration/configuration:IGNORED_CHANNELS_TITLE"),
			(guildData.ignoredChannels.length > 0) ?
				guildData.ignoredChannels.map((ch) => `<#${ch}>`).join(", ")
				:   message.translate("administration/configuration:NO_IGNORED_CHANNELS")
		);
    
		// Autorole plugin
		embed.addField(message.translate("administration/configuration:AUTOROLE_TITLE"), 
			(guildData.plugins.autorole.enabled) ?
				message.translate("administration/configuration:AUTOROLE_CONTENT", {
					roleName: `<@&${guildData.plugins.autorole.role}>`
				})
				:   message.translate("administration/configuration:AUTOROLE_DISABLED")
		);
        
		// Welcome plugin
		embed.addField(message.translate("administration/configuration:WELCOME_TITLE"),
			(guildData.plugins.welcome.enabled) ?
				message.translate("administration/configuration:WELCOME_CONTENT", {
					channel: `<#${guildData.plugins.welcome.channel}>`,
					withImage: guildData.plugins.welcome.withImage ? message.translate("common:YES") : message.translate("common:NO")
				})
				:   message.translate("administration/configuration:WELCOME_DISABLED")
		);
            
		// Goodbye plugin
		embed.addField(message.translate("administration/configuration:GOODBYE_TITLE"),
			(guildData.plugins.goodbye.enabled) ?
				message.translate("administration/configuration:GOODBYE_CONTENT", {
					channel: `<#${guildData.plugins.goodbye.channelID}>`,
					withImage: guildData.plugins.goodbye.withImage ? message.translate("common:YES") : message.translate("common:NO")
				})
				:   message.translate("administration/configuration:GOODBYE_DISABLED")
		);

		// Special channels
		embed.addField(message.translate("administration/configuration:SPECIAL_CHANNELS"),
			message.translate("administration/configuration:MODLOGS", {
				channel:    guildData.plugins.modlogs
					? `<#${guildData.plugins.modlogs}>`
					: message.translate("common:NOT_DEFINED")
			}) + "\n" +
			message.translate("administration/configuration:FORTNITESHOP", {
				channel:    guildData.plugins.fortniteshop
					? `<#${guildData.plugins.fortniteshop}>`
					: message.translate("common:NOT_DEFINED")
			}) + "\n" +
			message.translate("administration/configuration:SUGGESTIONS", {
				channel:    guildData.plugins.suggestions
					? `<#${guildData.plugins.suggestions}>`
					: message.translate("common:NOT_DEFINED")
			}) + "\n" +
			message.translate("administration/configuration:REPORTS", {
				channel:    guildData.plugins.reports
					? `<#${guildData.plugins.reports}>`
					: message.translate("common:NOT_DEFINED")
			})
		);
        
		// Auto sanctions
		embed.addField(message.translate("administration/configuration:AUTO_SANCTIONS"),
			((guildData.plugins.warnsSanctions.kick) ?
				message.translate("administration/configuration:KICK_CONTENT", {
					count: guildData.plugins.warnsSanctions.kick
				})
				:   message.translate("administration/configuration:KICK_NOT_DEFINED")) + "\n" +
			((guildData.plugins.warnsSanctions.ban) ?
				message.translate("administration/configuration:BAN_CONTENT", {
					count: guildData.plugins.warnsSanctions.ban
				})
				:   message.translate("administration/configuration:BAN_NOT_DEFINED"))
		);

		// Automod plugin
		embed.addField(message.translate("administration/configuration:AUTOMOD_TITLE"),
			(guildData.plugins.automod.enabled) ?
				message.translate("administration/configuration:AUTOMOD_CONTENT", {
					channels: guildData.plugins.automod.ignored.map((ch) => `<#${ch}>`)
				})
				:   message.translate("administration/configuration:AUTOMOD_DISABLED")
		);

		// Auto-delete mod commands
		embed.addField(message.translate("administration/configuration:AUTODELETEMOD"),
			(!message.guild.autoDeleteModCommands) ?
				message.translate("administration/configuration:AUTODELETEMOD_ENABLED")
				:   message.translate("administration/configuration:AUTODELETEMOD_DISABLED")
		);

		// Dashboard link
		embed.addField(message.translate("administration/configuration:DASHBOARD_TITLE"), `[${message.translate("administration/configuration:DASHBOARD_CONTENT")}](${this.client.config.supportURL})`);

		message.channel.send(embed);
	}

}

module.exports = Configuration;
