const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Autorole extends Command {

    constructor (client) {
        super(client, {
            name: "autorole",
            description: (language) => language.get('AUTOROLE_DESCRIPTION'),
            dirname: __dirname,
            usage: "autorole [on/off] (role)",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$autorole on Communauté\n$autorole off",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var statut = args[0];
        if(statut !== "on" && statut !== "off") return message.channel.send(message.language.get('BAD_PARAMETERS', (data.cmd.help.name, guild_data.prefix)));
        
        if(statut === "on"){

            // Gets the role
            if(!args[1]) return message.channel.send(message.language.get('BAD_PARAMETERS', (data.cmd.help.name, guild_data.prefix)));
            var role = message.mentions.roles.first();
            if(!role){
                role = message.guild.roles.find(r => r.name === args.slice(1).join(' '));
                if(!role) return message.channel.send(message.language.get('ROLE_NOT_FOUND', args.slice(1).join(' ')));
            }

            // Updates db
            this.client.databases[1].set(message.guild.id+'.autorole.status', 'on');
            this.client.databases[1].set(message.guild.id+'.autorole.role', role.id);
            
            // Success
            message.channel.send(message.language.get('AUTOROLE_ENABLED', guild_data.prefix));
        }
        if(statut === "off"){

             // Updates db
            this.client.databases[1].set(message.guild.id+'.autorole.status', 'disabled');
            this.client.databases[1].set(message.guild.id+'.autorole.role', 'unknow');

            // Success
            message.channel.send(message.language.get('AUTOROLE_DISABLED', guild_data.prefix));

        }
        
    }

}

module.exports = Autorole;