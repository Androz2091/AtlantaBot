const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "userinfo",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {
        
		let displayPresence = true;

		const isID = !isNaN(args[0]);

		var user;
		if(!args[0]){
			user = interaction.user;
		}
		if(message.mentions.users.first()){
			user = message.mentions.users.first();
		}
		if(isID && !user){
			user = this.client.users.cache.get(args[0]);
			if(!user){
				user = await this.client.users.fetch(args[0], true).catch(() => {});
				displayPresence = false;
			}
		}
        
		if(!user){
			return message.error("general/userinfo:INVALID_USER");
		}

		let member = null;
		if(message.guild){
			member = await message.guild.members.fetch(user).catch(() => {});
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.addField(":man: "+translate("common:USERNAME"), user.username, true)
			.addField(this.client.customEmojis.discriminator+" "+translate("common:DISCRIMINATOR"), user.discriminator, true)
			.addField(this.client.customEmojis.bot+" "+translate("common:ROBOT"), (user.bot ? translate("common:YES") : translate("common:NO")), true)
			.addField(this.client.customEmojis.calendar+" "+translate("common:CREATION"), message.printDate(user.createdAt), true)
			.addField(this.client.customEmojis.avatar+" "+translate("common:AVATAR"), user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		if(displayPresence){
			embed.addField(this.client.customEmojis.games+" "+translate("common:GAME"), (user.presence.activity ? user.presence.activity.name : translate("general/userinfo:NO_GAME")), true)
				.addField(this.client.customEmojis.status.online+" "+translate("common:STATUS"), translate("common:STATUS_"+(user.presence.status.toUpperCase())), true);
		}
            
		if(member){
			embed.addField(this.client.customEmojis.up+" "+translate("common:ROLE"), (member.roles.highest ? member.roles.highest : translate("general/userinfo:NO_ROLE")), true)
				.addField(this.client.customEmojis.calendar2+" "+translate("common:JOIN"), message.printDate(member.joinedAt),true)
				.addField(this.client.customEmojis.color+" "+translate("common:COLOR"), member.displayHexColor, true)
				.addField(this.client.customEmojis.pencil+" "+translate("common:NICKNAME"), (member.nickname ? member.nickname : translate("general/userinfo:NO_NICKNAME")), true)
				.addField(this.client.customEmojis.roles+" "+translate("common:ROLES"), (
					member.roles.size > 10
						? member.roles.cache.map((r) => r).slice(0, 9).join(", ")+" "+translate("general/userinfo:MORE_ROLES", { count: member.roles.cache.size - 10 })
						: (member.roles.cache.size < 1) ? translate("general/userinfo:NO_ROLE") : member.roles.cache.map((r) => r).join(", ")
				));
		}

		if(user.bot && this.client.config.apiKeys.dbl && (this.client.config.apiKeys.dbl !== "")){
			const res = await fetch("https://discordbots.org/api/bots/"+user.id, {
				headers: { "Authorization": this.client.config.apiKeys.dbl }
			});
			const data = await res.json();
			if(!data.error){
				embed.addField(this.client.customEmojis.desc+" "+translate("common:DESCRIPTION"), data.shortdesc, true)
					.addField(this.client.customEmojis.stats+" "+translate("common:STATS"), translate("general/userinfo:BOT_STATS", {
						votes: data.monthlyPoints || 0,
						servers: data.server_count || 0,
						shards: (data.shards || [0]).length,
						lib: data.lib || "unknown"
					}), true)
					.addField(this.client.customEmojis.link+" "+translate("common:LINKS"), 
						`${data.support ? `[${translate("common:SUPPORT")}](${data.support}) | ` : ""}${data.invite ?  `[${translate("common:INVITE")}](${data.invite}) | ` : ""}${data.github ?  `[GitHub](${data.github}) | ` : ""}${data.website ?  `[${translate("common:WEBSITE")}](${data.website})` : ""}`
						, true);
			}
		}

		message.channel.send({ embeds: [embed] });
	}

};
