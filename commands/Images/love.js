const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

class Love extends Command {
	constructor (client) {
		super(client, {
			name: "love",
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
					name: "firstuser",
					description: "the first user of your love story",
					required: true,
					type: "USER"
				},
				{
					name: "seconduser",
					description: "the second user of your love story",
					required: true,
					type: "USER"
				}
			]
		});
	}

	async run (interaction) {
        
		const users = [
			await interaction.options.getMember("firstuser"),
			await interaction.options.getMember("seconduser")
		];

		const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${users[0].displayAvatarURL({ format: "png", size: 512 })}&user2=${users[1].displayAvatarURL({ format: "png", size: 512 })}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, "love.png");
			interaction.reply(attachment);
			m.deleteReply();
		} catch(e){
			console.log(e);
			m.error("misc:ERROR_OCCURRED", null, {
				edit: true
			});
		}

	}

}

module.exports = Love;