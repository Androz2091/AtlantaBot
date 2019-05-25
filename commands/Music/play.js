const Command = require("../../base/Command.js"),
Discord = require('discord.js');

const ytdl = require("ytdl-core"); // ytdl core, to get the music
const Youtube = require("simple-youtube-api"); // simple youtube api to get the url of a song

const Music = require('../../base/Music.js');

async function handleVideo (client, vde, msg, voice, data) {

    // Get the queue in the discord collection
    var queue = client.queues.get(msg.guild.id);

    // Create new song with the video parameter
    var song = new Music.Song(msg.author, vde);

    // If there is no queue
    if(!queue){

        // Create new guild music
        var music = new Music.Guild(msg.channel, voice);

        // Save the queue in the discord collection
        client.queues.set(msg.guild.id, music);

        // Update the queue
        queue = music;

        // Update the queue songs 
        queue.songs.push(song);

        // Join the channel
        voice.join().then(c => {
            // Update connection
            queue.connection = c;
            // Play the music
            play(client, msg, song, data);
        }).catch(err => {
            console.log(err)
            // if there is an error, display an error message
            msg.channel.send(msg.language.get('PLAY_CANT_JOIN'));
            // Update discord guild queue
            return client.queues.delete(msg.guild.id);
        });
    } else {
        // Add the song to the queue
        queue.songs.push(song);
        // Send a success message 
        return msg.channel.send(msg.language.get('PLAY_ADDED_TO_QUEUE', song.title));
    }
}

function play (client, msg, song, data, stop) {

    // Get the queue in the discord collection
    var queue = client.queues.get(msg.guild.id);

    // If there is no song in the queue
    if(!song){
        if(!stop) msg.channel.send(msg.language.get('PLAY_NO_SONG'));
        // Disconnect from the voice channel
        queue.voice.leave();
        // Update queue discord collection
        return client.queues.delete(msg.guild.id);
    } else {

        // Generate and send an embed
        var music_embed = new Discord.RichEmbed()
            .setAuthor(msg.language.get('PLAY_PLAYING'))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setThumbnail(song.raw.snippet.thumbnails.default.url)
            .setTimestamp()
            .setURL(song.url)
            .addField(msg.language.get('PLAY_UTILS')[0], song.title, true)
            .addField(msg.language.get('PLAY_UTILS')[1], song.channel, true)
            .addField(msg.language.get('PLAY_UTILS')[2], msg.language.convertMs(song.ms), true);
        msg.channel.send(music_embed);

        /// Play the music in the channel
        var opt = {filter:`audioonly`};
        queue.connection.playStream(ytdl(song.url, opt))
            // When the music ended
            .on('end', (stop) => {
                // remove the current song from the queue
                queue.songs.shift();
                // then play the next song
                return play(client, msg, queue.songs[0], data, stop);
            }).on('error', (err) => {
                // if there is an error
                queue.channel.send(msg.language.get('AN_ERROR_OCCURENCED')); // Send an error message
                // then log the error
                client.logger.log(err, 'error');
            }).setVolumeLogarithmic(queue.volume / 200); // Sets the volume

    }
}

class Play extends Command {

    constructor (client) {
        super(client, {
            name: "play",
            description: (language) => language.get('PLAY_DESCRIPTION'),
            dirname: __dirname,
            usage: "play [name]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$play Alan Walker",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // Log with the simple youtube api key
        const ytb = new Youtube(this.client.config.apiKeys.simple_youtube_api);
        const client = this.client;

        // Gets the video name
        var name = args.join(' ');
        if(!name) return message.channel.send(message.language.get('PLAY_PROVIDE_A_NAME'));

        // Get the url link (if there is one)
        var url = args[0].replace(/<(.+)>/g, "$1");

        // Gets the member voice channel
        var voice = message.member.voiceChannel;
        if(!voice) return message.channel.send(message.language.get('PLAY_VOICE_CHANNEL'));

        // Check my permissions
        var perms = voice.permissionsFor(client.user);
        if(!perms.has('CONNECT') || !perms.has('SPEAK')) return message.channel.send(message.language.get('PLAY_PERMS'))

        // Gets the video
        var video = null;
        // Try to get video from args[0]
        ytb.getVideo(url).then(vde => {
            // if a video was found, play them
            if(vde) video = vde;
            return handleVideo(client, video, message, voice, data);
        }).catch(err => {
            // if the args are not an url
            try {
                // Search the video on youtube
                ytb.searchVideos(name, 10).then(found => {

                    let index = 0;

                    // Display the results
                    var embed = new Discord.RichEmbed()
                        .addField(message.language.get('PLAY_UTILS')[3], `${found.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}\n\n\n${message.language.get('PLAY_SEARCH')}`)
                        .setColor(data.embed.color)
                        .setFooter(data.embed.footer);
                    message.channel.send(embed);

                    // Await messages
                    message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, { max: 1, time: 20000, errors: ['time'] })
                    .then(answers => {
                        // Gets the number that the member typed
                        let index = parseInt(answers.first().content);
                        // Then, get video and play them
                        ytb.getVideoByID(found[index-1].id).then(vde => {
                            return handleVideo(client, vde, message, voice, data);
                        });
                    }).catch(err => {
                        // if the member has not responded before 20 seconds
                        return message.channel.send(message.language.get('PLAY_TIMEOUT'));
                    });
                });
            } catch (err){
                // if the song is not found
                return message.channel.send(message.language.get('PLAY_404'));
            }
        });

    }

}

module.exports = Play; 