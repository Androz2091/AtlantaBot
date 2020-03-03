const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                permission: Constants.PermissionsLevels.SERVER_DJ
            },
            ...args
        );
    }

    async execute(message, args) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if (!player)
            return message.error("music/play:NOT_PLAYING", null, false, true);
        if (!channel || channel.id !== player.voiceChannel.id)
            return message.error(
                "music/play:NO_VOICE_CHANNEL",
                null,
                false,
                true
            );
        const songCount = player.queue.length - 1;
        player.queue.forEach((song, index) => {
            if (index !== 0) {
                player.queue.remove(song);
            }
        });
        const clearEmbed = new Discord.MessageEmbed()
            .setDescription(
                message.translate(
                    "music/clearqueue:CLEARED",
                    {
                        count: songCount
                    },
                    false,
                    true
                )
            )
            .setColor(this.client.config.embed.color);
        return message.channel.send(clearEmbed);
    }
};
