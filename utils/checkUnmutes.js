/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
    /**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
    init(client){
        setInterval(function(){
            client.guilds.forEach(async (guild) => {
                let guildData = await client.functions.getGuildData(guild.client, guild);
                let muted = guildData.muted;
                if(muted.length < 0) return;
                let mustBeUnmuted = muted.filter((d) => d.endDate < Date.now());
                mustBeUnmuted.forEach(async (d) => {
                    let member = await guild.members.fetch(d.userID);
                    if(member){
                        guild.channels.forEach((channel) => {
                            let permOverwrites = channel.permissionOverwrites.get(member.id);
                            if(permOverwrites){
                                permOverwrites.delete();
                            }
                        });
                    }
                    guildData.muted = guildData.muted.filter((d) => d.userID !== member.id);
                    await guildData.save();
                    let language = new(require(`../languages/${guildData.language}`));
                    let embed = new Discord.MessageEmbed()
                        .setDescription(language.get("UNMUTE_SUCCESS", member.id, d.caseNumber))
                        .setColor("#f44271")
                        .setFooter(guild.client.config.embed.footer);
                    let channel = guild.channels.get(guildData.plugins.modlogs);
                    if(channel){
                        channel.send(embed);
                    }
                });
            });
        }, 2500);
    }

};