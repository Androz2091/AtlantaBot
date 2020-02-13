const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Resume extends Command {

    constructor (client) {
        super(client, {
            name: "resume",
            description: (language) => language.get("RESUME_DESCRIPTION"),
            usage: (language) => language.get("RESUME_USAGE"),
            examples: (language) => language.get("RESUME_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let queue = this.client.player.getQueue(message.guild.id);

        let voice = message.member.voice.channel;
        if (!voice){
            return message.channel.send(message.language.get("PLAY_ERR_VOICE_CHANNEL"));
        }

        if(!queue){
            return message.channel.send(message.language.get("PLAY_ERR_NOT_PLAYING"));
        }

        // Gets the current song
        let song = await this.client.player.resume(message.guild.id);
        
        // Send the embed in the current channel
        message.channel.send(message.language.get("RESUME_SUCCESS"));
        
    }

}

module.exports = Resume;