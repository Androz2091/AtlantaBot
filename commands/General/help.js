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
            } else if(!cmd) return message.channel.send(message.language.get('HELP_COMMAND_NOT_FOUND', args[0]));

            // Replace $ caract with the server prefix
            var examples = cmd.help.examples.replace(/[$_]/g,guild_data.prefix);

            // Creates the help embed
            var group_embed = new Discord.RichEmbed()
                .setAuthor(message.language.get('HELP_HEADING')+' '+cmd.help.name)
                .addField(message.language.get('HELP_USAGE'), guild_data.prefix+cmd.help.usage)
                .addField(message.language.get('HELP_EXAMPLES'), examples)
                .addField(message.language.get('HELP_GROUP'), cmd.help.category)
                .addField(message.language.get('HELP_DESC'), cmd.help.description(message.language))
                .addField(message.language.get('HELP_ALIASES'), cmd.conf.aliases.length > 0 ? cmd.conf.aliases.map(a => '`'+a+'`').join('\n') : message.language.get('HELP_NO_ALIASES'))
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

        let client = this.client;

        message.delete();

        let categories = [];
        client.commands.forEach((command) => {
            if(!categories.includes(command.help.category)){
                categories.push(command.help.category);
            }
        });

        let embeds = [];
        categories.forEach((category) => {
            let commands = client.commands.filter((cmd) => cmd.help.category === category);
            let embed = new Discord.RichEmbed()
                .setAuthor(category)
                .setDescription(commands.sort().map((cmd) => `\`${cmd.help.name}\``).join(", "))
                .setColor(data.embed.color)
                .setFooter(data.embed.footer, message.author.displayAvatarURL);
            embeds.push(embed);
        });

        let i = 0;
        var tdata = await message.channel.send(embeds[parseInt(i, 10)]);
        
        if(embeds[i-1]){
            tdata.react("⬅");
        }
        if(embeds[i+1]){
            tdata.react("➡");
        }
        await tdata.react("❌");

        const reactCollector = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

        setTimeout(function(){
            reactCollector.stop();
        }, 60000);

        reactCollector.on("collect", async(reaction, user) => {

            // Remove the reaction when the user react to the message
            await reaction.remove(message.author.id);

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
                    r.remove(message.client.user).catch((e) => {});
                }
            } else {
                tdata.react("⬅").catch((e) => {});
            }
            if(!embeds[i+1]){
                let r = tdata.reactions.find((r) => r._emoji.name === "➡");
                if(r){
                    r.remove(message.client.user).catch((e) => {});
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