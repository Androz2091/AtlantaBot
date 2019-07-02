const Music = require("../base/Music.js"),
ytdl = require("ytdl-core"),
Discord = require("discord.js");

async function handleVideo (client, video, message, voice, data) {

    let queue = client.queues.get(message.guild.id);
    let song = new Music.Song(message.author, video);

    if(!queue){
        queue = new Music.Guild(message.channel, voice);
        client.queues.set(message.guild.id, queue);
        queue.songs.push(song);
        let connection = await voice.join().catch((err) => {
            msg.channel.send(message.language.get("PLAY_ERR_CANT_JOIN"));
            return client.queues.delete(message.guild.id);
        });
        queue.connection = connection;
        play(client, message, song, data);
    } else {
        queue.songs.push(song);
        return message.channel.send(message.language.get("PLAY_ADDED_TO_QUEUE", song.title));
    }
}

async function play (client, message, song, data, stop) {

    let queue = client.queues.get(message.guild.id);

    if(!song){
        if(!stop){
            message.channel.send(message.language.get("PLAY_ERR_NO_SONG"));
        }
        queue.voice.leave();
        return client.queues.delete(message.guild.id);
    } else {

        let mEmbed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("PLAY_PLAYING_TITLE"))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .addField(message.language.get("PLAY_HEADINGS")[0], song.title, true)
            .addField(message.language.get("PLAY_HEADINGS")[1], song.channel, true)
            .addField(message.language.get("PLAY_HEADINGS")[2], message.language.convertMs(song.ms), true)
            .setTimestamp();

        message.channel.send(mEmbed);

        let disp = queue.connection.play(ytdl(song.url, { filter: "audioonly" }));
        disp.setVolumeLogarithmic(queue.volume / 200);
        
        disp.on("finish", (stop) => {
            queue.songs.shift();
            return play(client, message, queue.songs[0], data, stop);
        });
        
        disp.on("error", (err) => {
            queue.text.send(message.language.get("ERR_OCCURENCED")); // Send an error message
            client.logger.log(err, "error");
        });

    }
}

module.exports = {
    handleVideo,
    play
}