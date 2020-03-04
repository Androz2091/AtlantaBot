const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js"),
    Erela = require("erela.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER,
                clientPermissions: [ "EMBED_LINKS" ]
            },
            ...args
        );
    }

    async execute(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if (!player)
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setDescription(
                        "No song/s currently playing in this guild."
                    )
                    .setColor(data.guild.colour)
            );
        if (!channel || channel.id !== player.voiceChannel.id)
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setDescription(
                        "You need to be in a voice channel to use the remove command."
                    )
                    .setColor(data.guild.colour)
            );

        const {
            title,
            duration = 1,
            thumbnail,
            requester,
            uri
        } = player.queue[0];
        const position = player.position || 1;

        const nowPlayingEmbed = new Discord.MessageEmbed()
            .setDescription(
                message.translate("music/nowplaying:CONTENT", {
                    songName: `[${title}](${uri})`,
                    current:
                        position > 5000 && position < 60000
                            ? `00:${Erela.Utils.formatTime(position, true)}`
                            : player.position > 5000
                            ? `${Erela.Utils.formatTime(position, true)}`
                            : "00:00",
                    total: Erela.Utils.formatTime(duration, true),
                    songRequester: requester.toString()
                })
            )
            .setColor(this.client.config.embed.color)
            .setImage(thumbnail.replace("default", "hqdefault"));

        message.channel.send(nowPlayingEmbed);
    }
};
