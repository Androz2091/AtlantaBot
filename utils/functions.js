const Discord = require('discord.js');

module.exports = {

    // With quick.db, it's not possible to records boolean (like false, true or null)

    createGuild: function(client, guild){
        client.databases[1].set(guild.id, {
            id:guild.id, // The ID of the guild
            name:guild.name, // The name of the guild (when the bot is added)
            lang:"fr", // The language of the guild
            prefix:client.config.prefix, // the prefix of the guild
            commands:{}, // the guild's custom commands
            welcome:{ status:"disabled", message:"unknow", channel:"unknow" }, // Welcome messages plugin
            welcome_mp:{ status:"disabled", message:"unknow" }, // Welcome messages in DM plugin
            leave:{ status:"disabled", message:"unknow", channel:"unknow" }, // Goodbye messages plugin
            autorole:{ status:"disabled", role:"unknow" }, // Autorole plugin
            deleteinvite:{status:"disabled",channels:[]}, // Auto delete invites links
            ignored_channels:[], // The channels wich are ignored by the bot
            slowmode:{}, // An object like that : { "channelid":"slowmodetime", "channelid2", "slowmodetime2"}
            userslowmode:{}, // Used to store users data
            warns_sanctions:{}, // Used to store users guild sanctions
            channels:{ modlogs: 'false', suggestion: 'false' }, // Used to store channels guild settings
            case: 0, // Used to store number of mod case
            automod_warns: {}, // Used to store mod settings
            muted: {} // This object is used to store muted member 
        });
        // Log in the console
        client.logger.log(`New server ${guild.name} - (${guild.id}) [${guild.memberCount} members]`, 'log');
        // return guild data object
        return client.databases[1].get(guild.id);
    },

    createUser: function(client, user){
        client.databases[0].set(user.id, {
            credits:0, // The credits of the user
            rep:0, // The reputation's point of the user
            level:0, // The user's level
            xp:0, // the user's xp
            name:user.username, // The name of the user (when the bot registers it)
            tag:user.discriminator, // The tag #0000 of the user (when the bot registers it)
            bio:"unknow", // The user's biography (which is display on his profile)
            birthdate:"unknow", // The birth date of the user
            partner:"false", // The user boyfriend or girlfriend
            old_partners:[], // The user's previous partners
            badges:[], // the badges of the member
            color:client.config.embed.color, // The user's embed color,
            registeredAt:Date.now(), // The date wich the user is registered
            // The user's statistics
            stats:{ "commands":0, "findwords":{ "best-score":"unknow", "wins":0, }, "number":{ "best-score":"false", "wins":0, } }
        });
        // Log in the console
        client.logger.log(`New user ${user.username} - (${user.id})`, 'log');
        // Return user data object
        return client.databases[0].get(user.id);
    },

    
    /**
     * Gets the users data
     * @param {object} client The discord client
     * @param {array} users The users to gets data
     * @returns The users data
     */
    async getUsersData(client, users){
        let usersData = [];
        users.forEach((u) => {
            client.usersData.find({id: u.id}, function(err, result){
                if(result[0]){
                    usersData.push(result[0]);
                } else {
                    let user = new client.usersData({
                        id: u.id
                    });
                    user.save();
                    usersData.push(user);
                }
            });
        });
        return usersData;
    },

    /**
     * Gets message prefix
     * @param {object} message The Discord message
     * @returns The prefix
     */
    getPrefix(message){
        if(message.channel.type !== "dm"){
            const prefixes = [
                `<@${message.client.user.id}>`,
                message.config.botname,
                message.settings.prefix
            ];
            let prefix = null;
            prefixes.forEach((p) => {
                if(message.content.startsWith(p)){
                    prefix = p;
                }
            });
            return prefix;
        } else {
            return true;
        }
    },

    /**
     * Gets channel settings
     * @param {object} client The discord client
     * @param {object} channel The channel object
     * @returns The channel data
     */
    async getSettings(client, channel){
        return new Promise(async function(resolve, reject){
            if(channel.guild){
                client.guildsData.find({id: channel.guild.id}, function (err, result) {
                    if(result[0]){
                        resolve(result[0]);
                    } else {
                        let guild = new client.guildsData({
                            id: channel.guild.id
                        });
                        guild.save();
                        resolve(guild);
                    }
                });
            } else {
                resolve({
                    prefix: client.config.prefix,
                    language: client.config.defaultLanguage
                });
            }
        });
    },


    vote: async function(data, client){
        var user = await client.fetchUser(data.user);
        client.channels.get(client.config.server.votes.channel).send(`:arrow_up: **${user.tag}** \`(${user.id})\` voted for **Atlanta**, thanks !\nhttps://discordbots.org/bot/557445719892688897/vote`);
        client.databases[0].add(`${data.user}.credits`, 30);
        user.send(`Hello ${user}, thanks for voting !\nYour reward : 30 :credit_card:`);
    },

    // This function return a valid link to the support server
    supportLink: async function(client){
        return new Promise(function(resolve, reject) {
            var guild = client.guilds.get(client.config.support.id);
            var channel = guild.channels.filter(ch => ch.type === 'text').first();
            if(channel){
                var options = {maxAge:0};
                channel.createInvite(options).then(i => {
                    resolve(i.url);
                });
            }
        });
    },

    // This function sort an array 
    sortByKey: function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    },

    // This function return a shuffled array
    shuffle: function(pArray) {
        var array = [];
        pArray.forEach(element => array.push(element));
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },

    // This function return a random number between min and max
    randomNum : function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    // this function reset a guild
    clearGuild: async function(guild) {
        guild.roles.forEach(r => r.delete().catch(O_o=>{}));
        guild.channels.forEach(c => c.delete().catch(O_o=>{}));
        guild.emojis.forEach(e => guild.deleteEmoji(e).catch(O_o=>{}));
        var bans = await guild.fetchBans();
        bans.forEach(u => guild.unban(u).catch(O_o=>{}));
        return true;
    }
}