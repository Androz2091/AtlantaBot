const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Translate extends Command {

    constructor (client) {
        super(client, {
            name: "translate",
            description: (language) => language.get("TRANSLATE_DESCRIPTION"),
            usage: (language) => language.get("TRANSLATE_USAGE"),
            examples: (language) => language.get("TRANSLATE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "traduction", "translation", "trad" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 8000
        });
    }

    async run (message, args, data) {

        if(!data.config.apiKeys.yandex || data.config.apiKeys.yandex.length ==== ""){
            return message.channel.send(message.language.get("ERR_COMMAND_DISABLED"));
        }
        
        let pWait = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        
        let langs = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${data.config.apiKeys.yandex}`);
        let langsJson = await langs.json();
        langs = langsJson.dirs;

        if(!args[0]){
            return pWait.edit(message.language.get("TRANSLATE_ERR_LANG", data.settings.prefix));
        }

        // If the user wants the languages list
        if(args[0] === "langs-list"){
            let index = 1;
            let messages = [];
            let current = "```Css\n";
            langs.forEach((lang) => {
                if(current.length > 1700){
                    current += "\n```";
                    messages.push(current);
                    current = "";
                }
                current += `${index++} ${lang}\n`;
            });
            messages.push(current += "\n```");
            messages.forEach((m) => {
                message.author.send(m);
            });
            return pWait.edit(message.language.get("TRANSLATE_LANGS"));
        }
        
        if(!args[1]){
            return pWait.edit(message.language.get("TRANSLATE_ERR_MSG"));
        }
        
        // Gets different args
        let language = args[0].toLowerCase();
        let toTranslate = args.slice(1).join(" ");
        
        if(!langs.includes(language)){
            return pWait.edit(message.language.get("TRANSLATE_LANG1", data.settings.prefix, language));
        }
        
        let res = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${data.config.apiKeys.yandex}&text=${toTranslate}&lang=${language}&format=plain`);
        let resJson = await res.json();

        let resEmbed = new Discord.MessageEmbed()
            .setAuthor("Translator", message.client.user.displayAvatarURL)
            .addField(language.split("-")[0], "```"+toTranslate+"```")
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .addField(language.split("-")[1], "```"+resJson.text[0]+"```");
        return pWait.edit("", { embed: resEmbed });
        
    }

}

module.exports = Translate;