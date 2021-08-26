const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	canvacord = require("canvacord");

module.exports = class extends Command {
	constructor (client) {
		super(client, {
			name: "youtube-comment",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
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
			}); // same text as phcomment
		}

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const image = await canvacord.Canvas.youtube({
			username: user.username,
			avatar: user.displayAvatarURL({ format: "png" }),
			content: text
		});
		const attachment = new Discord.MessageAttachment(image, "ytb-comment.png");
		m.delete();
		message.channel.send(attachment);

	}

};

