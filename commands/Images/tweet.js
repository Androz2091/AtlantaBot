const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Tweet extends Command {

	constructor (client) {
		super(client, {
			name: "tweet",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "twitter" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args) {

		const user = message.mentions.users.first() || message.author;
		const text = args.slice(1).join(" ");

		if(!user){
			return message.error("images/tweet:MISSING_USERNAME");
		}

		if(!text){
			return message.error("images/tweet:MISSING_TEXT");
		}

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});

		await message.guild.members.fetch();
		const randomMembers = message.guild.members.cache.random(3);

		const buffer = await this.client.AmeAPI.generate("twitter", {
			url: user.displayAvatarURL(),
			avatar1: randomMembers[0].user.displayAvatarURL(),
			avatar2: randomMembers[1].user.displayAvatarURL(),
			avatar3: randomMembers[2].user.displayAvatarURL(),
			text
		});
		const attachment = new Discord.MessageAttachment(buffer, "twitter.png");
		m.delete();
		message.channel.send(attachment);

	}

}

module.exports = Tweet;