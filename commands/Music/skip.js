const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Skip extends Command {

    constructor (client) {
        super(client, {
            name: "skip",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "next" ],
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

        if(!queue.songs[0]){
            return message.error("music/skip:NO_NEXT_SONG");
        }

        let members = voice.members.cache.filter((m) => !m.user.bot);

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.translate("music/skip:DESCRIPTION"))
            .setThumbnail(queue.tracks[0].thumbnail)
            .setFooter(data.config.embed.footer)
            .setColor(data.config.embed.color);

        let m = await message.channel.send(embed);

        if(members.size > 1){
            
            m.react("👍");

            let mustVote = Math.floor(members.size/2+1);

            embed.setDescription(message.translate("music/skip:VOTE_CONTENT", {
                songName: queue.songs[1].name,
                voteCount: 0,
                requiredCount: mustVote
            }));
            m.edit(embed);
    
            let filter = (reaction, user) => {
                let member = message.guild.members.cache.get(user.id);
                let voiceChannel = member.voice.channel;
                if(voiceChannel){
                    return voiceChannel.id === voice.id;
                }
            };

            let collector = await m.createReactionCollector(filter, {
                time: 25000
            });

            collector.on("collect", (reaction, user) => {
                let haveVoted = reaction.count-1;
                if(haveVoted >= mustVote){
                    this.client.player.skip(message.guild.id);
                    embed.setDescription(message.translate("music/skip:SUCCESS"));
                    m.edit(embed);
                    collector.stop(true);
                } else {
                    embed.setDescription(message.translate("music/skip:VOTE_CONTENT", {
                        songName: queue.songs[0].title,
                        voteCount: haveVoted,
                        requiredCount: mustVote
                    }));
                    m.edit(embed);
                }
            });

            collector.on("end", (collected, isDone) => {
                if(!isDone){
                    return message.error("misc:TIMES_UP");
                }
            });

        } else {
            this.client.player.skip(message.guild.id);
            embed.setDescription(message.translate("music/skip:SUCCESS"));
            m.edit(embed);
        }
        
    }

}

module.exports = Skip;
