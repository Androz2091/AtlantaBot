const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "quote",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {

		function embed(m){
			const embed = new Discord.MessageEmbed()
				.setAuthor(m.author.tag, m.author.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
				.setDescription(m.content)
				.setColor(m.member ? m.member.roles.highest ? m.member.roles.highest.color : data.config.embed.color : data.config.embed.color)
				.setFooter(m.guild.name+" | #"+m.channel.name)
				.setTimestamp(m.createdTimestamp);
			if(m.attachments.size > 0){
				embed.setImage(m.attachments.first().url);
			}
			return embed;
		}
        
		const msgID = args[0];
		if(isNaN(msgID)){
			interaction.user.send(translate("general/quote:MISSING_ID")).then(() => {
				message.delete();
			}).catch(() => {
				interaction.reply({
					content: translate("misc:CANNOT_DM"),
					ephemeral: true
				});
			});
			return;
		}

		let channel = message.mentions.channels.first();
		if(args[1] && !channel){
			channel = this.client.channels.cache.get(args[1]);
			if(!channel){
				interaction.user.send(translate("general/quote:NO_MESSAGE_ID")).then(() => {
					message.delete();
				}).catch(() => {
					interaction.reply({
						content: translate("misc:CANNOT_DM"),
						ephemeral: true
					});
				});
				return;
			}
		}

		if(!channel){
			message.channel.messages.fetch(msgID).catch(() => {
				interaction.user.send((translate("general/quote:NO_MESSAGE_ID"))).then(() => {
					message.delete();
				}).catch(() => {
					interaction.reply({
						content: translate("misc:CANNOT_DM"),
						ephemeral: true
					});
				});
				return;
			}).then((msg) => {
				message.delete();
				message.channel.send({ embeds: [embed(msg)] });
			});
		} else {
			channel.messages.fetch(msgID).catch(() => {
				interaction.user.send(translate("general/quote:NO_MESSAGE_ID")).then(() => {
					message.delete();
				}).catch(() => {
					interaction.reply({
						content: translate("misc:CANNOT_DM"),
						ephemeral: true
					});
				});
				return;
			}).then((msg) => {
				message.delete();
				message.channel.send({ embeds: [embed(msg)] });
			});
		}
	}

};
