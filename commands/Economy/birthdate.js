const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "birthdate",

			options: [
				{
					name: "date",
					type: "STRING",
					required: true
				}
			],

			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, { userData, guildData }) {
        
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
			return interaction.reply({
				content: translate("economy/birthdate:INVALID_DATE_FORMAT"),
				ephemeral: true
			});
		}
		if(d.getTime() > Date.now()){
			return interaction.reply({
				content: translate("economy/birthdate:DATE_TOO_HIGH"),
				ephemeral: true
			});
		}
		if(d.getTime() < (Date.now()-2.523e+12)){
			return interaction.reply({
				content: translate("economy/birthdate:DATE_TOO_LOW"),
				ephemeral: true
			});
		}

		userData.birthdate = d;
		userData.save();
        
		interaction.reply({
			content: translate("economy/birthdate:SUCCESS", {
				date: this.client.printDate(d, null, guildData.language)
			})
		});

	}

};
