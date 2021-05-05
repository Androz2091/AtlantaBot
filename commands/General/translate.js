const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	translate = require("@k3rn31p4nic/google-translate-api");

const langs = ["afrikaans", "albanian", "amharic", "arabic", "armenian", "azerbaijani", "bangla", "basque", "belarusian", "bengali", "bosnian", "bulgarian", "burmese", "catalan", "cebuano", "chichewa", "corsican", "croatian", "czech", "danish", "dutch", "english", "esperanto", "estonian", "filipino", "finnish", "french", "frisian", "galician", "georgian", "german", "greek", "gujarati", "haitian creole", "hausa", "hawaiian", "hebrew", "hindi", "hmong", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "korean", "kurdish (kurmanji)", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "marathi", "mongolian", "myanmar (burmese)", "nepali", "norwegian", "nyanja", "pashto", "persian", "polish", "portugese", "punjabi", "romanian", "russian", "samoan", "scottish gaelic", "serbian", "sesotho", "shona", "sindhi", "sinhala", "slovak", "slovenian", "somali", "spanish", "sundanese", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yiddish", "yoruba", "zulu"];

class Translate extends Command {

	constructor (client) {
		super(client, {
			name: "translate",
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
			const langsList = "```Css\n"+(langs.map((l, i) => `#${i+1} - ${l}`).join("\n"))+"```";
			message.author.send(langsList).then(() => {
				message.success("general/translate:LIST_SENT");
			}).catch(() => {
				message.error("misc:CANNOT_DM");
			});
			return;
		}
        
		const pWait = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});
        
		if(!args[0]){
			return pWait.error("general/translate:MISSING_LANGUAGE", {
				prefix: data.guild.prefix
			}, {
				edit: true
			});
		}
    
		if(!args[1]){
			return pWait.error("general/translate:MISSING_CONTENT", null, {
				edit: true
			});
		}
        
		// Gets different args
		const language = args[0].toLowerCase();
		const toTranslate = args.slice(1).join(" ");
        
		if(!langs.includes(language)){
			return pWait.error("general/translate:INVALID_LANGUAGE", {
				prefix: data.guild.prefix,
				search: language
			}, {
				edit: true
			});
		}
        
		const translated = await translate(toTranslate, { to: language });

		const resEmbed = new Discord.MessageEmbed()
			.setAuthor("Translator", this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.addField(translated.from.language.iso, "```"+toTranslate+"```")
			.addField(language, "```"+translated.text+"```")
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);

		return pWait.edit("", { embed: resEmbed });
        
	}

}

module.exports = Translate;