const Discord = require("discord.js");
/* THIS CHECK IF THERE IS A REMIND MUST BE SENT */

/**
 * @prefer use setTimeout for to use proportionally RAM
 * why don't use setInterval, because instead of use correctly RAM, he makes use of spikes.
 * And aslo it can redo a loop without the other being finish.
 */

module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	async init(client){
		await client.usersData.find({ reminds: { $gt : [] } }).then((users) => {
			users.forEach((user) => {
				if(!client.users.cache.has(user.id)) client.users.fetch(user.id);
				const dUser = client.users.cache.get(user.id);
				if (dUser) {
					user.reminds.forEach(async (remind) => {
						if (remind.sendAt > Date.now()) {
							this.sendRemind(client, user, dUser, remind);
						} else {
							setTimeout(() => {
								this.sendRemind(client, user, dUser, remind);
							}, remind.sendAt - Date.now());
						}
					});
				}
			});

			return; // for Complete await
		});
		/*setInterval(async function(){
			const dateNow = Date.now();
			client.databaseCache.usersReminds.forEach(async (user) => {
				const dUser = client.users.cache.get(user.id);
				if(dUser){
					const reminds = user.reminds;
					const mustSent = reminds.filter((r) => r.sendAt < dateNow);
					if(mustSent.length > 0){
						mustSent.forEach((r) => {
							const embed = new Discord.MessageEmbed()
								.setAuthor(client.translate("general/remindme:TITLE"))
								.addField(client.translate("common:CREATION"), client.translate("general/remindme:CREATED", {
									time: client.convertTime(r.createdAt, "from")
								}))
								.addField(client.translate("common:MESSAGE"), r.message)
								.setColor(client.config.embed.color)
								.setFooter(client.config.embed.footer);
							dUser.send(embed);
						});
						user.reminds = user.reminds.filter((r) => r.sendAt >= dateNow);
						user.save();
						if(user.reminds.length === 0){
							client.databaseCache.usersReminds.delete(user.id);
						}
					}
				}
			});
		}, 1000);*/
	},

	async sendRemind(client, user, dUser, remind) {
		// RATE-LIMIT
		await new Promise((resolve) => setTimeout(resolve, 500));
		const embed = new Discord.MessageEmbed()
			.setAuthor(client.translate("general/remindme:TITLE"))
			.addField(client.translate("common:CREATION"), client.translate("general/remindme:CREATED", {
				time: client.convertTime(remind.createdAt, "from")
			}))
			.addField(client.translate("common:MESSAGE"), remind.message)
			.setColor(client.config.embed.color)
			.setFooter(client.config.embed.footer);
		dUser.send(embed);

		const pos = user.reminds.findIndex((r) => r.createdAt === remind.createdAt);
		user.reminds.splice(pos, 1);
		user.save();
	}

};