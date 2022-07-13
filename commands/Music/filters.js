const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	FiltersList = require("../../assets/json/filters.json");

class Filters extends Command {

	constructor (client) {
		super(client, {
			name: "filters",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, data) {

		const queue = this.client.player.getQueue(interaction);

		const voice = interaction.member.voice.channel;
		if (!voice){
			return interaction.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return interaction.error("music/play:NOT_PLAYING");
		}

		const filtersStatuses = [ [], [] ];

		Object.keys(FiltersList).forEach((filterName) => {
			const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
			array.push(FiltersList[filterName] + " : " + (this.client.player.getQueue(interù).filters[filterName] ? this.client.customEmojis.success : this.client.customEmojis.error));
		});

		const list = new Discord.MessageEmbed()
			.setDescription(interaction.translate("music/filters:CONTENT", {
				prefix: data.guild.prefix
			}))
			.addField(interaction.translate("music/filters:TITLE"), filtersStatuses[0].join("\n"), true)
			.addField("** **", filtersStatuses[1].join("\n"), true)
			.setColor(data.config.embed.color);

		interaction.reply({ embeds: [list] });
	}

}

module.exports = Filters;