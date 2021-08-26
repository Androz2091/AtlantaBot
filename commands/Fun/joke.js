const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "joke",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "blague" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		if (!this.client.config.apiKeys.blagueXYZ)
			return interaction.reply({
				content: translate("misc:COMMAND_DISABLED"),
				ephemeral: true
			});

		const joke = await this.client.joker.randomJoke(
			data.guild.language.substr(0, 2)
		);

		const embed = new Discord.MessageEmbed()
			.setDescription(joke.toDiscordSpoils())
			.setFooter(translate("fun/joke:FOOTER"))
			.setColor(this.client.config.embed.color);

		message.channel.send({ embeds: [embed] });

	}

};

