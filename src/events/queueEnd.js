const Discord = require("discord.js");
const Event = require("../structures/Event");

module.exports = class Message extends Event {
    constructor(...args) {
        super(...args);
    }

    async execute(player) {
        const guildData = await this.client.handlers.database.fetchGuild(
            player.guild.id
        );
        const embed = new MessageEmbed()
            .setDescription(
                this.client.translate(
                    guildData.language,
                    "music/play:QUEUE_ENDED"
                )
            )
            .errorColor();
        player.textChannel.send(embed);
        return this.music.players.destroy(player.guild.id);
    }
};
