const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Pause extends Command {

    constructor (client) {
        super(client, {
            name: "pause",
            description: (language) => language.get('PAUSE_DESCRIPTION'),
            dirname: __dirname,
            usage: "pause",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            examples: "$pause",
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

        // if the music is already paused
        if(!queue.playing) return message.channel.send(message.language.get('PAUSE_ALREADY'));

        // Paused the music
        queue.playing = false;
        await queue.connection.dispatcher.pause();
        
        // send a success message in the current channel
        message.channel.send(message.language.get('PAUSE_SUCCESS', guild_data.prefix));
    }

}

module.exports = Pause;