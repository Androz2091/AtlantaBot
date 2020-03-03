const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js"),
    ms = require("ms");

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
        if (!args[0] || isNaN(ms(args[0])))
            return message.error("music/seek:MISSING", null, false, true);
        const amountSent = ms(args[0]);
        const amount =
            amountSent >= 602000 ? 602000 : amountSent <= 0 ? 0 : amountSent;
        if (player.position + amount > player.queue[0].duration)
            return message.error("music/seek:CANNOT_SEEK", {
                time: this.client.helpers.convertTime.execute(
                    message.guild,
                    amount
                )
            });
        player.seek(player.position + amount);
        const seekEmbed = new Discord.MessageEmbed()
            .setDescription(
                message.translate(
                    "music/seek:SEEKED",
                    {
                        time: this.client.helpers.convertTime.execute(
                            message.guild,
                            amount
                        )
                    },
                    false,
                    true
                )
            )
            .setColor(this.client.config.embed.color);
        return message.channel.send(seekEmbed);
    }
};
