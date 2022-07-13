const Command = require("../../base/Command.js"),
	FiltersList = require("../../assets/json/filters.json");

class Filter extends Command {

	constructor (client) {
		super(client, {
			name: "filter",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "filter",
					description: "the filter",
					type: "STRING",
					required: true
				}
			]
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

		const filter = interaction.options.getString("filter")
		if(!filter) return interaction.error("music/filter:MISSING_FILTER", {
			prefix: data.guild.prefix
		});
    
		const filterToUpdate = Object.values(FiltersList).find((f) => f.toLowerCase() === filter.toLowerCase());
    
		if(!filterToUpdate) return interaction.error("music/filter:UNKNOWN_FILTER", {
			prefix: data.guild.prefix
		});
    
		const filterRealName = Object.keys(FiltersList).find((f) => FiltersList[f] === filterToUpdate);
    
		const queueFilters = this.client.player.getQueue(interaction).filters;
		const filtersUpdated = {};
		filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
		this.client.player.setFilters(interaction, filtersUpdated);
    
		if(filtersUpdated[filterRealName]) interaction.success("music/filter:ADDING_FILTER");
		else interaction.success("music/filter:REMOVING_FILTER");
	}

}

module.exports = Filter;