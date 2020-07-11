const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Np extends Command {

    constructor (client) {
        super(client, {
            name: "np",
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

        let queue = this.client.player.getQueue(message.guild.id);

        let voice = message.member.voice.channel;
        if (!voice){
            return message.error("music/play:NO_VOICE_CHANNEL");
        }

        if(!queue){
            return message.error("music/play:NOT_PLAYING");
        }

        // Gets the current song
        let song = await this.client.player.nowPlaying(message.guild.id)

        // Generate discord embed to display song informations
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.translate("music/np:CURRENTLY_PLAYING"))
            .setThumbnail(song.thumbnail)
            .addField(message.translate("music/np:T_TITLE"), song.name, true)
            .addField(message.translate("music/np:T_CHANNEL"), song.author, true)
            .addField(message.translate("music/np:T_DURATION"), this.client.functions.convertTime(message.guild, song.duration), true)
            .addField(message.translate("music/np:T_DESCRIPTION"),
                song.raw.snippet.description ?
                (song.raw.snippet.description.substring(0, 150)+"\n"+(message.translate("common:AND_MORE").toLowerCase())) : message.translate("music/np:NO_DESCRIPTION"), true)
            .setTimestamp()
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        
        // Send the embed in the current channel
        message.channel.send(embed);
        
    }

}

module.exports = Np;