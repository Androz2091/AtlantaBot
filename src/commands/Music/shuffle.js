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
        player.queue.shuffle();
        const shuffledEmbed = new Discord.MessageEmbed()
        .setDescription(message.translate("music/shuffle:SHUFFLED"))
        .defaultColor();
        message.channel.send(shuffledEmbed);
    }
};
