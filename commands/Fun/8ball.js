const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Eightball extends Command {

    constructor (client) {
        super(client, {
            name: "8ball",
            description: (language) => language.get('EIGHTBALL_DESCRIPTION'),
            dirname: __dirname,
            usage: "8ball [question]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$8ball Am I beautiful ?",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // gets the question
        if(!args[0]) return message.channel.send(message.language.get('EIGHTBALL_QUESTION'));

        // Gets the list of answers
        let replies = message.language.get('EIGHTBALL_QUESTIONS');
        
        // determines which response will be sent
        let result = Math.floor((Math.random() * replies.length));

        // Send the answer
        message.channel.send(message.author.username+', '+replies[result]);
    }

}

module.exports = Eightball;