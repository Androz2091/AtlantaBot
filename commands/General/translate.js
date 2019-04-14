const Command = require("../../base/Command.js"),
Discord = require('discord.js');

var request = require('request');

class Translate extends Command {

    constructor (client) {
        super(client, {
            name: "translate",
            description: (language) => language.get('TRANSLATE_DESCRIPTION'),
            dirname: __dirname,
            usage: "translate ",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$invite",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var client = this.client;
        var Langs = [];

        message.channel.send(message.language.get('PLEASE_WAIT')).then(m => {
            request(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${this.client.config.yandex}`, { json: true }, function (error, response, body) {
            
                Langs = body.dirs;
        
                if(!args[0]) return m.edit(message.language.get('TRANSLATE_LANG', guild_data.prefix));
                
                // if the member wants the languages list
                if(args[0] === `langs-list`){
                    var nombre = 1;
                    var langs_message1 = "```Css\n";
                    var langs_message2 = "```Css\n";
                    Langs.forEach(element => {
                        if(langs_message1.length > 1900) langs_message2 += '#'+nombre+' - '+element + '\n';
                        else langs_message1 += '#'+nombre+' - '+element + '\n';
                        nombre++;
                    });
                    langs_message1 += '```';
                    langs_message2 += '```';
                    message.author.send(langs_message1)
                    message.author.send(langs_message2);
                    return m.edit(message.language.get('TRANSLATE_LANGS'))
                }
        
                if (!args[1]) return m.edit(message.language.get('TRANSLATE_MSG'))
        
                // Gets different args
                let language = args[0].toLowerCase();
                let to_translate = args.slice(1).join(' ');
        
                if (!Langs.includes(language)) return m.edit(message.language.get('TRANSLATE_LANG1', guild_data.prefix, language));
        
                request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${client.config.yandex}&text=${to_translate}&lang=${language}&format=plain`, { json: true }, function (error, response, body) {
                    const embed = new Discord.RichEmbed()
                        .setAuthor('Translator', client.user.displayAvatarURL)
                        .addField(`${language.split('-')[0]}`, `\`\`\`${to_translate}\`\`\``)
                        .setColor(data.embed.color)
                        .setFooter(data.embed.footer)
                        .addField(`${language.split('-')[1]}`, `\`\`\`${body.text[0]}\`\`\``);
                    return m.edit(embed);
                });
            });
        });
           
    }

}

module.exports = Translate;