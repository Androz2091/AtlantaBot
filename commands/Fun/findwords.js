const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fs = require("fs");

let currentGames = {};

class FindWords extends Command {

    constructor (client) {
        super(client, {
            name: "findwords",
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

        if (currentGames[message.guild.id]) {
            return message.error("fun/number:GAME_RUNNING");
        }

        // Reads words file
        const wordList = require("../../assets/json/words/"+message.guild.data.language+".json");
    
        // Init some utils variables
        let participants = [],
        winners = [],
        words = [],
        nbGames = 4;

        // Store the date wich the game has started
        const createdAt = Date.now(); // 20929038303
    
        for(let i = 0; i < nbGames; i++){
            const result = Math.floor((Math.random() * wordList.length));
            words.push(wordList[result].substring(0, 3));
        }

        let i = 0; // Inits i variable to count games
        currentGames[message.guild.id] = true; // Update current game variable
        generegame(words[i]); // Generate a new round
    
        function generegame(word){
    
            // Launch timer
            let delay = (i === 0) ? 10000 : 0;
            if(i === 0){
                message.sendT("fun/findwords:GAME_STARTING");
            }
    
            setTimeout(function(){
                
                // Send announcment message
                message.sendT("fun/findwords:FIND_WORD", {
                    word
                }, false, false, "warn");
    
                // init a collector to receive the answers
                let collector = new Discord.MessageCollector(message.channel, (m) => !m.author.bot, {
                    time: 20000
                });
    
                collector.on("collect", (msg) => {
                    if(!participants.includes(msg.author.id)){
                        participants.push(msg.author.id);
                    }
                    if(msg.content.toLowerCase().indexOf(word) >= 0 && wordList.indexOf(msg.content.toLowerCase()) >= 0){
                        collector.stop(msg.author.id); // Stop the collector
                    } else {
                        msg.error("fun/findwords:INVALID_WORD", {
                            member: msg.author.toString()
                        });
                    }
                });
    
                collector.on("end", async (collected, reason) => {
                    if(reason === "time"){
                        message.error("fun/findwords:NO_WINNER");
                    } else {
                        message.success("fun/findwords:WORD_FOUND", {
                            winner: "<@"+reason+">"
                        });
                        winners.push(reason);
                    }
                    if(i < nbGames-1) {
                        i++;
                        generegame(words[i]);
                    } else {
                        currentGames[message.guild.id] = false;
                        if(winners.length < 1){
                            return message.error("fun/findwords:NO_WINNER_ALL");
                        }
                        let winnerID = await getWinner(winners);
                        let time = message.convertTime(Date.now() - createdAt, "to");
                        let user = await message.client.users.fetch(winnerID);
                        message.sendT("fun/findwords:GAME_STATS", {
                            winner: user.username,
                            duration: time,
                            participantCount: participants.length,
                            participantList: participants.map((p) => "<@"+p+">").join("\n")
                        });
                        if(participants.length > 1 && data.guild.disabledCategories && !data.guild.disabledCategories.includes("Economy")){
                            message.sendT("fun/findwords:CREDITS", {
                                winner: user.username
                            });
                            let userdata = await message.client.findOrCreateMember({ id: user.id, guildID: message.guild.id });
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