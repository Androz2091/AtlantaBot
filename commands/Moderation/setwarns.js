const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Setwarns extends Command {

    constructor (client) {
        super(client, {
            name: "setwarns",
            description: (language) => language.get('SETWARNS_DESCRIPTION'),
            dirname: __dirname,
            usage: "setwarns [number] [kick/ban/reset]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$setwarns 4 kick",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Gets the number arg
        var number = args[0];
        if(!number || isNaN(number)) return message.channel.send(message.language.get('SETWARNS_USAGE', guild_data.prefix));
        if(number < 1 || number > 10) return message.channel.send(message.language.get('NUMBER_1_10'));
    
        // Gets the sanction to update
        var sanction = args[1];
        if(!sanction) return message.channel.send(message.language.get('SETWARNS_USAGE', guild_data.prefix));

        if(sanction === 'kick'){
            // If there is no number sets to kick
            if(!guild_data.automod_warns['kick']){
                // Check if the number is not already used
                for(var sanction in guild_data.automod_warns) if(guild_data.automod_warns[sanction] === number) return message.channel.send(message.language.get('SETWARNS_ALREADY_A_SANCTION', guild_data.prefix, sanction, guild_data.automod_warns[sanction]));
                // Update database
                this.client.databases[1].set(`${message.guild.id}.automod_warns.kick`, number);
                // Send success message
                return message.channel.send(message.language.get('SETWARNS_SUCCESS', guild_data.prefix, 'kick', number));
            } else return message.channel.send(message.language.get('SETWARNS_SANCTION_ALREADY_USED', guild_data.prefix, 'kick', guild_data.automod_warns['kick']));
        }

        if(sanction === 'ban'){
            // If there is no number sets to ban
            if(!guild_data.automod_warns['ban']){
                // Check if the number is not already used
                for(var sanction in guild_data.automod_warns) if(guild_data.automod_warns[sanction] === number) return message.channel.send(message.language.get('SETWARNS_ALREADY_A_SANCTION', guild_data.prefix, sanction, guild_data.automod_warns[sanction]));
                // Update database
                this.client.databases[1].set(`${message.guild.id}.automod_warns.ban`, number);
                // Send success message
                return message.channel.send(message.language.get('SETWARNS_SUCCESS', guild_data.prefix, 'ban', number));
            } else return message.channel.send(message.language.get('SETWARNS_SANCTION_ALREADY_USED', guild_data.prefix, 'ban', guild_data.automod_warns['ban']));
        }

        if(sanction === 'reset'){
            for(var sanction in guild_data.automod_warns){
                if(guild_data.automod_warns[sanction] === number){
                    this.client.databases[1].delete(`${message.guild.id}.warns_sanctions.${sanction}`);
                    return message.channel.send(message.language.get('SETWARNS_SUCCESS_DELETE', guild_data.prefix, sanction, number));
                }
            }
            return message.channel.send(message.language.get('SETWARNS_NO_SANCTION'));
        }

    }

}

module.exports = Setwarns;