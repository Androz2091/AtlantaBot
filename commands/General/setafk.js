const Command = require("../../base/Command.js");

class Setafk extends Command {

	constructor (client) {
		super(client, {
			name: "setafk",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "afk" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false
		});
	}

	async run (message, args, data) {

		const reason = args.join(" ");
		if(!reason){
			return message.error("general/setafk:MISSING_REASON");
		}

		// Send success message
		message.success("general/setafk:SUCCESS", {
			reason
		});

		data.userData.afk = reason;
		data.userData.save();

	}

}

module.exports = Setafk;