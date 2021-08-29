const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	lyricsParse = require("lyrics-finder");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "lyrics",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {
        
		const [songName, artistName] = args.join(" ").split("|");
		if(!songName){
			return interaction.reply({
				content: translate("music/lyrics:MISSING_SONG_NAME"),
				ephemeral: true
			});
		}
        
		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("music/lyrics:LYRICS_OF", {
				songName
			}))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		try {

			const songNameFormated = songName
				.toLowerCase()
				.replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
				.split(" ").join("%20");

			let lyrics = await lyricsParse(songNameFormated, artistName) || "Not Found!";

			if(lyrics.length > 2040) {
				lyrics = lyrics.substr(0, 2000) + translate("music/lyrics:AND_MORE") + " ["+translate("music/lyrics:CLICK_HERE")+"]"+`https://www.musixmatch.com/search/${songName}`;
			} else if(!lyrics.length) {
				return message.error("music/lyrics:NO_LYRICS_FOUND", {
					songName
				});
			}

			embed.setDescription(lyrics);
			message.channel.send({ embeds: [embed] });

		} catch(e){
			console.log(e);
			message.error("music/lyrics:NO_LYRICS_FOUND", {
				songName
			});
		}

	}

};
