const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	math = require("mathjs");

class Calc extends Command {
	constructor (client) {
		super(client, {
			name: "calc",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}
 
	async run (message, args, data) {

		if(!args[0]) {
			return message.error("general/calc:MISSING_CALC");
		}

		let result;
		try {
			result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
		} catch (e) {
			return message.error("general/calc:INVALID_CALC");
		}

		const embed = new Discord.MessageEmbed()
			.setColor(data.config.embed.color)
			.setAuthor(message.translate("general/calc:TITLE"), this.client.user.displayAvatarURL())
			.addField(message.translate("general/calc:CALCULATION"), `\`\`\`js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
			.addField(message.translate("general/calc:RESULT"), `\`\`\`js\n${result}\`\`\``)
			.setFooter(data.config.embed.footer);
		message.channel.send(embed);

	}
}

module.exports = Calc;
