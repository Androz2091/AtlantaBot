const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

const votes = {};

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
        // Update vote count
        let votedUsers = votes[message.guild.id];
        if (!votedUsers) votedUsers = [];
        if (votedUsers.includes(message.author.id))
            return message.error("music/skip:ALREADY_VOTED");
        votedUsers.push(message.author.id);
        votes[message.guild.id] = votedUsers;
        // Check if vote count is enough
        const userVoiceCount = channel.members.filter(m => !m.user.bot).size;
        const voteCountNeeded =
            userVoiceCount === 1 ? 1 : Math.ceil(userVoiceCount / 2);
        if (votedUsers.length == voteCountNeeded) {
            delete votes[message.guild.id];
            player.stop();
            const skipEmbed = new Discord.MessageEmbed()
                .setDescription(
                    message.translate("music/skip:SKIPPED", {
                        songName: player.queue[0].title
                    })
                )
                .defaultColor();
            message.channel.send(skipEmbed);
        } else {
            const voteNeededEmbed = new Discord.MessageEmbed()
                .setAuthor(message.translate("music/skip:REQUEST"))
                .setDescription(
                    message.translate("music/skip:VOTE_NEEDED", {
                        current: votedUsers.length,
                        needed: voteCountNeeded,
                        users: channel.members
                            .filter(m => !m.user.bot)
                            .map(m =>
                                votedUsers.includes(m.id)
                                    ? message.translate(
                                          "music/skip:USER_VOTED",
                                          {
                                              username: m.toString()
                                          }
                                      )
                                    : m.toString()
                            )
                            .join("\n")
                    })
                )
                .defaultColor();
            message.channel.send(voteNeededEmbed);
        }
    }
};
