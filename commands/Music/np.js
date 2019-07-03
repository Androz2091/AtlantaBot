const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Np extends Command {

    constructor (client) {
        super(client, {
            name: "np",
            description: (language) => language.get("NP_DESCRIPTION"),
            usage: (language) => language.get("NP_USAGE"),
            examples: (language) => language.get("NP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "nowplaying", "now-playing" ],
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

        // Gets the current song
        let song = queue.songs[0];

        // Generate discord embed to display song informations
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("PLAY_PLAYING_TITLE"))
            .setThumbnail(song.raw.snippet.thumbnails.default.url)
            .addField(message.language.get("PLAY_HEADINGS")[0], song.title, true)
            .addField(message.language.get("PLAY_HEADINGS")[1], song.channel, true)
            .addField(message.language.get("PLAY_HEADINGS")[6], message.language.convertMs(song.ms), true)
            .addField(message.language.get("PLAY_HEADINGS")[5], song.raw.snippet.description ? (song.raw.snippet.description.substring(0, 150)+"\n"+message.language.get("UTILS").ANDMORE) : message.language.get("NP_ERR_NO_DESC"), true)
            .setTimestamp()
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        
        // Send the embed in the current channel
        message.channel.send(embed);
        
    }

}

module.exports = Np;