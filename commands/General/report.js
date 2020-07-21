const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Report extends Command {

	constructor (client) {
		super(client, {
			name: "report",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {

		const repChannel = message.guild.channels.cache.get(data.guild.plugins.reports);
		if(!repChannel){
			return message.error("general/report:MISSING_CHANNEL");
		}

		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("general/report:MISSING_USER");
		}

		if(member.id === message.author.id){
			return message.error("general/report:INVALID_USER");
		}

		const rep = args.slice(1).join(" ");
		if(!rep){
			return message.error("general/report:MISSING_REASON");
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.translate("general/report:TITLE", {
				user: member.user.tag
			}), message.author.displayAvatarURL())
			.addField(message.translate("common:AUTHOR"), message.author.tag, true)
			.addField(message.translate("common:DATE"), message.printDate(new Date(Date.now())), true)
			.addField(message.translate("common:REASON"), "**"+rep+"**", true)
			.addField(message.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		const success = Discord.Util.parseEmoji(this.client.customEmojis.success).id;
		const error = Discord.Util.parseEmoji(this.client.customEmojis.error).id;
        
		repChannel.send(embed).then(async (m) => {
			await m.react(success);
			await m.react(error);
		});

		message.success("general/report:SUCCESS", {
			channel: repChannel.toString()
		});
	}

}

module.exports = Report;
