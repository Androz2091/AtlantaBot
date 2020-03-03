const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js"),
    Pagination = require("discord-paginationembed");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message) {
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
        if (player.queue.size < 1) return message.error("music/queue:EMPTY");

        const embeds = [];
        player.queue.forEach((song, index) => {
            const i = embeds.length === 0 ? 0 : embeds.length - 1;
            let lastEmbed = embeds[i];
            if (lastEmbed && lastEmbed.fields.length >= 5) {
                lastEmbed = new Discord.MessageEmbed();
                embeds[embeds.length] = lastEmbed;
            } else if (!lastEmbed) {
                lastEmbed = new Discord.MessageEmbed();
                embeds[i] = lastEmbed;
            }
            lastEmbed.addField(
                index === 0
                    ? message.translate("music/queue:CURRENTLY_PLAYING")
                    : `#${index + 1}`,
                message.translate("music/queue:SONG", {
                    songTitle: song.title,
                    songDuration: this.client.helpers.convertTime.execute(
                        message.guild,
                        song.duration
                    ),
                    songRequester: song.requester.toString()
                })
            );
        });

        const pagination = new Pagination.Embeds()
            .setArray(embeds)
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setPageIndicator(false)
            .setPage(1)
            .setDisabledNavigationEmojis(["DELETE"])
            .setColor(Constants.Colors.DEFAULT)
            .setClientAssets({
                prompt: message.translate("music/queue:PAGE_PROMPT", {
                    user: message.author.toString()
                })
            })
            .setAuthor(
                message.translate("music/queue:TITLE", {
                    guild: message.guild.name,
                    duration: this.client.helpers.convertTime.execute(
                        message.guild,
                        player.queue
                            .map(t => t.duration)
                            .reduce((p, c) => p + c)
                    )
                }),
                message.guild.iconURL()
            );

        pagination.build();
    }
};
