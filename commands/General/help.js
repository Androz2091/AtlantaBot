const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
ms = require("ms");

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
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        // if a command is provided
        if(args[0] && args[0] !== "-p"){

            let isCustom = (data.settings.customCommands ? data.settings.customCommands.find((c) => c.name === args[0]) : false);
            
            // if the command doesn't exist, error message
            let cmd = message.client.commands.get(args[0]) || message.client.commands.get(message.client.aliases.get(args[0]));
            if(!cmd && isCustom){
                return message.channel.send(message.language.get("HELP_ERR_CMD_CUSTOMIZED"), args[0]);
            } else if(!cmd){
                return message.channel.send(message.language.get("HELP_ERR_NOT_FOUND", args[0]));
            }

            // Replace $ caract with the server prefix
            let examples = cmd.help.examples(message.language).replace(/[$_]/g, data.settings.prefix);

            // Creates the help embed
            let groupEmbed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("HELP_HEADINGS")[0]+" "+cmd.help.name)
                .addField(message.language.get("HELP_HEADINGS")[1], data.settings.prefix+cmd.help.usage(message.language))
                .addField(message.language.get("HELP_HEADINGS")[2], examples)
                .addField(message.language.get("HELP_HEADINGS")[3], cmd.help.category)
                .addField(message.language.get("HELP_HEADINGS")[4], cmd.help.description(message.language))
                .addField(message.language.get("HELP_HEADINGS")[5], (cmd.conf.aliases.length > 0) ? cmd.conf.aliases.map((a) => "`"+a+"`").join("\n") : message.language.get("HELP_NO_ALIASES"))
                .setColor(data.config.embed.color)
                .setFooter(data.config.embed.footer);

            // and send the embed in the current channel
            return message.channel.send(groupEmbed);
        }

        let categories = [];
        message.client.commands.forEach((command) => {
            if(!categories.includes(command.help.category)){
                if(command.help.category === "Owner" && message.author.id !== message.client.config.owner.id){
                    return;
                }
                categories.push(command.help.category);
            }
        });

        let Log = require("../../base/Log");
        let ran = await Log.find({});
        let ranLast7Days = ran.filter((l) => l.date > Date.now()-ms("7d"));
        let embed = new Discord.MessageEmbed()
            .setDescription(message.language.get("HELP_EDESCRIPTION", data.settings.prefix, ranLast7Days.length))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        categories.forEach((cat) => {
            let emoji = message.client.guilds.get(message.client.config.support.id).emojis.find((e) => e.name === cat.toLowerCase()+"_category_atlanta");
            let commands = message.client.commands.filter((cmd) => cmd.help.category === cat);
            embed.addField((emoji ? emoji.toString() : "")+" "+cat+" - ("+commands.size+")", commands.map((cmd) => "`"+cmd.help.name+"`").join(", "));
        });
        if(message.guild){
            if(data.settings.customCommands.length > 0){
                let emoji = message.client.guilds.get(message.client.config.support.id).emojis.find((e) => e.name === "custom_category_atlanta");
                embed.addField((emoji ? emoji.toString() : "")+" "+message.guild.name+" - ("+data.settings.customCommands.length+")", data.settings.customCommands.map((cmd) => "`"+cmd.name+"`").join(", "));
            }
        }
        let inviteURL = await message.client.functions.supportLink(message.client).catch((err) => {});
        if(!inviteURL){
            inviteURL = message.client.config.supportURL || "https://discord.gg/code";
        }
        embed.addField("\u200B", message.language.get("STATS_LINKS", inviteURL, message.client.user.id));
        embed.setAuthor(message.language.get("HELP_TITLE"), message.client.user.displayAvatarURL());
        return message.channel.send(embed);
    }

}

module.exports = Help;