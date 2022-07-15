const Command = require("../../base/Command.js");

class Divorce extends Command {

	constructor (client) {
		super(client, {
			name: "divorce",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, data) {
        
		// Check if the message author is wedded
		if(!data.userData.lover){
			return interaction.error("economy/divorce:NOT_MARRIED");
		}

		// Updates db
        
		const user = this.client.users.cache.get(data.userData.lover) || await this.client.users.fetch(data.userData.lover);
        
		data.userData.lover = null;
		data.userData.save();

		const oldLover = await this.client.database.findOrCreateUser({ id:user.id });
		oldLover.lover = null;
		oldLover.save();

		// Send success message 
		interaction.success("economy/divorce:SUCCESS", {
			username: user.username
		});

	}

}

module.exports = Divorce;