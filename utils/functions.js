const Discord = require('discord.js');

module.exports = {
    
    /**
     * Gets the users data
     * @param {object} client The discord client
     * @param {array} users The users to gets data
     * @returns The users data
     */
    async getUsersData(client, users){
        return new Promise(async function(resolve, reject){
            let usersData = [];
            for(let u of users){
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
            }
            resolve(usersData);
        });
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