const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	Canvas = require("discord-canvas");

module.exports = class extends Command {

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

	async run(interaction, translate, data) {

		if (!data.config.apiKeys.fortniteFNBR || data.config.apiKeys.fortniteFNBR.length === "") {
			return interaction.reply({
				content: translate("misc:COMMAND_DISABLED"),
				ephemeral: true
			});
		}

		if (data.guildData.plugins.fortniteshop && !message.mentions.channels.first() || message.mentions.channels.first() && data.guildData.plugins.fortniteshop === message.mentions.channels.first().id) {
			data.guildData.plugins.fortniteshop = false;
			data.guildData.markModified("plugins.fortniteshop");
			data.guildData.save();
			return interaction.reply({
				content: translate("administration/setfortniteshop:DISABLED")
			});
		}

		const channel = message.mentions.channels.first() || message.channel;
		data.guildData.plugins.fortniteshop = channel.id;
		data.guildData.markModified("plugins.fortniteshop");
		data.guildData.save();

		message.success("administration/setfortniteshop:ENABLED", {
			channel: channel.toString()
		});

		const momentName = this.client.languages.find((language) => language.name === data.guildData.language || language.aliases.includes(data.guildData.language)).moment;
		const shop = new Canvas.FortniteShop();
		const image = await shop
			.setToken(data.config.apiKeys.fortniteFNBR)
			.setText("header", translate("general/fortniteshop:HEADER"))
			.setText("daily", translate("general/fortniteshop:DAILY"))
			.setText("featured", translate("general/fortniteshop:FEATURED"))
			.setText("date", translate("general/fortniteshop:DATE", {
				skipInterpolation: true
			}).replace("{{date}}", "{date}"))
			.setText("footer", translate("general/fortniteshop:FOOTER"))
			.lang(momentName)
			.toAttachment();
		const attachment = new Discord.MessageAttachment(image, "shop.png");

		const embed = new Discord.MessageEmbed()
			.setAuthor(this.client.translate("general/fortniteshop:DATE", {
				date: this.client.printDate(new Date(Date.now()), null, message.guild.data.language)
			}, message.guild.data.language), this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))  
			.attachFiles(attachment)
			.setImage("attachment://shop.png")
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);
		const msg = await channel.send({ embeds: [embed] });
		await msg.react("😍");
		await msg.react("😐");
		await msg.react("😭");

	}

};
