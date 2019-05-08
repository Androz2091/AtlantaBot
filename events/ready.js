const Discord = require('discord.js')

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        // Logs some informations using the logger file
        this.client.logger.log(`Loading a total of ${this.client.commands.size} command(s).`, 'log');
        this.client.logger.log(`${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, "ready");
        
        // Inits the dashboard
        this.client.dashboard.init(this.client);

        // Post DBL stats
        const DBL = require("dblapi.js");
        const dbl = new DBL(this.client.config.apiKeys.dbl, this.client);
        dbl.postStats(this.client.guilds.size)

        // Inits stats table
        if(!this.client.databases[4].get('commands')) this.client.databases[4].set('commands', []);

        // Update the game every 20s
        var games = [
            {
                name:`@Atlanta help on ${this.client.guilds.size} guilds`,
                type:`LISTENING`
            },
            {
                name:`my website : atlanta-bot.fr`,
                type:`PLAYING`
            },
            {
                name:`add me with ${this.client.config.prefix}invite!`,
                type:`STREAMING`
            }
        ];
        var client = this.client;
        var i = 0;
        setInterval(function(){
            client.user.setActivity(games[i].name, {type: games[i].type});
            if(games[parseInt(i + 1)]) i++;
            else i = 0;
        }, 20000);

        // Unmute members
        setInterval(function(){
            client.guilds.forEach(guild => {
                var data = client.databases[1].get(guild.id) || client.functions.createGuild(client, guild);
                if(Object.keys(data.muted) > 0){ // If there are members to check
                    for(var userID in data.muted){ // for each member
                        var time = data.muted[userID]; // Gets the unmute date
                        var user = client.users.get(userID); // Gets the user to unmute
                        if(user && time < Date.now()){ // if the user must be unmute
                            // Unmute the member
                            guild.channels.forEach(ch => ch.permissionOverwrites.get(userID).delete());
                            delete data.muted[userID];
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
        }, 1000);
    }
}  