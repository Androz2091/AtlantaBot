const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Rep extends Command {

    constructor (client) {
        super(client, {
            name: "rep",
            description: (language) => language.get('REP_DESCRIPTION'),
            dirname: __dirname,
            usage: "rep [@membre]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$rep @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var ms = require('ms');
        var cooldowns = this.client.databases[2];

        // if the member is already in the cooldown db
        var isInCooldown = cooldowns.rep.get(message.author.id);
        if(isInCooldown){
            /*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
            if(isInCooldown > Date.now()){
                if(isInCooldown > Date.now()) return message.channel.send(message.language.get('REP_COOLDOWN', message.language.convertMs(isInCooldown - Date.now()))); 
            }
        }

        // Gets the first mentionned member
        var member = message.mentions.members.first();
        // if doesn't exist, display an error message
        if(!member) return message.channel.send(message.language.get('MENTION_MEMBER'))

        // if the user is a bot, cancel
        if(member.user.bot) return message.channel.send(message.language.get('REP_BOT'));

        // if the member tries to give himself a reputation point, dispaly an error message
        if(member.id === message.author.id) return message.channel.send(message.language.get('REP_SELF'));

        // Records in the database the time when the member will be able to execute the command again (in 6 hours)
        var towait = Date.now() + ms('6h');
        cooldowns.rep.set(message.author.id, towait);

        // Update member data 
        this.client.databases[0].add(`${member.id}.rep`, 1);

        // send a success message in the current channel
        message.channel.send(message.language.get('REP_SUCCESS', member.user.username));

    }

}

module.exports = Rep;