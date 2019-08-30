const Discord = require("discord.js");

/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
    /**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
    init(client){
        setInterval(function(){
            client.guilds.forEach(async (guild) => {
                let guildData = await client.findOrCreateGuild({ id: guild.id });
                guildData.members.filter((m) => m && m.mute && m.mute.muted).filter((m) => m.mute.endDate < Date.now()).forEach(async (memberData) => {
                    let member = await guild.members.fetch(memberData.id);
                    if(member){
                        guild.channels.forEach((channel) => {
                            let permOverwrites = channel.permissionOverwrites.get(member.id);
                            if(permOverwrites){
                                permOverwrites.delete();
                            }
                        });
                    }
                    let language = new(require(`../languages/${guildData.language}`));
                    let embed = new Discord.MessageEmbed()
                        .setDescription(language.get("UNMUTE_SUCCESS", memberData.id, memberData.mute.case))
                        .setColor("#f44271")
                        .setFooter(guild.client.config.embed.footer);
                    let channel = guild.channels.get(guildData.plugins.modlogs);
                    if(channel){
                        channel.send(embed);
                    }
                    memberData.mute = {
                        muted: false,
                        endDate: null,
                        case: null
                    };
                    memberData.save();
                });
            });
        }, 3500);
    }

};