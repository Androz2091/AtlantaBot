const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Achievements extends Command {

	constructor (client) {
		super(client, {
			name: "achievements",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "ac" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message, args, data) {
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.translate("economy/achievements:TITLE"))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
        
		embed.addField(message.translate("economy/achievements:SEND_CMD"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.firstCommand.progress.now,
			total: data.userData.achievements.firstCommand.progress.total,
			percent: Math.round(100 * (data.userData.achievements.firstCommand.progress.now/data.userData.achievements.firstCommand.progress.total))
		}));
		embed.addField(message.translate("economy/achievements:CLAIM_SALARY"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.work.progress.now,
			total: data.userData.achievements.work.progress.total,
			percent: Math.round(100 * (data.userData.achievements.work.progress.now/data.userData.achievements.work.progress.total))
		}));
		embed.addField(message.translate("economy/achievements:MARRY"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.married.progress.now,
			total: data.userData.achievements.married.progress.total,
			percent: Math.round(100 * (data.userData.achievements.married.progress.now/data.userData.achievements.married.progress.total))
		}));
		embed.addField(message.translate("economy/achievements:SLOTS"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.slots.progress.now,
			total: data.userData.achievements.slots.progress.total,
			percent: Math.round(100 * (data.userData.achievements.slots.progress.now/data.userData.achievements.slots.progress.total))
		}));
		embed.addField(message.translate("economy/achievements:TIP"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.tip.progress.now,
			total: data.userData.achievements.tip.progress.total,
			percent: Math.round(100 * (data.userData.achievements.tip.progress.now/data.userData.achievements.tip.progress.total))
		}));
		embed.addField(message.translate("economy/achievements:REP"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.rep.progress.now,
			total: data.userData.achievements.rep.progress.total,
			percent: Math.round(100 * (data.userData.achievements.rep.progress.now/data.userData.achievements.rep.progress.total))
		}));
		embed.addField(message.translate("economy/achievements:INVITE"), message.translate("economy/achievements:PROGRESS", {
			now: data.userData.achievements.invite.progress.now,
			total: data.userData.achievements.invite.progress.total,
			percent: Math.round(100 * (data.userData.achievements.rep.progress.now/data.userData.achievements.invite.progress.total))
		}));

		message.channel.send(embed);

	}

}

module.exports = Achievements;
