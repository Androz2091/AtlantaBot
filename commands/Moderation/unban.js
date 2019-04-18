const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Unban extends Command {

    constructor (client) {
        super(client, {
            name: "unban",
            description: (language) => language.get('UNBAN_DESCRIPTION'),
            dirname: __dirname,
            usage: "unban [ID]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "BAN_MEMBERS" ],
            nsfw: false,
            examples: "$unban 422820341791064085",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var user;

        // Check if the arg is an ID or a username
        var isId = !isNaN(args[0]);

        if(isId){
            // Try to find a user with that ID
            await this.client.fetchUser(args[0]).then(u => {
                // if a user was found
                user = u;
            }).catch(err => {
                // if no user found, send an error message
                return message.channel.send(message.language.get('UNBAN_ID', args[0]));
            });
        } else if(!isId) {
            var parsed = args[0].split('#');
            if(parsed.length < 2) return message.channel.send(message.language.get('BAD_PARAMETERS', data.cmd.help.name, guild_data.prefix));
            var found = this.client.users.filter(u => u.username === parsed[0]).filter(u => u.discriminator === parsed[1]);
            if(!found[0]) return message.channel.send(message.language.get('UNBAN_ID', args[0]));
            else user = found[0];
        }

        // check if the user is banned
        var banned = await message.guild.fetchBans();
        if(!banned.some(e => e.id === user.id)) return message.channel.send(message.language.get('UNBAN_NOT_BANNED', user));

        // Unban user
        message.guild.unban(user).catch(err => console.log(err));

        // Send a success message in the current channel
        message.channel.send(message.language.get('UNBAN_SUCCESS', user, message));

        // Update cases
        this.client.databases[1].add(`${message.guild.id}.case`, 1);
        // Gets case
        var tcase = this.client.databases[1].get(`${message.guild.id}.case`);

        // Gets the modlogs channel
        var modlogs = message.guild.channels.get(guild_data.channels.modlogs);
        if(!modlogs) return;

        var modlog_embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('MODLOGS_HEADERS', tcase)[2], user.avatarURL)
            .addField(message.language.get('MODLOGS_UTILS')[0], `\`${user.tag}\` (${user})`, true)
            .addField(message.language.get('MODLOGS_UTILS')[1], `\`${message.author.tag}\` (${message.author})`, true)
            .setColor(`#6de809`)
            .setFooter(data.embed.footer);

        modlogs.send(modlog_embed);

    }

}

module.exports = Unban;