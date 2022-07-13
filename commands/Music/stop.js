const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Stop extends Command {

	constructor (client) {
		super(client, {
			name: "stop",
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

		const queue = await this.client.player.getQueue(interaction);

		const voice = interaction.member.voice.channel;
		if(!voice){
			return interaction.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return interaction.error("music/play:NOT_PLAYING");
		}

		const members = voice.members.filter((m) => !m.user.bot);

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("music/stop:DESCRIPTION"))
			.setFooter(data.config.embed.footer)
			.setColor(data.config.embed.color);

		const m = await interaction.reply({ embeds: [embed] });

		if(members.size > 1){
            
			m.react("👍");

			const mustVote = Math.floor(members.size/2+1);

			embed.setDescription(interaction.translate("music/stop:VOTE_CONTENT", {
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
					this.client.player.stop(interaction);
					embed.setDescription(interaction.translate("music/stop:SUCCESS"));
					m.editReply({ embeds: [embed] });
					collector.stop(true);
				} else {
					embed.setDescription(interaction.translate("music/stop:VOTE_CONTENT", {
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
			this.client.player.stop(interaction);
			embed.setDescription(interaction.translate("music/stop:SUCCESS"));
			m.editReply({ embeds: [embed] });
		}
        
	}

}

module.exports = Stop;
