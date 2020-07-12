const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch");

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

		const user = args[0];
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

		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, "tweet.png");
			message.channel.send(message.translate("images/tweet:SUCCESS", {
				user
			}), attachment);
			m.delete();
		} catch(e){
			console.log(e);
			m.error("misc:ERROR_OCCURRED", null, false, false, true);
		}

	}

}

module.exports = Tweet;