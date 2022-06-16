const Command = require("../../base/Command.js"),
	Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');


class Status extends Command {

	constructor (client) {
		super(client, {
			name: "status",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "st" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

if (!user.presence.activities.length) {
            const sembed = new MessageEmbed()
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setThumbnail(user.user.displayAvatarURL())
                .addField("**No Status**", 'This user does not have any custom status!')
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()
            message.channel.send(sembed)
            return undefined;
        }

        user.presence.activities.forEach((activity) => {

            if (activity.type === 'CUSTOM_STATUS') {
                const embed = new MessageEmbed()
                    .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .addField("**Status**", `**Custom status** -\n${activity.emoji || "No Emoji"} | ${activity.state}`)
                    .setThumbnail(user.user.displayAvatarURL())
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                message.channel.send(embed)
            }
            else if (activity.type === 'PLAYING') {
                let name1 = activity.name
                let details1 = activity.details
                let state1 = activity.state
                let image = user.user.displayAvatarURL({ dynamic: true })

                const sembed = new MessageEmbed()
                    .setAuthor(`${user.user.username}'s Activity`)
                    .setColor("RANDOM")
                    .setThumbnail(image)
                    .addField("**Type**", "Playing")
                    .addField("**App**", `${name1}`)
                    .addField("**Details**", `${details1 || "No Details"}`)
                    .addField("**Working on**", `${state1 || "No Details"}`)
                message.channel.send(sembed);
            }
            else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {

                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",")

                const embed = new MessageEmbed()
                    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("RANDOM")
                    .setThumbnail(trackIMG)
                    .addField('Song Name', trackName, true)
                    .addField('Album', trackAlbum, true)
                    .addField('Author', trackAuthor, false)
                    .addField('Listen to Track', `${trackURL}`, false)
                    .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed);
            }
        })
    }
}
module.exports = Status;
