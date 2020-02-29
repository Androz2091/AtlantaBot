const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        const { channel } = message.member.voice;
        if (!channel) return message.error("music/play:NO_VOICE_CHANNEL");

        const permissions = channel.permissionsFor(this.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
            return message.error("music/play:VOICE_CHANNEL_CONNECT");

        if (!args[0]) return message.error("music/play:MISSING_SONG_NAME");

        const player = this.client.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel: channel,
            selfDeaf: true
        });
        const res = await this.client.music.search(
            args.join(" "),
            message.author
        );

        // If a track was found
        if (res.loadType === "TRACK_LOADED") {
            if (res.tracks[0].isStream) {
                if (res.tracks[0].uri.startsWith("https://www.you")) {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate(
                                "music:play/STREAMS_NOT_SUPPORTED"
                            )
                        )
                        .setColor(this.client.config.embed.color);
                    return message.channel.send(errorEmbed);
                }
            } else {
                // Add the song to the queue and play it
                player.queue.add(res.tracks[0]);
                if (!player.playing) player.play();
            }
        }

        // If there are results
        if (res.loadType === "SEARCH_RESULT") {
            let index = 1;
            const tracks = res.tracks.slice(0, 10);
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL()
                )
                .setDescription(
                    tracks.map(video => `**${index++} -** ${video.title}`)
                )
                .setFooter(message.translate("music/play:RESULTS_FOOTER"))
                .setColor(this.client.config.embed.color);
            await message.channel.send(embed);

            const collector = message.channel.createMessageCollector(
                m =>
                    m.author.id === message.author.id &&
                    /^([1-5]|cancel)$/i.test(m.content),
                {
                    time: 30000,
                    max: 1
                }
            );

            collector.on("collect", m => {
                if (/cancel/i.test(m.content)) {
                    return collector.stop("cancel");
                }
                const track = tracks[parseInt(m.content) - 1];
                player.queue.add(track);
                if (!player.playing) {
                    player.play();
                    const nowPlayingEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate("music/play:NOW_PLAYING", {
                                songName: track.title
                            })
                        )
                        .setColor(this.client.config.embed.color);
                    return message.channel.send(nowPlayingEmbed);
                } else {
                    const queuedEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate("music/play:QUEUED", {
                                songName: track.title
                            })
                        )
                        .setColor(this.client.config.embed.color);
                    return message.channel.send(queuedEmbed);
                }
            });

            collector.on("end", (_collected, reason) => {
                if (reason === "time" || reason === "collected") {
                    if (!player.playing)
                        this.client.music.players.destroy(message.guild.id);
                    const cancelledEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate("music/play:CANCELLED")
                        )
                        .setColor(this.client.config.embed.color);
                    return message.channel.send(cancelledEmbed);
                }
            });
        }

        if (res.loadType === "PLAYLIST_LOADED") {
            res.playlist.tracks.forEach(track => {
                player.queue.add(track);
            });
            let playing = player.playing;
            if (!playing) {
                player.play();
                const nowPlayingEmbed = new Discord.MessageEmbed()
                    .setDescription(
                        message.translate("music/play:NOW_PLAYING", {
                            songName: res.playlist.tracks[0].title
                        })
                    )
                    .setColor(this.client.config.embed.color);
                message.channel.send(nowPlayingEmbed);
            }
            const playlistLoaded = new Discord.MessageEmbed()
                .setDescription(
                    message.translate("music/play:PLAYLIST_LOADED", {
                        count: playing ? res.playlist.tracks.length : res.playlist.tracks.length - 1
                    })
                )
                .setColor(this.client.config.embed.color);
            return message.channel.send(playlistLoaded);
        }

        if (res.loadType === "LOAD_FAILED") {
            const loadFailedEmbed = new MessageEmbed()
                .setDescription(message.translate("music/play:ERROR"))
                .setColor(this.client.config.embed.color);
            return message.channel.send(loadFailedEmbed);
        }
    }
};
