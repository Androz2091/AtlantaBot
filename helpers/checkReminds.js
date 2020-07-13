const Discord = require("discord.js");
/* THIS CHECK IF THERE IS A REMIND MUST BE SENT */

module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	init(client){
		client.usersData.find({ reminds: { $gt : [] } }).then((users) => {
			for(const user of users){
				if(!client.users.cache.has(user.id)) client.users.fetch(user.id);
				client.databaseCache.usersReminds.set(user.id, user);
			}
		});
		setInterval(async function(){
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
		}, 1000);
	}

};