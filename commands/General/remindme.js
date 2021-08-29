const Command = require("../../base/Command.js"),
	ms = require("ms");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "remindme",
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

		const time = args[0];
		if(!time || isNaN(ms(time))){
			return interaction.reply({
				content: translate("misc:INVALID_TIME"),
				ephemeral: true
			});
		}

		const msg = args.slice(1).join(" ");
		if(!msg){
			return interaction.reply({
				content: translate("general/remindme:MISSING_MESSAGE"),
				ephemeral: true
			});
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
		this.client.databaseCache.usersReminds.set(interaction.user.id, data.userData);

		// Send success message
		interaction.reply({
			content: translate("general/remindme:SAVED")
		});
	}

};
