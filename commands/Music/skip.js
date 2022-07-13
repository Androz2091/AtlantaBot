const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Skip extends Command {

	constructor (client) {
		super(client, {
			name: "skip",
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

		if(!queue.tracks[0]){
			return interaction.error("music/skip:NO_NEXT_SONG");
		}

		const members = voice.members.filter((m) => !m.user.bot);

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("music/skip:DESCRIPTION"))
			.setThumbnail(queue.tracks[0].thumbnail)
			.setFooter(data.config.embed.footer)
			.setColor(data.config.embed.color);

		const m = await interaction.reply({ embeds: [embed] });

		if(members.size > 1){
            
			m.react("👍");

			const mustVote = Math.floor(members.size/2+1);

			embed.setDescription(interaction.translate("music/skip:VOTE_CONTENT", {
				songName: queue.tracks[0].name,
				voteCount: 0,
				requiredCount: mustVote
			}));
			m.editReply({ embeds: [embed] });
    
			const filter = (reaction, user) => {
				const member = interaction.guild.members.cache.get(user.id);
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
					this.client.player.skip(interaction);
					embed.setDescription(interaction.translate("music/skip:SUCCESS"));
					m.editReply({ embeds: [embed] });
					collector.stop(true);
				} else {
					embed.setDescription(interaction.translate("music/skip:VOTE_CONTENT", {
						songName: queue.tracks[0].title,
						voteCount: haveVoted,
						requiredCount: mustVote
					}));
					m.editReply({ embeds: [embed] });
				}
			});

			collector.on("end", (collected, isDone) => {
				if(!isDone){
					return interaction.error("misc:TIMES_UP");
				}
			});

		} else {
			this.client.player.skip(interaction);
			embed.setDescription(interaction.translate("music/skip:SUCCESS"));
			m.editReply({ embeds: [embed] });
		}
        
	}

}

module.exports = Skip;
