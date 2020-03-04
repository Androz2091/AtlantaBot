const Canvas = require("discord-canvas");
const Discord = require("discord.js");

const Constants = require("../utility/Constants");
const Event = require("../structures/Event");

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async execute(member) {
        member.guild.fetch().then(async guild => {
            const guildData = await this.client.handlers.database.fetchGuild(
                guild.id
            );

            // Check if goodbye message is enabled
            if (guildData.plugins.goodbye.enabled) {
                const channel = member.guild.channels.cache.get(
                    guildData.plugins.goodbye.channelID
                );
                if (channel) {
                    let message = guildData.plugins.goodbye.message
                        .replace(/{user}/g, member.user.tag)
                        .replace(/{server}/g, guild.name)
                        .replace(/{membercount}/g, guild.memberCount);
                    if (guildData.plugins.goodbye.withImage) {
                        const image = await new Canvas.Goodbye()
                            .setUsername(member.user.username)
                            .setDiscriminator(member.user.discriminator)
                            .setMemberCount(guild.memberCount)
                            .setGuildName(guild.name)
                            .setAvatar(
                                member.user.displayAvatarURL({ format: "png" })
                            )
                            .toAttachment();
                        const attachment = new Discord.MessageAttachment(
                            image.toBuffer(),
                            "goodbye-image.png"
                        );
                        channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }
        });
    }
};
