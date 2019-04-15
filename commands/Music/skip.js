const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Skip extends Command {

    constructor (client) {
        super(client, {
            name: "skip",
            description: (language) => language.get('SKIP_DESCRIPTION'),
            dirname: __dirname,
            usage: "skip",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            examples: "$skip",
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

        // Stop the dispatcher
        sQueue.connection.dispatcher.end();

        // Send a success message
        message.channel.send(message.language.get('SKIP_SUCCESS'))
        
    }

}

module.exports = Skip;