const Command = require("../../base/Command.js"),
Discord = require("discord.js");

let currentGame = false;

class Number extends Command {

    constructor (client) {
        super(client, {
            name: "number",
            description: (language) => language.get("NUMBER_DESCRIPTION"),
            usage: (language) => language.get("NUMBER_USAGE"),
            examples: (language) => language.get("NUMBER_EXAMPLES"),
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
                return message.channel.send(message.language.get("ERR_GAME_IS_ALREADY_LAUNCHED"));
            } else {
                let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(message.language.get("ERR_A_GAME_IS_ALREADY_LAUNCHED"))
                .setColor(data.config.embed.color)
                .setFooter(data.config.embed.footer)
                return message.channel.send(embed);
            }
        }
    
        let participants = [],
        number = message.client.functions.randomNum(1, 5000);

        message.channel.send(message.language.get("NUMBER_START"));

        // Store the date wich the game has started
        let createdAt = Date.now();

        // Create collector
        let collector = new Discord.MessageCollector(message.channel, (m) => !m.author.bot, {
            time: 480000
        });
        currentGame = message.guild.id; // Set the current game to the guild id
    
        collector.on("collect", async (msg) => {
    
            if(!participants.includes(msg.author.id)){
                participants.push(msg.author.id);
            }
        
            // if it's not a number, return
            if(isNaN(msg.content)){
                return;
            }
    
            if(parseInt(msg.content) === number){
                let time = message.language.convertMs(Date.now() - createdAt);
                message.channel.send(message.language.get("NUMBER_STATS", msg.author, number, time, participants.length, participants.map((p) => "<@"+p+">").join("\n")));
                message.channel.send(message.language.get("NUMBER_CONGRATS", msg.author.id));
                let userdata = await message.client.usersData.findOne({id: msg.author.id});
                userdata.money = userdata.money + 10;
                userdata.save();
                collector.stop(msg.author.username);
            }
            if(parseInt(msg.content) < number){
                message.channel.send(message.language.get("NUMBER_HIGHER", msg.content, msg.author));
            }
            if(parseInt(msg.content) > number){
                message.channel.send(message.language.get("NUMBER_SMALLER", msg.content, msg.author));
            }
    
        });
    
        collector.on("end", (collected, reason) => {
            currentGame = false;
            if(reason === "time"){
                return message.channel.send(message.language.get("NUMBER_DEFEAT", number));
            }
        });

    }

}

module.exports = Number;