const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	canvacord = require("canvacord");

module.exports = class extends Command {
	constructor (client) {
		super(client, {
			name: "phcomment",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate) {

		let user = await this.client.resolveUser(args[0]);
		let text = args.join(" ");

		if(user){
			text = args.slice(1).join(" ");
		} else {
			user = interaction.user;
		}

		if(!text){
			return interaction.reply({
				content: translate("images/phcomment:MISSING_TEXT"),
				ephemeral: true
			});
		}

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		try {
			const buffer = await canvacord.Canvas.phub({
				username: user.username,
				image: user.displayAvatarURL({ format: "png" }),
				message: text
			});
			const attachment = new Discord.MessageAttachment(buffer, "phcomment.png");
			message.channel.send(attachment);
			m.delete();
		} catch(e){
			console.log(e);
			m.error("misc:ERROR_OCCURRED", null, {
				edit: true
			});
		}

	}

};
