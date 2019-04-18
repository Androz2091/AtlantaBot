const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Work extends Command {

    constructor (client) {
        super(client, {
            name: "work",
            description: (language) => language.get('WORK_DESCRIPTION'),
            dirname: __dirname,
            usage: "work",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$work",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var ms = require('ms');
        var cooldowns = this.client.databases[2];

        // if the member is already in the cooldown db
        var isInCooldown = cooldowns.work.get(message.author.id);
        if(isInCooldown){
            /*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
            if(isInCooldown > Date.now()) return message.channel.send(message.language.get('WORK_COOLDOWN', message.language.convertMs(isInCooldown - Date.now()))); 
        }

        // Records in the database the time when the member will be able to execute the command again (in 6 hours)
        var towait = Date.now() + ms('24h');
        cooldowns.work.set(message.author.id, towait);

        var embed = new Discord.RichEmbed() // Creates a new rich embed
            .setAuthor(message.language.get('SALARY_CLAIMED')) // sets the heading of the embed
            .setDescription(message.language.get('SALARY_CLAIMED2'))
            .setFooter(data.embed.footer)
            .setColor(data.embed.color) // Sets the color of the embed
            .setTimestamp();
        
        // Update user data
        this.client.databases[0].add(`${message.author.id}.credits`, 200);

        // Send the embed in the current channel
        message.channel.send(embed);

    }

}

module.exports = Work;