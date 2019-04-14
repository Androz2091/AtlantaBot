const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Userinfo extends Command {

    constructor (client) {
        super(client, {
            name: "userinfo",
            description: (language) => language.get('USERINFO_DESCRIPTION'),
            dirname: __dirname,
            usage: "userinfo (@member)",
            enabled: true,
            guildOnly: true,
            aliases: ["memberinfo","ui","mi"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            examples: "$userinfo\n$userinfo @Androz#2091",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        var displayPresence = true;

        var user;
        if(!args[0]) user = message.author;
        else user = this.client.users.get(args[0]);
        if(!user) (user = await this.client.fetchUser(args[0])) && (displayPresence = false);
        if(!user) return message.channel.send(message.language.get('USERINFO_ID', args[0]));
        
        var member = await message.guild.fetchMember(user).catch(err => {console.log(err)});

        var embed = new Discord.RichEmbed()
            .setAuthor(user.tag, user.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .addField(message.language.get('USERINFO_FIELDS')[0], user.username, true)
            .addField(message.language.get('USERINFO_FIELDS')[1], user.discriminator, true)
            .addField(message.language.get('USERINFO_FIELDS')[2], (user.bot ? message.language.get('YES') : message.language.get('NO')), true)
            .addField(message.language.get('USERINFO_FIELDS')[4], message.language.printDate(user.createdAt), true)
            .addField(message.language.get('USERINFO_FIELDS')[3], user.displayAvatarURL)
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);

        // if we have the presence if the member, display them
        if(displayPresence){
            embed.addField(message.language.get('USERINFO_FIELDS')[5], (user.presence.game ? user.presence.game.name : message.language.get('USERINFO_NO_GAME')), true)
            .addField(message.language.get('USERINFO_FIELDS')[6], message.language.get('STATUS')[user.presence.status], true)
        }
            
        
        if(member){
            // Add some informations if it's a member
            embed.addField(message.language.get('USERINFO_FIELDS')[7], (member.highestRole ? member.highestRole : message.language.get('USERINFO_NO_ROLE')), true)
            .addField(message.language.get('USERINFO_FIELDS')[8], message.language.printDate(member.joinedAt),true)
            .addField(message.language.get('USERINFO_FIELDS')[11], member.displayHexColor, true)
            .addField(message.language.get('USERINFO_FIELDS')[9], (member.nickname ? member.nickname : message.language.get('USERINFO_NO_NICKNAME')), true)
            .addField(message.language.get('USERINFO_FIELDS')[10], (member.roles.size > 10 ? member.roles.slice(0, 9).map(r => r).join(', ')+message.language.get('USERINFO_MORE_ROLES', member.roles.size - 10) : (member.roles.size < 1) ? message.language.get('USERINFO_NO_ROLE') : member.roles.map(r => r).join(', ')))
        }

        message.channel.send(embed);
    }

}

module.exports = Userinfo;