const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "fml",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "vdm" ],
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

		const fml = await this.client.joker.randomVDM(null, data.guild.language.substr(0, 2));

		const embed = new Discord.MessageEmbed()
			.setDescription(fml.content)
			.setFooter(translate("fun/fml:FOOTER"))
			.setColor(this.client.config.embed.color);

		message.channel.send({ embeds: [embed] });

	}

};


