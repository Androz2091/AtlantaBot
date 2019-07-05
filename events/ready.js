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

        // Post DBL stats
        if(client.config.apiKeys.dbl && client.config.apiKeys.dbl !== ""){
            let DBL = require("dblapi.js");
            let stats = new DBL(client.config.apiKeys.dbl, client);
            setInterval(function(){
                stats.postStats(client.guilds.size);
            }, 60000*10);
            let dbl = new DBL(client.config.apiKeys.dbl, { webhookPort: client.config.votes.port, webhookAuth: client.config.votes.password });
            dbl.webhook.on("vote", async (vote) => {
                let dUser = await client.users.fetch(vote.user);
                let userData = await client.usersData.findOne({id:vote.user});
                if(userData){
                    userData.money = userData.money + 40;
                    userData.save();
                }
                let language = new(require(`../languages/${client.config.defaultLanguage}`));
                dUser.send(language.get("VOTE_THANKS", dUser)).catch((err) => {});
                let logsChannel = client.channels.get(client.config.votes.channel);
                if(logsChannel){
                    logsChannel.send(language.get("VOTE_LOGS", dUser));
                }
            });
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

        setInterval(async function(){
            let language = new(require(`../languages/${client.config.defaultLanguage}`));
            let users = await client.usersData.find({});
            let dateNow = Date.now();
            users.forEach((user) => {
                let dUser = client.users.get(user.id);
                if(dUser){
                    let reminds = user.reminds;
                    if(reminds.length > 0){
                        let mustSent = reminds.filter((r) => r.sendAt < dateNow);
                        if(mustSent.length > 0){
                            mustSent.forEach((r) => {
                                let embed = new Discord.MessageEmbed()
                                    .setAuthor(language.get("REMINDME_TITLE"))
                                    .addField(language.get("REMINDME_FIELDS")[0], language.convertMs(dateNow - r.createdAt))
                                    .addField(language.get("REMINDME_FIELDS")[1], r.message)
                                    .setColor(client.config.embed.color)
                                    .setFooter(client.config.embed.footer);
                                dUser.send(embed);
                            });
                        }
                        let u = users.find((u) => u.id === user.id);
                        u.reminds = u.reminds.filter((r) => r.sendAt >= dateNow);
                        u.save();
                    }
                }
            });
        }, 3000);
    }
}  