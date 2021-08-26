const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "someone",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "somebody", "something" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 500
		});
	}

	async run (interaction, translate, data) {
        
		const member = message.guild.members.cache.random(1)[0];
        
		const embed = new Discord.MessageEmbed()
			.addField(translate("common:USERNAME"), member.user.username, true)
			.addField(translate("common:DISCRIMINATOR"), member.user.discriminator, true)
			.addField(translate("common:ID"), member.user.id, true)
			.setThumbnail(member.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color);
		message.channel.send({ embeds: [embed] });
        
	}

};
