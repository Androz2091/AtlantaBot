const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

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

	async run (interaction, translate, data) {

		const queue = await this.client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if(!voice){
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

		const members = voice.members.filter((m) => !m.user.bot);

		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("music/stop:DESCRIPTION"))
			.setFooter(data.config.embed.footer)
			.setColor(data.config.embed.color);

		const m = await message.channel.send({ embeds: [embed] });

		if(members.size > 1){
            
			m.react("👍");

			const mustVote = Math.floor(members.size/2+1);

			embed.setDescription(translate("music/stop:VOTE_CONTENT", {
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
					this.client.player.stop(message);
					embed.setDescription(translate("music/stop:SUCCESS"));
					m.edit({ embeds: [embed] });
					collector.stop(true);
				} else {
					embed.setDescription(translate("music/stop:VOTE_CONTENT", {
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
			this.client.player.stop(message);
			embed.setDescription(translate("music/stop:SUCCESS"));
			m.edit({ embeds: [embed] });
		}
        
	}

};
