const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Play extends Command {

    constructor (client) {
        super(client, {
            name: "play",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "joue" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        if(!data.config.apiKeys.simpleYoutube || data.config.apiKeys.simpleYoutube.length == ""){
            return message.error("misc:COMMAND_DISABLED");
        }

        let isPlaying = this.client.player.isPlaying(message.guild.id);

        let name = args.join(" ");
        if(!name){
            return message.error("music/play:MISSING_SONG_NAME");
        } 

        let url = args[0].replace(/<(.+)>/g, "$1");

        let voice = message.member.voice.channel;
        if(!voice){
            return message.error("music/play:NO_VOICE_CHANNEL")
        }

        // Check my permissions
        let perms = voice.permissionsFor(message.client.user);
        if(!perms.has("CONNECT") || !perms.has("SPEAK")){
            return message.error("music/play:VOICE_CHANNEL_CONNECT");
        }

        let youtube = this.client.player.SYA;
        let video = null;

        video = await youtube.getVideo(url).catch((err) => {});

        if(!video){
            try {
                let videos = await youtube.searchVideos(name, 7);
                let i = 0;
                let embed = new Discord.MessageEmbed()
                    .setDescription(videos.map((v) => `**${++i} -** ${v.title}`).join("\n"))
                    .setFooter(message.translate("music/play:RESULTS_FOOTER"))
                    .setColor(data.config.embed.color);
                message.channel.send(embed);
                await message.channel.awaitMessages((m) => m.content > 0 && m.content < 8, { max: 1, time: 20000, errors: ["time"] }).then(async (answers) => {
                    let index = parseInt(answers.first().content, 10);
                    video = videos[index-1];
                }).catch((e) => {
                    console.log(e);
                    return message.error("music/play:TIMES_UP");
                });
            } catch(e){
                console.log(e);
                return message.error("music/play:NO_RESULT");
            }
        }

        if(video){
            if(isPlaying){
                let song = await this.client.player.addToQueue(message.guild.id, video.url);
                message.success("music/play:ADDED_QUEUE", {
                    songName: song.name
                });
            } else {
                let song = await this.client.player.play(voice, video.url);
                song.queue.on("end", () => {
                    message.sendT("music/play:QUEUE_ENDED");
                })
                .on("songChanged", (oldSong, newSong) => {
                    message.success("music/play:NOW_PLAYING", {
                        songName: newSong.name
                    });
                });
                message.success("music/play:NOW_PLAYING", {
                    songName: song.name
                });
            }
        } else {
            return message.error("music/play:NO_RESULT");
        }
    }

}

module.exports = Play; 