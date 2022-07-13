const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	lyricsParse = require("lyrics-finder");

class Lyrics extends Command {

	constructor (client) {
		super(client, {
			name: "lyrics",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "paroles" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "songname",
					description: "the name of the song",
					type: "STRING",
					required: true
				},
				{
					name: "artistname",
					description: "the name of the artist",
					type: "STRING",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {
		const songName = interaction.options.getString("songname")
		const artistName = interaction.options.getString("artistname")
		if(!songName){
			return message.error("music/lyrics:MISSING_SONG_NAME");
		}
        
		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("music/lyrics:LYRICS_OF", {
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
				lyrics = lyrics.substr(0, 2000) + interaction.translate("music/lyrics:AND_MORE") + " ["+interaction.translate("music/lyrics:CLICK_HERE")+"]"+`https://www.musixmatch.com/search/${songName}`;
			} else if(!lyrics.length) {
				return interaction.error("music/lyrics:NO_LYRICS_FOUND", {
					songName
				});
			}

			embed.setDescription(lyrics);
			interaction.reply({ embeds: [embed] });

		} catch(e){
			console.log(e);
			interaction.error("music/lyrics:NO_LYRICS_FOUND", {
				songName
			});
		}

	}

}

module.exports = Lyrics;