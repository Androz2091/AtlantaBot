const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Suggest extends Command {

	constructor (client) {
		super(client, {
			name: "suggest",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "suggestion",
					description: "Your suggestion",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {

		const suggChannel = interaction.guild.channels.cache.get(data.guild.plugins.suggestions);
		if(!suggChannel){
			return interaction.error("general/suggest:MISSING_CHANNEL");
		}

		const sugg = interaction.options.getString("suggestion")
		if(!sugg){
			return interaction.error("general/suggest:MISSING_CONTENT");
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("general/suggest:TITLE", {
				user: interaction.member.user.username
			}), interaction.member.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.addField(interaction.translate("common:AUTHOR"), `\`${interaction.member.user.username}#${interaction.member.user.discriminator}\``, true)
			.addField(interaction.translate("common:DATE"), interaction.printDate(new Date(Date.now())), true)
			.addField(interaction.translate("common:CONTENT"), "**"+sugg+"**")
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		const success = Discord.Util.parseEmoji(this.client.customEmojis.success).id;
		const error = Discord.Util.parseEmoji(this.client.customEmojis.error).id;
        
		suggChannel.send({ embeds: [embed] }).then(async (m) => {
			await m.react(success);
			await m.react(error);
		});

		interaction.success("general/suggest:SUCCESS", {
			channel: suggChannel.toString()
		});
	}

}

module.exports = Suggest;