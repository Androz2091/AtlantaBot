const Discord = require("discord.js");
const Event = require("../structures/Event");

module.exports = class Message extends Event {
    constructor(...args) {
        super(...args);
    }

    async execute(player, track) {
        const guildData = await this.client.handlers.database.fetchGuild(
            player.guild.id
        );
        const nowPlayingEmbed = new Discord.MessageEmbed()
            .setDescription(
                this.client.translate(
                    guildData.language,
                    "music/play:NOW_PLAYING",
                    {
                        songName: `[${track.title}](${track.uri})`
                    }
                )
            )
            .setImage(track.thumbnail.replace("default", "hqdefault"))
            .defaultColor();
        player.textChannel.send(nowPlayingEmbed);
    }

};
