/* THIS POSTS STATS TO DISCORDBOTS.ORG */
const DBL = require("dblapi.js");

module.exports = {
    
	/**
     * Starts to post stats to DBL
     * @param {object} client The Discord Client instance
     */
	init(client){
		if(client.config.apiKeys.dbl && client.config.apiKeys.dbl !== ""){
			const stats = new DBL(client.config.apiKeys.dbl, client);
			setInterval(function(){
				stats.postStats(client.guilds.cache.size);
			}, 60000*10); // every 10 minutes
			const dbl = new DBL(client.config.apiKeys.dbl, { webhookPort: client.config.votes.port, webhookAuth: client.config.votes.password });
			dbl.webhook.on("vote", async (vote) => {
				const dUser = await client.users.fetch(vote.user);
				const member = await client.findOrCreateMember({ id: vote.user, guildID: client.config.support.id });
				member.money = member.money + 40;
				member.save();
				dUser.send(client.translate("misc:VOTE_DM", {
					user: dUser.tag
				})).catch(() => {});
				const logsChannel = client.channels.cache.get(client.config.votes.channel);
				if(logsChannel){
					logsChannel.send(client.translate("misc:VOTE_LOGS", {
						userid: dUser.id,
						usertag: dUser.tag
					}));
				}
			});
		}
	}

};