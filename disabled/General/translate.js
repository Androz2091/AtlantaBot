const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
translate = require("@k3rn31p4nic/google-translate-api");

const langs = ["afrikaans", "albanian", "amharic", "arabic", "armenian", "azerbaijani", "bangla", "basque", "belarusian", "bengali", "bosnian", "bulgarian", "burmese", "catalan", "cebuano", "chichewa", "corsican", "croatian", "czech", "danish", "dutch", "english", "esperanto", "estonian", "filipino", "finnish", "french", "frisian", "galician", "georgian", "german", "greek", "gujarati", "haitian creole", "hausa", "hawaiian", "hebrew", "hindi", "hmong", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "korean", "kurdish (kurmanji)", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "marathi", "mongolian", "myanmar (burmese)", "nepali", "norwegian", "nyanja", "pashto", "persian", "polish", "portugese", "punjabi", "romanian", "russian", "samoan", "scottish gaelic", "serbian", "sesotho", "shona", "sindhi", "sinhala", "slovak", "slovenian", "somali", "spanish", "sundanese", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yiddish", "yoruba", "zulu"];

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
        
        if(args[0] === "langs-list"){
            let index = 0;
            let langsList = "```Css\n"+(langs.map((l, i) => `#${i+1} - ${l}`).join("\n"))+"```";
            message.author.send(langsList);
            return message.channel.send(message.language.get("TRANSLATE_LANGS"));
        }
        
        let pWait = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        
        if(!args[0]){
            return pWait.edit(message.language.get("TRANSLATE_ERR_LANG", data.guild.prefix));
        }
    
        if(!args[1]){
            return pWait.edit(message.language.get("TRANSLATE_ERR_MSG"));
        }
        
        // Gets different args
        let language = args[0].toLowerCase();
        let toTranslate = args.slice(1).join(" ");
        
        if(!langs.includes(language)){
            return pWait.edit(message.language.get("TRANSLATE_ERR_NOT_FOUND", data.guild.prefix, language));
        }
        
        let translated = await translate(toTranslate, { to: language });

        let resEmbed = new Discord.MessageEmbed()
            .setAuthor("Translator", message.client.user.displayAvatarURL)
            .addField(translated.from.language.iso, "```"+toTranslate+"```")
            .addField(language, "```"+translated.text+"```")
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        return pWait.edit("", { embed: resEmbed });
        
    }

}

module.exports = Translate;