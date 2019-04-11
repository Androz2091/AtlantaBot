const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Welcome extends Command {

    constructor (client) {
        super(client, {
            name: "welcome",
            description: (language) => language.get('WELCOME_DESCRIPTION'),
            dirname: __dirname,
            usage: "welcome",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$welcome",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(args[0] === 'test'){
            this.client.emit('guildMemberAdd', message.member);
            return message.channel.send(message.language.get('WELCOME_TEST'))
        }

        if(guild_data.welcome.status == 'on'){
            this.client.databases[1].set(message.guild.id+'.welcome.status', 'off');
            this.client.databases[1].set(message.guild.id+'.welcome.channel', 'unknow');
            this.client.databases[1].set(message.guild.id+'.welcome.withImage', 'unknow');
            this.client.databases[1].set(message.guild.id+'.welcome.message', 'unknow');
            return message.channel.send(message.language.get('WELCOME_DISABLED', guild_data.prefix));
        }

        message.channel.send(message.language.get('WELCOME1', message.author.username));
        
        // Init new welcome object 
        var welcome = {
            status:'on',
            channel:'unknow',
            withImage:'false',
            message:'unknow'
        };

        // Creates discordjs message collector
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 120000 }); // 2 min

        // When a message is received 

        collector.on('collect', msg => {

            if(welcome.message !== 'unknow'){
                if(msg.content.toLowerCase() == message.language.get('YES')){
                    welcome.withImage = 'true';
                    message.channel.send(message.language.get('WELCOME_SUCCESS', welcome.channel, guild_data.prefix));
                    // Updates db
                    this.client.databases[1].set(`${message.guild.id}.welcome`, welcome);
                    collector.stop();
                } else if(msg.content.toLowerCase() == 'non'){
                    welcome.withImage = 'false';
                    message.channel.send(message.language.get('WELCOME_SUCCESS', welcome.channel, guild_data.prefix));
                    // Updates db
                    this.client.databases[1].set(`${message.guild.id}.welcome`, welcome);
                    collector.stop();
                } else return message.channel.send(message.language.get('YES_OR_NO')); // if the message is not "yes" and not "no"
            }

            if(welcome.channel !== 'unknow' && welcome.message === 'unknow'){
                if(msg.content.length < 1501){
                    welcome.message = msg.content;
                    message.channel.send(message.language.get('WELCOME3'));
                } else return message.channel.send(message.language.get('WELCOME_CARACT'));
            }

            if(welcome.channel === 'unknow'){
                var channel = msg.mentions.channels.first();
                if(!channel) return message.channel.send(message.language.get('MENTION_CHANNEL'));
                else welcome.channel = channel.id;
                message.channel.send(message.language.get('WELCOME2', channel, message));
            }

        });

        // When the collector is stopped
        collector.on('end', (collected, reason) => {
            if(reason === 'time') return message.channel.send(message.language.get('WELCOME_TIMEOUT')); 
        });
    }

}

module.exports = Welcome;