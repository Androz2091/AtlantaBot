const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "suggest",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "suggestion", "sugg" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {

		const suggChannel = message.guild.channels.cache.get(data.guild.plugins.suggestions);
		if(!suggChannel){
			return message.error("general/suggest:MISSING_CHANNEL");
		}

		const sugg = args.join(" ");
		if(!sugg){
			return message.error("general/suggest:MISSING_CONTENT");
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("general/suggest:TITLE", {
				user: interaction.user.username
			}), interaction.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.addField(translate("common:AUTHOR"), `\`${interaction.user.username}#${interaction.user.discriminator}\``, true)
			.addField(translate("common:DATE"), message.printDate(new Date(Date.now())), true)
			.addField(translate("common:CONTENT"), "**"+sugg+"**")
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		const success = Discord.Util.parseEmoji(this.client.customEmojis.success).id;
		const error = Discord.Util.parseEmoji(this.client.customEmojis.error).id;
        
		suggChannel.send({ embeds: [embed] }).then(async (m) => {
			await m.react(success);
			await m.react(error);
		});

		message.success("general/suggest:SUCCESS", {
			channel: suggChannel.toString()
		});
	}

};

