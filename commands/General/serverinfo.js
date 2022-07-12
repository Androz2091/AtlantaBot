const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Serverinfo extends Command {

	constructor (client) {
		super(client, {
			name: "serverinfo",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false
		});
	}

	async run (interaction, data) {
        
		let guild = message.guild;

		await guild.members.fetch();

		const embed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL({ dynamic: true }))
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addField(this.client.customEmojis.title+interaction.translate("common:NAME"), guild.name, true)
			.addField(this.client.customEmojis.calendar+interaction.translate("common:CREATION"), interaction.printDate(guild.createdAt), true)
			.addField(this.client.customEmojis.users+interaction.translate("common:MEMBERS"), interaction.translate("general/serverinfo:MEMBERS", {
				count: guild.members.cache.filter(m => !m.user.bot).size
			})+" | "+interaction.translate("general/serverinfo:BOTS", {
				count: guild.members.cache.filter(m => m.user.bot).size
			}), true)
			.addField(this.client.customEmojis.afk+interaction.translate("general/serverinfo:AFK_CHANNEL"), guild.afkChannel || interaction.translate("general/serverinfo:NO_AFK_CHANNEL"), true)
			.addField(this.client.customEmojis.id+interaction.translate("common:ID"), guild.id, true)
			.addField(this.client.customEmojis.crown+interaction.translate("common:OWNER"), `<@${guild.ownerID}>`, true)
			.addField(this.client.customEmojis.boost+interaction.translate("general/serverinfo:BOOSTS"), guild.premiumSubscriptionCount || 0, true)
			.addField(this.client.customEmojis.channels+interaction.translate("common:CHANNELS"), interaction.translate("general/serverinfo:TEXT_CHANNELS", {
				count: guild.channels.cache.filter(c => c.type === "text").size
			})+" | "+interaction.translate("general/serverinfo:VOICE_CHANNELS", {
				count: guild.channels.cache.filter(c => c.type === "voice").size
			})+" | "+interaction.translate("general/serverinfo:CAT_CHANNELS", {
				count: guild.channels.cache.filter(c => c.type === "category").size
			}), true)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		interaction.reply({ embeds: [embed] });
	}

}

module.exports = Serverinfo;