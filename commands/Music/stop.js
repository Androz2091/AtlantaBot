const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Stop extends Command {

    constructor (client) {
        super(client, {
            name: "stop",
            description: (language) => language.get("STOP_DESCRIPTION"),
            usage: (language) => language.get("STOP_USAGE"),
            examples: (language) => language.get("STOP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "leave" ],
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
        if(!voice){
            return message.channel.send(message.language.get("PLAY_ERR_VOICE_CHANNEL"));
        }

        if(!queue){
            return message.channel.send(message.language.get("PLAY_ERR_NOT_PLAYING"));
        }

        let members = voice.members.filter((m) => m.id !== message.client.user.id);

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("STOP_TITLE"))
            .setFooter(data.config.embed.footer)
            .setColor(data.config.embed.color);

        let m = await message.channel.send(embed);

        if(members.size > 1){
            
            m.react("👍");

            let mustVote = members.size/2+1;

            embed.setDescription(message.language.get("STOP_CONTENT", queue.songs[1].title, 0, mustVote));
            m.edit(embed);
    
            let filter = (reaction, user) => {
                let member = message.guild.members.get(user.id);
                let voiceChannel = member.voice.channel;
                if(voiceChannel){
                    if(voiceChannel.id === voice.id){
                        return true;
                    } else {
                        return false;
                    }
                }
            };

            let collector = await m.createReactionCollector(filter, {
                time: 25000
            });

            collector.on("collect", (reaction, user) => {
                let haveVoted = reaction.count-1;
                if(haveVoted >= mustVote){
                    stop();
                    embed.setDescription(message.language.get("STOP_CONTENT_COMPLETE"));
                    m.edit(embed);
                    collector.stop(true);
                } else {
                    embed.setDescription(message.language.get("STOP_CONTENT", haveVoted, mustVote));
                    m.edit(embed);
                }
            });

            collector.on("end", (collected, isDone) => {
                if(!isDone){
                    return message.channel.send(message.language.get("PLAY_ERR_TIMEOUT"));
                }
            });

        } else {
            stop();
            embed.setDescription(message.language.get("STOP_CONTENT_COMPLETE"));
            m.edit(embed);
        }
        
        function stop(){
            // Reset song array
            queue.songs = [];
            queue.stopped = true;
            queue.connection.dispatcher.end();
        }
        
    }

}

module.exports = Stop;