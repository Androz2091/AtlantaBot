const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "serverinfo",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "si" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false
		});
	}

	async run (interaction, translate, data) {
        
		let guild = message.guild;

		if(args[0]){
			let found = this.client.guilds.cache.get(args[0]);
			if(!found){
				found = this.client.guilds.cache.find((g) => g.name === args.join(" "));
				if(found){
					guild = found;
				}
			}
		}

		await guild.members.fetch();

		const embed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL({ dynamic: true }))
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addField(this.client.customEmojis.title+translate("common:NAME"), guild.name, true)
			.addField(this.client.customEmojis.calendar+translate("common:CREATION"), message.printDate(guild.createdAt), true)
			.addField(this.client.customEmojis.users+translate("common:MEMBERS"), translate("general/serverinfo:MEMBERS", {
				count: guild.members.cache.filter(m => !m.user.bot).size
			})+" | "+translate("general/serverinfo:BOTS", {
				count: guild.members.cache.filter(m => m.user.bot).size
			}), true)
			.addField(this.client.customEmojis.afk+translate("general/serverinfo:AFK_CHANNEL"), guild.afkChannel || translate("general/serverinfo:NO_AFK_CHANNEL"), true)
			.addField(this.client.customEmojis.id+translate("common:ID"), guild.id, true)
			.addField(this.client.customEmojis.crown+translate("common:OWNER"), `<@${guild.ownerID}>`, true)
			.addField(this.client.customEmojis.boost+translate("general/serverinfo:BOOSTS"), guild.premiumSubscriptionCount || 0, true)
			.addField(this.client.customEmojis.channels+translate("common:CHANNELS"), translate("general/serverinfo:TEXT_CHANNELS", {
				count: guild.channels.cache.filter(c => c.type === "text").size
			})+" | "+translate("general/serverinfo:VOICE_CHANNELS", {
				count: guild.channels.cache.filter(c => c.type === "voice").size
			})+" | "+translate("general/serverinfo:CAT_CHANNELS", {
				count: guild.channels.cache.filter(c => c.type === "category").size
			}), true)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		message.channel.send({ embeds: [embed] });
	}

};
