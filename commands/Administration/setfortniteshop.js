const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	Canvas = require("discord-canvas");

class Setfortniteshop extends Command {

	constructor(client) {
		super(client, {
			name: "setfortniteshop",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["setfnshop"],
			memberPermissions: ["MANAGE_GUILD"],
			botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run(message, args, data) {

		if (!data.config.apiKeys.fortniteFNBR || data.config.apiKeys.fortniteFNBR.length === "") {
			return message.error("misc:COMMAND_DISABLED");
		}

		if (data.guild.plugins.fortniteshop && !message.mentions.channels.first() || message.mentions.channels.first() && data.guild.plugins.fortniteshop === message.mentions.channels.first().id) {
			data.guild.plugins.fortniteshop = false;
			data.guild.markModified("plugins.fortniteshop");
			data.guild.save();
			return message.success("administration/setfortniteshop:DISABLED");
		}

		const channel = message.mentions.channels.first() || message.channel;
		data.guild.plugins.fortniteshop = channel.id;
		data.guild.markModified("plugins.fortniteshop");
		data.guild.save();

		message.success("administration/setfortniteshop:ENABLED", {
			channel: channel.toString()
		});

		const momentName = data.config.languages.find((language) => language.name === data.guild.language || language.aliases.includes(data.guild.language)).moment;
		const shop = new Canvas.FortniteShop();
		const image = await shop
			.setToken(data.config.apiKeys.fortniteFNBR)
			.setText("header", message.translate("general/fortniteshop:HEADER"))
			.setText("daily", message.translate("general/fortniteshop:DAILY"))
			.setText("featured", message.translate("general/fortniteshop:FEATURED"))
			.setText("date", message.translate("general/fortniteshop:DATE", {
				skipInterpolation: true
			}).replace("{{date}}", "{date}"))
			.setText("footer", message.translate("general/fortniteshop:FOOTER"))
			.lang(momentName)
			.toAttachment();
		const attachment = new Discord.MessageAttachment(image, "shop.png");

		const embed = new Discord.MessageEmbed()
			.setAuthor(this.client.translate("general/fortniteshop:DATE", {
				date: this.client.printDate(new Date(Date.now()), null, message.guild.data.language)
			}, message.guild.data.language), this.client.user.displayAvatarURL())
			.attachFiles(attachment)
			.setImage("attachment://shop.png")
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);
		const msg = await channel.send(embed);
		await msg.react("😍");
		await msg.react("😐");
		await msg.react("😭");

	}

}

module.exports = Setfortniteshop;