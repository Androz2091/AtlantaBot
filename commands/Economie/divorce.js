const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Divorce extends Command {

    constructor (client) {
        super(client, {
            name: "divorce",
            description: (language) => language.get('DIVORCE_DESCRIPTION'),
            dirname: __dirname,
            usage: "divorce",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$divorce",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Check if the message author is weeded
        if(membersdata[0].partner === 'false') return message.channel.send(message.language.get('DIVORCE_NOT_WEEDED'));

        // Updates db
        
        var old_partner = this.client.users.get(membersdata[0].partner) || await this.client.fetchUser(membersdata[0].partner);

        var author_old_partners = membersdata[0].old_partners;
        author_old_partners.push(membersdata[0].partner);

        var memberdata = this.client.databases[0].get(membersdata[0].partner) || this.client.functions.createUser(old_partner);
        var member_old_partners = memberdata.old_partners;
        member_old_partners.push(message.author.id);

        this.client.databases[0].set(`${message.author.id}.partner`, 'false');
        this.client.databases[0].set(`${message.author.id}.old_partners`, author_old_partners);

        this.client.databases[0].set(`${membersdata[0].partner}.partner`, 'false');
        this.client.databases[0].set(`${membersdata[0].partner}.old_partners`, member_old_partners);
        
        // Send success message 
        message.channel.send(message.language.get('DIVORCE_SUCCESS', old_partner.username));

    }

}

module.exports = Divorce;