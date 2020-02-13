const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
latestTweets = require("latest-tweets");

class Tcl extends Command {

    constructor (client) {
        super(client, {
            name: "tcl",
            description: (language) => language.get("TCL_DESCRIPTION"),
            usage: (language) => language.get("TCL_USAGE"),
            examples: (language) => language.get("TCL_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "ljc" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let twitterUsername = (data.guild.language === "french" ? "lesjoiesducode" : "thecodinglove");
        latestTweets(twitterUsername, true, function (err, tweets){
            let embed = new Discord.MessageEmbed()
                .setTitle(message.language.get("TCL_TITLE"), "https://pbs.twimg.com/profile_images/1161637423551565824/2pBsptKg_400x400.jpg")
                .setDescription(tweets[0].content)
                .setURL(tweets[0].url)
                .setTimestamp(tweets[0].date)
                .setColor(data.config.embed.color)
                .setFooter(data.config.embed.footer);
            message.channel.send(embed);
        });


    }

}

module.exports = Tcl;