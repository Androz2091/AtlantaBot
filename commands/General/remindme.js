const Command = require("../../base/Command.js"),
	ms = require("ms");

class Remindme extends Command {

	constructor (client) {
		super(client, {
			name: "remindme",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "reminder" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false
		});
	}

	async run (message, args, data) {

		const time = args[0];
		if(!time || isNaN(ms(time))){
			return message.error("misc:INVALID_TIME");
		}

		const msg = args.slice(1).join(" ");
		if(!msg){
			return message.error("general/remindme:MISSING_MESSAGE");
		}
        
		const rData = {
			message: msg,
			createdAt: Date.now(),
			sendAt: Date.now()+ms(time)
		};

		if(!data.userData.reminds){
			data.userData.reminds = [];
		}
        
		data.userData.reminds.push(rData);
		data.userData.markModified("reminds");
		data.userData.save();
		this.client.databaseCache.usersReminds.set(message.author.id, data.userData);

		// Send success message
		message.success("general/remindme:SAVED");
	}

}

module.exports = Remindme;