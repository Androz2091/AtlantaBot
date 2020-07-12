const Discord = require("discord.js");
/* THIS CHECK IF THERE IS A REMIND MUST BE SENT */

module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	init(client){
		setInterval(async function(){
			const users = await client.usersData.find({ reminds: { $gt: [] } }).lean();
			const dateNow = Date.now();
			users.forEach(async (user) => {
				const dUser = client.users.cache.get(user.id);
				if(dUser){
					const reminds = user.reminds || [];
					if(reminds.length > 0){
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
						}
						const mUser = await client.usersData.findOne({id:user.id});
						mUser.reminds = user.reminds.filter((r) => r.sendAt >= dateNow);
						mUser.save();
					}
				}
			});
		}, 3000);
	}

};