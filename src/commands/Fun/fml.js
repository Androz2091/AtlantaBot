const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
cheerio = require("cheerio"),
fetch = require("node-fetch");

class Fml extends Command {

    constructor (client) {
        super(client, {
            name: "fml",
            description: (language) => language.get("FML_DESCRIPTION"),
            usage: (language) => language.get("FML_USAGE"),
            examples: (language) => language.get("FML_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "vdm" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        fetch(message.language.get("FML_URL"))
        .then(res => {
            if(res.ok){
            res.text().then(async body => {
                let $ = cheerio.load(body),
                content = await $(".article-contents").children("a").first().text().replace(/[\n]/gi, " ").replace(" -", "-"),
                credits = await $(".panel.panel-classic").children("div").first().text(),
                embed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("FML_TITLE"), this.client.user.displayAvatarURL())
                .setDescription(content)
                .setFooter(credits)
                .setColor(data.config.embed.color)
    
                message.channel.send(embed);
            })
            } else {
                return message.channel.send(message.language.get("FML_ERROR"));
            }
        }).catch()

    }

}

module.exports = Fml;
