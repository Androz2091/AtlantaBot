const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	Pagination = require("discord-paginationembed");

class Queue extends Command {

	constructor (client) {
		super(client, {
			name: "queue",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "playlist" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {

		const voice = message.member.voice.channel;
		if (!voice){
			return message.error("music/play:NO_VOICE_CHANNEL");
		}
        
		const queue = this.client.player.getQueue(message);

		if(!queue){
			return message.error("music/play:NOT_PLAYING");
		}

		if(queue.tracks.length === 1){
			const embed = new Discord.MessageEmbed()
				.setColor(data.config.embed.color)
				.setAuthor(message.translate("music/queue:TITLE"), message.guild.iconURL({ dynamic: true }))
				.addField(message.translate("music/np:CURRENTLY_PLAYING"), `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`);
			return message.channel.send(embed);
		}
		let i = 0;

		const FieldsEmbed = new Pagination.FieldsEmbed();

		FieldsEmbed.embed
			.setColor(data.config.embed.color)
			.setAuthor(message.translate("music/queue:TITLE"), message.guild.iconURL({ dynamic: true }))
			.addField(message.translate("music/np:CURRENTLY_PLAYING"), `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`);
		
		FieldsEmbed.setArray(queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : [])
			.setAuthorizedUsers([message.author.id])
			.setChannel(message.channel)
			.setElementsPerPage(5)
			.setPageIndicator(true)
			.formatField("Queue", (track) => `${++i}. [${track.title}](${track.url})\n*Requested by ${track.requestedBy}*\n`);
 
		FieldsEmbed.build();
        
	}

}

module.exports = Queue;