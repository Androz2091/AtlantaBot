const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	canvacord = require("canvacord");

class YouTubeComment extends Command {
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
			cooldown: 5000,
			options: [
				{
					name: "user",
					description: "the user that sends the text",
					required: true,
					type: "USER"
				},
				{
					name: "text",
					description: "the text that the user has to send",
					required: true,
					type: "STRING"
				}
			]
		});
	}

	async run (interaction) {

		let user = await interaction.options.getMember("user");
		let text = interaction.options.getString("text");

		if(!text){
			return interaction.error("images/phcomment:MISSING_TEXT"); // same text as phcomment
		}

		const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		const image = await canvacord.Canvas.youtube({
			username: user.username,
			avatar: user.displayAvatarURL({ format: "png" }),
			content: text
		});
		const attachment = new Discord.MessageAttachment(image, "ytb-comment.png");
		m.deleteReply();
		interaction.reply(attachment);

	}

}

module.exports = YouTubeComment;