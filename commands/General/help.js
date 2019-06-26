const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: (language) => language.get("HELP_DESCRIPTION"),
            usage: (language) => language.get("HELP_USAGE"),
            examples: (language) => language.get("HELP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "aide" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args) {

        // if a command is provided
        if(args[0]){

            // if the command doesn't exist, error message
            let cmd = message.client.commands.get(args[0]) || message.client.commands.get(message.client.aliases.get(args[0]));
            if(!cmd && message.settings.commands[args[0]]){
                return message.channel.send(message.language.get("HELP_CUSTOMIZED"), args[0]);
            } else if(!cmd){
                return message.channel.send(message.language.get("HELP_COMMAND_NOT_FOUND", args[0]));
            }

            // Replace $ caract with the server prefix
            let examples = cmd.help.examples(message.language).replace(/[$_]/g, message.settings.prefix);

            // Creates the help embed
            let groupEmbed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("HELP_HEADINGS")[0]+" "+cmd.help.name)
                .addField(message.language.get("HELP_HEADINGS")[1], message.settings.prefix+cmd.help.usage(message.language))
                .addField(message.language.get("HELP_HEADINGS")[2], examples)
                .addField(message.language.get("HELP_HEADINGS")[3], cmd.help.category)
                .addField(message.language.get("HELP_HEADINGS")[4], cmd.help.description(message.language))
                .addField(message.language.get("HELP_HEADINGS")[5], (cmd.conf.aliases.length > 0) ? cmd.conf.aliases.map((a) => "`"+a+"`").join("\n") : message.language.get("HELP_NO_ALIASES"))
                .setColor(message.config.embed.color)
                .setFooter(message.config.embed.footer);

            // and send the embed in the current channel
            return message.channel.send(groupEmbed);
        }

        message.delete();

        let categories = [];
        message.client.commands.forEach((command) => {
            if(!categories.includes(command.help.category)){
                categories.push(command.help.category);
            }
        });

        let embeds = [];
        categories.forEach((category) => {
            let commands = message.client.commands.filter((cmd) => cmd.help.category === category);
            let embed = new Discord.MessageEmbed()
                .setAuthor(category)
                .setDescription(commands.sort().map((cmd) => `\`${cmd.help.name}\``).join(", "))
                .setColor(message.config.embed.color)
                .setFooter(message.config.embed.footer, message.author.displayAvatarURL);
            embeds.push(embed);
        });

        let i = 0;
        let tdata = await message.channel.send(embeds[parseInt(i, 10)]);
        
        if(embeds[i-1]){
            tdata.react("⬅");
        }
        if(embeds[i+1]){
            tdata.react("➡");
        }
        await tdata.react("❌");

        let reactCollector = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

        setTimeout(function(){
            reactCollector.stop();
        }, 60000);

        reactCollector.on("collect", async(reaction, user) => {

            // Remove the reaction when the user react to the message
            await reaction.users.remove(message.author.id);

            switch(reaction._emoji.name){
                case "⬅" :
                    i--;
                    tdata = await tdata.edit(embeds[parseInt(i, 10)]);
                    break;
                case "➡" :
                    i++;
                    tdata = await tdata.edit(embeds[parseInt(i, 10)]);
                    break;
                case "❌" :
                    reactCollector.stop();
                    break;
            }

            if(!embeds[i-1]){
                let r = tdata.reactions.find((r) => r._emoji.name === "⬅");
                if(r){
                    r.users.remove(message.client.user).catch((e) => {});
                }
            } else {
                tdata.react("⬅").catch((e) => {});
            }
            if(!embeds[i+1]){
                let r = tdata.reactions.find((r) => r._emoji.name === "➡");
                if(r){
                    r.users.remove(message.client.user).catch((e) => {});
                }
            } else {
                tdata.react("➡").catch((e) => {});
            }

        });

        reactCollector.on("end", () => {
            tdata.delete();
        });
    }

}

module.exports = Help;