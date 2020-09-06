const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	md5 = require("md5");

class Lovecalc extends Command {

	constructor (client) {
		super(client, {
			name: "lovecalc",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["lc"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message) {
		const firstMember = message.mentions.members.filter(m => m.id !== message.author.id).first();
		if (!firstMember)
			return message.error("fun/lovecalc:MISSING");
		const secondMember =
			message.mentions.members
				.filter(m => m.id !== firstMember.id)
				.filter(m => m.id !== message.author.id)
				.first() || message.member;
		if (!secondMember)
			return message.error("fun/lovecalc:MISSING");

		const members = [firstMember, secondMember].sort(
			(a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)
		);
		const hash = md5(
			`${members[0].id}${members[1].user.username}${members[0].user.username}${members[1].id}`
		);

		const string = hash
			.split("")
			.filter(e => !isNaN(e))
			.join("");
		const percent = parseInt(string.substr(0, 2), 10);

		const embed = new Discord.MessageEmbed()
			.setAuthor("❤️ LoveCalc")
			.setDescription(
				message.translate("fun/lovecalc:CONTENT", {
					percent,
					firstUsername: firstMember.user.username,
					secondUsername: secondMember.user.username
				})
			)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);

		message.channel.send(embed);
        
	}

}

module.exports = Lovecalc;
