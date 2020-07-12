const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Fml extends Command {

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

	async run (message, args, data) {

		if (!this.client.config.apiKeys.blagueXYZ)
			return message.error("misc:COMMAND_DISABLED");

		const fml = await this.client.joker.randomVDM(null, data.guild.language.substr(0, 2));

		const embed = new Discord.MessageEmbed()
			.setDescription(fml.content)
			.setFooter(message.translate("fun/fml:FOOTER"))
			.setColor(this.client.config.embed.color);

		message.channel.send(embed);

	}

}

module.exports = Fml;
