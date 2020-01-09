/* THIS POSTS STATS TO DISCORDBOTS.ORG */
const DBL = require("dblapi.js");

module.exports = {
    
    /**
     * Starts to post stats to DBL
     * @param {object} client The Discord Client instance
     */
    init(client){
        if(client.config.apiKeys.dbl && client.config.apiKeys.dbl !== ""){
            let stats = new DBL(client.config.apiKeys.dbl, client);
            setInterval(function(){
                stats.postStats(client.guilds.size);
            }, 60000*10); // every 10 minutes
            let dbl = new DBL(client.config.apiKeys.dbl, { webhookPort: client.config.votes.port, webhookAuth: client.config.votes.password });
            dbl.webhook.on("vote", async (vote) => {
                let dUser = await client.users.fetch(vote.user);
                let member = await client.findOrCreateMember({ id: vote.user, guildID: client.config.support.id });
                member.money = member.money + 40;
                member.save();
                let language = new(require(`../languages/${client.config.defaultLanguage}`));
                dUser.send(language.get("VOTE_THANKS", dUser)).catch((err) => {});
                let logsChannel = client.channels.get(client.config.votes.channel);
                if(logsChannel){
                    logsChannel.send(language.get("VOTE_LOGS", dUser));
                }
            });
        }
    }

};