const Command = require("../../base/Command.js"),
Discord = require('discord.js');

var ms = require('ms');
var cgame = false;

class Number extends Command {

    constructor (client) {
        super(client, {
            name: "number",
            description: (language) => language.get('NUMBER_DESCRIPTION'),
            dirname: __dirname,
            usage: "number",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$number",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(cgame){
            if(cgame === message.guild.id) return message.channel.send(message.language.get('GAME_IS_ALREADY_LAUNCHED'));
            else {
                var embed = new Discord.RichEmbed()
                .setAuthor('Hi '+message.author.username, message.author.displayAvatarURL)
                .setDescription(message.language.get('A_GAME_IS_ALREADY_LAUNCHED'))
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)
                return message.channel.send(embed);
            }
        }
    
        var participants = [];
    
        var number = RandNum(); // gets the number

        message.channel.send(message.language.get('NUMBER_START'));

        // Store the date wich the game has started
        var creation_date = Date.now();

        // Create collector
        const collector = new Discord.MessageCollector(message.channel, m => !m.author.bot, { time: ms('10m') });
        cgame = message.guild.id; // Set the current game to the guild id
    
        collector.on('collect', message => {
    
            if(!participants.includes(message.author.id)) participants.push(message.author.id);
    
            var tnumber = message.content;
    
            // if it's not a number, return
            if(isNaN(tnumber)) return;
    
            if(parseInt(tnumber) === number){
                var time = message.language.convertMs(Date.now() - creation_date);
                message.channel.send(message.language.get('NUMBER_GG1', message.author, number, time, participants.length, participants.map(p => '<@'+p+'>').join('\n')));
                message.channel.send(message.language.get('NUMBER_GG2', message.author.id));
                this.client.databases[0].add(`${message.author.id}.credits`, 10);
                this.client.databases[0].add(`${message.author.id}.stats.number.wins`, 1);
                collector.stop(message.author.username);
            }
            if(parseInt(tnumber) < number) message.channel.send(message.language.get('NUMBER_HIGHER', tnumber, message.author));
            if(parseInt(tnumber) > number) message.channel.send(message.language.get('NUMBER_SMALLER', tnumber, message.author));
    
        });
    
        collector.on('end', (collected, reason) => {
            cgame = false;
            if(reason === 'time') return message.channel.send(message.language.get('NUMBER_LOOSE', number));
        });
    
        function RandNum(){
            var min=1; 
            var max=5000;  
            var num = Math.floor(Math.random() * (+max - +min)) + +min; 
            return num;
        }        
    }

}

module.exports = Number;