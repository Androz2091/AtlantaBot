const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Queue extends Command {

    constructor (client) {
        super(client, {
            name: "queue",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "playlist" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let voice = message.member.voice.channel;
        if (!voice){
            return message.error("music/play:NO_VOICE_CHANNEL");
        }
        
        let queue = this.client.player.getQueue(message.guild.id);

        if(!queue){
            return message.error("music:play:NOT_PLAYING");
        }

        const tracks = [ ...[ queue.playing ], ...queue.tracks ];
        if(tracks.length > 20) tracks.splice(20);
        let sQueue = tracks.map((track, i) => {
            return `${i === 0 ? '\nCurrently playing...\n' : ''} **${message.translate("common:TITLE")}**: ${track.name}\n**${message.translate("common:AUTHOR")}**: ${track.author}`;
        });

        // Generate discord embed to display the songs list
        let embed = new Discord.MessageEmbed()
            .addField(this.client.config.emojis.playlist+" "+message.translate("music/queue:TITLE"), sQueue.join("\n-------\n"))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setTimestamp();
        
        // Then, send the embed in the current channel
        message.channel.send(embed);
        
    }

}

module.exports = Queue;