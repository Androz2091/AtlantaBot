const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

class Captcha extends Command {
	constructor (client) {
		super(client, {
			name: "captcha",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "user",
					description: "the user you want to send the captcha",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction) {
        
		const user = await interaction.options.getMember("user")
		const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${user.username}&url=${user.displayAvatarURL({ format: "png", size: 512 })}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, "captcha.png");
			interaction.reply(attachment);
			m.deleteReply();
		} catch(e){
			console.log(e);
			m.error("misc:ERR_OCCURRED", null, {
				edit: true
			});
		}

	}

}

module.exports = Captcha;