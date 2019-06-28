const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        let client = this.client;

        // Logs some informations using the logger file
        client.logger.log(`Loading a total of ${client.commands.size} command(s).`, 'log');
        client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
        
        // Inits the dashboard
        client.dashboard.init(client);

        // Post DBL stats
        if(client.config.apiKeys.dbl && client.config.apiKeys.dbl !== ""){
            let DBL = require("dblapi.js");
            let dbl = new DBL(client.config.apiKeys.dbl, client);
            dbl.postStats(client.guilds.size);
        }

        // Update the game every 20s
        const status = require("../config.js").status;
        let i = 0;
        setInterval(function(){
            client.user.setActivity(status[parseInt(i, 10)].name.replace("{serversCount}", client.guilds.size), {type: status[parseInt(i, 10)].type});
            if(status[parseInt(i+1, 10)]){
                i++;
            } else {
                i = 0;
            }
        }, 20000);

        /* UNMUTE USERS */
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

        /* Remind me
        setInterval(function(){
            var time = Math.floor(Date.now()/1000);
            time = String(time);
            var cm = client.databases[3].get(time);
            if(cm){
                cm.forEach(remind => {
                    var language = new(require('../languages/'+client.config.default_language+'.js'));
                    var author = remind.author;
                    var ago = language.convertMs(Date.now() - remind.registeredAt);
                    var msg = new Discord.RichEmbed().setAuthor('Atlanta Reminder', client.user.displayAvatarURL).addField('Enrolled', ago+' ago').addField('Message', remind.msg).setColor(client.config.embed.color).setFooter(client.config.embed.footer).setTimestamp();
                    client.fetchUser(author).then(user => user.send(msg));
                });
            }
        }, 1000);*/
    }
}  