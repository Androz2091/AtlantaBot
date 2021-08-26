const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

module.exports = class extends Command {
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
			cooldown: 5000
		});
	}

	async run (interaction, translate) {
        
		const users = [
			await this.client.resolveUser(args[0]) || interaction.user,
			await this.client.resolveUser(args[1]) || interaction.user
		];

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${users[0].displayAvatarURL({ format: "png", size: 512 })}&user2=${users[1].displayAvatarURL({ format: "png", size: 512 })}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, "love.png");
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

