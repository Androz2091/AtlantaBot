const Discord = require("discord.js");

module.exports = class {

	constructor (client) {
		this.client = client;
	}
    
	async run (guild) {
        
		const text = "Quelqu'un m'a expulsé de **"+guild.name+"** avec **"+guild.members.cache.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.cache.filter((m) => m.user.bot).size+" bots)";

		// Sends log embed in the logs channel
		const embed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor("#B22222")
			.setDescription(text);
		this.client.channels.cache.get(this.client.config.support.logs).send(embed);

	}
};  