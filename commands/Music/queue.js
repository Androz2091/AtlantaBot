const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Queue extends Command {

    constructor (client) {
        super(client, {
            name: "queue",
            description: (language) => language.get('QUEUE_DESCRIPTION'),
            dirname: __dirname,
            usage: "queue",
            enabled: true,
            guildOnly: true,
            aliases: ["playlist"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            examples: "$queue",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the queue
        let queue = this.client.queues.get(message.guild.id);

        // Gets the voice channel of the member
        let voice = message.member.voiceChannel;
        if (!voice) return message.channel.send(message.language.get('PLAY_VOICE_CHANNEL'));

        // if there is no music in the guild
        if(!queue) return message.channel.send(message.language.get('PLAY_NOT_PLAYING'));

        let index = 0;

        // Generate discord embed to display the songs list
        const embed = new Discord.RichEmbed()
            .addField(message.language.get('QUEUE_HEADER'), queue.songs.map(song => `#${++index} - \`${song.title}\`\n`))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setTimestamp();
        
        // Then, send the embed in the current channel
        message.channel.send(embed);
        
    }

}

module.exports = Queue;