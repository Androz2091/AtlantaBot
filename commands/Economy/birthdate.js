const Command = require("../../base/Command.js");

class Birthdate extends Command {

	constructor (client) {
		super(client, {
			name: "birthdate",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "anniversaire" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message, args, data) {
        
		const date = args[0];
		if(!date){
			return message.error("economy/birthdate:MISSING_DATE");
		}

		const tArgs = date.split("/");
		const [day, month, year] = tArgs;
		if(!day || !month || !year){
			return message.error("economy/birthdate:INVALID_DATE");
		}
        
		// Gets the string of the date
		const match = date.match(/\d+/g);
		if (!match){
			return message.error("economy/birthdate:INVALID_DATE_FORMAT");
		}
		const tday = +match[0], tmonth = +match[1] - 1;
		let tyear = +match[2];
		if (tyear < 100){
			tyear += tyear < 50 ? 2000 : 1900;
		}
		const d = new Date(tyear, tmonth, tday);
		if(!(tday == d.getDate() && tmonth == d.getMonth() && tyear == d.getFullYear())){
			return message.error("economy/birthdate:INVALID_DATE_FORMAT");
		}
		if(d.getTime() > Date.now()){
			return message.error("economy/birthdate:DATE_TOO_HIGH");
		}
		if(d.getTime() < (Date.now()-2.523e+12)){
			return message.error("economy/birthdate:DATE_TOO_LOW");
		}

		data.userData.birthdate = d;
		data.userData.save();
        
		message.success("economy/birthdate:SUCCESS", {
			date: message.printDate(d)
		});

	}

}

module.exports = Birthdate;
