const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Clear extends Command {

    constructor (client) {
        super(client, {
            name: "clear",
            description: (language) => language.get('CLEAR_DESCRIPTION'),
            dirname: __dirname,
            usage: "clear [amount] (@member)",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_MESSAGES",
            botpermissions: [ "SEND_MESSAGES", "MANAGE_MESSAGES" ],
            nsfw: false,
            examples: "$clear 100\n$clear 100 @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the amount of messages to delete
        var amount = args[0];
        if(!amount) return message.channel.send(message.language.get('CLEAR_AMOUNT'));

        message.delete();

        // Gets the first mentionned member
        var member = message.mentions.members.first();

        // Gets the messages to delete
        var messages = await message.channel.fetchMessages({limit:100}); // Fetch the last 100 messages in the channel
        messages = messages.array(); // Convert the discord collection to an array
        if(member) messages.filter(m => m.author.id === member.id); // if a member was mentionned, just get his message
        if(messages.length > amount) messages.length = parseInt(amount); // resize the array of messages

        // Delete the messages
        message.channel.bulkDelete(messages);

        // then send a success message
        if(member) return message.channel.send(message.language.get('CLEAR_CLEANED1', amount, member)).then(m => {
            setTimeout(function(){m.delete()},(2000)); // Delete the message after 2 second
        });
        else return message.channel.send(message.language.get('CLEAR_CLEANED2', amount)).then(m => {
            setTimeout(function(){m.delete()},(2000)); // Delete the message after 2 second
        });
        
    }

}

module.exports = Clear;