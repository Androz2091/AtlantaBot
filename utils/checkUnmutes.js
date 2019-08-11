/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
    /**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
    init(client){
        setInterval(function(){
            client.guilds.forEach(async (guild) => {
                let settings = await client.functions.getSettings(guild.client, guild);
                let muted = settings.muted;
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
                    settings.muted = settings.muted.filter((d) => d.userID !== member.id);
                    await settings.save();
                    let language = new(require(`../languages/${settings.language}`));
                    let embed = new Discord.MessageEmbed()
                        .setDescription(language.get("UNMUTE_SUCCESS", member.id, d.caseNumber))
                        .setColor("#f44271")
                        .setFooter(guild.client.config.embed.footer);
                    let channel = guild.channels.get(settings.plugins.modlogs);
                    if(channel){
                        channel.send(embed);
                    }
                });
            });
        }, 2500);
    }

};