const Command = require("../../base/Command.js"),
	Canvas = require("canvas"),
	Discord = require("discord.js");

class Facepalm extends Command {
	constructor (client) {
		super(client, {
			name: "facepalm",
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
					description: "the user you want to facepalm",
					required: true,
					type: "USER"
				}
			]
		});
	}

	async run (interaction) {

		const user = await interaction.options.getMember("user"),
			m = await interaction.replyT("misc:PLEASE_WAIT", null, {
				prefixEmoji: "loading"
			});

		const canvas = Canvas.createCanvas(632, 357),
			ctx = canvas.getContext("2d");
        
		// Draw background for transparent avatar
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 632, 357);

		// Draw avatar
		const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 512 }));
		ctx.drawImage(avatar, 199, 112, 235, 235);
        
		// Draw layer
		const layer = await Canvas.loadImage("./assets/img/facepalm.png");
		ctx.drawImage(layer, 0, 0, 632, 357);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "facepalm.png");

		m.deleteReply();
		interaction.reply(attachment);

	}

}

module.exports = Facepalm;
