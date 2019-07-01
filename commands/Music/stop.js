const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Stop extends Command {

    constructor (client) {
        super(client, {
            name: "stop",
            description: (language) => language.get("STOP_DESCRIPTION"),
            usage: (language) => language.get("STOP_USAGE"),
            examples: (language) => language.get("STOP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "leave" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let queue = message.client.queues.get(message.guild.id);

        let voice = message.member.voice.channel;
        if(!voice){
            return message.channel.send(message.language.get("PLAY_ERR_VOICE_CHANNEL"));
        }

        if(!queue){
            return message.channel.send(message.language.get("PLAY_ERR_NOT_PLAYING"));
        }
        
        // Reset song array
        queue.songs = [];
        queue.connection.dispatcher.end(true);
        
        // Send success message
        message.channel.send(message.language.get("STOP_SUCCESS"));
        
    }

}

module.exports = Stop;