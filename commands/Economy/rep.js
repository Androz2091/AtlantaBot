const Command = require("../../base/Command.js");

class Rep extends Command {

	constructor (client) {
		super(client, {
			name: "rep",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "user",
					description: "the user that you want to check the rep",
					required: true,
					type: "USER"
				}
			]
		});
	}

	async run (interaction, data) {

		// if the member is already in the cooldown db
		const isInCooldown = (data.userData.cooldowns || { rep: 0 }).rep;
		if(isInCooldown){
			/*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
			if(isInCooldown > Date.now()){
				return interaction.error("economy/rep:COOLDOWN", {
					time: interaction.convertTime(isInCooldown, "to", true)
				});
			}
		}

		const user = await interaction.options.getMember("user");
		if(!user){
			return interaction.error("economy/rep:INVALID_USER");
		}
		if(user.bot){
			return interaction.error("economy/rep:BOT_USER");
		}
		if(user.id === interaction.member.user.id){
			return interaction.error("economy/rep:YOURSELF");
		}

		// Records in the database the time when the member will be able to execute the command again (in 12 hours)
		const toWait = Date.now() + 21600000;
		data.userData.cooldowns = {};
		data.userData.cooldowns.rep = toWait;
		data.userData.markModified("cooldowns");
		data.userData.save();
        
		const userData = await this.client.database.findOrCreateUser({ id: user.id });
		userData.rep++;
		if(!userData.achievements.rep.achieved){
			userData.achievements.rep.progress.now = (userData.rep > userData.achievements.rep.progress.total ? userData.achievements.rep.progress.total : userData.rep);
			if(userData.achievements.rep.progress.now >= userData.achievements.rep.progress.total){
				userData.achievements.rep.achieved = true;
				interaction.reply({ files: [ { name: "unlocked.png", attachment: "./assets/img/achievements/achievement_unlocked6.png"}]});
			}
			userData.markModified("achievements.rep");
		}
		await userData.save();

		interaction.success("economy/rep:SUCCESS", {
			username: user.username
		});

	}

}

module.exports = Rep;