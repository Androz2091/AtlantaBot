const Command = require("../../base/Command.js"),
	ms = require("ms"),
	checkReminds = require("./../../helpers/checkReminds");

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

		// Send success message
		message.success("general/remindme:SAVED");

		setTimeout(() => {
			checkReminds.sendRemind(this.client, data.userData, message.author, rData);
		}, rData.sendAt - Date.now());
	}

}

module.exports = Remindme;