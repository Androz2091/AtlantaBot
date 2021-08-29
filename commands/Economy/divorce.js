const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "divorce",
			
			enabled: true,
			guildOnly: false,
			
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			
			dirname: __dirname
		});
	}

	async run (interaction, translate, { userData }) {
        
		// Check if the message author is wedded
		if(!userData.lover){
			return interaction.reply({
				content: translate("economy/divorce:NOT_MARRIED"),
				ephemeral: true
			});
		}

		// Updates db
		const user = this.client.users.cache.get(userData.lover) || await this.client.users.fetch(userData.lover);
        
		userData.lover = null;
		userData.save();

		const oldLover = await this.client.findOrCreateUser({ id:user.id });
		oldLover.lover = null;
		oldLover.save();

		// Send success message 
		interaction.reply({
			content: translate("economy/divorce:SUCCESS", {
				username: user.username
			})
		});

	}

};
