module.exports = {


    // With quick.db, it's not possible to records boolean (like false, true or null)

    createGuild: function(client, guild){
        client.databases[1].set(guild.id, {
            id:guild.id, // The ID of the guild
            name:guild.name, // The name of the guild (when the bot is added)
            lang:"fr", // The language of the guild
            prefix:client.config.prefix, // the prefix of the guild
            commands:{}, // the guild's custom commands
            logs:{ status:"disabled", channel:"unknow" }, // Logs plugin
            welcome:{ status:"disabled", message:"unknow", channel:"unknow" }, // Welcome messages plugin
            welcome_mp:{ status:"disabled", message:"unknow" }, // Welcome messages in DM plugin
            leave:{ status:"disabled", message:"unknow", channel:"unknow" }, // Goodbye messages plugin
            autorole:{ status:"disabled", role:"unknow" }, // Autorole plugin
            deleteinvite:"disabled", // Auto delete invites links
            ignored_channels:[], // The channels wich are ignored by the bot
            slowmode:{}, // An object like that : { "channelid":"slowmodetime", "channelid2", "slowmodetime2"}
            userslowmode:{}, // Used to store users data
            warns_sanctions:{} // Used to store users guild sanctions
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

    getUsersData: function(client, message){
        // Gets the database
        var users_data = client.databases[0];

        // Init new emty array
        var membersdata = [];
        
        // Get the data of the message's author
        var author_data = users_data.get(message.author.id) || client.functions.createUser(client, message.author);
        membersdata.push(author_data);

        // Get the data of the users mentionned
        if(message.mentions.members && message.mentions.members.size > 0){
            message.mentions.members.forEach(member => {
                var memberdata = users_data.get(member.id) || client.functions.createUser(client, member.user);
                membersdata.push(memberdata);
            });
        }

        // Return the filled array
        return membersdata;
    },

    // This function sort an array 
    sortByKey: function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }
}