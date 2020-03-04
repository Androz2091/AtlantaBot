const Discord = require("discord.js");
const Event = require("../structures/Event");

module.exports = class Message extends Event {
    constructor(...args) {
        super(...args);
    }

    async execute(player, track, msg) {
        const guildData = await this.client.handlers.database.fetchGuild(
            player.guild.id
        );
        if(msg && msg.error && msg.error.includes("copyright")){
            const errorEmbed = new Discord.MessageEmbed()
                .setDescription(
                    this.client.translate(
                        guildData.language,
                        "music/play:ERROR_COPYRIGHT",
                        {
                            songName: `[${track.title}](${track.uri})`
                        }
                    )
                )
                .errorColor();
            player.textChannel.send(errorEmbed);
        }
    }

};
