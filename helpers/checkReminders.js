const Discord = require("discord.js");
/* THIS CHECK IF THERE IS A REMIND MUST BE SENT */

module.exports = {
    
    /**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
    init(client){
        setInterval(async function(){
            let users = await client.usersData.find({ reminds: { $gt: [] } }).lean();
            let dateNow = Date.now();
            users.forEach(async (user) => {
                let dUser = client.users.cache.get(user.id);
                if(dUser){
                    let reminds = user.reminds || [];
                    if(reminds.length > 0){
                        let mustSent = reminds.filter((r) => r.sendAt < dateNow);
                        if(mustSent.length > 0){
                            mustSent.forEach((r) => {
                                let embed = new Discord.MessageEmbed()
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
                        let mUser = await client.usersData.findOne({id:user.id});
                        mUser.reminds = user.reminds.filter((r) => r.sendAt >= dateNow);
                        mUser.save();
                    }
                }
            });
        }, 3000);
    }

};