const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fs = require("fs");

let currentGame = false;

class FindWords extends Command {

    constructor (client) {
        super(client, {
            name: "findwords",
            description: (language) => language.get("FINDWORDS_DESCRIPTION"),
            usage: (language) => language.get("FINDWORDS_USAGE"),
            examples: (language) => language.get("FINDWORDS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        if(currentGame){
            if(currentGame === message.guild.id){
                return message.channel.send(message.language.get("ERR_GAME_ALREADY_LAUNCHED"));
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(message.language.get("ERR_A_GAME_ALREADY_LAUNCHED"))
                    .setColor("#FF0000")
                    .setFooter(data.config.embed.footer)
                return message.channel.send(embed);
            }
        }

        // Reads words file
        let text = fs.readFileSync(`./assets/words/words-${message.language.getLang()}.txt`).toString("utf-8");
        let arrWords = text.split("\n");
    
        // Init some utils variables
        let participants = [],
        winners = [],
        words = [],
        nbGames = 4;

        // Store the date wich the game has started
        let createdAt = Date.now(); // 20929038303
    
        for(let i = 0; i < nbGames; i++){
            let result = Math.floor((Math.random() * arrWords.length));
            words.push(arrWords[result].substring(0, 3));
        }

        let i = 0; // Inits i variable to count games
        currentGame = message.guild.id; // Update current game variable
        generegame(words[i]); // Generate a new round
    
        function generegame(word){
    
            // Launch timer
            let delay = (i === 0) ? 10000 : 0;
            if(i === 0){
                message.channel.send(message.language.get("FINDWORDS_TIMER"));
            }
    
            setTimeout(function(){
                
                // Send announcment message
                message.channel.send(message.language.get("FINDWORDS_QUESTION", word));
    
                // init a collector to receive the answers
                let collector = new Discord.MessageCollector(message.channel, (m) => !m.author.bot, {
                    time: 20000
                });
    
                collector.on("collect", (msg) => {
                    if(!participants.includes(msg.author.id)){
                        participants.push(msg.author.id);
                    }
                    if(msg.content.toLowerCase().indexOf(word) >= 0 && arrWords.indexOf(msg.content.toLowerCase()) >= 0){
                        collector.stop(msg.author.id); // Stop the collector
                    } else {
                        msg.channel.send(message.language.get("FINDWORDS_ERR_INVALID_WORD", msg.author));
                    }
                });
    
                collector.on("end", async (collected, reason) => {
                    if(reason === "time"){
                        message.channel.send(message.language.get("FINDWORDS_ERR_NO_WINNER"));
                    } else {
                        message.channel.send(message.language.get("FINDWORDS_CONGRATS", reason));
                        winners.push(reason);
                    }
                    if(i < nbGames-1) {
                        i++;
                        generegame(words[i]);
                    } else {
                        currentGame = false;
                        if(winners.length < 1){
                            return message.channel.send(message.language.get("FINDWORDS_ERR_NO_WINNER_GAME"));
                        }
                        let winnerID = await getWinner(winners);
                        let time = message.language.convertMs(Date.now() - createdAt);
                        let user = await message.client.users.fetch(winnerID);
                        message.channel.send(message.language.get("FINDWORDS_STATS", user.username, nbGames, time, participants.length, participants.map((p) => "<@"+p+">").join("\n")));
                        if(participants.length > 1){
                            message.channel.send(message.language.get("FINDWORDS_MONEY", user.username));
                            let userdata = await message.client.usersData.findOne({id: user.id});
                            userdata.money = userdata.money + 15;
                            userdata.save();
                        }
                    }
                });
            }, delay);
        }

        async function getWinner(array){
            return new Promise(function (resolve, reject){
                let counts = {};
                let compare = 0;
                let mostFrequent;
                for(let i = 0, len = array.length; i < len; i++){
                    let winner = array[i];
                    if(!counts[winner]){
                        counts[winner] = 1;
                    } else {
                        counts[winner] = counts[winner] + 1;
                    }
                    if(counts[winner] > compare){
                        compare = counts[winner];
                        mostFrequent = array[i];
                    }
                }
                resolve(mostFrequent);
            });
        }
    }

}

module.exports = FindWords;