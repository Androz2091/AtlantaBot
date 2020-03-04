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

            /*let memberData = await this.client.findOrCreateMember({
                id: member.id,
                guildID: guild.id
            });
            if (memberData.mute.muted && memberData.mute.endDate > Date.now()) {
                guild.channels.forEach(channel => {
                    channel
                        .updateOverwrite(member.id, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            CONNECT: false
                        })
                        .catch(err => {});
                });
            }

            // Check if the autorole is enabled
            if (guildData.plugins.autorole.enabled) {
                member.roles
                    .add(guildData.plugins.autorole.role)
                    .catch(err => {});
            }*/

            // Check if welcome message is enabled
            if (guildData.plugins.welcome.enabled) {
                const channel = member.guild.channels.cache.get(
                    guildData.plugins.welcome.channelID
                );
                if (channel) {
                    let message = guildData.plugins.welcome.message
                        .replace(/{user}/g, member)
                        .replace(/{server}/g, guild.name)
                        .replace(/{membercount}/g, guild.memberCount);
                    if (guildData.plugins.welcome.withImage) {
                        const image = await new Canvas.Welcome()
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
                            "welcome-image.png"
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
