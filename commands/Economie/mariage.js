const Command = require("../../base/Command.js"),
Discord = require('discord.js');

// An object to store pending requests
var pendings = {};

class Weegind extends Command {

    constructor (client) {
        super(client, {
            name: "weeding",
            description: (language) => language.get('WEEDING_DESCRIPTION'),
            dirname: __dirname,
            usage: "weeding [@member]",
            enabled: true,
            guildOnly: true,
            aliases: ["mariage"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$weeding @member",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the first mentionned member
        var member = message.mentions.members.first();
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'));
        
        // if the message author is already wedded
        if(membersdata[0].partner !== 'false') return message.channel.send(message.language.get('WEEDING_AUTHOR_ALREADY', guild_data.prefix));
        // if the member is already wedded
        if(membersdata[1].partner !== 'false') return message.channel.send(message.language.get('WEEDING_MEMBER_ALREADY', member.user.username));

        for(var requester in pendings){

            var receiver = pendings[requester];

            // Check if message author has pending requests
            if(requester === message.author.id){
                var user =  this.client.users.get(receiver) || await this.client.fetchUser(receiver);
                return message.channel.send(message.language.get('WEEDING_AUTHOR_PENDING', user.username));
            } else if (receiver === message.author.id){
                var user =  this.client.users.get(requester) || await this.client.fetchUser(requester);
                return message.channel.send(message.language.get('WEEDING_AUTHOR_PENDING2', user.username));
            }

            // Check if member has pending requests
            if(requester === member.id){
                var user =  this.client.users.get(receiver) || await this.client.fetchUser(receiver);
                return message.channel.send(message.language.get('WEEDING_MEMBER_PENDING', user.username, member.user.username));
            } else if (receiver === member.id){
                var user =  this.client.users.get(requester) || await this.client.fetchUser(requester);
                return message.channel.send(message.language.get('WEEDING_MEMBER_PENDING2', user.username, member.user.username));
            }

        }

        // Update pending requests
        pendings[message.author.id] = member.id;

        message.channel.send(message.language.get('WEEDING_REQUEST', member, message.author));

        // Creates new collector
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === member.id, { time: 120000 });
        
        collector.on('collect', msg => {
            if(msg.content.toLowerCase() === message.language.get('YES').toLowerCase()){
                return collector.stop('yep');
            }
            if(msg.content.toLowerCase() === message.language.get('NO').toLowerCase()){
                return collector.stop('nop');
            }
        });

        collector.on('end', (collected, reason) => {
            // Delete request 
            delete pendings[message.author.id];
            if(reason === 'time'){
                return message.channel.send(message.language.get('WEEDING_TIMEOUT', member));
            }
            if(reason === 'yep'){
                // if the answer is yes
                this.client.databases[0].set(`${message.author.id}.partner`, member.id);
                this.client.databases[0].set(`${member.id}.partner`, message.author.id);
                return message.channel.send(message.language.get('WEEDING_SUCCESS', message.author, member));
            }
            if(reason === 'nop'){
                // if the answer is no
                return message.channel.send(message.language.get('WEEDING_DENIED', message.author, member));
            }

        });
    }

}

module.exports = Weegind;