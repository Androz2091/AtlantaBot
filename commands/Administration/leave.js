const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Ignore extends Command {

    constructor (client) {
        super(client, {
            name: "leave",
            description: (language) => language.get('LEAVE_DESCRIPTION'),
            dirname: __dirname,
            usage: "leave",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$leave",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(args[0] === 'test'){
            this.client.emit('guildMemberRemove', message.member);
            return message.channel.send(message.language.get('LEAVE_TEST'))
        }

        if(guild_data.leave.status == 'on'){
            this.client.databases[1].set(message.guild.id+'.leave.status', 'off');
            this.client.databases[1].set(message.guild.id+'.leave.channel', 'unknow');
            this.client.databases[1].set(message.guild.id+'.leave.withImage', 'unknow');
            this.client.databases[1].set(message.guild.id+'.leave.message', 'unknow');
            return message.channel.send(message.language.get('LEAVE_DISABLED', guild_data.prefix));
        }

        message.channel.send(message.language.get('LEAVE1', message.author.username));
        
        // Init new leave object 
        var leave = {
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

            if(leave.message !== 'unknow'){
                if(msg.content.toLowerCase() == message.language.get('YES').toLowerCase()){
                    leave.withImage = 'true';
                    message.channel.send(message.language.get('LEAVE_SUCCESS', leave.channel, guild_data.prefix));
                    // Updates db
                    this.client.databases[1].set(`${message.guild.id}.leave`, leave);
                    collector.stop();
                } else if(msg.content.toLowerCase() == message.language.get('NO').toLowerCase()){
                    leave.withImage = 'false';
                    message.channel.send(message.language.get('LEAVE_SUCCESS', leave.channel, guild_data.prefix));
                    // Updates db
                    this.client.databases[1].set(`${message.guild.id}.leave`, leave);
                    collector.stop();
                } else return message.channel.send(message.language.get('YES_OR_NO')); // if the message is not "yes" and not "no"
            }

            if(leave.channel !== 'unknow' && leave.message === 'unknow'){
                if(msg.content.length < 1501){
                    leave.message = msg.content;
                    message.channel.send(message.language.get('LEAVE3'));
                } else return message.channel.send(message.language.get('LEAVE_CARACT'));
            }

            if(leave.channel === 'unknow'){
                var channel = msg.mentions.channels.first();
                if(!channel) return message.channel.send(message.language.get('MENTION_CHANNEL'));
                else leave.channel = channel.id;
                message.channel.send(message.language.get('LEAVE2', channel, message));
            }

        });
        
        collector.on('end', (collected, reason) => {
            if(reason === 'time'){
                return message.channel.send(message.language.get('LEAVE_TIMEOUT'));
            }
        });
    }

}

module.exports = Ignore;