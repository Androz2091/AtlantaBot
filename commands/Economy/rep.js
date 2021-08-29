const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "rep",

			options: [
				{
					name: "user",
					type: "USER",
					required: true
				}
			],

			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, data) {

		// if the member is already in the cooldown db
		const isInCooldown = (data.userData.cooldowns || { rep: 0 }).rep;
		if(isInCooldown){
			/*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
			if(isInCooldown > Date.now()){
				return interaction.reply({
					content: translate("economy/rep:COOLDOWN", {
						time: this.client.convertTime(isInCooldown, "to", true, data.guildData.language)
					})
				});
			}
		}

		const user = interaction.options.getUser("user");
		if(!user){
			return interaction.reply({
				content: translate("economy/rep:INVALID_USER"),
				ephemeral: true
			});
		}
		if(user.bot){
			return interaction.reply({
				content: translate("economy/rep:BOT_USER"),
				ephemeral: true
			});
		}
		if(user.id === interaction.user.id){
			return interaction.reply({
				content: translate("economy/rep:YOURSELF"),
				ephemeral: true
			});
		}

		// Records in the database the time when the member will be able to execute the command again (in 12 hours)
		const toWait = Date.now() + 21600000;
		data.userData.cooldowns = {};
		data.userData.cooldowns.rep = toWait;
		data.userData.markModified("cooldowns");
		data.userData.save();
        
		const userData = await this.client.findOrCreateUser({ id: user.id });
		userData.rep++;
		if(!userData.achievements.rep.achieved){
			userData.achievements.rep.progress.now = (userData.rep > userData.achievements.rep.progress.total ? userData.achievements.rep.progress.total : userData.rep);
			if(userData.achievements.rep.progress.now >= userData.achievements.rep.progress.total){
				userData.achievements.rep.achieved = true;
				interaction.channel.send({ files: [ { name: "unlocked.png", attachment: "./assets/img/achievements/achievement_unlocked6.png"}]});
			}
			userData.markModified("achievements.rep");
		}
		await userData.save();

		interaction.reply({
			content: translate("economy/rep:SUCCESS", {
				username: user.username
			})
		});

	}

};
