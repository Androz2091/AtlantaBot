const Command = require("../../base/Command.js"),
	Discord = require("discord.js");
const { Embed } = require("../../helpers/constants.js");

class Achievements extends Command {

	constructor (client) {
		super(client, {
			name: "achievements",

			options: [],

			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, { userData }) {
		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("economy/achievements:TITLE"))
			.setColor(Embed.COLOR)
			.setFooter(Embed.FOOTER);
        
		embed.addField(translate("economy/achievements:SEND_CMD"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.firstCommand.progress.now,
			total: userData.achievements.firstCommand.progress.total,
			percent: Math.round(100 * (userData.achievements.firstCommand.progress.now / userData.achievements.firstCommand.progress.total))
		}));
		embed.addField(translate("economy/achievements:CLAIM_SALARY"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.work.progress.now,
			total: userData.achievements.work.progress.total,
			percent: Math.round(100 * (userData.achievements.work.progress.now / userData.achievements.work.progress.total))
		}));
		embed.addField(translate("economy/achievements:MARRY"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.married.progress.now,
			total: userData.achievements.married.progress.total,
			percent: Math.round(100 * (userData.achievements.married.progress.now / userData.achievements.married.progress.total))
		}));
		embed.addField(translate("economy/achievements:SLOTS"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.slots.progress.now,
			total: userData.achievements.slots.progress.total,
			percent: Math.round(100 * (userData.achievements.slots.progress.now/userData.achievements.slots.progress.total))
		}));
		embed.addField(translate("economy/achievements:TIP"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.tip.progress.now,
			total: userData.achievements.tip.progress.total,
			percent: Math.round(100 * (userData.achievements.tip.progress.now/userData.achievements.tip.progress.total))
		}));
		embed.addField(translate("economy/achievements:REP"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.rep.progress.now,
			total: userData.achievements.rep.progress.total,
			percent: Math.round(100 * (userData.achievements.rep.progress.now/userData.achievements.rep.progress.total))
		}));
		embed.addField(translate("economy/achievements:INVITE"), translate("economy/achievements:PROGRESS", {
			now: userData.achievements.invite.progress.now,
			total: userData.achievements.invite.progress.total,
			percent: Math.round(100 * (userData.achievements.invite.progress.now/userData.achievements.invite.progress.total))
		}));

		interaction.reply({ embeds: [embed] });

	}

}

module.exports = Achievements;
