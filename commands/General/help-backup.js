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
        if(args[0]){

            let isCustom = (data.guild.customCommands ? data.guild.customCommands.find((c) => c.name === args[0]) : false);
            
            // if the command doesn't exist, error message
            let cmd = message.client.commands.get(args[0]) || message.client.commands.get(message.client.aliases.get(args[0]));
            if(!cmd && isCustom){
                return message.channel.send(message.language.get("HELP_ERR_CMD_CUSTOMIZED", args[0]));
            } else if(!cmd){
                return message.channel.send(message.language.get("HELP_ERR_NOT_FOUND", args[0]));
            }

            // Replace $ caract with the server prefix
            let examples = cmd.help.examples(message.language).replace(/[$_]/g, data.guild ? data.guild.prefix : "");

            // Creates the help embed
            let groupEmbed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("HELP_HEADINGS")[0]+" "+cmd.help.name)
                .addField(message.language.get("HELP_HEADINGS")[1], (data.guild ? data.guild.prefix : "")+cmd.help.usage(message.language))
                .addField(message.language.get("HELP_HEADINGS")[2], examples)
                .addField(message.language.get("HELP_HEADINGS")[3], cmd.help.category)
                .addField(message.language.get("HELP_HEADINGS")[4], cmd.help.description(message.language))
                .addField(message.language.get("HELP_HEADINGS")[5], (cmd.conf.aliases.length > 0) ? cmd.conf.aliases.map((a) => "`"+a+"`").join("\n") : message.language.get("HELP_NO_ALIASES"))
                .addField(message.language.get("HELP_HEADINGS")[6], (cmd.conf.ownerOnly ? "`OWNER`" : (cmd.conf.memberPermissions.length > 0) ? cmd.conf.memberPermissions.map((a) => "`"+a+"`").join(", ") : "`EVERYONE`"))
                .setColor(data.config.embed.color)
                .setFooter(data.config.embed.footer);

            // and send the embed in the current channel
            return message.channel.send(groupEmbed);
        }

        const categories = [];
        const commands = message.client.commands;

        commands.forEach((command) => {
            if(!categories.includes(command.help.category)){
                if(command.help.category === "Owner" && message.author.id !== message.client.config.owner.id){
                    return;
                }
                categories.push(command.help.category);
            }
        });

        let emojis = this.client.config.emojis

        let embed = new Discord.MessageEmbed()
            .setDescription(message.language.get("HELP_EDESCRIPTION", data.guild ? data.guild.prefix : ""))
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);
        categories.sort().forEach((cat) => {
            let tCommands = commands.filter((cmd) => cmd.help.category === cat);
            embed.addField(emojis.categories[cat.toLowerCase()]+" "+cat+" - ("+tCommands.size+")", tCommands.map((cmd) => "`"+cmd.help.name+"`").join(", "));
        });
        if(message.guild){
            if(data.guild.customCommands.length > 0){
                embed.addField(emojis.categories.custom+" "+message.guild.name+" | "+message.language.get("UTILS").CUSTOM_COMMANDS+" - ("+data.guild.customCommands.length+")", data.guild.customCommands.map((cmd) => "`"+cmd.name+"`").join(", "));
            }
        }
      
        embed.addField("\u200B", message.language.get("STATS_LINKS", inviteURL, message.client.user.id));
        embed.setAuthor(message.language.get("HELP_TITLE"), message.client.user.displayAvatarURL());
        return message.channel.send(embed);
    }

}

module.exports = Help;
