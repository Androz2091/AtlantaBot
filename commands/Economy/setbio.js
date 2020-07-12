const Command = require("../../base/Command.js");

class Setbio extends Command {

	constructor (client) {
		super(client, {
			name: "setbio",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "biography", "setdesc" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {
		const newBio = args.join(" ");
		if(!newBio){
			return message.error("economy/setbio:MISSING");
		}
		if(newBio.length > 100){
			return message.error("economy/setbio:MAX_CHARACT");
		}
		data.userData.bio = newBio;
		message.success("economy/setbio:SUCCESS");
		await data.userData.save();
	}

}

module.exports = Setbio;