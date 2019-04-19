const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Setlang extends Command {

    constructor (client) {
        super(client, {
            name: "setlang",
            description: (language) => language.get('SETLANG_DESCRIPTION'),
            dirname: __dirname,
            usage: "setlang [fr/en]",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$setlang fr\n$setlang en",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        if(!args[0]) return message.channel.send(message.language.get('SETLANG_LANG'));

        if(args[0] === 'fr'){
            message.channel.send(':flag_fr: Langue changée !');
            this.client.databases[1].set(`${message.guild.id}.lang`, 'fr');
        } else if(args[0] === 'en'){
            message.channel.send(':flag_us: Changed language ! :flag_gb:');
            this.client.databases[1].set(`${message.guild.id}.lang`, 'en');
        } else return message.channel.send(message.language.get('SETLANG_LANG'));
    }

}

module.exports = Setlang;