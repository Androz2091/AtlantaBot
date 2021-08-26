const Command = require("../../base/Command.js");

class Birthdate extends Command {

	constructor (client) {
		super(client, {
			name: "birthdate",

			options: [
				{
					name: "date",
					type: "STRING"
				}
			],

			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false
		});
	}

	async run (interaction, translate, data) {
        
		const date = interaction.options.getString("date");

		const tArgs = date.split("/");
		const [day, month, year] = tArgs;
		if(!day || !month || !year){
			return interaction.reply({
				content: "economy/birthdate:INVALID_DATE",
				ephemeral: true
			});
		}
        
		// Gets the string of the date
		const match = date.match(/\d+/g);
		if (!match){
			return interaction.reply({
				content: "economy/birthdate:INVALID_DATE_FORMAT",
				ephemeral: true
			});
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
