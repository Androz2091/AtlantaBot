const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
cheerio = require("cheerio"),
fetch = require("node-fetch");

class Lyrics extends Command {

    constructor (client) {
        super(client, {
            name: "lyrics",
            description: (language) => language.get("LYRICS_DESCRIPTION"),
            usage: (language) => language.get("LYRICS_USAGE"),
            examples: (language) => language.get("LYRICS_EXAMPLES"),
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
        
        let songName = args.join(" ");
        if(!songName){
            return message.channel.send(message.language.get("LYRICS_ERR_SONG_NAME"));
        }
        
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("LYRICS_TITLE", songName))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        try {

            let songNameFormated = songName
            .toLowerCase()
            .replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
            .split(" ").join("%20");

            let res = await fetch(`https://www.musixmatch.com/search/${songName}`);
            res = await res.text();
            let $ = await cheerio.load(res);
            let songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;

            res = await fetch(songLink);
            res = await res.text();
            $ = await cheerio.load(res);

            let lyrics = await $("p[class=\"mxm-lyrics__content \"]").text();

            if(lyrics.length > 2048) {
                lyrics = lyrics.substr(0, 2031) + message.language.get("LYRICS_NEXT", `https://www.musixmatch.com/search/${songName}`);
            } else if(!lyrics.length) {
                return message.channel.send(message.language.get("LYRICS_ERR_NO_LYRICS", songName))
            }

            embed.setDescription(lyrics);
            message.channel.send(embed);

        } catch(e){
            message.channel.send(message.language.get("LYRICS_ERR_NO_LYRICS", songName));
        }

    }

}

module.exports = Lyrics;