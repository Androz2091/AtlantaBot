const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Np extends Command {

    constructor (client) {
        super(client, {
            name: "np",
            description: (language) => language.get('NP_DESCRIPTION'),
            dirname: __dirname,
            usage: "np",
            enabled: true,
            guildOnly: true,
            aliases: ["now-playing"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            examples: "$np",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Gets the guild queue
        let queue = this.client.queues.get(message.guild.id);

        // Gets the voice channel of the member
        let voice = message.member.voiceChannel;
        if (!voice) return message.channel.send(message.language.get('PLAY_VOICE_CHANNEL'));

        // if there is no music played in the guild
        if(!queue) return message.channel.send(message.language.get('PLAY_NOT_PLAYING'));

        // Gets the current song
        let song = queue.songs[0];

        // Generate discord embed to display song informations
        const embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('PLAY_PLAYING'))
            .setThumbnail(song.raw.snippet.thumbnails.default.url)
            .addField(message.language.get('PLAY_UTILS')[0], song.title, true)
            .addField(message.language.get('PLAY_UTILS')[1], song.channel, true)
            .addField(message.language.get('PLAY_UTILS')[4], `${message.language.printDate(new Date(song.raw.snippet.publishedAt))}`, true)
            .addField(message.language.get('PLAY_UTILS')[5], song.raw.snippet.description ? (song.raw.snippet.description.length > 1024 ? song.raw.snippet.description.substring(0, 1000) + '\n**__etc...__**' : song.raw.snippet.description) : "**Pas de description**", true)
            .setTimestamp()
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);
        
        // Send the embed in the current channel
        message.channel.send(embed);
        
    }

}

module.exports = Np;