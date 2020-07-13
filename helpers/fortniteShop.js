const Canvas = require("discord-canvas"),
	CronJob = require("cron").CronJob,
	Discord = require("discord.js");

async function init(client) {
    
	new CronJob("0 3 12 * * *", async function() {
		if(!client.config.apiKeys.fortniteFNBR || client.config.apiKeys.fortniteFNBR === "") return;
		client.guilds.cache.forEach(async (guild) => {
			const guildData = await client.findOrCreateGuild({ id: guild.id });
			if(guildData.plugins.fortniteshop) {
				const fnChannel = client.channels.cache.get(guildData.plugins.fortniteshop);
				if(fnChannel) {
					const momentName = client.config.languages.find((language) => language.name === guildData.language || language.aliases.includes(guildData.language)).moment;
					const image = await new Canvas.FortniteShop()
						.setToken(client.config.apiKeys.fortniteFNBR)
						.setText("header", client.translate("general/fortniteshop:HEADER").replace("{{date}}", "{date}"), null, guildData.language)
						.setText("daily", client.translate("general/fortniteshop:DAILY"), null, guildData.language)
						.setText("featured", client.translate("general/fortniteshop:FEATURED"), null, guildData.language)
						.setText("date", client.translate("general/fortniteshop:DATE", {
							skipInterpolation: true
						}, null, guildData.language).replace("{{date}}", "{date}"))
						.setText("footer", client.translate("general/fortniteshop:FOOTER"), null, guildData.language)
						.lang(momentName)
						.toAttachment();
					const attachment = new Discord.MessageAttachment(image, "shop.png");
					const embed = new Discord.MessageEmbed()
						.setAuthor(client.translate("general/fortniteshop:DATE", {
							date: client.printDate(new Date(Date.now()), null, guildData.language)
						}, guildData.language), client.user.displayAvatarURL())
						.attachFiles(attachment)
						.setImage("attachment://shop.png")
						.setColor(client.config.embed.color)
						.setFooter(client.config.embed.footer);
					const msg = await fnChannel.send(embed);
					await msg.react("😍");
					await msg.react("😐");
					await msg.react("😭");
				}
			}
		});
	}, null, true, "Europe/Paris");
}

module.exports = { init };
