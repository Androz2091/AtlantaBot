const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

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

	async run (interaction, translate, data) {

		const guildData = data.guild;

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);

		// Guild prefix
		embed.addField(translate("administration/configuration:PREFIX_TITLE"), guildData.prefix);

		// Ignored channels
		embed.addField(translate("administration/configuration:IGNORED_CHANNELS_TITLE"),
			(guildData.ignoredChannels.length > 0) ?
				guildData.ignoredChannels.map((ch) => `<#${ch}>`).join(", ")
				:   translate("administration/configuration:NO_IGNORED_CHANNELS")
		);
    
		// Autorole plugin
		embed.addField(translate("administration/configuration:AUTOROLE_TITLE"), 
			(guildData.plugins.autorole.enabled) ?
				translate("administration/configuration:AUTOROLE_CONTENT", {
					roleName: `<@&${guildData.plugins.autorole.role}>`
				})
				:   translate("administration/configuration:AUTOROLE_DISABLED")
		);
        
		// Welcome plugin
		embed.addField(translate("administration/configuration:WELCOME_TITLE"),
			(guildData.plugins.welcome.enabled) ?
				translate("administration/configuration:WELCOME_CONTENT", {
					channel: `<#${guildData.plugins.welcome.channel}>`,
					withImage: guildData.plugins.welcome.withImage ? translate("common:YES") : translate("common:NO")
				})
				:   translate("administration/configuration:WELCOME_DISABLED")
		);
            
		// Goodbye plugin
		embed.addField(translate("administration/configuration:GOODBYE_TITLE"),
			(guildData.plugins.goodbye.enabled) ?
				translate("administration/configuration:GOODBYE_CONTENT", {
					channel: `<#${guildData.plugins.goodbye.channelID}>`,
					withImage: guildData.plugins.goodbye.withImage ? translate("common:YES") : translate("common:NO")
				})
				:   translate("administration/configuration:GOODBYE_DISABLED")
		);

		// Special channels
		embed.addField(translate("administration/configuration:SPECIAL_CHANNELS"),
			translate("administration/configuration:MODLOGS", {
				channel:    guildData.plugins.modlogs
					? `<#${guildData.plugins.modlogs}>`
					: translate("common:NOT_DEFINED")
			}) + "\n" +
			translate("administration/configuration:FORTNITESHOP", {
				channel:    guildData.plugins.fortniteshop
					? `<#${guildData.plugins.fortniteshop}>`
					: translate("common:NOT_DEFINED")
			}) + "\n" +
			translate("administration/configuration:SUGGESTIONS", {
				channel:    guildData.plugins.suggestions
					? `<#${guildData.plugins.suggestions}>`
					: translate("common:NOT_DEFINED")
			}) + "\n" +
			translate("administration/configuration:REPORTS", {
				channel:    guildData.plugins.reports
					? `<#${guildData.plugins.reports}>`
					: translate("common:NOT_DEFINED")
			})
		);
        
		// Auto sanctions
		embed.addField(translate("administration/configuration:AUTO_SANCTIONS"),
			((guildData.plugins.warnsSanctions.kick) ?
				translate("administration/configuration:KICK_CONTENT", {
					count: guildData.plugins.warnsSanctions.kick
				})
				:   translate("administration/configuration:KICK_NOT_DEFINED")) + "\n" +
			((guildData.plugins.warnsSanctions.ban) ?
				translate("administration/configuration:BAN_CONTENT", {
					count: guildData.plugins.warnsSanctions.ban
				})
				:   translate("administration/configuration:BAN_NOT_DEFINED"))
		);

		// Automod plugin
		embed.addField(translate("administration/configuration:AUTOMOD_TITLE"),
			(guildData.plugins.automod.enabled) ?
				translate("administration/configuration:AUTOMOD_CONTENT", {
					channels: guildData.plugins.automod.ignored.map((ch) => `<#${ch}>`)
				})
				:   translate("administration/configuration:AUTOMOD_DISABLED")
		);

		// Auto-delete mod commands
		embed.addField(translate("administration/configuration:AUTODELETEMOD"),
			(!message.guild.autoDeleteModCommands) ?
				translate("administration/configuration:AUTODELETEMOD_ENABLED")
				:   translate("administration/configuration:AUTODELETEMOD_DISABLED")
		);

		// Dashboard link
		embed.addField(translate("administration/configuration:DASHBOARD_TITLE"), `[${translate("administration/configuration:DASHBOARD_CONTENT")}](${this.client.config.supportURL})`);

		message.channel.send({ embeds: [embed] });
	}

};
