const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Poll extends Command {

    constructor (client) {
        super(client, {
            name: "poll",
            description: (language) => language.get('POLL_DESCRIPTION'),
            dirname: __dirname,
            usage: "poll [question]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MENTION_EVERYONE",
            botpermissions: [ "SEND_MESSAGES", "MENTION_EVERYONE" ],
            nsfw: false,
            examples: "$poll A new channel?",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var client = this.client;

        // Gets the question
        var question = args.join(" ");
        if(!question) return message.channel.send(message.language.get('POLL_QUESTION'));

        // Delete the message
        message.delete().catch(O_o=>{});

        var mention = '';
            
        message.channel.send(message.language.get('POLL_MENTION')).then(msg => {

            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 240000 });
            
            collector.on('collect', tmsg => {
        
                if(tmsg.content.toLowerCase() === message.language.get('NO').toLowerCase()){
                    tmsg.delete();
                    msg.delete();
                    collector.stop('ok');
                }
                
                if(tmsg.content.toLowerCase() === message.language.get('YES').toLowerCase()){
                    tmsg.delete();
                    msg.delete();
                    message.channel.send(message.language.get('POLL_MENTION2')).then(tmsg1 => {
                        var c = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
                        c.on('collect', m => {
                            if(m.content.toLowerCase() === 'here'){
                                mention = '@here';
                                tmsg1.delete();
                                m.delete();
                                collector.stop('ok');
                                c.stop('ok');
                            } else if(m.content.toLowerCase() === 'every'){
                                mention = '@everyone';
                                tmsg1.delete();
                                m.delete();
                                collector.stop('ok');
                                c.stop('ok');
                            }
                        });
                        c.on('end', (collected, reason) => {
                            if(reason === 'time') return message.channel.send(message.language.get('POLL_TIMEOUT'));
                        });
                    });
                }
            });
        
            collector.on('end', (collected, reason) => {
        
                if(reason === "time") return message.channel.send(message.language.get('POLL_TIMEOUT'));
        
                // Gets the emote
                var emotes = [
                    client.emojis.find(e => e.name === 'atlanta_success'),
                    client.emojis.find(e => e.name === 'atlanta_error')
                ];

                let embed = new Discord.RichEmbed()
                    .setAuthor(message.language.get('POLL_HEADING'))
                    .setColor(data.embed.color)
                    .addField(question, message.language.get('POLL_REACT'));
                
                // Send the embed and then react with the emotes
                message.channel.send(mention, embed).then(async m => {
                    await m.react(emotes[0]);
                    await m.react(emotes[1]);
                });
        
            });
        });
    }

}

module.exports = Poll;