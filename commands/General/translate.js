const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
DeepL = require("deepl-scraper"); // Thanks to @Kaki87 :)

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
        
        let langs = [
            { name: "en", aliases: [ "english" ] },
            { name: "de", aliases: [ "german" ] },
            { name: "fr", aliases: [ "french" ] },
            { name: "es", aliases: [ "spanish" ] },
            { name: "pt", aliases: [ "portuguese" ] },
            { name: "it", aliases: [ "italian" ] },
            { name: "nl", aliases: [ "dutch" ] },
            { name: "pl", aliases: [ "polish" ] },
            { name: "ru", aliases: [ "russian" ] }
        ];
        
        let pWait = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        
        if(!args[0]){
            return pWait.edit(message.language.get("TRANSLATE_ERR_LANG", data.guild.prefix));
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
                current += `${index++} ${lang.name} (${lang.aliases.map((lang) => lang).join(", ")})\n`;
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
        
        if(!langs.find((lang) => lang.name === language)){
            return pWait.edit(message.language.get("TRANSLATE_ERR_NOT_FOUND", data.guild.prefix, language));
        }

        let isAlias = langs.find((lang) => lang.aliases.includes(language));
        if(isAlias){
            language = isAlias.name;
        }
        
        let translated = await DeepL.translate(toTranslate, null, language);

        let resEmbed = new Discord.MessageEmbed()
            .setAuthor("Translator", message.client.user.displayAvatarURL)
            .addField(langs.find((lang) => lang.name === translated.source.lang).aliases[0], "```"+toTranslate+"```")
            .addField(langs.find((lang) => lang.name === translated.target.lang).aliases[0], "```"+translated.target.translation+"```")
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        return pWait.edit("", { embed: resEmbed });
        
    }

}

module.exports = Translate;