const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
AsciiTable = require("ascii-table");

class Leaderboard extends Command {

    constructor (client) {
        super(client, {
            name: "leaderboard",
            description: (language) => language.get("LEADERBOARD_DESCRIPTION"),
            usage: (language) => language.get("LEADERBOARD_USAGE"),
            examples: (language) => language.get("LEADERBOARD_EXAMPLES"),
            dirname: __dirname,
            enabled: false,
            guildOnly: true,
            aliases: [ "lb" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        
        let isOnlyOnMobile = (message.author.presence.clientStatus ? JSON.stringify(Object.keys(message.author.presence.clientStatus)) === JSON.stringify([ "mobile" ]) : false);
        if(isOnlyOnMobile){
            return message.channel.send(message.language.get("LEADERBOARD_ERR_MOBILE"));
        }

        let leaderboard = [];

        let users = await message.client.usersData.find().lean();

        users.forEach((user) => {
            leaderboard.push({
                id: user.id,
                credits: user.money || 0,
                rep: user.rep,
                level: parseInt(user.level, 10)
            });
        });
        
        let type = args[0];
        if(!type || (type !== "credits" && type !== "rep" && type !== "level")){
            return message.channel.send(message.language.get("LEADERBOARD_ERR_TYPE"));
        }

        let table = new AsciiTable("LEADERBOARD");
        
        let order = [];

        // Sort the array by money
        if(args[0].toLowerCase() === "credits"){
            leaderboard = message.client.functions.sortByKey(leaderboard, "credits");
            table.setHeading("#", message.language.get("UTILS").USER, message.language.get("UTILS").CREDITS, message.language.get("UTILS").LEVEL, message.language.get("UTILS").REP);
            order.push("credits", "level", "rep");
        }
        // Sort the array by reputation
        if(args[0].toLowerCase() === "rep"){
            leaderboard = message.client.functions.sortByKey(leaderboard, "rep");
            table.setHeading("#", message.language.get("UTILS").USER, message.language.get("UTILS").REP, message.language.get("UTILS").LEVEL, message.language.get("UTILS").CREDITS);
            order.push("rep", "level", "credits");
        }
        // Sort the array by level
        if(args[0].toLowerCase() === "level"){
            leaderboard = message.client.functions.sortByKey(leaderboard, "level");
            table.setHeading("#", message.language.get("UTILS").USER, message.language.get("UTILS").LEVEL, message.language.get("UTILS").REP, message.language.get("UTILS").CREDITS);
            order.push("level", "rep", "credits");
        }
        
        if(leaderboard.length > 20){
            leaderboard.length = 20;
        }
        
        async function fetchUsers(array, table, client) {
            return new Promise((resolve, reject) => {
                let index = 0;
                let arr = [];
                array.forEach((element) => {
                    client.users.fetch(element.id).then((user) => {
                        let regEx = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
                        let username = user.username.replace(regEx, "");
                        if(username.length > 20){
                            username = username.substr(0, 20);
                        }
                        table.addRow(index++, username, element[order[0]], element[order[1]], element[order[2]]);
                    });
                });
                resolve(table);
            });
        }

        fetchUsers(leaderboard, table, message.client).then((newTable) => {
            message.channel.send("```"+newTable.toString()+"```");
        });
    }

}

module.exports = Leaderboard;