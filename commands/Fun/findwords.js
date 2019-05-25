const Command = require("../../base/Command.js"),
Discord = require('discord.js');

var fs = require('fs');
var ms = require('ms');
var cgame = false;

class FindWords extends Command {

    constructor (client) {
        super(client, {
            name: "findwords",
            description: (language) => language.get('FINDWORDS_DESCRIPTION'),
            dirname: __dirname,
            usage: "findwords",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$findwords",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // if a game is already started
        if(cgame){
            if(cgame === message.guild.id) return message.channel.send(message.language.get('GAME_ALREADY_LAUNCHED'));
            else {
                var embed = new Discord.RichEmbed()
                    .setAuthor('Hi, '+message.author.username, message.author.displayAvatarURL)
                    .setDescription(message.language.get('A_GAME_ALREADY_LAUNCHED'))
                    .setColor(data.embed.color)
                    .setFooter(data.embed.footer)
                return message.channel.send(embed);
            }
        }

        // Reads words file
        var text = fs.readFileSync(`./data/words-${message.language.getLang()}.txt`).toString('utf-8');
        var words_array = text.split("\n");
    
        // Init some utils variables
        var participants = [];
        var gagnants = [];
        var nbgames = 4;
        var client = this.client;

        // Store the date wich the game has started
        var creation_date = Date.now(); // 20929038303
    
        // Get four random words
        var results = [
            Math.floor((Math.random() * words_array.length)),
            Math.floor((Math.random() * words_array.length)),
            Math.floor((Math.random() * words_array.length)),
            Math.floor((Math.random() * words_array.length))
        ];

        var words = [
            words_array[results[0]], 
            words_array[results[1]],
            words_array[results[2]], 
            words_array[results[3]]
        ];

        words = [ words[0].substring(0, 3), words[1].substring(0, 3), words[2].substring(0, 3), words[3].substring(0, 3) ];

        var _i = 0; // Inits i variable to count games
        cgame = message.guild.id; // Update cgame (current game) variable
        generegame(words[_i]); // Generate a new round
    
        function generegame(mot){
    
            // Launch timer
            var delai = (_i === 0) ? 10000 : 0;
            if(_i === 0) message.channel.send(message.language.get('FINDWORDS_TIMER'));
    
            setTimeout(function(){
                
                // Send announcment message
                message.channel.send(message.language.get('FINDWORDS_20S', mot));
    
                // init a collector to receive the answers
                var collector = new Discord.MessageCollector(message.channel, m => !m.author.bot, { time: ms('20s') });
    
                collector.on('collect', (msg) => {
                    if(!participants.includes(msg.author.id)) participants.push(msg.author.id);
                    if(msg.content.toLowerCase().indexOf(mot) >= 0 && words_array.indexOf(msg.content.toLowerCase()) >= 0){ // vacarme
                        collector.stop(msg.author.id); // Stop the collector
                    } else msg.channel.send(message.language.get('FINWORDS_INVALID_WORD', msg.author));
                });
    
                collector.on('end', (collected, reason) => {
                    if(reason === 'time') message.channel.send(message.language.get('FINDWORDS_NOBODY')); 
                    else {
                        message.channel.send(message.language.get('FINDWORDS_GG', reason));
                        gagnants.push(reason);
                    }
                    if( _i < nbgames - 1) {
                        _i++;
                        generegame(words[_i]);
                    } else {
                        cgame = false;
                        if(gagnants.length < 1) return message.channel.send(message.language.get('FINDWORDS_NOBODY2'));
                        var winner_data = getWinner(participants, message);
                        console.log(winner_data);
                        var time = message.language.convertMs(Date.now() - creation_date);
                        message.channel.send(message.language.get('FINDWORDS_GG2', winner_data[0], winner_data[1], nbgames, time, participants.length, participants.map(p => '<@'+p+'>').join('\n')));
                        if(participants.length > 1){
                            // Add 15 credits to the winner
                            message.channel.send(message.language.get('FINDWORDS_END', winner_data[0]));
                            client.databases[0].add(winner_data[0].id+'.stats.findwords.wins', 1);
                            client.databases[0].add(winner_data[0].id+'.credits', 15);
                        }
                    }
                });
            }, delai);
        }

        function getWinner(array, m){
            var _tab = [];
            gagnants.forEach(element =>{
                if(!_tab[element]) _tab[element] = 1;
                else _tab[element] = _tab[element] + 1; 
            });
            console.log(_tab);
            var _winner;
            var _score_max = 0;
            for (var user in _tab){
                var score = _tab[user];
                if(score > _score_max){
                    _score_max = score;
                    _winner = user;
                }
            };
            console.log(_winner)
            _winner = m.guild.members.get(_winner) || _winner;
            return [_winner, _score_max];
        }
    }

}

module.exports = FindWords;