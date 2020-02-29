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
        if(!player) return message.error("music/play:NOT_PLAYING");
        if(!channel || channel.id !== player.voiceChannel.id) return message.error("music/play:NO_VOICE_CHANNEL");
        this.client.music.players.destroy(message.guild.id);
        const stopEmbed = new Discord.MessageEmbed()
        .setDescription(message.translate("music/stop:STOPPED"))
        .setColor(this.client.config.embed.color);
        return message.channel.send(stopEmbed);
    }
};
