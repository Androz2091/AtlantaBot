const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "servers-list",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "slist" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: true,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {
        
		await message.delete();

		let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description = 
        `${translate("common:SERVERS")}: ${this.client.guilds.cache.size}\n\n`+
		this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${translate("common:MEMBERS").toLowerCase()}`)
			.slice(0, 10)
			.join("\n");

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color)
			.setFooter(this.client.user.username)
			.setTitle(`${translate("common:PAGE")}: ${page}/${Math.ceil(this.client.guilds.cache.size/10)}`)
			.setDescription(description);

		const msg = await message.channel.send({ embeds: [embed] });
        
		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === interaction.user.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				// Updates variables
				i0 = i0-10;
				i1 = i1-10;
				page = page-1;
                
				// if there is no guild to display, delete the message
				if(i0 < 0){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}
                
				description = `${translate("common:SERVERS")}: ${this.client.guilds.cache.size}\n\n`+
				this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${translate("common:MEMBERS")}`)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`${translate("common:PAGE")}: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit({ embeds: [embed]});
            
			}

			if(reaction._emoji.name === "➡"){

				// Updates variables
				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				// if there is no guild to display, delete the message
				if(i1 > this.client.guilds.cache.size + 10){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `${translate("common:SERVERS")}: ${this.client.guilds.cache.size}\n\n`+
				this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${translate("common:MEMBERS").toLowerCase()}`)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`${translate("common:PAGE")}: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit({ embeds: [embed] });

			}

			if(reaction._emoji.name === "❌"){
				return msg.delete(); 
			}

			// Remove the reaction when the user react to the message
			await reaction.users.remove(interaction.user.id);

		});
	}

};
