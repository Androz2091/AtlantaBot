const Command = require("../../base/Command.js"),
	ms = require("ms");

class Remindme extends Command {

	constructor (client) {
		super(client, {
			name: "remindme",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			options: [
				{
					name: "time",
					description: "the amount of time when the bot will remind you",
					type: "NUMBER",
					required: true
				},
				{
					name: "message",
					description: "the message you want the bot remind you",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {

		const time = interaction.options.getNumber("time")
		if(isNaN(ms(time))){
			return interaction.error("misc:INVALID_TIME");
		}

		const msg = interaction.options.getString("message")
        
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
		this.client.database.usersReminds.set(interaction.member.user.id, data.userData);

		// Send success message
		interaction.success("general/remindme:SAVED");
	}

}

module.exports = Remindme;