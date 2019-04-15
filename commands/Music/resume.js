const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Resume extends Command {

    constructor (client) {
        super(client, {
            name: "resume",
            description: (language) => language.get('RESUME_DESCRIPTION'),
            dirname: __dirname,
            usage: "resume",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            examples: "$resume",
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

        // if the music is not paused
        if(queue.playing) return message.channel.send(message.language.get('RESUME_NOT_PAUSED'));

        // Play the music
        queue.playing = true;
        await queue.connection.dispatcher.resume();
        
        // send a success message
        message.channel.send(message.language.get('RESUME_SUCCESS'));
    }

}

module.exports = Resume;