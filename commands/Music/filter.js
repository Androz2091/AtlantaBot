const Command = require("../../base/Command.js"),
	FiltersList = require("../../assets/json/filters.json");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "filter",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "f" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {

		const queue = this.client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if (!voice){
			return interaction.reply({
				content: translate("music/play:NO_VOICE_CHANNEL"),
				ephemeral: true
			});
		}

		if(!queue){
			return interaction.reply({
				content: translate("music/play:NOT_PLAYING"),
				ephemeral: true
			});
		}

		const filter = args[0];
		if(!filter) return message.error("music/filter:MISSING_FILTER", {
			prefix: data.guild.prefix
		});
    
		const filterToUpdate = Object.values(FiltersList).find((f) => f.toLowerCase() === filter.toLowerCase());
    
		if(!filterToUpdate) return message.error("music/filter:UNKNOWN_FILTER", {
			prefix: data.guild.prefix
		});
    
		const filterRealName = Object.keys(FiltersList).find((f) => FiltersList[f] === filterToUpdate);
    
		const queueFilters = this.client.player.getQueue(message).filters;
		const filtersUpdated = {};
		filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
		this.client.player.setFilters(message, filtersUpdated);
    
		if(filtersUpdated[filterRealName]) interaction.reply({
content: translate("music/filter:ADDING_FILTER")
});;
		else interaction.reply({
content: translate("music/filter:REMOVING_FILTER")
});;
	}

}

