const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Stop extends Command {

    constructor (client) {
        super(client, {
            name: "stop",
            description: (language) => language.get('STOP_DESCRIPTION'),
            dirname: __dirname,
            usage: "stop",
            enabled: true,
            guildOnly: true,
            aliases: ["leave"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$stop",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the guild queue
        let queue = this.client.queues.get(message.guild.id);

        // Gets the voice channel of the member
        let voice = message.member.voiceChannel;
        if (!voice) return message.channel.send(message.language.get('PLAY_VOICE_CHANNEL'));

        // if there is no music in the guild
        if(!queue) return message.channel.send(message.language.get('PLAY_NOT_PLAYING'));
        
        // Reset song array
        queue.songs = [];
        queue.connection.dispatcher.end(true);
        
        // Send success message
        message.channel.send(message.language.get('STOP_SUCCESS'));
        
    }

}

module.exports = Stop;