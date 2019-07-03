const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Queue extends Command {

    constructor (client) {
        super(client, {
            name: "queue",
            description: (language) => language.get("QUEUE_DESCRIPTION"),
            usage: (language) => language.get("QUEUE_USAGE"),
            examples: (language) => language.get("QUEUE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "playlist" ],
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

        let index = 0;
        let sQueue = queue.songs.map((song) => {
            let title = song.title;
            let author = song.channel;
            return `**${message.language.get("UTILS").TITLE}**: ${title}\n**${message.language.get("UTILS").AUTHOR}**: ${author}`;
        });

        // Generate discord embed to display the songs list
        let embed = new Discord.MessageEmbed()
            .addField(message.language.get("QUEUE_TITLE"), sQueue.join("\n-------\n"))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setTimestamp();
        
        // Then, send the embed in the current channel
        message.channel.send(embed);
        
    }

}

module.exports = Queue;