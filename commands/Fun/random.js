const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Random extends Command {

    constructor (client) {
        super(client, {
            name: "random",
            description: (language) => language.get('RANDOM_DESCRIPTION'),
            dirname: __dirname,
            usage: "random [choice1/choice2/etc...]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$random Hello/World/How/Are/You",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the answers by spliting on "/"
        var answers = args.join(' ').split('/');
        if(answers.length < 2) return message.channel.send(message.language.get('RANDOM_2_CHOICES'))
        if(answers.some(e => e === '')) return message.channel.send(message.language.get('RANDOM_BLANK'))

        message.channel.send(message.language.get('RANDOM_WAIT')).then(m =>{
            setTimeout(function(){
                m.edit(message.language.get('RANDOM_CHOOSED'));
                message.channel.send('```'+answers[Math.floor((Math.random()*answers.length))]+'```');
            }, 1500);
        });
        
    }

}

module.exports = Random;