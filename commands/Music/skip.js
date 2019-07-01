const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Skip extends Command {

    constructor (client) {
        super(client, {
            name: "skip",
            description: (language) => language.get("SKIP_DESCRIPTION"),
            usage: (language) => language.get("SKIP_USAGE"),
            examples: (language) => language.get("SKIP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "next" ],
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
        if (!voice){
            return message.channel.send(message.language.get("PLAY_ERR_VOICE_CHANNEL"));
        }

        if(!queue){
            return message.channel.send(message.language.get("PLAY_ERR_NOT_PLAYING"));
        }

        queue.connection.dispatcher.end();

        // Send a success message
        message.channel.send(message.language.get("SKIP_SUCCESS"));
        
    }

}

module.exports = Skip;