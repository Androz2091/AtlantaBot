const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: (language) => language.get('HELP_DESCRIPTION'),
            dirname: __dirname,
            usage: "help (command)",
            enabled: true,
            guildOnly: false,
            aliases: ["aide"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$help\n$help ping",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        // if a command is provided
        if(args[0]){

            // if the command doesn't exist, error message
            let cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
            if(!cmd && guild_data.commands[args[0]]){
                return message.channel.send(message.language.get('HELP_CUSTOMIZED'), args[0]);
            } else return message.channel.send(message.language.get('HELP_COMMAND_NOT_FOUND', args[0]));

            // Replace $ caract with the server prefix
            var examples = cmd.help.examples.replace(/[$_]/g,guild_data.prefix);

            // Creates the help embed
            var group_embed = new Discord.RichEmbed()
                .setAuthor(message.language.get('HELP_HEADING')+' '+cmd.help.name)
                .addField(message.language.get('HELP_USAGE'), guild_data.prefix+cmd.help.usage)
                .addField(message.language.get('HELP_EXAMPLES'), examples)
                .addField(message.language.get('HELP_GROUP'), cmd.help.category)
                .addField(message.language.get('HELP_DESC'), cmd.help.description(message.language))
                .setColor(data.embed.color)
                .setFooter(data.embed.footer)

            // Check parameters to display
            if(cmd.conf.permission){
                group_embed.addField(message.language.get('HELP_PERMISSIONS'), `\`${cmd.conf.permission}\``);
            }
            if(!cmd.conf.enabled){
                group_embed.setDescription(message.language.get('HELP_DISABLED'));
            }
            if(cmd.conf.owner){
                group_embed.setDescription(message.language.get('HELP_OWNER_ONLY'));
            }

            // and send the embed in the current channel
            return message.channel.send(group_embed);
        }

        // Else if no command is provided
        var help_embed = new Discord.RichEmbed()
            .setDescription(message.language.get('HELP_REMINDER', guild_data.prefix))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer)
            .setTimestamp()
        
        var commands_total = 0;

        // Gets an array of all categories
        var categories = [];
        this.client.commands.forEach(cmd => {
            if(!categories.includes(cmd.help.category)) categories.push(cmd.help.category); 
        });

        // for each categroy, create a string and then add a field to the embed
        categories.forEach(cat => {
            var category = '';
            var pos = 0;
            var commands = this.client.commands.filter(cmd => cmd.help.category === cat);
            commands.forEach(cmd => {
                category += ' `'+cmd.help.name+'`';
                pos++
            });
            commands_total+=pos;
            help_embed.addField(cat+' - ('+pos+')', category.replace(/[' '_]/g,', ').substr(1));
        });

        // Customs commands
        if(Object.keys(guild_data.commands).length > 0){
            var custom = '';
            var pos = 0;
            for(var cmd in guild_data.commands){
                custom += ' `'+cmd+'`';
                pos++
            }
            commands_total+=pos;
            help_embed.addField('Custom - ('+pos+')', custom.replace(/[' '_]/g,', ').substr(1));
        }

        help_embed.setAuthor(message.language.get('HELP_HEADING_2', commands_total));

        // Send the embed in the current channel
        message.channel.send(help_embed);
    }

}

module.exports = Help;