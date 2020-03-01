const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

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
        if(!player) return message.error("music/play:NOT_PLAYING", null, false, true);
        if(!channel || channel.id !== player.voiceChannel.id) return message.error("music/play:NO_VOICE_CHANNEL", null, false, true);
        if(!args[0] || (!args[0].endsWith("%") && isNaN(args[0]))) return message.error("music/volume:MISSING", null, false, true);
        const currentVolume = player.volume;
        const newVolume = parseInt((args[0].endsWith("%") ? args[0].substr(args[0].length - 1, args[0].length) : args[0]));
        player.setVolume(newVolume);
        const changedEmbed = new Discord.MessageEmbed()
        .setDescription(message.translate("music/volume:CHANGED", {
            oldPercent: currentVolume,
            newPercent: newVolume
        }))
        .defaultColor();
        message.channel.send(changedEmbed);
    }
};
