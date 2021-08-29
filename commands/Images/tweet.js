const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "tweet",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate) {

		const user = message.mentions.users.first() || interaction.user;
		const text = args.slice(1).join(" ");

		if(!user){
			return interaction.reply({
				content: translate("images/tweet:MISSING_USERNAME"),
				ephemeral: true
			});
		}

		if(!text){
			return interaction.reply({
				content: translate("images/tweet:MISSING_TEXT"),
				ephemeral: true
			});
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

};
