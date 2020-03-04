const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER,
                clientPermissions: ["EMBED_LINKS"]
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
        if (!args[0] || (!args[0].endsWith("%") && isNaN(args[0])))
            return message.error("music/volume:MISSING", null, false, true);
        const currentVolume = player.volume;
        const sentVolume = parseInt(
            args[0].endsWith("%")
                ? args[0].substr(0, args[0].length - 1)
                : args[0]
        );
        const newVolume =
            sentVolume >= 100 ? 100 : sentVolume <= 0 ? 1 : sentVolume;
        player.setVolume(newVolume);
        const changedEmbed = new Discord.MessageEmbed()
            .setDescription(
                message.translate("music/volume:CHANGED", {
                    oldPercent: currentVolume,
                    newPercent: newVolume
                })
            )
            .defaultColor();
        message.channel.send(changedEmbed);
    }
};
