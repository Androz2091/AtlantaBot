const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "skip",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "next" ],
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

		if(!queue.tracks[0]){
			return interaction.reply({
				content: translate("music/skip:NO_NEXT_SONG"),
				ephemeral: true
			});
		}

		const members = voice.members.filter((m) => !m.user.bot);

		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("music/skip:DESCRIPTION"))
			.setThumbnail(queue.tracks[0].thumbnail)
			.setFooter(data.config.embed.footer)
			.setColor(data.config.embed.color);

		const m = await message.channel.send({ embeds: [embed] });

		if(members.size > 1){
            
			m.react("👍");

			const mustVote = Math.floor(members.size/2+1);

			embed.setDescription(translate("music/skip:VOTE_CONTENT", {
				songName: queue.tracks[0].name,
				voteCount: 0,
				requiredCount: mustVote
			}));
			m.edit({ embeds: [embed] });
    
			const filter = (reaction, user) => {
				const member = message.guild.members.cache.get(user.id);
				const voiceChannel = member.voice.channel;
				if(voiceChannel){
					return voiceChannel.id === voice.id;
				}
			};

			const collector = await m.createReactionCollector(filter, {
				time: 25000
			});

			collector.on("collect", (reaction) => {
				const haveVoted = reaction.count-1;
				if(haveVoted >= mustVote){
					this.client.player.skip(message);
					embed.setDescription(translate("music/skip:SUCCESS"));
					m.edit({ embeds: [embed] });
					collector.stop(true);
				} else {
					embed.setDescription(translate("music/skip:VOTE_CONTENT", {
						songName: queue.tracks[0].title,
						voteCount: haveVoted,
						requiredCount: mustVote
					}));
					m.edit({ embeds: [embed] });
				}
			});

			collector.on("end", (collected, isDone) => {
				if(!isDone){
					return interaction.reply({
						content: translate("misc:TIMES_UP"),
						ephemeral: true
					});
				}
			});

		} else {
			this.client.player.skip(message);
			embed.setDescription(translate("music/skip:SUCCESS"));
			m.edit({ embeds: [embed] });
		}
        
	}

}


