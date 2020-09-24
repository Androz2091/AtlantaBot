const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Checkinvites extends Command {

	constructor (client) {
		super(client, {
			name: "checkinvites",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "checkinvite", "checki" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        
		const members = message.guild.members;

		const withInvite = [];
		members.cache.forEach((m) => {
			const possibleLinks = m.user.presence.activities.map((a) => [ a.state, a.details, a.name ]).flat();
			const inviteLinks = possibleLinks.filter((l) => /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(l));
			if(inviteLinks.length > 0) {
				withInvite.push({
					id: m.user.id,
					tag: Discord.Util.escapeMarkdown(m.user.tag),
					links: "**"+Discord.Util.escapeMarkdown(inviteLinks.join(", "))+"**"
				});
			}
		});

		const text = (withInvite.length > 0 ?
			withInvite.map((m) => "`"+m.id+"` ("+m.tag+") : "+m.links).join("\n")
			:   message.translate("moderation/checkinvites:NOBODY"));

		const embed = new Discord.MessageEmbed()
			.setDescription(text)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
            
		message.channel.send(embed);
	}

}

module.exports = Checkinvites;