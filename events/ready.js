const Discord = require('discord.js')

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
            let dbl = new (client.config.apiKeys.dbl, client);
            dbl.postStats(client.guilds.size);
        }

        // Update the game every 20s
        const status = require("../config.js").status;
        let index = 0;
        setInterval(function(){
            client.user.setActivity(status[index].name.replace("{serversCount}", client.guilds.size), {type: status[index].type});
            if(games[parseInt(index+1, 10)]){
                i++;
            } else {
                i = 0;
            }
        }, 20000);

        /* Unmute members
        setInterval(function(){
            client.guilds.forEach(guild => {
                var data = client.databases[1].get(guild.id) || client.functions.createGuild(client, guild);
                if(Object.keys(data.muted).length > 0){ // If there are members to check
                    for(var userID in data.muted){ // for each member
                        var time = data.muted[userID]; // Gets the unmute date
                        if(!time) return;
                        var user = client.users.get(userID); // Gets the user to unmute
                        if(user && (data.muted[userID]<Date.now())){ // if the user must be unmute
                            // Unmute the member
                            guild.channels.forEach(ch => {
                                if(ch.permissionOverwrites.get(userID)){
                                    ch.permissionOverwrites.get(userID).delete();
                                } else {
                                    delete data.muted[userID];
                                    return client.databases[1].set(`${guild.id}.muted`, data.muted);
                                }
                            });
                            try {
                                delete data.muted[userID];
                            } catch(e) {
                                console.log(data);
                            }
                            client.databases[1].set(`${guild.id}.muted`, data.muted);
                            if(guild.members.get(user.id)){
                                var language = new(require('../languages/'+data.lang+'.js'));
                                // Update cases
                                client.databases[1].add(`${guild.id}.case`, 1);
                                // Gets case
                                var tcase = client.databases[1].get(`${guild.id}.case`);
                                // Gets the modlogs channel
                                var modlogs = guild.channels.get(data.channels.modlogs);
                                if(!modlogs) return;
                                var modlog_embed = new Discord.RichEmbed()
                                    .setAuthor(language.get('MODLOGS_HEADERS', tcase)[5], user.avatarURL)
                                    .addField(language.get('MODLOGS_UTILS')[0], `\`${user.tag}\` (${user})`, true)
                                    .setColor(`#f44271`)
                                    .setTimestamp()
                                    .setFooter(client.config.embed.footer);
                                return modlogs.send(modlog_embed);
                            }
                        }
                    }
                }
            });
        }, 1000); // every second

        // Remind me
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