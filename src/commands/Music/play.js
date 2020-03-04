const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER,
                clientPermissions: [ "EMBED_LINKS" ]
            },
            ...args
        );
    }

    async execute(message, args) {
        const { channel } = message.member.voice;
        if (!channel)
            return message.error(
                "music/play:NO_VOICE_CHANNEL",
                null,
                false,
                true
            );

        const permissions = channel.permissionsFor(this.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
            return message.error(
                "music/play:VOICE_CHANNEL_CONNECT",
                null,
                false,
                true
            );

        if (!args[0])
            return message.error(
                "music/play:MISSING_SONG_NAME",
                null,
                false,
                true
            );

        const player = this.client.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel: channel,
            selfDeaf: true
        });
        let errored = false;
        const res = await this.client.music
            .search(args.join(" "), message.author)
            .catch(() => {
                errored = true;
                const loadFailedEmbed = new Discord.MessageEmbed()
                    .setDescription(message.translate("music/play:ERROR"))
                    .errorColor();
                return message.channel.send(loadFailedEmbed);
            });
        if (!res) return;

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
                        .defaultColor();
                    return message.channel.send(errorEmbed);
                }
            } else {
                // Add the song to the queue and play it
                player.queue.add(res.tracks[0]);
                if (!player.playing) {
                    player.play();
                } else {
                    const queuedEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate("music/play:QUEUED", {
                                songName: res.tracks[0].title
                            })
                        )
                        .defaultColor();
                    return message.channel.send(queuedEmbed);
                }
            }
        }

        // If there are results
        else if (res.loadType === "SEARCH_RESULT") {
            let index = 1;
            const tracks = res.tracks.slice(0, 9);
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL()
                )
                .setDescription(
                    tracks.map(video => `**${index++} -** ${video.title}`)
                )
                .setFooter(message.translate("music/play:RESULTS_FOOTER"))
                .defaultColor();
            await message.channel.send(embed);

            const collector = message.channel.createMessageCollector(
                m =>
                    m.author.id === message.author.id &&
                    /^([1-9]|cancel)$/i.test(m.content),
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
                } else {
                    const queuedEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate("music/play:QUEUED", {
                                songName: track.title
                            })
                        )
                        .defaultColor();
                    return message.channel.send(queuedEmbed);
                }
            });

            collector.on("end", (_collected, reason) => {
                if (reason === "time" || reason === "cancel") {
                    if (!player.playing)
                        this.client.music.players.destroy(message.guild.id);
                    const cancelledEmbed = new Discord.MessageEmbed()
                        .setDescription(
                            message.translate("music/play:CANCELLED")
                        )
                        .defaultColor();
                    return message.channel.send(cancelledEmbed);
                }
            });
        } else if (res.loadType === "PLAYLIST_LOADED") {
            res.playlist.tracks.forEach(track => {
                player.queue.add(track);
            });
            let playing = player.playing;
            if (!playing) {
                player.play();
            }
            const playlistLoaded = new Discord.MessageEmbed()
                .setDescription(
                    message.translate("music/play:PLAYLIST_LOADED", {
                        count: playing
                            ? res.playlist.tracks.length
                            : res.playlist.tracks.length - 1
                    })
                )
                .defaultColor();
            return message.channel.send(playlistLoaded);
        } else if (!errored) {
            const loadFailedEmbed = new Discord.MessageEmbed()
                .setDescription(message.translate("music/play:ERROR"))
                .errorColor();
            return message.channel.send(loadFailedEmbed);
        }
    }
};
