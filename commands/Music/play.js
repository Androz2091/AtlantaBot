const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Play extends Command {

	constructor (client) {
		super(client, {
			name: "play",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "joue" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {

		const isPlaying = this.client.player.isPlaying(message.guild.id);

		const name = args.join(" ");
		if(!name){
			return message.error("music/play:MISSING_SONG_NAME");
		} 

		const voice = message.member.voice.channel;
		if(!voice){
			return message.error("music/play:NO_VOICE_CHANNEL");
		}

		let trackToPlay;
		let isPlaylist;

		// Check my permissions
		const perms = voice.permissionsFor(this.client.user);
		if(!perms.has("CONNECT") || !perms.has("SPEAK")){
			return message.error("music/play:VOICE_CHANNEL_CONNECT");
		}

		const tracks = await this.client.player.searchTracks(args.join(" "), true).catch(() => {});
		if(!tracks || !tracks[0]){
			return message.error("music/play:NO_RESULT");
		} else if(tracks[0].fromPlaylist){
			trackToPlay = args.join(" ");
			isPlaylist = true;
		} else if(args.join(" ").match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)){
			trackToPlay = tracks[0];
		} else {
			try {
				if(tracks.length > 10) tracks.splice(10);
				let i = 0;
				const embed = new Discord.MessageEmbed()
					.setDescription(tracks.map((t) => `**${++i} -** ${t.name}`).join("\n"))
					.setFooter(message.translate("music/play:RESULTS_FOOTER"))
					.setColor(data.config.embed.color);
				message.channel.send(embed);
				await message.channel.awaitMessages((m) => m.content > 0 && m.content < 8, { max: 1, time: 20000, errors: ["time"] }).then(async (answers) => {
					const index = parseInt(answers.first().content, 10);
					trackToPlay = tracks[index-1];
				}).catch((e) => {
					console.log(e);
					return message.error("music/play:TIMES_UP");
				});
			} catch(e){
				console.log(e);
				return message.error("music/play:NO_RESULT");
			}
		}

		if(trackToPlay){
			if(isPlaying){
				const result = await this.client.player.addToQueue(message.guild.id, trackToPlay, message.author);
				if(isPlaylist){
					message.success("music/play:ADDED_QUEUE_COUNT", {
						songCount: result.tracks.length
					});
				} else {
					message.success("music/play:ADDED_QUEUE", {
						songName: trackToPlay.name
					});
				}
			} else {
				const result = await this.client.player.play(voice, trackToPlay, message.author);
				if(isPlaylist){
					message.success("music/play:ADDED_QUEUE_COUNT", {
						songCount: result.tracks.length
					});
				}
				const queue = this.client.player.getQueue(message.guild.id);
				queue.on("end", () => {
					message.sendT("music/play:QUEUE_ENDED");
				})
					.on("songChanged", (oldTrack, newTrack) => {
						message.success("music/play:NOW_PLAYING", {
							songName: newTrack.name
						});
					});
				message.success("music/play:NOW_PLAYING", {
					songName: queue.playing.name
				});
			}
		} else {
			return message.error("music/play:NO_RESULT");
		}
	}

}

module.exports = Play; 