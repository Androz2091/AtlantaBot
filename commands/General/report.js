const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "report",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {

		const repChannel = message.guild.channels.cache.get(data.guildData.plugins.reports);
		if(!repChannel){
			return message.error("general/report:MISSING_CHANNEL");
		}

		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("general/report:MISSING_USER");
		}

		if(member.id === interaction.user.id){
			return message.error("general/report:INVALID_USER");
		}

		const rep = args.slice(1).join(" ");
		if(!rep){
			return message.error("general/report:MISSING_REASON");
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("general/report:TITLE", {
				user: member.user.tag
			}), interaction.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.addField(translate("common:AUTHOR"), interaction.user.tag, true)
			.addField(translate("common:DATE"), message.printDate(new Date(Date.now())), true)
			.addField(translate("common:REASON"), "**"+rep+"**", true)
			.addField(translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		const success = Discord.Util.parseEmoji(this.client.customEmojis.success).id;
		const error = Discord.Util.parseEmoji(this.client.customEmojis.error).id;
        
		repChannel.send({ embeds: [embed] }).then(async (m) => {
			await m.react(success);
			await m.react(error);
		});

		message.success("general/report:SUCCESS", {
			channel: repChannel.toString()
		});
	}

};
