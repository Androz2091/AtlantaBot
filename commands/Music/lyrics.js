const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	cheerio = require("cheerio"),
	fetch = require("node-fetch");

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
			cooldown: 5000
		});
	}

	async run (message, args, data) {
        
		const songName = args.join(" ");
		if(!songName){
			return message.error("music/lyrics:MISSING_SONG_NAME");
		}
        
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.translate("music/lyrics:LYRICS_OF", {
				songName
			}))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		try {

			const songNameFormated = songName
				.toLowerCase()
				.replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
				.split(" ").join("%20");

			let res = await fetch(`https://www.musixmatch.com/search/${songNameFormated}`);
			res = await res.text();
			let $ = await cheerio.load(res);
			const songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;

			res = await fetch(songLink);
			res = await res.text();
			$ = await cheerio.load(res);

			let lyrics = await $("p[class=\"mxm-lyrics__content \"]").text();

			if(lyrics.length > 2048) {
				lyrics = lyrics.substr(0, 2031) + message.translate("music/lyrics:AND_MORE") + " ["+message.translate("music/lyrics:CLICK_HERE")+"]"+`https://www.musixmatch.com/search/${songName}`;
			} else if(!lyrics.length) {
				return message.error("music/lyrics:NO_LYRICS_FOUND", {
					songName
				});
			}

			embed.setDescription(lyrics);
			message.channel.send(embed);

		} catch(e){
			message.error("music/lyrics:NO_LYRICS_FOUND", {
				songName
			});
		}

	}

}

module.exports = Lyrics;