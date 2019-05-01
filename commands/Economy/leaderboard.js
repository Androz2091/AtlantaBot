const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Leaderboard extends Command {

    constructor (client) {
        super(client, {
            name: "leaderboard",
            description: (language) => language.get('LEADERBOARD_DESCRIPTION'),
            dirname: __dirname,
            usage: "leaderboard [credits/level/rep]",
            enabled: true,
            guildOnly: false,
            aliases: ["top"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$credits\n$credits @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // require ascii table
        var asciitable = require('ascii-table');

        // Creates a new empty array
        var leaderboard = [];

        // Fetch all users in the database and for each member, create a new object
        this.client.databases[0].fetchAll().forEach(user => {
            // if the user data is not an array, parse the user data
            if(typeof user.data !== 'object') user.data = JSON.parse(user.data);
            // Push the user data in the empty array
            leaderboard.push({
                id:user.ID,
                credits:user.data.credits,
                rep:user.data.rep,
                lvl:user.data.level
            });
        });

        if(!args[0]) return message.channel.send(message.language.get('LEADERBOARD_TYPE'));

        // Creates a new ascii table and set the heading
        var table = new asciitable('LEADERBOARD');
        
        var order = [];

        // Sort the array by credits
        if(args[0].toLowerCase() == 'credits' || args[0].toLowerCase() == 'crédits'){
            leaderboard = this.client.functions.sortByKey(leaderboard, 'credits');
            table.setHeading('#', message.language.get('USER'), message.language.get('TCREDITS'), message.language.get('TLEVEL'), message.language.get('TREP'));
            order.push('credits', 'lvl', 'rep');
        }
        // Sort the array by reputation
        if(args[0].toLowerCase() == 'rep' || args[0].toLowerCase() == 'reputation'){
            leaderboard = this.client.functions.sortByKey(leaderboard, 'rep');
            table.setHeading('#', message.language.get('USER'), message.language.get('TREP'), message.language.get('TLEVEL'), message.language.get('TCREDITS'));
            order.push('rep', 'lvl', 'credits');
        }
        // Sort the array by level
        if(args[0].toLowerCase() == 'lvl' || args[0].toLowerCase() == 'level'){
            leaderboard = this.client.functions.sortByKey(leaderboard, 'lvl');
            table.setHeading('#', message.language.get('USER'), message.language.get('TLEVEL'), message.language.get('TREP'), message.language.get('TCREDITS'));
            order.push('lvl', 'rep', 'credits');
        }
        
        if(leaderboard.length > 20) leaderboard.length = 20;

        var leaderboard_embed = new Discord.RichEmbed() // Creates a new Rich Embed
            .setAuthor('Leaderboard', this.client.user.displayAvatarURL)
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            

        // Put all users in the new table
        fetchUsers(leaderboard, table, this.client).then(newTable => {
            // Send the table in the current channel
            message.channel.send('```'+newTable.toString()+'```');
        });

        async function fetchUsers(array, table, client) {
            // Create promise
            return new Promise((resolve, reject) => {
                // Init counter
                var pos = 0;
                // Init new array
                var narray = [];
                array.forEach(element => {
                    client.fetchUser(element.id).then(user => {
                         // Update counter variable
                        pos++;
                        // Update the username of the user 
                        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
                        var _user = user.username.replace(regex, '');
                        if(_user.length > 20) _user.length = 20
                        // Add new row to the ascii table
                        table.addRow(pos, _user, element[order[0]], element[order[1]], element[order[2]]);
                    });
                });
                // Return the table
                resolve(table);
            });
        }
    }

}

module.exports = Leaderboard;